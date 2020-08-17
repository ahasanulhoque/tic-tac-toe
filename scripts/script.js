const gameBoard = ((doc) => {
    let board = [doc.querySelector('#square-1').textContent,
    doc.querySelector('#square-2').textContent,
    doc.querySelector('#square-3').textContent,
    doc.querySelector('#square-4').textContent,
    doc.querySelector('#square-5').textContent,
    doc.querySelector('#square-6').textContent,
    doc.querySelector('#square-7').textContent,
    doc.querySelector('#square-8').textContent,
    doc.querySelector('#square-9').textContent]

    return {
        board: board
    }
})(document);

const Player = (letter) => {

}