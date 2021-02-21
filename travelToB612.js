let travellingPrince = null
let travellingGhost  = null
let fin = null
let finPlanetContainer = null
let startingPlanetaryRotation = 0
let relativePlanetaryRotation = 0
let earthSnake = null

const doTravelToB612 = (snake, prince, ghost, planetContainer) => {
  travellingPrince = prince
  travellingGhost = ghost
  finPlanetContainer = planetContainer
  earthSnake = snake
  doSnakeBite(snake)
  snake.onComplete = function() {
    doPrinceCollapsing()
  }
}

// snake does bite animation
const doSnakeBite = (snake) => {
  snake.textures = [
    app.loader.resources.snake.texture,
    app.loader.resources.snakeBite.texture,
    app.loader.resources.snakeBite.texture,
    app.loader.resources.snakeBite.texture,
    app.loader.resources.snake.texture
  ]
  snake.loop = false
  snake.play()
}

let rotationSpeed = 0.01
const rotatePrinceToHorizontal = (delta) => {
  travellingPrince.scale.x = -theSnake.scale.x
  travellingPrince.anchor.set(1, 1)
  travellingPrince.y += 5
  rotationSpeed = rotationSpeed * 1.5
  travellingPrince.rotation += rotationSpeed
  if (travellingPrince.rotation >= 1.6) {
    travellingPrince.rotation = 0
    travellingPrince.textures = [app.loader.resources.princeDead.texture]
    app.ticker.remove(rotatePrinceToHorizontal)
    travellingGhost.visible = true
    startingPlanetaryRotation = finPlanetContainer.rotation
    relativePlanetaryRotation = 0
    console.log(`(${earthSnake.x}, ${earthSnake.y})`)
    let newX = earthSnake.x - 185
    if (travellingPrince.scale.x == 1) {
      newX = earthSnake.x + 175
    }
    const newY = earthSnake.y - 60
    console.log(`(${newX}, ${newY})`)
    travellingPrince.parent.removeChild(travellingPrince)
    finPlanetContainer.addChild(travellingPrince)
    travellingPrince.x = newX
    travellingPrince.y = newY
    travellingPrince.scale.y = -1
    app.ticker.add(rotatePlanetOneDay)
  }
}

let increment = 0.0
let deltaInc = 0.0001
const rotatePlanetOneDay = (delta) => {

  finPlanetContainer.rotation += increment
  relativePlanetaryRotation += increment

  if (travellingPrince.visible
      && relativePlanetaryRotation > Math.PI) {
    travellingPrince.visible = false
    deltaInc = -deltaInc
  }

  if (!travellingPrince.visible
      && relativePlanetaryRotation >= 2 * Math.PI) {
        app.ticker.remove(rotatePlanetOneDay)
    }
  increment += deltaInc
}

const flyGhostAway = (delta) => {
  if (travellingGhost.visible === true) travellingGhost.y -= 1
  if (travellingGhost.y < -200) fin.visible = true
}

// prince falls over,
const doPrinceCollapsing = () => {
  //prince.
  app.ticker.add(rotatePrinceToHorizontal)
  app.ticker.add(flyGhostAway)
}

// prince is replaced with dead-prince,
// birds descend from above,
// ghost-prince rises from body,
// connects to birds, flies to B612
