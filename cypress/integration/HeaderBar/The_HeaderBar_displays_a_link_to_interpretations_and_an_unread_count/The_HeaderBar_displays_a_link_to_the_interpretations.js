import '../common/index'
import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('the HeaderBar contains a link to the interpretations', () => {
    cy.get('[data-test-id="headerbar-interpretations"]').should('be.visible')
})
