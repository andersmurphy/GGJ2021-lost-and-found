VAR choseDeath = false

->prince_and_snake
=== prince_and_snake ===

(A streak of gold flashes across the sand.) ->introduce

= introduce
*   Good evening.
        Good evening!
*   *   Who are you?
            Who does it look like I am?
*   *   *   A worm?
                I am a <i>snake</i>. The difference is <i>very</i> important.
*   *   *   *   What is the difference?
                    A worm is a pitiful, limbless creature that crawls on its belly with its face in the dirt. A snake is &ndash; well, the difference is unimportant.
*   *   *   *   *   You just said it was very important.
                        Well? I am far too important to concern myself with what's important and what isn't.
*   *   *   *   *   *   I'm sorry.
                            ->snake
*   *   *   *   *   I'm sorry.
                        ->snake
*   *   *   *   I'm sorry.
                    ->snake
*   *   *   A snake?
                ->snake
*   *   *   A piece of string?
                That is completely wrong, and yet not completely wrong. I am the string that ties the animals to the earth. I am the string that ties life to death.
            -> death
 
*   *   What planet is this?
        -> earth

= earth

Why, this is earth. What other planet would it be?
*   Oh, there are <i>lots</i> of other planets[!]! There's Mars and Venus and so on, but then there are moons, and asteroids, and dwarf planets. You know, there are so many that they ran out of names, and most of them are called things like 2001 DA42 or...
*   *   ...B-612. ->b612

*   Where are all the people?
    Oh, I expect they're over <i>there</i>. And <i>there</i>. And <i>there</i> - why, they're in practically every direction, you know. It's a wonder you haven't bumped into them already.
*   *   But how far?
            Far enough, I hope. I do not get on with them.
*   *   *   Are you afraid of them?
                Worse. They are afraid of me. They have a <i>long</i> history of blaming me for their own problems, you know. ->snake
            
*   What a funny name[!]! Where I come from, the planets are just called by letter and numbers, like 2001 DA42 or...
*   *   ...B-612.
            ->b612
->b612
= b612

B-612? I have never heard of it. ->b612_choices
= b612_choices
*   It has an interesting history[...]. It was discovered in 1909 by a Turkish astronomer, who presented it to the International Astronomical Congress in Paris. As he was wearing traditional Turkish costume, none of the western astronomers believed what he said. Later, a Turkish dictator ruled that all his subjects had to wear European-style costume. So the astronomer went back to the Astronomical Congress in 1920 wearing a suit and tie, and this time everyone believed him. ->b612_choices
*   It's up [there.]<i>there.</i> That is, I landed right here, so I suppose it must be straight above us. But you can't see it from here. It's too small and far away.
        The grains of sand are small, and I can see them. The mountains are far away, and I can see them. But you are right - my eyes only seem to be able to deal with one or the other.
        ->b612_choices
*   It's a beautiful place[.] It has three volcanoes, which I care for every day, and no baobab trees, which I do not care for, and...
*   *   ...a Rose. ->rose

= rose
I should like to meet a rose. There are not many flowers in the desert.
*   I miss her terribly[.]. I wish I had not left.
*   *   If there were any way back...
        -> death
*   She wouldn't like it here[.]. She would find it far too hot. On my planet, she finds it far too cold.
        She sounds discerning.
*   *   That is a kind way of putting it[.]. I left because I felt I could not make her happy. But now we are apart, and we are both unhappy. 
*   *   *   If there were any way back...
            -> death

->END
= snake

A snake is a powerful animal. ->snake_choices
= snake_choices
*   You don't look powerful.
    But you musn't judge on appearances. My cousin the boa constrictor looks just like me, more or less, and she can swallow an elephant. ->snake_choices
*   What can you do? ->death

= death

You know, we snakes have the power to transport people a vast distance. -> death_choices
= death_choices
*   How does it work?
        One bite from me, and you travel further than you have been in your life. ->death_journey
*   Between worlds?
        You might call it that. ->death_journey
        = death_journey
        Nobody is certain how far you go, or in what direction. But when I have seen humans speak of the journey, they look up.
*   *   Then if I stand [here...]<i>here,</i> right where I fell, so that B-612 is directly above me...
            It's as good a chance as any. Shall we proceed? ->death_yn
= death_yn
*   *   *   Yes
                Close your eyes and give me your ankle. You will be home soon. ->death_yes
*   *   *   No
                If you change your mind, I know how to find you. ->END

= death_yes
~choseDeath = true
-> END

