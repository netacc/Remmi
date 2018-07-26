var $$ = Dom7;
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
    // Enable templates auto precompilation
    precompileTemplates: true,

    // Enabled rendering pages using Template7
    template7Pages: true,
    view: {
      pushState: true,
      stackPages:true,
    },
    routes: routes,

    on: {
        // each object key means same name event handler
        pageInit: function (page) {

        },
        popupOpen: function (popup) {
            // do something on popup open
        },
    },

});
;


app.api = ({
    createUser: function(){
        app.request.postJSON('http://192.168.88.177:8989/rest/personservice/person/post/',
            JSON.parse('{"user":[{"name":"Test Person", "age":100, "id":1}]}'),
            function (data) {
                console.log(data)
            });
    },
    updateUsers: function(){
        app.request.get('http://192.168.88.177:8989/rest/personservice/person/get/', 0,
            function (data, status, xhr) {
                console.log(data)
                console.log(status)
                var context = JSON.parse(data);
                var template = $$('script#template').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(context);

                $$('.main-content').append(html);
            },
            function (xhr, status){
                console.log(status)
            })
    },
});

;

$$('.notification-single').on('click', function () {
    app.api.createUser();
    app.api.updateUsers();
    app.dialog.alert('User create');
});
app.request.get('http://192.168.88.177:8989/rest/personservice/person/get/', 0,
    function (data, status, xhr) {
        console.log(data)
        console.log(status)
        var context = JSON.parse(data);
        var template = $$('script#template').html();
        var compiledTemplate = Template7.compile(template);
        var html = compiledTemplate(context);

        $$('.main-content').append(html);
    },
    function (xhr, status){
        console.log(status)
    })
