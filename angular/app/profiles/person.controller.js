function personController(peopleService) {
    this.peopleService = peopleService; // this is a reference of personsService, so that to share data
}