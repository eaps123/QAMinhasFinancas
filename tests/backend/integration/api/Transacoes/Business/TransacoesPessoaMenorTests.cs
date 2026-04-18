using Xunit;
using FluentAssertions;
using Newtonsoft.Json.Linq;
using System.Net;

public class TransacoesPessoaMenorTests : BaseTest
{
    public TransacoesPessoaMenorTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task NaoDevePermitirReceitaParaMenorDeIdade()
    {
        var pessoaResp = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "Menor",
            dataNascimento = DateTime.Now.AddYears(-10).ToString("yyyy-MM-dd")
        });
        var pessoa = JObject.Parse(await pessoaResp.Content.ReadAsStringAsync());
        var categoriaResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Salário",
            finalidade = 1
        });
        var categoria = JObject.Parse(await categoriaResp.Content.ReadAsStringAsync());
        var response = await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Salário",
            valor = 1000,
            tipo = 1,
            categoriaId = categoria["id"],
            pessoaId = pessoa["id"],
            data = DateTime.Now
        });
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
    [Fact]
    public async Task DevePermitirDespesaParaMenorDeIdade()
    {
        var pessoaResp = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "Menor",
            dataNascimento = DateTime.Now.AddYears(-10).ToString("yyyy-MM-dd")
        });
        var pessoa = JObject.Parse(await pessoaResp.Content.ReadAsStringAsync());
        var categoriaResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Lanche",
            finalidade = 2
        });
        var categoria = JObject.Parse(await categoriaResp.Content.ReadAsStringAsync());
        var response = await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Lanche",
            valor = 50,
            tipo = 2,
            categoriaId = categoria["id"],
            pessoaId = pessoa["id"],
            data = DateTime.Now
        });
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
    [Fact]
    public async Task DevePermitirReceitaParaMaiorDeIdade()
    {
        var pessoaResp = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "Adulto",
            dataNascimento = DateTime.Now.AddYears(-30).ToString("yyyy-MM-dd")
        });
        var pessoa = JObject.Parse(await pessoaResp.Content.ReadAsStringAsync());
        var categoriaResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Salário",
            finalidade = 1
        });
        var categoria = JObject.Parse(await categoriaResp.Content.ReadAsStringAsync());
        var response = await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Salário",
            valor = 2000,
            tipo = 1,
            categoriaId = categoria["id"],
            pessoaId = pessoa["id"],
            data = DateTime.Now
        });
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}