const board = document.querySelector('#tic-tac-toe-board');

const Gameboard = (() => {
    let board = ["\u00A0", "\u00A0", "\u00A0",
                 "\u00A0", "\u00A0", "\u00A0",
                 "\u00A0",  "\u00A0", "\u00A0"];

    return {
        board
    }
})();

const DisplayController = (() => {
    //Function to render array onto page
    function renderBoard() {
        for(i=0;i<9;i++){
            board.querySelector(`#square-${i}`).textContent = Gameboard.board[i];
        }
    }
    renderBoard();

    return {
        renderBoard
    }
})();

//Player object
const Player = (name, letter) => {
    //Function to select a square. It will use the selected square's ID
    //as the index for the board array, and change it to the player's letter
    function selectSquare(i){
        Gameboard.board[i] = letter;
    }

    return {
        name,
        letter,
        selectSquare
    }
}

const Gameplay = (() => {
    let player1 = Player('X', 'x');
    let player2 = Player('O', 'o');
    
    const winner = document.createElement('div');
    const replay = document.createElement('button');
    replay.textContent = 'Play again?';

    //playerTurn is used to determine whose turn it is.
    //True: player1
    //False: player2
    let playerTurn = true;

    const _playGame = () => {
        //Listen for clicks on board   
        board.onclick = function(e) {
            //Get the square number from last character of target's ID
            //Update array at square number with player's letter
            //Update the board
            //Change the turn
            let square = e.target;
            if(playerTurn && square.textContent == "\u00A0"){
                player1.selectSquare(square.id.charAt(square.id.length-1));
            }
            else if(!playerTurn && square.textContent == "\u00A0") {
                player2.selectSquare(square.id.charAt(square.id.length-1));
            }
            //Update the board
            DisplayController.renderBoard();
            //Test if game should end, otherwise continue
            if(_testWin() || Gameboard.board.indexOf("\u00A0") == -1) _endGame(); //Placeholder for ending game
            else playerTurn = !playerTurn;
        }
    }
    
    const _testWin = () => {
        //Funciton to test win conditions
        //Test for array elements to be equal to each other AND not equal to space
        //Return letter name to determine winner in playGame() function

        //Tests invoving top left square
        if(Gameboard.board[0] != "\u00A0"){
            if((Gameboard.board[0] == Gameboard.board[1]) && 
                (Gameboard.board[1] == Gameboard.board[2])) return true;
            else if((Gameboard.board[0] == Gameboard.board[3]) &&
                    (Gameboard.board[3] == Gameboard.board[6])) return true;
            else if((Gameboard.board[0] == Gameboard.board[4]) &&
                    (Gameboard.board[4] == Gameboard.board[8])) return true;
        }
    }

    const _endGame = () => {
        //Stop allowing clicks on the board
        board.onclick = null;

        //Test for winner and show winner name on page
        if(playerTurn) winner.textContent = `${player1.name} wins!`;
        else winner.textContent = `${player2.name} wins!`;
        board.appendChild(winner);

        //Place the replay button on the page, run _playAgain() if it is clicked
        board.appendChild(replay);
        replay.onclick = () => {
            _playAgain();
        }
    }

    const _playAgain = () => {
        //Remove the play again button, set the tic-tac-toe board bac to
        //non-breaking spaces, and run the _playGame() function again to
        //play again
        board.removeChild(winner);
        board.removeChild(replay);
        Gameboard.board = ["\u00A0", "\u00A0", "\u00A0",
                            "\u00A0", "\u00A0", "\u00A0",
                            "\u00A0",  "\u00A0", "\u00A0"];
        playerTurn = false;
        _playGame();
    }

    //Run playGame() on page load
    _playGame();
})();