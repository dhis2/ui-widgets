import '../common/index'

Given('there are 5 unread messages', () => {
    cy.fixture('HeaderBar/dashboard')
        .then(response => ({
            ...response,
            unreadMessages: 5,
        }))
        .as('dashboardFixture')
})

Given('there are 0 unread messages', () => {
    cy.fixture('HeaderBar/dashboard')
        .then(response => ({
            ...response,
            unreadMessages: 0,
        }))
        .as('dashboardFixture')
})

Then('the HeaderBar contains a link to the messages', () => {
    cy.get('[data-test-id="headerbar-messages"]').should('be.visible')
})

Then('the messages link contains an icon with the number 5', () => {
    cy.get('[data-test-id="headerbar-messages-count"]').then($count => {
        expect($count.text()).to.equal('5')
    })
})

Then('the messages link does not contain a count', () => {
    cy.get('[data-test-id="headerbar-messages-count"]').should('not.exist')
})
