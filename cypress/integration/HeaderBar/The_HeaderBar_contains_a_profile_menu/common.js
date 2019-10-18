Then('the HeaderBar does not display the profile menu', () => {
    cy.get('[data-test-id="headerbar-profile-menu"]').should('not.exist')
})

When('the user opens the menu', () => {
    cy.get(
        `
        [data-test-id="headerbar-profile-icon-text"],
        [data-test-id="headerbar-profile-icon-image"]
    `
    ).click()
})
