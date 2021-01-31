const showEarth = (resources, planetContainer) => {
  // Planet
  const planet = new PIXI.Sprite(resources.planet_earth.texture)
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
  snake.y = 392
  snake.animationSpeed = 0.1

  // fin
  fin = new PIXI.Sprite(app.loader.resources.fin.texture)
  fin.width = resources.fin.texture.width
  fin.height = resources.fin.texture.height
  fin.x = (app.renderer.width - resources.fin.texture.width) / 2
  fin.y = app.renderer.height - 600
  fin.visible = false
  app.stage.addChild(fin)

  planetContainer.addChild(planet)
  planetContainer.addChild(snake)

  return snake
}
