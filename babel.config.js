const optimizeForSpeed = true // process.env.NODE_ENV === 'production'

module.exports = function(api) {
    api.cache.forever()

    let defaultPresets

    if (process.env.BABEL_ENV === 'modules') {
        defaultPresets = []
    } else {
        defaultPresets = [
            [
                '@babel/preset-env',
                {
                    modules: 'commonjs',
                },
            ],
        ]
    }

    return {
        presets: defaultPresets.concat('@babel/preset-react'),
        plugins: [
            '@babel/plugin-proposal-class-properties',
            ['styled-jsx/babel', { optimizeForSpeed }],
        ],
    }
}
