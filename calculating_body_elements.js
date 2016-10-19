// add this .js file to your html page and it'll calculate the body elements

var countElements = {}; // public empty object is used to push elements name as properties and their values as a number of times the element found the HTML document.
        
var walk_the_DOM = function walk(node, func) { // function that receives a node and a function that deals with the node's children
    func(node);// handling node's children
    node = node.firstChild; // assign node var to the first child of the node 
    while (node) { // keep going while there is a node to deal with(to the end of node siblings)
        walk(node, func); // make a recursive call for this node (new node) to deal with as the current node
        node = node.nextSibling; // move to the next sibling
    }
};

var countFunction = function hasChildern(node) { // function deals with node's childern
    if (node.hasChildNodes()) { // this line will be more effictive if I place it before line no. 6
        for (var i = 0; i<node.childNodes.length; i++) {// I think this is clear

            if ( node.childNodes[i].nodeType === 1 ) { // to filter the nodes from other node types like #text

                var nodeNameStr = node.childNodes[i].nodeName.toLocaleLowerCase(); // nodeName property is usually uppercase, so I change it lowercase as HTML tags usually written
                if ( ! countElements.hasOwnProperty(nodeNameStr) ){ // if the property not found in the object then assign it to 1, else increment by 1
                    countElements[nodeNameStr] = 1; // add new property name to the object and assign its value to 1
                } else{
                    countElements[nodeNameStr]++; // if the property name already there, please do +1
                }
            }

        }
    }
};

walk_the_DOM(document.body, countFunction);// calling the function
console.log("Counting elements object: " , countElements); // logging the object
// I hope everything is clear

// another way of doing it

countElements = {}; // clear the object
        
var walk_the_DOM_2nd = function walk(nodeParent) {
        
    var childNodesList = nodeParent.childNodes; 
    for (var i = 0; i < childNodesList.length; i++){
            
        if ( childNodesList[i].nodeType === 1 ){ // to filter the nodes from other node types such as #text        
            var nodeNameStr = childNodesList[i].nodeName.toLocaleLowerCase();
            if (! countElements.hasOwnProperty(nodeNameStr)){ // if the property isn't found in the object then assign it to 1, else increment by 1
                countElements[nodeNameStr] = 1;
            } else{
                countElements[nodeNameStr]++;
            }
            if (childNodesList[i].hasChildNodes()){
                walk(childNodesList[i]);
            }
        }
    }
};
        walk_the_DOM_2nd(document.body);
        console.log("Counting elements object: " , countElements);
