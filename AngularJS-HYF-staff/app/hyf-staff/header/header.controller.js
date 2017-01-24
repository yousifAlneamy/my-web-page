function headerController(peopleService){
    
    var that = this;
    that.service = peopleService;
    
    if (that.service.peopleArray === undefined){
        peopleService.getPeople().then(function(response) {
        console.log(response);
        that.service.peopleArray = response.data;
        }).catch(function(error) {
            console.log(error);
        });
    }
    
}