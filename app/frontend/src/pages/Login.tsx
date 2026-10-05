
import { useState } from "react";
import { Gauge } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { refresh } = useAuth();
  const utils = trpc.useUtils();

  const login = trpc.auth.login.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      await refresh();
      navigate("/register");
    },
    onError: (err: { message: string }) => setError(err.message),
  });

  const register = trpc.auth.register.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      await refresh();
      navigate("/register");
    },
    onError: (err) => setError(err.message),
  });

  const isPending = login.isPending || register.isPending;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (isRegister) {
      register.mutate({ name: name.trim(), email: email.trim(), password });
    } else {
      login.mutate({ email: email.trim(), password });
    }
  }

  return (
    <div className="speedlines noise relative flex min-h-screen items-center justify-center bg-[#12140e] px-4 py-8">
      <div className="w-full max-w-sm border border-border bg-[#0c0e09] p-8">
        <Link to="/" className="flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center bg-[#d2ff00]">
            <Gauge className="h-5 w-5 text-[#12140e]" strokeWidth={2.5} />
          </span>
          <span className="font-display text-3xl uppercase text-[#f4f4ed]">
            Burn<span className="text-[#d2ff00]">out</span>
          </span>
        </Link>

        <h1 className="mt-7 text-center text-xl font-bold uppercase tracking-wider text-[#f4f4ed]">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>

        <p className="mt-2 text-center text-sm text-[#b4b8a5]">
          {isRegister
            ? "Create an account to get on the grid."
            : "Sign in to register your team and track your status."}
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {isRegister && (
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#b4b8a5]">
                Full name
              </label>
              <input
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={255}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full border border-[#34382a] bg-[#15180f] px-3 py-3 text-sm text-[#f4f4ed] outline-none focus:border-[#d2ff00]"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#b4b8a5]">
              Email address
            </label>
            <input
              type="email"
              autoComplete="email"
              required
              maxLength={320}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-[#34382a] bg-[#15180f] px-3 py-3 text-sm text-[#f4f4ed] outline-none focus:border-[#d2ff00]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#b4b8a5]">
              Password
            </label>
            <input
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
              minLength={isRegister ? 8 : 1}
              maxLength={72}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegister ? "At least 8 characters" : "Your password"}
              className="w-full border border-[#34382a] bg-[#15180f] px-3 py-3 text-sm text-[#f4f4ed] outline-none focus:border-[#d2ff00]"
            />
          </div>

          {error && (
            <p role="alert" className="border border-red-900 bg-red-950/30 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full bg-[#d2ff00] py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-[#12140e] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending
              ? "Please wait..."
              : isRegister
                ? "Create Account"
                : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#b4b8a5]">
          {isRegister ? "Already have an account?" : "New to BURNOUT?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="font-bold text-[#d2ff00] hover:underline"
          >
            {isRegister ? "Sign in" : "Create account"}
          </button>
        </p>

        <Link
          to="/"
          className="mt-5 block text-center text-xs font-bold uppercase tracking-[0.2em] text-[#6b705c] hover:text-[#d2ff00]"
        >
          ← Back to the track
        </Link>
      </div>
    </div>
  );
}