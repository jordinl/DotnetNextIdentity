import { getWeatherForecast } from "@/lib/gen";
import { headers } from "next/headers";

async function Home() {
  const reqOptions = { headers: await headers() };
  const { data: forecasts } = await getWeatherForecast(reqOptions);

  if (!forecasts) {
    return <></>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {forecasts.map((forecast, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
        >
          <div className="text-sm text-gray-500">
            {new Date(forecast.date).toLocaleDateString()}
          </div>
          <div className="mt-2">
            <div className="text-xl font-semibold">
              {forecast.temperatureC}°C / {forecast.temperatureF}°F
            </div>
            <div className="text-gray-600 mt-1">{forecast.summary}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
