var routes = [
    {
        path: '/',
        url: './index.html',
    },
    // {
    //     path: '(/task/)',
    //     url: './pages/task.html',
    // },
    {
        path: '/task-list/:userId/',
        async: function (routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // Task ID from request
            var userId = routeTo.params.userId;
             // Simulate Ajax Request
             app.request.get('http://remmy-dev.bstdv.ru:8989/rest/personservice/task/get/', {},
                function (data, status, xhr) {
                    // Hide Preloader
                    console.log(status);
                    console.log(data);
                    strJSON = JSON.parse(data);
                    app.preloader.hide();

                    // Resolve route to load page
                    resolve(
                        {
                            componentUrl: './pages/task-list.html',
                        },
                        {
                            context: {
                                taskItems: strJSON,
                                // user: user,
                            }
                        }
                    );
                },
                function (xhr, status) {
                    console.log(status)
                });
        },
    },
    {
        path: '/task/:taskId?/',
        async: function (routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;
            var undefParm = '{}'; //{"task":{"id":"","startDate":"","text":""}}
            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            if (routeTo.params.taskId !== undefined) {
            // Task ID from request
            var taskId = routeTo.params.taskId;
            // Simulate Ajax Request
            app.request.get('http://remmy-dev.bstdv.ru:8989/rest/personservice/task/get/' + taskId, {},
                function (data, status, xhr) {
                    // Hide Preloader
                    console.log(status);
                    console.log(data);
                    strJSON = JSON.parse(data);
                    app.preloader.hide();

                    // Resolve route to load page
                    resolve(
                        {
                            componentUrl: './pages/task.html',
                        },
                        {
                            context: {
                                taskItem: strJSON,
                                // user: user,
                            }
                        }
                    );
                },
                function (xhr, status) {
                    console.log(status)
                });
            } else {
                app.preloader.hide();
                strJSON = JSON.parse(undefParm);
                resolve(
                    {
                        componentUrl: './pages/task.html',
                    },
                    {
                        context: {
                            taskItem: strJSON,
                            // user: user,
                        }
                    }
                );
            }

            }
    },
    // {
    //     path: '/task2/:name/',
    //     template:`
    //     <div class="page" data-name="task">
    //         <div class="navbar">
    //             <div class="navbar-inner sliding">
    //                 <div class="left">
    //                     <a href="#" class="link back">
    //                         <i class="icon icon-back"></i>
    //                         <span class="ios-only">Back</span>
    //                     </a>
    //                 </div>
    //                 <div class="title">Задача №{{$route.params.name}}</div>
    //             </div>
    //         </div>
    //         <div class="page-content">
    //             <div class="block task-content">
    //
    //             </div>
    //         </div>
    //         <script id="task-template" type="text/template7">
    //             <a class="item-content item-link notification-task" href="/task/{{name}}/">
    //                 <div class="item-media">
    //                     <img src="img/avatar_circle_blue_36dp.png"/>
    //                 </div>
    //                 <div class="item-inner">
    //                     <div class="item-title">
    //                         <div class="item-header">{{text}}</div>
    //                         Задача {{this.id}}
    //                         <div class="item-footer">{{startDate}}</div>
    //                     </div>
    //                 </div>
    //             </a>
    //         </script>
    //     </div>
    //     `
    // },
    // {
    //     path: '(/new-task/)',
    //     url: './pages/new-task.html',
    // },
    //
    // {
    //     path: '(/contact-list/)',
    //     url: './pages/contact-list.html',
    //
    // },
    // {
    //     path: '(/contact-task-list/)',
    //     url: './pages/contact-task-list.html',
    // },
    // {
    //     path: '/request-and-load/user/:userId/',
    //     async: function (routeTo, routeFrom, resolve, reject) {
    //         // Router instance
    //         var router = this;
    //
    //         // App instance
    //         var app = router.app;
    //
    //         // Show Preloader
    //         app.preloader.show();
    //
    //         // User ID from request
    //         var userId = routeTo.params.userId;
    //
    //         // Simulate Ajax Request
    //         setTimeout(function () {
    //             // We got user data from request
    //             var user = {
    //                 firstName: 'Vladimir',
    //                 lastName: 'Kharlampidi',
    //                 about: 'Hello, i am creator of Framework7! Hope you like it!',
    //                 links: [
    //                     {
    //                         title: 'Framework7 Website',
    //                         url: 'http://framework7.io',
    //                     },
    //                     {
    //                         title: 'Framework7 Forum',
    //                         url: 'http://forum.framework7.io',
    //                     },
    //                 ]
    //             };
    //             // Hide Preloader
    //             app.preloader.hide();
    //
    //             // Resolve route to load page
    //             resolve(
    //                 {
    //                     componentUrl: './pages/request-and-load.html',
    //                 },
    //                 {
    //                     context: {
    //                         user: user,
    //                     }
    //                 }
    //             );
    //         }, 500);
    //     },
    // },

    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
