$("document").ready(function () {

    // Below object holds global variables to reduce amount in global space.

    let game = {
        time: 10,
        timerStop: false,
        gameTimer: null
    }

    /**
     * When user clicks on start btn it hides the main section, 
     * displays the game choice area and starts timer.
     */

    $(".start").on("click", () => {
        $(".start").toggleClass("d-none");
        $(".game-choice-area").toggleClass("d-none");
        game.gameTimer = setInterval(choiceTimer, 1000);
    })


    // Stops timer, hides choice selection and displays failure message


    function choiceStop() {
        clearInterval(game.gameTimer);
        $(".game-choice").toggleClass("d-none");
        $(".choice-timeout").toggleClass("d-none");
    }

    // Decrements the choice timer and updates timer text.

    function choiceTimer() {
        --game.time;

        if (game.time != 1) {
            $(".timer").text(`${game.time} seconds`);
        } else {
            $(".timer").text(`${game.time} second`);
        }

        if (game.time <= 5) {
            $(".timer").css("color", "red");
        }

        if (game.time == 0) {
            choiceStop();
        }
    }

})