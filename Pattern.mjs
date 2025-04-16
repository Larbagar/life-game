import V2 from "./V2.mjs"

class Pattern {
    /**
     * @param {Array<V2>} geometry
     * @param {V2} center
     */
    constructor(geometry, center = V2.zero()){
        this.geometry = geometry
        this.center = center
    }

    getPositions(pos, board, flipDiagonal = false, flipHorizontal = false, flipVertical = false){
        const translatedCells = []
        for(const cell of this.geometry){
            const translated = cell.xy
            translated.sub(this.center)
            if(flipDiagonal){
                translated.swapComponents()
            }
            if(flipHorizontal){
                translated.mult(-1, 1)
            }
            if(flipVertical){
                translated.mult(1, -1)
            }
            translated.add(pos).floor()

            translatedCells.push(translated)
        }
        return translatedCells
    }

    /**
     * @param {V2} pos
     * @param {Board} board
     * @param {boolean} flipHorizontal
     * @param {boolean} flipVertical
     * @param {boolean} flipDiagonal
     */
    spawn(pos, board, flipDiagonal = false, flipHorizontal = false, flipVertical = false){
        for(const cell of this.getPositions(pos, board, flipDiagonal, flipHorizontal, flipVertical)){
            board.change(board.hash(cell))
        }
    }
}

const glider = new Pattern(V2.multipleFromArray([
    1, 1,
    1, 0,
    1, -1,
    0, 1,
    -1, 0,
]))

const blinker = new Pattern(V2.multipleFromArray([
    0, -1,
    0, 0,
    0, 1,
]))

const rake = new Pattern(V2.multipleFromArray([
    5, 10,
    5, 2,
    4, 18,
    4, 17,
    4, 16,
    4, 11,
    4, 10,
    4, 9,
    4, 3,
    4, 2,
    4, 1,
    3, 19,
    3, 16,
    3, 12,
    3, 9,
    3, 8,
    3, 3,
    3, 1,
    3, 0,
    2, 16,
    2, 12,
    2, 8,
    2, 2,
    2, 1,
    2, 0,
    1, 16,
    1, 11,
    1, 10,
    1, 7,
    1, 2,
    1, 1,
    0, 19,
    0, 17,
    0, 8,
]), V2.new(5/2, 19/2))

const gun = new Pattern(V2.multipleFromArray([
    24, 0,
    22, 1,
    24, 1,
    12, 2,
    13, 2,
    20, 2,
    21, 2,
    34, 2,
    35, 2,
    11, 3,
    15, 3,
    20, 3,
    21, 3,
    34, 3,
    35, 3,
    0, 4,
    1, 4,
    10, 4,
    16, 4,
    20, 4,
    21, 4,
    0, 5,
    1, 5,
    10, 5,
    14, 5,
    16, 5,
    17, 5,
    22, 5,
    24, 5,
    10, 6,
    16, 6,
    24, 6,
    11, 7,
    15, 7,
    12, 8,
    13, 8,
]), V2.new(35/2, 8/2))

const bulldozer = new Pattern(V2.multipleFromArray([
    4, 0,
    11, 0,
    3, 1,
    5, 1,
    7, 1,
    8, 1,
    10, 1,
    12, 1,
    3, 2,
    4, 2,
    7, 2,
    8, 2,
    11, 2,
    12, 2,
    7, 3,
    8, 3,
    5, 5,
    6, 5,
    9, 5,
    10, 5,
    5, 6,
    6, 6,
    9, 6,
    10, 6,
    6, 7,
    7, 7,
    8, 7,
    9, 7,
    6, 8,
    9, 8,
    5, 9,
    10, 9,
    5, 10,
    10, 10,
    5, 11,
    7, 11,
    8, 11,
    10, 11,
    6, 12,
    9, 12,
    6, 13,
    9, 13,
    0, 15,
    15, 15,
    0, 16,
    1, 16,
    6, 16,
    9, 16,
    14, 16,
    15, 16,
    0, 17,
    6, 17,
    7, 17,
    8, 17,
    9, 17,
    15, 17,
    1, 18,
    2, 18,
    7, 18,
    8, 18,
    13, 18,
    14, 18,
    2, 19,
    13, 19,
    0, 20,
    2, 20,
    13, 20,
    15, 20,
    1, 21,
    2, 21,
    3, 21,
    4, 21,
    5, 21,
    10, 21,
    11, 21,
    12, 21,
    13, 21,
    14, 21,
    3, 22,
    6, 22,
    7, 22,
    8, 22,
    9, 22,
    12, 22,
    2, 23,
    7, 23,
    8, 23,
    13, 23,
    6, 24,
    9, 24,
    7, 25,
    8, 25,
    4, 26,
    5, 26,
    7, 26,
    8, 26,
    10, 26,
    11, 26,
    3, 28,
    12, 28,
    2, 29,
    3, 29,
    4, 29,
    11, 29,
    12, 29,
    13, 29,
    2, 30,
    5, 30,
    10, 30,
    13, 30,
    1, 31,
    2, 31,
    13, 31,
    14, 31,
]))

const block = new Pattern(V2.multipleFromArray([
    0, 0,
    0, 1,
    1, 0,
    1, 1,
]))

const boatstretcher = new Pattern(V2.multipleFromArray([
    7, 14,
    6, 14,
    8, 13,
    7, 13,
    6, 12,
    4, 11,
    3, 11,
    5, 10,
    6, 8,
    3, 8,
    14, 7,
    13, 7,
    7, 7,
    6, 7,
    3, 7,
    1, 7,
    15, 6,
    14, 6,
    8, 6,
    2, 6,
    0, 6,
    13, 5,
    8, 5,
    6, 5,
    1, 5,
    11, 4,
    10, 4,
    7, 4,
    11, 3,
    10, 3,
    7, 2,
    8, 1,
    6, 1,
    7, 0,
]), V2.new(15/2, 7))

// Wick stretcher with ants isn't viable without something to stabilize the wick :(

const fishhook = new Pattern(V2.multipleFromArray([
    3, 3,
    2, 3,
    3, 2,
    1, 2,
    1, 1,
    1, 0,
    0, 0,
]), V2.new(3, 3))

const pi = new Pattern(V2.multipleFromArray([
    -1, 1,
    0, 1,
    1, 1,
    -1, 0,
    -1, -1,
    0, -1,
    1, -1,
]))

const rPentomino = new Pattern(V2.multipleFromArray([
    0, 1,
    1, -1,
    -1, 0,
    0, 0,
    0, -1,
]))

const trafficLight = new Pattern(V2.multipleFromArray([
    -1, 0,
    0, -1,
    0, 0,
    0, 1,
]))

const lwss = new Pattern(V2.multipleFromArray([
    3, 3,
    0, 3,
    4, 2,
    4, 1,
    0, 1,
    4, 0,
    3, 0,
    2, 0,
    1, 0,
]), V2.new(2, 1))


export {Pattern, glider, blinker, rake, gun, bulldozer, block, boatstretcher, fishhook, pi, rPentomino, trafficLight, lwss}