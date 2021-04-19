const fs = require('fs');
const server = require('http').createServer();

server.on('request', (request, response) => {
    // Solution 1
    // fs.readFile('test-file.txt', (error, data) => {
    //    if (error)
    //        console.log(error);
    //
    //    response.end(data);
    // });

    // Solution 2: Streams
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', (chunk) => {
    //     response.write(chunk);
    // });
    //
    // readable.on('error', (error) => {
    //     console.log(error);
    //
    //     response.statusCode = 500;
    //     response.end('File not found!');
    // });
    //
    // readable.on('end', () => {
    //     response.end();
    // });

    // Solution 3: Streams with pipe
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(response);
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening...');
});