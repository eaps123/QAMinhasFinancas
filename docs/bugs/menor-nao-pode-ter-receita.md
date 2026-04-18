# Bug: Menor pode cadastrar receita

## Descrição
Sistema permite que menores de idade criem transações do tipo receita.

## Passos
1. Criar pessoa com 15 anos
2. Criar transação do tipo receita

## Resultado esperado
Deveria bloquear

## Resultado atual
Permite criação

## Severidade
Alta

## Bug - Menor de idade pode receber receita

- Endpoint: POST /Transacoes
- Problema: sistema permite criar receita para menor de idade
- Esperado: retornar 400 BadRequest
- Impacto: quebra regra de negócio crítica
