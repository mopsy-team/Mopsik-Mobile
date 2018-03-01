import React, {Component} from 'react';
import {
  View,
  AsyncStorage,
  ScrollView,
  StyleSheet
} from 'react-native';

import {Text, Icon, Badge} from 'react-native-elements';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';

MOPS = require('mopsik_mobile/src/config/mops');

export default class UsageTable extends Component {

  createHeader = () => {
    const tableHead = ['Typ pojazdu']
    if (MOPS.settings.car_selected) {
      tableHead.push(<View>
          <Icon name='directions-car' color={THEMES.basic.backgroundLightColor}/>
          <Text style={{textAlign: 'center'}}>Samochód</Text>
        </View>);
    }
    if (MOPS.settings.truck_selected) {
      tableHead.push(<View>
          <Icon name='local-shipping' color={THEMES.basic.backgroundLightColor}/>
          <Text style={{textAlign: 'center'}}>Ciężarówka</Text>
        </View>);
    }
    if (MOPS.settings.bus_selected) {
      tableHead.push(<View>
          <Icon name='directions-bus' color={THEMES.basic.backgroundLightColor}/>
          <Text style={{textAlign: 'center'}}>Autobus</Text>
        </View>);
    }
    return tableHead
  }

  createTableData = () => {

  }

  render() {
    const tableHead = this.createHeader();
    const tableTitle = ['Zapełnienie', 'Wolne miejsca', 'Całkowita liczba miejsc'];
    const tableData = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    return (
      <View>
        <Table>
          <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles_.head} textStyle={styles_.text}/>
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col data={tableTitle} style={styles_.title} heightArr={[28,28]} textStyle={styles_.text}/>
            <Rows data={tableData} flexArr={[1, 1, 1]} style={styles_.row}/>
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
