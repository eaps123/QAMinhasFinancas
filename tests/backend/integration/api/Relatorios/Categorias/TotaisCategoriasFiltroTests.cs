using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;

public class TotaisCategoriasFiltroTests : BaseTest
{
    public TotaisCategoriasFiltroTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveFiltrarPorCategoriaId()
    {
        var response = await _client.GetAsync($"/api/v1/Totais/categorias?Categoria.Id={Guid.NewGuid()}");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
    [Fact]
    public async Task DeveRetornarApenasCategoriaFiltrada()
    {
        var catAResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Categoria A",
            finalidade = 2
        });
        var catA = JObject.Parse(await catAResp.Content.ReadAsStringAsync());
        var catBResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Categoria B",
            finalidade = 2
        });
        var catB = JObject.Parse(await catBResp.Content.ReadAsStringAsync());
        var pessoaResp = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "João",
            dataNascimento = "1990-01-01"
        });
        var pessoa = JObject.Parse(await pessoaResp.Content.ReadAsStringAsync());
        await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "A",
            valor = 100,
            tipo = 2,
            categoriaId = catA["id"],
            pessoaId = pessoa["id"],
            data = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss")
        });
        await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "B",
            valor = 200,
            tipo = 2,
            categoriaId = catB["id"],
            pessoaId = pessoa["id"],
            data = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss")
        });
        var response = await _client.GetAsync($"/api/v1/Totais/categorias?Categoria.Id={catA["id"]}");
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        var items = json["items"]!.Children();
        var item = items.FirstOrDefault(x =>
            x["categoriaId"]!.ToString() == catA["id"]!.ToString()
        );
        item.Should().NotBeNull("a categoria filtrada deve existir no retorno");
        item!["categoriaId"]!.ToString().Should().Be(catA["id"]!.ToString());
        item["totalDespesas"]!.Value<decimal>().Should().Be(100);
    }
    [Fact]
    public async Task DeveConsiderarApenasTransacoesDentroDoPeriodo()
    {
        var categoriaResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Teste",
            finalidade = 2
        });
        var categoria = JObject.Parse(await categoriaResp.Content.ReadAsStringAsync());
        var pessoaResp = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "João",
            dataNascimento = "1990-01-01"
        });
        var pessoa = JObject.Parse(await pessoaResp.Content.ReadAsStringAsync());
        await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Antiga",
            valor = 100,
            tipo = 2,
            categoriaId = categoria["id"],
            pessoaId = pessoa["id"],
            data = DateTime.Now.AddMonths(-2).ToString("yyyy-MM-ddTHH:mm:ssZ")
        });
        await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Atual",
            valor = 300,
            tipo = 2,
            categoriaId = categoria["id"],
            pessoaId = pessoa["id"],
            data = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
        });
        var inicio = DateTime.Now.AddDays(-1).ToString("yyyy-MM-ddTHH:mm:ssZ");
        var fim = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ssZ");
        var response = await _client.GetAsync(
            $"/api/v1/Totais/categorias?Periodo.DataInicio={inicio}&Periodo.DataFim={fim}");
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        var items = json["items"]!.Children();
        var item = items.FirstOrDefault(x =>
            x["categoriaId"]!.ToString() == categoria["id"]!.ToString()
        );
        item.Should().NotBeNull("a categoria deve existir no retorno");
        item!["totalDespesas"]!.Value<decimal>().Should().Be(300);
    }
}