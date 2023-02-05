import Cell from "./Cell.js";
import { CELL_GAP, CELL_SIZE } from "../constants.js";

export default class GameBoard {
    #isPlayer1;
    #cells;
    #GAMEBOARDELEMENT;
    #SIZE;
    #completed;

    constructor(GAMEBOARDELEMENT) {
        this.#isPlayer1 = true;
        this.#SIZE = 3;
        this.#GAMEBOARDELEMENT = GAMEBOARDELEMENT;
        
        this.#GAMEBOARDELEMENT.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
        this.#GAMEBOARDELEMENT.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
        this.#GAMEBOARDELEMENT.style.setProperty('--cell-count', `${this.#SIZE}`);

        this.#cells = this.#createCells().map((cellElement, idx) => {
            return new Cell(
                cellElement,
                idx%this.#SIZE,
                Math.floor(idx/this.#SIZE)
            )
        });     
    }

    setValueToCell(cell) {

        if (this.gameCompleted) return; 

        const value = this.#isPlayer1 ? 'X' : 'O';
        const color = this.#isPlayer1 ? '#fff' : '#f5f55f';
        cell.cellElement.style.setProperty("--color", color)
        cell.cellElement.textContent = value;
        cell.val = value;
        this.#isPlayer1 = !this.#isPlayer1;
    }

    get cells() {
        return this.#cells;
    }

    get gameCompleted() {
        return this.#completed;        
    }

    set gameCompleted(value) {
        this.#completed = value;
    }

    get states() {
        const allPossibleStates = [];

        let leftDiagonal = '';
        let rightDiagonal = '';
        // states by row, col and diag
        for(let i = 0; i < this.#SIZE; i++) {
            let rowState = '';
            let colState = '';
            for(let j = 0; j < this.#SIZE; j++) {
                rowState += this.cellsByRow[i][j].val || "-";
                colState += this.cellsByRow[j][i].val || "-";
            }
            allPossibleStates.push(rowState);
            allPossibleStates.push(colState);

            leftDiagonal += this.cellsByRow[i][i].val || "-";
            rightDiagonal += this.cellsByRow[i][this.#SIZE - i - 1].val || "-";
        }

        allPossibleStates.push(leftDiagonal);
        allPossibleStates.push(rightDiagonal);
        return allPossibleStates;
    }

    checkForWinningCondition() {
        const states = this.states;
        console.log(states);
        return states.indexOf("XXX") >= 0 ? "Player 1" : states.indexOf("OOO") >= 0 ? "Player 2" : "None"
    }

    get checkForAllFilledState() {
        return !this.#cells.some(cell => cell.val === null);
    }

    #createCells() {
        let cells = [];
        for (let i = 0; i < this.#SIZE*this.#SIZE; i++) {    
            const cell = document.createElement('div');
            cell.classList.add('cell');
            this.#GAMEBOARDELEMENT.insertAdjacentElement("beforeend", cell);
            cells.push(cell)
        }
        return cells;
    }

    get cellsByRow() {
        return this.#cells.reduce((cellGrid, currentCell) => {            
            cellGrid[currentCell.y] = cellGrid[currentCell.y]  || []
            cellGrid[currentCell.y][currentCell.x] = currentCell;
            return cellGrid
        }, [])
    }

    restart() {
        this.#cells.forEach(cell => {
            cell.cellElement.remove();
        });
        this.#cells = null;
    }
}