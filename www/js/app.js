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

});
// // create searchbar
// var searchbar = app.searchbar.create({
//     el: '.searchbar',
//     searchContainer: '.components-list',
//     searchIn: '.item-title',
//     on: {
//         search(sb, query, previousQuery) {
//             console.log(query, previousQuery);
//         }
//     }
// });

var mainView = app.views.create('.view-main', {
    url: '/'
});


app.api = {
    taskId: 0,
    createUser: function () {
        app.request.postJSON('http://localhost:8080/service/person/post/',
            JSON.parse('{"user":{"name":"Test Person17", "age":1200, "id":17}}'),
            function (data) {
                console.log(data)
            });
    },
    updateUser: function () {
        app.request.postJSON('http://localhost:8080/service/person/post/',
            JSON.parse('{"user":{"name":"Test Person", "age":100, "id":1}}'),
            function (data) {
                console.log(data)
            });
    },
    updateUsers: function () {
        // app.request.get('http://remmy-dev.bstdv.ru:8989/rest/personservice/person/get/', {},
        app.request.get('http://remmy-dev.bstdv.ru:8080/RemmyService/service/user/', {},
            function (data, status, xhr) {
                var context = JSON.parse(data);
                var template = $$('script#template').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(context);
                $$('.main-content .user-list').remove();
                $$('.main-content').append(html);
            },
            function (xhr, status) {
                console.log(status)
            });
    },

    updateLeftPanel: function () {
        // app.request.get('http://remmy-dev.bstdv.ru:8989/rest/personservice/person/get/', {},
        app.request.get('http://remmy-dev.bstdv.ru:8080/RemmyService/service/user/', {},
            function (data, status, xhr) {
                var context = JSON.parse(data);
                var template = $$('script#panel-template').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(context);
                $$('.left-panel-content .panel-user-list').remove();
                $$('.left-panel-content').append(html);
            },
            function (xhr, status) {
                console.log(status)
            });
    },

    updateTasks: function () {
        // app.request.get('http://remmy-dev.bstdv.ru:8989/rest/personservice/task/get/0/list', {},
            app.request.get('http://remmy-dev.bstdv.ru:8080/RemmyService/service/tasklist/0', {},
            function (data, status, xhr) {
                var context = JSON.parse(data);
                var template = $$('script#tasks-template').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(context);
                $$('.tasks-content .task-list').remove();
                $$('.tasks-content').append(html);
            },
            function (xhr, status) {
                console.log(status)
            });
    },
    updateUserTasks: function (userId) {
        // app.request.get('http://remmy-dev.bstdv.ru:8989/rest/personservice/task/get/0/list', {},

        app.request.get('http://remmy-dev.bstdv.ru:8080/RemmyService/service/tasklist/'+userId, {},
            function (data, status, xhr) {
                var context = JSON.parse(data);
                var template = $$('script#tasks-template').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(context);
                $$('.tasks-content .task-list').remove();
                $$('.tasks-content').append(html);
            },
            function (xhr, status) {
                console.log(status)
            });
    },
    getTask: function( taskID ){
        app.request.get('http://remmy-dev.bstdv.ru:8080/RemmyService/service/task/'+taskID, {},
        function (data, status, xhr) {
            var context = JSON.parse(data);
            var template = $$('script#task-template').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(context);

            $$('.task-content').append(html);
        },
        function (xhr, status) {
            console.log(status)
        });
    },
    createTask: function (strJSON) {
        app.request.postJSON('http://remmy-dev.bstdv.ru:8080/RemmyService/service/task/post/',
            JSON.parse(strJSON),
            function (data) {
                console.log(data)
            });
    },
    updateTask: function (strJSON) {
        app.request.postJSON('http://remmy-dev.bstdv.ru:8080/RemmyService/service/task/put/',
            JSON.parse(strJSON),
            function (data) {
                console.log(data)
            });
    },
    offer: function(itemId){
        app.api.taskId = itemId;
        view.router.load({
            url: 'pages/task.html',
        });
        return false;
    },
};
//
// $$('.notification-single').on('click', function () {
//
//     app.api.createUser();
//     app.api.updateUsers();
//     app.dialog.alert('User created');
// });
// $$('.notification-task').on('click', function () {
//     app.api.createTask();
//     app.api.updateTasks();
//     app.dialog.alert('Task create');
// });
// $$('.notification-task').on('taphold', function () {
//     app.dialog.alert('Tap hold fired!');
// });
//

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
}
$$(document).on('click', '.form-to-json', function(e, page){
    var formJSON = app.form.convertToData('#new-task-form');
    var strJSON = JSON.stringify({task: formJSON});

    app.api.createTask(strJSON);
//    sleep(2000);
//    mainView.router.back({force: true, ignoreCache: true, reload: true});
});

app.api.updateUsers();
app.api.updateTasks(0);
app.api.updateLeftPanel();



$$(document).on('page:init', '.page[data-name="task"]', function (e, page) {
    if (page.route.context.taskItem !== null) {
    app.form.fillFromData('#new-task-form', page.route.context.taskItem.task)};
})
