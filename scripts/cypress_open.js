const { runStorybook } = require('./cypress/runStorybook')
const { cypressOpen } = require('./cypress/cypressOpen')
const { cleanUp } = require('./cypress/cleanUp')

Promise.resolve([])
    .then(runStorybook)
    .then(cypressOpen)

    .catch(err => {
        err && console.error(err)
        process.exit(1)
    })
