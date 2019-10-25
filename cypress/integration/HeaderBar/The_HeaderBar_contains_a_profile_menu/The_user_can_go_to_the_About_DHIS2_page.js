import '../common/index'

Then('contains a link to the About DHIS2 page', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-about"]').should(
        'be.visible'
    )
})
