const craco = require('@craco/craco')
const emotionBabelPresetCssProp = require('@emotion/babel-preset-css-prop').default(undefined, {})
module.exports = {
    babel: {
        plugins: [...emotionBabelPresetCssProp.plugins],
    },
    webpack: {
        configure: (config) => {
            craco.addBeforeLoader(config, craco.loaderByName('babel-loader'), {
                test: /\.(ts|tsx)$/,
                include: [/common/, /client/],
                loader: 'ts-loader',
            })

            return config
        },
    },
}
