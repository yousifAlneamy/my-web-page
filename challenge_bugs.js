bug1() {
      const people = [{
        name: 'Alice',
        age: 25
      }, {
        name: 'Bob',
        age: 27
      }, {
        name: 'Charlie',
        age: 40
      }];

      for (let person in people) {
        console.log(`${person.name} is ${person.age}`);
      }
    }


/* solution of bug1 */
function bug1() {
      const people = [{
        name: 'Alice',
        age: 25
      }, {
        name: 'Bob',
        age: 27
      }, {
        name: 'Charlie',
        age: 40
      }];

      for (let person in people) {
        console.log(`${people[person].name} is ${people[person].age}`);
      }
    }


bug8() {
      for (var i = 0; i < 5; i++) {
        setTimeout(function () {
          console.log(i+1);
        }, 100*i);
      }
    }
    
/* solution of bug8 */
function bug8() {
      for (var i = 0; i < 5; i++) {
        setTimeout(
function (value) {
          return function(){console.log(value);};
        }(i+1), 100*i);
      }
    }