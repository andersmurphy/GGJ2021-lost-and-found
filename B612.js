const showB612 = (resources) => {
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

    startStarfield()

    // Planet Container
    const planetContainer = new PIXI.Container()

    planetContainer.position.x = app.renderer.width / 2
    planetContainer.position.y = app.renderer.height + 300
    planetContainer.addChild(planet)
    planetContainer.addChild(snake)
    app.stage.addChild(planetContainer)

    // Prince
    const prince = new PIXI.AnimatedSprite([resources.princeStand.texture])
    prince.width = resources.princeStand.texture.width
    prince.height = resources.princeStand.texture.height
    prince.x = app.renderer.width / 2
    prince.y = app.renderer.height - 274
    prince.anchor.x = 0.5
    prince.anchor.y = 0.5
    prince.animationSpeed = 0.1
    app.stage.addChild(prince)

    let thunk = () => {
        planetContainer.rotation = 0
        prince.textures = [resources.princeStand.texture]
        prince.scale.x = 1
    }

    const rotationTo2PI = rotation => Math.abs(rotation % (2 * Math.PI))

    let snakeContacted = false
    let disableMovement = false
    const onContinueLiving = () => {
        disableMovement = false
    }

    app.ticker.add(
        () => {
        let r = rotationTo2PI(planetContainer.rotation)
        if (r > 3 && 3.4 > r && !snakeContacted) {
            showDialog(princeSnakeStoryContent, snake, prince, onContinueLiving)
            snakeContacted = true
            disableMovement = true
            snake.scale.x = prince.scale.x
        }
        thunk()
        })

    const upListener = event => {
        switch (event.key) {
        case "a":
            thunk = () => {
            if (prince.playing) {
                prince.textures = [resources.princeStand.texture]
                prince.stop()
            }
            }
            break
        case "d":
            thunk = () => {
            if (prince.playing) {
                prince.textures = [resources.princeStand.texture]
                prince.stop()
            }
            }
            break
        default:
        }
    }

    const downListener = event => {
        switch (event.key) {
        case "a":
            thunk = () => {
            if (disableMovement) return
            planetContainer.rotation += 0.05
            prince.scale.x = 1
            if (!prince.playing) {
                prince.textures =
                [resources.princeWalk1.texture,
                resources.princeWalk2.texture]
                prince.play()
            }
            }
            break
        case "d":
            thunk = () => {
            if (disableMovement) return
            planetContainer.rotation += -0.05
            prince.scale.x = -1
            if (!prince.playing) {
                prince.textures =
                [resources.princeWalk1.texture,
                resources.princeWalk2.texture]
                prince.play()
            }
            }
            break
        default:
        }
    }

    document.addEventListener("keydown", downListener, false)
    document.addEventListener("keyup", upListener, false)
    app.ticker.add(starfieldTwinkles)
}
