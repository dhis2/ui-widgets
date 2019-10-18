import '../common/index'

Then('contains a link to log out the user', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-logout"]').should(
        'be.visible'
    )
})
