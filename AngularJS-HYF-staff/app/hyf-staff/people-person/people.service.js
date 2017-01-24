app
.service('peopleService', peopleService);

function peopleService($http, api) {
    var that = this;
    that.order = "id";
    
    that.getPeople = function() {
        console.log(api.root + api.path);
        return $http.get(api.root + api.path);
    }
}