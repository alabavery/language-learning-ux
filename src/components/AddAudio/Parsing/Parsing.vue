<template>
    <div>
        <div>
            <button v-on:click="playPauseAudio">Play/Pause</button>
            <button v-on:click="slowDownAudio">Slow Down</button>
            <button v-on:click="speedUpAudio">Speed Up</button>
        </div>
        <TranscriptDisplay v-bind:tokenizedTranscript="tokenizedTranscript" v-bind:focusIndex="transcriptIndex"/>
        <div v-if="complete">Upload these clip divisions? <button v-on:click="onClickComplete">Do it</button></div>
    </div>
</template>

<script>
    import TranscriptDisplay from './TranscriptDisplay';
    import api from '../../../service/api';

    export default {
        name: "Parsing",
        components: {
          TranscriptDisplay,
        },
        props: {
            transcript: String,
            audio: File,
            audioId: String,
            onParsingComplete: Function,
        },
        data: function () {
          return {
              audioElement: null,
              transcriptIndex: 0,
              // array of current times of audio, where each is the time at which a part of the transcript ends
              clipEnds: [],
              tokenizedTranscript: [],
              complete: false,
          };
        },
        mounted: function () {
            this.tokenizedTranscript = this.tokenizeTranscript();
            this.audioElement = new Audio(URL.createObjectURL(this.audio));

            document.onkeydown = e => {
                const key = e.keyCode ? e.keyCode : e.which;

                if (key == 32) { // space
                    this.playPauseAudio();
                    e.preventDefault();

                } else if (key == 39) { // forward
                    this.moveTranscriptForward();
                    e.preventDefault();
                }
            };
        },
        methods: {
            tokenizeTranscript: function () {
                const split = this.transcript.split('.');
                // if you split and the last character is a '.', you will have an empty string for the last phrase
                if (split[split.length - 1] === '') {
                    split.pop();
                }
                return split;
            },
            playPauseAudio: function() {
                if (this.audioElement.paused) {
                    this.audioElement.play();
                } else {
                    this.audioElement.pause();
                }
            },
            slowDownAudio: function() {
                this.audioElement.playbackRate > 0.4
                    ? this.audioElement.playbackRate -= 0.4
                    : null;
            },
            speedUpAudio: function() {
                this.audioElement.playbackRate < 1.8
                    ? this.audioElement.playbackRate += 0.4
                    : null;
            },
            /**
             * Moving the transcript forward means recording a clip End and going to the next phrase in the transcript.
             */
            moveTranscriptForward: function () {
                this.recordClipEnd(this.audioElement.currentTime);

                if (this.transcriptIndex < this.tokenizedTranscript.length - 1) {
                    // if we were not at the last phrase, go to the next
                    this.transcriptIndex += 1;
                } else {
                    // if we were at the last, register as complete
                    this.audioElement.pause();
                    document.onkeydown = null;
                    this.complete = true;
                }
            },
            recordClipEnd: function (audioCurrentTime) {
                this.clipEnds.push(audioCurrentTime);
            },
            onClickComplete: async function () {
                await api.saveParsedAudio({
                    audioId: this.audioId,
                    transcript: this.transcript,
                    clipEnds: this.clipEnds,
                    phrases: this.tokenizedTranscript,
                });
                await this.onParsingComplete();
            },
            /**
             * Todo implement this method - should undo the last token and go back to the
             * audio place when it was recorded
             */
            moveTranscriptBack: function () {
                if (this.transcriptIndex > 0) {
                    this.transcriptIndex -= 1;
                }
            },
        },
    }
</script>

<style scoped>

</style>