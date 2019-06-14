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
          v-bind:onSubmit="restOfWordData => addNewWordToDictionaryAndUserLexicon(userInput, restOfWordData)"
        />
        <SuggestionsContainer v-if="displaySuggestions" v-bind:suggestions="suggestions" />
    </div>
</template>

<script>
import SuggestionsContainer from './SuggestionsContainer.vue';
import AddNewWord from './AddNewWord.vue';

export default {
    name: 'AddWords',
    data: function () {
      return {
        userInput: null,
        knownWords: [],
        suggestions: [],
        displayAddNewWord: false,
      };
    },
    computed: {
      displaySuggestions: function () {
        return (this.userInput || "").length > 2;
      },
    },
    mounted: function () {
      console.log("Called backend to get all known words for language");
      this.knownWords = [
          { str: "cat", partOfSpeech: "noun", meaning: "an animal" },
          { str: "catch", partOfSpeech: "verb", tense: "present" },
          { str: "pit", partOfSpeech: "noun" },
          { str: "pitch", partOfSpeech: "verb", tense: "present" },
        ];
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
      addNewWordToDictionaryAndUserLexicon: function (wordString, wordData) {
        console.log(`Made call to backend to add word to dictionary: str: ${wordString}, meaning:${wordData.meaning}, partOfSpeech:${wordData.partOfSpeech}`);
        const newWord = { id: "newId", str: wordString, ...wordData }; // todo this will come from backend
        this.knownWords.push(newWord);
        this.addWordToUserLexicon(newWord.id);
      },
      addWordToUserLexicon: function (wordId) {
        console.log(`Added word ${wordId} to user [insert user id] lexicon`);
      }
    },
    components: {
      SuggestionsContainer,
      AddNewWord,
    },
}
</script>
