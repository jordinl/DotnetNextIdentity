import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getManageInfo } from "@/lib/gen/api";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reqOptions = { headers: await headers() };
  const response = await getManageInfo(reqOptions);

  if (response.status === 200) {
    redirect("/");
  }

  return <>{children}</>;
}
