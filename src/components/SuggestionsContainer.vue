<template>
    <div>
        <h4>Suggestions: {{ seedString }}</h4>
        <ol>
        </ol>
    </div>
</template>

<script>
  export default {
    name: "SuggestionsContainer",
    props: {
      seedString: String,
    },
  }
</script>

<style scoped>

</style>