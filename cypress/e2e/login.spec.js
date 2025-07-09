describe('Testes de Login', () => {
    it('Deve fazer login com sucesso', () => {
     cy.login();
    })
  
    it('Deve exibir mensagem de erro com dados inválidos', () => {
     cy.visit(`/login`)
      
      cy.get('input[data-testid="email"]').type('invalido@teste.com')
      cy.get('input[data-testid="senha"]').type('senhaerrada')
      cy.get('button[data-testid="entrar"]').click()
  
      cy.contains('Email e/ou senha inválidos').should('be.visible')
    })
  })