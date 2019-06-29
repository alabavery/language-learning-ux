<template>
    <div id="transcript-display">
        <div class="non-focus">{{ preFocusText }}</div>
        <div class="focus">{{ focusText }}</div>
        <div class="non-focus">{{ postFocusText }}</div>
    </div>
</template>

<script>
    export default {
        name: "TranscriptDisplay",
        props: {
            tokenizedTranscript: Array,
            focusIndex: Number,
        },
        computed: {
            preFocusText: function () {
                return this.tokenizedTranscript[this.focusIndex - 1];
            },
            focusText: function () {
                return this.tokenizedTranscript[this.focusIndex];
            },
            postFocusText: function () {
                return this.tokenizedTranscript[this.focusIndex + 1];
            },
        },
    }
</script>

<style scoped>
    #transcript-display {
        border: 1px solid #2c3e50;
    }
    .focus {
        background-color: yellow;
    }
</style>