import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('the HeaderBar dos not display the app menu', () => {
    cy.get('[data-test-id="headerbar-apps-menu"]').should('not.exist')
})
