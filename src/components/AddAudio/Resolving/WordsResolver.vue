<template>
    <div>
        <ContextDisplay
                v-bind:transcript="transcript"
                v-bind:string-to-highlight="unresolvedStrings[resolvingWord].rawString"
                v-bind:start-of-string-to-highlight="unresolvedStrings[resolvingWord].locationInText"
        />
        <SuggestionsContainer
                v-bind:suggestions="suggestions[unresolvedStrings[resolvingWord].id]"
                v-bind:on-click-suggestion="onClickSuggestion"
        />
        <AddNewWord v-bind:str="unresolvedStrings[resolvingWord].rawString" v-bind:on-submit="onSubmitAddNewWord" />
        <button v-on:click="onClickSkipWord">Skip this word</button>
        <div v-if="!!wordToQuestionUserAboutAddingToPersonalLexicon">
            Add this word to your personal lexicon?
            <button v-on:click="onClickAddNewlyCreatedWordToPersonalLexicon">Yes</button>
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
            transcript: String,
            unresolvedStrings: Array,
            suggestions: Object, // this is { [unresolved-string-id]: KnownWord[] }
        },
        data: function () {
          return {
            resolvingWord: 0,
            wordToQuestionUserAboutAddingToPersonalLexicon: null,
          };
        },
        methods: {
            onSubmitAddNewWord: async function (wordData) {
                const newWord = await api.addNewWordToDictionary(wordData, false);
                await api.resolveUnresolvedString(
                    this.unresolvedStrings[this.resolvingWord].id,
                    newWord.id,
                );
                this.wordToQuestionUserAboutAddingToPersonalLexicon = newWord;

            },
            onClickSuggestion: async function (word) {
                await api.resolveUnresolvedString(
                    this.unresolvedStrings[this.resolvingWord].id,
                    word.id,
                );
                this.wordToQuestionUserAboutAddingToPersonalLexicon = word;
            },
            onClickAddNewlyCreatedWordToPersonalLexicon: async function () {
                await api.addExistingWordToUserLexicon(
                    this.wordToQuestionUserAboutAddingToPersonalLexicon.id,
                    'userId',
                );
                this.wordToQuestionUserAboutAddingToPersonalLexicon = null;
                this.resolvingWord += 1;
            },
            onClickDontAddNewlyCreatedWordToPersonalLexicon: function () {
                this.wordToQuestionUserAboutAddingToPersonalLexicon = null;
                this.resolvingWord += 1;
            },
            onClickSkipWord: function () {
                this.resolvingWord += 1;
            },
        },
    }
</script>

<style scoped>

</style>