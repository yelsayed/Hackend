var score = 0;

function jumpAround() {
	setTimeout(jumpAroundHelper,150);
}

function jumpAroundHelper() {
	var topRandomNumber, leftRandomNumber, balls;
    balls = document.getElementsByClassName('ball');

    topRandomNumber = Math.floor(Math.random() * 90 + 5);
    leftRandomNumber = Math.floor(Math.random() * 90 + 5);

    if (balls) {
        for (var i = 0; i < balls.length; i++) {
            element = balls[i];
            if (element.id != "bot") {
                element.style.top = topRandomNumber + 2 + "%";
                element.style.left = leftRandomNumber + 2 + "%";
            } else {
                element.style.top = topRandomNumber + "%";
                element.style.left = leftRandomNumber + "%";
            }
        }
    }
}

function addScore() {
	var scoreEl, balls, red, blue, green;
	
	balls = document.getElementsByClassName('ball');

	// Remember, you're getting back an array so get the first element 
	// IFF you're sure that there is one element in your HTML of that name
	scoreEl = document.getElementsByClassName('main-score')[0];

	red = Math.floor(Math.random() * 256) + ',';
    blue = Math.floor(Math.random() * 256) + ',';
    green = Math.floor(Math.random() * 256);

	for (var i = 0; i < balls.length; i++) {
		element = balls[i];
		element.style.backgroundColor = 'rgb(' + red + blue + green + ')';
	}

	score++;
	scoreEl.innerHTML = score;

}
