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
        <div v-if="unresolvedStrings.length && !showResolver">
            Do you mind helping us resolve some of the words from the transcript?
            <button v-on:click="displayResolver">Ok</button>
        </div>
        <WordsResolver
                v-if="showResolver"
                v-bind:unresolved-strings="unresolvedStrings"
                v-bind:transcript="transcript"
                v-bind:suggestions="suggestions"
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

        unresolvedStrings: [],
        suggestions: {},
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
            console.log("called onParsingComplete");
            this.parsingCompleted = true;
            const resolveData = await api.getResolveData(this.audioId);
            this.unresolvedStrings = resolveData.unresolvedStrings;
            this.transcript = resolveData.transcript;
            this.suggestions = resolveData.suggestions;
            console.log({ resolveData });
        },
        displayResolver: function () {
            this.showResolver = true;
        }
    },
}
</script>

