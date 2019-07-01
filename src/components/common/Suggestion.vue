<template>
    <li v-on:click="onClickMe">
        <span>
            {{ displayWord(word) }}
        </span>
        <span>
            {{ word.userKnows ? '(known)' : ''}}
        </span>
    </li>
</template>

<script>
    export default {
        name: "Suggestion",
        props: {
            word: Object,
            onClick: Function,
        },
        methods: {
            onClickMe: function () {
              if (this.word.userKnows) {
                return;
              }
              this.onClick();
            },
            displayWord: function(word) {
                const partOfSpeechDisplay = word.partOfSpeech === 'verb'
                  ? `${word.partOfSpeech}: ${word.tense || '-'}`
                  : word.partOfSpeech;
                return `${word.str} (${partOfSpeechDisplay || '-'}) ${word.meaning || '-'}`;
            },
        }
    }
</script>