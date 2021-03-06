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

const condition = obj => {
  // Takes a mongoose condition object, that looks like: {productId: ...} and returns it as
  // is, if productId is a number, or as {productName: ...} if productId is a string
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (key === 'productId' && Number.isNaN(parseInt(obj[key], 10))) {
      newObj.productName = obj[key][0].toUpperCase() + obj[key].slice(1).toLowerCase().replace(/-/g, ' ');
    } else { newObj[key] = obj[key]; }
  });
  return newObj;
};

const productIdAndName = productId => Product
  .findOne(condition({ productId }), '-_id productId productName');

const allProducts = () => Product.find({}, '-_id productName productId');

const createProduct = productData => Product.create(productData);

const updateProduct = (productId, productData) => Product.findOneAndUpdate({ productId },
  productData);

const deleteProduct = productId => Product.deleteOne({ productId });

const coloursForProduct = productId => Product
  .findOne(condition({ productId }), 'colours.colourName colours.colour')
  .then(result => (result === null ? null : result.colours));

const imageUrlsForColour = (productId, colourName) => Product
  .findOne(condition({ productId, 'colours.colourName': colourName }), 'colours.$')
  .then(result => {
    if (result === null) { return null; }
    const { logoUrl, frontUrl, backUrl } = result.colours[0];
    return { logoUrl, frontUrl, backUrl };
  });

const productData = productId => Product
  .findOne(condition({ productId }));

module.exports = {
  Product,
  allProducts,
  coloursForProduct,
  imageUrlsForColour,
  productData,
  productIdAndName,
  createProduct,
  updateProduct,
  deleteProduct,
};
