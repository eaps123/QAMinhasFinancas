using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
public class TransacoesContractTests : BaseTest
{
    public TransacoesContractTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRetornarEstruturaCorreta()
    {
        var response = await _client.GetAsync("/api/v1/Transacoes");
        response.EnsureSuccessStatusCode();
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        json["items"].Should().NotBeNull();
        json["items"][0]["descricao"].Should().NotBeNull();
        json["items"][0]["valor"].Should().NotBeNull();
        json["items"][0]["pessoaNome"].Should().NotBeNull();
    }
}