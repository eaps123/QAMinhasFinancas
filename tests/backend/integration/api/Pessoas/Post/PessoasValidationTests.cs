using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
public class PessoasValidationTests : BaseTest
{
    public PessoasValidationTests(ApiFixture fixture) : base(fixture) { }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task NaoDeveCriarSemNome(string nome)
    {
        var response = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome,
            dataNascimento = "2000-01-01"
        });

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
    [Fact]
    public async Task NaoDeveCriarComDataFutura()
    {
        var response = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "Teste",
            dataNascimento = DateTime.Now.AddYears(1).ToString("yyyy-MM-dd")
        });
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
}