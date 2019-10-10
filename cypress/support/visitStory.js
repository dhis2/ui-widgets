Cypress.Commands.add('visitStory', (namespace, storyName, options = {}) => {
    const formattedNamespace = namespace.toLowerCase()
    const formattedStoryName = storyName.replace(/ /g, '-').toLowerCase()
    const id = `${formattedNamespace}--${formattedStoryName}`

    return cy.readFile('cypress/assets/unfetch.umd.js').then(content => {
        return cy.visit(`localhost:3000/iframe.html?id=${id}`, {
            ...options,
            onBeforeLoad: win => {
                delete win.fetch
                win.eval(content)
                win.fetch = win.unfetch
                options.onBeforeLoad && options.onBeforeLoad(win)
            },
        })
    })
})
