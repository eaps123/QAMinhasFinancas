using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
public class ApiFixture
{
    public HttpClient Client { get; }
    public ApiFixture()
    {
        Client = new HttpClient
        {
            BaseAddress = new Uri("http://localhost:5000")
        };
    }
}