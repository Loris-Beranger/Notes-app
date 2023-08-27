import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../constants/constants'
import NoteCard from '../components/NoteCard'
import ButtonNewNote from '../components/ButtonNewNote'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteAllNotes } from '../storageFunctions/storage'
import { useFocusEffect } from '@react-navigation/native'

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes()
    /* deleteAllNotes() */
  }, [])
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotes()
    })

    return unsubscribe
  }, [navigation])

  const fetchNotes = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      const noteKeys = allKeys.filter(key => !isNaN(parseInt(key))) // Filter out non-numeric keys
      const noteArray = await AsyncStorage.multiGet(noteKeys)

      const parsedNotes = noteArray.map(([key, value]) => JSON.parse(value))
      setNotes(parsedNotes)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.homeTitle}>Notes</Text>
      <ScrollView
        contentContainerStyle={styles.notesListContainer}
        showsVerticalScrollIndicator={false}
      >
        {notes &&
          notes.map(note => (
            <NoteCard
              key={note.id}
              title={note.title}
              value={note.value}
              date={note.date}
              onClick={() =>
                navigation.navigate('NoteEdit', { noteId: note.id })
              }
            />
          ))}
      </ScrollView>
      <ButtonNewNote onClick={() => navigation.navigate('NoteEdit')} />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: colors.backgroundPlatform,
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  homeTitle: {
    color: colors.contentWhite,
    fontSize: 20
  },
  notesListContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
    paddingBottom: 50
  }
})
