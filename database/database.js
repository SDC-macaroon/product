const mongoose = require('mongoose');

const { Schema } = mongoose;

const colourSchema = new Schema({
  colourName: { type: String, required: true },
  colour: { type: Number, required: true },
  logoUrl: { type: String, required: true },
  frontUrl: { type: String, required: true },
  backUrl: { type: String, required: true },
});

const productSchema = new Schema({
  productId: { type: Number, required: true, unique: true },
  productName: { type: String, required: true },
  colours: [colourSchema],
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
