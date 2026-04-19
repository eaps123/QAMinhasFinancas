using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
public static class CategoriaBuilder
{
    public static object CriarValida()
    {
        return new
        {
            descricao = "Categoria Teste",
            finalidade = 1
        };
    }
}