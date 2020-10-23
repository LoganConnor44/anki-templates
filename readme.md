# Purpose

This codebase is a solution for making Chinese study, through Anki, more enjoyable by making the flashcards beautiful.

# Available Card Types And Styling

| Question                                                      | Answer                                                    |
| -----------                                                   | -----------                                               |
| <img src="./images/recognition-question.png" alt="Recognition Question" width="200"/> | <img src="./images/recognition-answer.png" alt="Recognition Answer" width="200"/> |
| <img src="./images/meaning-question.png" alt="Meaning Question" width="200"/> | <img src="./images/meaning-answer.png" alt="Meaning Answer" width="200"/> |
| <img src="./images/traditional-question.png" alt="Traditional Question" width="200"/> | <img src="./images/traditional-answer.png" alt="Traditional Answer" width="200"/> |
| <img src="./images/tones-question.png" alt="Tones Question" width="200"/> | <img src="./images/tones-answer.png" alt="Tones Answer" width="200"/> |
| <img src="./images/writing-question.png" alt="Writing Question" width="200"/> | <img src="./images/writing-answer.gif" alt="Writing Answer" width="200"/> |

# tl;dr

This project can make your Chinese cards look nice by copying/pasting a few lines of code into your Anki template. To do this follow the guide below:
1. Copy the `script` tag below and paste it into your Anki template.
    * `<script>if (!document.querySelector('#import-script')) {var script = document.createElement('script');script.setAttribute('id', 'import-script');script.setAttribute('type', 'module');script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/beautify-chinese-study@1.0.0/dist/beautify-chinese-study/beautify-chinese-study.esm.js');document.body.appendChild(script);}</script>`
        * Normally, this script tag would be shorter, but Anki's Web Viewer doesn't handle scripts like other Web Viewers / browsers.
2. Copy the `style` tag below and paste it into your template OR paste it the styling section of your Anki Card.
    * `<style> /*desktop anki*/body {margin: 0;}/*ankidroid*/#content {margin: 0;}</style>`
3. Copy the below `material-beautify-chinese-study` tag and paste it into your Anki card. Be sure to input your own Anki Field name.
    ```html
    <material-beautify-chinese-study simplified='{{text:Simplified}}'
        traditional='{{text:Traditional}}'
        numbered-pinyin='{{text:Pinyin}}'
        meaning='{{text:Meaning}}'
        card-type='tones'
        card-orientation='question' />
    ```

A full example is found below:
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
<script>
	if (!document.querySelector('#import-script')) {
		var script = document.createElement('script');
		script.setAttribute('id', 'import-script');
		script.setAttribute('type', 'module');
		script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/beautify-chinese-study@1.0.0/dist/beautify-chinese-study/beautify-chinese-study.esm.js');
		document.body.appendChild(script);
	}
</script>
<material-beautify-chinese-study simplified='{{text:Simplified}}'
	traditional='{{text:Traditional}}'
	numbered-pinyin='{{text:Pinyin}}'
	meaning='{{text:Meaning}}'
	card-type='tones'
	card-orientation='question' 
	preferred-phonic='zhuyin' />
```

# How

Anki utilizes web technologies to generate its flashcards. This codebase is using a technology called Web Components that will allow users to only add three html tags to their Anki card templates, and the rest is handled automatically.
* `style`
    * Used to override some top level styling by Anki Desktop and AnkiDroid.
* `script`
    * Used to pull in the main logic that powers this project.
* `material-beautify-chinese-study`
    * The custom html tag that we have created to have beautiful looking Anki Chinese Flashcards.

## Styling

While this project handles most of the styling for the user, there is styling that cannot be overridden from Anki Desktop and AnkiDroid (iOS anki app not tested). Fortunately, by adding a few lines this can be fixed. In the [how](#How) section above, it shows inline CSS to fix this. Those few lines of code may also be placing an Anki's Template Styling section. It is up to the user's preference for the placement of the CSS code. Functionality, it makes no difference where it is located.

# Prerequisites

* Have a Chinese deck in Anki with the following fields (field names do not need to match)
    * Simplified Characters
    * Traditional Characters
    * Meaning In English
    * Numbered Pinyin
* Have the Anki knowledge to set up Card Types (Notes) for the different cards they would like to utilize for their study.

# Features

Aside from making your flashcards look pretty, this project has three note-worthy features:
1. Stroke Order Animation
    * On the answer side of the writing cards, the hanzi will animate the stroke order by default.
2. Pleco Integration
    * At any time, the user can click the hanzi they are shown and the card will automatically open Pleco (very popular dictionary mobile application).
3. Zhuyin Characters
    * The project can convert your numbered pinyin into zhuyin characters.

# material-beautify-chinese-study API
    
Please follow the link [here](./src/components/material-beautify-chinese-study/readme.md) to read the full documentation of this element. This documentation is autogenerated and more reliable than handwriting it. 

# Current Issues

1. Accented pinyin has not been tested. I plan to add this because I'm sure most users have accented pinyin, rather than numbered, but this is something I don't have with my decks and haven't spent time on yet.
2. Writing Card Types (Notes) - if it is a single character, it will animate twice. Currently, I'm writing this off as a feature because it's an easy issue to fix but don't mind the repeat.

# Improvements

1. A `typing` type card is being developed utilizing Anki's `{{type:FIELD_NAME_HERE}}` functionality.
2. Ease-in animation and a dark background could be added so users don't occasionally see a flash of default background colour when the application is loading.
3. A skeleton card could be created (skeleton cards are essentially a newer version of a loading screen). But, the actual delay is minimal at the moment.

----------------
# StencilJs Document That Is Helpful

## Using this component

There are three strategies we recommend for using web components built with Stencil.

The first step for all three of these strategies is to [publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages).

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/my-component@0.0.1/dist/mycomponent.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc