Melhorias automação:

1. Fazer o modal se tornar um componente modular, juntamente com os botões usados;
2. Alocar as mensagens de retorno mapeadas em um unico local;
3. Criar as tasks abaixo:
NaoDeveConsiderarTransacoesForaDoPeriodo()
DeveRetornarSaldoNegativo_QuandoDespesasMaiorQueReceitas()
DeveSepararTotaisPorPessoa()
DeveAgruparCorretamentePorCategoria()
4. 

Melhorias para desenvolvedores:

1. Ajustar a tabela de dados, para cada coluna com dados ter um ID, ou alguma forma de localizar via linha e coluna os dados dentro da tabela.
2. Adicionar validação no cadastro de pessoas para pessoas com nome e data de nascimento válidos.
3. Adicionar toast para quando uma pessoa é deletada/excluída.
4. Adicionar possibilidade de ordenação por coluna nas tabelas de dados.
5. Ajustar tratativa de retorno:
Como Está:
    INVALID_DATE: 'Invalid input: expected date, received Date',
    INVALID_VALUE: 'Invalid input: expected number, received NaN',
    INVALID_STRING: 'Invalid input: expected string, received undefined',
Exemplo de Como deveria ser:
    'Data é obrigatória'
    'Informe um valor'
    'Pessoa é obrigatório'
    'Informe uma categoria'
    

## Testes Unitários

Como o código da aplicação não pode ser comitado junto ao projeto, os testes unitários foram implementados simulando as regras de negócio com base nos requisitos fornecidos.

Esses testes validam:
- Restrição de receita para menores de idade
- Comportamento esperado das regras isoladamente

As validações reais foram garantidas através de testes de integração (API).