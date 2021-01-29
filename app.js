// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application()

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view)

// load the texture we need
app.loader.add('planet', 'planet.png').load((loader, resources) => {
  // This creates a texture from a 'planet.png' image
  const planet = new PIXI.Sprite(resources.planet.texture)
  planet.width = 300
  planet.height = 300

  // Setup the position of the planet
  planet.x = app.renderer.width / 2
  planet.y = app.renderer.height / 2

  // Rotate around the center
  planet.anchor.x = 0.5
  planet.anchor.y = 0.5

  // Add the planet to the scene we are building
  app.stage.addChild(planet)

  let state = { planetRotation: 0.00 }

  const gameLoop = _ => {
    planet.rotation += state.planetRotation
  }

  app.ticker.add(delta => gameLoop(delta))

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


})
