import {
  mapIdentityApiConfirmEmail,
  MapIdentityApiConfirmEmailParams,
} from "@/lib/gen/api";
import EmailConfirmationResult from "@/app/components/EmailConfirmationResult";

export default async function ConfirmEmail({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resp = await mapIdentityApiConfirmEmail(
    searchParams as MapIdentityApiConfirmEmailParams,
  );

  return <EmailConfirmationResult success={resp.status === 200} />;
}
