let elem = {
  template: `<li class='file'>
  <div class='name'>{{name}}</div>
  <div class='info'>i</div>
  <div class='edit'>e</div>
  <div class='copy'>c</div>
  <div class='remove'>r</div>
  </li>`,
  props : ['name']
};

let andrey = new Vue({
  el: '#app',
  data: {
    list: [],
    text: '',
    current: '',
    last: ''
  },
  components: {
    elem
  },
  methods: {
    edit(e) {
      if (e.target.classList.contains('edit')) {   //e - кнопка?, target - ?, classList - ?, contains - class="contener"?
      // e - само событие, это объект можно вывести в консоль посмотреть что там есть
      // e.target - тэг вызывающий событие
      // classList - свойстро дом объектов для работы с классами
      // contains вернёт true если тэг содержит этот класс
        let data = this;   //??? указание на облость видимости

        let xhr = new XMLHttpRequest();   //зачем нужен XHR? Предполагаю, для того, чтобы мы находились постоянно на главной старнице, но запросы на других URL срабатывали?
        // объкт для AJAX, по суті да
        xhr.open('GET', `/andrey/${e.target.parentNode.children[0].innerText}`);   //Открывает запрос router.get('/:name',... ???; parentNode - какой именно родительский тег?, children - первый дочерний файл(почему именно первый?),innerText - текст(информация) о файле?
        // отправляет запрос по Aдресу /andrey/:name а роутер перехватывает всё что начинается с /andrey
        // относительно e.target
        // смотрі html на работающей странице и поймёшь откуда берётся имя файла
        // innerText свойство которое возращает текст находящийся в тэге, можно перезаписать
        xhr.addEventListener('load', () => {   //добавляет событие при загрузке файла?
          // когда придёт ответ от сервера оно сработает
          data.text = xhr.responseText;   //responesText - текст файла?
          // выведи xrh посмотри что в нем есть, responesText - текст который передали в ответ
          data.current = e.target.parentNode.children[0].innerText;   //current - ?
          // название текущего файла
          data.last = data.current;   //это я так понимаю задание Ковтуна уже
          // частично
          data.saveLast()   //переходим в saveLast?
          // вызывается эта функция, а так да
        });
        xhr.send()   //... отправка запроса
      }
    },
    save() {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `/andrey/${this.current}`);
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
    },
    saveLast() {
      let data = this;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `/dima/last`);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.addEventListener('load', () => {
        data.updateLast()
      });
      xhr.send(JSON.stringify({last: data.last}))
    },
    updateLast() {
      let data = this;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `/dima/last`);
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
      xhr.open('GET', '/andrey');
      xhr.addEventListener('load', () => {
        data.list = JSON.parse(xhr.responseText);
        this.updateLast()
      });
      xhr.send();
    }
})
