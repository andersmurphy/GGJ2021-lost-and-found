// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application(
  {
    width: 1280,
    height: 720,
    antialias: true,
  })

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view)

const onContinueLiving = () => {
  disableMovement = false
}

app.loader
  .add('planet', 'assets/planet.png')
  .add('princeStand', 'assets/Prince_Idle_190.png')
  .add('princeWalk1', 'assets/Prince_Walk_1.png')
  .add('princeWalk2', 'assets/Prince_Walk_2.png')
  .add('tree', 'assets/tree.png')
  .add('snake', 'assets/snek_idle.png')
  .add('snakeBite', 'assets/snek_bite.png')
  .add('DialogBackground', 'assets/DialogBackground.png')
  .add('ButtonNormal', 'assets/ButtonNormal.png')
  .add('ButtonActive', 'assets/ButtonActive.png')
  .add('ButtonSelected', 'assets/ButtonSelected.png')
  .add('star1', 'assets/star1.png')
  .add('star2', 'assets/star2.png')
  .add('star3', 'assets/star3.png')
  .add('star4', 'assets/star4.png')
  .load((loader, resources) => {

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

    const rotationTo2PI = rotation => rotation % (2 * Math.PI) * -1

    let snakeContacted = false
    let disableMovement = false

    app.ticker.add(
      () => {
        let r = rotationTo2PI(planetContainer.rotation)
        if (r > 3 && 3.4 > r && !snakeContacted) {
          showDialog(princeSnakeStoryContent)
          snakeContacted = true
          disableMovement = true
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

    // starSpeedX = 0.5
    // starSpeedY = 0.5

  })
