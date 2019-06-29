/**
 * If shouldAddToUserLexicon is true, userId must also be provided
 * @param wordData
 * @param shouldAddToUserLexicon
 * @param userId
 * @returns {{id: string}}
 */
export function addNewWordToDictionary (wordData, shouldAddToUserLexicon, userId = null) {
    console.log(`Made call to backend to add word to dictionary: str: ${wordData.str}, meaning:${wordData.meaning}, partOfSpeech:${wordData.partOfSpeech}`);
    const newWord = { id: "newId", ...wordData }; // todo this will come from backend
    if (shouldAddToUserLexicon) {
        addWordToUserLexicon(newWord.id, userId);
    }
    return newWord;
}

export function addWordToUserLexicon (wordId, userId) {
    console.log(`Added word ${wordId} to user ${userId} lexicon`);
}