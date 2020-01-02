const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const generator = require('../generator.js');

const args = process.argv.slice(2);
const productCount = +args[0];
const shard = +args[1];
const productIdStart = shard * productCount + 1;

const productWriter = createCsvWriter({
  path: 'cassandra_products.csv',
  header: [
    { id: 'id', title: 'Id' },
    { id: 'productName', title: 'Product Name' },
  ],
  fieldDelimiter: ';',
  append: true,
});

const colourWriter = createCsvWriter({
  path: 'cassandra_colours.csv',
  header: [
    { id: 'colourName', title: 'Colour Name' },
    { id: 'colour', title: 'Colour' },
    { id: 'logoUrl', title: 'Logo URL' },
    { id: 'frontUrl', title: 'Front URL' },
    { id: 'backUrl', title: 'Back URL' },
    { id: 'productId', title: 'Product Id' },
  ],
  fieldDelimiter: ';',
  append: true,
});

generator.generateData(productCount, productIdStart).then(data => {
  console.log(`Generated ${productCount} products!`);
  productWriter.writeRecords(data.products)
    .then(() => {
      console.log(`Dumped ${productCount} products to CSV!`);
      colourWriter.writeRecords(data.colours)
        .then(() => {
          console.log(`Dumped ${data.colours.length} colours to CSV!`);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});
