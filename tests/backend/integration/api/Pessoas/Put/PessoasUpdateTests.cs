using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
public class PessoasUpdateTests : BaseTest
{
    public PessoasUpdateTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveAtualizarPessoa()
    {
        var pessoa = PessoaBuilder.CriarValida();
        var create = await _client.PostAsJsonAsync("/api/v1/Pessoas", pessoa);
        var created = JObject.Parse(await create.Content.ReadAsStringAsync());
        var response = await _client.PutAsJsonAsync($"/api/v1/Pessoas/{created["id"]}", new
        {
            nome = "Nome Atualizado",
            dataNascimento = "1990-01-01"
        });
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
    }
    [Fact]
    public async Task DeveRetornar404_QuandoAtualizarInexistente()
    {
        var response = await _client.PutAsJsonAsync($"/api/v1/Pessoas/{Guid.NewGuid()}", new
        {
            nome = "Teste",
            dataNascimento = "2000-01-01"
        });
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}