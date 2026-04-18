public class PessoasDeleteTests : BaseTest
{
    public PessoasDeleteTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveDeletarPessoa()
    {
        var pessoa = PessoaBuilder.CriarValida();
        var create = await _client.PostAsJsonAsync("/api/v1/Pessoas", pessoa);
        var created = JObject.Parse(await create.Content.ReadAsStringAsync());
        var response = await _client.DeleteAsync($"/api/v1/Pessoas/{created["id"]}");
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
    }
    [Fact]
    public async Task NaoDeveEncontrarPessoaAposDeletar()
    {
        var pessoa = PessoaBuilder.CriarValida();
        var create = await _client.PostAsJsonAsync("/api/v1/Pessoas", pessoa);
        var created = JObject.Parse(await create.Content.ReadAsStringAsync());
        await _client.DeleteAsync($"/api/v1/Pessoas/{created["id"]}");
        var get = await _client.GetAsync($"/api/v1/Pessoas/{created["id"]}");
        get.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}