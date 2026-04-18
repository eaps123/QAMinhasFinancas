public class TransacoesValidationTests : BaseTest
{
    public TransacoesValidationTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task NaoDeveCriarComValorNegativo()
    {
        var transacao = await TransacaoBuilder.CriarValida(_client);
        var payload = new
        {
            descricao = "Teste",
            valor = -100,
            tipo = 1,
            categoriaId = transacao.GetType().GetProperty("categoriaId")?.GetValue(transacao),
            pessoaId = transacao.GetType().GetProperty("pessoaId")?.GetValue(transacao),
            data = DateTime.Now
        };
        var response = await _client.PostAsJsonAsync("/api/v1/Transacoes", payload);
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
    [Fact]
    public async Task NaoDeveCriarComCategoriaInvalida()
    {
        var pessoa = PessoaBuilder.CriarValida();
        var pessoaResp = await _client.PostAsJsonAsync("/api/v1/Pessoas", pessoa);
        var pessoaJson = JObject.Parse(await pessoaResp.Content.ReadAsStringAsync());
        var response = await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Teste",
            valor = 100,
            tipo = 1,
            categoriaId = Guid.NewGuid(),
            pessoaId = pessoaJson["id"],
            data = DateTime.Now
        });
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
    [Fact]
    public async Task NaoDeveCriarComPessoaInvalida()
    {
        var categoriaResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Teste",
            finalidade = 1
        });
        var categoria = JObject.Parse(await categoriaResp.Content.ReadAsStringAsync());
        var response = await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Teste",
            valor = 100,
            tipo = 1,
            categoriaId = categoria["id"],
            pessoaId = Guid.NewGuid(),
            data = DateTime.Now
        });
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
    [Fact]
    public async Task NaoDeveCriarComDataFutura()
    {
        var transacao = await TransacaoBuilder.CriarValida(_client);
        var payload = new
        {
            descricao = "Teste",
            valor = 100,
            tipo = 1,
            categoriaId = transacao.GetType().GetProperty("categoriaId")?.GetValue(transacao),
            pessoaId = transacao.GetType().GetProperty("pessoaId")?.GetValue(transacao),
            data = DateTime.Now.AddDays(1)
        };
        var response = await _client.PostAsJsonAsync("/api/v1/Transacoes", payload);
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
}