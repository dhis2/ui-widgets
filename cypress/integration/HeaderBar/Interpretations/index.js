import '../common/index'

Given('there are 10 unread interpretations', () => {
    cy.fixture('HeaderBar/dashboard')
        .then(response => ({
            ...response,
            unreadInterpretations: 10,
        }))
        .as('dashboardFixture')
})

Given('there are 0 unread interpretations', () => {
    cy.fixture('HeaderBar/dashboard')
        .then(response => ({
            ...response,
            unreadInterpretations: 0,
        }))
        .as('dashboardFixture')
})

Then('the HeaderBar contains a link to the interpretations', () => {
    cy.get('[data-test-id="headerbar-interpretations"]').should('be.visible')
})

Then('the interpretations link contains an icon with the number 10', () => {
    cy.get('[data-test-id="headerbar-interpretations-count"]').then($count => {
        expect($count.text()).to.equal('10')
    })
})

Then('the interpretations link does not contain a count', () => {
    cy.get('[data-test-id="headerbar-interpretations-count"]').should(
        'not.exist'
    )
})
