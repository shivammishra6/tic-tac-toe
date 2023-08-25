const click = new Audio('music/click.wav')
const gameover = new Audio('music/gameover.wav')
const win=new Audio("music/winning.wav")
let turn = "X"
let game = false

const change = () => {
    return turn === "X" ? "0" : "X"
}

const checkWin = () => {
    const boxText = document.querySelectorAll('.boxText')
    const wins = [
        [0, 1, 2,0,-95,0],
        [3, 4, 5,0,0,0],
        [6, 7, 8,0,95,0],
        [0, 3, 6,-100,0,90],
        [1, 4, 7,0,0,90],
        [2, 5, 8,100,0,90],
        [0, 4, 8,0,0,45],
        [2, 4, 6,0,0,135],
    ]
    wins.forEach((e) => {
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) && (boxText[e[0]].innerText !== '')) {
            document.querySelector('h2').innerText = boxText[e[0]].innerText + " Won"
            game = true
            win.play()
            document.querySelector('.line').style.width = "350px"
            document.querySelector('#left').style.width = "20%"
            document.querySelector('#right').style.width ="20%"
            document.querySelector('.line').style.transform=`translate(${e[3]}px,${e[4]}px) rotate(${e[5]}deg)`
        }
    })
}
let count = 0
let boxes = document.getElementsByClassName('box')
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxText')
    element.addEventListener('click', () => {
        if (boxText.innerText === '') {
            count++
            boxText.innerText = turn
            turn = change()
            click.play()
            if (!game)
            checkWin()
            if (!game)
            checkOver()
            if (!game)
            document.querySelector('h2').innerText = "Turn for " + turn
        }
    })
})

const checkOver = () => {
    if (count === 9) {
        gameover.play()
        document.querySelector('h2').innerText = "Game Over"
        game = true
    }
}

const button = document.querySelector('button')
button.addEventListener('click', () => {
    Array.from(boxes).forEach((e) => {
        let boxText = e.querySelector('.boxText')
        boxText.innerText = ""
    })
    document.querySelector('.line').style.width = "0px"
    document.querySelector('h2').innerText = "Turn for " + turn
    document.querySelector('#left').style.width = "0" 
    document.querySelector('#right').style.width = "0" 
    count = 0
    game = false
})