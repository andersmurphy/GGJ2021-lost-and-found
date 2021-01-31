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

let actorContacted = false
let disableMovement = false
const onContinueOnPlanet = () => {
    disableMovement = false
    actorContacted = false
}

var currentStoryContent = null
var currentActor = null
var doOnLeavePlanet = null
var ghost = null

const startEarthStory = (newSnake) => {
  currentStoryContent = princeSnakeStoryContent
  currentActor = newSnake
  doOnLeavePlanet = doTravelToB612
  disableMovement = false
  actorContacted = false
}

const setupControls = (resources, planetContainer, prince, actor, storyContent, onLeavePlanet) => {
  currentStoryContent = storyContent
  currentActor = actor
  doOnLeavePlanet = onLeavePlanet

  let thunk = () => {
    planetContainer.rotation = 0
    prince.textures = [resources.princeStand.texture]
    prince.scale.x = 1
  }

  const rotationTo2PI = rotation => Math.abs(rotation % (2 * Math.PI))

  app.ticker.add(
    () => {
      let r = rotationTo2PI(planetContainer.rotation)
      if (r > 2.9 && 3 > r && !actorContacted) {
        showDialog(currentStoryContent, currentActor, prince, ghost, onContinueOnPlanet, doOnLeavePlanet)
        actorContacted = true
        disableMovement = true
        actor.scale.x = prince.scale.x
      }
      if (!(r > 2.9 && 3 > r)) actorContacted = false
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
}

const setStarSpeedFunction = (speedX, speedY) => {
  starSpeedX = speedX
  starSpeedY = speedY
}

app.loader
  .add('planet', 'assets/planet.png')
  .add('princeStand', 'assets/Prince_Idle_190.png')
  .add('princeWalk1', 'assets/Prince_Walk_1.png')
  .add('princeWalk2', 'assets/Prince_Walk_2.png')
  .add('princeDead', 'assets/Prince_Dead.png')
  .add('princeFlying', 'assets/Prince_Flying.png')
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
  .add('birds_only_1', 'assets/birds_only_1.png')
  .add('birds_only_2', 'assets/birds_only_2.png')
  .add('birds_prince_1', 'assets/birds_prince_1.png')
  .add('birds_prince_2', 'assets/birds_prince_2.png')
  .add('rose_globe', 'assets/rose_globe.png')
  .add('planet_earth', 'assets/planet_earth.png')
  .add('planet_B612', 'assets/planet_B612.png')
  .load((loader, resources) => {

    startStarfield()
    app.ticker.add(starfieldTwinkles)

    // Planet Container
    const planetContainer = new PIXI.Container()

    planetContainer.position.x = app.renderer.width / 2
    planetContainer.position.y = app.renderer.height + 170
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

    // ghost
    ghost = new PIXI.Sprite(app.loader.resources.princeFlying.texture)
    ghost.width = resources.princeFlying.texture.width
    ghost.height = resources.princeFlying.texture.height
    ghost.x = app.renderer.width / 2
    ghost.y = app.renderer.height - 400
    ghost.visible = false
    app.stage.addChild(ghost)

    var actor = showB612(resources, planetContainer)

    setupControls(resources, planetContainer, prince, actor, princeRoseStoryContent, (rose, prince) => doTravelToEarth(rose, prince, planetContainer, setStarSpeedFunction))
    // var actor = showEarth(resources, planetContainer)
  })
