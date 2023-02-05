export default class Cell {
    #cellElement;
    #x;
    #y;
    #val;

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }

    get cellElement() {
        return this.#cellElement;
    }

    get val() {
        return this.#val;
    }

    set val(value) {
        if (this.val != null) return;
        this.#val = value; 
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

}