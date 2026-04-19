using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;

public class CategoriasValidationTests : BaseTest
{
    public CategoriasValidationTests(ApiFixture fixture) : base(fixture) { }
    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task NaoDeveCriarSemDescricao(string descricao)
    {
        var response = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao,
            finalidade = 1
        });
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
}