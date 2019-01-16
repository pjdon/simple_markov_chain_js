# Simple Markov Chain (JavaScript)

Quick implementation of a single-depth [Markov chain](https://en.wikipedia.org/wiki/Markov_chain) in JavaScript Node.js

### Usage:

Import with Node.js
```javascript
var MarkovChain = require("./pathToFile/markovChain")
```

Obtain a string of text you want to analyze
```javascript
var fs = require('fs');
let text = fd.readFileSync('yourText.txt', 'utf-8');
```

Create an object analysing your text
```javascript
m = MarkovChain(text);
```

Generate some text
```javascript
predicted = m.predict(100);
console.log(predicted);
// My tenderness of the creature a dread of my simplest and many of the cellar of the nature or sentiments, which I had then quickly swelling into my infancy I knew that it to present mood. It was noted for I say, came not. Once again I spent most patient of hatred. I was indulged by the body but was not attempt to flee silently from the spot, without comment, a great measure, resisted the gratification thus for another pet of shame, and wall it as it of outline. It did not a sin that which to walk it with
```