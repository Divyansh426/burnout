import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { ChevronDown, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/about", label: "About Us" },
  { to: "/creators", label: "Creators" },
  { to: "/sponsors", label: "Sponsors" },
];

// Update these two numbers later.
const CONTACT_PHONE_1 = "7084460758";
const CONTACT_PHONE_2 = "6394735709";

const CONTACT_EMAIL = "saecollegiateclub.mmmut@gmail.com";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors ${
      isActive ? "text-[#d2ff00]" : "text-[#b4b8a5] hover:text-[#f4f4ed]"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-[#0c0e09]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
          aria-label="SAE MMMUT home"
        >
          <img
            src="/images/sae-logo.png"
            alt="SAE MMMUT"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={navCls}
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setContactOpen((v) => !v)}
              className="flex items-center gap-1 px-1 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#b4b8a5] transition-colors hover:text-[#f4f4ed]"
            >
              Contact Us
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  contactOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {contactOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 border border-border bg-[#0c0e09] p-4 shadow-xl">
                <p className="font-display text-sm uppercase tracking-wider text-[#d2ff00]">
                  Contact SAE MMMUT
                </p>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-4 block break-all text-sm text-[#b4b8a5] transition-colors hover:text-[#d2ff00]"
                >
                  {CONTACT_EMAIL}
                </a>

              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-[#b4b8a5]">
  <p>
    <span className="font-semibold text-[#f4f4ed]">
      Phone 1:
    </span>{" "}
    {CONTACT_PHONE_1}
  </p>

  <p>
    <span className="font-semibold text-[#f4f4ed]">
      Phone 2:
    </span>{" "}
    {CONTACT_PHONE_2}
  </p>
</div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated && user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="border border-[#d2ff00]/50 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d2ff00] transition-colors hover:bg-[#d2ff00] hover:text-[#12140e]"
                >
                  Admin
                </Link>
              )}

              <span className="max-w-[140px] truncate text-sm text-[#b4b8a5]">
                {user.name}
              </span>

              <button
                onClick={() => logout()}
                className="px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#b4b8a5] transition-colors hover:text-[#f4f4ed]"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#d2ff00] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[#12140e] transition-transform hover:-translate-y-0.5"
            >
              Sign in
            </button>
          )}

          <Link
            to="/register"
            className="border border-[#f4f4ed]/30 px-5 py-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[#f4f4ed] transition-colors hover:border-[#d2ff00] hover:text-[#d2ff00]"
          >
            Register
          </Link>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center text-[#f4f4ed] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-[#0c0e09] lg:hidden">
          <nav className="flex flex-col px-4 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-border/60 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] ${
                    isActive ? "text-[#d2ff00]" : "text-[#b4b8a5]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            <div className="border-b border-border/60 py-3.5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d2ff00]">
                Contact Us
              </p>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 block break-all text-sm text-[#b4b8a5]"
              >
                {CONTACT_EMAIL}
              </a>

              <p className="mt-2 text-sm text-[#b4b8a5]">
  <span className="font-semibold text-[#f4f4ed]">Phone 1:</span>{" "}
  {CONTACT_PHONE_1}
</p>

<p className="mt-2 text-sm text-[#b4b8a5]">
  <span className="font-semibold text-[#f4f4ed]">Phone 2:</span>{" "}
  {CONTACT_PHONE_2}
</p>
            </div>

            <div className="flex gap-3 py-4">
              {isAuthenticated && user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="flex-1 border border-[#d2ff00]/50 py-3 text-center text-sm font-bold uppercase tracking-wider text-[#d2ff00]"
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="flex-1 border border-border py-3 text-sm font-bold uppercase tracking-wider text-[#b4b8a5]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                  className="flex-1 bg-[#d2ff00] py-3 text-sm font-bold uppercase tracking-wider text-[#12140e]"
                >
                  Sign in
                </button>
              )}

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex-1 border border-[#f4f4ed]/30 py-3 text-center text-sm font-bold uppercase tracking-wider text-[#f4f4ed]"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}