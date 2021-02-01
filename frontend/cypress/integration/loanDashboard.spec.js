describe('Loan Dashboard', () => {

    before(() => {
        cy.visit('/')
        cy.get('.btn').click()
    })

    it('should have a loan list', () => {
        cy.get('.loan-list-table')
    })

})