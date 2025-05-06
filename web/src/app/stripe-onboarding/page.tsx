"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { WithAuth } from "@/components/WithAuth";

export default function StripeOnboarding() {
  const router = useRouter();
  // withAuth already handles loading state
  const { user } = useCurrentUser();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const status = user.stripe_connect_account_status;

    if (status === "active") {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleOnboard = async () => {
    // TODO
  };

  return (
    <WithAuth requiresAdmin={false}>
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
              onClick={handleOnboard}
            >
              Create Connect Account
            </button>
          </div>
        </div>
      </main>
    </WithAuth>
  );
}
