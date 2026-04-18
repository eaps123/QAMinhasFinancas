public class TotaisCategoriasCalculoTests : BaseTest
{
    public TotaisCategoriasCalculoTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveCalcularTotaisPorCategoria()
    {
        var categoriaResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Mercado",
            finalidade = 2
        });
        var categoria = JObject.Parse(await categoriaResp.Content.ReadAsStringAsync());
        var pessoaResp = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "João",
            dataNascimento = "1990-01-01"
        });
        var pessoa = JObject.Parse(await pessoaResp.Content.ReadAsStringAsync());
        await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Compra",
            valor = 200,
            tipo = 2,
            categoriaId = categoria["id"],
            pessoaId = pessoa["id"],
            data = DateTime.Now
        });
        var response = await _client.GetAsync("/api/v1/Totais/categorias");
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        var item = json["items"][0];
        item["totalDespesas"].Value<decimal>().Should().Be(200);
    }
    [Fact]
    public async Task DeveRetornarSaldoNegativo_QuandoDespesasMaiorQueReceitas()
    { }
    [Fact]
    public async Task DeveSepararTotaisPorPessoa()
    { }
    [Fact]
    public async Task DeveAgruparCorretamentePorCategoria()
    { }
}