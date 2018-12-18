let button2 = document.getElementById("copy");
let text = document.getElementById("text");
button2.addEventListener("click",function() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET","dublicate")
  xhr.addEventListener("load",() => {
    let data= JSON.parse(xhr.responseText);
    let str=''
    for (let name in data) {
      str += name + " - " + data[name] + "\n"
    }
    text.innerText = str 
  })
  xhr.send();

})
