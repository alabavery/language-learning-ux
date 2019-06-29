<template>
    <li v-on:click="onClick">{{ displayWord(word) }}</li>
</template>

<script>
    export default {
        name: "Suggestion",
        props: {
            word: Object,
            onClick: Function,
        },
        methods: {
            displayWord: function(word) {
                const partOfSpeechDisplay = word.partOfSpeech === 'verb' ? `${word.partOfSpeech}: ${word.tense || '-'}` : word.partOfSpeech;
                return `${word.str} (${partOfSpeechDisplay || '-'}) ${word.meaning || '-'}`;
            },
        }
    }
</script>