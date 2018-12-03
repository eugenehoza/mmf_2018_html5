let coppppy = document.getElementById('coppppy');

coppppy.addEventListener('click', ()=>{
  let xhr = new XMLHttpRequest();
  xhr.open('GET','/kovtyn/copy')
  xhr.addEventListener('load',()=>{
    alert(xhr.response)
  })
  xhr.send()
})
