const MIN_REQUIRED_LEN_TO_RESOLVE = 3;
const MOST_FREQUENT_STRINGS_IN_LANGUAGE = [ /*pretend it's filled out */];
/**
 * return array of:
 *	{
 *		str: <raw str from transcript, casing and all>,
 *		locationInTranscript: <index of beginning of str>,
 *		suggestions: word[],
 *	}
 **/
export default function getResolveData(transcript, knownWords, mostFrequentStrings) {
  const returned = [];
  // get known words that match (normalized) str
  // if multiple, must resolve
  // if one, find all occurences of str in top 5000 most frequenct words in language
  // if only one, no need to resolve
  // if multiple, need to resolve
  const stringsAndLocationsInTranscript = splitTranscriptIntoStrings(transcript);

  for (let i = 0; i < stringsAndLocationsInTranscript.length; i++) {
    const current = stringsAndLocationsInTranscript[i];
    const knownWordsForStr = knownWords.filter(word => word.str === current.rawStr.toLowerCase());
    if (knownWordsForStr.length > 1) {
      returned.push({ ...current, suggestions: knownWordsForStr });
    } else if (knownWordsForStr === 0) {
      returned.push({ ...current, suggestions: [] });
    } else {
      if (mostFrequentStrings.filter(str => str === current.rawStr.toLowerCase()).length > 1) {
        returned.push({ ...current, suggestions: knownWordsForStr });
      }
    }
  }
  return returned;
}

const getRawStr = (transcript, lastSpaceOrPunctuation, end) =>
    transcript.slice(lastSpaceOrPunctuation + 1, end);

export function splitTranscriptIntoStrings(transcript) {
  const returned = [];
  let lastSpaceOrPunctuation = -1;
  let i = 0;
  while (i < transcript.length) {
    if ([' ', '.', ',', '"'].includes(transcript[i])) {
      if (i - lastSpaceOrPunctuation >= 3) {
        returned.push({
          rawStr: getRawStr(transcript, lastSpaceOrPunctuation, i),
          locationInTranscript: lastSpaceOrPunctuation + 1,
        });
      }
      lastSpaceOrPunctuation = i;
    } else if (i + 1 === transcript.length) {
      if (i - lastSpaceOrPunctuation >= 3) {
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
