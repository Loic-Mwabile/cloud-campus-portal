import ResourceManager from '../components/ResourceManager.jsx';

const badge = (value) => (
  <span
    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
      value === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
    }`}
  >
    {value}
  </span>
);

export default function Students() {
  return (
    <ResourceManager
      title="Students"
      collection="students"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'course', label: 'Course' },
        { key: 'year', label: 'Year' },
        { key: 'status', label: 'Status', render: badge },
      ]}
      fields={[
        { key: 'name', label: 'Full Name' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'course', label: 'Course' },
        { key: 'year', label: 'Year', type: 'number' },
        { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
      ]}
    />
  );
}
