<template>
    <div v-if="(seedString || '').length > 2">
        <h4>Suggestions:</h4>
        <ol>
            <Suggestion
                v-for="suggestion in suggestions"
                v-bind:word="suggestion"
                v-bind:key="suggestion.id"
            />
        </ol>
    </div>
</template>

<script>
    import Suggestion from './Suggestion.vue';

    export default {
        name: "SuggestionsContainer",
        props: {
          seedString: String,
        },
        components: {
          Suggestion,
        },
        data: function () {
          return {
            suggestions: [],
          };
        },
    }
</script>

<style scoped>

</style>