import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";

const ValidateIdea = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    idea: "",
    targetMarket: "",
    businessModel: "",
    industry: "",
    country: "",
    competitors: "",
    budget: "",
    teamSize: "",
    stage: "",
    timeline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.idea.trim() ||
      !formData.targetMarket.trim() ||
      !formData.businessModel.trim()
    ) {
      toast.error("Please fill the 4 required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/ideas", formData);
      toast.success("Startup report generated");
      navigate(`/report/${res.data.report._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Validation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <section className="rounded-[2rem] border border-white/10 bg-[#111827] p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            <Sparkles size={16} />
            VentureLens Analysis
          </div>

          <h1 className="text-4xl font-semibold tracking-tight mt-6">
            Validate your startup idea
          </h1>

          <p className="text-zinc-400 mt-3 leading-7">
            Fill the first 4 required fields. Extra details are optional but help
            AI generate a stronger report.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <Input
                label="Startup title *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Local Retail AI"
              />

              <Input
                label="Target market *"
                name="targetMarket"
                value={formData.targetMarket}
                onChange={handleChange}
                placeholder="Small shop owners in India"
              />
            </div>

            <Textarea
              label="Startup idea *"
              name="idea"
              value={formData.idea}
              onChange={handleChange}
              placeholder="Describe your product, users, problem and solution..."
            />

            <Input
              label="Business model *"
              name="businessModel"
              value={formData.businessModel}
              onChange={handleChange}
              placeholder="Monthly SaaS subscription"
            />

            <div className="pt-4 border-t border-white/10">
              <h2 className="text-xl font-semibold">Optional details</h2>
              <p className="text-zinc-500 mt-1 text-sm">
                These are not required, but they improve AI analysis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Input
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Retail Tech, EdTech, HealthTech"
              />

              <Input
                label="Country / Region"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="India, US, Global"
              />

              <Input
                label="Known competitors"
                name="competitors"
                value={formData.competitors}
                onChange={handleChange}
                placeholder="Zoho, Vyapar, Notion..."
              />

              <Input
                label="Budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="₹10,000 / ₹50,000 / Bootstrapped"
              />

              <Input
                label="Team size"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                placeholder="Solo founder / 2 members"
              />

              <Input
                label="Current stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                placeholder="Idea / MVP / Prototype"
              />
            </div>

            <Input
              label="Timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="Want to build MVP in 1 month"
            />

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-500 py-3 font-medium text-black hover:bg-emerald-400 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating startup report...
                </>
              ) : (
                "Generate validation report"
              )}
            </button>
          </form>
        </section>

        <aside className="rounded-[2rem] border border-white/10 bg-[#111827] p-8 h-fit">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
            <BrainCircuit className="text-emerald-400" />
          </div>

          <h2 className="text-2xl font-semibold mt-6">AI will generate</h2>

          <div className="space-y-3 mt-6">
            {[
              "Executive summary",
              "Problem validation",
              "Customer persona",
              "Market analysis",
              "Competitor analysis",
              "SWOT analysis",
              "MVP roadmap",
              "Go-to-market plan",
              "Investor readiness score",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
};

const Input = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-sm text-zinc-400">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-emerald-400/50"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-sm text-zinc-400">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={7}
      placeholder={placeholder}
      className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-emerald-400/50"
    />
  </div>
);

export default ValidateIdea;