describe('Security Dashboard', () => {

    before(() => {
        cy.visit('/')
        cy.get('.btn').click()
    })

    it('should have a securities drop-down button', () => {
        cy.contains('Securities')
    })

    it('should click the securities drop-down button', () => {
        cy.contains('Securities').click()
    })

    it('securities dashboard option should be visible', () => {
        cy.contains('Securities').click()
    })

    it('securities dashboard option should be clickable', () => {
        cy.get('.mm-active > .side-nav-second-level > :nth-child(1) > .side-nav-link-ref > span').click()
    })

    it('should have a securities list', () => {
        // cy.visit('/securities/list')
        cy.get('.security-list-table')
    })
})