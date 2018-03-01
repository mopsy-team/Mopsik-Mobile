import React, {Component} from 'react';
import {
  View,
  AsyncStorage,
  ScrollView,
  StyleSheet
} from 'react-native';


import {Text, Icon, Badge} from 'react-native-elements';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';

import {VEHICLES} from 'mopsik_mobile/src/config/vehicles';

MOPS = require('mopsik_mobile/src/config/mops');

export default class UsageTable extends Component {

  createHeader = (vehicle) => {
    return (
      <View>
          <Icon name={vehicle.icon} color={THEMES.basic.backgroundLightColor}/>
          <Text style={{textAlign: 'center'}}>{vehicle.name}</Text>
      </View>
    )
  }

  createHeaderRow = () => {
    const tableHead = ['Typ pojazdu'];
    for (v of ['car', 'truck', 'bus']){
      if (MOPS.settings.vehicles_selected[v]){
        tableHead.push(this.createHeader(VEHICLES[v]));
      }
    }
    return tableHead;
  }

  createUsage = (vehicle) => {
    let {mop} = this.props;
    return (
      <Badge
        value={mop.usage[vehicle] + '%'}
        textStyle={{ color: mop.color[vehicle].text }}
        containerStyle={{ backgroundColor: mop.color[vehicle].background}}
      />
    )
  }

  createUsageRow = () => {
    const tableRow = [];
    for (v of ['car', 'truck', 'bus']){
      if (MOPS.settings.vehicles_selected[v]) {
        tableRow.push(this.createUsage(v));
      }
    }
    return tableRow;
  }

  createTableData = () => {
    return [this.createUsageRow(), this.createUsageRow(), this.createUsageRow()]
  }

  render() {
    const tableHead = this.createHeaderRow();
    const tableTitle = ['Zapełnienie', 'Wolne miejsca', 'Całkowita liczba miejsc'];
    const tableData = this.createTableData();
    return (
      <View>
        <Table>
          <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles_.head} textStyle={styles_.text}/>
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col data={tableTitle} style={styles_.title} heightArr={[28,28,40]} textStyle={styles_.text}/>
            <Rows data={tableData} flexArr={[1, 1, 1]} style={styles_.row} heightArr={[28,28,40]}/>
          </TableWrapper>
        </Table>
      </View>
    )
  }
}

const styles_ = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' }
})
