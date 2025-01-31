import {
  mapIdentityApiConfirmEmail,
  MapIdentityApiConfirmEmailData,
} from "@/lib/gen";
import EmailConfirmationResult from "@/app/components/EmailConfirmationResult";

export default async function ConfirmEmail({
  searchParams,
}: {
  searchParams: Promise<MapIdentityApiConfirmEmailData["query"]>;
}) {
  const query = await searchParams;
  const { response } = await mapIdentityApiConfirmEmail({ query });

  return <EmailConfirmationResult success={response.status === 200} />;
}
