describe('Security Dashboard', () => {

    beforeEach(() => {
        cy.visit('/')
        // cy.request('/account/login')
        cy.get('.btn').click()
    })

    it('should be able to click through all buttons to visit Edit Security page', () => {
        cy.contains('Securities')
        cy.visit('/securities/list')
        cy.get(':nth-child(1) > [style="width: 40px; text-align: center;"] > .btn').click()
        cy.get(':nth-child(1) > .btn-primary').click()
        cy.visit('/securities/1000000/edit')
    })

    it('Edit Security page should have all editable fields', () => {
        cy.contains('Securities')
        cy.visit('/securities/list')
        cy.get(':nth-child(1) > [style="width: 40px; text-align: center;"] > .btn').click()
        cy.get(':nth-child(1) > .btn-primary').click()
        cy.visit('/securities/1000000/edit')
        cy.get('#number')
        cy.get('#noteRate')
        cy.get(':nth-child(1) > .position-relative > .input-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
        cy.get(':nth-child(2) > .position-relative > .input-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
    })

    it('Edit Security page should have both Save Changes buttons', () => {
        cy.contains('Securities')
        cy.visit('/securities/list')
        cy.get(':nth-child(1) > [style="width: 40px; text-align: center;"] > .btn').click()
        cy.get(':nth-child(1) > .btn-primary').click()
        cy.visit('/securities/1000000/edit')
        cy.get(':nth-child(1) > .btn-primary')
        cy.get('form.av-valid > :nth-child(3) > .btn-primary')
    })

})