console.log(app);

app.service('personsService', personsService);

function personsService($http, api) {
    var that = this;
    
    that.getPersons = function() {
        console.log(api.root + api.path);
        return $http.get(api.root + api.path);
    }
    that.showProfile = function(personObject){
        console.log(personObject);
        that.profileController.showProfile(personObject);
    }
}