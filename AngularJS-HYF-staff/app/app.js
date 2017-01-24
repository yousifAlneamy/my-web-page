var app = angular.module('app',['ui.router', 'app.peoplePerson']);
app.factory("user",function(){
        return {};
});

app.config(routing)

function routing($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/',
		component: 'peoplePerson'
	})
	.state('person', {
		url: '/person/:id',
		component: 'peoplePerson'
	})
    .state('edite', {
        url: '/edite/person/:id/:edite',
        component: 'peoplePerson'
    })
	.state('add', {
		url: '/add/person/',
		component: 'addPerson'
	})
    .state('myProfile',{
        url: '/myProfile/',
        component: 'myProfile'
    });
	$urlRouterProvider.otherwise('/')
}