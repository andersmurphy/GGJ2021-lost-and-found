const doTravelToB612 = (snake, prince) => {
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

// prince falls over, 
const doPrinceCollapsing = (prince) => {
    //prince.
}
// prince is replaced with dead-prince, 
// birds descend from above, 
// ghost-prince rises from body, 
// connects to birds, flies to B612

