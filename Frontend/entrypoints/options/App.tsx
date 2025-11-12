const quickStats = [
  { label: 'Saved Prompts', value: 42, trend: '+8%', trendUp: true },
  { label: 'AI Sessions', value: 16, trend: '+3', trendUp: true },
  { label: 'Daily Limit', value: '12 / 25', trend: '48%', trendUp: false },
];

const recentActivity = [
  { title: 'Translated marketing copy', time: '5 minutes ago', type: 'translation' },
  { title: 'Generated onboarding checklist', time: '28 minutes ago', type: 'content' },
  { title: 'Summarized user interview', time: '2 hours ago', type: 'summary' },
];

const featuredWorkflows = [
  {
    title: 'Product Launch Copy',
    description: 'Generate multi-channel messaging for launch campaigns in minutes.',
    badge: 'Popular',
  },
  {
    title: 'Interview Insights',
    description: 'Summarize qualitative research interviews with actionable highlights.',
    badge: 'New',
  },
  {
    title: 'Support Reply Drafts',
    description: 'Draft consistent customer replies tailored to your voice and tone.',
    badge: 'Team favorite',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-semibold">Kingsman Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">
              Stay on top of your AI-assisted workflows and insights.
            </p>
          </div>
          <button className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-400">
            Upgrade Plan
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="grid gap-6 md:grid-cols-3">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-blue-500/5"
            >
              <p className="text-sm uppercase tracking-wide text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
              <p
                className={`mt-2 text-xs font-medium ${
                  stat.trendUp ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {stat.trendUp ? '▲' : '▼'} {stat.trend} vs. last week
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <p className="text-sm text-slate-400">
                    Track the latest actions performed through the extension.
                  </p>
                </div>
                <button className="text-sm font-medium text-blue-400 hover:text-blue-300">
                  View log
                </button>
              </div>

              <ul className="mt-6 space-y-4">
                {recentActivity.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4"
                  >
                    <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-400" />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.time}</p>
                      <span className="mt-3 inline-flex items-center rounded-full bg-slate-800 px-2.5 py-1 text-xs capitalize text-slate-300">
                        {item.type}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold">Featured Workflows</h2>
            <p className="mt-1 text-sm text-slate-400">
              Jump into preset workflows to accelerate your tasks.
            </p>
            <div className="mt-5 space-y-4">
              {featuredWorkflows.map((workflow) => (
                <div
                  key={workflow.title}
                  className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow shadow-blue-500/5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{workflow.title}</h3>
                    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                      {workflow.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{workflow.description}</p>
                  <button className="mt-3 text-xs font-medium text-blue-400 hover:text-blue-300">
                    Launch workflow
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-purple-500/10 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Need custom automation?</h2>
              <p className="mt-2 text-sm text-slate-200">
                Drop us the workflow steps and we’ll wire up a tailored AI assistant for your team.
              </p>
            </div>
            <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200">
              Book a session
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;