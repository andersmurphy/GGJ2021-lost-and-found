const doTravelToB612 = (snake) => {
    doSnakeBite(snake)
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
// birds descend from above
