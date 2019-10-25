import '../common/index'

Then('the HeaderBar contains a link to the interpretations', () => {
    cy.get('[data-test-id="headerbar-interpretations"]').should('be.visible')
})
