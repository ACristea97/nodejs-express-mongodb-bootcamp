const fs = require('fs');
const superagent = require('superagent');

// Callback hell
// fs.readFile(`${__dirname}/dog.txt`, (error, data) => {
//     if (error)
//         return console.log(error.message);
//
//     console.log(`Breed: ${data}`);
//
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((error, response) => {
//         if (error)
//             return console.log(error.message);
//
//         console.log(response.body.message);
//
//         fs.writeFile('dog-img.txt', response.body.message, (error) => {
//             if (error)
//                 return console.log(error.message);
//
//             console.log(`${data} image saved to file.`);
//         });
//     });
// });

// Promises
const readFile = (path) => new Promise(
    (resolve, reject) => fs.readFile(path, (error, data) => {
        if (error)
            return reject(error);

        console.log(`${data} breed found.`);

        return resolve(data);
    })
);

const writeFile = (path, data) => new Promise(
    (resolve, reject) => fs.writeFile(path, data, (error) => {
        if (error)
            return reject(error);

        console.log(`${data} saved to file: ${path}`);

        return resolve();
    })
);

// readFile(`${__dirname}/dog.txt`)
//     .then((data) =>
//         superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     ).then((response) =>
//         writeFile('dog-img.txt', response.body.message)
//     ).catch((error) => console.log(error.message));

// Async-Await
// const getDogPicture = async () => {
//     let data, response;
//
//     try {
//         data = await readFile(`${__dirname}/dog.txt`);
//         response = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//         await writeFile('dog-img.txt', response.body.message);
//     } catch (error) {
//         console.log(error.message);
//         throw error;
//     }
//
//     return 'DONE';
// };
//
// (async () => {
//     try {
//         const result = await getDogPicture();
//         console.log(result);
//     } catch (error) {
//         console.log(error.message);
//     }
// })();

// Wait for multiple promises simultaneously
const getDogPicture = async () => {
    let data, response;

    try {
        data = await readFile(`${__dirname}/dog.txt`);
        response = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        await writeFile('dog-img.txt', response.body.message);
    } catch (error) {
        console.log(error.message);
        throw error;
    }

    return 'DONE';
};

(async () => {
    try {
        const docPicture1 = getDogPicture();
        const docPicture2 = getDogPicture();
        const docPicture3 = getDogPicture();

        const all = await Promise.all([docPicture1, docPicture2, docPicture3]);
        const results = all.map((element) => element.body.message);

        console.log(results);
    } catch (error) {
        console.log(error.message);
    }
})();
