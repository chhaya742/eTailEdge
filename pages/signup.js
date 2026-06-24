import React, { useState, useEffect } from 'react'
import Link from "next/link"
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Signup = () => {
  const router = useRouter()
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({ isError: true });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/authentication/signup`, user)
      if (data.status) {
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("user", JSON.stringify(data.data))
        toast.success("Your account has created successfully")
        if (localStorage.getItem("token")) {
          setTimeout(() => {
            router.push("/")
          }, 1000);
        }
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!error.isError) {
      request(user);
    }
  }, [error])

  const handleInput = (e) => {
    const { name, value } = e
    setUser({ ...user, [name]: value })
  }

  const hamdleError = (user) => {
    const passvalid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    const { name, email, password } = user
    const error = {};
    let isError = false;
    if (!name) {
      error.name = "Name is required";
      isError = true;
    }
    if (!email) {
      error.email = "Email is required";
      isError = true;
    }
    if (!password) {
      error.password = "Password is required";
      isError = true;
    } else {
      if (!password.match(passvalid)) {
        error.password = "Min 8 chars with uppercase, number & special character";
        isError = true;
      }
    }
    error.isError = isError;
    return error
  }

  const handleSubmit = () => {
    const error = hamdleError(user);
    setError(error)
  }

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@$!%*#?&]/.test(password)) score++;
    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-400' };
    if (score === 2) return { score, label: 'Fair', color: 'bg-yellow-400' };
    if (score === 3) return { score, label: 'Good', color: 'bg-blue-400' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  }

  const strength = getPasswordStrength(user.password);

  return (
    <div className="min-h-screen flex bg-white">

      {/* ── LEFT PANEL (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex-col justify-between p-12 relative overflow-hidden">

        {/* Background decorative circles */}
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
            Sell more.<br />
            Manage less.<br />
            <span className="text-pink-400">Grow faster.</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-sm">
            eTailEdge gives you everything you need to run a modern e-commerce business — from inventory to analytics.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              { icon: "📦", title: "Smart Inventory", desc: "Track stock in real-time across all channels" },
              { icon: "📊", title: "Live Analytics", desc: "Sales, traffic & conversion dashboards" },
              { icon: "🚀", title: "One-click Orders", desc: "Fulfil and dispatch orders in seconds" },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white bg-opacity-10 flex items-center justify-center text-lg flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{f.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="relative z-10 border-t border-white border-opacity-10 pt-6">
          <div className="flex items-center gap-3 mb-2">
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {['🧑‍💼','👩‍💻','🧑‍🎨','👨‍🔧'].map((a, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center text-sm">
                  {a}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white text-xs font-semibold">10,000+ sellers</p>
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xs">★</span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-xs italic">
            "eTailEdge doubled our order efficiency within a week."
          </p>
          <p className="text-gray-500 text-xs mt-1">— Rohan M., Store Owner</p>
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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create your account</h1>
            <p className="text-gray-500 text-sm mt-2">Start your free journey with eTailEdge today.</p>
          </div>

          {/* ── FORM ── */}

          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              onChange={(e) => handleInput(e.target)}
              type="text"
              value={user.name}
              name="name"
              placeholder="John Doe"
              autoComplete="name"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-all duration-150 focus:ring-2 focus:ring-pink-400 focus:border-transparent ${error.name ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200 hover:border-gray-300'}`}
            />
            {error.name && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              onChange={(e) => handleInput(e.target)}
              type="text"
              value={user.email}
              name="email"
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
              {user.password && (
                <span className={`text-xs font-semibold ${
                  strength.label === 'Weak' ? 'text-red-400' :
                  strength.label === 'Fair' ? 'text-yellow-500' :
                  strength.label === 'Good' ? 'text-blue-500' : 'text-green-600'
                }`}>
                  {strength.label}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                onChange={(e) => handleInput(e.target)}
                type={showPassword ? "text" : "password"}
                value={user.password}
                name="password"
                placeholder="Min 8 chars, number & symbol"
                autoComplete="new-password"
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

            {/* Strength bar */}
            {user.password && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            )}

            {error.password && (
              <p className="mt-1.5 text-xs text-red-500 flex items-start gap-1">
                <svg className="w-3 h-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
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
                Creating your account…
              </>
            ) : (
              <>
                Create Free Account
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          {/* Terms */}
          <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
            By signing up, you agree to our{' '}
            <a href="#" className="text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors">Privacy Policy</a>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Already a member?</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Login link */}
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150"
          >
            Log in to your account
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
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Free to start
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signup
