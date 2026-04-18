using Xunit;
using FluentAssertions;
using Newtonsoft.Json.Linq;

public class PessoasContractTests : BaseTest
{
    public PessoasContractTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRetornarEstruturaCorreta()
    {
        var response = await _client.GetAsync("/api/v1/Pessoas");
        response.EnsureSuccessStatusCode();
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        json["items"].Should().NotBeNull();
        json["items"][0]["nome"].Should().NotBeNull();
        json["items"][0]["idade"].Should().NotBeNull();
    }
}