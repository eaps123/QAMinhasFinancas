using Xunit;
using FluentAssertions;
using Newtonsoft.Json.Linq;

public class TotaisCategoriasContractTests : BaseTest
{
    public TotaisCategoriasContractTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRetornarEstruturaCorreta()
    {
        var response = await _client.GetAsync("/api/v1/Totais/categorias");
        response.EnsureSuccessStatusCode();
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        json["items"].Should().NotBeNull();
        json["totalCount"].Should().NotBeNull();
        json["page"].Should().NotBeNull();
        json["pageSize"].Should().NotBeNull();
        var item = json["items"].First;
        item["categoriaId"].Should().NotBeNull();
        item["descricao"].Should().NotBeNull();
        item["totalReceitas"].Should().NotBeNull();
        item["totalDespesas"].Should().NotBeNull();
        item["saldo"].Should().NotBeNull();
    }
}