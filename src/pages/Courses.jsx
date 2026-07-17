import ResourceManager from '../components/ResourceManager.jsx';

export default function Courses() {
  return (
    <ResourceManager
      title="Courses"
      collection="courses"
      columns={[
        { key: 'code', label: 'Code' },
        { key: 'title', label: 'Title' },
        { key: 'instructor', label: 'Instructor' },
        { key: 'credits', label: 'Credits' },
        { key: 'enrolled', label: 'Enrolled' },
      ]}
      fields={[
        { key: 'code', label: 'Course Code' },
        { key: 'title', label: 'Title' },
        { key: 'instructor', label: 'Instructor' },
        { key: 'credits', label: 'Credits', type: 'number' },
        { key: 'enrolled', label: 'Enrolled', type: 'number' },
      ]}
    />
  );
}
