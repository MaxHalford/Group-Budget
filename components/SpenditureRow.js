import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SpenditureRow extends Component {
  render() {
    return (
      <View style={styles.entry}>
        <Text>{this.props.person} - {this.props.amount}</Text>
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

SpenditureRow.propTypes = {
  person: React.PropTypes.string,
  amount: React.PropTypes.number
};
