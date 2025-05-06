"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { useCreateTestConnectAccount } from "@/hooks/useCreateTestConnectAccount";
import { SessionResponse } from "@/types/signup";
import { USER_KEY } from "@/constants";
import { withAuth } from "@/utils/withAuth";

function StripeOnboarding() {
  const router = useRouter();
  // withAuth already handles loading state
  const { user, setUser } = useCurrentUser();

  useEffect(() => {
    const status = user?.stripe_account_status;

    if (status === "completed") {
      router.push("/merchants/account");
    }
  }, [user, router]);

  const { mutate: createTestConnectAccount, isPending } =
    useCreateTestConnectAccount({
      onSuccess: (data) => {
        const connectAccountId = data.connect_account_id;

        console.log({ data });

        localStorage.setItem(
          USER_KEY,
          JSON.stringify({
            ...(user as SessionResponse["user"]),
            stripe_account_id: connectAccountId,
            stripe_account_status: "completed",
          })
        );

        setUser({
          ...(user as SessionResponse["user"]),
          stripe_account_id: connectAccountId,
          stripe_account_status: "completed",
        });

        router.push("/merchants/account");
      },
      onError: (error) => {
        console.error(error);
      },
    });

  return (
    <main className="min-h-screen bg-neutral-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Stripe Onboarding</h1>
          <p>
            Typically we would show the full embedded form here... but for now
            we will create an account via API for testing purposes.
          </p>

          <button
            className="btn-primary px-4 py-2 rounded-md"
            onClick={() => createTestConnectAccount()}
            disabled={isPending}
          >
            {isPending
              ? "Creating Connect Account..."
              : "Create Connect Account"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default withAuth(StripeOnboarding, { requiresAdmin: false });
