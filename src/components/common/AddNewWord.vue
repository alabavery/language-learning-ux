<template>
    <div id="add-new-word">
        <h4>Add New Word: {{ wordData.str }}</h4>
        <label>
            Meaning
            <input v-model="wordData.meaning">
        </label>
        <label>
            Part of speech
            <select v-model="wordData.partOfSpeech">
                <option value="noun">Noun</option>
                <option value="verb">Verb</option>
                <option value="adjective">Adjective</option>
                <option value="preposition">Preposition</option>
            </select>
        </label>
        <label v-if="displayVerbTense">
            Verb tense
            <select v-model="wordData.verbTense">
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
                validationMessage: null,
                wordData: {
                  str: this.str,
                },
            };
        },
        computed: {
            displayVerbTense: function () {
                return this.wordData.partOfSpeech === 'verb';
            },
            displayValidationMessage: function () {
                return !!this.validationMessage;
            },
        },
        methods: {
            validate: function() {
                if (!this.wordData.meaning) {
                    return "Must enter a meaning!";
                }
                if (!this.wordData.partOfSpeech) {
                    return "Must enter a part of speech!";
                }
                if (this.wordData.partOfSpeech === 'verb' && !this.wordData.verbTense) {
                    return "Must enter a verb tense!";
                }
            },
            clear: function () {
                this.meaning = null;
                this.partOfSpeech = null;
                this.verbTense = null;
                this.validationMessage = null;
            },
            submit: async function () {
                const validationError = this.validate();
                if (validationError) {
                    this.validationMessage = validationError;
                    return;
                }
                const { str, meaning, partOfSpeech, ...metadata } = this.wordData;
                await this.onSubmit({
                    str,
                    meaning,
                    partOfSpeech,
                    metadata,
                });
                this.clear();
            },
        },
    }
</script>

<style scoped>
    #add-new-word {
        border: 1px solid #2c3e50;
    }
</style>