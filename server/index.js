const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('dist/'));

app.get('/api/productPreview/:productId/:colourName', (req, res) => {
  res.end();
});

app.listen(port, () => console.log(`listening on port ${port}`));
