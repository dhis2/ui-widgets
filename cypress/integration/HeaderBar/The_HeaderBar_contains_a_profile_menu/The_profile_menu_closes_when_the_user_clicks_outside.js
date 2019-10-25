import '../common/index'

When('the user clicks outside of the menu', () => {
    cy.get('[data-test-id="headerbar-title"]').click()
})
