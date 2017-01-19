app
.component('people', {
    bindings: {
        sharedData: '='
    },
    templateUrl: 'app/people-person/people/people.component.html',
    controller: peopleController,
    controllerAs: 'ctrl',
});