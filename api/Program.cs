using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// use simple console logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// register dependencies
builder.Services.AddDbContext<StockDb>(opt => opt.UseNpgsql(builder.Configuration["API_CONNECTION_STRING"]));
builder.Services.AddScoped<RealTimePrice>();

var app = builder.Build();

app.UseWebSockets();

// get all stocks
app.MapGet("/stocks", async (StockDb db) => await db.Stocks.ToListAsync());

// realtime stock price websocket
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/stocks/realtime/ws")
    {
        using (var scope = app.Services.CreateScope())
        {
            var handler = scope.ServiceProvider.GetService<RealTimePrice>();
            await handler.Echo(null);
        }
    }
    else
    {
        await next(context);
    }
});

app.Run();
