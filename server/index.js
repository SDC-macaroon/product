const express = require('express');
const { coloursForProduct } = require('../database/database');

const app = express();
const port = 1729;

app.use(express.static('dist/'));

app.get('/api/productPreview/:productId/colours', (req, res) => {
  coloursForProduct(req.params.productId)
    .then(result => res.json(result));
});

app.listen(port, () => console.log(`listening on port ${port}`));
