import { getWeatherForecast } from "@/lib/gen/api";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function Home() {
  const response = await getWeatherForecast({ headers: await headers() });

  if (response.status > 300) {
    redirect("/login");
  }

  const forecasts = response.data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">Weather Forecast</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}

export default Home;
