angular.module('app.people')
    .component('person', {
    templateUrl: 'app/profiles/person.component.html',
    controller: personController,
    controllerAs: 'ctrl_person',
});
