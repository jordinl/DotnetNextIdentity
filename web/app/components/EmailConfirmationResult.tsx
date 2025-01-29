"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface EmailConfirmationResultProps {
  success: boolean;
}

export default function EmailConfirmationResult({
  success,
}: EmailConfirmationResultProps) {
  const router = useRouter();

  useEffect(() => {
    const message = success
      ? "Successfully confirmed email"
      : "There was an error confirming your email";
    const type = success ? "success" : "error";
    toast(message, { type });

    router.replace("/");
  }, []);

  return <></>;
}
