const showB612 = (resources, planetContainer) => {
    // Planet
    const planet = new PIXI.Sprite(resources.planet.texture)
    planet.width = 1000
    planet.height = 1000
    planet.anchor.set(0.5)

    // Rose
    const rose = new PIXI.AnimatedSprite([resources.rose_globe.texture])
    rose.width = resources.rose_globe.texture.width
    rose.height = resources.rose_globe.texture.height
    rose.anchor.set(0.5)
    rose.rotation = Math.PI
    rose.x = 0
    rose.y = 542
    rose.animationSpeed = 0.1

    planetContainer.addChild(planet)
    planetContainer.addChild(rose)

    return rose
}
