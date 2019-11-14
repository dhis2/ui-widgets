import '../common/index.js'

Then('the HeaderBar should display the dhis2 logo', () => {
    cy.get('[data-test-id="headerbar-logo"]').should('be.visible')
})

Then('the logo should link to the homepage', () => {
    cy.get('@systemInfoFixture').then(({ contextPath }) => {
        cy.get('[data-test-id="headerbar-logo"] a').then($a => {
            expect($a.attr('href')).to.equal(contextPath)
        })
    })
})
