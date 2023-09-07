import React from 'react'
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../constants/constants'

function CustomModal ({ visible, closeModal, action }) {
  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonActionContainer}
              onPress={() => {
                action()
                closeModal()
              }}
            >
              <Text style={styles.buttonActionLabel}>Supprimer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCancelContainer}
              onPress={closeModal}
            >
              <Text style={styles.buttonCancelLabel}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: colors.backgroundModalContainer,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    transform: 'translateY(-20px)',
    paddingHorizontal: 30
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  buttonActionContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: colors.contentGrey,
    borderBottomWidth: 1
  },
  buttonCancelLabel: {
    color: colors.contentWhite,
    fontSize: 16
  },
  buttonCancelContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  buttonActionLabel: {
    color: colors.red,
    fontSize: 16
  }
})

export default CustomModal
