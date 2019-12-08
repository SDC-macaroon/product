const mongoose = require('mongoose');
/* const db =  */require('./index.js');

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

const coloursForProduct = productId => Product
  .findOne({ productId }, 'colours.colourName colours.colour')
  .then(result => (result === null ? null : result.colours));

const imageUrlsForColour = (productId, colourName) => Product
  .findOne({ productId, 'colours.colourName': colourName }, 'colours.$')
  .then(result => {
    const { logoUrl, frontUrl, backUrl } = result.colours[0];
    return Promise.resolve({ logoUrl, frontUrl, backUrl });
  });

const productData = productId => Product
  .findOne({ productId });

module.exports = {
  Product,
  coloursForProduct,
  imageUrlsForColour,
  productData,
};
