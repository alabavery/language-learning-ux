<template>
    <div>
<!--        <AudioPlayer v-bind:audio="audio" v-bind:on-create-ref="getAudioRef"/>-->
        <div>
            <button v-on:click="playPauseAudio">Play/Pause</button>
            <button v-on:click="slowDownAudio">Slow Down</button>
            <button v-on:click="speedUpAudio">Speed Up</button>
        </div>
        <TranscriptDisplay v-bind:tokenizedTranscript="tokenizedTranscript" v-bind:focusIndex="transcriptIndex"/>
    </div>
</template>

<script>
    import TranscriptDisplay from './TranscriptDisplay';

    export default {
        name: "Parsing",
        components: {
          TranscriptDisplay,
        },
        props: {
            tokenizedTranscript: Array,
            audio: File,
            onTranscriptForward: Function,
            onParsingComplete: Function,
        },
        data: function () {
          return {
              audioElement: null,
              transcriptIndex: 0,
              tokens: [], // array of current times of audio, where each is the time at which a part of the transcript ends
          };
        },
        mounted: function () {
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
            moveTranscriptForward: function () {
                this.onTranscriptForward(this.audioElement.currentTime);
                if (this.transcriptIndex < this.tokenizedTranscript.length) {
                    this.transcriptIndex += 1;
                } else {
                    this.onParsingComplete(this.tokens);
                }
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