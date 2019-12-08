const express = require('express');
const { coloursForProduct, imageUrlsForColour, productData } = require('../database/database');

const app = express();
const port = 1729;

app.use(express.static('dist/'));

app.get('/api/productPreview/:productId/colours', (req, res, next) => {
  const { productId } = req.params;
  coloursForProduct(productId)
    .then(result => (result === null
      ? res.status(404).send(`No such product: ${productId}`)
      : res.json(result)))
    .catch(err => next(err));
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
