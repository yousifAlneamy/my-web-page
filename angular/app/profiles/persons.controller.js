function personsController(personsService) {
    var that = this;
    personsService.personsController = that;
    that.personsArray = [];
    personsService.getPersons().then(function(response) {
        console.log(response);
        that.personsArray = response.data;
    }).catch(function(error) {
        console.log(error);
    });
    
    that.showProfile = function(personObject){
        personsService.showProfile(personObject);
    }
}