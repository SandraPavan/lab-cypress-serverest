# Cypress Serverest

Este projeto utiliza o framework [Cypress](https://www.cypress.io/) para realizar testes automatizados em APIs e interfaces de usuário, utilizando como referencia [Serverest](https://serverest.dev/)

## Estrutura do Projeto

Abaixo está a estrutura principal do projeto e a descrição de cada pasta/arquivo:

```
.env                     # Arquivo de configuração de variáveis de ambiente
cypress.config.js        # Configuração principal do Cypress
package.json             # Dependências e scripts do projeto
readme.md                # Documentação do projeto
cypress/
    api/                 # Testes de API
        produtos.spec.js  # Testes relacionados a produtos
        usuarios.spec.js  # Testes relacionados a usuários
    downloads/           # Diretório para arquivos baixados durante os testes
    e2e/                 # Testes de ponta a ponta (E2E)
        login.spec.js     # Testes de login
        produtos.spec.js  # Testes de produtos na interface
    fixtures/            # Arquivos estáticos usados nos testes (ex.: imagens, JSONs)
        imagem-teste.jpg # Exemplo de imagem para testes
    reports/             # Relatórios gerados pelos testes
        mochawesome/     # Relatórios no formato HTML e JSON
    screenshots/         # Capturas de tela geradas durante os testes
    support/             # Arquivos de suporte para customizações do Cypress
        commands.js      # Comandos customizados do Cypress
        e2e.js           # Configurações globais para testes E2E
```

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Gerenciador de pacotes npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd cypress-serverest
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`.

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias. Exemplo:

```
BASE_URL_FRONT=http://localhost:3000
BASE_URL=http://localhost:3000
EMAIL=usuario@teste.com
SENHA=senha123
```

## Executando os Testes

### Testes de API
Para executar os testes de API, use o seguinte comando:
```bash
npm run test:api
```

### Testes E2E
Para executar os testes de ponta a ponta:
```bash
npm run test:e2e
```

### Executando no Modo Interativo
Para abrir o Cypress no modo interativo:
```bash
npx cypress open
```

## Relatórios de Testes

Os relatórios dos testes são gerados automaticamente na pasta `cypress/reports/mochawesome`. Para visualizar os relatórios em HTML, abra os arquivos `.html` no navegador.

## Personalização

- **Comandos Customizados**: Adicione ou edite comandos no arquivo `cypress/support/commands.js`.
- **Configurações Globais**: Ajuste configurações globais no arquivo `cypress/support/e2e.js`.

## Erros Comuns e Soluções

- **Erro: `cy.type()` com valores `undefined`**  
  Certifique-se de que as variáveis de ambiente estão configuradas corretamente no arquivo `.env`.

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça o commit das suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
