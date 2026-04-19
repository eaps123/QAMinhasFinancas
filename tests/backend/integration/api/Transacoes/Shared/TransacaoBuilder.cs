using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;

public static class TransacaoBuilder
{
    public static async Task<object> CriarValida(HttpClient client)
    {
        var pessoaResponse = await client.PostAsJsonAsync("/api/v1/Pessoas", new
        {
            nome = "Pessoa Teste",
            dataNascimento = DateTime.UtcNow.AddYears(-30)
        });
        pessoaResponse.StatusCode.Should().Be(HttpStatusCode.Created);
        var pessoa = JObject.Parse(await pessoaResponse.Content.ReadAsStringAsync());
        var categoriaResponse = await client.PostAsJsonAsync("/api/v1/Categorias", new
        {
            descricao = "Categoria Teste",
            finalidade = 1
        });
        categoriaResponse.StatusCode.Should().Be(HttpStatusCode.Created);
        var categoria = JObject.Parse(await categoriaResponse.Content.ReadAsStringAsync());
        return new
        {
            descricao = "Transação Teste",
            valor = 100,
            tipo = 1,
            categoriaId = categoria["id"]!.ToString(),
            pessoaId = pessoa["id"]!.ToString(),
            data = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss")
        };
    }
}