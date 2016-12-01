import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class RebalanceRow extends Component {
  render() {
    return (
      <View style={styles.entry}>
        <Text>{this.props.giver} owes {this.props.amount} to {this.props.receiver}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  entry: {
    height: 50,
    backgroundColor: 'white',
    padding: 3
  },
});

RebalanceRow.propTypes = {
  giver: React.PropTypes.string,
  receiver: React.PropTypes.string,
  amount: React.PropTypes.number
};
