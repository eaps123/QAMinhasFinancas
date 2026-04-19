using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;

public class CategoriasPaginationTests : BaseTest
{
    public CategoriasPaginationTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRespeitarPageSize()
    {
        var response = await _client.GetAsync("/api/v1/Categorias?pageSize=5");
        var content = await response.Content.ReadAsStringAsync();
        var json = JObject.Parse(content);
        json["items"].Count().Should().BeLessThanOrEqualTo(5);
    }
}