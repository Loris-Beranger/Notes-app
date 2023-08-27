import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/constants'
import { AntDesign } from '@expo/vector-icons'

const ButtonNewNote = ({ onClick }) => {
  return (
    <TouchableOpacity style={styles.buttonNewNoteContainer} onPress={onClick}>
      <AntDesign name='addfile' size={20} color={colors.contentWhite} />
    </TouchableOpacity>
  )
}

export default ButtonNewNote

const styles = StyleSheet.create({
  buttonNewNoteContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.secondaryPurple,
    width: 70,
    height: 70,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
