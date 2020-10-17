# What

This codebase is a solution for making Chinese study, through Anki, more enjoyable by making the flashcards more presentable.

# How

Anki utilizes web technologies to generate its flashcards. This codebase is using a web technology called Web Components that will allow users to only write a single html tag in their Anki card templates. An example of this is as followed:
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
    cardOrientation='question' />
```

# Examples

| Question                                                      | Answer                                                    |
| -----------                                                   | -----------                                               |
| ![Recognition Question](./images/recognition-question.png)    | ![Recognition Answer](./images/recognition-answer.png)    |
| ![Meaning Question](./images/meaning-question.png)            | ![Meaning Answer](./images/meaning-answer.png)            |
| ![Traditional Question](./images/traditional-question.png)    | ![Traditional Answer](./images/traditional-answer.png)    |
| ![Tones Question](./images/tones-question.png)                | ![Tones Answer](./images/tones-answer.png)                |
| ![Writing Question](./images/writing-question.png)            | ![Writing Answer](./images/writing-answer.gif)            |

# Current Issues

1. Code needs to be copy/pasted into each Card Type (Note). There is a plan to host the web component on a cloud platform that will enable users to pull it in via `<link>`.
2. Writing Card Types (Notes) - if it is a single character, it will animate twice. Currently, I'm writing this off as a feature because it's an easy issue to fix but don't mind the repeat.
3. 
4.
5.