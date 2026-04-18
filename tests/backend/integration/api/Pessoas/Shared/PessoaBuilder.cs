public static class PessoaBuilder
{
    public static object CriarValida()
    {
        return new
        {
            nome = "João Teste",
            dataNascimento = DateTime.Now.AddYears(-30).ToString("yyyy-MM-dd")
        };
    }
    public static object CriarMenorDeIdade()
    {
        return new
        {
            nome = "Menor Teste",
            dataNascimento = DateTime.Now.AddYears(-10).ToString("yyyy-MM-dd")
        };
    }
}