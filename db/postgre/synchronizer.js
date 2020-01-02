const { colour, product } = require('./schema.js');

const sync = () => {
  console.log('Syncing table Colour......');
  colour.sync({ force: true }).then(() => {
    console.log('Colour table created');
    return colour.create({
      id: 0,
    });
  });

  console.log('Syncing table Product......');
  product.sync({ force: true }).then(() => {
    console.log('Product table created');
    return product.create({
      id: 0,
    });
  });
};

module.exports.sync = sync;
