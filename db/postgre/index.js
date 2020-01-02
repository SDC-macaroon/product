const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres@127.0.0.1:5432/postgres', {
  pool: {
    max: 10000,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

module.exports = sequelize;
