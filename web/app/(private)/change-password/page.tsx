"use client";

import {
  postManageInfo,
  InfoRequest,
  HttpValidationProblemDetails,
} from "@/lib/gen/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setErrors } from "@/lib/utils";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      toast("New passwords do not match", { type: "error" });
      setIsLoading(false);
      return;
    }

    const updateRequest: InfoRequest = {
      oldPassword,
      newPassword,
    };

    const response = await postManageInfo(updateRequest);
    setIsLoading(false);

    if (response.status === 200) {
      toast("Password updated successfully", { type: "success" });
      router.replace("/");
    } else {
      setErrors(response.data as HttpValidationProblemDetails);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mt-6 max-w-md mx-auto">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Change your password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your current password and choose a new password below.
        </p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            <input
              id="current-password"
              name="current-password"
              type="password"
              autoComplete="current-password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Current password"
            />

            <input
              id="new-password"
              name="new-password"
              type="password"
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="New password"
            />

            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Confirm new password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Update password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
