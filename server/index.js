const express = require('express');
const { coloursForProduct, imageUrlsForColour } = require('../database/database');

const app = express();
const port = 1729;

app.use(express.static('dist/'));

app.get('/api/productPreview/:productId/colours', (req, res) => {
  coloursForProduct(req.params.productId)
    .then(result => res.json(result));
});

app.get('/api/productPreview/:productId/:colourName', (req, res) => {
  imageUrlsForColour(req.params.productId, req.params.colourName)
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

app.listen(port, () => console.log(`listening on port ${port}`));
