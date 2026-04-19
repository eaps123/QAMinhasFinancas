using Xunit;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;

public class BusinessRulesTests
{
    [Fact]
    public void MenorNaoPodeTerReceita()
    {
        var pessoa = new Pessoa
        {
            DataNascimento = DateTime.Now.AddYears(-10)
        };

        var result = TransacaoValidator.PodeCriar(pessoa, TipoTransacao.Receita);

        result.Should().BeFalse();
    }
}
public enum TipoTransacao
{
    Receita = 1,
    Despesa = 2
}

public class Pessoa
{
    public DateTime DataNascimento { get; set; }
    public int Idade =>
        DateTime.Today.Year - DataNascimento.Year;
}

public class TransacaoValidator
{
    public static bool PodeCriar(Pessoa pessoa, TipoTransacao tipo)
    {
        if (pessoa.Idade < 18 && tipo == TipoTransacao.Receita)
            return false;
        return true;
    }
}