/*
 * send list of emoji
 */

const fs = require('fs');

export default (req, res) => {
      var files = fs.readdirSync('./public/emoji');
      res.json(files);
};
