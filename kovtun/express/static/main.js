let elem = {
  template: `<li class='file'>{{name}}</li>`,
  props : ['name']
};

let vm = new Vue({
  el: '#app',
  data: {
    list: [],
    text: '',
    last: ''
  },
  components: {
    elem
  },
  methods: {
    select(e) {
      if (e.target.classList.contains('file')) {
        let data = this;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/data/${e.target.innerText}`);
        xhr.addEventListener('load', () => {
          data.text = JSON.parse(xhr.responseText).list;
          data.last = e.target.innerText;
          data.saveLast();
        });
        xhr.send()
      }
    },
    saveLast() {
      let data = this;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `/last`);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.addEventListener('load', () => {
        data.updateLast()
      });
      xhr.send(JSON.stringify({last: data.last}))
    },
    updateLast() {
      let data = this;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `/last`);
      xhr.addEventListener('load', () => {
        if(xhr.responseText ) {
          data.last = xhr.responseText
        }
      });
      xhr.send()
    }
  },
    created() {
      let data = this;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', '/data');
      xhr.addEventListener('load', () => {
        data.list = JSON.parse(xhr.responseText);
        data.updateLast()
      });
      xhr.send()
    }
})
