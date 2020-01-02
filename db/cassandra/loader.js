// THIS SCRIPT ONLY WORKS FOR SMALL BATCHES LESS THAN 100 ENTRIES!

const uuidv1 = require('uuid/v1');
const generator = require('../generator.js');
const client = require('./index.js');

const args = process.argv.slice(2);
const productCount = args[0];
const shard = args[1];
const productIdStart = shard * productCount + 1;

generator.generateData(productCount, productIdStart).then(data => {
  console.log(`Shard ${shard}: Generated ${productCount} products!`);
  const queries = [];
  const productQuery = 'INSERT INTO Products (id, productName) VALUES (?, ?)';
  const colourQuery = 'INSERT INTO Colours (id, colourName, colour, logoUrl, frontUrl, backUrl, productId) VALUES (?, ?, ?, ?, ?, ?, ?)';

  data.products.forEach(product => {
    queries.push({
      query: productQuery,
      params: [product.id, product.productName],
    });
  });
  console.log(`Shard ${shard}: Generated queries for ${productCount} products!`);

  data.colours.forEach(colour => {
    queries.push({
      query: colourQuery,
      params: [
        uuidv1(),
        colour.colourName,
        colour.colour,
        colour.logoUrl,
        colour.frontUrl,
        colour.backUrl,
        colour.productId,
      ],
    });
  });
  console.log(`Shard ${shard}: Generated queries for ${data.colours.length} colours!`);

  console.log(`Shard ${shard}: Batch writing data now......`);
  client.batch(queries, { prepare: true })
    .then(() => {
      console.log(`Shard ${shard}: Done!`);
    })
    .catch(err => console.log(err));
});
