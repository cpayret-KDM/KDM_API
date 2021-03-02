describe('Loan Dashboard', () => {

    before(() => {
        cy.visit('/')
        cy.get('input[name=username]').type('Ryan+kdm@codingscape.com')
        cy.get('input[name=password]').type('password123$')
        cy.get('.btn').click()
    })

    it('should have a loan list', () => {
        cy.get('.loan-list-table')
    })

    it('should have clickable loan tickers', () => {
        cy.get(':nth-child(1) > [style="width: 200px; text-align: center;"] > .btn').click()
    })

})