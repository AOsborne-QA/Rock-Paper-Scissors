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

    /**
     * Below resters the game time to 10, removes the css class from the timer,
     * changes the HTML text to 10 seconds, hides the failure message and starts
     * choice selection
     */

    function restartChoice() {
        game.timer.time = 10;
        $(".timer").removeClass("red-text");
        $(".timer").text("10 seconds");
        $(".failure-area").toggleClass("d-none");
        startChoice();
    }


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
                game.resultMessage = `Sucks, you lost - computer chose ${cChoice}`;
                return game.resultMessage;
            } else {
                game.resultMessage = `You won! Your ${uChoice} smashed the computers ${cChoice}`;
                return game.resultMessage;
    
            }
        }
    
        if (uChoice === "paper") {
            if (cChoice === "scissors") {
                game.resultMessage = `Sucks, you lost - computer chose ${cChoice}`;
                return game.resultMessage;
            } else {
                game.resultMessage = `You won! Your ${uChoice} smashed the computers ${cChoice}`;
                return game.resultMessage;
            }
        }
    
    
        if (uChoice === "scissors") {
            if (cChoice === "rock") {
                game.resultMessage = `Sucks, you lost - computer chose ${cChoice}`;
                return game.resultMessage;
            } else {
                game.resultMessage = `You won! Your ${uChoice} smashed the computers ${cChoice}`;
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
     * in the HTML document. Changes the text to display the resultMessage,
     * and uses both choices to populate the html img and alt tag.
     */

    function showResult(uChoice, cChoice) {
        hideChoice();
        $(".game-area").toggleClass("d-none");
        $(".result").text(game.resultMessage);
        $(".user").attr("src", `assets/images/${uChoice}.png`).attr("alt", `Your choice image of ${uChoice}`);
        $(".comp").attr("src", `assets/images/${cChoice}.png`).attr("alt", `Computer choice image of ${cChoice}`);
    }


});