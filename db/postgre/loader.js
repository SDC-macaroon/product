const generator = require('../generator.js');
const { colour, product } = require('./schema.js');
const synchronizer = require('./synchronizer.js');

const args = process.argv.slice(2);
const productCount = args[0];
const shard = args[1];
const productIdStart = shard * productCount + 1;

// Recreate tables when loader is run for the first time.
if (shard === '0') {
  synchronizer.sync();
}

generator.generateData(productCount, productIdStart).then(data => {
  console.log(`Shard ${shard}: Generated ${productCount} products!`);
  product.bulkCreate(data.products)
    .then(() => {
      console.log(`Shard ${shard}: Inserted ${productCount} products!`);
      colour.bulkCreate(data.colours)
        .then(() => console.log(`Shard ${shard}: Inserted ${data.colours.length} colours!`));
    });
});
