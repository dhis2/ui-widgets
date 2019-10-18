import '../common/index'

Then('the HeaderBar displays a profile icon', () => {
    cy.get(
        `
        [data-test-id="headerbar-profile-icon-text"],
        [data-test-id="headerbar-profile-icon-image"]
    `
    ).should('be.visible')
})
