"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useToast = (status?: string) => {
  const router = useRouter();

  const auth = () => {
    if (status === "unauthenticated") {
      toast.warning("Please sign in to use this feature", {
        action: {
          label: "Sign In",
          onClick: () => router.push("/api/auth/signin"),
        },
        duration: 3000,
        richColors: true,
        dismissible: true,
      });
      return true;
    }
    return false;
  };

  const success = (message: string, actionUrl?: string) => {
    toast.success(message, {
      ...(actionUrl && {
        action: {
          label: "Check",
          onClick: () => router.push(actionUrl),
        },
      }),
      richColors: true,
      dismissible: true,
    });
  };

  const error = (message = "Something went wrong!") => {
    toast.error(message, {
      richColors: true,
      dismissible: true,
    });
  };

  const info = (message: string) => {
    toast(message, {
      richColors: true,
      dismissible: true,
    });
  };

  return { auth, success, error, info };
};
