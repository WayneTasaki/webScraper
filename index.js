const PORT = 8000;
const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
require('dotenv').config()

const app = express();
console.log(process.env.API_KEY)


const url = `https://www.tcgplayer.com/product/226434?Language=English`
axios(url)
.then(res => {
  const html = res.data
  const $ = cheerio.load(html)
  const articles = []
  $('.price-points__rows li .text', html).each(function () {
    const title = $(this).text()
    const url = $(this).find('a').attr('href')
    articles.push({
      title,
      url
    })
  })
  console.log(articles)
}).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on ${PORT}`));


// .price-points__rows => li => text