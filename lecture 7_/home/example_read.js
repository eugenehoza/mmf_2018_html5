const fs = require("fs");
const text = fs.readFileSync("file.txt", "utf8");
console.log("Sync read example");

/*
console.log(text);

fs.readFile("file.txt", "utf8", (err, data)=>{
    console.log("Async read example");
    console.log(data);
});

console.log("End of program");
*/