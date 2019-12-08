const express = require('express');
const { coloursForProduct, imageUrlsForColour, productData } = require('../database/database');

const app = express();
const port = 1729;

app.use(express.static('dist', { index: 'productList.html' }));
app.use('/product/:productName/:productId', express.static('dist', { index: 'productPage.html' }));
app.get('/product/:productId', (req, res) => {
  res.redirect(`/product/some-human-readable-description/${req.params.productId}`);
});

app.get('/api/productPreview/:productId/colours', (req, res) => {
  coloursForProduct(req.params.productId)
    .then(result => res.json(result));
});

app.get('/api/productPreview/:productId/:colourName', (req, res) => {
  imageUrlsForColour(req.params.productId, req.params.colourName)
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

app.get('/api/productPreview/:productId', (req, res) => {
  productData(req.params.productId)
    .then(results => res.json(results));
});

app.listen(port, () => console.log(`listening on port ${port}`));
