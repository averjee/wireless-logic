const { scrapeWebsite } = require('./app');
const assert = require('assert');

describe('scrapeWebsite', () => {
  it('should return an array of 6 products', () => {
    expect.assertions(1);
    return scrapeWebsite().then((products) => {
      expect(products).toHaveLength(6);
    });
  });

  it('should have optionTitle, description, price, and discount for each product', () => {
    expect.assertions(24);
    return scrapeWebsite().then((products) => {
      products.forEach((product) => {
        expect(product).toHaveProperty('optionTitle');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('discount');
      });
    });
  });

  it('should sort products by highest price to lowest', function() {
    return scrapeWebsite().then(function(products) {
        for (let i = 0; i < products.length - 1; i++) {
            assert(parseFloat(products[i].price) >= parseFloat(products[i + 1].price));
        }
    });
  });

});
