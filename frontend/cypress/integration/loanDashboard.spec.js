describe('Loan Dashboard', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('input[name=username]').type('Ryan+kdm@codingscape.com')
        cy.get('input[name=password]').type('password123$')
        cy.get('.btn').click()
    })

    it('should have a loan list', () => {
        cy.get('.loan-list-table')
    })


    it('not have any negative spread values', () => {
        cy.get('.loan-list-table')
        cy.contains(/(?<!\d)([-])\d+/g).should('not.exist')

    it('should have clickable loan tickers', () => {
        cy.get(':nth-child(1) > [style="width: 200px; text-align: center;"] > .btn').click()
    })

})