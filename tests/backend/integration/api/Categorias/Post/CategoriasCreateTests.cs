using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;

public class CategoriasCreateTests : BaseTest
{
    public CategoriasCreateTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveCriarCategoria()
    {
        var categoria = CategoriaBuilder.CriarValida();
        var response = await _client.PostAsJsonAsync("/api/v1/Categorias", categoria);
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}