using Xunit;
using FluentAssertions;

public class CategoriasSearchTests : BaseTest
{
    public CategoriasSearchTests(ApiFixture fixture) : base(fixture) { }
    [Fact]
    public async Task DeveFiltrarPorDescricao()
    {
        var categoria = CategoriaBuilder.CriarValida();
        await _client.PostAsJsonAsync("/api/v1/Categorias", categoria);
        var response = await _client.GetAsync("/api/v1/Categorias?search=Teste");
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("Teste");
    }
}