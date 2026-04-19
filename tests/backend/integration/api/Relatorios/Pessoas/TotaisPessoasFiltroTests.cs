using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
public class TotaisPessoasFiltroTests : BaseTest
{
    public TotaisPessoasFiltroTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveFiltrarPorPeriodo()
    {
        var inicio = DateTime.Now.AddDays(-5).ToString("o");
        var fim = DateTime.Now.ToString("o");
        var response = await _client.GetAsync(
            $"/api/v1/Totais/pessoas?Periodo.DataInicio={inicio}&Periodo.DataFim={fim}");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
    [Fact]
    public async Task NaoDeveConsiderarTransacoesForaDoPeriodo()
    {
        // cria transação antiga
        // cria transação recente
        // valida que só 1 entra no cálculo
    }
}