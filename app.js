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

app.loader
  .add('planet', 'assets/planet.png')
  .add('princeStand', 'assets/princeStand.png')
  .add('princeWalk1', 'assets/princeWalk1.png')
  .add('princeWalk2', 'assets/princeWalk2.png')
  .add('DialogBackground', 'assets/DialogBackground.png')
  .add('ButtonNormal', 'assets/ButtonNormal.png')
  .add('ButtonActive', 'assets/ButtonActive.png')
  .add('ButtonSelected', 'assets/ButtonSelected.png')
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
    const prince = new PIXI.Sprite(resources.princeStand.texture)
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
      prince: {
        stance: "princeStand",
        direction: 1
      }
    }

    app.ticker.add(
      () => {
        planet.rotation += state.planetRotation
        prince.texture = resources[state.prince.stance].texture
        prince.scale.x = state.prince.direction
      })

    const upListener = event => {
      switch (event.key) {
        case "a":
          state.planetRotation = 0
          state.prince.stance = "princeStand"
          break;
        case "d":
          state.planetRotation = 0
          state.prince.stance = "princeStand"
          break;
        default:
      }
    }

    const downListener = event => {
      switch (event.key) {
        case "a":
          state.planetRotation = 0.05
          state.prince.stance = "princeWalk1"
          state.prince.direction = -1
          break;
        case "d":
          state.planetRotation = -0.05
          state.prince.stance = "princeWalk1"
          state.prince.direction = 1
          break;
        default:
      }
    }

    document.addEventListener("keydown", downListener, false)
    document.addEventListener("keyup", upListener, false)
    app.ticker.add(interactionListener)
  })
