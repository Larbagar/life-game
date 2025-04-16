/** @typedef {"wrap" | "stop" | "invert"} WrapBehavior */
import Meth from "./Meth.mjs"
import V2 from "./V2.mjs"

class Board {
    /**
     * @param {number} width
     * @param {number} height
     * @param {Uint8Array} data
     * @param {Set<number>} activeCells
     * @param {WrapBehavior} horizontalWrap
     * @param {WrapBehavior} verticalWrap
     */
    constructor(width, height, {
        data = new Uint8Array(width * height).fill(0),
        activeCells = new Set(),
        horizontalWrap = "wrap",
        verticalWrap = "wrap",
    } = {}){
        this.width = width
        this.height = height
        this.data = data
        this.activeCells = activeCells
        this.horizontalWrap = horizontalWrap
        this.verticalWrap = verticalWrap
    }

    /**
     * @param {V2} pos
     */
    hash(pos){
        return Meth.mod(pos.x, this.width) + Meth.mod(pos.y, this.height) * this.width
    }

    /**
     * @param {number} cell
     * @returns {V2}
     */
    unhash(cell){
        const y = Meth.floor(cell / this.width)
        const x = cell - y * this.width
        return V2.new(x, y)
    }

    /**
     * @param {number} cell
     */
    neighbors(cell){
        const position = this.unhash(cell)
        /** @type {Array<number>} */
        let neighbors = []
        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++) {
                if(!(x == 0 && y == 0)){
                    neighbors.push(this.hash(V2.new(position.x + x, position.y + y)))
                }
            }
        }
        return neighbors
    }

    /**
     * @param {number} cell
     */
    activateNeighbors(cell){
        for(const neighbor of this.neighbors(cell)){
            this.activeCells.add(neighbor)
        }
    }
    /**
     * @param {number} cell
     */
    activateArea(cell){
        this.activateNeighbors(cell)
        this.activeCells.add(cell)
    }

    /**
     * @param {number} cell
     */
    change(cell){
        this.data[cell] = 1 - this.data[cell]
        this.activateArea(cell)
    }

    /**
     * @param {number} cell
     */
    clear(cell){
        this.data[cell] = 0
        this.activateArea(cell)
    }

    /**
     * @param {number} cell
     */
    fill(cell){
        this.data[cell] = 1
        this.activateArea(cell)
    }

    /**
     */
    step(){
        const changes = []
        for(const cell of this.activeCells){
            const neighbors = this.neighbors(cell).reduce((acc, neighbor) => acc + this.data[neighbor], 0)
            if(this.data[cell]){
                // Cell is alive
                if(!(neighbors == 2 || neighbors == 3)){
                    changes.push(cell)
                }
            }else{
                // Cell is dead
                if(neighbors == 3){
                    changes.push(cell)
                }
            }
        }
        this.activeCells.clear()

        for(const change of changes){
            this.data[change] = 1 - this.data[change]
            this.activateNeighbors(change)
        }
    }
}

export {Board}