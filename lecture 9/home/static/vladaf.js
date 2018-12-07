let buttDel = document.getElementById('delAll');
buttDel.addEventListener('click',function() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET','/vladaf/deleteAll')
  xhr.addEventListener('load',() => {
    alert(xhr.response);
  })
  xhr.send();
})
