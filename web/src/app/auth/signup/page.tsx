"use client";

import { useState } from "react";
import Link from "next/link";
import { useSignUp } from "@/app/hooks/useSignUp";
import { USER_KEY } from "@/app/constants";
import { AUTH_TOKEN_KEY } from "@/app/constants";
import { SessionResponse } from "@/app/types/signup";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const onSuccess = (data: SessionResponse) => {
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  };

  const onError = (error: Error) => {
    console.error("Error signing up", error);
    setHasError(true);
  };

  const { mutate: signUp, isPending } = useSignUp({
    onSuccess,
    onError,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    signUp({
      user: {
        email,
        password,
        confirmPassword,
        merchant_attributes: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
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

      {hasError && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-red-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <p>Error signing up</p>
          </div>
        </div>
      )}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-navy-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
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
                disabled={isPending}
              >
                {isPending ? "Signing up..." : "Get Started!"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
