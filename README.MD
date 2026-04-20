# QA Minhas Finanças - Test Automation

Projeto de automação de testes para um sistema de controle financeiro, com foco em validação de regras de negócio via testes de API e fluxos E2E.

---

## Melhorias identificadas

### Automação

1. Tornar o modal um componente reutilizável (incluindo ações como salvar, cancelar, confirmar).
2. Centralizar todas as mensagens de retorno em um único arquivo de constantes.
3. Criar testes adicionais de regras de negócio:
   - NaoDeveConsiderarTransacoesForaDoPeriodo
   - DeveRetornarSaldoNegativo_QuandoDespesasMaiorQueReceitas
   - DeveSepararTotaisPorPessoa
   - DeveAgruparCorretamentePorCategoria

---

### Aplicação (pontos para melhoria)

1. Melhorar a identificação dos elementos da tabela (IDs ou data-testid por coluna/linha).
2. Adicionar validação no cadastro de pessoas (nome e data de nascimento obrigatórios).
3. Exibir feedback ao usuário ao excluir uma pessoa (toast de sucesso).
4. Permitir ordenação por coluna nas tabelas.
5. Padronizar mensagens de erro retornadas pela API.

Exemplo atual:

INVALID_DATE: 'Invalid input: expected date, received Date'
INVALID_VALUE: 'Invalid input: expected number, received NaN',
INVALID_STRING: 'Invalid input: expected string, received undefined',

Sugestão:

Data é obrigatória
Informe um valor válido
Pessoa é obrigatória
Informe uma categoria

---

## Testes unitários

Como o código da aplicação não faz parte deste repositório, os testes unitários foram criados simulando regras de negócio com base nos requisitos.

Esses testes cobrem:
- Restrição de receita para menores de idade
- Comportamento esperado de validações isoladas

As regras reais foram validadas principalmente através dos testes de integração (API).

---

## Como rodar o projeto

### Pré-requisitos

- .NET 9 SDK
- Node.js
- Git

---

### Testes de API (xUnit)

Na pasta de testes:

```bash
dotnet test

Para rodar um projeto específico:

dotnet test Tests/Tests.csproj
Testes E2E (Playwright)

Instalar dependências:

npm install

Instalar os browsers:

npx playwright install

Executar os testes:

npx playwright test

Modo interativo:

npx playwright test --ui

Visualizar relatório:

npx playwright show-report
Estratégia de testes

A estrutura segue a pirâmide de testes.

Testes unitários

Focados em regras isoladas e validações simples.

Testes de integração

Cobrem os endpoints da API, incluindo:

CRUD de entidades
Validações de negócio
Códigos de retorno HTTP
Testes E2E

Utilizados apenas para fluxos principais:

Cadastro de pessoa
Criação de transações
Validação em relatórios
Exclusão e impacto nos dados

A ideia foi evitar dependência excessiva de UI e concentrar validações críticas na API.

Bugs e comportamentos identificados
Atraso na atualização do relatório
Após exclusão de dados, o relatório pode continuar exibindo informações antigas por alguns segundos.
Indica processamento assíncrono (consistência eventual).
Inconsistência em cálculos de totais
Diferença entre valores esperados e retornados em alguns cenários.
Validação de data futura
Em alguns casos, a API permite criação (201) quando deveria retornar erro (400).
Regra de menor de idade
Retorno 500 ao invés de 400 em validações de negócio.
Decisões de teste
Prioridade para testes de API pela estabilidade e velocidade.
Uso de E2E apenas para validar fluxos completos.
Utilização de dados dinâmicos para evitar conflitos entre execuções.
Implementação de paginação nos testes para simular comportamento real do usuário.
Uso de retry em cenários onde há consistência eventual (principalmente relatórios).
Tecnologias utilizadas
.NET 9
xUnit
FluentAssertions
Playwright
Faker
TypeScript
Autor

## Estrutura de pastas

A organização do projeto foi pensada para separar responsabilidades entre tipos de testes e facilitar manutenção.

.
├── Tests
│   ├── backend
│   │   ├── integration
│   │   │   ├── api
│   │   │   │   ├── Categorias
│   │   │   │   ├── Pessoas
│   │   │   │   ├── Relatorios
│   │   │   │   └── Transacoes
│   ├── unit
│
├── e2e
│   ├── tests
│   ├── components
│   ├── fixtures
│   ├── utils
│
├── playwright.config.ts
└── README.md

### Backend (Testes de API)

- **integration/api**  
  Contém os testes de integração que validam os endpoints da aplicação.  
  A organização foi feita por domínio:
  - Categorias
  - Pessoas
  - Transações
  - Relatórios

  Cada pasta agrupa testes relacionados às regras daquele contexto.

- **unit**  
  Contém testes unitários simulando regras de negócio com base nos requisitos, já que o código da aplicação não faz parte do projeto.

---

### E2E (Playwright)

- **tests**  
  Contém os cenários E2E completos (fluxos do usuário), como criação de pessoa, transações e validação de relatórios.

- **components**  
  Implementação de componentes reutilizáveis (ex: modal, paginação, formulários).  
  Ajuda a evitar duplicação de código e facilita manutenção.

- **fixtures**  
  Centraliza setup de testes (injeção de dependências como page, helpers, etc).

- **utils**  
  Funções auxiliares (ex: geração de dados, helpers genéricos).

---

### Arquivos principais

- **playwright.config.ts**  
  Configuração global do Playwright (timeouts, retries, browsers, etc).

- **README.md**  
  Documentação do projeto e instruções de execução.

---

### Observações

- A separação entre API e E2E foi intencional para manter independência entre os tipos de teste.
- Componentes foram extraídos para reduzir acoplamento com os testes.
- A estrutura permite escalar facilmente adicionando novos cenários ou endpoints.

Everton Alves Pedro