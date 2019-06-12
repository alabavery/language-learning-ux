<template>
    <div>
        <label>
            Enter word here
            <input v-model="userInput" v-on:keyup='getSuggestions'>
        </label>
        <button v-on:click="beginAddNewWord">Add new word</button>
        <SuggestionsContainer seed-string="userInput" />
    </div>
</template>

<script>
import SuggestionsContainer from './SuggestionsContainer.vue';

export default {
    name: 'AddWords',
    data: function () {
      return { userInput: null };
    },
    methods: {
      getSuggestions: () => undefined,
      beginAddNewWord: () => undefined,
    },
    components: {
      SuggestionsContainer,
    },
}
</script>