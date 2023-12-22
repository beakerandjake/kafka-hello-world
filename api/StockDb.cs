using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

public class StockDb : DbContext
{
    public DbSet<Stock> Stocks { get; set; }
    public StockDb(DbContextOptions<StockDb> options) : base(options) { }
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