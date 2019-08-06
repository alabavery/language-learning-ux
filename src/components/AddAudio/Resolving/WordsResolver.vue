<template>
    <div>
        <ContextDisplay
                v-bind:clip-text="clip.text"
                v-bind:string-to-highlight="unresolvedStrings[resolvingUnresolvedString].rawString"
                v-bind:start-of-string-to-highlight="unresolvedStrings[resolvingUnresolvedString].locationInText"
        />
        <SuggestionsContainer
                v-bind:suggestions="suggestions[unresolvedStrings[resolvingUnresolvedString].id]"
                v-bind:on-click-suggestion="onClickSuggestion"
        />
        <AddNewWord
                v-bind:str="unresolvedStrings[resolvingUnresolvedString].rawString"
                v-bind:on-submit="onSubmitAddNewWord"
        />
        <button v-on:click="onClickSkipWord">Skip this word</button>
        <div v-if="!!wordToQuestionUserAboutAddingToPersonalLexicon">
            Add this word to your personal lexicon?
            <button v-on:click="onClickAddWordToUserLexicon">Yes</button>
            <button v-on:click="onClickDontAddNewlyCreatedWordToPersonalLexicon">No</button>
        </div>
    </div>
</template>

<script>
    import AddNewWord from "../../common/AddNewWord";
    import SuggestionsContainer from "../../common/SuggestionsContainer";
    import ContextDisplay from "./ContextDisplay";
    import api from '../../../service/api';

    export default {
        name: "WordsResolver",
        components: {
            AddNewWord,
            ContextDisplay,
            SuggestionsContainer,
        },
        props: {
            clip: Object,
            unresolvedStrings: Array,
            suggestions: Object, // keyed by unresolved string id
            onFinishWordsInClip: Function,
            userId: String,
        },
        data: function () {
          return {
            resolvingUnresolvedString: 0,
            wordToQuestionUserAboutAddingToPersonalLexicon: null,
          };
        },
        methods: {
            onSubmitAddNewWord: async function (wordData) {
                const newWord = await api.addNewWordToDictionary(wordData, false);
                await api.resolveUnresolvedString(
                    this.unresolvedStrings[this.resolvingUnresolvedString].id,
                    newWord.id,
                );
                this.wordToQuestionUserAboutAddingToPersonalLexicon = newWord;
            },
            onClickSuggestion: async function (word) {
                await api.resolveUnresolvedString(
                    this.unresolvedStrings[this.resolvingUnresolvedString].id,
                    word.id,
                );
                this.wordToQuestionUserAboutAddingToPersonalLexicon = word;
            },
            onClickAddWordToUserLexicon: async function () {
                await api.addExistingWordToUserLexicon(
                    this.wordToQuestionUserAboutAddingToPersonalLexicon.id,
                    this.userId,
                );
                this.wordToQuestionUserAboutAddingToPersonalLexicon = null;
                this.incrementResolvingWord();
            },
            onClickDontAddNewlyCreatedWordToPersonalLexicon: function () {
                this.wordToQuestionUserAboutAddingToPersonalLexicon = null;
                this.incrementResolvingWord();
            },
            onClickSkipWord: function () {
                this.incrementResolvingWord();
            },
            incrementResolvingWord: function () {
                this.resolvingUnresolvedString += 1;
                if (this.resolvingUnresolvedString === this.unresolvedStrings.length) {
                    this.onFinishWordsInClip();
                }
            }
        },
    }
</script>

<style scoped>

</style>