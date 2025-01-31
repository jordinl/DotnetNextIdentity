import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getManageInfo } from "@/lib/gen";
import Navbar from "@/app/components/Navbar";
import EmailWarningAlert from "@/app/components/EmailWarning";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { response, data: userInfo } = await getManageInfo({
    headers: await headers(),
  });

  if (response.status !== 200 || userInfo === undefined) {
    redirect("/login");
  }

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
