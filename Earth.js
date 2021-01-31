const showEarth = (resources, planetContainer) => {
    // Planet
    const planet = new PIXI.Sprite(resources.planet.texture)
    planet.width = 1000
    planet.height = 1000
    planet.anchor.set(0.5)

    // Snake
    const snake = new PIXI.AnimatedSprite([resources.snake.texture])
    snake.width = resources.snake.texture.width
    snake.height = resources.snake.texture.height
    snake.anchor.set(0.5)
    snake.rotation = Math.PI
    snake.x = 0
    snake.y = 542
    snake.animationSpeed = 0.1

    planetContainer.addChild(planet)
    planetContainer.addChild(snake)

    return snake
}
