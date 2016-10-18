var countElements = {};
        
var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

var countFunction = function hasChildern(node) {
    if (node.hasChildNodes()) {
        for (var i = 0; i<node.childNodes.length; i++) {

            if ( node.childNodes[i].nodeType === 1 ) { // to filter the nodes from other node types like #text

                var nodeNameStr = node.childNodes[i].nodeName.toLocaleLowerCase();
                if ( ! countElements.hasOwnProperty(nodeNameStr) ){ // if the property not found in the object then assign it to 1, else increment by 1
                    countElements[nodeNameStr] = 1;
                } else{
                    countElements[nodeNameStr]++;
                }
            }

        }
    }
};

walk_the_DOM(document.body, countFunction);
console.log("Counting elements object: " , countElements);