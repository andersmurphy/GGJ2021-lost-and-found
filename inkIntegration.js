let didMeetSnake = false

const interactionListener = _ => {
    if (!didMeetSnake) { // Faking it: When the prince interacts with another character a dialog appears
        didMeetSnake = true
        showSnakeDialog()
    }
}

const showSnakeDialog = () => {
    // add dialog box beside prince
    let container = new PIXI.Container();
    let background = new PIXI.Sprite(app.loader.resources.DialogBackground.texture)

    container.width = 584
    container.height = 348
    container.x = 8
    container.y = 8

    container.addChild(background);

    app.stage.addChild(container)
    // run ink script 
    loadStory(helloWorldStoryContent, container)

    app.ticker.add(
        () => {
            continueStory(false)
        })
}

// will need to load different stories
// will need to update every tick
// will need to keep track of the string we are currently showing
// the currently showing string may be displayed over multiple dialog screens
// the currently showing string will need to be line-divided
// the currently showing string will need to be dialog-screen divided (say 4 lines)

const emptyStory = ﻿{"inkVersion":19,"root":[["end",["done",{"#f":5,"#n":"g-0"}],null],"done",{"#f":1}],"listDefs":{}};
var story = new inkjs.Story(emptyStory);
var currentlyShowingText = null
var storyContainer = new PIXI.Container()

const loadStory = (storyContent, container) => {
    story = new inkjs.Story(storyContent);
    // Kick off the start of the story!
    storyContainer = container
    //console.log("Len: " + storyContainer.children.length)
    if (storyContainer.children.length > 1) {
        storyContainer.removeChildren(1, storyContainer.children.length - 1)
    }

    continueStory(true);
}

const onContinue = () => {
    console.log("onContinue")
    currentlyShowingText = null
}

const buttonHeight = 44
const padding = 8

// Main story processing function. Each time this is called it generates
// a new piece of text to show
const continueStory = (firstTime) => {

    var paragraphIndex = 0;
    var delay = 0.0;
    
    // Don't over-scroll past new content
    //var previousBottomEdge = firstTime ? 0 : contentBottomEdgeY();

    // Generate story text - loop through available content
    if (story.canContinue
        && story.currentText != currentlyShowingText) {

        if (storyContainer.children.length > 1) {
            storyContainer.removeChildren(1, storyContainer.children.length - 1)
        }
        
        let continueButton = new PIXI.Container()
        // let normal = new PIXI.Sprite(app.loader.resources.ButtonNormal.texture)
        // normal.texture.orig = new PIXI.Rectangle(15, 15, 15, 15)
        let buttonNormal = new PIXI.NineSlicePlane(app.loader.resources.ButtonNormal.texture, 7, 7, 7, 7);
        //let buttonActive = new PIXI.NineSlicePlane(PIXI.Sprite(app.loader.resources.ButtonActive.texture), 7, 7, 7, 7);
        //let buttonSelected = new PIXI.NineSlicePlane(PIXI.Sprite(app.loader.resources.ButtonSelected.texture), 7, 7, 7, 7);
        var contentWidth = storyContainer.width - padding * 2
        
        continueButton.x = padding
        continueButton.y = storyContainer.height - buttonHeight - padding
        
        buttonNormal.x = 0
        buttonNormal.y = 0
        buttonNormal.width = contentWidth
        buttonNormal.height = buttonHeight
        continueButton.addChild(buttonNormal)

        continueButton.interactive = true
        continueButton.on('tap', (event) => {
            onContinue()
        });
        continueButton.on('click', (event) => {
            onContinue()
        });
        
        // Get ink to generate the next paragraph
        currentlyShowingText = story.Continue();
        // var tags = story.currentTags;
        
        // const basicText = new PIXI.Text(currentlyShowingText);
        // basicText.x = 8;
        // basicText.y = 8;

        let style = new PIXI.TextStyle({fontFamily : 'Arial', fontSize: 24, fill : 0x101010, align : 'left'})
        //let textMetrics = PIXI.TextMetrics.measureText('Your text', style)

        //storyContainer.addChild(basicText)
        console.log("contentWidth: " + contentWidth)
        var lines = LayedOutText(currentlyShowingText, style, contentWidth, "left")
        var lineY = padding;

        lines.forEach(line => {
            line.y = lineY
            storyContainer.addChild(line);
            lineY += line.height
            lineY += padding
        });
        storyContainer.addChild(continueButton);

        // // Any special tags included with this line
        // var customClasses = [];
        // for(var i=0; i<tags.length; i++) {
        //     var tag = tags[i];

        //     // Detect tags of the form "X: Y". Currently used for IMAGE and CLASS but could be
        //     // customised to be used for other things too.
        //     var splitTag = splitPropertyTag(tag);

        //     // IMAGE: src
        //     if( splitTag && splitTag.property == "IMAGE" ) {
        //         var imageElement = document.createElement('img');
        //         imageElement.src = splitTag.val;
        //         storyContainer.appendChild(imageElement);

        //         showAfter(delay, imageElement);
        //         delay += 200.0;
        //     }

        //     // CLASS: className
        //     else if( splitTag && splitTag.property == "CLASS" ) {
        //         customClasses.push(splitTag.val);
        //     }

        //     // CLEAR - removes all existing content.
        //     // RESTART - clears everything and restarts the story from the beginning
        //     else if( tag == "CLEAR" || tag == "RESTART" ) {
        //         removeAll("p");
        //         removeAll("img");
                
        //         // Comment out this line if you want to leave the header visible when clearing
        //         setVisible(".header", false);

        //         if( tag == "RESTART" ) {
        //             restart();
        //             return;
        //         }
        //     }
        // }

        // // Create paragraph element (initially hidden)
        // var paragraphElement = document.createElement('p');
        // paragraphElement.innerHTML = paragraphText;
        // storyContainer.appendChild(paragraphElement);
        
        // // Add any custom classes derived from ink tags
        // for(var i=0; i<customClasses.length; i++)
        //     paragraphElement.classList.add(customClasses[i]);

        // // Fade in paragraph after a short delay
        // showAfter(delay, paragraphElement);
        // delay += 200.0;

    }

    // // Create HTML choices from ink choices
    // story.currentChoices.forEach(function(choice) {

    //     // Create paragraph with anchor element
    //     var choiceParagraphElement = document.createElement('p');
    //     choiceParagraphElement.classList.add("choice");
    //     choiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`
    //     storyContainer.appendChild(choiceParagraphElement);

    //     // Fade choice in after a short delay
    //     showAfter(delay, choiceParagraphElement);
    //     delay += 200.0;

    //     // Click on choice
    //     var choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0];
    //     choiceAnchorEl.addEventListener("click", function(event) {

    //         // Don't follow <a> link
    //         event.preventDefault();

    //         // Remove all existing choices
    //         removeAll("p.choice");

    //         // Tell the story where to go next
    //         story.ChooseChoiceIndex(choice.index);

    //         // Aaand loop
    //         continueStory();
    //     });
    // });

    // // Extend height to fit
    // // We do this manually so that removing elements and creating new ones doesn't
    // // cause the height (and therefore scroll) to jump backwards temporarily.
    // storyContainer.style.height = contentBottomEdgeY()+"px";

    // if( !firstTime )
    //     scrollDown(previousBottomEdge);
}

const LayedOutText = (text, font, width, alignment) => {
    var result = []
    var lines = text.split('\n')
    var spaceWidth = PIXI.TextMetrics.measureText(' ', font).width
    var wordIndex = 0
    var displayLine = ""
    var displayLineWidth = 0
    var words = []
    var wordCount = 0

    const addWordToLines = (word) => {
        console.log("Word: " + word)
        var wordWidth = PIXI.TextMetrics.measureText(word, font).width

        console.log("displayLineWidth: " + displayLineWidth)
        console.log("wordWidth: " + wordWidth)
        //console.log("Total width: " + Math.floor(displayLineWidth + wordWidth))
        if (Math.floor(displayLineWidth + wordWidth) >= width)
        {
            displayLine = displayLine.trim()
            console.log("displayLine: " + displayLine)
            if (wordIndex === wordCount - 1
                && wordCount > 1)
            {
                console.log("Orphan")
                var previousWord = words[wordIndex - 1]

                console.log("previousWord: " + previousWord)
                displayLine = displayLine.substr(0, displayLine.length - previousWord.length)
                displayLine = displayLine.trim()
                console.log("displayLine: " + displayLine)
                result.push(CreateLine(displayLine, font, width, alignment))
                displayLine = previousWord + " " + word
                console.log("displayLine: " + displayLine)
                result.push(CreateLine(displayLine, font, width, alignment))
                displayLine = ""
                displayLineWidth = 0
                return
            }
            result.push(CreateLine(displayLine, font, width, alignment))
            displayLine = ""
            displayLineWidth = 0
        }
        ++wordIndex
        displayLine += word + " "
        displayLineWidth += wordWidth + spaceWidth
    }

    const breakLine = (line) => {
        words = line.split(' ')
        wordCount = words.length
        
        displayLine = ""
        displayLineWidth = 0

        if (wordCount === 0)
        {
            result.push(CreateLine(displayLine, font, width, alignment))
            return
        }

        wordIndex = 0
        words.forEach(addWordToLines)

        displayLine = displayLine.trim()
        if (displayLine.length > 0)
        {
            result.push(CreateLine(displayLine, font, width, alignment))
            displayLine = ""
            displayLineWidth = 0
        }
    }

    lines.forEach(breakLine)

    result.forEach(line => {
        console.log("L: " + line.text)
    });
    return result;
}

const CreateLine = (displayLine, font, width, alignment) => {
    const label = new PIXI.Text(displayLine, font)
    label.x = padding

    return label;
}

// const restart = () => {
//     story.ResetState();

//     //setVisible(".header", true);

//     continueStory(true);

//     //outerScrollContainer.scrollTo(0, 0);
// }

// const updateStory = (_) => {
//     continueStory(false);
// }
