public class TotaisPessoasCalculoTests : BaseTest
{
    public TotaisPessoasCalculoTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveCalcularTotaisCorretamente()
    {
        var pessoaResp = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "João",
            dataNascimento = DateTime.Now.AddYears(-30).ToString("yyyy-MM-dd")
        });
        var pessoa = JObject.Parse(await pessoaResp.Content.ReadAsStringAsync());
        var catReceitaResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Salário",
            finalidade = 1
        });
        var catReceita = JObject.Parse(await catReceitaResp.Content.ReadAsStringAsync());
        var catDespesaResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Aluguel",
            finalidade = 2
        });
        var catDespesa = JObject.Parse(await catDespesaResp.Content.ReadAsStringAsync());
        await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Salário",
            valor = 1000,
            tipo = 1,
            categoriaId = catReceita["id"],
            pessoaId = pessoa["id"],
            data = DateTime.Now
        });
        await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Aluguel",
            valor = 400,
            tipo = 2,
            categoriaId = catDespesa["id"],
            pessoaId = pessoa["id"],
            data = DateTime.Now
        });
        var response = await _client.GetAsync($"/api/v1/Totais/pessoas?Pessoa.Id={pessoa["id"]}");
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        var item = json["items"][0];
        item["totalReceitas"].Value<decimal>().Should().Be(1000);
        item["totalDespesas"].Value<decimal>().Should().Be(400);
        item["saldo"].Value<decimal>().Should().Be(600);
    }
}