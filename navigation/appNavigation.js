// In App.js in a new project

import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import { StatusBar } from 'expo-status-bar'
import NoteEditScreen from '../screens/NoteEditScreen'

const Stack = createNativeStackNavigator()

function AppNavigator () {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0
          },
          animation: 'flip'
        })}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='NoteEdit' component={NoteEditScreen} />
      </Stack.Navigator>
      <StatusBar style='light' />
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
})
