<template>
    <div>
        <ContextDisplay
                v-bind:transcript="transcript"
                v-bind:string-to-highlight="wordsToResolve[resolvingWord].rawStr"
                v-bind:start-of-string-to-highlight="wordsToResolve[resolvingWord].locationInTranscript"
        />
        <SuggestionsContainer
                v-bind:suggestions="wordsToResolve[resolvingWord].suggestions"
                v-bind:on-click-suggestion="onClickSuggestion"
        />
        <AddNewWord v-bind:str="wordsToResolve[resolvingWord].str" v-bind:on-submit="onSubmitAddNewWord" />
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
    import { addNewWordToDictionary, addWordToUserLexicon } from "../../../functions/addWords";

    export default {
        name: "WordsResolver",
        components: {
            AddNewWord,
            ContextDisplay,
            SuggestionsContainer,
        },
        props: {
            transcript: String,
            wordsToResolve: Array, // Array of objects
        },
        data: function () {
          return {
            resolvingWord: 0,
            wordToQuestionUserAboutAddingToPersonalLexicon: null,
          };
        },
        methods: {
            onSubmitAddNewWord: async function (wordData) {
                this.wordToQuestionUserAboutAddingToPersonalLexicon = await addNewWordToDictionary(wordData, false);
            },
            onClickSuggestion: function (word) {
                // nothing to do in terms of adding to dictionary, since, if we are suggesting it, it already exists
                this.wordToQuestionUserAboutAddingToPersonalLexicon = word;
            },
            onClickAddNewlyCreatedWordToPersonalLexicon: function () {
                addWordToUserLexicon(this.wordToQuestionUserAboutAddingToPersonalLexicon.id, 'userId');
                this.wordToQuestionUserAboutAddingToPersonalLexicon = null;
                this.resolvingWord += 1;
            },
            onClickDontAddNewlyCreatedWordToPersonalLexicon: function () {
                this.wordToQuestionUserAboutAddingToPersonalLexicon = null;
                this.resolvingWord += 1;
            },
            onClickSkipWord: function () {

            },
            /**
             * Transcript is split into phrases that we are targeting for
             * a given clip.  When user finishes resolving words for a given
             * phrase, make call to backend to mark that clip as resolved/usable.
             */
            onFinishClipTranscript: async function() {

            },
        },
    }
</script>

<style scoped>

</style>