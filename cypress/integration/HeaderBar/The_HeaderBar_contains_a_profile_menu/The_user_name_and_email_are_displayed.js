import '../common/index'

Then('contains the user name', () => {
    cy.get('@meFixture', ({ name }) => {
        cy.get('[data-test-id="headerbar-profile-username"]').then($name => {
            expect($name.text()).to.equal(name)
        })
    })
})

Then('contains the user email', () => {
    cy.get('@meFixture', ({ email }) => {
        cy.get('[data-test-id="headerbar-profile-user-email"]').then($email => {
            expect($email.text()).to.equal(email)
        })
    })
})
