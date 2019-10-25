import '../common/index'

Then('the HeaderBar displays a menu icon', () => {
    cy.get('[data-test-id="headerbar-apps-icon"]').should('exist')
})
