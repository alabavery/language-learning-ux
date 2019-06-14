<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <NavBar v-bind:onClickTab="changePageDisplayed" />
    <AddAudio v-if="pageDisplayed==='addAudio'" />
    <AddWords v-if="pageDisplayed==='addWords'"/>
  </div>
</template>

<script>
import AddWords from './components/AddWords.vue';
import AddAudio from './components/AddAudio.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'app',
  components: {
    AddAudio,
    AddWords,
    NavBar,
  },
  data: function () {
    return {
      pageDisplayed: "addWords",
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
  margin-top: 60px;
}
</style>
