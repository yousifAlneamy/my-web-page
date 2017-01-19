angular.module('app.people')
    .component('person', {
    bindings: {
        sharedData: '<' // because we only need to read this, not writing it.
    },
    templateUrl: 'app/people-person/person/person.component.html',
    controllerAs: 'ctrl_person',
});
