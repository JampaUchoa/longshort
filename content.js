var sentenceNode = document.querySelectorAll('p');
var headline = document.querySelectorAll('h1');
var maxSentences = 7;

var sentences = [];
var words = [];

for (var i = 0; i < sentenceNode.length; i++) {
  var text = sentenceNode[i].innerText;

  if (text.length < 10) continue;

  var textWords = text.toLowerCase().split(/\n|\t|\. |\s+|,/g);
  words = words.concat(textWords);

  var textSentences = text.split(/\n|\t|\. /g);
  sentences = sentences.concat(textSentences);


}
console.log(words);

// Word frequency counter
var frequency = {};
for (var i = 0; i < words.length; i++) {
  var word = words[i];

  if (frequency[word] === undefined){
    frequency[word] = 0;
  }
  if (word.length < 3) continue

  frequency[word]++;

}

// Sentence Scoring
var sentenceScores = []

for (var i = 0; i < sentences.length; i++) {
  var sentenceScore = 0;

  var sentence = sentences[i]
  var sentenceWords = sentence.toLowerCase().split(/\s+|,/g);

  for (var j = 1; j < sentenceWords.length; j++) {
    var word = sentenceWords[j];
    sentenceScore += frequency[word];
  }
  sentenceScores.push(sentenceScore);
}

//
var delimiter = sentenceScores.slice().sort(function(a, b){return b-a})[maxSentences-1];

// Printing
var summary = "";

for (var i = 0; i < sentences.length; i++) {
  if (sentenceScores[i] >= delimiter){
    summary += sentences[i] + "\n";
  }
}

console.log(summary);
