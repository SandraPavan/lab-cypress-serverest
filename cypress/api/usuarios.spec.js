describe('Usuários - Realizando os cenários referente gerenciar os usuários', () => {
    it('Deve criar um novo usuário com sucesso', () => {
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
          nome: 'João QA',
          email: `joaoqa_${Date.now()}@teste.com`,
          password: 'teste123',
          administrador: 'true'
        }
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        expect(res.body).to.have.property('_id');
      });
    });
    it('Não deve permitir criar usuário com e-mail duplicado', () => {
      const emailDuplicado = `duplicado_${Date.now()}@teste.com`;

      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
          nome: 'Usuário 1',
          email: emailDuplicado,
          password: '123456',
          administrador: 'false'
        }
      });
  
      cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false, 
        body: {
          nome: 'Usuário 2',
          email: emailDuplicado,
          password: '123456',
          administrador: 'false'
        }
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Este email já está sendo usado');
      });
    });
    it('Deve retornar lista de usuários', () => {
      cy.request('GET', '/usuarios').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('usuarios');
        expect(res.body.usuarios.length).to.be.greaterThan(0);
      });
    });
    it('Deve retornar usuário específico', () => {
      // Cria usuário para pegar o ID
      cy.request('POST', '/usuarios', {
        nome: 'Maria QA',
        email: `maria_${Date.now()}@teste.com`,
        password: 'abc123',
        administrador: 'false'
      }).then((res) => {
        const userId = res.body._id;
  
        cy.request(`GET`, `/usuarios/${userId}`).then((resGet) => {
          expect(resGet.status).to.eq(200);
          expect(resGet.body).to.have.property('nome', 'Maria QA');
        });
      });
    });
    it('Deve atualizar um usuário existente', () => {
      cy.request('POST', '/usuarios', {
        nome: 'Update Teste',
        email: `update_${Date.now()}@teste.com`,
        password: 'senha123',
        administrador: 'true'
      }).then((res) => {
        const id = res.body._id;
  
        cy.request('PUT', `/usuarios/${id}`, {
          nome: 'Usuário Atualizado',
          email: `update_new_${Date.now()}@teste.com`,
          password: 'novaSenha',
          administrador: 'false'
        }).then((resUpdate) => {
          expect(resUpdate.status).to.eq(200);
          expect(resUpdate.body.message).to.eq('Registro alterado com sucesso');
        });
      });
    });
    it('Deve deletar um usuário existente', () => {
      cy.request('POST', '/usuarios', {
        nome: 'Delete Me',
        email: `delete_${Date.now()}@teste.com`,
        password: '123123',
        administrador: 'true'
      }).then((res) => {
        const id = res.body._id;
  
        cy.request('DELETE', `/usuarios/${id}`).then((resDel) => {
          expect(resDel.status).to.eq(200);
          expect(resDel.body.message).to.eq('Registro excluído com sucesso');
        });
      });
    });
  });