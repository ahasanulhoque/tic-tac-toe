const pageBoard = document.querySelector('#tic-tac-toe-board');

const Gameboard = (() => {
    //Initialize array with non-breaking spaces to render blank board
    let board = ["\u00A0", "\u00A0", "\u00A0",
                 "\u00A0", "\u00A0", "\u00A0",
                 "\u00A0",  "\u00A0", "\u00A0"];

    return {
        board
    }
})();

const DisplayController = (() => {
    const startButton = document.querySelector("#start-game");
    const _player1Input = document.querySelector("#player-1-input");
    const _player2Input = document.querySelector("#player-2-input");
    const _player1Name = document.querySelector("#player-1-name");
    const _player2Name = document.querySelector("#player-2-name");

    //Function to render array onto page
    const renderBoard = () => {
        for(i=0;i<9;i++){
            pageBoard.querySelector(`#square-${i}`).textContent = Gameboard.board[i];
        }
    }
    //Run renderBoard once to put initial array (non-breaking spaces) on page
    renderBoard();

    //Allow users to enter name on page for X
    _player1Input.addEventListener("keyup", (e) => {
        if(e.keyCode === 13 && _player1Input.value != ""){
            Gameplay.player1.name = _player1Input.value;
            _player1Name.textContent = "X's: " + Gameplay.player1.name;
            _player1Input.value = '';
        }
    });

    //Allow users to enter name on page for O
    _player2Input.addEventListener("keydown", (e) => {
        if(e.keyCode === 13 && _player2Input.value != ""){
            Gameplay.player2.name = _player2Input.value;
            _player2Name.textContent = "O's: " + Gameplay.player2.name;
            _player2Input.value = '';
        }
    });

    //One button will control the flow of the game
    startButton.onclick = () => {
        //The board is intially unclickable. Clicking the start button allows the
        //game to start and changes the button text to 'Start over?'
        if (startButton.textContent == 'Start game'){
            Gameplay.playGame();    
            startButton.textContent = 'Start over?' 
        } else {
            //If start button says 'Start over?' or 'Play again?' restart the game
            //The textContent line is needed in case button says 'Play again?'
            Gameplay.playAgain();
            startButton.textContent = 'Start over?'
        }
    }

    return {
        startButton,
        renderBoard
    }
})();

//Player object
const Player = (name, letter) => {
    //Function to select a square. It will use the selected square's ID
    //as the index for the board array, and change it to the player's letter
    const selectSquare = (i) => {
        Gameboard.board[i] = letter;
    }

    return {
        name,
        letter,
        selectSquare
    }
}

const Gameplay = (() => {
    //Initialize players with X and O as names in case names are not entered
    let player1 = Player('X', 'x');
    let player2 = Player('O', 'o');
    
    const _winner = document.createElement('div');
    const _buttonWrapper = document.querySelector('#button-wrapper');

    //playerTurn is used to determine whose turn it is.
    //True: player1
    //False: player2
    let _playerTurn = true;

    const playGame = () => {
        //Listen for clicks on board   
        pageBoard.onclick = function(e) {
            //Get the square number from last character of target's ID
            //Update array at square number with player's letter
            //Change the turn
            let square = e.target;
            if(_playerTurn && square.textContent == "\u00A0"){
                player1.selectSquare(square.id.charAt(square.id.length-1));
                _playerTurn = !_playerTurn;
            }
            else if(!_playerTurn && square.textContent == "\u00A0") {
                player2.selectSquare(square.id.charAt(square.id.length-1));
                _playerTurn = !_playerTurn;
            }
            //Update the board
            DisplayController.renderBoard();
            //Test if game should end
            //_testWin() looks for victory conditions. Second test checks for 
            //non-breaking spaces on board and returns true if there are none
            if(_testWin() || Gameboard.board.indexOf("\u00A0") == -1) _endGame();
        }
    }
    
    const _testWin = () => {
        //Funciton to test win conditions
        //Test for array elements to be equal to each other AND not equal to space

        //Tests invoving top left square
        if(Gameboard.board[0] != "\u00A0"){
            if((Gameboard.board[0] == Gameboard.board[1]) && 
                    (Gameboard.board[1] == Gameboard.board[2])) return true;
            else if((Gameboard.board[0] == Gameboard.board[3]) &&
                        (Gameboard.board[3] == Gameboard.board[6])) return true;
            else if((Gameboard.board[0] == Gameboard.board[4]) &&
                        (Gameboard.board[4] == Gameboard.board[8])) return true;
        } //Middle column
        if(Gameboard.board[1] != "\u00A0"){
            if((Gameboard.board[1] == Gameboard.board[4]) &&
                    (Gameboard.board[4] == Gameboard.board[7])) return true;
        } //Top right square tests
        if(Gameboard.board[2] != "\u00A0"){
            if((Gameboard.board[2] == Gameboard.board[4]) && 
                    (Gameboard.board[4] == Gameboard.board[6])) return true;
            else if((Gameboard.board[2] == Gameboard.board[5]) &&
                        (Gameboard.board[5] == Gameboard.board[8])) return true;
        } //Middle row
        if(Gameboard.board[3] != "\u00A0"){
            if((Gameboard.board[3] == Gameboard.board[4]) &&
                    (Gameboard.board[4] == Gameboard.board[5])) return true;
        } //Bottom row
        if(Gameboard.board[6] != "\u00A0"){
            if((Gameboard.board[6] == Gameboard.board[7]) &&
                    (Gameboard.board[7] == Gameboard.board[8])) return true;
        }
    }

    const _endGame = () => {
        //Stop allowing clicks on the board
        pageBoard.onclick = null;

        //Test for winner
        if(_testWin()){
            if(!_playerTurn) _winner.textContent = `${player1.name} wins!`;
            else _winner.textContent = `${player2.name} wins!`;
            
        } else _winner.textContent = 'Draw!';

        //Show winner name on page and change button text
        _buttonWrapper.appendChild(_winner);
        DisplayController.startButton.textContent = 'Play again?'
    }

    const playAgain = () => {
        //If the winner/result is on the page, remove it
        if(_buttonWrapper.contains(_winner)) _buttonWrapper.removeChild(_winner);

        //Set the tic-tac-toe board bac to non-breaking spaces, and run the 
        //playGame() function again to play again
        Gameboard.board = ["\u00A0", "\u00A0", "\u00A0",
                            "\u00A0", "\u00A0", "\u00A0",
                            "\u00A0",  "\u00A0", "\u00A0"];

        _playerTurn = true;
        playGame();
    }

    return {
        player1,
        player2,
        playGame,
        playAgain
    }
})();