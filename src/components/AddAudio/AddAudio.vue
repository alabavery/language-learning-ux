<template>
    <div>
        <Uploading v-if="!uploadsCompleted" v-bind:onComplete="onUploadsComplete" />
        <Parsing
                v-if="uploadsCompleted && !parsingCompleted"
                v-bind:tokenizedTranscript="tokenizedTranscript"
                v-bind:audio="audio"
                v-bind:on-transcript-forward="recordToken"
                v-bind:on-parsing-complete="onParsingComplete"
        />
        <div v-if="wordsToResolve.length && !showResolver">
            Do you mind helping us resolve some of the words from the transcript?
            <button v-on:click="displayResolver">Ok</button>
        </div>
        <WordsResolver
                v-if="showResolver"
                v-bind:words-to-resolve="wordsToResolve"
                v-bind:transcript="transcript"
        />
    </div>
</template>

<script>
import Parsing from "./Parsing/Parsing";
import Uploading from "./Uploading/Uploading";
import WordsResolver from "./Resolving/WordsResolver";

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
        tokens: [],
        showResolver: false,
        wordsToResolve: [],
      };
    },
    methods: {
        onUploadsComplete: function (audio, transcript) {
            console.log("AddAudio's onUpload's complete received audio and transcript of: ");
            console.log(audio);
            console.log(transcript);
            this.audio = audio;
            this.transcript = transcript || "Hello, this is a place holder.  Scroll through it with arrows.  See how.  It goes down. When you hit arrows.";
            this.tokenizedTranscript = this.tokenizeTranscript();
            this.uploadsCompleted = true;
        },
        onParsingComplete: function () {
            this.parsingCompleted = true;
            const wordsToResolve = this.getWordsToResolve();
            if (wordsToResolve.length) {
                this.wordsToResolve = wordsToResolve;
            } else {
                console.log("Completed!!!!!!!")
            }
        },
        tokenizeTranscript: function () {
            // todo make this smarter
            return this.transcript.split('.');
        },
        recordToken: function (audioCurrentTime) {
            this.tokens.push(audioCurrentTime);
        },
        getWordsToResolve: function () {
            // return [
            //     {
            //         str: 'this',
            //         locationInTranscript: 7, // use the index of the character in the whole transcript string???
            //         suggestions: [
            //             { id: 'this1Id', str: 'this', partOfSpeech: 'verb', tense: 'present' },
            //             { id: 'this2Id', str: 'this', partOfSpeech: 'noun' },
            //         ],
            //     },
            //     {
            //         str: 'through',
            //         locationInTranscript: 39,
            //         suggestions: [],
            //     },
            //     {
            //         str: 'arrows',
            //         locationInTranscript: 55,
            //         suggestions: [
            //             { id: 'arrows1Id', str: 'arrows', partOfSpeech: 'verb', tense: 'present' },
            //             { id: 'arrows2Id', str: 'arrows', partOfSpeech: 'noun' },
            //         ],
            //     },
            // ];
        },
        displayResolver: function () {
            this.showResolver = true;
        }
    },
}
</script>

