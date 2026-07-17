import ResourceManager from '../components/ResourceManager.jsx';

const statusBadge = (value) => (
  <span
    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
      value === 'Open' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
    }`}
  >
    {value}
  </span>
);

export default function Assignments() {
  return (
    <ResourceManager
      title="Assignments"
      collection="assignments"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'course', label: 'Course' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'points', label: 'Points' },
        { key: 'status', label: 'Status', render: statusBadge },
      ]}
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'course', label: 'Course' },
        { key: 'dueDate', label: 'Due Date', type: 'date' },
        { key: 'points', label: 'Points', type: 'number' },
        { key: 'status', label: 'Status', options: ['Open', 'Closed'] },
      ]}
    />
  );
}
