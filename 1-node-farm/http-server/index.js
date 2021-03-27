const http = require('http');
const url = require('url');

const {
    readPerquisites,
    replaceTemplateProperties,
    replaceOverviewTemplate
} = require('./modules/perquisites.js');

const localHost = '127.0.0.1';
const perquisites = readPerquisites();

const cardsHtml = replaceTemplateProperties(perquisites, 'card').join('');
const productsHtml = replaceTemplateProperties(perquisites, 'product');
const overviewHtml = replaceOverviewTemplate(cardsHtml, perquisites.overviewTemplate);

/* Each time a request hits the server the callback function will be executed. */
const server = http.createServer((request, response) => {
    const { query, pathname: pathName } = url.parse(request.url, true);

    /* Overview page */
    if (pathName === '/' || pathName === '/overview') {
        response.writeHead(200, {
            'Content-type': 'text/html'
        });
        response.end(overviewHtml);

    /* Product Page */
    } else if (pathName === '/product') {
        response.writeHead(200, {
            'Content-type': 'text/html'
        });
        response.end(productsHtml[query.id]);

    /* API */
    } else if (pathName === '/api') {
        response.writeHead(200, {
            'Content-type': 'application/json'
        });
        response.end(perquisites.productsData);

    /* Not Found */
    } else {
        response.writeHead(404, {
            'Content-type': 'text/html'
        });
        response.end('<h1>This page cannot be found.</h1>');
    }
});

server.listen(8000, localHost, () => {
    console.log('Listening to requests on port 8000.');
});
