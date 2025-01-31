import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getManageInfo } from "@/lib/gen";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { response } = await getManageInfo({ headers: await headers() });

  if (response.status === 200) {
    redirect("/");
  }

  return <>{children}</>;
}
