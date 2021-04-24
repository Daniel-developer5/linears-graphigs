const form = document.querySelector('form')
const input = document.querySelector('form input')
const canvas = document.querySelector('canvas')

const parser = new exprEval.Parser()

const $ = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight - form.offsetHeight
const { width: w, height: h } = canvas
const ox = w / 2
const oy = h / 2

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()

    createPoints(input.value)
})

const pointsAmmount = 5

const getPoints = point => Array(pointsAmmount).fill(0).map((_, index) => point || index)

const createPoints = value => {
    drawGrafic({
        x: getPoints(),
        y: Array(pointsAmmount).fill(0).map((_, index) => parser.parse(value).evaluate({ x: index, })),
    })
}

const singleSegment = 20

const drawGrafic = points => {
    $.beginPath()
    
    const { x, y, } = points

    x.forEach((coord, index) => {
        $.arc(ox + coord * singleSegment, oy - y[index] * singleSegment, 2, 0, 2 * Math.PI)
        $.stroke()
        $.fill()
        $.closePath()
        
        if (x[index + 1]) {
            $.moveTo(ox + coord * singleSegment, oy - y[index] * singleSegment)
            $.lineTo(ox + x[index + 1] * singleSegment, oy - y[index + 1] * singleSegment)
            $.stroke()
            $.closePath()
        }
    })
}

const axisWidth = 500
const X = 'X'
const Y = 'Y'

const drawAxis = axis => {
    $.beginPath()

    if (axis === X) {
        $.moveTo(ox - axisWidth / 2, oy)
        $.lineTo(ox - axisWidth / 2 + axisWidth, oy)
    } else {
        $.moveTo(ox, h / 2 - axisWidth / 2)
        $.lineTo(ox, oy - axisWidth / 2 + axisWidth)
    }

    $.stroke()
    $.closePath()
}

const drawPerpendicular = () => {
    $.beginPath()
    $.moveTo(ox, oy - 20)
    $.lineTo(ox + 20, oy - 20)
    $.stroke()
    $.moveTo(ox + 20, oy - 20)
    $.lineTo(ox + 20, oy)
    $.stroke()
    $.closePath()
}

const drawCoordsStart = () => {
    $.beginPath()
    $.arc(ox, oy, 3, 0, 2 * Math.PI)
    $.stroke()
    $.fill()
    $.closePath()
}

drawAxis(X)
drawAxis(Y)
drawPerpendicular()
drawCoordsStart()