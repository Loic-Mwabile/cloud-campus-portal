import { useEffect, useRef, useState } from 'react';
import { localApi, formatBytes } from '../data/store.js';

// Simulated Amazon S3 bucket. Uploading a file records its metadata (name, type,
// size) as an "object" in the mock bucket — no bytes leave the browser, matching
// the project's "mock implementation is acceptable" guidance.
const BUCKET = 's3://cloud-campus-portal-assets';

// Pick an emoji icon based on MIME type.
function iconFor(type = '') {
  if (type.startsWith('image/')) return '🖼️';
  if (type.includes('pdf')) return '📄';
  if (type.includes('presentation') || type.includes('powerpoint')) return '📊';
  if (type.includes('sheet') || type.includes('excel') || type.includes('csv')) return '📈';
  if (type.includes('zip') || type.includes('compressed')) return '🗜️';
  return '📁';
}

export default function Resources() {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const load = async () => setFiles(await localApi.get('/resources'));
  useEffect(() => {
    load();
  }, []);

  const upload = async (fileList) => {
    for (const file of fileList) {
      await localApi.post('/resources', {
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        uploadedAt: new Date().toISOString(),
      });
    }
    load();
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) upload(e.dataTransfer.files);
  };

  const remove = async (file) => {
    if (!confirm(`Delete "${file.name}" from the bucket?`)) return;
    await localApi.del(`/resources/${file.id}`);
    load();
  };

  const totalBytes = files.reduce((sum, f) => sum + (f.size || 0), 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Resources</h1>
        <p className="text-sm text-slate-500">
          Course files stored in <span className="font-mono text-slate-700">{BUCKET}</span>
        </p>
      </div>

      {/* Bucket summary */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs text-slate-500">Objects</p>
          <p className="text-xl font-bold text-slate-800">{files.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs text-slate-500">Total Size</p>
          <p className="text-xl font-bold text-slate-800">{formatBytes(totalBytes)}</p>
        </div>
        <div className="flex items-center rounded-lg border border-aws-orange/30 bg-aws-orange/10 px-4 py-3">
          <span className="text-sm font-medium text-aws-navy">🪣 Amazon S3 (simulated)</span>
        </div>
      </div>

      {/* Upload dropzone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`mb-6 cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver ? 'border-brand-500 bg-brand-50' : 'border-slate-300 bg-white hover:bg-slate-50'
        }`}
      >
        <div className="text-3xl">⬆️</div>
        <p className="mt-2 text-sm font-medium text-slate-700">
          Drag &amp; drop files here, or click to browse
        </p>
        <p className="text-xs text-slate-400">Uploads are simulated — file metadata is stored locally.</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files?.length && upload(e.target.files)}
        />
      </div>

      {/* Object list */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((f) => (
          <div key={f.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="text-3xl">{iconFor(f.type)}</div>
              <button
                onClick={() => remove(f)}
                className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
            <p className="mt-2 truncate font-medium text-slate-800" title={f.name}>{f.name}</p>
            <p className="text-xs text-slate-400">{formatBytes(f.size)}</p>
            <p className="mt-1 text-xs text-slate-400">
              {new Date(f.uploadedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        {files.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-slate-400">
            The bucket is empty. Upload a file to get started.
          </p>
        )}
      </div>
    </div>
  );
}
