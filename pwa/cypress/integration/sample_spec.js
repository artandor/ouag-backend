describe('My First Test', () => {
  it('visits the Homepage', () => {
    cy.visit('/')
    cy.contains('Login / Register').click()
    cy.url().should('include', '/users/login')
  })

  it('sets auth cookie when logging in via form submission', () => {
    cy.visit('/users/login')
    cy.get('input[name=email]').type("user@example.com")
    cy.get('input[name=plainPassword]').type(`seCrEt{enter}`)
    cy.url().should('include', '/users/profile')
    cy.getCookie('NEXT_LOCALE').should('exist')
    cy.getCookie('NEXT_LOCALE').should('have.property', 'value', 'en')
    // TODO : assert token JWT exists
  })

  it('fails login because of wrong credentials', () => {
    cy.visit('/users/login')
    cy.get('input[name=email]').type("user@example.test")
    cy.get('input[name=plainPassword]').type(`seCrT{enter}`)
    cy.url().should('include', '/users/login')
    // TODO : Refactor this to use a more precise div
    cy.get('div').should('contain', 'Wrong credentials or this account doesn\'t exist.')
  })

  /*  it('updates the user profile', () => {
      cy.visit('/users/login')
      cy.get('input[name=email]').type("user@example.com")
      cy.get('input[name=plainPassword]').type(`seCrEt{enter}`)
      // TODO : Find the first button to contain edit or use an id to target the good edit button
      cy.contains('.btn-warning').click()
      cy.get('select').select('fr').should('have.value', 'fr')
    })*/
})
