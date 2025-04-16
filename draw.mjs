import {canvas, ctx} from "./canvas.mjs"
import {board, p0Arsenal, p1Arsenal} from "./gameState.mjs"
import Meth from "./Meth.mjs"
import {calculateOrientation, currentPosMap, startPosMap} from "./listeners.mjs"
import {glider, gun} from "./Pattern.mjs"

function drawBoard(){
    // ctx.strokeStyle = "gray"
    // ctx.lineWidth = 0.1
    // ctx.beginPath()
    // for (let x = 0; x <= board.width; x++) {
    //     ctx.moveTo(x, 0)
    //     ctx.lineTo(x, board.height)
    // }
    // for (let y = 0; y <= board.height; y++) {
    //     ctx.moveTo(0, y)
    //     ctx.lineTo(board.width, y)
    // }
    // ctx.stroke()

    ctx.fillStyle = "black"
    ctx.globalAlpha = 1
    ctx.beginPath()
    for (let i = 0; i < board.data.length; i++) {
        if (board.data[i]) {
            const pos = board.unhash(i)
            ctx.moveTo(pos.x + 1 / 2 + 1 / 2, pos.y + 1 / 2)
            ctx.arc(pos.x + 1 / 2, pos.y + 1 / 2, 1 / 2, 0, Meth.TAU)
        }
    }
    ctx.fill()

    ctx.fillStyle = "gray"
    ctx.globalAlpha = 0.5
    ctx.beginPath()
    for(const [id, startPos] of startPosMap){
        const currentPos = currentPosMap.get(id)
        const orientation = calculateOrientation(currentPos, startPos)
        let arsenal
        if(currentPos.y > board.height / 2){
            arsenal = p0Arsenal
        }else{
            arsenal = p1Arsenal
        }
        const cells = arsenal.patterns[arsenal.activePattern].getPositions(currentPos, board, orientation.flipDiagonal, orientation.flipHorizontal, orientation.flipVertical)
        for(const cell of cells){
            ctx.moveTo(cell.x + 1 / 2 + 1 / 4, cell.y + 1 / 2)
            ctx.arc(cell.x + 1 / 2, cell.y + 1 / 2, 1 / 2, 0, Meth.TAU)
        }
    }
    ctx.fill()

    // ctx.fillStyle = "gray"
    // ctx.beginPath()
    // for(const potentialChange of board.potentialChanges){
    //     const pos = board.unhash(potentialChange)
    //     ctx.moveTo(pos.x * cellSize + cellSize / 2 + cellSize / 4, pos.y * cellSize + cellSize / 2)
    //     ctx.arc(pos.x * cellSize + cellSize / 2, pos.y * cellSize + cellSize / 2, cellSize / 4, 0, Meth.TAU)
    // }
    // ctx.fill()
}

function drawArsenal(arsenal){
    ctx.globalAlpha = 1
    ctx.fillStyle = "black"
    for(let i = 0; i < arsenal.patterns.length; i++){
        ctx.save()
        ctx.translate(0.1 + 0.2 * Meth.mod(i, 5), 0.1 + 0.2 * Math.floor(i / 5))
        ctx.lineWidth = 0.002
        ctx.beginPath()
        ctx.rect(-0.09, -0.09, 0.18, 0.18)
        ctx.stroke()
        ctx.clip()

        ctx.beginPath()
        ctx.scale(0.008, 0.008)
        const pattern = arsenal.patterns[i]
        for(const cell of pattern.geometry){
            const translatedCell = cell.xy.sub(pattern.center).mult(1, -1)
            ctx.moveTo(translatedCell.x + 1/2, translatedCell.y)
            ctx.arc(translatedCell.x, translatedCell.y, 1/2, 0, Meth.TAU)
        }
        ctx.fill()

        ctx.restore()
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const cellSize = (canvas.width) / board.width

    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.scale(canvas.width, canvas.width)

    ctx.lineWidth = 0.002
    ctx.globalAlpha = 0.5
    ctx.strokeStyle = "gray"
    ctx.beginPath()
    ctx.moveTo(-1/2, 0)
    ctx.lineTo(1/2, 0)
    ctx.stroke()

    ctx.globalAlpha = 1
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.moveTo(-1/2, -1/2)
    ctx.lineTo(1/2, -1/2)
    ctx.moveTo(-1/2, 1/2)
    ctx.lineTo(1/2, 1/2)
    ctx.stroke()

    ctx.save()
    ctx.scale(1/board.width, 1/board.width)
    ctx.translate(-board.width / 2, -board.height / 2)
    drawBoard()
    ctx.restore()

    ctx.save()
    ctx.translate(-0.5, 0.5)
    drawArsenal(p0Arsenal)
    ctx.restore()

    ctx.save()
    ctx.rotate(Meth.TAU / 2)
    ctx.translate(-0.5, 0.5)
    drawArsenal(p1Arsenal)
    ctx.restore()


    // for(let i = 0; i < 2; i++) {
    //     ctx.save()
    //     for (let i = 0; i < 5; i++) {
    //         ctx.fillRect(0.01, 0.01, 0.18, 0.18)
    //         ctx.translate(0.2, 0)
    //     }
    //     ctx.restore()
    //     ctx.translate(0, 0.2)
    // }

    ctx.restore()
}

export {draw}