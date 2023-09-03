import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const EmptyState = () => {
  return (
    <View style={styles.emptyStateContainer}>
      <MaterialCommunityIcons
        name='note-off'
        size={50}
        color={colors.contentWhiteMinor}
      />
      <Text style={styles.title}>Vous n'avez aucune note</Text>
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    transform: 'translateY(-40px)'
  },
  title: {
    color: colors.contentWhiteMinor,
    fontSize: 18
  }
})
