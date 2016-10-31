/*
 * Proper way of writing Javascript code. Writing functions in modules
 * will help you export code without any problems. This will also help
 * in splitting your code, for now it's just one module but later you'll
 * see that it will be much cleaner to split things.
 */
var module = (function() {
    var index = 0;
    var cardTemplate = null;
    var factList = ['the atomic number of the theoretical element tetraneutron.'];

    /* 
     * Function to remove the animations from already animated objects,
     * and make sure to indicate that this isn't the latest element.
     */
    var removeAnimations = function() {
        Array.from(document.getElementsByClassName("animated"))
            .forEach(function(el) {
                el.classList.remove("animated");
            });

    };

    /* 
     * Typical GET request function in javascript.
     */
    var http = function(method, url) {
        var defer = new Promise(function(resolve, reject) {
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    resolve(xmlHttp.responseText);
            };

            xmlHttp.open(method, url, true);
            xmlHttp.send(null);
        });
        return defer;
    };

    var getNewFact = function() {
        http("GET", "http://numbersapi.com/" + index +
                "/trivia?notfound=floor&fragment")
            .then(function(fact) {
                // Save the fact that you get
                factList[index] = fact;
                console.log(factList.length);
            });
    };

    /*
     * Update the list of cards that is shown in the view.
     */
    var updateCards = function() {
        var cardsEl, fact, red, blue, green;

        cardsEl = document.getElementById("card-display");
        fact = factList[index];
        red = Math.floor(Math.random() * 256) + ',';
        blue = Math.floor(Math.random() * 256) + ',';
        green = Math.floor(Math.random() * 256);

        // This is to remove animations all the previous
        // cards so we don't get any repeats
        removeAnimations();

        // 'dry' stands for don't repeat yourself
        function dryJob(cardTemplate) {
            var newstr = cardTemplate.replace("#", index);
            newstr = newstr.replace("$", fact);
            newstr = newstr.replace("*", 'background-color: rgb(' +
                red + blue + green + ');');
            cardsEl.innerHTML += newstr;
            index++;
        }

        if (!cardTemplate) {
            http("GET", "../templates/card-temp.html")
                .then(dryJob, function(error) {
                    console.error(error);
                }).then(getNewFact, function(error) {
                    console.error(error);
                });
        } else {
            dryJob(cardTemplate);
        }
    };

    /* 
     * Set the space bar as the main event and execute right away 
     */
    var setSpaceBarEvent = (function(callback, args) {
        var space = false;
        document.onkeyup = function(evt) {
            if (evt.keyCode == 32) {
                space = false;
            }
        };

        document.onkeydown = function(evt) {
            if (evt.keyCode == 32 && !space) {
                space = true;
                callback();
            }
        };

    })(updateCards);

    /*
     * Export whatever functions you want to export.
     */
    return {
        updateCards: updateCards
    };

})();
