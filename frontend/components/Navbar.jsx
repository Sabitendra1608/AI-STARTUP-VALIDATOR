import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, LogOut, PlusCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
            <BrainCircuit className="text-emerald-400" size={22} />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              VentureLens
            </h1>
            <p className="text-xs text-zinc-500 -mt-1">
              AI Startup Validator
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/validate"
                className="hidden sm:flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 transition"
              >
                <PlusCircle size={17} />
                New Analysis
              </Link>

              <Link
                to="/dashboard"
                className="text-sm text-zinc-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-white/10 px-3 py-2 text-zinc-400 hover:text-white hover:border-white/20 transition"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-zinc-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;