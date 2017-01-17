function personsController(personsService) {
    var that = this;
    that.personsArray = [];
    that.showProfile = personsService.showProfile; // referencing the method of personsService, so that I can use it within current controller scope
    
    personsService.getPersons().then(function(response) {
        console.log(response);
        that.personsArray = response.data;
    }).catch(function(error) {
        console.log(error);
    });
}