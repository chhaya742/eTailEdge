import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState({ email: "", password: "" })
  const [error, setError] = useState({ isError: true })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const request = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/authentication/login`,
        user
      );

      if (response.data.status) {
        localStorage.setItem("token", response.data.data.token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
          })
        );

        toast.success("You have logged in successfully");

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/")
    }
    if (!error.isError) {
      request(user);
    }
  }, [error])

  const handleInput = (e) => {
    const { name, value } = e
    setUser({ ...user, [name]: value })
  }

  const hamdleError = (user) => {
    const { email, password } = user
    const error = {};
    let isError = false;
    if (!email) {
      error.email = "Email is required";
      isError = true;
    }
    if (!password) {
      error.password = "Password is required";
      isError = true;
    }
    error.isError = isError;
    return error
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = hamdleError(user);
    setError(error)
  }

  return (
    <div className="min-h-screen flex bg-white">

      {/* ── LEFT PANEL (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex-col justify-between p-12 relative overflow-hidden">

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pink-500 opacity-10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-pink-400 opacity-10 translate-y-1/2 -translate-x-1/2" />

        {/* Brand */}
        <div className="flex items-center gap-3 relative z-10">
          <img src="/images-modified.png" alt="logo" className="w-9 h-9 rounded-xl" />
          <span className="text-white text-xl font-bold tracking-tight">eTailEdge</span>
        </div>

        {/* Center copy */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-snug mb-4">
            Welcome<br />
            back.<br />
            <span className="text-pink-400">Let's get selling.</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-sm">
            Your store, your orders, your analytics — all in one place. Pick up right where you left off.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            {[
              { value: "10K+", label: "Active Sellers" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "2M+", label: "Orders Processed" },
              { value: "4.9★", label: "Avg. Rating" },
            ].map((s) => (
              <div key={s.label} className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-4">
                <p className="text-pink-400 text-xl font-bold">{s.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 border-t border-white border-opacity-10 pt-6">
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">★</span>
            ))}
          </div>
          <p className="text-gray-300 text-sm italic leading-relaxed">
            "Logging in every morning to eTailEdge feels like opening a cockpit — everything I need, nothing I don't."
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-8 rounded-full bg-pink-500 bg-opacity-30 flex items-center justify-center text-sm">👩‍💼</div>
            <div>
              <p className="text-white text-xs font-semibold">Priya S.</p>
              <p className="text-gray-500 text-xs">Fashion Store Owner, Bangalore</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — FORM ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 sm:px-10 bg-gray-50">
        <div className="w-full max-w-md">

          {/* Mobile brand */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <img src="/images-modified.png" alt="logo" className="w-8 h-8 rounded-lg" />
            <span className="text-gray-900 text-lg font-bold">eTailEdge</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Sign in</h1>
            <p className="text-gray-500 text-sm mt-2">Enter your credentials to access your store.</p>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 text-sm font-medium text-gray-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 text-sm font-medium text-gray-700"
            >
              <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 px-1">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              onChange={(e) => handleInput(e.target)}
              value={user.email}
              name="email"
              type="text"
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-all duration-150 focus:ring-2 focus:ring-pink-400 focus:border-transparent ${error.email ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200 hover:border-gray-300'}`}
            />
            {error.email && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-pink-500 font-semibold hover:text-pink-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                onChange={(e) => handleInput(e.target)}
                value={user.password}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-all duration-150 focus:ring-2 focus:ring-pink-400 focus:border-transparent ${error.password ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200 hover:border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {error.password && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={(e) => handleSubmit(e)}
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white text-sm font-semibold bg-pink-500 hover:bg-pink-600 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-pink-200"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          {/* Signup redirect */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">New to eTailEdge?</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Link
            href="/signup"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150"
          >
            Create a free account
          </Link>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              SSL Secured
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              Private & Safe
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              99.9% Uptime
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
