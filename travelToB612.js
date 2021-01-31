var travellingPrince = null

const doTravelToB612 = (snake, prince) => {
    travellingPrince = prince
    doSnakeBite(snake)
    snake.onComplete = function () {
        doPrinceCollapsing(prince)
    }
}

// snake does bite animation
const doSnakeBite = (snake) => {
    snake.textures = [
        app.loader.resources.snake.texture,
        app.loader.resources.snakeBite.texture,
        app.loader.resources.snakeBite.texture,
        app.loader.resources.snakeBite.texture,
        app.loader.resources.snake.texture
    ]
    snake.loop = false
    snake.play()
}

const rotatePrinceToHorizontal = (delta) => {
    travellingPrince.rotation += 0.05
    if (travellingPrince.rotation >= 1.6) {
        app.ticker.remove(rotatePrinceToHorizontal)
    }
}

// prince falls over, 
const doPrinceCollapsing = (prince) => {
    //prince.
    app.ticker.add(rotatePrinceToHorizontal)
}

// prince is replaced with dead-prince, 
// birds descend from above, 
// ghost-prince rises from body, 
// connects to birds, flies to B612

