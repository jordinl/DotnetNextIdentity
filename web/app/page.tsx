import { getManageInfo, getWeatherForecast, InfoResponse } from "@/lib/gen/api";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Navbar from "./navbar";
import EmailWarningAlert from "@/app/components/EmailWarning";

async function Home() {
  const reqOptions = { headers: await headers() };
  const [infoResp, forecastResp] = await Promise.all([
    getManageInfo(reqOptions),
    getWeatherForecast(reqOptions),
  ]);

  if (forecastResp.status > 300) {
    redirect("/login");
  }

  const forecasts = forecastResp.data;
  const userInfo = infoResp.data as InfoResponse;

  console.log(userInfo);

  return (
    <>
      <Navbar userEmail={userInfo.email} />

      <div className="max-w-4xl mx-auto p-6">
        {!userInfo.isEmailConfirmed && <EmailWarningAlert />}

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
      </div>
    </>
  );
}

export default Home;
