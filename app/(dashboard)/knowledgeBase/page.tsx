'use client';

import { useState } from "react";

const PRIMARY = "text-red-900";
const PRIMARY_BG = "bg-red-900";
const PRIMARY_HOVER = "hover:bg-red-700";

type AdminTab =
  | "overview"
  | "users"
  | "posts"
  | "knowledge"
  | "analytics"
  | "news";

type EntryStatus = "Active" | "Draft";

interface KBEntry {
  id: number;
  category: string;
  title: string;
  sourceType: "pdf" | "manual";
  sourceMeta: string;
  source: string;
  lastUpdated: string;
  status: EntryStatus;
}

const ADMIN_TABS = [
  { label: "Overview", value: "overview", icon: "📊" },
  { label: "User Management", value: "users", icon: "👥" },
  { label: "Post Moderation", value: "posts", icon: "📋" },
  { label: "Knowledge Base", value: "knowledge", icon: "📚" },
  { label: "Analytics & Logs", value: "analytics", icon: "📈" },
  { label: "News Management", value: "news", icon: "📰" },
];

const INITIAL_ENTRIES: KBEntry[] = [
  {
    id: 1,
    category: "Academic",
    title: "IS2030 Database Systems – Course Outline & Assessments",
    sourceType: "pdf",
    sourceMeta: "Uploaded PDF · 12 pages",
    source: "Faculty of Computing Portal",
    lastUpdated: "Mar 1, 2026",
    status: "Active",
  },
  {
    id: 2,
    category: "Campus",
    title: "Campus Map – Building Locations, Rooms & Facilities",
    sourceType: "manual",
    sourceMeta: "Manual Entry · Belihuloya Campus",
    source: "University Administration",
    lastUpdated: "Feb 20, 2026",
    status: "Active",
  },
  {
    id: 3,
    category: "Policy",
    title: "Student Examination Rules & Regulations 2026",
    sourceType: "pdf",
    sourceMeta: "Uploaded PDF · 8 pages",
    source: "Examinations Division, SUSL",
    lastUpdated: "Jan 15, 2026",
    status: "Draft",
  },
];

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState<AdminTab>("knowledge");
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [search, setSearch] = useState("");
  const [retraining, setRetraining] = useState(false);
  const [retrained, setRetrained] = useState(false);

  const filtered = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.source.toLowerCase().includes(search.toLowerCase())
  );

  const deleteEntry = (id: number) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  const publishEntry = (id: number) =>
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: "Active" as EntryStatus } : e
      )
    );

  const handleRetrain = () => {
    setRetraining(true);
    setTimeout(() => {
      setRetraining(false);
      setRetrained(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 font-sans">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className={`text-lg sm:text-xl md:text-2xl font-bold ${PRIMARY}`}>Admin Dashboard</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Smart UniMate · Mr. D. Patabandi · Administrator
        </p>
      </div>

      {/* Tabs - scrollable on mobile */}
      <div className="flex gap-1 border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-3 px-3 sm:px-0 sm:flex-wrap">
        {ADMIN_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveTab(t.value as AdminTab)}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap border-b-2 transition ${
              activeTab === t.value
                ? "border-red-900 text-red-900 font-semibold"
                : "border-transparent text-gray-500 hover:text-red-900"
            }`}
          >
            <span className="text-sm">{t.icon}</span>
            <span className="hidden xs:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "knowledge" ? (
        <>
          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {[
              { icon: "📄", label: "Upload PDF / Doc" },
              { icon: "✏️", label: "Add Manual Entry" },
              { icon: "🔗", label: "Link External Source" },
            ].map((a) => (
              <button
                key={a.label}
                className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 hover:border-red-900 hover:bg-red-50 transition flex flex-col items-center"
              >
                <span className="text-2xl sm:text-3xl">{a.icon}</span>
                <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 text-center">
                  {a.label}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>
            <button
              className={`${PRIMARY_BG} text-white px-4 sm:px-5 py-2 rounded-lg font-semibold text-xs sm:text-sm ${PRIMARY_HOVER}`}
            >
              + Add Entry
            </button>
          </div>

          {/* Table/Desktop */}
          <div className="hidden md:block bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="grid grid-cols-6 bg-slate-900 text-gray-300 text-xs font-bold uppercase tracking-wider px-5 py-3">
              <span>Category</span>
              <span>Title</span>
              <span>Source</span>
              <span>Updated</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {filtered.map((entry) => (
              <div
                key={entry.id}
                className="grid grid-cols-6 px-5 py-4 border-t items-center text-sm hover:bg-gray-50"
              >
                <span>{entry.category}</span>
                <div>
                  <p className="font-semibold">{entry.title}</p>
                  <p className="text-xs text-gray-400">{entry.sourceMeta}</p>
                </div>
                <span>{entry.source}</span>
                <span>{entry.lastUpdated}</span>
                <span
                  className={`text-xs px-2 py-1 rounded w-fit ${
                    entry.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {entry.status}
                </span>
                <div className="flex gap-2">
                  <button className="border px-3 py-1 rounded">Edit</button>
                  {entry.status === "Draft" ? (
                    <button
                      onClick={() => publishEntry(entry.id)}
                      className="border border-green-400 text-green-700 px-3 py-1 rounded"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="border border-red-400 text-red-700 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {filtered.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-xl border shadow-sm p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {entry.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      entry.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>
                <h3 className="font-semibold">{entry.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{entry.sourceMeta}</p>
                <p className="text-sm text-gray-600 mt-2">{entry.source}</p>
                <p className="text-xs text-gray-400 mt-1">{entry.lastUpdated}</p>

                <div className="flex gap-2 mt-4">
                  <button className="border px-3 py-1 rounded text-sm">
                    Edit
                  </button>
                  {entry.status === "Draft" ? (
                    <button
                      onClick={() => publishEntry(entry.id)}
                      className="border border-green-400 text-green-700 px-3 py-1 rounded text-sm"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="border border-red-400 text-red-700 px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Retrain Banner */}
          <div className="mt-4 sm:mt-6 bg-white rounded-xl border shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div>
              <h3
                className={`font-bold ${
                  retrained ? "text-green-700" : "text-purple-700"
                }`}
              >
                🧠{" "}
                {retrained
                  ? "Chatbot Successfully Retrained!"
                  : "Retrain Chatbot with Updated Knowledge"}
              </h3>
              <p className="text-sm text-gray-400">
                {retrained
                  ? "Updated successfully."
                  : "Last trained: March 3, 2026"}
              </p>
            </div>

            <button
              onClick={handleRetrain}
              disabled={retraining}
              className={`px-5 py-2 rounded-lg text-white font-semibold ${
                retraining
                  ? "bg-gray-500"
                  : retrained
                  ? "bg-green-700"
                  : "bg-red-900 hover:bg-red-700"
              }`}
            >
              {retraining
                ? "⏳ Retraining..."
                : retrained
                ? "✅ Retrain Again"
                : "🔄 Retrain Chatbot"}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl border shadow-sm p-12 text-center text-gray-400">
          <div className="text-4xl mb-3">
            {ADMIN_TABS.find((t) => t.value === activeTab)?.icon}
          </div>
          <p className="font-semibold text-gray-700">
            {ADMIN_TABS.find((t) => t.value === activeTab)?.label}
          </p>
          <p className="text-sm mt-1">This section is under construction.</p>
        </div>
      )}
    </div>
  );
}