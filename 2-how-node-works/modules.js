/* The IIFE that wraps every module. */
console.log(require('module').wrapper);

/* The arguments that are passed to the IIFE. */
console.log(arguments);

// Using module.exports
const Calculator = require('./modules/modules.exports-example.js');
const calculator1 = new Calculator();
console.log(calculator1.add(2, 5));

// Using exports
const { add, divide, multiply } = require('./modules/exports-example.js');
console.log(multiply(2, 5));

// Caching
require('./modules/caching-example.js')();
require('./modules/caching-example.js')();
require('./modules/caching-example.js')();
