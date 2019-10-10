import '../common/index'

Given('there are 5 apps available to the user', () => {
    cy.fixture('HeaderBar/getModules')
        .then(response => ({
            ...response,
            modules: response.modules.slice(0, 5),
        }))
        .as('modulesFixture')
})

When('the user clicks on the menu icons', () => {
    cy.get('[data-test-id="headerbar-apps-icon"]').click()
})

When('the user opens the menu', () => {
    cy.get('[data-test-id="headerbar-apps-icon"]').click()
})

When('the user clicks outside of the menu', () => {
    cy.get('[data-test-id="headerbar-title"]').click()
})

Then('the HeaderBar displays a menu icon', () => {
    cy.get('[data-test-id="headerbar-apps-icon"]').should('exist')
})

Then('the HeaderBar dos not display the app menu', () => {
    cy.get('[data-test-id="headerbar-apps-menu"]').should('not.exist')
})

Then('the menu opens', () => {
    cy.get('[data-test-id="headerbar-apps-menu"]').should('be.visible')
})

Then('contains 5 items with links', () => {
    cy.get('[data-test-id="headerbar-apps-menu-list"]')
        .find('a')
        .should('have.length', 5)
})
