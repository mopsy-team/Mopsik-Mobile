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
        textStyle={{ color: mop.color[vehicle].text, fontSize: 20 }}
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

  createFree = (vehicle) => {
    let {mop} = this.props;
    return (
      <Text style={{textAlign: 'center', fontSize: 20}}>{mop.available[vehicle] - mop.taken[vehicle]}</Text>
    )
  }

  createFreeRow = () => {
    const tableRow = [];
    for (v of ['car', 'truck', 'bus']){
      if (MOPS.settings.vehicles_selected[v]) {
        tableRow.push(this.createFree(v));
      }
    }
    return tableRow;
  }

  createTaken = (vehicle) => {
    let {mop} = this.props;
    return (
      <Text style={{textAlign: 'center', fontSize: 20}}>{mop.taken[vehicle]}</Text>
    )
  }

  createTakenRow = () => {
    const tableRow = [];
    for (v of ['car', 'truck', 'bus']){
      if (MOPS.settings.vehicles_selected[v]) {
        tableRow.push(this.createTaken(v));
      }
    }
    return tableRow;
  }


  createOverall = (vehicle) => {
    let {mop} = this.props;
    return (
      <Text style={{textAlign: 'center', fontSize: 20}}>{mop.available[vehicle]}</Text>
    )
  }

  createOverallRow = () => {
    const tableRow = [];
    for (v of ['car', 'truck', 'bus']){
      if (MOPS.settings.vehicles_selected[v]) {
        tableRow.push(this.createOverall(v));
      }
    }
    return tableRow;
  }

  createTableData = () => {
    return [this.createUsageRow(), this.createFreeRow(), this.createTakenRow(), this.createOverallRow()]
  }

  render() {
    const tableHead = this.createHeaderRow();
    const tableTitle = ['Zapełnienie', 'Wolne miejsca', 'Zajęte miejsca', 'Całkowita liczba miejsc'];
    const tableData = this.createTableData();
    if (tableHead.length == 1){
      return(
        <Text style={{textAlign: 'center'}}>Nie wybrano żadnego typu pojazdu do wyświetlania. Możesz to zrobić w ustawieniach.</Text>
      )
    }
    return (
      <View>
        <Table borderStyle={{borderWidth: 0.5, borderColor: THEMES.basic.backgroundLightGrey}}>
          <Row data={tableHead} flexArr={new Array(tableHead.length).fill(1)} style={styles_.head} textStyle={styles_.text}/>
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col data={tableTitle} style={styles_.title} heightArr={[40,40,40,40]} textStyle={styles_.text}/>
            <Rows data={tableData} flexArr={new Array(tableHead.length - 1).fill(1)} style={styles_.row} heightArr={[40,40,40,40]}/>
          </TableWrapper>
        </Table>
      </View>
    )
  }
}

const styles_ = StyleSheet.create({
  head: { height: 50, backgroundColor: '#f1f8ff' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 40 },
  text: { textAlign: 'center', fontSize: 15 }
})
