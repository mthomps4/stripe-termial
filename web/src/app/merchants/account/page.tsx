"use client";

import { withAuth } from "@/utils/withAuth";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";

function MerchantAccount() {
  const { user } = useCurrentUser();

  return (
    <main className="min-h-screen bg-neutral-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Merchant Account</h1>
          <h2 className="text-xl font-bold mb-4">
            Welcome back, {user?.first_name} {user?.last_name}!
          </h2>
          <p>{user?.stripe_account_id}</p>
          <p>TODO: Stripe Dashboards and Notification Banners here...</p>
        </div>
      </div>
    </main>
  );
}

export default withAuth(MerchantAccount, { requiresAdmin: false });
