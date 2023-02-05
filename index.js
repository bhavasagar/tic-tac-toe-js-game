import GameBoard from "./Components/GameBoard.js";

console.log("FROM INDEX");


var game;

function init() {
    game = new GameBoard(document.querySelector(`[data-game-board]`));

    setUpEventListeners(game);
}

function setUpEventListeners(game) {
    const cells = game.cells;
    cells.forEach(cell => {
        cell.cellElement.addEventListener("click", () => cellEventListener(game, cell), {once: true});
    });
}

function cellEventListener(game, cell) {    
    game.setValueToCell(cell);
    if (game.checkForAllFilledState) {
        console.log("Still empty");
    }
    const gameConditon = game.checkForWinningCondition();
    console.log(gameConditon);
    if (gameConditon !== "None" ) {
        console.log(gameConditon);
        game.gameCompleted = true;
    }
}

init();