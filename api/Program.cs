using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<StockDb>(opt => opt.UseNpgsql(builder.Configuration["API_CONNECTION_STRING"]));
var app = builder.Build();

app.MapGet("/stocks", async (StockDb db) => await db.Stocks.ToListAsync());

app.Run();
