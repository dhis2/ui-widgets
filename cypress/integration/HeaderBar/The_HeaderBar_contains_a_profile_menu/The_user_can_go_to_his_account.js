import '../common/index'
import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('contains a link to the user account', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-account"]').should(
        'be.visible'
    )
})
