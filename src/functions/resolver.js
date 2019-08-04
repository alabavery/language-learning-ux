export const MIN_REQUIRED_LEN_TO_RESOLVE = 4;

export function getResolveDataForTranscript(
    clipIdToTranscriptExcerpt, //  { [clipId]: { phraseId, phraseContent } }
    knownWords,
    mostFrequentStrings,
  ) {
  return Object.keys(clipIdToTranscriptExcerpt).reduce((clipIdToNeedResolvingMap, clipId) => {
    // get { rawStr, locationInPhrase } for string in this phrase that is over threshold length
    const stringsToSave = splitPhraseIntoStringsToSave(clipIdToTranscriptExcerpt[clipId].phraseContent);

    const resolveData = stringsToSave.reduce((acc, s) => {
      const resolveDataForS = getResolveDataForStr(s.rawStr, knownWords, mostFrequentStrings);
      if (resolveDataForS) {
        acc.push({ ...resolveDataForS, locationInPhrase: s.locationInPhrase })
      }
      return acc;
    }, []);

    if (resolveData.length) {
      clipIdToNeedResolvingMap[clipId] = resolveData;
    }
    return clipIdToNeedResolvingMap;
  }, {});
}

/**
 * Return an array of words if the str needs resolving.  This can be an empty array if the
 * str needs resolving but there are no known words to suggest.
 * @param rawStr
 * @param knownWords
 * @param mostFrequentStrings
 * @returns {Array|*}
 */
export function getResolveDataForStr(rawStr, knownWords, mostFrequentStrings) {
  const standardizedStr = rawStr.toLowerCase();
  const knownWordsForStr = knownWords.filter(word => word.str === standardizedStr);
  // if there are no known words, the user must create a new word for this
  if (knownWordsForStr.length === 0) {
    return { rawStr, suggestions: [] };
  }
  // if there are multiple known words, user must resolve which of them it is
  if (knownWordsForStr.length > 1) {
    return { rawStr, suggestions: knownWordsForStr };
  }
  // if there is a single known word, but there are multiple strings in the top frequent strings
  // that match this one, there's a chance it is one of those others, so still need resolving
  if (mostFrequentStrings.filter(str => str === standardizedStr).length > 1) {
    return { rawStr, suggestions: knownWordsForStr };
  }
}

const getRawStr = (transcript, lastSpaceOrPunctuation, end) =>
    transcript.slice(lastSpaceOrPunctuation + 1, end);

export function splitTranscriptIntoStrings(transcript) {
  const returned = [];
  let lastSpaceOrPunctuation = -1;
  let i = 0;
  while (i < transcript.length) {
    if ([' ', '.', ',', '"'].includes(transcript[i])) {
      if (i - lastSpaceOrPunctuation > MIN_REQUIRED_LEN_TO_RESOLVE) {
        returned.push({
          rawStr: getRawStr(transcript, lastSpaceOrPunctuation, i),
          locationInTranscript: lastSpaceOrPunctuation + 1,
        });
      }
      lastSpaceOrPunctuation = i;
    } else if (i + 1 === transcript.length) {
      if (i - lastSpaceOrPunctuation >= MIN_REQUIRED_LEN_TO_RESOLVE) {
        returned.push({
          rawStr: getRawStr(transcript, lastSpaceOrPunctuation, i + 1),
          locationInTranscript: lastSpaceOrPunctuation + 1,
        });
      }
    }
    i += 1;
  }
  return returned;
}
