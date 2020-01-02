const faker = require('faker');
const unsplash = require('../APIs/unsplash.js');

const animals = ['dog', 'cat', 'bear', 'rabbit'];
const colours = ['black', 'brown', 'white', 'grey'];
const hex = {
  black: 0x000000,
  brown: 0x8b4513,
  white: 0xffffff,
  grey: 0x808080,
};
const perPage = 30;

// Always hard code the current page to 1
const currPage = 1;

const urls = {};

const generateData = (productCount, productIdStart) => new Promise((resolve, reject) => {
  Promise.all(colours.reduce((terms, colour) => [
    ...terms,
    ...animals.map(animal => {
      urls[animal] = {};
      return unsplash.search.photos(`${colour} ${animal}`, currPage, perPage)
        .then(result => result.json())
        .then(json => {
          urls[animal][colour] = json.results.map(result => result.urls.regular);
        });
    }),
  ], []))
    .then(() => {
      const productArr = [];
      const colourArr = [];
      for (let i = 0; i < productCount; i++) {
        const animal = animals[Math.floor(Math.random() * animals.length)];
        productArr.push({
          id: i + productIdStart,
          productName: `${faker.name.firstName()} the ${animal}`,
        });

        const csi = Math.floor(Math.random() * colours.length * 2); // Colour Slice Index
        const slicedColours = [...colours.slice(0, csi), ...colours.slice(csi + 1)];
        for (let j = 0; j < slicedColours.length; j++) {
          const name = colours[j];
          let start = Math.floor(Math.random() * perPage);
          colourArr.push({
            colourName: name,
            colour: hex[name],
            logoUrl: urls[animal][name][start],
            frontUrl: urls[animal][name][++start % perPage],
            backUrl: urls[animal][name][++start % perPage],
            productId: i + productIdStart,
          });
        }
      }

      resolve({
        products: productArr,
        colours: colourArr,
      });
    })
    .catch(err => reject(err));
});

module.exports.generateData = generateData;
