/*-------------------------------- Constants --------------------------------*/ 
const winningCombos = [[0,1,2], [0,3,6], [2,5,8],[6,7,8],[0,4,8],[2,4,6],[3,4,5],[1,4,7] ]
/*---------------------------- Variables (state) ----------------------------*/
let winner, turn, board

/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector("#message")
const squareEls = document.querySelectorAll(".square")
const resetBtnEl = document.querySelector('button')
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => square.addEventListener('click', handleClick))
resetBtnEl.addEventListener('click', reset)
/*-------------------------------- Functions --------------------------------*/
init()

function init() {
board = [null,null,null,null,null,null,null,null,null],
turn = 1,
winner = null 
render()
}

function render() {

board.forEach((square, index) => {
    if (square === -1) {
        squareEls[index].textContent = '\u2764'
        squareEls[index].className = 'o-user'
    } else if (square === 1) {
        squareEls[index].textContent = '\u2716'
        squareEls[index].className = 'x-user'
    } else {
        squareEls[index].textContent = null
    }
    });

if (board.includes(1)) {
    resetBtnEl.removeAttribute('hidden')
    }
    
if (winner === null) {
    return (turn === 1 ? messageEl.textContent = "\u2716's turn!" : messageEl.textContent = "\u2764's turn!")
  } else if (winner === 'T') {
    return messageEl.textContent = 'TIE!'
  } else {
    confetti.start(2000)
    return (winner === 1 ? messageEl.textContent = "\u2716 wins!" : messageEl.textContent = "\u2764 wins!") 
  }
}

function handleClick(evt) {
    const sqIdx = parseInt(evt.target.id.replace('sq', ''))
    if (board[sqIdx] !== null || winner !== null) {
      return
    } else {
      board[sqIdx] = turn
      turn *= -1
    }
    winner = getWinner()
    render()
  }

function getWinner() {
let foundWinner = null

winningCombos.forEach(combo => {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
    foundWinner = board[combo[0]]
    }
})
console.log(foundWinner)
if (foundWinner) return foundWinner
if (!board.includes(null)){
    return 'T'
} else {
    return null
}
}
function reset() {
init()
resetBtnEl.setAttribute('hidden', true)
}
