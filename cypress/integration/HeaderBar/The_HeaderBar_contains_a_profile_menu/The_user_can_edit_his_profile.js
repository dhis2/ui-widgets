import '../common/index'

Then('contains a link to edit the profile', () => {
    cy.get('[data-test-id="headerbar-profile-edit-profile-link"]').should(
        'be.visible'
    )
})
