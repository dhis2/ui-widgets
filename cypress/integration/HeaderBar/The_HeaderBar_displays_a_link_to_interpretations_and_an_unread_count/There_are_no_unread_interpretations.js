import '../common/index'

Given('there are 0 unread interpretations', () => {
    cy.fixture('HeaderBar/dashboard')
        .then(response => ({
            ...response,
            unreadInterpretations: 0,
        }))
        .as('dashboardFixture')
})

Then('the interpretations link does not contain a count', () => {
    cy.get('[data-test-id="headerbar-interpretations-count"]').should(
        'not.exist'
    )
})
