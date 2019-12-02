const mongoose = require('mongoose');
const {Colour, Product} = require('./database.js');
const db = require('./index.js');

// for (let productId = 2001; productId < 2100; productId++) {

// }


mongoose.connection.createCollection('products')
  .then(() => mongoose.connection.dropCollection('products'))
  .then(() => Product.create({
    productId: 2001,
    colours: [
      {
        colourName: 'blue',
        colour: 5,
        logoUrl: 'logo url',
        frontUrl: 'front url',
        backUrl: 'back url',
      }
    ]
  }))
  .then(() => mongoose.connection.close())
  .catch(err => console.log(err.message));