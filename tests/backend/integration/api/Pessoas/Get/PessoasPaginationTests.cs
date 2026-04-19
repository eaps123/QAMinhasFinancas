using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
public class PessoasPaginationTests : BaseTest
{
    public PessoasPaginationTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRespeitarPageSize()
    {
        var response = await _client.GetAsync("/api/v1/Pessoas?pageSize=5");
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        json["items"].Count().Should().BeLessThanOrEqualTo(5);
    }
}