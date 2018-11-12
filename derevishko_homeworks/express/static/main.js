let elem = {
  template: `<li class='file'>{{name}}</li>`,
  props : ['name']
};

let vm = new Vue({
  el: '#app',
  data: {
    list: [],
    text: '',
    current: ''
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
          data.text = xhr.responseText;
          data.current = e.target.innerText
        });
        xhr.send()
      }
    },
    save() {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `/data/${this.current}`);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.addEventListener('load', () => {
        if(xhr.responseText == 'ok') {
          alert('Сохранено')
        } else {
          alert('Ошибка')
        }
      });
      let req = {text: this.text}
      xhr.send(JSON.stringify(req))
    }
  },
    created() {
      let data = this;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', '/data');
      xhr.addEventListener('load', () => {
        data.list = JSON.parse(xhr.responseText)
      });
      xhr.send()
    }
})
