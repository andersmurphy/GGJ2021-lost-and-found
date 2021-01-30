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
  .add('tree', 'assets/tree.png')
  .add('DialogBackground', 'assets/DialogBackground.png')
  .add('ButtonNormal', 'assets/ButtonNormal.png')
  .add('ButtonActive', 'assets/ButtonActive.png')
  .add('ButtonSelected', 'assets/ButtonSelected.png')
  .load((loader, resources) => {

    // Planet
    const planet = new PIXI.Sprite(resources.planet.texture)
    planet.width = 1000
    planet.height = 1000
    planet.anchor.set(0.5)

    // Tree
    const tree = new PIXI.Sprite(resources.tree.texture)
    tree.width = 200
    tree.height = 300
    tree.anchor.set(0.5)
    tree.rotation = Math.PI
    tree.x = 0
    tree.y = 600

    const tree2 = new PIXI.Sprite(resources.tree.texture)
    tree2.width = 200
    tree2.height = 300
    tree2.anchor.set(0.5)
    tree2.x = 600
    tree2.y = 0
    tree2.rotation = Math.PI / 2

    // Planet Container
    const planetContainer = new PIXI.Container()

    planetContainer.position.x = app.renderer.width / 2
    planetContainer.position.y = app.renderer.height + 300
    planetContainer.addChild(planet)
    planetContainer.addChild(tree)
    planetContainer.addChild(tree2)
    app.stage.addChild(planetContainer)

    // Prince
    const prince = new PIXI.AnimatedSprite([resources.princeStand.texture])
    prince.width = 100
    prince.height = 100
    prince.x = app.renderer.width / 2
    prince.y = app.renderer.height - 230
    prince.anchor.x = 0.5
    prince.anchor.y = 0.5
    prince.animationSpeed = 0.1
    app.stage.addChild(prince)

    let thunk = () => {
      planetContainer.rotation = 0
      prince.textures = [resources.princeStand.texture]
      prince.scale.x = 1
    }

    app.ticker.add(() => thunk())

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
            planetContainer.rotation += 0.05
            prince.scale.x = -1
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
            planetContainer.rotation += -0.05
            prince.scale.x = 1
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
    app.ticker.add(interactionListener)
  })
