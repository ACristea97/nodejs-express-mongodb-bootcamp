const fs = require('fs');

// Blocking, synchronous way
const textIn = fs.readFileSync('../txt/input.txt', 'utf-8');
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync('../txt/output.txt', textOut);


// Non-blocking, asynchronous way

fs.readFile('../txt/start.txt', (error, result) => {
   if (error)
       return console.log(error);

   console.log('Writing file...');
   fs.writeFile('../txt/output.txt', result, (error, result) => {
       if (error)
            return console.log(error);

        console.log('Finished writing to file.');
   })
});

console.log('Reading file...');
