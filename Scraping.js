const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeBooks() {
  try {
    const url = 'https://books.toscrape.com';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Array para armazenar os detalhes dos livros
    let bookDetails = [];

    // Itera sobre cada produto na página
    $('.product_pod').each((index, element) => {
      const titulo = $(element).find('h3 a').attr('title');
      const preco = $(element).find('.price_color').text();
      const estoque = $(element).find('.instock.availability').text().trim();
      
      // Seleciona a URL da imagem
      const imageUrl = url + '/' + $(element).find('.image_container img').attr('src');

      bookDetails.push({
        titulo,
        preco,
        estoque: estoque.includes('In stock') ? 'Disponível' : 'Fora de estoque',
        imageUrl, // Adiciona a URL da imagem
      });
    });

    return bookDetails;
  } catch (error) {
    console.error('Erro ao fazer scraping:', error);
    return [];
  }
}

module.exports = scrapeBooks;
