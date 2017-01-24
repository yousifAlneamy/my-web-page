function addPersonContorller($state, peopleService){
 
    var that = this;
    that.service = peopleService;
    
    that.addMember = function(){
        
        if ( that.name && that.role && that.pictureUrl && that.linkedInUrl ){
            that.id = that.service.peopleArray.length + 1;
            that.service.peopleArray.push(
                {
                    id: that.id,
                    name: that.name,
                    role: that.role,
                    pictureUrl: that.pictureUrl,
                    linkedInUrl: that.linkedInUrl
                }
            );
            
            $state.go('person', {id: that.id});
            
        } else{
            alert("Please enter valid info!");
        }
    }
    
}