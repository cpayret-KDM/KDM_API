describe('Security Dashboard', () => {

    before(() => {
        cy.visit('/')
        // cy.request('/account/login')
        cy.get('.btn').click()
    })

    it('should have a Create New Security button', () => {
        cy.get('.d-flex > .btn')
    })

    it('Create New Security button should be clickable', () => {
        cy.get('.d-flex > .btn').click()
    })

})