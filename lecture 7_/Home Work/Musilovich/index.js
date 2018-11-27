/* Сделать консольное приложение, которое принимает на вход число - размер в МБ и
 создает файл на диске этого размера с произвольными бинарными данными.*/

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What size of file do you want to create? (in megabytes) ', (size) => {

    console.log(`Desired file size: ${size}MB`);

    fs.writeFile('file', new Buffer(1024*1024*size - 1), function () {
        fs.appendFile('file', new Buffer(1), function () {

            console.log('File was created in current directory');
            let stats = fs.statSync("file");
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
            console.log('File size in bytes: ' + fileSizeInBytes);
            console.log('File size in megabytes: ' + fileSizeInMegabytes);
        })
    });

    rl.close();
});