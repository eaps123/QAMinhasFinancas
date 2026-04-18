public class TransacoesCreateTests : BaseTest
{
    public TransacoesCreateTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveCriarTransacao()
    {
        var transacao = await TransacaoBuilder.CriarValida(_client);
        var response = await _client.PostAsJsonAsync("/api/v1/Transacoes", transacao);
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}