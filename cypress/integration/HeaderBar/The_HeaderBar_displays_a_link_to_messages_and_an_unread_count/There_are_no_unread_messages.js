import '../common/index'

Given('there are 0 unread messages', () => {
    cy.fixture('HeaderBar/dashboard')
        .then(response => ({
            ...response,
            unreadMessages: 0,
        }))
        .as('dashboardFixture')
})

Then('the messages link does not contain a count', () => {
    cy.get('[data-test-id="headerbar-messages-count"]').should('not.exist')
})
