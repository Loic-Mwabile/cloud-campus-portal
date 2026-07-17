import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

// Settings page. Profile + preferences persist to localStorage (mock save).
export default function Settings() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('ccp-settings') || '{}');
    return {
      name: user?.name || '',
      email: user?.email || '',
      region: stored.region || 'us-east-1',
      emailNotifications: stored.emailNotifications ?? true,
      weeklyReports: stored.weeklyReports ?? false,
    };
  });

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem('ccp-settings', JSON.stringify(form));
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Settings</h1>

      <form onSubmit={save} className="space-y-6">
        {/* Profile */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Profile</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">Name</label>
              <input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Cloud preferences */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Cloud Preferences</h2>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-600">Default AWS Region</label>
            <select
              value={form.region}
              onChange={(e) => update('region', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none sm:max-w-xs"
            >
              <option value="us-east-1">US East (N. Virginia) — us-east-1</option>
              <option value="us-west-2">US West (Oregon) — us-west-2</option>
              <option value="eu-west-1">Europe (Ireland) — eu-west-1</option>
              <option value="ap-south-1">Asia Pacific (Mumbai) — ap-south-1</option>
            </select>
          </div>

          <Toggle
            label="Email notifications"
            checked={form.emailNotifications}
            onChange={(v) => update('emailNotifications', v)}
          />
          <Toggle
            label="Weekly CloudWatch report"
            checked={form.weeklyReports}
            onChange={(v) => update('weeklyReports', v)}
          />
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Save Changes
          </button>
          {saved && <span className="text-sm font-medium text-emerald-600">✓ Saved</span>}
        </div>
      </form>
    </div>
  );
}

// Small reusable toggle switch.
function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? 'bg-brand-600' : 'bg-slate-300'
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
