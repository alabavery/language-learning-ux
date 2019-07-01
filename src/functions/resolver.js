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
    const knownWordsForStr = knownWords.filter(word => word.str === current.standardizeStr);
    if (knownWordsForStr.length > 1) {
      returned.push({ ...current, suggestions: knownWordsForStr });
    } else if (knownWordsForStr === 0) {
      returned.push({ ...current, suggestions: [] });
    } else {
      if (mostFrequentStrings.filter(str => str === current.standardizedStr).length > 1) {
        returned.push({ ...current, suggestions: knownWordsForStr });
      }
    }
  }
  return returned;
}

function splitTranscriptIntoStrings(transcript) {
  const returned = [];
  let lastSpaceOrPunctuation = 0;
  for (let i = 0; i < transcript.length; i++) {
    if ([' ', '.', ','].includes(transcript[i])) {
      // if (i - lastSpaceOrPunctuation >= MIN_REQUIRED_LEN_TO_RESOLVE) {
      if (stringIsAcceptable(transcript.slice(lastSpaceOrPunctuation + 1, i))) {
        returned.push({
          locationInTranscript: lastSpaceOrPunctuation + 1,
          str: transcript.slice(lastSpaceOrPunctuation + 1, i),
          standardizedStr: transcript.slice(lastSpaceOrPunctuation + 1, i).toLowerCase()// standardizeStr(transcript.slice(lastSpaceOrPunctuation + 1, i))
        });
      }
      lastSpaceOrPunctuation = i;
    }
  }
  return returned;
}

function stringIsAcceptable(str) {
  const s = [',', '.', ';', '/'].reduce((strSoFar, charToRemove) => strSoFar.replace(charToRemove, ''), str).trim();
  return s.length >= 3;
}