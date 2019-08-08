<template>
    <div>
        <Uploading
                v-if="showUploading"
                v-bind:onComplete="onUploadsComplete"
        />
        <Parsing
                v-if="showParsing"
                v-bind:transcript="transcript"
                v-bind:audio="audio"
                v-bind:audio-id="audioId"
                v-bind:on-parsing-complete="onParsingComplete"
        />
        <div v-if="showQuestionAboutResolver">
            Do you mind helping us resolve some of the words from the transcript?
            <button v-on:click="displayResolver">Ok</button>
        </div>
        <WordsResolver
                v-if="showResolver"
                v-bind:clip="resolveData[resolvingClipIndex].clip"
                v-bind:unresolved-strings="resolveData[resolvingClipIndex].unresolvedStrings"
                v-bind:suggestions="resolveData[resolvingClipIndex].suggestions"
                v-bind:on-finish-words-in-clip="onResolverFinishesWordsInClip"
                v-bind:user-id="userId"
        />
        <div v-if="showDone">
            Done!
            <button v-on:click="displayUploading">Do another audio source?</button>
        </div>
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
        userId: String,
    },
    data: function () {
      return {
        uploadsCompleted: false,
        parsingCompleted: false,

        audioId: null, // provided when onUploadsComplete runs
        transcript: null, // provided when onUploadsComplete runs
        audio: null, // provided when onUploadsComplete posts the audio and gets a res

        // after parsing is completed, api.saveParsedAudio creates all the resulting data, after which
        // api.getResolveData gets resolveData
        // resolveData is an array of { clip, unresolvedStrings, suggestions: { [unresolvedString.id]: KnownWord[] }}},
        // where items correspond to clips and are ordered in the order of the clips in the full audio, and
        // unresolvedStrings in each item are ordered in their order in their clip's text
        resolveData: [],
        resolvingClipIndex: 0,

        showUploading: true,
        showParsing: false,
        showQuestionAboutResolver: false,
        showResolver: false,
        showDone: false,
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
            this.audioId = res.id;

            this.showUploading = false;
            this.showParsing = true;
        },
        onParsingComplete: async function (clipEnds, tokenizedTranscript) {
            await api.saveParsedAudio({
                audioId: this.audioId,
                transcript: this.transcript,
                clipEnds,
                phrases: tokenizedTranscript,
            });
            this.showParsing = false;
            this.resolveData = await api.getResolveData(this.audioId);

            if (this.resolveData.length) {
                this.showQuestionAboutResolver = true;
            } else {
                this.showDone = true;
            }
        },
        displayResolver: function () {
            this.showQuestionAboutResolver = false;
            this.showResolver = true;
        },
        onResolverFinishesWordsInClip: function () {
            this.resolvingClipIndex += 1;

            if (this.resolvingClipIndex === this.resolveData.length) {
                this.showResolver = false;
                this.showDone = true;
            }
        },
        displayUploading: function () {
            this.showDone = false;
            this.showUploading = true;
        },
    },
}
</script>

