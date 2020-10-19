var axios = require('axios');
var cheerio = require('cheerio');

var urlWeb = 'https://www.mediamarkt.es/es/category/_smartphones-701189.html';

function obtainNumberOfProducts(){
    axios.get(urlWeb).then(response => {

        var $ = cheerio.load(response.data);
        //var smartphones_num = $(".cf h1 em");
        var smartphones_num = $("hgroup h1 em");    
        console.log("[WEBSCRAPING RESULT]--> Hay "+ smartphones_num.text().replace("(","").replace(")","")+ " smartphones en Mediamarkt.");
    })
}

function obtainProductDetails(){
    axios.get(urlWeb).then(response => {
        const $ = cheerio.load(response.data);
        const productsElements = $('.products-list .product-wrapper');
        const products = [];
        for(var i = 0; i < productsElements.length; i++){
            const product = {};
            product.title = $($(productsElements[i]).find('h2 a')[0]).text().replace(/\t/g, "").replace(/\n/g, "");
            product.details = $($(productsElements[i]).find('.product-details')[0]).text().replace(/\t/g, "").replace(/\n/g, ", ");
            product.price = $($(productsElements[i]).find('.price')[0]).text().replace(/\t/g, "").replace(/\n/g, "").replace(",", "").replace("-", "");
            product.image = $($(productsElements[i]).find('img')[0]).attr('data-original');        
            products.push(product);        
        }
        console.log(products);
    })
}
obtainNumberOfProducts();
//obtainProductDetails();
