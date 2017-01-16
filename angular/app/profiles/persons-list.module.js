angular.module('app.personsList', [])
.constant('api', {
    root: 'http://localhost:3000',
    path: '/persons',
})