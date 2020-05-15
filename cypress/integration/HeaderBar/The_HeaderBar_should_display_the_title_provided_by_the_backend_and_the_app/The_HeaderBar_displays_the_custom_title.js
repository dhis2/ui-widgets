import '../common/index'
import { Then, Given } from 'cypress-cucumber-preprocessor/steps'

Given(
    'the custom title is {string} and the app title is "Example!"',
    applicationTitle => {
        cy.get('@applicationTitleFixture').then(fx => {
            cy.route({
                url: 'https://domain.tld/api/system/info',
                response: { ...fx, applicationTitle },
            }).as('modules')
        })
    }
)

Then('the displayed title should be "Barbaz - Example!"', () => {
    cy.get('[data-test="headerbar-title"]').then($title => {
        expect($title.text()).to.equal('Barbaz - Example!')
    })
})
