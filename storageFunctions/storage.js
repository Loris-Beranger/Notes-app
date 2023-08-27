import AsyncStorage from '@react-native-async-storage/async-storage'

export const deleteAllNotes = async () => {
  try {
    await AsyncStorage.clear()
    console.log('All notes deleted successfully!')
  } catch (error) {
    console.error('Error deleting notes:', error)
  }
}

export const deleteNotesByIds = async (ids, fetchNotes) => {
  try {
    // Supprimer chaque note individuellement en fonction de son ID
    for (const id of ids) {
      await AsyncStorage.removeItem(id.toString())
    }
    fetchNotes()
    console.log('Notes deleted successfully!')
  } catch (error) {
    console.error('Error deleting notes:', error)
  }
}

export const getNoteById = async noteId => {
  try {
    const note = await AsyncStorage.getItem(noteId)
    if (note !== null) {
      return JSON.parse(note)
    } else {
      console.log('Note not found.')
      return null
    }
  } catch (error) {
    console.error('Error getting note:', error)
    return null
  }
}
