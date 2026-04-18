public class BaseTest : IClassFixture<ApiFixture>
{
    protected readonly HttpClient _client;
    public BaseTest(ApiFixture fixture)
    {
        _client = fixture.Client;
    }
}