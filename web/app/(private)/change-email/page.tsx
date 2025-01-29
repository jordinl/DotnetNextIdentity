"use client";

import { postManageInfo, InfoRequest } from "@/lib/gen/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ChangeEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (email !== confirmEmail) {
      toast("Emails do not match", { type: "error" });
      setIsLoading(false);
      return;
    }

    const updateRequest: InfoRequest = {
      newEmail: email,
    };

    const response = await postManageInfo(updateRequest);
    setIsLoading(false);

    if (response.status === 200) {
      toast(
        "Confirmation email sent. Please check your inbox to complete the email change.",
        { type: "success" },
      );
      router.replace("/");
    } else {
      toast("Failed to update email", { type: "error" });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mt-6">
      <div className="p-8 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Change your email
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your new email address below. You'll need to verify it after
          changing.
        </p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                New email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your new email"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-email"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm new email address
              </label>
              <input
                id="confirm-email"
                name="confirm-email"
                type="email"
                autoComplete="email"
                required
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Confirm your new email"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Update email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
