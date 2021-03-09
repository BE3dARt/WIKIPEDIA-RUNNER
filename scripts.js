//Create a new object to interact with the server
var xhr = new XMLHttpRequest();

var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&generator=random&grnnamespace=0&format=json";

//origin=*&
// Provide 3 arguments (GET/POST, The URL, Async True/False)
xhr.open('GET', url, true);

// Once request has loaded...
xhr.onload = function () {
    // Parse the request into JSON
    var data = JSON.parse(this.response);

    // Loop through the data object
    // Pulling out the titles of each page
    var pageid;
    for (var i in data.query.pages) {

        pageid = data.query.pages[i].pageid;
    }

    var getString = "https://en.wikipedia.org/w/api.php?action=parse&format=php&origin=*&pageid=" + pageid;

    console.log(getString);

    //Content of site
    fetch(getString)

        .then(function (response) {
            // When the page is loaded convert it to text
            return response.text()
        })
        .then(function (html) {
            // Initialize the DOM parser
            var parser = new DOMParser();

            // Parse the text
            var doc = parser.parseFromString(html, "text/html");

            // You can now even select part of that html as you would in the regular DOM 
            // Example:
            var docArticle = doc.getElementsByClassName("mw-parser-output")[0];


            document.getElementById('example').appendChild(docArticle);

            //document.body.innerHTML = document.body.innerHTML.replace('//', 'https://');

            Array.from(document.getElementsByClassName("image"))
                .forEach(element => element.innerHTML = element.innerHTML.replace('//', 'https://'));

            var paras = document.getElementsByClassName('mw-editsection');
            while (paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            }

            paras = document.getElementsByClassName('reference');
            while (paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            }

            paras = document.getElementsByClassName('box-Advert plainlinks metadata ambox ambox-content ambox-Advert');
            while (paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            }

            paras = document.getElementsByClassName('metadata plainlinks asbox stub');
            while (paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            }

            document.getElementById("References").remove();
            paras = document.getElementsByClassName('reflist');
            while (paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            }

            console.log(doc);
        })
        .catch(function (err) {
            console.log('Failed to fetch page: ', err);
        });



}
// Send request to the server asynchronously
xhr.send();
