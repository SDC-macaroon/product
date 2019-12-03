const Unsplash = require('unsplash-js').default;
if (global.fetch === undefined) {
  global.fetch = require('node-fetch');
}

const  accessKey = 'UNSPLASH ACCESS KEY GOES HERE';

module.exports = new Unsplash({accessKey});