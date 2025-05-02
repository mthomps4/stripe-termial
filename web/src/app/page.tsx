"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Hero Section */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-primary">
        <div className="max-w-md mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sweet Cuts Admin
          </h1>
          <p className="text-xl mb-8">
            Management portal for shop owners and barbers. Configure locations,
            services, and payment settings.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="#manage"
              className="bg-secondary text-primary hover:bg-secondary-dark px-5 py-2 rounded-md transition-colors font-medium"
            >
              Manage Shop
            </Link>
            <Link
              href="#payments"
              className="bg-white text-primary hover:bg-neutral-100 px-5 py-2 rounded-md transition-colors"
            >
              Payment Setup
            </Link>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-neutral-50">
        <AuthTabs />
      </div>
    </div>
  );
}

function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="w-full max-w-md">
      <div className="flex border-b border-neutral-200 mb-6">
        <button
          className={`py-2 px-4 text-center w-1/2 ${
            activeTab === "login"
              ? "border-b-2 border-primary text-primary font-medium"
              : "text-neutral-600"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`py-2 px-4 text-center w-1/2 ${
            activeTab === "signup"
              ? "border-b-2 border-primary text-primary font-medium"
              : "text-neutral-600"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {activeTab === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="name@example.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="••••••••"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-neutral-700"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-primary hover:underline">
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white hover:bg-primary-dark px-5 py-2 rounded-md transition-colors"
      >
        Sign in
      </button>
      <p className="text-center text-sm text-neutral-600 mt-4">
        Shop owners and barbers sign in to manage shop settings and payment
        accounts
      </p>
    </form>
  );
}

function SignupForm() {
  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="name@example.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Role
        </label>
        <select
          id="role"
          className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        >
          <option value="" disabled selected>
            Select your role
          </option>
          <option value="owner">Shop Owner</option>
          <option value="barber">Barber</option>
          <option value="manager">Manager</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="••••••••"
          required
        />
      </div>
      <div>
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="••••••••"
          required
        />
      </div>
      <div className="flex items-start">
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded mt-1"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
          I agree to the{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white hover:bg-primary-dark px-5 py-2 rounded-md transition-colors"
      >
        Create Account
      </button>
      <p className="text-center text-sm text-neutral-600 mt-4">
        Create an admin account to manage your barbershop and connect payment
        methods
      </p>
    </form>
  );
}
