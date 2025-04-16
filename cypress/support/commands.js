Cypress.Commands.add('loginApi', () => {
    const email = Cypress.env('EMAIL');
    const password = Cypress.env('SENHA');
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        email: email,
        password: password
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      const token = res.body.authorization;
  
      Cypress.env('TOKEN', token);
    });
  });
  
  Cypress.Commands.add('login', () => {
    const email = Cypress.env('EMAIL');
    const password = Cypress.env('SENHA');
  
    cy.visit(`${Cypress.env('baseUrlFront')}/login`);
  
    cy.get('input[data-testid="email"]').type(email);
    cy.get('input[data-testid="senha"]').type(password);
    cy.get('button[data-testid="entrar"]').click();
  
    cy.contains('Home', { timeout: 10000 }).should('be.visible');
  });