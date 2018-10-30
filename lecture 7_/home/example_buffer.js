const buf = Buffer.from("123abcабв", "utf8");

console.log(buf.toString());

console.log(buf.toJSON());

console.log(buf.toString("base64"));

console.log(buf.toString("hex"));

