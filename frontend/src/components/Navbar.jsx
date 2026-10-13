import { Link, NavLink } from "react-router";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import RejimTugmasi from "./RejimTugmasi";

function Navbar() {
  return (
    <header className="bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-700/80 sticky top-0 z-50 shadow-sm backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-5xl font-black tracking-tight text-[#22344F] dark:text-slate-100 flex items-center gap-3 hover:opacity-90 transition-all"
        >
          <span className="bg-[#1F6E63] text-white px-3.5 py-2 rounded-2xl text-3xl leading-none flex items-center justify-center shadow-sm">
            🌍
          </span>
          <span className="text-5xl font-black tracking-tight text-[#22344F] dark:text-slate-100">
            Davlatlar
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Show when="signed-in">
            <NavLink
              to="/dashboard"
              className="text-sm font-semibold text-[#22344F] dark:text-slate-200 hover:text-[#1F6E63] dark:hover:text-emerald-400 transition-colors duration-200"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/profile"
              className="text-sm font-semibold text-[#22344F] dark:text-slate-200 hover:text-[#1F6E63] dark:hover:text-emerald-400 transition-colors duration-200"
            >
              Profile
            </NavLink>
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-bold text-[#22344F] dark:text-slate-200 hover:text-[#1F6E63] dark:hover:text-emerald-400 px-3 py-2 transition-colors duration-200">
                Kirish
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="bg-[#1F6E63] hover:bg-[#18574e] text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#1F6E63]/20">
                Ro'yxatdan o'tish
              </button>
            </SignUpButton>
          </Show>

          <RejimTugmasi />

          <Show when="signed-in">
            <UserButton afterSignOutUrl="/" />
          </Show>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
