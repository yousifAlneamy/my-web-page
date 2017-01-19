angular.module('app.people', [])
.constant('api', {
    root: 'http://localhost:3000',
    path: '/persons',
});