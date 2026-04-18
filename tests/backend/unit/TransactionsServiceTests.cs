public class TransactionService
{
    public void CreateTransaction(Person person, Transaction transaction)
    {
        if (person.Age < 18 && transaction.Type == TransactionType.Income)
            throw new BusinessException("Underage cannot have income");
    }
}

public class TransactionServiceTests
{
    private readonly TransactionService _service = new();

    [Fact]
    public void Should_Throw_Exception_When_Underage_Tries_To_Create_Income()
    {
        var person = new PersonBuilder().WithAge(16).Build();
        var transaction = new TransactionBuilder()
            .WithType(TransactionType.Income)
            .Build();
        var action = () => _service.CreateTransaction(person, transaction);
        action.Should().Throw<BusinessException>()
            .WithMessage("Underage cannot have income");
    }
    [Fact]
    public void Should_Allow_Expense_For_Underage()
    {
        var person = new PersonBuilder().WithAge(16).Build();
        var transaction = new TransactionBuilder()
            .WithType(TransactionType.Expense)
            .Build();

        var action = () => _service.CreateTransaction(person, transaction);

        action.Should().NotThrow();
    }
    [Theory]
    [InlineData(17, TransactionType.Income, true)]
    [InlineData(17, TransactionType.Expense, false)]
    [InlineData(25, TransactionType.Income, false)]
    public void Should_Validate_Transaction_Based_On_Age(
    int age,
    TransactionType type,
    bool shouldThrow)
    {
        var person = new PersonBuilder().WithAge(age).Build();
        var transaction = new TransactionBuilder().WithType(type).Build();

        var action = () => _service.CreateTransaction(person, transaction);

        if (shouldThrow)
            action.Should().Throw<BusinessException>();
        else
            action.Should().NotThrow();
    }
    [Fact]
    public void Should_Not_Allow_Expense_Category_For_Income_Transaction()
    {
        var category = new CategoryBuilder()
            .WithType(CategoryType.Expense)
            .Build();

        var transaction = new TransactionBuilder()
            .WithType(TransactionType.Income)
            .WithCategory(category)
            .Build();

        var action = () => _service.CreateTransaction(new PersonBuilder().Build(), transaction);

        action.Should().Throw<BusinessException>()
            .WithMessage("Invalid category for transaction type");
    }
    [Fact]
    public void Should_Allow_Category_With_Both_Types()
    {
        var category = new CategoryBuilder()
            .WithType(CategoryType.Both)
            .Build();

        var transaction = new TransactionBuilder()
            .WithType(TransactionType.Income)
            .WithCategory(category)
            .Build();

        var action = () => _service.CreateTransaction(new PersonBuilder().Build(), transaction);

        action.Should().NotThrow();
    }
    [Fact]
    public void Should_Delete_All_Transactions_When_Person_Is_Deleted()
    {
        var person = new PersonBuilder().Build();
        var transactions = new List<Transaction>
    {
        new TransactionBuilder().WithPerson(person).Build(),
        new TransactionBuilder().WithPerson(person).Build()
    };
        var repository = new FakeTransactionRepository(transactions);
        var service = new PersonService(repository);
        service.DeletePerson(person.Id);
        repository.Transactions.Should().BeEmpty();
    }
}