<template>
    <div>
        <span>{{ transcript.slice(displayData.startOfDisplayed, startOfStringToHighlight) }}</span>
        <span id="string-to-highlight">{{ stringToHighlight }}</span>
        <span>{{ transcript.slice(startOfStringToHighlight + stringToHighlight.length, displayData.endOfDisplayed) }}</span>
    </div>
</template>

<script>
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
             * @returns {{endOfDisplayed: NumberConstructor, startOfDisplayed: NumberConstructor}}
             */
            displayData: function () {
                let beginningFinder = this.startOfStringToHighlight;
                while (beginningFinder > 0) {
                    beginningFinder -= 1;
                    if (this.transcript[beginningFinder] === '.') {
                        break;
                    }
                }
                let endFinder = this.startOfStringToHighlight;
                while (endFinder < this.transcript.length) {
                    endFinder += 1;
                    if (this.transcript[endFinder] === '.') {
                        break;
                    }
                }
                return {
                    startOfDisplayed: beginningFinder,
                    endOfDisplayed: endFinder,
                };
            },
        },
    }
</script>

<style scoped>
    #string-to-highlight {
        background-color: yellow;
    }
</style>