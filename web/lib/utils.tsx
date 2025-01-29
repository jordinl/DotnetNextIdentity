import { toast } from "react-toastify";
import { HttpValidationProblemDetails } from "@/lib/gen/api";

interface ErrorResponse {
  title?: string;
  errors?: {
    [key: string]: string[];
  };
}

export const setErrors = (data: HttpValidationProblemDetails | void) => {
  const title =
    data?.title || "We could not process your request. Please try again.";
  const validationErrors = Object.values(data?.errors || {});
  const errors = [title, ...validationErrors].flatMap((e) => e);
  errors.forEach((error) => toast.error(error));
};
