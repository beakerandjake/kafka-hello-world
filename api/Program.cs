using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<StockDb>();
var app = builder.Build();

app.MapGet("/", async (StockDb db) => await db.Stocks.ToListAsync());

app.Run();
