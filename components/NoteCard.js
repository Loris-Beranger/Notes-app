import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../constants/constants'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const NoteCard = ({ title, value, date, onClick, onLongPress, hover }) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

  const buttonContainerStyle = hover
    ? [styles.noteCardContainer, styles.noteCardContainerHover]
    : styles.noteCardContainer

  const getButtonStyle = () => {
    if (isPressed) {
      return [styles.noteCardContainer, styles.noteCardContainerClicked]
    }
    if (hover) {
      return [styles.noteCardContainer, styles.noteCardContainerHover]
    } else {
      return styles.noteCardContainer
    }
  }

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onClick}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Text style={styles.noteCardTitle}>{title}</Text>
      <Text style={styles.noteCardContent}>{value}</Text>
      <Text style={styles.noteCardDate}>
        {format(new Date(date), 'dd MMM', { locale: fr })}
      </Text>
    </TouchableOpacity>
  )
}

export default NoteCard

const styles = StyleSheet.create({
  noteCardContainer: {
    width: '48%',
    height: 208,
    backgroundColor: colors.backgroundContainer,
    padding: 14,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-between'
  },
  noteCardContainerHover: {
    backgroundColor: colors.backgroundContainerHover
  },
  noteCardContainerClicked: {
    transform: [{ scale: 0.9 }]
  },
  noteCardTitle: {
    color: colors.contentWhite
  },
  noteCardContent: {
    color: colors.contentWhiteMinor,
    marginTop: 8,
    flex: 1
  },
  noteCardDate: {
    color: colors.contentGrey
  }
})
