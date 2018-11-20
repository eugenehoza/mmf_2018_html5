const testFolder = './txt_files/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        if (file.substring(file.length - 4, file.length) == ".txt"){
            fs.readFile(testFolder+file, 'utf8', (err, data) => {
                fs.appendFile(testFolder+'allfiles.txt', data+"\n", function (err) {
                    if (err) throw err;
                });
            });
        }
  });
});
