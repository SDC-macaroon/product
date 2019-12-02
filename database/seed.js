const mongoose = require('mongoose');
const {Colour, Product} = require('./database.js');
const db = require('./index.js');

const products = [...Array(100)]
  .map((_, i) => i + 2001)
  .map(productId => ({
    productId, colours: {
      colourName: 'colour ' + productId,
      colour: productId,
      logoUrl: 'logo url ' + productId,
      frontUrl: 'front url ' + productId,
      backUrl: 'back url ' + productId,
    }
  }))
  .map(document => ({insertOne: {document}}))

mongoose.connection.createCollection('products')
  .then(() => mongoose.connection.dropCollection('products'))
  .then(() => Product.bulkWrite(products))
  .then(() => mongoose.connection.close())
  .catch(err => console.log(err.message));