describe('Security Dashboard', () => {

    before(() => {
        cy.visit('/')
        cy.get('input[name=username]').type('Ryan+kdm@codingscape.com')
        cy.get('input[name=password]').type('password123$')
        cy.get('.btn').click()
    })

    it('should be able to visit securities dashboard', () => {
        cy.contains('Securities')
        cy.visit('/securities/list')
    })

    it('should have a securities list', () => {
        cy.get('.security-list-table')
    })

    it('should have all securities headers', () => {
        cy.get('[aria-label="Ticker (Note Number) sortable"]')
        cy.get('thead > tr > [style="text-align: right;"]')
        cy.get('[aria-label="Trade Date sortable"]')
        cy.get('[aria-label="Maturity Date sortable"]')
    })

    it('should have data in/for securities list', () => {
        cy.get(':nth-child(1) > [style="width: 140px; text-align: center;"]')
        cy.get(':nth-child(1) > [style="width: 50px;"]')
        cy.get(':nth-child(1) > [style="width: 85px; text-align: right;"]')
        cy.get('tbody > :nth-child(1) > :nth-child(5)')
    })

    it('should have clickable security tickers', () => {
        cy.get(':nth-child(1) > [style="width: 140px; text-align: center;"] > .btn').click()
    })

    it('securities dashboard option should be clickable', () => {
        cy.contains('Securities').click()
        cy.get('.mm-active > .side-nav-second-level > :nth-child(1) > .side-nav-link-ref > span')
        cy.get('.mm-active > .side-nav-second-level > :nth-child(1) > .side-nav-link-ref > span').should('be.visible').click()
    })

})