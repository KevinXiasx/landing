var cheerio = require('cheerio'),
    $ = cheerio.load('<li class="orange">Orange</li> ');

$('li').addClass('welcome');
 
console.log($('li[class~=welcome]').html);