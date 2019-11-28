import '../common/index'
import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('contains a link to the help page', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-help"]').should(
        'be.visible'
    )
})
