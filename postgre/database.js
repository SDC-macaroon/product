const Sequelize = require('sequelize');

const sequelize = require('./index.js');

const Colour = sequelize.define('Colour', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  colourName: Sequelize.STRING,
  colour: Sequelize.INTEGER,
  logoUrl: Sequelize.STRING,
  frontUrl: Sequelize.STRING,
  backUrl: Sequelize.STRING,
  productId: Sequelize.INTEGER,
});

Colour.sync({ force: true }).then(() => {
  console.log('Colour table created');
  return Colour.create({
    id: 0,
  });
});

const Product = sequelize.define('Product', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  productName: Sequelize.STRING,
});

Product.sync({ force: true }).then(() => {
  console.log('Product table created');
  return Product.create({
    id: 0,
  });
});

module.exports = {
  colour: Colour,
  product: Product,
};
