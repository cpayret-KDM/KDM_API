describe('Security Dashboard', () => {

    beforeEach(() => {
        cy.visit('/')
        // cy.request('/account/login')
        cy.get('.btn').click()
    })

    it('should be able to visit Create New Security page', () => {
        cy.contains('Securities')
        cy.visit('/securities/create')
    })

    it('should have Create New Security buttons', () => {
        cy.contains('Securities')
        cy.visit('/securities/create')
        cy.get('.d-flex > .btn')
        cy.get('.breadcrumb > :nth-child(3) > a')
    })

    it('Create New Security button should be clickable', () => {
        cy.get('.d-flex > .btn').click()
    })

    it('should have all fields for new security creation', () => {
        cy.contains('Securities')
        cy.visit('/securities/create')
        cy.get('#number')
        cy.get('#noteRate')
        cy.get(':nth-child(1) > .position-relative > .input-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
        cy.get(':nth-child(2) > .position-relative > .input-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
    })

    it('Save New Security button should be clickable', () => {
        cy.get(':nth-child(1) > .btn-primary').click()
    })

    it('should have Save New Security button', () => {
        cy.get(':nth-child(1) > .btn-primary')
    })



})