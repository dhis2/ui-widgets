import '../common/index'
import './common'

Then('the HeaderBar dos not display the app menu', () => {
    cy.get('[data-test-id="headerbar-apps-menu"]').should('not.exist')
})
