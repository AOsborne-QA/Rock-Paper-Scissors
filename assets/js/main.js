$("document").ready(function () {

    // Below object holds global variables to reduce amount in global space.

    let game = {
        timer: {
            time: 10,
            timerStop: false,
            gameTimer: null
        },
        selection: {
            userChoice: "",
            compChoice: ""
        },
        resultMessage: "",
    }

    /**
     * When user clicks on start btn it hides the main section, 
     * displays the game choice area and starts timer.
     */

    $(".start").on("click", () => {
        $(".start").toggleClass("d-none");
        $(".game-choice-area").toggleClass("d-none");
        game.timer.gameTimer = setInterval(choiceTimer, 1000);
    })


    // Stops timer, hides choice selection and displays failure message

    function stopTimer() {
        clearInterval(game.timer.gameTimer)
    }

    function choiceStop() {
        stopTimer();
        $(".game-choice").toggleClass("d-none");
        $(".choice-timeout").toggleClass("d-none");
    }

    // Decrements the choice timer and updates timer text.

    function choiceTimer() {
        --game.timer.time;

        if (game.timer.time != 1) {
            $(".timer").text(`${game.timer.time} seconds`);
        } else {
            $(".timer").text(`${game.timer.time} second`);
        }

        if (game.timer.time <= 5) {
            $(".timer").css("color", "red");
        }

        if (game.timer.time == 0) {
            choiceStop();
        }
    }

})