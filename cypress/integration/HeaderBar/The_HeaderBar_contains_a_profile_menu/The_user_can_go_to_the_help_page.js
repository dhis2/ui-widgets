import '../common/index'

Then('contains a link to the help page', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-help"]').should(
        'be.visible'
    )
})
