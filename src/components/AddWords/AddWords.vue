<template>
    <div>
        <label>
            Enter word here
            <input v-model="userInput" v-on:keyup='setSuggestions'>
        </label>
        <button v-on:click="openAddNewWord">Add new word</button>
        <AddNewWord
          v-if="displayAddNewWord"
          v-bind:str="userInput"
          v-bind:onSubmit="addNewWordToDictionaryAndUserLexicon"
        />
        <SuggestionsContainer v-if="displaySuggestions" v-bind:suggestions="suggestions" />
    </div>
</template>

<script>
import SuggestionsContainer from '../common/SuggestionsContainer.vue';
import AddNewWord from '../common/AddNewWord.vue';
import { addNewWordToDictionary } from "../../functions/addWords";

export default {
    name: 'AddWords',
    props: {
        knownWords: Array,
    },
    data: function () {
      return {
        userInput: null,
        suggestions: [],
        displayAddNewWord: false,
      };
    },
    computed: {
      displaySuggestions: function () {
        return (this.userInput || "").length > 2;
      },
    },
    methods: {
      setSuggestions: function () {
        const len = this.userInput.length;
        if (this.displaySuggestions) {
          this.suggestions =
            this.knownWords
              .filter(
                word => word.str.slice(0, len) === this.userInput,
              );
        } else {
          this.suggestions = [];
        }
      },
      openAddNewWord: function () {
        this.displayAddNewWord = true;
      },
      addNewWordToDictionaryAndUserLexicon: function (wordData) {
        const newWord = addNewWordToDictionary(wordData, true, 'userId');
        this.knownWords.push(newWord);
      },
    },
    components: {
      SuggestionsContainer,
      AddNewWord,
    },
}
</script>
