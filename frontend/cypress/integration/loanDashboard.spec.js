describe('Loan Dashboard', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('.btn').click()
    })

    it('should have a loan list', () => {
        cy.get('.loan-list-table')
    })

    it('not have any negative spread values', () => {
        cy.get('.loan-list-table')
        // need to check for -1 through -9
        cy.contains('-').should('not.exist')
    })

})