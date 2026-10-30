import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, FileText, Plus, Sparkles } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await api.get("/api/reports");
      setReports(res.data);
    } catch (error) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const avgScore =
    reports.length > 0
      ? Math.round(
          reports.reduce((sum, report) => sum + (report.score?.total || 0), 0) /
            reports.length
        )
      : 0;

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-emerald-400 text-sm font-medium">
            Founder Dashboard
          </p>
          <h1 className="text-4xl font-semibold tracking-tight mt-2">
            Your startup validations
          </h1>
          <p className="text-zinc-400 mt-3">
            Review previous analyses and validate your next idea.
          </p>
        </div>

        <Link
          to="/validate"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-medium text-black hover:bg-emerald-400 transition"
        >
          <Plus size={18} />
          New validation
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-10">
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
          <FileText className="text-emerald-400" />
          <p className="text-zinc-400 mt-5">Total Reports</p>
          <h2 className="text-4xl font-semibold mt-2">{reports.length}</h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
          <BarChart3 className="text-emerald-400" />
          <p className="text-zinc-400 mt-5">Average Score</p>
          <h2 className="text-4xl font-semibold mt-2">{avgScore}/100</h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
          <Sparkles className="text-emerald-400" />
          <p className="text-zinc-400 mt-5">AI Status</p>
          <h2 className="text-4xl font-semibold mt-2">Active</h2>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Recent reports</h2>

        {loading ? (
          <p className="text-zinc-400 mt-6">Loading reports...</p>
        ) : reports.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10 mt-6 text-center">
            <h3 className="text-2xl font-semibold">No reports yet</h3>
            <p className="text-zinc-400 mt-3">
              Submit your first startup idea and get an AI validation report.
            </p>
            <Link
              to="/validate"
              className="inline-flex mt-6 rounded-2xl bg-emerald-500 px-5 py-3 font-medium text-black hover:bg-emerald-400 transition"
            >
              Validate first idea
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            {reports.map((report) => (
              <Link
                to={`/report/${report._id}`}
                key={report._id}
                className="rounded-3xl border border-white/10 bg-[#111827] p-6 hover:border-emerald-400/40 transition"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {report.idea?.title || "Untitled Idea"}
                    </h3>
                    <p className="text-zinc-400 mt-3 line-clamp-2">
                      {report.summary}
                    </p>
                  </div>

                  <div className="shrink-0 h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">
                    <span className="text-xl font-semibold text-emerald-400">
                      {report.score?.total || 0}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-500 mt-5">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;