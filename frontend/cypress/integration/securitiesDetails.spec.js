describe('Security Details', () => {

    beforeEach(() => {
        cy.visit('/')
        // cy.request('/account/login')
        cy.get('.btn').click()
    })

    it('should be able to click through all buttons to visit Securities Details', () => {
        cy.contains('Securities')
        cy.visit('/securities/list')
        cy.get(':nth-child(1) > [style="width: 40px; text-align: center;"] > .btn').click()
        cy.get(':nth-child(1) > .btn-primary').click()
    })

    it('Securities Details page should have all fields and none should be editable', () => {
        cy.contains('Securities')
        cy.visit('/securities/list')
        cy.get(':nth-child(1) > [style="width: 40px; text-align: center;"] > .btn').click()
        cy.get(':nth-child(1) > .btn-primary').click()
        cy.visit('/securities/1000000')
        cy.get('#number').should('be.disabled')
        cy.get('#noteRate').should('be.disabled')
        cy.get(':nth-child(1) > .position-relative > .input-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').should('be.disabled')
        cy.get(':nth-child(2) > .position-relative > .input-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').should('be.disabled')
    })

    it('Edit Security page should have Delete Security and Edit Security buttons', () => {
        cy.contains('Securities')
        cy.visit('/securities/list')
        cy.get(':nth-child(1) > [style="width: 40px; text-align: center;"] > .btn').click()
        cy.get(':nth-child(1) > .btn-primary').click()
        cy.visit('/securities/1000000')
        cy.get(':nth-child(1) > .btn-danger')
        cy.get(':nth-child(1) > .btn-primary')
    })

})