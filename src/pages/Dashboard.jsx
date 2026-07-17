import { useEffect, useState } from 'react';
import { localApi, formatBytes } from '../data/store.js';
import StatCard from '../components/StatCard.jsx';
import BarChart from '../components/BarChart.jsx';
import DonutChart from '../components/DonutChart.jsx';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    localApi.get('/stats').then(setStats);
  }, []);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-800">Dashboard</h1>
      <p className="mb-6 text-sm text-slate-500">Overview of your cloud campus</p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={stats?.students ?? '—'} icon="🎓" accent="brand" />
        <StatCard label="Courses" value={stats?.courses ?? '—'} icon="📚" accent="green" />
        <StatCard label="Assignments" value={stats?.assignments ?? '—'} icon="📝" accent="violet"
          hint={stats ? `${stats.openAssignments} open` : ''} />
        <StatCard
          label="Storage Used"
          value={stats ? formatBytes(stats.storageBytes) : '—'}
          icon="🗄️"
          accent="amber"
          hint="Amazon S3 (simulated)"
        />
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BarChart
          title="Course Enrollment"
          unit=" students"
          data={stats?.courses_data ?? []}
        />
        <DonutChart title="Students by Course" data={stats?.students_by_course ?? []} />
      </div>
    </div>
  );
}
