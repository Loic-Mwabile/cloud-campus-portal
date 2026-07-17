import { NavLink } from 'react-router-dom';

// Sidebar navigation. Emoji icons keep the project dependency-free.
const links = [
  { to: '/', label: 'Dashboard', icon: '📊', end: true },
  { to: '/students', label: 'Students', icon: '🎓' },
  { to: '/courses', label: 'Courses', icon: '📚' },
  { to: '/assignments', label: 'Assignments', icon: '📝' },
  { to: '/resources', label: 'Resources', icon: '🗂️' },
  { to: '/infrastructure', label: 'AWS Infrastructure', icon: '☁️' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed z-30 flex h-full w-64 transform flex-col bg-aws-navy text-slate-100 transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <span className="text-xl">☁️</span>
          <span className="font-semibold tracking-tight">Cloud Campus</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4 text-xs text-slate-400">
          <span className="text-aws-orange">●</span> Cloud-enabled portal
        </div>
      </aside>
    </>
  );
}
