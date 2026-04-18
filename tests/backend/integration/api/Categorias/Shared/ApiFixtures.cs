using Microsoft.AspNetCore.Mvc.Testing;

public class ApiFixture
{
    public HttpClient Client { get; }

    public ApiFixture()
    {
        var factory = new WebApplicationFactory<Program>();
        Client = factory.CreateClient();
    }
}