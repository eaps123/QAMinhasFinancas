public class PessoasCreateTests : BaseTest
{
    public PessoasCreateTests(ApiFixture fixture) : base(fixture) { }

    [Fact]
    public async Task DeveCriarPessoa()
    {
        var pessoa = PessoaBuilder.CriarValida();

        var response = await _client.PostAsJsonAsync("/api/v1/Pessoas", pessoa);

        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}