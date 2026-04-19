using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
public class TotaisPessoasContractTests : BaseTest
{
    public TotaisPessoasContractTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRetornarEstruturaCorreta()
    {
        var response = await _client.GetAsync("/api/v1/Totais/pessoas");
        response.EnsureSuccessStatusCode();
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        json["items"].Should().NotBeNull();
        json["items"][0]["nome"].Should().NotBeNull();
        json["items"][0]["totalReceitas"].Should().NotBeNull();
        json["items"][0]["saldo"].Should().NotBeNull();
    }
}