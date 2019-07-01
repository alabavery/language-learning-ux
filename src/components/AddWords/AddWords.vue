<template>
    <div>
        <div v-if="!displayAddedWord">
            <label>
                Enter word here
                <input v-model="userInput" v-on:keyup='setSuggestions'>
            </label>
            <button v-on:click="openAddNewWord">Add new word</button>
            <AddNewWord
                    v-if="displayAddNewWord"
                    v-bind:str="userInput"
                    v-bind:onSubmit="onUserAddedNewWord"
            />
            <SuggestionsContainer
                    v-if="displaySuggestions"
                    v-bind:suggestions="suggestions"
                    v-bind:on-click-suggestion="onUserClickedSuggestion"
            />
        </div>
        <div v-if="displayAddedWord">
            Added!
        </div>
    </div>
</template>

<script>
import SuggestionsContainer from '../common/SuggestionsContainer.vue';
import AddNewWord from '../common/AddNewWord.vue';

export default {
    name: 'AddWords',
    props: {
        knownWords: Array,
        userLexicon: Array,
        addNewWordToDictionaryAndUserLexicon: Function,
        addExistingWordToUserLexicon: Function,
    },
    data: function () {
      return {
        userInput: null,
        suggestions: [],
        displayAddNewWord: false,
        displayAddedWord: false,
      };
    },
    computed: {
      wordsWithUserKnowledge: function () {
        console.log("userLexicon", this.userLexicon);
        return this.knownWords.map(word => ({ ...word, userKnows: this.userLexicon.includes(word.id) }))
      },
      displaySuggestions: function () {
        return (this.userInput || "").length > 2;
      },
    },
    methods: {
      reset: function () {
        this.userInput = "";
        this.displayAddNewWord = false;
      },
      displayAddedWordNotification: function () {
        this.displayAddedWord = true;
        setTimeout(() => {
          this.displayAddedWord = false;
        }, 500)
      },
      onUserAddedNewWord: async function (wordData) {
        await this.addNewWordToDictionaryAndUserLexicon(wordData);
        this.displayAddedWordNotification();
        this.reset();
      },
      onUserClickedSuggestion: async function (word) {
        await this.addExistingWordToUserLexicon(word.id);
        this.displayAddedWordNotification();
        this.reset();
      },
      setSuggestions: function () {
        const len = this.userInput.length;
        if (this.displaySuggestions) {
          this.suggestions =
            this.wordsWithUserKnowledge
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
    },
    components: {
      AddNewWord,
      SuggestionsContainer,
    },
}
</script>
