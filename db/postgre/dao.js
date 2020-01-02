const { colour, product } = require('./schema.js');

const resArrToProductObject = res => res[0].dataValues;

const productData = productId => {
  const productPromise = product.findAll({
    where: { id: productId },
  }).then(res => resArrToProductObject(res));

  const colourPromise = colour.findAll({
    where: { productId },
  });

  return Promise.all([productPromise, colourPromise]).then(values => ({
    id: values[0].id,
    productName: values[0].productName,
    colours: values[1],
  }));
};

const productIdAndName = productId => product.findAll({
  where: { id: productId },
}).then(res => resArrToProductObject(res))
  .then(productObject => ({
    productId: productObject.id,
    productName: productObject.productName,
  }));

const allProducts = (offset = 1) => product.findAll({
  offset,
  limit: 100,
}).map(productObject => ({
  productId: productObject.id,
  productName: productObject.productName,
}));

const createProduct = data => {
  const productPromise = product.build({
    id: data.productId,
    productName: data.productName,
  }).save();

  const colours = data.colours
    .map(colourObject => Object.assign(colourObject, { productId: data.productId }));
  const colourPromise = colour.bulkCreate(colours);

  return Promise.all([productPromise, colourPromise]);
};

const updateProduct = (productId, productObject) => product.findAll({
  where: { id: productId },
}).then(res => res[0])
  .then(existedProduct => {
    const newProduct = existedProduct.dataValues;
    newProduct.productName = productObject.productName;
    return existedProduct.update();
  });

const deleteProduct = productId => {
  const productPromise = product.destroy({
    where: { id: productId },
  });

  const colourPromise = colour.destroy({
    where: { productId },
  });

  return Promise.all([productPromise, colourPromise]);
};

const coloursForProduct = productId => colour.findAll({
  attributes: ['colourName', 'colour'],
  where: { productId },
});

const imageUrlsForColour = (productId, colourName) => colour.findAll({
  attributes: ['logoUrl', 'frontUrl', 'backUrl'],
  where: {
    productId,
    colourName,
  },
}).then(res => res[0]);

module.exports = {
  productIdAndName,
  allProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  coloursForProduct,
  imageUrlsForColour,
  productData,
};
