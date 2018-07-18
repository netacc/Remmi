var $ = Dom7;
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'Remmi',
  // App id
  id: 'ru.remmi',
  touch: {
      materialRipple: false
  },
  view: {
      pushState: true
  },
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  routes: routes,
});