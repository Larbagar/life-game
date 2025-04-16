import {draw} from "./draw.mjs"
import {board} from "./gameState.mjs"
import V2 from "./V2.mjs"
import {
    blinker,
    block,
    bulldozer,
    glider,
    gun,
    rake,
    boatstretcher,
    fishhook,
    pi,
    rPentomino,
    lwss,
} from "./Pattern.mjs"
import {setupListeners} from "./listeners.mjs"

// board.change(board.hash(V2.new(1, 3)))
// board.change(board.hash(V2.new(2, 3)))
// board.change(board.hash(V2.new(3, 3)))
// board.change(board.hash(V2.new(3, 2)))
// board.change(board.hash(V2.new(2, 1)))
//
// board.change(board.hash(V2.new(24, 25)))
// board.change(board.hash(V2.new(25, 25)))
// board.change(board.hash(V2.new(26, 25)))
// board.change(board.hash(V2.new(25, 26)))
// board.change(board.hash(V2.new(24, 24)))


draw()
setInterval(() => {
    board.step()
    draw()
}, 100)

addEventListener("contextmenu", e => {
    e.preventDefault()
})

setupListeners()

// const shape = lwss
// let dat = ""
// let maxX = 0
// let maxY = 0
// for(const point of shape.geometry){
//     if(point.x > maxX){
//         maxX = point.x
//     }
//     if(point.y > maxY){
//         maxY = point.y
//     }
// }
// for(const point of shape.geometry){
//     dat += `${maxX-point.x}, ${maxY - point.y},
// `
// }
// console.log(dat)
// console.log(maxX, maxY)