import 'cypress-file-upload';
import { faker } from '@faker-js/faker';

describe('Cadastro de Produto no Front', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Deve cadastrar um produto com sucesso', () => {
        const produto = {
            nome: faker.commerce.productName(),
            preco: faker.number.int({ min: 1, max: 50 }),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 50 }),
          };
        cy.get('[data-testid="cadastrarProdutos"]').click();

        cy.get('input[data-testid="nome"]').type(produto.nome);
        cy.get('input[data-testid="preco"]').type(produto.preco.toString());
        cy.get('[data-testid="descricao"]').type(produto.descricao);
        cy.get('[data-testid="quantity"]').type(produto.quantidade.toString());
        cy.get('[data-testid="imagem"]').attachFile('imagem-teste.jpg');

        cy.get('button[data-testid="cadastarProdutos"]').click();

        cy.get('h1').contains('Lista dos Produtos').should('be.visible');
    });
});
