import V2 from "./V2.mjs"
import {glider, gun, rake} from "./Pattern.mjs"
import {board, p0Arsenal, p1Arsenal} from "./gameState.mjs"
import {draw} from "./draw.mjs"


/**
 * @param {V2} pos
 * @returns {V2}
 */
function toBoard(pos){
    return pos
        .xy
        .sub(innerWidth / 2, innerHeight / 2)
        .div(innerWidth)
        .mult(board.width)
        .add(board.width / 2, board.height / 2)
        .floor()
}

function calculateOrientation(summonPos, referencePos){
    const diff = referencePos.xy.sub(summonPos)
    let flipVertical = false
    let flipHorizontal = false
    let flipDiagonal = false
    if(diff.y < 0){
        flipVertical = true
    }
    if(diff.x < 0){
        flipHorizontal = true
    }
    if(Math.abs(diff.y) > Math.abs(diff.x)){
        flipDiagonal = true
    }
    return {
        flipVertical,
        flipHorizontal,
        flipDiagonal,
    }
}

const startPosMap = new Map()
const currentPosMap = new Map()

const yOffset = 0

function setupListeners(){
    addEventListener("touchstart", e => {
        for(const touch of e.changedTouches){
            if(touch.clientY - innerHeight / 2 > innerWidth / 2){
                const i =
                    5 * Math.floor((touch.clientY - innerHeight / 2 - innerWidth / 2) / (innerWidth / 5)) +
                    Math.floor(touch.clientX / (innerWidth / 5))
                if(i < p0Arsenal.patterns.length){
                    navigator.vibrate(1)
                    p0Arsenal.activePattern = i
                }
            }else if(touch.clientY - innerHeight / 2 < -innerWidth / 2) {
                const i =
                    5 * Math.floor((-touch.clientY + innerHeight / 2 - innerWidth / 2) / (innerWidth / 5)) +
                    Math.floor((innerWidth - touch.clientX) / (innerWidth / 5))
                if(i < p1Arsenal.patterns.length){
                    navigator.vibrate(1)
                    p1Arsenal.activePattern = i
                }
            }else{
                const pos = toBoard(V2.new(touch.clientX, touch.clientY + yOffset))
                startPosMap.set(touch.identifier, pos.xy)
                currentPosMap.set(touch.identifier, pos.xy)
                navigator.vibrate(1)
            }
        }
    })

    addEventListener("touchmove", e => {
        for(const touch of e.changedTouches){
            const pos = currentPosMap.get(touch.identifier)
            if(pos) {
                pos.xy = toBoard(V2.new(touch.clientX, touch.clientY + yOffset))
            }
        }
    })

    addEventListener("touchend", e => {
        for(const touch of e.changedTouches){
            if(startPosMap.get(touch.identifier)) {
                navigator.vibrate(1)
                const pos = toBoard(V2.new(touch.clientX, touch.clientY + yOffset))
                const startPos = startPosMap.get(touch.identifier)
                const orientation = calculateOrientation(startPos, pos)
                let arsenal
                if(startPos.y > board.width / 2) {
                    arsenal = p0Arsenal
                }else{
                    arsenal = p1Arsenal
                }
                arsenal.patterns[arsenal.activePattern].spawn(startPos, board, orientation.flipDiagonal, orientation.flipHorizontal, orientation.flipVertical)
                startPosMap.delete(touch.identifier)
                currentPosMap.delete(touch.identifier)
            }
        }

        // const cell = pos.xy.floor()
        // if(e.button == 0) {
        //     glider.spawn(cell, board, flipDiagonal, flipHorizontal, flipVertical)
        //     // bulldozer.spawn(center, board)
        //     // boatstretcher.spawn(center, board, false, false, false)
        //     // gun.spawn(center, board)
        //     // pi.spawn(center, board)
        //     // blinker.spawn(center, board)
        //     // rPentomino.spawn(center, board)
        // }else if(e.button == 2){
        //     pi.spawn(cell, board, flipDiagonal, flipHorizontal, flipVertical)
        //     // block.spawn(center, board)
        //     // rake.spawn(center, board, true)
        //     // fishhook.spawn(center, board)
        // }
        draw()
    })

    addEventListener("keydown", e => {
        const amt = Number.parseFloat(e.key, 10)
        if(!isNaN(amt)) {
            for (let i = 0; i < board.data.length; i++) {
                board.data[i] = 1*(Math.random() < amt / 10)
                board.activeCells.add(i)
            }
        }
    })
}

export {startPosMap, currentPosMap, setupListeners, calculateOrientation}