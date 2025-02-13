import { useEffect } from "react";
import { PostOAuthGoogleCallbackData } from "@/lib/gen";

export default function GoogleButton() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const path =
    "/OAuth/GoogleCallback" satisfies PostOAuthGoogleCallbackData["url"];
  const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api${path}`;

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client?hl=en";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="space-y-3">
      <>
        <div
          id="g_id_onload"
          data-client_id={clientId}
          data-login_uri={callbackUrl}
          data-auto_prompt="false"
        ></div>
        <div
          className="g_id_signin"
          data-type="standard"
          data-size="large"
          data-theme="outline"
          data-text="sign_in_with"
          data-shape="rectangular"
          data-logo_alignment="left"
        ></div>
      </>
    </div>
  );
}
