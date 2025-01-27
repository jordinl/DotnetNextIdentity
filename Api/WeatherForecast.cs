namespace Api;

public class WeatherForecast
{
    public required DateOnly Date { get; set; }

    public required int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }
}
