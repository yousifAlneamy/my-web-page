app.component('person', {
    bindings: {
        sharedData: '<' // because we only need to read this, not writing it.
    },
    templateUrl: 'app/hyf-staff/people-person/person/person.component.html',
    controllerAs: 'ctrl_person',
});
