angular.module('app.peoplePerson', [])
.constant('api', {
    root: 'http://localhost:3000',
    path: '/persons',
});