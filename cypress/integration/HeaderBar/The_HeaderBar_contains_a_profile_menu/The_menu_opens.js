import '../common/index'

When('the user clicks on the profile icons', () => {
    cy.get(
        `
        [data-test-id="headerbar-profile-icon-text"],
        [data-test-id="headerbar-profile-icon-image"]
    `
    ).click()
})

Then('the menu opens', () => {
    cy.get('[data-test-id="headerbar-profile-menu"]').should('be.visible')
})
