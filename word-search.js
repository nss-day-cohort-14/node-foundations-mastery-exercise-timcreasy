#!/usr/bin/env node

const { createReadStream } = require('fs');
const es = require('event-stream');
const limitTen = require('./limit-ten');

const DICTIONARY = '/usr/share/dict/words';

process.stdin
  .pipe(es.split('/n'))
  .pipe(es.map((word, cb) => cb(null, word.toLowerCase() + '\n')))
  .pipe(limitTen)
  .pipe(process.stdout);
