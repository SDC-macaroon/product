const express = require('express');

const app = express();
const port = 1729;

app.use(express.static('dist/'));

app.listen(port, () => console.log(`listening on port ${port}`));
