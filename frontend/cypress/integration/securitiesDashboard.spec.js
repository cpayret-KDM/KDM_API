describe('Security Dashboard', () => {

    before(() => {
        cy.visit('/')
        // cy.request('/account/login')
        cy.get('.btn').click()
    })

    it('should be able to visit securities dashboard', () => {
        cy.contains('Securities')
        cy.visit('/securities/list')
    })

    it('should have a securities list', () => {
        cy.get('.security-list-table')
    })

    // it('should log in', () => {
    //     cy.visit('/')
    //     cy.request('/account/login')
    //     cy.get('.btn').click()
    // })

    // it('logs in programmatically without using the UI', () => {
    //     // // destructuring assignment of the this.currentUser object
    //     // const { username, password } = this.currentUser

    //     // programmatically log us in without needing the UI
    //     cy.request('POST', '/account/login', {
    //         username: 'johnfoo@gmail.com',
    //         password: 'abcd1234$'
    //     })

    //     cy.visit('https://johnfoo@gmail.com:abcd1234$@/securities/list')

    //     // any kind of restricted route!
    //     cy.visit('/')

    //     // our auth cookie should be present
    //     cy.getCookie('your-session-cookie').should('exist')

    //     // UI should reflect this user being logged in with the Loan Dashboard displayed
    //     cy.get('.loan-list-table')

    // })

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