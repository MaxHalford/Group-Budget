import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, StyleSheet } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import BalancingScene from './scenes/BalancingScene';
import SpendingScene from './scenes/SpendingScene';


export default class gBudget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [
        {
            "person": "Roger",
            "amount": 20
        },
        {
            "person": "Jack",
            "amount": 10
        }
      ]
    };
  }

  addEntry(entry) {
    const newEntries = this.state.entries.concat(entry)
    this.setState({
      entries: newEntries
    })
    AsyncStorage.setItem('entries', JSON.stringify(newEntries))
  }

  render() {
    return (
      <ScrollableTabView
        tabBarPosition='bottom'
        tabBarActiveTextColor='seagreen'
        tabBarUnderlineStyle={styles.tabBarUnderline}
      >
        <SpendingScene
          tabLabel='Spending'
          entries={this.state.entries}
          addEntry={this.addEntry.bind(this)}
        />
        <BalancingScene
          tabLabel='Balance'
          entries={this.state.entries}
        />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabBarUnderline: {
    backgroundColor: 'seagreen',
    padding: 3
  },
});

AppRegistry.registerComponent('gBudget', () => gBudget);
