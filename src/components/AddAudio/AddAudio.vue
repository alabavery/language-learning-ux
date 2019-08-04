<template>
    <div>
        <Uploading v-if="!uploadsCompleted" v-bind:onComplete="onUploadsComplete" />
        <Parsing
                v-if="uploadsCompleted && !parsingCompleted"
                v-bind:transcript="transcript"
                v-bind:audio="audio"
                v-bind:audio-id="audioId"
                v-bind:on-parsing-complete="onParsingComplete"
        />
        <div v-if="Object.keys(resolveData).length && !showResolver">
            Do you mind helping us resolve some of the words from the transcript?
            <button v-on:click="displayResolver">Ok</button>
        </div>
        <WordsResolver
                v-if="showResolver"
                v-bind:resolve-data="resolveData"
                v-bind:transcript="transcript"
        />
    </div>
</template>

<script>
import Parsing from "./Parsing/Parsing";
import Uploading from "./Uploading/Uploading";
import WordsResolver from "./Resolving/WordsResolver";
import api from '../../service/api';

export default {
    name: "AddAudio",
    components: {
        Uploading,
        Parsing,
        WordsResolver,
    },
    props: {
      knownWords: Array,
      userLexicon: Array,
      addNewWordToDictionaryAndUserLexicon: Function,
      addExistingWordToUserLexicon: Function,
    },
    data: function () {
      return {
        uploadsCompleted: false,
        parsingCompleted: false,
        transcript: null,
        audio: null,
        audioId: null,
        showResolver: false,
        // after parsing complete, create clips, and call method to determine which
        // have words that need resolving.  Set this to
        // { [clipId]: { phraseId, phraseContent, wordsToResolve } }
        // where wordsToResolve is and array of { rawStr, suggestions }
        resolveData: {},
      };
    },
    methods: {
        /**
         * As soon as the user has saved their transcript and selected an audio file, make the request to the backend
         * to save the audio media and record.
         * @param audio
         * @param transcript
         * @returns {Promise<void>}
         */
        onUploadsComplete: async function (audio, transcript) {
            this.audio = audio;
            this.transcript = transcript;
            const res = await api.saveRawAudio(audio, transcript);
            console.log("res", res);
            this.audioId = res.id;
            this.uploadsCompleted = true;
        },
        onParsingComplete: async function () {
            this.parsingCompleted = true;

        },
        displayResolver: function () {
            this.showResolver = true;
        }
    },
}
</script>

