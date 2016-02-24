/**
 * Created by Jackson on 2/22/2016.
 */
var links = new Array();
var divs = new Array();

function initialize() {
    // Get content from the body of the HTML page
    var tabItems = document.getElementById('tabs').childNodes;
    for (var i = 0; i < tabItems.length; i++) {
        if (tabItems[i].nodeName == "LI") {
            var tabLink = getFirstChildWithTagName(tabItems[i], 'A');
            var id = getHash(tabLink.getAttribute('href'));
            links[id] = tabLink;
            divs[id] = document.getElementById(id);
        }
    }

    // Assign onclick events to the tab links
    // Highlight the first tab
    var i = 0;

    for (var id in links) {
        links[id].onclick = showTab;
        links[id].onfocus = function () {
            this.blur()
        };
        if (i == 0)
            links[id].className = 'selected';
        i++;
    }

    // Hide divs other than the one selected
    var i = 0;
    for (var id in divs) {
        if (i != 0)
            divs[id].className = 'content hide';
        i++;
    }
}

function showTab() {
    var selectedId = getHash(this.getAttribute('href'));

    // Highlight the selected tab, and dim all others.
    // Also show the selected content div, and hide all others.
    for (var id in divs) {
        if (id == selectedId) {
            links[id].className = 'selected';
            divs[id].className = 'content'
        } else {
            links[id].className = '';
            divs[id].className = 'content hide';
        }
    }
        // Stop the browser following the link
        return false;
}

function getFirstChildWithTagName(element, tagName){
    for (var i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].nodeName == tagName)
        return element.childNodes[i];
    }
}

function getHash(url) {
    var hashPos = url.lastIndexOf('#');
    return url.substring(hashPos + 1);
}