var score = 0;

function runAwayHelper() {
    var balls = document.getElementsByClassName("ball");

    var topRandomNumber = Math.floor((Math.random() * 90) + 5);
    var leftRandomNumber = Math.floor((Math.random() * 90) + 5);

    for (var i in balls) {
        var element = balls[i];
        if (element.id == "leader") {
            element.style.top = topRandomNumber + "%";
            element.style.left = leftRandomNumber + "%";
        } else {
            element.style.top = topRandomNumber + 2 + "%";
            element.style.left = leftRandomNumber + 2 + "%";
        }
    }

}

function runAway() {
    setTimeout(runAwayHelper, 150);
}

function addScore() {
    var scoreEl = document.getElementById("score-number");
    score = score + 1;
    scoreEl.innerHTML = score;
}
