import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

async function makeGetCall(url, queryParams) {
  return (await axios.get(`${BASE_URL}/${url}`, { params: queryParams || {}})).data;
}

async function makePostCall(url, body) {
  return (await axios.post(`${BASE_URL}/${url}`, body)).data;
}

export default {
  getKnownWords: async () => makeGetCall('word/known-words'),
  getUserLexicon: async userId => makeGetCall(`word/user-lexicon/${userId}`),
  addExistingWordToUserLexicon: async (wordId, userId)  => {
    console.log("api.addExistingWordToUserLexicon called with ", wordId, userId);
    return makePostCall(`word/user-lexicon`, {
      wordId,
      userId,
    });
  },
  addNewWordToDictionary: async (wordData, alsoAddToUserLexicon, userId) => {
    if (alsoAddToUserLexicon && !userId) {
      throw new Error(`Must include a userId!`)
    }
    return makePostCall('word/known-words', {
      wordData,
      alsoAddToUserLexicon,
      userId,
    });
  },
  saveRawAudio: async (audio, transcript) => {
    const form = new FormData();
    form.append('audio', audio);
    form.append('transcript', transcript);
    return makePostCall('audio', form);
  },
  saveParsedAudio: async ({ audioId, transcript, clipEnds, phrases }) => {
    return makePostCall('parse', {
      audioId,
      transcript,
      clipEnds,
      phrases,
    });
  },
  getResolveData: async audioId => makeGetCall(`parse`, { audioId }),
  /**
   * This is used when user is resolving strings from their transcript.
   * @param unresolvedStringId
   * @param wordId
   * @returns {Promise<void>}
   */
  resolveUnresolvedString: async (unresolvedStringId, wordId) => {

  },
};