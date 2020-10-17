# Purpose

This codebase is a solution for making Chinese study, through Anki, more enjoyable by making the flashcards more presentable.

# Available Card Types And Styling

| Question                                                      | Answer                                                    |
| -----------                                                   | -----------                                               |
| <img src="./images/recognition-question.png" alt="Recognition Question" width="200"/> | <img src="./images/recognition-answer.png" alt="Recognition Answer" width="200"/> |
| <img src="./images/meaning-question.png" alt="Meaning Question" width="200"/> | <img src="./images/meaning-answer.png" alt="Meaning Answer" width="200"/> |
| <img src="./images/traditional-question.png" alt="Traditional Question" width="200"/> | <img src="./images/traditional-answer.png" alt="Traditional Answer" width="200"/> |
| <img src="./images/tones-question.png" alt="Tones Question" width="200"/> | <img src="./images/tones-answer.png" alt="Tones Answer" width="200"/> |
| <img src="./images/writing-question.png" alt="Writing Question" width="200"/> | <img src="./images/writing-answer.gif" alt="Writing Answer" width="200"/> |

# tl;dr

This project can make your chinese cards look cool by copying/pasting code into your Anki template. To do this follow the guide below:
1. Copy the contents of [this file](https://raw.githubusercontent.com/LoganConnor44/anki-templates/master/dist/BeautifyChineseStudy.js)
2. Paste the data into the front and back of your Anki card template.
3. Define the card you want. Example is as followed:
```html
<style>
    /*desktop anki*/
    body {
        margin: 0;
    }

    /*ankidroid*/
    #content {
        margin: 0;
    }
</style>
<beautify-chinese-study style="display: flex; flex-grow: 1; height: 100vh"
	simplified='{{text:Simplified}}'
    traditional='{{text:Traditional}}'
    numberedPinyin='{{text:Pinyin}}'
    meaning='{{text:Meaning}}'
    cardType='tones'
    cardOrientation='question' />
```

# How

Anki utilizes web technologies to generate its flashcards. This codebase is using a web technology called Web Components that will allow users to only write[*](##Caveat) a single html tag in their Anki card templates. An example of this is as followed:
```html
<style>
    /*desktop anki*/
    body {
        margin: 0;
    }

    /*ankidroid*/
    #content {
        margin: 0;
    }
</style>
<beautify-chinese-study style="display: flex; flex-grow: 1; height: 100vh;"
    simplified='天气'
    traditional='天氣'
    numberedPinyin='tian1qi4'
    cardType='recognition'
    meaning='weather'
    cardOrientation='question'
    preferredPhonic='zhuyin' />
```

## Caveat

### One Html Element And Done
The intention of this project is to host the code on a cloud platform, but currently, I have not set this up yet. The work-around is to copy/past the entire contents of [this file](https://raw.githubusercontent.com/LoganConnor44/anki-templates/master/dist/BeautifyChineseStudy.js) into the Anki card template in a `<script>` tag, as seen below:

![Anki Example](./images/anki-example.png)

### Styling

While this project handles most of the styling for the user, there is styling that cannot be overridden from Anki Desktop and AnkiDroid (iOS anki app not tested). Fortunately, by adding a few lines this can be fixed. In the [how](#How) section above, it shows inline CSS to fix this. Those few lines of code may also be placing an Anki's Template Styling section. It is up to the user's preference for the placement of the CSS code. Functionality, it makes no difference where it is located.

# Prerequisites

* Have a Chinese deck in Anki with the following fields (field names do not need to match)
    * Simplified Characters
    * Traditional Characters
    * Meaning In English
    * Numbered Pinyin
* Have the Anki knowledge to set up Card Types (Notes) for the different cards they would like to utilize for their study.

# Features

Aside from making your flashcards look pretty, this project has two note-worthy features:
1. Stroke Order Animation
    * On the answer side of the writing cards, the hanzi will animate the stroke order by default.
2. Pleco Integration
    * At any time, the user can click the hanzi they are shown and the card will automatically open Pleco (very popular dictionary mobile application).
3. Zhuyin Characters
    * The project can convert your numbered pinyin into zhuyin characters.

# beautify-chinese-study API
    
The available attributes are as followed for the custom html element.

* simplified
    * Used To Pass In Simplified Hanzi
        * `All Hanzi Accepted`
* traditional
    * Used To Pass In Traditional Hanzi
        * `All Hanzi Accepted`
* meaning
    * Used To Pass In The English Translation
        * `All English Words Accepted`
* numberedPinyin
    * Used To Pass In The Pronunciation Of The Given Hanzi
        * `Most Numbered Pinyin Accepted`
* cardType
    * Used To Define The Desired Question Type
    * Accepted values:
        * `recognition`
        * `meaning`
        * `tones`
        * `traditional`
        *  `writing`
* cardOrientation
    * Used To Define Whether This Card Is A Question Or Answer
    * Accepted values:
        * `question`
        * `answer`
* preferredPhonic - *optional*
    * Used To Define The Preferred Phonetic Type Used - Default is `pinyin`
    * Accepted values:
        * `pinyin`
        * `zhuyin`

# Current Issues

1. Code needs to be copy/pasted into each Card Type (Note). There is a plan to host the web component on a cloud platform that will enable users to pull it in via `<link>`.
2. Accented pinyin has not been tested. I plan to add this because I'm sure most users have accented pinyin, rather than numbered, but this is something I don't have with my decks and haven't spent time on yet.
3. Writing Card Types (Notes) - if it is a single character, it will animate twice. Currently, I'm writing this off as a feature because it's an easy issue to fix but don't mind the repeat.

# Improvements

1. A `typing` type card is being developed utilizing Anki's `{{type:FIELD_NAME_HERE}}` functionality.
2. Ease-in animation and a dark background could be added so users don't occasionally see a flash of default background colour when the application is loading.
3. A skeleton card could be created (skeleton cards are essentially a newer version of a loading screen). But, the actual delay is minimal at the moment. This is a feature that would be better suited after the move to a cloud host is done.