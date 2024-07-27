# material-beautify-card



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type     | Default     |
| ------------------- | -------------------- | ----------- | -------- | ----------- |
| `meaning`           | `meaning`            |             | `string` | `undefined` |
| `orientation`       | `orientation`        |             | `string` | `undefined` |
| `phonicOrientation` | `phonic-orientation` |             | `string` | `undefined` |
| `primaryHanziType`  | `primary-hanzi-type` |             | `string` | `undefined` |
| `primaryVocab`      | `primary-vocab`      |             | `string` | `undefined` |
| `secondarySentence` | `secondary-sentence` |             | `string` | `undefined` |
| `secondaryVocab`    | `secondary-vocab`    |             | `string` | `undefined` |
| `sentence`          | `sentence`           |             | `string` | `undefined` |
| `sentenceMeaning`   | `sentence-meaning`   |             | `string` | `undefined` |
| `sentencePhonic`    | `sentence-phonic`    |             | `string` | `undefined` |
| `type`              | `type`               |             | `string` | `undefined` |
| `vocabPhonic`       | `vocab-phonic`       |             | `string` | `undefined` |


## Dependencies

### Used by

 - [material-beautify-chinese-study](..)

### Depends on

- [material-beautify-content](../card-content)
- [material-beautify-type](../card-type)
- [material-beautify-insight](../card-buttons/insight)

### Graph
```mermaid
graph TD;
  material-beautify-card --> material-beautify-content
  material-beautify-card --> material-beautify-type
  material-beautify-card --> material-beautify-insight
  material-beautify-content --> material-beautify-hanzi-with-phonic
  material-beautify-content --> material-beautify-writing
  material-beautify-content --> material-beautify-meaning
  material-beautify-insight --> material-beautify-ai-results
  material-beautify-chinese-study --> material-beautify-card
  style material-beautify-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
