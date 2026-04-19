using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
public class BaseTest : IClassFixture<ApiFixture>
{
    protected readonly HttpClient _client;
    public BaseTest(ApiFixture fixture)
    {
        _client = fixture.Client;
    }
}