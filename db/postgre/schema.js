const Sequelize = require('sequelize');

const sequelize = require('./index.js');

const Colour = sequelize.define('Colour', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  colourName: Sequelize.STRING,
  colour: Sequelize.INTEGER,
  logoUrl: Sequelize.STRING,
  frontUrl: Sequelize.STRING,
  backUrl: Sequelize.STRING,
  productId: Sequelize.INTEGER,
},
{
  indexes: [
    {
      unique: false,
      fields: ['productId'],
    },
  ],
});

const Product = sequelize.define('Product', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  productName: Sequelize.STRING,
});

module.exports = {
  colour: Colour,
  product: Product,
};
