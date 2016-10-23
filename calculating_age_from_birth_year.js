operation:{
        var block_count = 0;
        var birthday = new Date();
        var selection;
        
        do {
            block_count++;
            if ( block_count > 4 ){
                break operation;
            }
            selection = parseInt(window.prompt("Enter your birth year (only positive numbers)", ""), 10);
        } while(isNaN(selection) || selection < 1);
        birthday.setFullYear(selection);

        function calculateAge(birthday) {
            return Math.abs(birthday.getFullYear() - new Date().getFullYear());
        }
        alert(calculateAge(birthday));
    }