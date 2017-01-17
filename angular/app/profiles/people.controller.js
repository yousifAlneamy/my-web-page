function peopleController(peopleService) {
    var that = this;
    that.peopleArray = [];
    that.showProfile = peopleService.showProfile; // referencing the method of peopleService, so that I can use it within current controller scope
    
    peopleService.getPeople().then(function(response) {
        console.log(response);
        that.peopleArray = response.data;
    }).catch(function(error) {
        console.log(error);
    });
}