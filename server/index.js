const express = require('express');

const app = express();
const port = 1729;

app.use(express.static('dist/'));

app.get('/api/productPreview/:productId/colours', (req, res) => {
  res.send(`colour list:  ${req.params.productId}`);
});

app.listen(port, () => console.log(`listening on port ${port}`));
