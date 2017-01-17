angular.module('app.people')
.service('peopleService', peopleService);

function peopleService($http, api) {
    var that = this;
    that.className = "hiddenCustom";
    
    
    that.showProfile = function(personObject){ // this function will be called just after clicking the See link
        that.className = "showCustom";
        that.name = personObject.name;
        that.pictureUrl  = personObject.pictureUrl;
        that.linkedInUrl = personObject.linkedInUrl;
        that.role = personObject.role;
    }
    
    that.getPeople = function() {
        console.log(api.root + api.path);
        return $http.get(api.root + api.path);
    }
}