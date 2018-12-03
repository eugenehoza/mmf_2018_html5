const copied = document.getElementById('copied');

copied.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET','/kovtun/copy');
  xhr.addEventListener('load',() => {
    alert(xhr.response);
  })
  xhr.send(null);
})
