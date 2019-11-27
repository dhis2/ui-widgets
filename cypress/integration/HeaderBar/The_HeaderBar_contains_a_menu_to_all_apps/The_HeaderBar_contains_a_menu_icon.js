import '../common/index'
import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('the HeaderBar displays a menu icon', () => {
    cy.get('[data-test-id="headerbar-apps-icon"]').should('exist')
})
