import '../common/index'
import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('the HeaderBar displays a profile icon', () => {
    cy.get(
        `
        [data-test-id="headerbar-profile-icon-text"],
        [data-test-id="headerbar-profile-icon-image"]
    `
    ).should('be.visible')
})
