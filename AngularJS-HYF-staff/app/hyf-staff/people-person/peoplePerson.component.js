app
.component('peoplePerson', {
    bindings: {
        sharedData: '='
    },
    templateUrl: 'app/hyf-staff/people-person/peoplePerson.component.html',
    controller: peopleController,
    controllerAs: 'ctrl',
});