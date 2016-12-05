import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import _ from 'lodash'

import Button from 'react-native-button'
import Modal from 'react-native-modalbox'

export default class AddSpenditureModal extends Component {

  constructor() {
    super();
    this.state = {
      person: null,
      amount: null
    };
  }

  openModal() {
    this.refs.modal.open()
  }

  closeModal() {
    this.refs.modal.close()
  }

  validPerson() {
    return this.state.person !== null && this.state.person !== ''
  }

  validAmount() {
    return this.state.amount !== null && ! Number.isNaN(this.state.amount)
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        ref={'modal'}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add a spenditure</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={person => this.setState({'person': _.upperFirst(_.toLower(person))})}
            placeholder='Person'
          />
          <TextInput
            style={styles.textInput}
            onChangeText={amount => {this.setState({'amount': parseFloat(amount)})}}
            placeholder='Amount'
            keyboardType='numeric'
          />
          <Button
            style={styles.confirmButton}
            styleDisabled={{color: '#7e7e7e'}}
            disabled={!this.validPerson() || !this.validAmount()}
            containerStyle={styles.confirmButtonContainer}
            onPress={() => {this.props.onConfirm(this.state); this.closeModal()}}
          >
            Add
          </Button>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    height: 180,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalContainer: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    color: 'seagreen'
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 6,
    marginTop: 10
  },
  confirmButtonContainer: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'white'
  },
  confirmButton: {
    fontSize: 20,
    color: 'seagreen'
  }
})

AddSpenditureModal.propTypes = {
  modalIsOpen: React.PropTypes.bool,
  onConfirm: React.PropTypes.func
}
