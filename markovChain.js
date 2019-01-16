/* Stores the number of times add(string) is called for each unique string */
const Counter = function () {

  // counts for each string stored in a map
  this.counts = new Map();
  // also keep track of the total number of strings added
  this.total = 0;

  // add a string to keep track of its occurences and the total adds
  this.add = function (word) {
    if (this.counts.has(word)) {
      this.counts.set(word, this.counts.get(word) + 1);
    } else {
      this.counts.set(word, 1);
    }
    this.total += 1;
  }
}

/* Will select an object from weights at random based on its weight */
const RandomSelector = function (weights, total) {

  // calculate total from weights if not provided
  if (typeof total === "undefined") {
    total = Array.from(weights.entries()).reduce(
      (prev, cur) => prev + cur[1], 0);
  }
  // convert weights Map to key,value pairs and sort them by the desc value
  this.odds = Array.from(weights);
  this.odds.sort((a, b) => b[1] - a[1]);
  // convert the weights to cumulative probabilities
  let runningSum = 0;
  for (let i = 0; i < this.odds.length; i++) {
    runningSum += this.odds[i][1] / total;
    this.odds[i][1] = runningSum;
  }

  // select random token based on its cumulative probability weight (rank)
  this.roll = function () {
    const value = Math.random();
    for (const [word, rank] of this.odds) {
      if (value < rank) {
        return word;
      }
    }
    throw new Error("word cumulative probabilities incorrectly defined");
  }
}

/* Generates a Markov Chain from the words in textString (based on pattern)
which is used to predict words given a starting word */
const MarkovChain = function (textString, pattern = /[\w.,!?'"]+|[\r\n]+/g, breakString = "\r\n\r\n") {

  // store the chain branches as a map
  const links = new Map();

  // function to quickly add a link between two words
  function addPair(current, next) {
    if (links.has(current)) {
      links.get(current).add(next);
    } else {
      const counter = new Counter();
      counter.add(next);
      links.set(current, counter);
    }
  }
  // use pattern to get the words from textString and add them to the chain
  const words = textString.match(pattern);
  // link first and last word with breakString
  addPair(breakString, words[0]);
  addPair(words[words.length-1],breakString);
  // add all other words
  for (let i = 1; i < words.length-1; i++) {
    addPair(words[i - 1], words[i]);
  }
  // convert the occurences of each word pair to weights
  for (const [k, v] of links.entries()) {
    links.set(k, new RandomSelector(v.counts, v.total));
  }

  this.links = links;

  // given start, predict n words based on the patterns in textString
  this.predict = function (n = 1, start = breakString, separator = " ") {
    result = [];
    while (n > 0) {
      start = this.links.get(start).roll();
      result.push(start);
      n--;
    }
    return result.join(separator);
  }
}

module.exports = MarkovChain;