describe('Produtos - Realizando os cenários referente gerenciar os produtos', () => {
    beforeEach(() => {
        cy.loginApi(); 
      });
    it('Deve criar um novo produto com sucesso', () => {
      cy.request({
        method: 'POST',
        url: '/produtos',
        headers: {
          authorization: Cypress.env('TOKEN')
        },
        body: {
          nome: `Produto QA ${Date.now()}`,
          preco: 150,
          descricao: 'Produto de teste automatizado',
          quantidade: 10
        }
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        expect(res.body).to.have.property('_id');
      });
    });
    it('Não deve permitir criar produto com nome já existente', () => {
        const nomeDuplicado = `Produto Duplicado ${Date.now()}`;
    
        // Cria produto inicial
        cy.request({
          method: 'POST',
          url: '/produtos',
          headers: {
            authorization: Cypress.env('TOKEN')
          },
          body: {
            nome: nomeDuplicado,
            preco: 200,
            descricao: 'Produto original',
            quantidade: 5
          }
        });
    
        cy.request({
          method: 'POST',
          url: '/produtos',
          failOnStatusCode: false,
          headers: {
            authorization: Cypress.env('TOKEN')
          },
          body: {
            nome: nomeDuplicado,
            preco: 250,
            descricao: 'Produto duplicado',
            quantidade: 3
          }
        }).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Já existe produto com esse nome');
        });
      });
      it('Deve retornar todos os produtos', () => {
        cy.request('GET', '/produtos').then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.produtos).to.be.an('array');
        });
      });
      it('Deve buscar um produto específico pelo ID', () => {
        const nomeProduto = `Produto ID ${Date.now()}`;

        cy.request({
          method: 'POST',
          url: '/produtos',
          headers: {
            authorization: Cypress.env('TOKEN')
          },
          body: {
            nome: nomeProduto,
            preco: 500,
            descricao: 'Produto teste ID',
            quantidade: 15
          }
        }).then((res) => {
          const id = res.body._id;
    
          cy.request(`GET`, `/produtos/${id}`).then((resGet) => {
            expect(resGet.status).to.eq(200);
            expect(resGet.body).to.have.property('nome', nomeProduto);
          });
        });
      });
      it('Deve atualizar um produto existente', () => {
        const nomeOriginal = `Produto Original ${Date.now()}`;
    
        cy.request({
          method: 'POST',
          url: '/produtos',
          headers: {
            authorization: Cypress.env('TOKEN')
          },
          body: {
            nome: nomeOriginal,
            preco: 300,
            descricao: 'Produto para update',
            quantidade: 8
          }
        }).then((res) => {
          const id = res.body._id;
    
          cy.request({
            method: 'PUT',
            url: `/produtos/${id}`,
            headers: {
              authorization: Cypress.env('TOKEN')
            },
            body: {
              nome: `Produto Atualizado ${Date.now()}`,
              preco: 350,
              descricao: 'Produto atualizado com sucesso',
              quantidade: 10
            }
          }).then((resPut) => {
            expect(resPut.status).to.eq(200);
            expect(resPut.body.message).to.eq('Registro alterado com sucesso');
          });
        });
      });
      it('Deve deletar um produto existente', () => {
        cy.request({
          method: 'POST',
          url: '/produtos',
          headers: {
            authorization: Cypress.env('TOKEN')
          },
          body: {
            nome: `Produto Delete ${Date.now()}`,
            preco: 99,
            descricao: 'Produto para deletar',
            quantidade: 4
          }
        }).then((res) => {
          const id = res.body._id;
    
          cy.request({
            method: 'DELETE',
            url: `/produtos/${id}`,
            headers: {
              authorization: Cypress.env('TOKEN')
            }
          }).then((resDel) => {
            expect(resDel.status).to.eq(200);
            expect(resDel.body.message).to.eq('Registro excluído com sucesso');
          });
        });
      });
  });