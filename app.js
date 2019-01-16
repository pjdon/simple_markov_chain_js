// temporary testing script


var fs = require('fs');
let text = fs.readFileSync('./example_text.txt', 'utf8');

var MarkovChain = require('./markovChain');

m = new MarkovChain(text);
console.log(m.predict(100));