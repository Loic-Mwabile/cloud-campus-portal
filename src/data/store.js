// Mock data layer for the Cloud Campus Portal.
//
// All data lives in the browser's localStorage, so the app is fully functional
// with no backend — CRUD changes and file "uploads" persist across reloads.
// The exported `localApi` mirrors a REST client (get/post/put/del returning
// promises) so UI components read like they're talking to a real API.

const KEY = 'cloud-campus-portal';

// ---------- Seed data (used on first load) ----------
const seed = {
  students: [
    { id: 's1', name: 'Ayesha Khan', email: 'ayesha.khan@campus.edu', course: 'Cloud Engineering', year: 2, status: 'Active' },
    { id: 's2', name: 'Daniel Osei', email: 'daniel.osei@campus.edu', course: 'Computer Science', year: 3, status: 'Active' },
    { id: 's3', name: 'Mei Lin', email: 'mei.lin@campus.edu', course: 'Data Science', year: 1, status: 'Active' },
    { id: 's4', name: 'Omar Farouk', email: 'omar.farouk@campus.edu', course: 'Cyber Security', year: 4, status: 'Inactive' },
    { id: 's5', name: 'Grace Miller', email: 'grace.miller@campus.edu', course: 'Cloud Engineering', year: 2, status: 'Active' },
    { id: 's6', name: 'Tomas Vega', email: 'tomas.vega@campus.edu', course: 'Computer Science', year: 1, status: 'Active' },
  ],
  courses: [
    { id: 'c1', code: 'CL305', title: 'AWS Cloud Architecture', instructor: 'Dr. Nunez', credits: 3, enrolled: 52 },
    { id: 'c2', code: 'CS201', title: 'Distributed Systems', instructor: 'Dr. Patel', credits: 4, enrolled: 38 },
    { id: 'c3', code: 'DS110', title: 'Intro to Data Science', instructor: 'Dr. Ahmed', credits: 3, enrolled: 45 },
    { id: 'c4', code: 'SEC220', title: 'Cloud Security', instructor: 'Dr. Rossi', credits: 3, enrolled: 29 },
  ],
  assignments: [
    { id: 'a1', title: 'Deploy a MERN app to EKS', course: 'AWS Cloud Architecture', dueDate: '2026-08-01', status: 'Open', points: 100 },
    { id: 'a2', title: 'Design a VPC network diagram', course: 'AWS Cloud Architecture', dueDate: '2026-07-28', status: 'Open', points: 50 },
    { id: 'a3', title: 'Consensus algorithms report', course: 'Distributed Systems', dueDate: '2026-07-20', status: 'Closed', points: 80 },
    { id: 'a4', title: 'IAM least-privilege lab', course: 'Cloud Security', dueDate: '2026-07-30', status: 'Open', points: 60 },
  ],
  // Simulated Amazon S3 objects (see the Resources page).
  resources: [
    { id: 'r1', name: 'syllabus.pdf', type: 'application/pdf', size: 248000, uploadedAt: '2026-07-01T09:00:00.000Z' },
    { id: 'r2', name: 'lecture-01-intro.pptx', type: 'application/vnd.ms-powerpoint', size: 1820000, uploadedAt: '2026-07-03T11:30:00.000Z' },
    { id: 'r3', name: 'architecture-diagram.png', type: 'image/png', size: 540000, uploadedAt: '2026-07-05T14:15:00.000Z' },
  ],
};

// ---------- localStorage helpers ----------
function load() {
  const raw = localStorage.getItem(KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(KEY, JSON.stringify(seed));
  return structuredClone(seed);
}

function save(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

let db = load();

let counter = 1000;
const nextId = (prefix) => `${prefix}${++counter}`;

// Small delay so the UI shows realistic loading states.
const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 120));

// Map a "/students" style path to a collection name.
const collectionOf = (path) => path.split('/').filter(Boolean)[0];
const idOf = (path) => path.split('/').filter(Boolean)[1];

// ---------- REST-like API backed by localStorage ----------
export const localApi = {
  get(path) {
    const parts = path.split('/').filter(Boolean);
    const collection = parts[0];
    if (collection === 'stats') return delay(computeStats());
    const items = db[collection] || [];
    const id = parts[1];
    return delay(id ? items.find((x) => x.id === id) : items);
  },

  post(path, body) {
    const collection = collectionOf(path);
    const item = { id: nextId(collection[0]), ...body };
    db[collection].push(item);
    save(db);
    return delay(item);
  },

  put(path, body) {
    const collection = collectionOf(path);
    const id = idOf(path);
    const index = db[collection].findIndex((x) => x.id === id);
    if (index === -1) return delay(null);
    db[collection][index] = { ...db[collection][index], ...body, id };
    save(db);
    return delay(db[collection][index]);
  },

  del(path) {
    const collection = collectionOf(path);
    const id = idOf(path);
    const index = db[collection].findIndex((x) => x.id === id);
    if (index === -1) return delay(null);
    const [removed] = db[collection].splice(index, 1);
    save(db);
    return delay(removed);
  },
};

// ---------- Derived dashboard stats ----------
function computeStats() {
  const storageBytes = db.resources.reduce((sum, r) => sum + (r.size || 0), 0);
  return {
    students: db.students.length,
    courses: db.courses.length,
    assignments: db.assignments.length,
    openAssignments: db.assignments.filter((a) => a.status === 'Open').length,
    storageBytes,
    courses_data: db.courses.map((c) => ({ label: c.code, value: c.enrolled })),
    students_by_course: groupBy(db.students, 'course'),
  };
}

function groupBy(list, key) {
  const map = {};
  for (const item of list) {
    map[item[key]] = (map[item[key]] || 0) + 1;
  }
  return Object.entries(map).map(([label, value]) => ({ label, value }));
}

// Format bytes as KB / MB for display.
export function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export { nextId };
