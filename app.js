//import { Container } from '@pixi/display';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application(
  { width: 1280,
    height: 720,
    antialias: true,
  })
var didMeetSnake = true
  
// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view)

// load the texture we need
app.loader
    .add('planet', 'planet.png')
    .add('DialogBackground', 'DialogBackground.png')
    .load((loader, resources) => {
  // This creates a texture from a 'planet.png' image
  //dialogBackground = new PIXI.Sprite(resources.DialogBackground.texture)
  const planet = new PIXI.Sprite(resources.planet.texture)
  planet.width = 1000
  planet.height = 1000

  // Setup the position of the planet
  planet.x = app.renderer.width / 2
  planet.y = app.renderer.height + app.renderer.height / 3

  // Rotate around the center
  planet.anchor.x = 0.5
  planet.anchor.y = 0.5

  // Add the planet to the scene we are building
  app.stage.addChild(planet)

  let state = { planetRotation: 0 }

  app.ticker.add(
    () => {
      planet.rotation += state.planetRotation
    })

  const upListener = event => {
    switch (event.key) {
      case "a":
        state.planetRotation = 0
        break;
      case "d":
        state.planetRotation = 0
        break;
      default:
    }
  }

  const downListener = event => {
    switch (event.key) {
      case "a":
        state.planetRotation = 0.05
        break;
      case "d":
        state.planetRotation = -0.05
        break;
      default:
    }
  }

  document.addEventListener("keydown", downListener, false)
  document.addEventListener("keyup", upListener, false)

  const showSnakeDialog = () => {
    // add dialog box beside prince
    let container = new PIXI.Container();
    let background = new PIXI.Sprite(app.loader.resources.DialogBackground.texture)

    container.width = 600
    container.height = 300
    container.x = 8
    container.y = 8

    container.addChild(background);

    app.stage.addChild(container)
    // run ink script 
    loadStory(helloWorldStoryContent, container)
  }

  const interactionListener = _ => {
    if (!didMeetSnake) { // Faking it: When the prince interacts with another character a dialog appears
        didMeetSnake = true
        showSnakeDialog()
    }
  }

  app.ticker.add(interactionListener)
})
