using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

public class StockDb : DbContext
{
    public DbSet<Stock> Stocks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
     => optionsBuilder.UseNpgsql(@"Host=postgres;Username=postgres;Password=123456;");
}

[Table("stocks")]
public class Stock
{
    [Column("id")]
    public int Id { get; set; }
    [Column("ticker")]
    public string Ticker { get; set; }
    [Column("full_name")]
    public string Name { get; set; }
}