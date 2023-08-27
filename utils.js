export const extractAndTruncateFirstWord = inputString => {
  const words = inputString.split(' ') // Divise la chaîne en mots
  const firstWord = words[0] // Récupère le premier mot

  // Coupe le premier mot si sa longueur dépasse 10 caractères
  const truncatedFirstWord =
    firstWord.length > 10 ? firstWord.substring(0, 10) : firstWord

  return truncatedFirstWord
}
