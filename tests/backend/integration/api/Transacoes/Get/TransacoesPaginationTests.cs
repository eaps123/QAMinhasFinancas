public class TransacoesPaginationTests : BaseTest
{
    public TransacoesPaginationTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveRespeitarPageSize()
    {
        var response = await _client.GetAsync("/api/v1/Transacoes?pageSize=5");
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        json["items"].Count().Should().BeLessOrEqualTo(5);
    }
}