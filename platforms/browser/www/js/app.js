var $$ = Dom7;
var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Remmy',
    // App id
    id: 'ru.remmy',
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

var view = app.views.create('.view-main', {
    on: {
        pageInit: function () {
            console.log('page init')
        }
    }
});


app.api = {
    createUser: function () {
        app.request.postJSON('http://remmy-dev.bstdv.ru:8989/rest/personservice/person/post/',
            JSON.parse('{"user":{"name":"Test Person7", "age":700, "id":7}}'),
            function (data) {
                console.log(data)
            });
    },
    updateUser: function () {
        app.request.postJSON('http://remmy-dev.bstdv.ru:8989/rest/personservice/person/post/',
            JSON.parse('{"user":{"name":"Test Person", "age":100, "id":1}}'),
            function (data) {
                console.log(data)
            });
    },
    updateUsers: function () {
        app.request.get('http://remmy-dev.bstdv.ru:8989/rest/personservice/person/get/', {},
            function (data, status, xhr) {
                var context = JSON.parse(data);
                var template = $$('script#template').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(context);
                $$('.main-content').append(html);
            },
            function (xhr, status) {
                console.log(status)
            });
    },
    createTask: function () {
        app.request.postJSON('http://remmy-dev.bstdv.ru:8989/rest/personservice/task/post/',
            JSON.parse('{"task":{"text":"Test Person7", "startDate":"", "id":8}}'),
            function (data) {
                console.log(data)
            });
    },
    updateTasks: function () {
        app.request.get('http://remmy-dev.bstdv.ru:8989/rest/personservice/task/get/', {},
            function (data, status, xhr) {
                var context = JSON.parse(data);
                var template = $$('script#tasks-template').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(context);
                $$('.tasks-content').append(html);
            },
            function (xhr, status) {
                console.log(status)
            });
    },
    getTask: function( taskID ){
        app.request.get('http://remmy-dev.bstdv.ru:8989/rest/personservice/task/get/'+taskID, {},
        function (data, status, xhr) {
            var context = JSON.parse(data);
            var template = $$('script#tasks-template').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(context);
            $$('.tasks-content').append(html);
        },
        function (xhr, status) {
            console.log(status)
        });

    },
};

$$('.notification-single').on('click', function () {

    app.api.createUser();
    app.api.updateUsers();
    app.dialog.alert('User create');
});
$$('.notification-task').on('click', function () {
    app.api.createTask();
    app.api.updateTasks();
    app.dialog.alert('Task create');
});
$$('.notification-task').on('taphold', function () {
    app.dialog.alert('Tap hold fired!');
});

app.api.updateUsers();
app.api.updateTasks();