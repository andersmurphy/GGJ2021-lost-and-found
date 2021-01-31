let travellingPrince = null
let travellingGhost  = null

const doTravelToB612 = (snake, prince, ghost) => {
  travellingPrince = prince
  travellingGhost = ghost
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
  travellingPrince.scale.x = -1
  travellingPrince.anchor.set(1, 1)
  travellingPrince.y += 5
  rotationSpeed = rotationSpeed * 1.5
  travellingPrince.rotation += rotationSpeed
  if (travellingPrince.rotation >= 1.6) {
    travellingPrince.rotation = 0
    travellingPrince.y += 50
    travellingPrince.textures = [app.loader.resources.princeDead.texture]
    app.ticker.remove(rotatePrinceToHorizontal)
    travellingGhost.visible = true
  }
}

const flyGhostAway = (delta) => {
  if (travellingGhost.visible === true) travellingGhost.y -= 1
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
