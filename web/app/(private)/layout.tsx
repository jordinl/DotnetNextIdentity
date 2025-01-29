import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getManageInfo, InfoResponse } from "@/lib/gen/api";
import Navbar from "@/app/components/Navbar";
import EmailWarningAlert from "@/app/components/EmailWarning";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reqOptions = { headers: await headers() };
  const response = await getManageInfo(reqOptions);

  if (response.status > 300) {
    redirect("/login");
  }

  const userInfo = response.data as InfoResponse;

  return (
    <>
      <Navbar userEmail={userInfo.email} />

      <div className="max-w-4xl w-full mx-auto p-6">
        {!userInfo.isEmailConfirmed && (
          <EmailWarningAlert userEmail={userInfo.email} />
        )}

        {children}
      </div>
    </>
  );
}
