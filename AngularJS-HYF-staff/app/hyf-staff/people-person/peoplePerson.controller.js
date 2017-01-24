function peopleController($state, $stateParams, peopleService) {
    var that = this;
    that.service = peopleService;
    
    if ($stateParams.id && that.service.peopleArray){
        that.personObject = that.service.peopleArray[$stateParams.id - 1];
    }
    
    if (that.service.peopleArray === undefined){
        peopleService.getPeople().then(function(response) {
        console.log(response);
        that.service.peopleArray = response.data;
        
        if ($stateParams.id){
            that.personObject = that.service.peopleArray[$stateParams.id - 1];
        }
        }).catch(function(error) {
            console.log(error);
        });
    }
}