using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;

public class TransacoesCreateTests : BaseTest
{
    public TransacoesCreateTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveCriarTransacao()
    {
        var transacao = await TransacaoBuilder.CriarValida(_client);
        var response = await _client.PostAsJsonAsync("/api/v1/Transacoes", transacao);
        var content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}