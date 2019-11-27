import '../common/index'
import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('contains a link to log out the user', () => {
    cy.get('[data-test-id="headerbar-profile-menu-link-logout"]').should(
        'be.visible'
    )
})
