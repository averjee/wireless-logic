const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite() {
  try {
    const response = await axios.get('https://wltest.dns-systems.net/');
    const html = response.data;
    const $ = cheerio.load(html);
    let products = [];

    // Scraping 4 products (Basic and Standard)
    $('.col-xs-4', html).each(function(){
        const optionTitle = $(this).find('h3').text()
        const description = $(this).find('.package-name').text()
        const price = $(this).find('.price-big').text().replace('£','')
        const discount = $(this).find('.package-price').find('p').text()
        products.push({
            optionTitle,
            description,
            price,
            discount
        })
    })

    // Scraping for final 2 products (Optimum)       
    $('.col-cs-4', html).each(function(){
        const optionTitle = $(this).find('h3').text()
        const description = $(this).find('.package-name').text()
        const price = $(this).find('.price-big').text().replace('£','')
        const discount = $(this).find('.package-price').find('p').text()
        products.push({
            optionTitle,
            description,
            price,
            discount
        })
    })

    // Sorting products from highest price to lowest
    products.sort((a, b) => {
      return b.price - a.price;
    })

    console.log(products);

    return Promise.resolve(products);
  } catch (error) {
    return Promise.reject(error);
  }
}

(async function() {
  await scrapeWebsite();
})();

exports.scrapeWebsite = scrapeWebsite;
