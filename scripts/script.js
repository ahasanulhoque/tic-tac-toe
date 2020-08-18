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
    let player1 = Player('Bob', 'x');
    let player2 = Player('Chris', 'o');

    //let winCon1 = (Gameboard.board[0] == Gameboard.board[1]) && (Gameboard.board[1] = Gameboard.board[2]);

    let i=0;
    function playGame() {
        //playerTurn is used to determine whose turn it is.
        //True: player1
        //False: player2
        let playerTurn = true;


        //Listen for clicks on board
        do{
            board.onclick = function(e) {
                //Get the square number from last character of target's ID
                //Update array at square number with player's letter
                //Update the board
                //Change the turn
                let square = e.target;
                if(playerTurn && square.textContent == "\u00A0"){
                    player1.selectSquare(square.id.charAt(square.id.length-1));
                    playerTurn = !playerTurn;
                }
                else if(!playerTurn && square.textContent == "\u00A0") {
                    player2.selectSquare(square.id.charAt(square.id.length-1));
                    playerTurn = !playerTurn;
                }
                DisplayController.renderBoard();   
            }
            i++;
        }while(i<9) //Placeholder condition for while loop, will need to
                    //change it to game's victory conditions
    }
    
    playGame();

    return {
        playerTurn
    }
})();