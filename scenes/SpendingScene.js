import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';

import ActionButton from 'react-native-action-button';

import AddSpenditureModal from '../components/AddSpenditureModal';
import SpenditureRow from '../components/SpenditureRow';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SpendingScene extends Component {

  render() {
    return (
      <View style={styles.wrapper}>

        <ListView
          style={styles.list}
          dataSource={ds.cloneWithRows(this.props.entries)}
          renderRow={entry => <SpenditureRow person={entry.person} amount={entry.amount} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          enableEmptySections={true}
        />

        <AddSpenditureModal
          ref={'addSpenditureModal'}
          onConfirm={this.props.addEntry}
        />

        <ActionButton
          buttonColor='seagreen'
          onPress={() => this.refs.addSpenditureModal.openModal() }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  list: {
    flex: 1,
    paddingTop: 22
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
});

SpendingScene.propTypes = {
  entries: React.PropTypes.array,
  addEntry: React.PropTypes.func
};
