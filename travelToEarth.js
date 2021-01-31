// conversation with rose ends
// birds descend to prince
// prince sprite replaced with birds + prince 
// planet moves down and off-screen to right, stars move in same direction
// star movement gives the impression of a parabolic curve
// earth moves in from left and below
var birds = null
var princeTravellingToEarth = null
var thePlanetContainer = null
var doSetStarSpeedFunction = null

const doTravelToEarth = (rose, prince, planetContainer, setStarSpeedFunction) => {
    princeTravellingToEarth = prince
    thePlanetContainer = planetContainer
    doSetStarSpeedFunction = setStarSpeedFunction
    startBirds()
}

const birdSpeed = 2.1

const startBirds = () => {
    console.log("descendBirds")
    birds = new PIXI.AnimatedSprite([
        app.loader.resources.birds_only_1.texture,
        app.loader.resources.birds_only_2.texture])
    birds.width = app.loader.resources.birds_only_1.texture.width
    birds.height = app.loader.resources.birds_only_1.texture.height
    birds.x = (app.renderer.width / 2) + 400
    birds.y = 0// -(birds.height / 2)
    birds.anchor.x = 0.5
    birds.anchor.y = 0.5
    birds.animationSpeed = 0.1
    birds.play()
    app.stage.addChild(birds)

    app.ticker.add(descendBirds)
}


const descendBirds = (delta) => {
    birds.position.x -= delta * birdSpeed
    birds.position.y += delta * birdSpeed
    //console.log("Y: " + birds.position.y)
    if (birds.position.x < app.renderer.width / 2) {
        birds.position.x = app.renderer.width / 2
    }
    if (birds.position.y >= 350) {
        app.ticker.remove(descendBirds)
        ascendBirdsWithPrince(birds.position.y)
    }
}

const ascendBirdsWithPrince = (birdsY) => {
    birds.textures = [
        app.loader.resources.birds_prince_1.texture,
        app.loader.resources.birds_prince_2.texture]
    birds.play()
    princeTravellingToEarth.visible = false
    app.ticker.add(ascendBirds)
    doSetStarSpeedFunction(birdSpeed, birdSpeed)
}

var timeSpentAscending = 0
var descendingToEarth = false
var earthIsOnScreen = false
var b612IsOnScreen = true
var haveArrivedOnEarth = false
var newSnake = null

const ascendBirds = (delta) => {
    if (b612IsOnScreen) {
        thePlanetContainer.position.x += delta * birdSpeed
        thePlanetContainer.position.y += delta * birdSpeed

        if (thePlanetContainer.position.y > app.renderer.height + 450) {
            console.log("b612IsOff Screen")
            thePlanetContainer.visible = false
            b612IsOnScreen = false
        }
    }
    //console.log("timeSpentAscending: " + timeSpentAscending)
    if (timeSpentAscending > 320 && !descendingToEarth) {
        doSetStarSpeedFunction(birdSpeed, -birdSpeed)
        descendingToEarth = true
        console.log("Descending")
    } else if (descendingToEarth && timeSpentAscending > 380 && !earthIsOnScreen) {
        console.log("earthIsOnScreen")
        thePlanetContainer.removeChildren()
        thePlanetContainer.rotation = 0
        thePlanetContainer.visible = true
        newSnake = showEarth(app.loader.resources, thePlanetContainer)

        thePlanetContainer.position.x = (-thePlanetContainer.width / 2)
        thePlanetContainer.position.y = app.renderer.height + thePlanetContainer.height + 500
        earthIsOnScreen = true
    } else if (earthIsOnScreen && !haveArrivedOnEarth) {
        thePlanetContainer.position.x += delta * birdSpeed
        thePlanetContainer.position.y -= delta * birdSpeed

        if (thePlanetContainer.position.y <= app.renderer.height + 170) {
            console.log("haveArrivedOnEarth")
            thePlanetContainer.position.x = app.renderer.width / 2
            thePlanetContainer.position.y = app.renderer.height + 170
            haveArrivedOnEarth = true

            birds.textures = [
                app.loader.resources.birds_only_1.texture,
                app.loader.resources.birds_only_2.texture]
            birds.play()
            princeTravellingToEarth.position.x = app.renderer.width / 2
            princeTravellingToEarth.position.y = app.renderer.height - 274
            princeTravellingToEarth.visible = true

            doSetStarSpeedFunction(0, 0)
            app.ticker.add(flyBirdsAway)
            startEarthStory(newSnake)
            app.ticker.remove(ascendBirds)
        }
    }

    timeSpentAscending += delta
}

const flyBirdsAway = (delta) => {
    birds.position.x -= delta * birdSpeed
    birds.position.y -= delta * birdSpeed
    if (birds.position.x < birds.width) {
        birds.parent.removeChild(birds)
        app.ticker.remove(flyBirdsAway)
    }
}
