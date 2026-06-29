import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ─── Validation ───────────────────────────────────────────────────────────

  const validate = (value) => {
    if (!value.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
    return "";
  };

  // ─── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setEmailError("");
    setLoading(true);

    try {
      // Step 1: check the email exists
      const { data: checkData } = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/authentication/forgot-password`,
        { email }
      );

      if (!checkData.status) {
        toast.error(checkData.message);
        return;
      }

      // Step 2: send the reset email
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/authentication/reset-password`,
        { email }
      );

      setSubmitted(true);
      toast.success("Reset link sent — check your inbox.");
    } catch (err) {
        console.log(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Post-submit state ────────────────────────────────────────────────────

  if (submitted) {
    return (
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6">
        <div className="w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center space-y-4">
          <div className="text-4xl">📬</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Check your inbox</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We've sent a password reset link to <span className="font-medium text-gray-700 dark:text-gray-200">{email}</span>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setEmail(""); }}
            className="text-sm text-pink-500 hover:underline"
          >
            Try a different email
          </button>
        </div>
      </section>
    );
  }

  // ─── Form ─────────────────────────────────────────────────────────────────

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6">

      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img src="/images-modified.png" alt="eTailEdge logo" className="w-8 h-8" />
        eTailEdge
      </Link>

      {/* Card */}
      <div className="w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Forgot password?
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Enter your account email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(validate(e.target.value));
              }}
              placeholder="name@company.com"
              className={`w-full px-3 py-2.5 text-sm rounded-lg border bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                focus:outline-none focus:ring-2
                ${emailError
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 dark:border-gray-600 focus:ring-pink-400 focus:border-pink-400"
                }`}
            />
            {emailError && (
              <p className="mt-1.5 text-xs text-red-500" role="alert">{emailError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>

          {/* Back to login */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Remembered it?{" "}
            <Link href="/login" className="text-pink-500 font-medium hover:underline">
              Back to login
            </Link>
          </p>

        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
