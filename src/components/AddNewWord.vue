<template>
    <div>
        <h4>Add New Word: {{ str }}</h4>
        <label>
            Meaning
            <input v-model="meaning">
        </label>
        <label>
            Part of speech
            <select v-model="partOfSpeech">
                <option value="noun">Noun</option>
                <option value="verb">Verb</option>
                <option value="adjective">Adjective</option>
                <option value="preposition">Preposition</option>
            </select>
        </label>
        <label v-if="displayVerbTense">
            Verb tense
            <select v-model="verbTense">
                <option value="past">Past</option>
                <option value="present">Present</option>
                <option value="future">Future</option>
                <option value="infinitive">Infinitive</option>
            </select>
        </label>
        <button v-on:click="submit">Submit</button>
        <span v-if="displayValidationMessage">{{ validationMessage }}</span>
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
                verbTense: null,
                validationMessage: null,
            };
        },
        computed: {
            displayVerbTense: function () {
                return this.partOfSpeech === 'verb';
            },
            displayValidationMessage: function () {
                return !!this.validationMessage;
            },
        },
        methods: {
            validate: function() {
                if (!this.meaning) {
                    return "Must enter a meaning!";
                }
                if (!this.partOfSpeech) {
                    return "Must enter a part of speech!";
                }
                if (this.partOfSpeech === 'verb' && !this.verbTense) {
                    return "Must enter a verb tense!";
                }
            },
            submit: function () {
                const validationError = this.validate();
                if (validationError) {
                    this.validationMessage = validationError;
                    return;
                }
                this.onSubmit({
                    meaning: this.meaning,
                    partOfSpeech: this.partOfSpeech,
                });
            },
        },
    }
</script>