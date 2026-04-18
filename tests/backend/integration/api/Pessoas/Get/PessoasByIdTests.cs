public class PessoasByIdTests : BaseTest
{
    public PessoasByIdTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRetornarPessoaPorId()
    {
        var pessoa = PessoaBuilder.CriarValida();
        var create = await _client.PostAsJsonAsync("/api/v1/Pessoas", pessoa);
        var created = JObject.Parse(await create.Content.ReadAsStringAsync());
        var response = await _client.GetAsync($"/api/v1/Pessoas/{created["id"]}");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
    [Fact]
    public async Task DeveRetornar404_QuandoIdNaoExistir()
    {
        var response = await _client.GetAsync($"/api/v1/Pessoas/{Guid.NewGuid()}");
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}