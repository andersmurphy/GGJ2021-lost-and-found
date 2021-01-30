
// will need to load different stories
// will need to update every tick
// will need to keep track of the string we are currently showing
// the currently showing string may be displayed over multiple dialog screens
// the currently showing string will need to be line-divided
// the currently showing string will need to be dialog-screen divided (say 4 lines)

const emptyStory = ﻿{"inkVersion":19,"root":[["end",["done",{"#f":5,"#n":"g-0"}],null],"done",{"#f":1}],"listDefs":{}};
var story = new inkjs.Story(emptyStory);
var currentlyShowingText = ""
var storyContainer = null

const loadStory = (storyContent, container) => {
    story = new inkjs.Story(storyContent);
    // Kick off the start of the story!
    storyContainer = container
    continueStory(true);
}

// Main story processing function. Each time this is called it generates
// a new piece of text to show
const continueStory = (firstTime) => {

    var paragraphIndex = 0;
    var delay = 0.0;
    
    // Don't over-scroll past new content
    var previousBottomEdge = firstTime ? 0 : contentBottomEdgeY();

    // Generate story text - loop through available content
    if (story.canContinue
        && story.text != currentlyShowingText) {

        // Get ink to generate the next paragraph
        currentlyShowingText = story.Continue();
        // var tags = story.currentTags;
        
        const basicText = new PIXI.Text(currentlyShowingText);
        basicText.x = 8;
        basicText.y = 8;

        storyContainer.addChild(basicText);

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

const restart = () => {
    story.ResetState();

    //setVisible(".header", true);

    continueStory(true);

    //outerScrollContainer.scrollTo(0, 0);
}

const updateStory = (_) => {
    continueStory(false);
}
