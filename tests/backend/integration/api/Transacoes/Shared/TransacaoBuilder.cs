public static class TransacaoBuilder
{
    public static async Task<object> CriarValida(HttpClient client)
    {
        var pessoaResponse = await client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "Pessoa Teste",
            dataNascimento = DateTime.Now.AddYears(-30).ToString("yyyy-MM-dd")
        });
        var pessoa = JObject.Parse(await pessoaResponse.Content.ReadAsStringAsync());
        var categoriaResponse = await client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Categoria Teste",
            finalidade = 1
        });
        var categoria = JObject.Parse(await categoriaResponse.Content.ReadAsStringAsync());
        return new
        {
            descricao = "Transação Teste",
            valor = 100,
            tipo = 1,
            categoriaId = categoria["id"],
            pessoaId = pessoa["id"],
            data = DateTime.Now
        };
    }
}