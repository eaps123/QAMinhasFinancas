using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;

public class TotaisCategoriasCalculoTests : BaseTest
{
    public TotaisCategoriasCalculoTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveCalcularTotaisPorCategoria()
    {
        var categoriaResp = await _client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Mercado",
            finalidade = 2
        });
        categoriaResp.StatusCode.Should().Be(HttpStatusCode.Created);
        var categoria = JObject.Parse(await categoriaResp.Content.ReadAsStringAsync());
        var pessoaResp = await _client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "João",
            dataNascimento = "1990-01-01"
        });
        pessoaResp.StatusCode.Should().Be(HttpStatusCode.Created);
        var pessoa = JObject.Parse(await pessoaResp.Content.ReadAsStringAsync());
        var transacaoResp = await _client.PostAsJsonAsync("/api/v1/Transacoes", new
        {
            descricao = "Compra",
            valor = 200,
            tipo = 1,
            categoriaId = categoria["id"]!.ToString(),
            pessoaId = pessoa["id"]!.ToString(),
            data = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss")
        });

        var content = await transacaoResp.Content.ReadAsStringAsync();
        Console.WriteLine(content);
        transacaoResp.StatusCode.Should().Be(HttpStatusCode.Created);
        var response = await _client.GetAsync("/api/v1/Totais/categorias");
        var json = JObject.Parse(await response.Content.ReadAsStringAsync());
        var item = json["items"]
    .First(x => x["categoriaId"]!.ToString() == categoria["id"]!.ToString());
        item["totalDespesas"].Value<decimal>().Should().Be(200);
    }
}