// TODO: Import `generate.js`,
// get the generated object and store to postgre.
const generator = require('./generator.js');
const { colour, product } = require('./database.js');

generator.generateData().then(data => {
  console.log('data generated');
  product.bulkCreate(data.products)
    .then(() => {
      console.log('products inserted');
      colour.bulkCreate(data.colours)
        .then(() => console.log('colours inserted'));
    });
});
