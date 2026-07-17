// AWS Infrastructure page.
// Explains the cloud architecture visually and maps each part of the portal to
// the AWS service that would power it in production.

// The request/data flow, top to bottom (matches the project's target architecture).
const flow = [
  { label: 'Users', icon: '👥', note: 'Students & administrators (browser)' },
  { label: 'Application Load Balancer', icon: '⚖️', note: 'Distributes traffic, health checks (ELB)' },
  { label: 'EC2 Instance', icon: '🖥️', note: 'Runs the app inside a VPC + Security Groups' },
  { label: 'Express Backend', icon: '🔌', note: 'REST API (containerized with Docker)' },
  { label: 'S3 · MongoDB', icon: '🗄️', note: 'File storage + database' },
  { label: 'CloudWatch', icon: '📈', note: 'Logs, metrics & alarms' },
];

// Every AWS service the project maps to, with its role in this architecture.
const services = [
  { name: 'Amazon EC2', icon: '🖥️', color: 'bg-orange-100 text-orange-700',
    role: 'Virtual server that hosts the Express backend and serves the React app. Scales up or down as demand changes.' },
  { name: 'Amazon S3', icon: '🪣', color: 'bg-emerald-100 text-emerald-700',
    role: 'Object storage for course files and uploads (the Resources page). Durable, cheap, and served over HTTPS.' },
  { name: 'AWS IAM', icon: '🔐', color: 'bg-red-100 text-red-700',
    role: 'Identity & Access Management — defines users, roles, and least-privilege policies controlling who can touch each resource.' },
  { name: 'Amazon VPC', icon: '🌐', color: 'bg-blue-100 text-blue-700',
    role: 'Virtual Private Cloud — an isolated network with public/private subnets in which the EC2 instances run.' },
  { name: 'Security Groups', icon: '🛡️', color: 'bg-violet-100 text-violet-700',
    role: 'Virtual firewalls attached to instances — allow inbound 80/443 from the load balancer and restrict everything else.' },
  { name: 'Elastic Load Balancer', icon: '⚖️', color: 'bg-indigo-100 text-indigo-700',
    role: 'Application Load Balancer spreads incoming traffic across healthy EC2 instances and performs health checks.' },
  { name: 'Amazon EBS', icon: '💽', color: 'bg-amber-100 text-amber-700',
    role: 'Elastic Block Store — persistent disk volumes attached to EC2 instances, with snapshot backups.' },
  { name: 'Amazon CloudWatch', icon: '📈', color: 'bg-teal-100 text-teal-700',
    role: 'Centralized logs, metrics, dashboards, and alarms for monitoring the health of the whole system.' },
  { name: 'Docker', icon: '🐳', color: 'bg-sky-100 text-sky-700',
    role: 'Containerizes the frontend and backend so they run identically in every environment.' },
  { name: 'Amazon ECS / EKS', icon: '☸️', color: 'bg-fuchsia-100 text-fuchsia-700',
    role: 'Container orchestration — ECS or Elastic Kubernetes Service runs and scales the containers across the cluster.' },
];

export default function Infrastructure() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">AWS Infrastructure</h1>
        <p className="text-sm text-slate-500">
          How the Cloud Campus Portal maps to Amazon Web Services
        </p>
      </div>

      {/* Architecture flow diagram */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-slate-800">Cloud Architecture</h2>
        <div className="mx-auto flex max-w-md flex-col items-center">
          {flow.map((step, i) => (
            <div key={step.label} className="w-full">
              <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span className="text-2xl">{step.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800">{step.label}</p>
                  <p className="text-xs text-slate-500">{step.note}</p>
                </div>
              </div>
              {i < flow.length - 1 && (
                <div className="flex justify-center py-1 text-xl text-aws-orange">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Service explanations */}
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Services & Their Roles</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <div key={s.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${s.color}`}>
                {s.icon}
              </span>
              <h3 className="font-semibold text-slate-800">{s.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{s.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
