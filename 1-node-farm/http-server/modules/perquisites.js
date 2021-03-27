const fs = require('fs');
const path = require('path');

function readPerquisites() {
    const productsData = fs.readFileSync(path.join(__dirname, '../../dev-data/data.json'), 'utf-8');
    const overviewTemplate = fs.readFileSync(path.join(__dirname, '../../templates/template_overview.html'), 'utf-8');
    const productTemplate = fs.readFileSync(path.join(__dirname, '../../templates/template_product.html'), 'utf-8');
    const cardTemplate = fs.readFileSync(path.join(__dirname, '../../templates/template_card.html'), 'utf-8');

    return {
        productsData,
        overviewTemplate,
        productTemplate,
        cardTemplate
    };
}

function replaceTemplateProperties({ productsData, productTemplate, cardTemplate } = {}, typeOfTemplate) {
    const templateToReplace = typeOfTemplate === 'card' ? cardTemplate : productTemplate;

    return JSON.parse(productsData).map((product) => {
        let result = templateToReplace.replace(/{%PRODUCT_NAME%}/g, product.productName);
        result = result.replace(/{%IMAGE%}/g, product.image);
        result = result.replace(/{%QUANTITY%}/g, product.quantity);
        result = result.replace(/{%PRICE%}/g, product.price);
        result = result.replace(/{%ID%}/g, product.id);

        if (!product.organic)
            result = result.replace(/{%IS_ORGANIC%}/g, 'not-organic');

        if (typeOfTemplate === 'product') {
            result = result.replace(/{%NUTRIENTS%}/g, product.nutrients);
            result = result.replace(/{%DESCRIPTION%}/g, product.description);
            result = result.replace(/{%FROM%}/g, product.from);
        }

        return result;
    });
}

function replaceOverviewTemplate(cards, overviewTemplate) {
    return overviewTemplate.replace(/{%PRODUCT_CARDS%}/g, cards);
}

module.exports = {
    readPerquisites,
    replaceTemplateProperties,
    replaceOverviewTemplate
};
