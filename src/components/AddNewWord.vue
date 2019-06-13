<template>
    <div>
        <h4>Add New Word: {{ str }}</h4>
        <label>
            Meaning
            <input v-model="meaning">
        </label>
        <label>
            Part of speech
            <input v-model="partOfSpeech">
        </label>
        <button v-on:click="submit">Submit</button>
    </div>
</template>

<script>
    export default {
        name: "AddNewWord",
        props: {
            str: String,
            onSubmit: Function,
        },
        data: function () {
            return {
                meaning: null,
                partOfSpeech: null,
            };
        },
        methods: {
            submit: function () {
                // todo validate that form is filled out correctly
                this.onSubmit({
                    meaning: this.meaning,
                    partOfSpeech: this.partOfSpeech,
                });
            },
        },
    }
</script>