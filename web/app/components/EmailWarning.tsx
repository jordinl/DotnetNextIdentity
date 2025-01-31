"use client";

import { postResendConfirmationEmail } from "@/lib/gen";
import { toast } from "react-toastify";

export default function EmailWarningAlert({
  userEmail,
}: {
  userEmail: string;
}) {
  const resendEmailConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();

    const { response } = await postResendConfirmationEmail({
      body: { email: userEmail },
    });
    const success = response.status === 200;
    const message = success
      ? "Successfully resent email"
      : "There was an error sending the confirmation email";
    const type = success ? "success" : "error";
    toast(message, { type });
  };

  return (
    <div
      className="flex items-center p-4 mb-4 text-yellow-800 bg-yellow-50 border border-yellow-100 rounded-lg shadow"
      role="alert"
    >
      <div className="flex-1 text-sm font-medium">
        Your email is not confirmed. Please{" "}
        <a
          href="http://localhost:5000"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-yellow-900"
        >
          check your inbox
        </a>
      </div>
      <button
        onClick={resendEmailConfirmation}
        className="ml-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 active:bg-yellow-300 transition-colors"
      >
        Resend confirmation
      </button>
    </div>
  );
}
