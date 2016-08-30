#!/usr/bin/env node

// Required libs
const { createReadStream } = require('fs');
const es = require('event-stream');
const limitTen = require('./limit-ten');

// Path to dict, and any search term
const DICTIONARY = '/usr/share/dict/words';
let searchString = process.argv[2];

// If no search output usage, end process
if(!searchString) {
  console.log("Usage: ./word-search [search term]");
  process.exit();
}

// Pipe dictionary through stream for matches
createReadStream(DICTIONARY)
  .pipe(es.split())
  .pipe(es.map((word, cb) => {
    if (word.toLowerCase().startsWith(searchString.toLowerCase())) {
      cb(null, word.toLowerCase() + '\n')
    }
    cb()
  }))
  .pipe(limitTen)
  .pipe(process.stdout);
