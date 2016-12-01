import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';

import _ from 'lodash';

import RebalanceRow from '../components/RebalanceRow';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const rebalance = entries => {
  // Calculate the total spendings per person
  const personSpendings = _.groupBy(entries, entry => entry.person)
  const personTotals = _.mapValues(personSpendings, entries =>
    _.reduce(entries, (sum, entry) => sum + entry.amount, 0)
  )

  // Calculate each person's difference with the average total spenditure
  const totalOfTotals = _.sum(_.values(personTotals))
  const average = totalOfTotals / _.size(personTotals)
  const personDifferences = _.mapValues(personTotals, total => total - average)

  let rebalancings = [];

  while (_.some(_.values(personDifferences), amount => Math.abs(amount) > 0.01)) {
    const giver = _.minBy(_.keys(personDifferences), person => personDifferences[person])
    const receiver = _.maxBy(_.keys(personDifferences), person => personDifferences[person])
    const amount = Math.min(personDifferences[giver], Math.abs(personDifferences[receiver]))
    personDifferences[giver] -= amount
    personDifferences[receiver] += amount
    rebalancings = rebalancings.concat({
      'giver': giver,
      'receiver': receiver,
      'amount': Math.abs(amount)
    })
  }

  return rebalancings
}

export default class BalancingScene extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <ListView
          style={styles.list}
          dataSource={ds.cloneWithRows(rebalance(this.props.entries))}
          renderRow={entry => <RebalanceRow giver={entry.giver} receiver={entry.receiver} amount={entry.amount} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          enableEmptySections={true}
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

BalancingScene.propTypes = {
  entries: React.PropTypes.array
};
