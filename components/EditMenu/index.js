import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/constants'

const EditMenu = () => {
  return (
    <View style={styles.editMenuContainer}>
      <Text>EditMenu</Text>
    </View>
  )
}

export default EditMenu

const styles = StyleSheet.create({
  editMenuContainer: {
    backgroundColor: colors.backgroundContainerSecondary,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10
  }
})
