<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <NavBar v-bind:onClickTab="changePageDisplayed" v-bind:pageDisplayed="pageDisplayed" />
    <AddAudio v-bind:knownWords="knownWords" v-if="pageDisplayed==='addAudio'" />
    <AddWords v-bind:knownWords="knownWords" v-if="pageDisplayed==='addWords'"/>
  </div>
</template>

<script>
import AddWords from './components/AddWords/AddWords.vue';
import AddAudio from './components/AddAudio/AddAudio.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'app',
  components: {
    AddAudio,
    AddWords,
    NavBar,
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
  data: function () {
    return {
      pageDisplayed: "addWords",
      knownWords: [],
    };
  },
  methods: {
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
