import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../constants/constants'
import { Entypo } from '@expo/vector-icons'
import { useState, useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { getNoteById } from '../storageFunctions/storage'
import { useRoute } from '@react-navigation/native'
import { extractAndTruncateFirstWord } from '../utils'

const NoteEditScreen = ({ navigation }) => {
  const [inputContentValue, setInputContentValue] = useState('')
  const [inputTitleValue, setInputTitleValue] = useState('')
  const [date, setDate] = useState(new Date().toISOString())
  const [noteId, setNoteId] = useState()
  const inputRef = useRef(null)
  const route = useRoute()

  useEffect(() => {
    const noteId = route.params?.noteId

    if (noteId) {
      const fetchNote = async () => {
        const fetchedNote = await getNoteById(noteId)
        setInputTitleValue(fetchedNote.title)
        setInputContentValue(fetchedNote.value)
        setDate(fetchedNote.date)
        setNoteId(fetchedNote.id)
      }

      fetchNote()
    } else {
      inputRef.current.focus()
    }
  }, [])
  const saveNote = async () => {
    if (inputContentValue.trim(' ') || inputTitleValue.trim(' ')) {
      try {
        const id = Date.now().toString() // Generate a unique ID based on timestamp
        const newNote = {
          id,
          title: inputTitleValue
            ? inputTitleValue
            : extractAndTruncateFirstWord(inputContentValue),
          date,
          value: inputContentValue
        }

        await AsyncStorage.setItem(id, JSON.stringify(newNote))
        console.log('Note saved successfully!')
      } catch (error) {
        console.error('Error saving note:', error)
      }
    }
  }

  const modifyNote = async id => {
    try {
      const existingNote = await getNoteById(id) // Assume you have a getNoteById function

      if (existingNote) {
        const modifiedNote = {
          ...existingNote,
          title: inputTitleValue,
          value: inputContentValue
        }

        await AsyncStorage.setItem(id, JSON.stringify(modifiedNote))
        console.log('Note modified successfully!')
      } else {
        console.log('Note not found.')
      }
    } catch (error) {
      console.error('Error modifying note:', error)
    }
  }

  const handleDone = () => {
    if (noteId) {
      modifyNote(noteId)
    } else {
      saveNote()
    }
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={styles.NoteEditContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.navigate('Home')}
        >
          <Entypo
            name='chevron-left'
            size={20}
            color={colors.contentWhiteMinor}
          />
          <Text style={styles.buttonBackLabel}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonDoneLabel} onPress={handleDone}>
            Terminé
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        ref={inputRef}
        style={styles.textInputTitle}
        placeholder={'Titre'}
        placeholderTextColor={colors.contentGrey}
        onChangeText={setInputTitleValue}
        value={inputTitleValue}
      />
      <Text style={styles.date}>
        {format(new Date(date), 'MMMM dd, HH:mm ccc', {
          locale: fr
        }).replace('.', '')}
      </Text>
      <TextInput
        style={styles.textInputContent}
        onChangeText={setInputContentValue}
        value={inputContentValue}
        multiline
      />
    </SafeAreaView>
  )
}

export default NoteEditScreen

const styles = StyleSheet.create({
  NoteEditContainer: {
    backgroundColor: colors.backgroundPlatform,
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  buttonBackLabel: {
    color: colors.contentWhiteMinor,
    fontSize: 16,
    marginTop: -2
  },
  buttonDoneLabel: {
    color: colors.contentWhiteMinor
  },
  textInputContent: {
    flex: 1,
    textAlignVertical: 'top',
    marginTop: 30,
    color: colors.contentWhiteMinor,
    flexWrap: 'wrap'
  },
  textInputTitle: {
    height: 30,
    fontSize: 20,
    textAlignVertical: 'center',
    marginTop: 30,
    color: colors.contentWhite
  },
  date: {
    color: colors.contentWhiteMinor,
    fontSize: 12,
    marginTop: 10,
    letterSpacing: 0.8
  }
})
