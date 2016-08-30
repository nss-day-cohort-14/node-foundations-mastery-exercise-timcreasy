const { Transform } = require('stream')

// Counter to store amount of words
let i = 0

// Transform stream to limit matches to 10
const limitToTen = Transform({
  transform(buf, _, cb) {
    if (i < 10) {
      i++;
      cb(null, buf.toString());
    } else {
      cb();
    }
  }

})

module.exports = limitToTen;
