/**
 * @param {string} original
 */
function convert(original){
    const split = original.split("\n")
    const cells = []
    for(let y = 0; y < split.length; y++){
        const row = split[y]
        for(let x = 0; x < row.length; x++){
            const filled = row[x] == "O"
            if(filled){
                cells.push({x, y})
            }
        }
    }
    let string = ""
    for(const cell of cells){
        string += cell.x + ", " + cell.y + `
`
    }
    return string
}

export {convert}