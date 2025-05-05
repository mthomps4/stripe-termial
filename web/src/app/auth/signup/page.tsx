"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: Implement signup logic
    console.log("Signup attempt with:", { name, email, password });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-bold text-navy-800">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-navy-600 hover:text-navy-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="merchant_attributes[first_name]"
                className="block text-sm font-medium"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  id="merchant_attributes[first_name]"
                  name="merchant_attributes[first_name]"
                  type="text"
                  autoComplete="first_name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-navy-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="merchant_attributes[last_name]"
                className="block text-sm font-medium"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  id="merchant_attributes[last_name]"
                  name="merchant_attributes[last_name]"
                  type="text"
                  autoComplete="last_name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-navy-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-navy-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-navy-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium"
              >
                Confirm password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-navy-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md btn-primary py-2 px-4 text-sm font-medium"
              >
                Get Started!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
