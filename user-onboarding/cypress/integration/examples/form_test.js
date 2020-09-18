describe('User Onboarding Project Page', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })
    
    const nameInput = () => cy.get('input[type=text]');
    const emailInput = () => cy.get('input[type=email]')
    const passwordInput = () => cy.get('input[type=password]')
    const checkboxInput = () => cy.get('input[type=checkbox]');
    const submit = () => 
        cy.get('button')
    

    it('testing', () => {
        nameInput().should('exist')
        emailInput().should('exist')
        passwordInput().should('exist')
        checkboxInput().should('exist')
    })

    it('testing inputs', () => {
        nameInput().type('Sam Tarullo').should('have.value', 'Sam Tarullo');

        emailInput().type('starullo87@gmail.com').should('have.value', 'starullo87@gmail.com');

        passwordInput().type('password').should('have.value', 'password')

        checkboxInput().check();

        submit().click();

        nameInput().should('not.have.value', '')

        emailInput().should('not.have.value', '')

        passwordInput().should('not.have.value', '')

        checkboxInput().should('not.have.value', 'false')

    })
    
    it('checking for validation', () => {
        passwordInput()
        .type('ccccccc')
        cy.contains('Password must be at least 8 characters long').should('exist')
        passwordInput().clear();
    });

})

