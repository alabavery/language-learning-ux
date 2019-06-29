<template>
    <div>
        <h4>Suggestions:</h4>
        <ol>
            <Suggestion
                v-for="suggestion in suggestions"
                v-bind:word="suggestion"
                v-bind:key="suggestion.id"
                v-bind:onClick="() => onClickSuggestion(suggestion)"
            />
        </ol>
    </div>
</template>

<script>
    import Suggestion from './Suggestion.vue';

    export default {
        name: "SuggestionsContainer",
        props: {
            suggestions: Array,
            onClickSuggestion: Function,
        },
        components: {
          Suggestion,
        },
    }
</script>

<style scoped>

</style>