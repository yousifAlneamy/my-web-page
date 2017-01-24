function myProfileContorller(peopleService){
    
    var that = this;
    that.service = peopleService;
    
    if (that.service.peopleArray === undefined){
        peopleService.getPeople().then(function(response) {
            console.log(response);
            that.service.peopleArray = response.data;
            that.myProfile = that.service.peopleArray[that.service.peopleArray.length - 1];
        }).catch(function(error) {
            console.log(error);
        });
    } else{
        that.myProfile = that.service.peopleArray[that.service.peopleArray.length - 1];
    }
}