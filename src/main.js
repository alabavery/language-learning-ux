import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


// import Suggestion from './suggestion';

// var app6 = new Vue({
//   el: '#app',
//   components: {
// 	'suggestion-component': Suggestion,
//   },
//   data: {
//     userInput: 'Now it says this',
//     knownWords: [
//     	{ id: 'a', str: 'cat', partOfSpeech: 'noun', meaning: 'a type of animal' },
//     	{ id: 'b', str: 'rewind', partOfSpeech: 'verb', tense: 'present', meaning: 'go back' },
//     ],
//     suggestions: [],
//     displayAddNewWord: false,
//     addNewWordDefinition: null,
//     addNewWordPartOfSpeech: null,
//     addNewWordTense: null,
//     userId: 'fakeUser',
//   },
//   created: function () {
//   	console.log("I requested knownWords and strings from the backend");
//   },
//   methods: {
//   	getSuggestions: function () {
//   		const len = this.userInput.length;
//   		this.suggestions = this.knownWords.filter(word => word.str.slice(0, len) === this.userInput);
//   	},
//   	beginAddNewWord: function () {
//   		this.displayAddNewWord = true;
//   	},
//   	submitAddNewWordForm: function () {
//   		// TODO validate form
//   		this.addUserCreatedWordToLexicon();
//   		this.displayAddNewWord = false;
//   	},
//   	addUserCreatedWordToLexicon: function () {
//   		console.log("called addUserCreatedWordToLexicon()")
//   		const newWordData = {
//   			meaning: this.addNewWordDefinition,
//   			partOfSpeech: this.addNewWordPartOfSpeech,
//   			tense: this.addNewWordTense,
//   		};
//   		const newWord = createNewWord(newWordData);
//   		return addWordToUserLexicon(newWord, this.userId);
//   	},
//   	addWordToLexicon: function (word) {
//   		return addWordToUserLexicon(word, this.userId);
//   	},
//   },
// });


// function addWordToUserLexicon(word, userId) {
// 	console.log(`addWordToUserLexicon() was called with word ${word} and userId: ${userId}`);
// }

// function createNewWord(wordData) {
// 	console.log(`createNewWord made a call to add this ${wordData.toString()} to the db`);
// 	return wordData; // TODO return response rather than this
// }