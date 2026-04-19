1.  BUG: API permite criação de transação com data futura
    Esperado: 400 BadRequest
    Atual: 201 Created

2.  BUG: API retorna 500 ao validar regra de menor de idade
    Esperado: 400
    Atual: 500