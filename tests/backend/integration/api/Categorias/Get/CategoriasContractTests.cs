using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;

public class CategoriasContractTests : BaseTest
{
    public CategoriasContractTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRetornarEstruturaCorreta()
    {
        var response = await _client.GetAsync("/api/v1/Categorias");
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var json = JObject.Parse(content);
        json["items"].Should().NotBeNull();
        json["totalCount"].Should().NotBeNull();
        json["page"].Should().NotBeNull();
        json["pageSize"].Should().NotBeNull();
    }
}