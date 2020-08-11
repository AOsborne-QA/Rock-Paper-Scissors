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
    };

    /**
     * When user clicks on start btn it hides the main section, 
     * displays the game choice area and starts timer.
     */

    $(".start").on("click", () => {
        $(".landing-page").toggleClass("d-none");
        startChoice();
    });


    function startChoice() {
        $(".game-choice-area").toggleClass("d-none");
        game.timer.gameTimer = setInterval(choiceTimer, 1000);
    }


    // Stops timer, hides choice selection and displays failure message

    function stopTimer() {
        clearInterval(game.timer.gameTimer);
        resetTimerInfo();
    }

    /**
     * Below invokes stopTimer(), hides the choice area,
     * displays the failure message to user.
     */

    function choiceStop() {
        stopTimer();
        $(".game-choice-area").toggleClass("d-none");
        $(".failure-area").toggleClass("d-none");
    }


    /**
     * The below decrements the choice timer to show it counting
     * down and updates the HTML text. At 5 seconds, it changes 
     * text to red to stand out to user. At 0, it invokes ChoiceStop().
     */

    function choiceTimer() {
        --game.timer.time;

        if (game.timer.time != 1) {
            $(".timer").text(`${game.timer.time} seconds`);
        } else {
            $(".timer").text(`${game.timer.time} second`);
        }

        if (game.timer.time <= 5) {
            $(".timer").addClass("red-text");
        }

        if (game.timer.time == 0) {
            choiceStop();
        }
    }

   // Below invokes the resterTimerInfo and hides failure area and restarts game

    function restartChoice() {
        resetTimerInfo();

        if (!$(".failure-area").hasClass("d-none")) {
            $(".failure-area").toggleClass("d-none");
        }

        if (!$(".game-area").hasClass("d-none")) {
            $(".game-area").toggleClass("d-none");
            clearResults();
        }

        startChoice();
    }

    // Below resets timer variables, HTML text and removes class from timer text.

    function resetTimerInfo() {
        game.timer.time = 10;
        $(".timer").removeClass("red-text");
        $(".timer").text("10 seconds");
    }

    // Restarts game when users clicks on restart button

    $(".restart").on("click", () => {
        restartChoice();
    });


    /**
     * Below takes the ID from the user choice and stores it. Then it invokes
     * computerChoice() to get the computers choice. It stops the timer, then 
     * invokes gameDecision() to determine result, and finally invokes 
     * showResult() to display results to user.
     */


    $(".choice").on("click", (event) => {
        game.selection.userChoice = $(event.currentTarget).attr('id');
        game.selection.compChoice = computerChoice();
        stopTimer();
        gameDecision(game.selection.userChoice, game.selection.compChoice);
        showResult(game.selection.userChoice, game.selection.compChoice);
    });


    /**
     * Below chooses a random option for the computer based on the number
     * generated. This is then used to pick an option from the array and 
     * returned.
     */

    function computerChoice() {
        const decision = Math.floor(Math.random() * 3);
        const choices = ["rock", "paper", "scissors"];

        return choices[decision];

    }

    /**
     * The below determines the game result based on the user choice against
     * what was generated as computer choice then returns the result message.
     */

    function gameDecision(uChoice, cChoice) {
        // Draw Condition
        if (uChoice === cChoice) {
            game.resultMessage = "Dang, it's a draw";
            return game.resultMessage;

        }

        if (uChoice === "rock") {
            if (cChoice === "paper") {
                game.resultMessage = `You lost! You chose ${uChoice} and computer chose ${cChoice}`;
                return game.resultMessage;
            } else {
                game.resultMessage = `You won! Your ${uChoice} smashed the computers ${cChoice}`;
                return game.resultMessage;

            }
        }

        if (uChoice === "paper") {
            if (cChoice === "scissors") {
                game.resultMessage = `You lost! You chose ${uChoice} and computer chose ${cChoice}`;
                return game.resultMessage;
            } else {
                game.resultMessage = `You won! Your ${uChoice} covered the computers ${cChoice}`;
                return game.resultMessage;
            }
        }


        if (uChoice === "scissors") {
            if (cChoice === "rock") {
                game.resultMessage = `You lost! You chose ${uChoice} and computer chose ${cChoice}`;
                return game.resultMessage;
            } else {
                game.resultMessage = `You won! Your ${uChoice} cut the computers ${cChoice}`;
                return game.resultMessage;
            }
        }
    }

    // This hides the game-choice-area within the HTML page

    function hideChoice() {
        $(".game-choice-area").toggleClass("d-none");
    }

    /**
     * The below function shows the results to the user and takes in the
     * user and computer choice, invokes hideChoice(), displays the game-area
     * in the HTML document. Appends the user and computer choice images to HTML and 
     * game message
     */

    function showResult(uChoice, cChoice) {
        hideChoice();
        let message = game.resultMessage;
        $(".game-area").toggleClass("d-none");
        $(".result").append(`<h2>${message}</h2>`);
        $(".user").append(`<img class="choice-image result-image" src="assets/images/${uChoice}.png" alt="Your choice image of ${uChoice}">`);
        $(".comp").append(`<img class="choice-image result-image" src="assets/images/${cChoice}.png" alt="Computer choice image of ${cChoice}">`);
    }

    // Removes the images and h2 from results area

    function clearResults() {
        $(".user img").remove();
        $(".comp img").remove();
        $(".result h2").remove();
    }

    /**
     * Prevents the default action of anchor tag. Invokes clear results function
     * Checks to see if any screen does not have the d-none class, if it doesn't
     * it toggles and applies it then shows landing page. 
     * If user is on game choice area, then it resets time and corresponding elements.
     * If game area, it clears the results.
     */
    
    $(".home").on("click", (event) => {
        event.preventDefault();
    
        if (!$(".game-choice-area").hasClass("d-none")) {
            hideChoice();
            stopTimer();
            resetTimerInfo();
        }
    
        if (!$(".failure-area").hasClass("d-none")) {
            $(".failure-area").toggleClass("d-none");
        }
    
        if (!$(".game-area").hasClass("d-none")) {
            $(".game-area").toggleClass("d-none");
            clearResults();
        }
    
        if ($(".landing-page").hasClass("d-none")) {
            $(".landing-page").toggleClass("d-none");
        }
    });

});