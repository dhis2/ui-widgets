import '../common/index'
import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('the HeaderBar contains a link to the messages', () => {
    cy.get('[data-test-id="headerbar-messages"]').should('be.visible')
})
