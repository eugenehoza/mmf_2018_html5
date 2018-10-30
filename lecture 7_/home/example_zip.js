const fs = require("fs");
const zlib = require("zlib");

const gzip = zlib.createGzip();
const inp = fs.createReadStream('example_zip.js');
const out = fs.createWriteStream('example_zip.js.gzip');

inp.pipe(gzip).pipe(out);