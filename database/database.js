const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colourSchema = new Schema({
  colourName: {type: String, required: true, unique: true},
  colour: {type: Number, required: true},
  logoUrl: {type: String, required: true},
  frontUrl: {type: String, required: true},
  backUrl: {type: String, required: true},
});

const productSchema = new Schema({
  productId: {type: Number, required: true, unique: true},
  colours: [colourSchema],
})

// const Colour = mongoose.model('Colour', colourSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = {/* Colour,  */Product};