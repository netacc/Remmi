var $ = Dom7;
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'Remmi',
  // App id
  id: 'ru.remmi',
  pushState : true,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
});