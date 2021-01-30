//import { Container } from '@pixi/display';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application(
  {
    width: 1280,
    height: 720,
    antialias: true,
  })
let didMeetSnake = false

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view)

app.loader
    .add('planet', 'planet.png')
    .add('DialogBackground', 'DialogBackground.png')
    .add('ButtonNormal', 'ButtonNormal.png')
    .add('ButtonActive', 'ButtonActive.png')
    .add('ButtonSelected', 'ButtonSelected.png')
    .load((loader, resources) => {
  // Planet
  const planet = new PIXI.Sprite(resources.planet.texture)
  planet.width = 1000
  planet.height = 1000
  planet.x = app.renderer.width / 2
  planet.y = app.renderer.height + 300
  planet.anchor.x = 0.5
  planet.anchor.y = 0.5
  app.stage.addChild(planet)

  // Prince
  const prince = new PIXI.Sprite(resources.planet.texture)
  prince.width = 100
  prince.height = 100
  prince.x = app.renderer.width / 2
  prince.y = app.renderer.height - 250
  prince.anchor.x = 0.5
  prince.anchor.y = 0.5
  app.stage.addChild(prince)

  let state =
  {
    planetRotation: 0,
    princeRotation: 0
  }

  app.ticker.add(
    () => {
      planet.rotation += state.planetRotation
      prince.rotation += state.princeRotation
    })

  const upListener = event => {
    switch (event.key) {
      case "a":
        state.planetRotation = 0
        state.princeRotation = 0
        break;
      case "d":
        state.planetRotation = 0
        state.princeRotation = 0
        break;
      default:
    }
  }

  const downListener = event => {
    switch (event.key) {
      case "a":
        state.planetRotation = 0.05
        state.princeRotation = -0.05
        break;
      case "d":
        state.planetRotation = -0.05
        state.princeRotation = 0.05
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

    container.width = 584
    container.height = 348
    container.x = 8
    container.y = 8

    container.addChild(background);

    app.stage.addChild(container)
    // run ink script 
    loadStory(helloWorldStoryContent, container)

    app.ticker.add(
      () => {
        continueStory(false)
      })
  }

  const interactionListener = _ => {
    if (!didMeetSnake) { // Faking it: When the prince interacts with another character a dialog appears
      didMeetSnake = true
      showSnakeDialog()
    }
  }

  app.ticker.add(interactionListener)
})
