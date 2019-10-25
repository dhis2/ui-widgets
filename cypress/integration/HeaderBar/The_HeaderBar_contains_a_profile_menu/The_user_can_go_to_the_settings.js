import '../common/index'

Then('contains a link to the settings', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-settings"]').should(
        'be.visible'
    )
})
