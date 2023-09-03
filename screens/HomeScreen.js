import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../constants/constants'
import NoteCard from '../components/NoteCard'
import ButtonNewNote from '../components/ButtonNewNote'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteAllNotes, deleteNotesByIds } from '../storageFunctions/storage'
import { useFocusEffect } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import EmptyState from '../components/EmptyState'

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([])
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectNoteList, setSelectNoteList] = useState([])

  useEffect(() => {
    fetchNotes()
    /* deleteAllNotes() */
  }, [])
  useEffect(() => {
    console.log(selectNoteList)
  }, [selectNoteList])
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

  const handleDelete = () => {
    if (selectNoteList) {
      deleteNotesByIds(selectNoteList, fetchNotes)
      setEditMode(false)
      Vibration.vibrate(50)
    }
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.headerContainer}>
        {editMode ? (
          <TouchableOpacity
            onPress={() => {
              setEditMode(false)
              setSelectNoteList([])
            }}
          >
            <AntDesign name='close' size={20} color={colors.contentWhite} />
          </TouchableOpacity>
        ) : (
          <Text style={styles.homeTitle}>Notes</Text>
        )}
        {editMode && (
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome name='trash-o' size={18} color={colors.contentWhite} />
          </TouchableOpacity>
        )}
      </View>
      {notes && notes.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.notesListContainer}
          showsVerticalScrollIndicator={false}
        >
          {notes.map(note => (
            <NoteCard
              key={note.id}
              title={note.title}
              value={note.value}
              date={note.date}
              hover={selectNoteList.find(n => n === note.id)}
              onClick={() => {
                if (editMode) {
                  if (selectNoteList.find(n => n === note.id)) {
                    setSelectNoteList([
                      ...selectNoteList.filter(n => n !== note.id)
                    ])
                  } else {
                    setSelectNoteList([...selectNoteList, note.id])
                  }
                } else {
                  navigation.navigate('NoteEdit', { noteId: note.id })
                }
              }}
              onLongPress={() => {
                setEditMode(true)
                setSelectNoteList([note.id])
                Vibration.vibrate(50)
              }}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyState />
      )}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
