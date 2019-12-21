const express = require('express');
const bodyParser = require('body-parser');
const {
  coloursForProduct,
  imageUrlsForColour,
  productData,
  allProducts,
  productIdAndName,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../database/database');

const app = express();
const port = 1729;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist', { index: 'productList.html' }));
app.use('/product/:productName/:productId', express.static('dist', { index: 'productPage.html' }));
app.get('/product/:productId', (req, res, next) => {
  productIdAndName(req.params.productId)
    .then(({ productId, productName }) => res.redirect(`/product/${productName.toLowerCase().replace(/ /g, '-')}/${productId}`))
    .catch(err => next(err));
});

app.get('/api/productPreview/all', (req, res) => {
  allProducts()
    .then(result => res.json(result));
});

app.get('/api/productPreview/:productId/colours', (req, res, next) => {
  const { productId } = req.params;
  coloursForProduct(productId)
    .then(result => (result === null
      ? res.status(404).send(`No such product: ${productId}`)
      : res.json(result)))
    .catch(err => next(err));
});

app.get('/api/productPreview/:productId/:colourName', (req, res, next) => {
  const { productId, colourName } = req.params;
  imageUrlsForColour(productId, colourName)
    .then(result => (result === null
      ? res.status(404).send(`No such product/colour: ${productId}/${colourName}`)
      : res.json(result)))
    .catch(err => next(err));
});

app.get('/api/productPreview/:productId', (req, res, next) => {
  const { productId } = req.params;
  productData(productId)
    .then(result => (result === null
      ? res.status(404).send(`No such product: ${productId}`)
      : res.json(result)))
    .catch(err => next(err));
});

app.post('/product', (req, res, next) => {
  const data = req.body;
  createProduct(data)
    .then(result => res.json(result))
    .catch(err => next(err));
});

app.put('/product/:productId', (req, res, next) => {
  updateProduct(req.params.productId, req.body)
    .then(result => res.json(result))
    .catch(err => next(err));
});

app.delete('/product/:productId', (req, res, next) => {
  deleteProduct(req.params.productId)
    .then(result => res.json(result))
    .catch(err => next(err));
});

app.listen(port, () => console.log(`listening on port ${port}`));
