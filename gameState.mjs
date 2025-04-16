import {Board} from "./Board.mjs"
import {blinker, boatstretcher, fishhook, glider, gun, lwss, pi, rake, rPentomino, trafficLight} from "./Pattern.mjs"

const board = new Board(200, 200)
window["board" + ""] = board

class Arsenal {
    constructor(patterns) {
        this.patterns = patterns
        this.activePattern = 0
    }
}

const p0Arsenal = new Arsenal([blinker, fishhook, trafficLight, pi, rPentomino, glider, lwss, gun, rake, boatstretcher])
const p1Arsenal = new Arsenal([blinker, fishhook, trafficLight, pi, rPentomino, glider, lwss, gun, rake, boatstretcher])

export {board, p0Arsenal, p1Arsenal}