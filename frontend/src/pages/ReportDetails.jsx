import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Lightbulb,
  ShieldAlert,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const ReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const res = await api.get(`/api/reports/${id}`);
      setReport(res.data);
    } catch {
      toast.error("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  if (loading) {
    return <main className="max-w-7xl mx-auto px-5 py-10 text-zinc-400">Loading report...</main>;
  }

  if (!report) {
    return <main className="max-w-7xl mx-auto px-5 py-10 text-zinc-400">Report not found.</main>;
  }

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        Back to dashboard
      </Link>

      <section className="mt-8 rounded-[2rem] border border-white/10 bg-[#111827] p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div>
            <p className="text-emerald-400 text-sm font-medium">
              VentureLens Startup Report
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-3">
              {report.idea?.title || "Untitled Idea"}
            </h1>

            <p className="text-zinc-400 mt-4 max-w-3xl leading-7">
              {report.executiveSummary}
            </p>
          </div>

          <div className="shrink-0 rounded-3xl bg-emerald-500/10 border border-emerald-400/20 p-6 text-center min-w-40">
            <p className="text-sm text-zinc-400">Final Score</p>
            <h2 className="text-5xl font-semibold text-emerald-400 mt-2">
              {report.score?.total || 0}
            </h2>
            <p className="text-zinc-500 mt-1">out of 100</p>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mt-6">
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-emerald-400" />
            <h2 className="text-xl font-semibold">Score Breakdown</h2>
          </div>

          <div className="space-y-4">
            <ScoreBox label="Problem Severity" value={report.score?.problemSeverity} max={15} />
            <ScoreBox label="Market Potential" value={report.score?.marketPotential} max={15} />
            <ScoreBox label="Competition Gap" value={report.score?.competitionGap} max={15} />
            <ScoreBox label="Monetization" value={report.score?.monetization} max={15} />
            <ScoreBox label="Feasibility" value={report.score?.feasibility} max={15} />
            <ScoreBox label="AI Advantage" value={report.score?.aiAdvantage} max={10} />
            <ScoreBox label="Investor Readiness" value={report.score?.investorReadiness} max={15} />
          </div>
        </div>

        <SectionCard title="Final Verdict" icon={CheckCircle2}>
          {report.finalVerdict}
        </SectionCard>
      </section>

      <section className="grid lg:grid-cols-2 gap-6 mt-6">
        <SectionCard title="Problem Validation" icon={Target}>
          {report.problemValidation}
        </SectionCard>

        <SectionCard title="Customer Persona" icon={Users}>
          {report.customerPersona}
        </SectionCard>

        <SectionCard title="Market Analysis" icon={TrendingUp}>
          {report.marketAnalysis}
        </SectionCard>

        <SectionCard title="Competitor Analysis" icon={BarChart3}>
          {report.competitorAnalysis}
        </SectionCard>

        <SectionCard title="Monetization Review" icon={Lightbulb}>
          {report.monetizationReview}
        </SectionCard>

        <SectionCard title="Unique Angle" icon={Lightbulb}>
          {report.uniqueAngle}
        </SectionCard>

        <SectionCard title="Investor Readiness" icon={CheckCircle2}>
          {report.investorReadiness}
        </SectionCard>
      </section>

      <section className="mt-6">
        <SectionCard title="SWOT Analysis" icon={ShieldAlert}>
          <div className="grid md:grid-cols-2 gap-4">
            <List title="Strengths" items={report.swotAnalysis?.strengths} />
            <List title="Weaknesses" items={report.swotAnalysis?.weaknesses} />
            <List title="Opportunities" items={report.swotAnalysis?.opportunities} />
            <List title="Threats" items={report.swotAnalysis?.threats} />
          </div>
        </SectionCard>
      </section>

      <section className="grid lg:grid-cols-3 gap-6 mt-6">
        <SectionCard title="MVP Roadmap" icon={CheckCircle2}>
          <NumberList items={report.mvpRoadmap} />
        </SectionCard>

        <SectionCard title="Go-To-Market Strategy" icon={TrendingUp}>
          <NumberList items={report.goToMarketStrategy} />
        </SectionCard>

        <SectionCard title="Risk Analysis" icon={ShieldAlert}>
          <BulletList items={report.riskAnalysis} />
        </SectionCard>

        <SectionCard title="Suggested Tech Stack" icon={Lightbulb}>
          <BulletList items={report.techStackSuggestion} />
        </SectionCard>

        <SectionCard title="AI Usage Suggestions" icon={Lightbulb}>
          <BulletList items={report.aiUsageSuggestions} />
        </SectionCard>
      </section>
    </main>
  );
};

const SectionCard = ({ title, children, icon: Icon }) => (
  <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
    <div className="flex items-center gap-3 mb-4">
      {Icon && <Icon className="text-emerald-400" size={22} />}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <div className="text-zinc-300 leading-7">{children}</div>
  </div>
);

const ScoreBox = ({ label, value, max }) => {
  const percentage = Math.min(100, Math.round(((value || 0) / max) * 100));

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="font-semibold text-emerald-400">
          {value || 0}/{max}
        </p>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const NumberList = ({ items = [] }) => (
  <ul className="space-y-3">
    {items?.map((item, index) => (
      <li key={index} className="flex gap-3">
        <span className="text-emerald-400">{index + 1}.</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const BulletList = ({ items = [] }) => (
  <ul className="space-y-3">
    {items?.map((item, index) => (
      <li key={index} className="flex gap-3">
        <span className="text-emerald-400">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const List = ({ title, items = [] }) => (
  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
    <h3 className="font-semibold text-emerald-400 mb-3">{title}</h3>
    <BulletList items={items} />
  </div>
);

export default ReportDetails;