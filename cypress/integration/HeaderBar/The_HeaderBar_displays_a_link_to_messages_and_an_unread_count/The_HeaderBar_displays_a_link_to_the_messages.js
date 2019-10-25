import '../common/index'

Then('the HeaderBar contains a link to the messages', () => {
    cy.get('[data-test-id="headerbar-messages"]').should('be.visible')
})
