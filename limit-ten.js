const { Transform } = require('stream');

module.exports = Transform({
  transform (buf, _, cb) {

    let searchString = process.argv[2];

    if (searchString) {
      let wordsArray = buf.toString().split('\n');
      let matches = [];
      wordsArray.forEach((word) => {
        if (word.startsWith(searchString.toLowerCase()) && matches.length <= 10) {
          matches.push(word);
        }
      });
      if (matches.length === 0) {
        cb(null, 'Usage: streaming.js [searchterm]\n');
      } else {
        cb(null, matches.join('\n') + '\n');
      }
    } else {
      cb(null, 'Usage: streaming.js [searchterm]\n');
    }

  }
});
