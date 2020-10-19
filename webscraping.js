var axios = require('axios');
var cheerio = require('cheerio');

var urlWeb = 'https://www.mediamarkt.es/es/category/_smartphones-701189.html';
var urlWeb2 = 'https://www.mediamarkt.es/es/category/_smartphones-701189.html?searchParams=&sort=&view=PRODUCTLIST&page=';
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

async function obtainDetailsProducts(){
    for(var i = 1; i<19; i++){
        var x = await timer(i);
        console.log(x);
    }
}

function timer(page){
    console.log("PÁGINA NÚMERO----> "+page);
    return new Promise(resolve => {
        setTimeout(async function(){
            var x = await obtainPage(page);
            resolve(x);
        }, 2000);
    });
}

function obtainPage(num){
    return axios.get("https://www.mediamarkt.es/es/category/_smartphones-701189.html?searchParams=&sort=&view=PRODUCTLIST&page="+num).then(response => {
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
        return products;
    })
}
//obtainNumberOfProducts();
//obtainProductDetails();

obtainDetailsProducts();