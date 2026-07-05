import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const Landing = () => {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#050505]">
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 mb-6">
              <Sparkles size={16} />
              AI-powered startup validation
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
              Validate your startup idea before building it.
            </h1>

            <p className="mt-6 text-lg text-zinc-400 max-w-xl leading-8">
              VentureLens analyzes your idea like a product strategist, market
              researcher, and investor. Get clarity on the problem, market,
              monetization, risks, MVP roadmap, and feasibility score.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-medium text-black hover:bg-emerald-400 transition"
              >
                Start validating
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-6 py-3 font-medium text-zinc-300 hover:text-white hover:border-white/20 transition"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-emerald-500/10 blur-3xl rounded-full" />

            <div className="relative rounded-[2rem] border border-white/10 bg-[#111827] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-zinc-500">Validation Score</p>
                  <h2 className="text-4xl font-semibold mt-1">82/100</h2>
                </div>

                <div className="h-16 w-16 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center">
                  <BrainCircuit className="text-emerald-400" size={30} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  ["Problem Severity", "18/20"],
                  ["Market Potential", "17/20"],
                  ["Competition Gap", "15/20"],
                  ["AI Advantage", "9/10"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-sm text-zinc-500">{label}</p>
                    <p className="text-2xl font-semibold mt-2">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-5">
                <p className="text-sm text-emerald-300 font-medium">
                  Final Verdict
                </p>
                <p className="text-zinc-300 mt-2 leading-7">
                  Strong MVP potential. Start with a narrow audience and test
                  willingness to pay before scaling.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-20">
          {[
            {
              icon: Target,
              title: "Problem Analysis",
              desc: "Understand whether the pain point is real, urgent, and valuable.",
            },
            {
              icon: TrendingUp,
              title: "Market Opportunity",
              desc: "Get AI-generated insight into demand, audience, and timing.",
            },
            {
              icon: BarChart3,
              title: "Startup Score",
              desc: "Receive a structured feasibility score across business factors.",
            },
            {
              icon: ShieldCheck,
              title: "Risk Detection",
              desc: "Find weak points before wasting time building the wrong MVP.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-[#111827] p-6 hover:border-emerald-400/30 transition"
            >
              <item.icon className="text-emerald-400" size={28} />
              <h3 className="text-xl font-semibold mt-5">{item.title}</h3>
              <p className="text-zinc-400 mt-3 leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Landing;