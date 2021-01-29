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
  planet.width = 200
  planet.height = 200

  // Setup the position of the planet
  planet.x = app.renderer.width / 2
  planet.y = app.renderer.height / 2

  // Rotate around the center
  planet.anchor.x = 0.5
  planet.anchor.y = 0.5

  // Add the planet to the scene we are building
  app.stage.addChild(planet)

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the planet around a bit
    planet.rotation += 0.01
  })
})
