<template>
    <div id="transcript-input">
        <textarea v-model="transcript" rows="10" cols="100"></textarea>
        <button v-on:click="onSubmit">Save</button>
    </div>
</template>

<script>
    export default {
        name: "TranscriptInput",
        props: {
          onComplete: Function,
        },
        data: function () {
          return { transcript: null };
        },
        methods: {
            validate: function () {
                // is this.transcript valid?
            },
            onSubmit: function () {
                if (!this.validate()) {
                    this.onComplete(this.transcript);
                }
            }
        },
    }
</script>

<style scoped>
    #transcript-input {
        border: 1px solid #2c3e50;
    }
</style>