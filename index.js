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

    document.querySelector("[data-new-game]").addEventListener("click", newGame);
}

function newGame() {
    document.querySelector("[data-new-game]").style.display = "none";
    game.restart();
    init();
}

function cellEventListener(game, cell) {    
    game.setValueToCell(cell);
    if (game.checkForAllFilledState) {
        console.log("Still empty");
    }
    const gameConditon = game.checkForWinningCondition();    
    if (gameConditon !== "None" ) {        
        game.gameCompleted = true;

        document.querySelector("[data-new-game]").style.display = "flex";
        document.querySelector("[data-win-info]").textContent = `${gameConditon} won the game!`;
    }
}

init();