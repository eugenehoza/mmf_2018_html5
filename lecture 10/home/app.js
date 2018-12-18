let e1 = new Vue({
    el: '#ex1',
    data: {
      message: 'Hello world!',
      items:[
          {message:"hello1", add:true, remove: false, count: 1},
          {message:"hello2", add:false, remove: true, count: 2},
          {message:"hello3", add:true, remove: true, count: 4}
      ]
    },
    methods:{
      alrt: () =>{ alert("hello")},
      prom: () =>{ prompt("really?")}
    }

  })