"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-navy-800">
              Grow Your Barbering Business
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our team of professional barbers and take control of your
              career. Set your own schedule, and build your client base.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/auth/signup"
                className="px-8 py-3 btn-primary rounded-md"
              >
                Start Your Journey
              </Link>
              <Link href="/#" className="px-8 py-3 btn-secondary rounded-md">
                See Benefits
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="">
                Work when you want - manage your availability with our easy
                scheduling system
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Management</h3>
              <p className="">
                Build and maintain your client base with our professional tools
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Maximize Earnings</h3>
              <p className="">
                Set your own prices and keep more of what you earn
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
