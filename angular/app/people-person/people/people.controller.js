function peopleController(peopleService) {
    var that = this;
    that.peopleArray = [];
    
    peopleService.getPeople().then(function(response) {
        console.log(response);
        that.peopleArray = response.data;
    }).catch(function(error) {
        console.log(error);
    });
    
}