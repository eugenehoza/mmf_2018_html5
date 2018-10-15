function f (o, num){
    o.message = "Изменено в f";
    console.log(`Bнyтpи f: o.message=${o.message}/${num} (до присваивания)`);
    num=4
    o = {
        message : "Новый объект !"
    };
    console.log(`Bнyтpи f: o.message=${o.message}/${num} (после присваивания)`);
}

console.log("############# example 1");

let o = {
    message: "Начальное значение",
};

let num=3;
console.log(`Пepeд вызовом f: o.message=${o.message}/${num}`);
f(o, num) ;
console.log (`Пocлe вызова f: o.message="${o.message}/${num}"`);

console.log("############# example 2");

const x = 3;
function f1() {
    console.log(x);    
    try{
        console.log(y);
    } catch(msg){
        console.log(msg);
    }
    
}
const у = 3;
f1() ; 

console.log("############# example 3");

console.log(x1);
var x1 = 3;
console.log(x1);
try{
    console.log(x2);
} catch(msg){
    console.log(msg);
}
let x2 = 3;
console.log(x2);