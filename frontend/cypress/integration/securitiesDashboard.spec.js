describe('Security Dashboard', () => {

    before(() => {
        cy.visit('/')
        cy.get('.btn').click()
        // cy.get('span[data-text="Dashboard"]').click()
        // cy.visit('/securities/list')
    })

    it('should have a securities list', () => {
        // cy.visit('/securities/list')
        cy.get('.security-list-table')
    })
})