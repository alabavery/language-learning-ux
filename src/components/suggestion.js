export default {
	template: '<li v-on:click="selectSuggestion(word)">{{ this.displayWord(word) }}</li>',
	props: ['word', 'selectSuggestion'],
	methods: {
		displayWord: function(word) {
			const partOfSpeechDisplay = word.partOfSpeech === 'verb' ? `${word.partOfSpeech}: ${word.tense}` : word.partOfSpeech;
	
			return `${word.str} (${partOfSpeechDisplay}) ${word.meaning}`;
		},
	},
};