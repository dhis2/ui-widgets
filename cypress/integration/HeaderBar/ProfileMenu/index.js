import '../common/index'

const profileIconSelector = `
    [data-test-id="headerbar-profile-icon-text"],
    [data-test-id="headerbar-profile-icon-image"]
`

When('the user clicks on the profile icons', () => {
    cy.get(profileIconSelector).click()
})

When('the user opens the menu', () => {
    cy.get(profileIconSelector).click()
})

When('the user clicks outside of the menu', () => {
    cy.get('[data-test-id="headerbar-title"]').click()
})

Then('the HeaderBar displays a profile icon', () => {
    cy.get(profileIconSelector).should('be.visible')
})

Then('the HeaderBar does not display the profile menu', () => {
    cy.get('[data-test-id="headerbar-profile-menu"]').should('not.exist')
})

Then('the menu opens', () => {
    cy.get('[data-test-id="headerbar-profile-menu"]').should('be.visible')
})

Then('contains the user name', () => {
    cy.get('@meFixture', ({ name }) => {
        cy.get('[data-test-id="headerbar-profile-username"]').then($name => {
            expect($name.text()).to.equal(name)
        })
    })
})

Then('contains the user email', () => {
    cy.get('@meFixture', ({ email }) => {
        cy.get('[data-test-id="headerbar-profile-user-email"]').then($email => {
            expect($email.text()).to.equal(email)
        })
    })
})

Then('contains a link to edit the profile', () => {
    cy.get('[data-test-id="headerbar-profile-edit-profile-link"]').should(
        'be.visible'
    )
})

Then('contains a link to the settings', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-settings"]').should(
        'be.visible'
    )
})

Then('contains a link to the user account', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-account"]').should(
        'be.visible'
    )
})

Then('contains a link to the help page', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-help"]').should(
        'be.visible'
    )
})

Then('contains a link to the About DHIS2 page', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-about"]').should(
        'be.visible'
    )
})

Then('contains a link to log out the user', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-logout"]').should(
        'be.visible'
    )
})
