describe('Security Dashboard', () => {

    before(() => {
        cy.visit('/')
        cy.get('.btn').click()
        // cy.get('span[data-text="Dashboard"]').click()
        // cy.visit('/securities/list')
    })


    it('should have a securities drop-down button', () => {
        cy.contains('Securities')
    })

    it('should click the securities drop-down button', () => {
        cy.contains('Securities').click()
        // cy.contains('Dashboard').click()
        // cy.contains('Dashboard').and('be.visible').click()
    })

    it('securities dashboard option should be visible', () => {
        cy.contains('Securities').click()
        cy.get('.side-nav-second-level').contains('Dashboard').and('be.visible').click()

        // cy.get('.side-nav-second-level>span').find('>Dashboard')
        // cy.contains('Dashboard').and('be.visible')
        // cy.contains('.side-sub-nav-link').click()
        // cy.get('Dashboard').click()
    })

    // it('should have a securities list', () => {
    //     // cy.visit('/securities/list')
    //     cy.get('.security-list-table')
    // })
})