using Microsoft.EntityFrameworkCore;

public class StockDb : DbContext
{
    public DbSet<Stock> Stocks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
     => optionsBuilder.UseNpgsql(@"Host=postgres;Username=postgres;Password=123456;");
}

public class Stock
{
    public int Id { get; set; }
    public string Ticker { get; set; }
    public string FullName { get; set; }
    public decimal Price { get; set; }
    public decimal Volatility { get; set; }
}