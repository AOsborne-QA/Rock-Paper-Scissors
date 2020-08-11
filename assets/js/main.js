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

    /**
     * Below invokes stopTimer(), hides the choice area,
     * displays the failure message to user.
     */

    function choiceStop() {
        stopTimer();
        $(".game-choice").toggleClass("d-none");
        $(".choice-timeout").toggleClass("d-none");
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
            $(".timer").css("color", "red");
        }

        if (game.timer.time == 0) {
            choiceStop();
        }
    }

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
    })


    /**
     * Below chooses a random option for the computer based on the number
     * generated. This is then used to pick an option from the array and 
     * returned.
     */

    function computerChoice() {
        const decision = Math.floor(Math.random() * 3);
        const choices = ["rock", "paper", "scissors"]
    
        return choices[decision]
    
    }

    /**
     * The below determines the game result based on the user choice against
     * what was generated as computer choice then returns the result message.
    */

    function gameDecision(uChoice, cChoice) {
        // Draw Condition
        if (uChoice === cChoice) {
            game.resultMessage = "Dang, it's a draw"
            return game.resultMessage
    
        }
    
        if (uChoice === "rock") {
            if (cChoice === "paper") {
                game.resultMessage = `Sucks, you lost - computer chose ${cChoice}`
                return game.resultMessage
            } else {
                game.resultMessage = `You won! Your ${uChoice} smashed the computers ${cChoice}`
                return game.resultMessage
    
            }
        }
    
        if (uChoice === "paper") {
            if (cChoice === "scissors") {
                game.resultMessage = `Sucks, you lost - computer chose ${cChoice}`
                return game.resultMessage
            } else {
                game.resultMessage = `You won! Your ${uChoice} smashed the computers ${cChoice}`
                return game.resultMessage
            }
        }
    
    
        if (uChoice === "scissors") {
            if (cChoice === "rock") {
                game.resultMessage = `Sucks, you lost - computer chose ${cChoice}`
                return game.resultMessage
            } else {
                game.resultMessage = `You won! Your ${uChoice} smashed the computers ${cChoice}`
                return game.resultMessage
            }
        }
    }




})