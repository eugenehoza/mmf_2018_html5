const fs = require("fs");
console.log(__dirname);
fs.readdirSync(__dirname).forEach(file => console.log(file));