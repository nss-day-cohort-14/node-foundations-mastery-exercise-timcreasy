const { createReadStream } = require('fs');
const es = require('event-stream');
const limitTen = require('./limit-ten');

const DICTIONARY = '/usr/share/dict/words';

createReadStream(DICTIONARY)
  .pipe(es.split('/n'))
  .pipe(es.map((word, cb) => cb(null, word.toLowerCase() + '\n')))
  .pipe(limitTen)
  .pipe(process.stdout);
