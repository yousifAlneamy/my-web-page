function profileController(personsService) {
    var that = this;
    personsService.profileController = that;
    
    that.className = "hiddenCustom";
    that.name = "";
    that.showProfile = function(personObject){
        that.className = "showCustom";
        that.name = personObject.name;
        that.pictureUrl  = personObject.pictureUrl;
        that.linkedInUrl = personObject.linkedInUrl;
        that.role = personObject.role;
    }
}