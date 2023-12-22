using System.Net.WebSockets;

public class RealTimePrice
{
    private readonly ILogger<RealTimePrice> _logger;
    private int _test = 0;

    public RealTimePrice(ILogger<RealTimePrice> logger)
    {
        this._logger = logger;
    }

    public async Task Echo(WebSocket webSocket)
    {
        _test++;
        _logger.LogInformation($"Hello World: {_test}");
    }
}