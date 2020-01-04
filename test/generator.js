const faker = require('faker');

const animals = ['dog', 'cat', 'bear', 'rabbit'];
const colours = ['black', 'brown', 'white', 'grey'];
const hex = {
  black: 0x000000,
  brown: 0x8b4513,
  white: 0xffffff,
  grey: 0x808080,
};

const urls = {};

// Hard code the start id to 10000001
let currId = 10000001;

for (let i = 0; i < animals.length; i++) {
  urls[animals[i]] = {};
  for (let j = 0; j < colours.length; j++) {
    urls[animals[i]][colours[j]] = 'https://images.unsplash.com/photo-1541774880-586013749b3c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNjk4Mn0';
  }
}

const generateRandomId = (context, events, done) => {
  const id = Math.floor(Math.random() * 1000000 + 9000000);
  context.vars.id = id;
  return done();
};

const generatePostPayload = (context, events, done) => {
  const colourArr = [];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const productId = currId;
  const productName = `${faker.name.firstName()} the ${animal}`;

  const csi = Math.floor(Math.random() * colours.length * 2); // Colour Slice Index
  const slicedColours = [...colours.slice(0, csi), ...colours.slice(csi + 1)];
  for (let j = 0; j < slicedColours.length; j++) {
    const name = colours[j];
    colourArr.push({
      colourName: name,
      colour: hex[name],
      logoUrl: urls[animal][name],
      frontUrl: urls[animal][name],
      backUrl: urls[animal][name],
    });
  }
  currId++;

  context.vars.productId = productId;
  context.vars.productName = productName;
  context.vars.colours = colourArr;

  return done();
};

module.exports = { generateRandomId, generatePostPayload };
