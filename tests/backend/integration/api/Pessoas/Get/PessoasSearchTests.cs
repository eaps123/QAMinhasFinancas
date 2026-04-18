public class PessoasSearchTests : BaseTest
{
    public PessoasSearchTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveFiltrarPorNome()
    {
        var pessoa = PessoaBuilder.CriarValida();
        await _client.PostAsJsonAsync("/api/v1/Pessoas", pessoa);
        var response = await _client.GetAsync("/api/v1/Pessoas?search=João");
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("João");
    }
}