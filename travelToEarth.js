// conversation with rose ends
// birds descend to prince
// prince sprite replaced with birds + prince 
// planet moves down and off-screen to right, stars move in same direction
// star movement gives the impression of a parabolic curve
// earth moves in from left and below
var birds = null
var princeTravellingToEarth = null
var b612PlanetContainer = null
var doSetStarSpeedFunction = null

const doTravelToEarth = (rose, prince, planetContainer, setStarSpeedFunction) => {
    princeTravellingToEarth = prince
    b612PlanetContainer = planetContainer
    doSetStarSpeedFunction = setStarSpeedFunction
    startBirds()
}

const startBirds = () => {
    console.log("descendBirds")
    birds = new PIXI.AnimatedSprite([
        app.loader.resources.birds_only_1.texture,
        app.loader.resources.birds_only_2.texture])
    birds.width = app.loader.resources.birds_only_1.texture.width
    birds.height = app.loader.resources.birds_only_1.texture.height
    birds.x = app.renderer.width / 2
    birds.y = 0// -(birds.height / 2)
    birds.anchor.x = 0.5
    birds.anchor.y = 0.5
    birds.animationSpeed = 0.1
    birds.play()
    app.stage.addChild(birds)

    app.ticker.add(descendBirds)
}

const birdSpeed = 2

const descendBirds = (delta) => {
    birds.position.y += delta * birdSpeed
    //console.log("Y: " + birds.position.y)
    if (birds.position.y >= 300) {
        app.ticker.remove(descendBirds)
        ascendBirdsWithPrince(birds.position.y)
    }
}

const ascendBirdsWithPrince = (birdsY) => {
    birds.textures = [
        app.loader.resources.birds_prince_1.texture,
        app.loader.resources.birds_prince_2.texture]
    princeTravellingToEarth.visible = false
    app.ticker.add(ascendBirds)
    doSetStarSpeedFunction(birdSpeed, birdSpeed)
}

var timeSpentAscending = 0
var descendingToEarth = false
var earthIsOnScreen = false
var b612IsOnScreen = true

const ascendBirds = (delta) => {
    if (b612IsOnScreen) {
        b612PlanetContainer.position.x += delta * birdSpeed
        b612PlanetContainer.position.y += delta * birdSpeed

        if (b612PlanetContainer.position.y > app.renderer.height + b612PlanetContainer.height) {
            b612PlanetContainer.parent.removeChild(b612PlanetContainer)
            b612IsOnScreen = false
        }
    }
    //console.log("timeSpentAscending: " + timeSpentAscending)
    if (timeSpentAscending > 500 && !descendingToEarth) {
        doSetStarSpeedFunction(birdSpeed, -birdSpeed)
        descendingToEarth = true
        console.log("Descending")
    } else if (descendingToEarth && timeSpentAscending > 10 && !earthIsOnScreen) {

    }
    timeSpentAscending += delta
}
