const emotionBabelPresetCssProp = require('@emotion/babel-preset-css-prop').default(undefined, {})

module.exports = {
    babel: {
        plugins: [...emotionBabelPresetCssProp.plugins],
    },
}
