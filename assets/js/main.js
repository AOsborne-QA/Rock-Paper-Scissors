$("document").ready(function() {

    // Below object holds global variables to reduce amount in global space.

    let game = {
        time : 10
    }

    /**
     * When user clicks on start btn it hides the main section, 
     * displays the game choice area and starts timer.
     */

    $(".start").on("click", () => {
        $(".start").toggleClass("d-none");
        $(".game-choice-area").toggleClass("d-none");
        choiceStart();
    })


    // Timer for choice selection.

    function choiceStart() {
        setInterval(choiceTimer, 1000);
    }

    // Decrements the choice timer and updates timer text.

    function choiceTimer() {
        --game.time

        if(game.time != 1) {
            $(".timer").text(`${game.time} seconds`);
        } else {
            $(".timer").text(`${game.time} second`);
        }
    }
})
