var app = WebApplication.Create(args);

app.MapGet("/", () => "Hello World!");

app.Run();