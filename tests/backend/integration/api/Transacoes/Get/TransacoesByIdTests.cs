public class TransacoesByIdTests : BaseTest
{
    public TransacoesByIdTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRetornarTransacaoPorId()
    {
        var transacao = await TransacaoBuilder.CriarValida(_client);
        var create = await _client.PostAsJsonAsync("/api/v1/Transacoes", transacao);
        var created = JObject.Parse(await create.Content.ReadAsStringAsync());
        var response = await _client.GetAsync($"/api/v1/Transacoes/{created["id"]}");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
    [Fact]
    public async Task DeveRetornar404_QuandoNaoExistir()
    {
        var response = await _client.GetAsync($"/api/v1/Transacoes/{Guid.NewGuid()}");
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}