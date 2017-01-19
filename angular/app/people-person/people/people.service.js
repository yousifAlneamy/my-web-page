angular.module('app.people')
.service('peopleService', peopleService);

function peopleService($http, api) {
    var that = this;
    
    that.getPeople = function() {
        console.log(api.root + api.path);
        return $http.get(api.root + api.path);
    }
}