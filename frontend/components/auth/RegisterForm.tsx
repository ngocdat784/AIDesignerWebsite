"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

export default function RegisterForm() {
  const router = useRouter();

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);

    try {
      await register({
        name,
        email,
        password,
      });

      router.push("/auth/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Đăng ký thất bại.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-9">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Đăng ký
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Tạo tài khoản AI Designer
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Họ và tên
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Nguyễn Ngọc Đạt"
              autoComplete="name"
              required
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/50 focus:bg-white/[0.09] focus:ring-2 focus:ring-indigo-400/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="your@email.com"
              autoComplete="email"
              required
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/50 focus:bg-white/[0.09] focus:ring-2 focus:ring-indigo-400/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Mật khẩu
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="••••••••"
              autoComplete="new-password"
              required
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/50 focus:bg-white/[0.09] focus:ring-2 focus:ring-indigo-400/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Xác nhận mật khẩu
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="••••••••"
              autoComplete="new-password"
              required
              disabled={loading}
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/50 focus:bg-white/[0.09] focus:ring-2 focus:ring-indigo-400/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-black shadow-lg shadow-white/5 transition hover:bg-white/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                Đang đăng ký...
              </span>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />

          <span className="text-xs text-white/30">
            hoặc
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Login */}
        <p className="text-center text-sm text-white/45">
          Đã có tài khoản?{" "}
          <a
            href="/auth/login"
            className="font-medium text-white transition hover:text-indigo-300"
          >
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}