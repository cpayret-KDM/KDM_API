describe('Security Dashboard', () => {

    before(() => {
        cy.visit('/')
        // cy.request('/account/login')
        cy.get('.btn').click()
    })

    it('should have a securities menu', () => {
        cy.contains('Securities')
    })

    it('securities menu should be clickable', () => {
        cy.contains('Securities').click()
    })

    it('securities drop-down should be visible with dashboard option being clickable', () => {
        cy.contains('Securities').click()
        cy.get('.mm-active > .side-nav-second-level > :nth-child(1) > .side-nav-link-ref > span').should('be.visible').click()
        // cy.get('.mm-active > .side-nav-second-level > :nth-child(1) > .side-nav-link-ref > span').click({ force: true })
    })

})