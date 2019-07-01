<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <NavBar
            v-bind:onClickTab="changePageDisplayed"
            v-bind:pageDisplayed="pageDisplayed" />
    <AddAudio
            v-if="pageDisplayed==='addAudio'"
            v-bind:knownWords="knownWords"
            v-bind:user-lexicon="userLexicon"
            v-bind:add-new-word-to-dictionary="addNewWordToDictionary"
            v-bind:add-new-word-to-dictionary-and-user-lexicon="addNewWordToDictionaryAndUserLexicon"
            v-bind:add-existing-word-to-user-lexicon="addExistingWordToUserLexicon"
    />
    <AddWords
            v-if="pageDisplayed==='addWords'"
            v-bind:knownWords="knownWords"
            v-bind:user-lexicon="userLexicon"
            v-bind:add-new-word-to-dictionary-and-user-lexicon="addNewWordToDictionaryAndUserLexicon"
            v-bind:add-existing-word-to-user-lexicon="addExistingWordToUserLexicon"
    />
  </div>
</template>

<script>
import api from './service/api';
import AddWords from './components/AddWords/AddWords.vue';
import AddAudio from './components/AddAudio/AddAudio.vue';
import NavBar from './components/NavBar.vue';

const MY_ID = 'd277b5ab-8bb3-4ec4-8cd8-e7ee97e9c4b7';

export default {
  name: 'app',
  components: {
    AddAudio,
    AddWords,
    NavBar,
  },
  mounted: async function () {
    this.knownWords = await api.getKnownWords();
    this.userLexicon = await api.getUserLexicon(MY_ID);
  },
  data: function () {
    return {
      pageDisplayed: "addWords",
      knownWords: [],
      userLexicon: [], // array of wordIds
    };
  },
  methods: {
    addNewWordToDictionary: async function (wordData) {
      await api.addNewWordToDictionary(wordData, false);
    },
    addNewWordToDictionaryAndUserLexicon: async function (wordData) {
      await api.addNewWordToDictionary(wordData, true, MY_ID);
      this.knownWords = await api.getKnownWords();
      this.userLexicon = await api.getUserLexicon(MY_ID);
    },
    addExistingWordToUserLexicon: async function (wordId) {
      await api.addExistingWordToUserLexicon(wordId, MY_ID);
      this.userLexicon = await api.getUserLexicon(MY_ID);
    },
    changePageDisplayed: function (pageToChangeTo) {
      this.pageDisplayed = pageToChangeTo;
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
