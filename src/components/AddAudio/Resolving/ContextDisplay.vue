<template>
    <div>
        <span>{{ transcript.slice(displayData.start, startOfStringToHighlight) }}</span>
        <span id="string-to-highlight">{{ stringToHighlight }}</span>
        <span>{{ transcript.slice(startOfStringToHighlight + stringToHighlight.length, displayData.end) }}</span>
    </div>
</template>

<script>
    import {getBookendsOfContext} from "../../../functions/contextDisplay";

    export default {
        name: "ContextDisplay",
        props: {
            transcript: String,
            stringToHighlight: String,
            startOfStringToHighlight: Number,
        },
        computed: {
            /**
             * show sentence of word, plus maybe sentence before if sentence is super short?
             * so find the first period in the transcript prior to the word in question, or start of transcript if
             * none
             * return index of start of displayed sentence(s), index of end
             * @returns {{end: NumberConstructor, start: NumberConstructor}}
             */
            displayData: function () {
                return getBookendsOfContext(this.transcript, this.startOfStringToHighlight);
            },
        },
    }
</script>

<style scoped>
    #string-to-highlight {
        background-color: yellow;
    }
</style>