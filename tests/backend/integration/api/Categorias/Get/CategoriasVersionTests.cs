using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;

public class CategoriasVersionTests : BaseTest
{
    public CategoriasVersionTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveFalharSemVersao()
    {
        var response = await _client.GetAsync("/api/Categorias");
        response.StatusCode.Should().NotBe(HttpStatusCode.OK);
    }
}