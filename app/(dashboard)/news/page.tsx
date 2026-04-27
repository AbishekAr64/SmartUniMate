'use client';
import { useState } from "react";

type Category =
  | "all"
  | "academic"
  | "events"
  | "deadlines"
  | "faculty"
  | "sports"
  | "careers";

interface NewsItem {
  id: number;
  category: Exclude<Category, "all">;
  badge: string;
  title: string;
  description: string;
  date: string;
  source: string;
  accent: string;
  icon: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    category: "deadlines",
    badge: "Deadline",
    title: "Mid-Semester Exam Timetable – Semester 2, 2026",
    description:
      "IS and CS students: IS2030 is scheduled for March 22 at 9 AM.",
    date: "Mar 3, 2026",
    source: "Examinations Division",
    accent: "bg-red-50 border-red-300",
    icon: "📋",
  },
  {
    id: 2,
    category: "events",
    badge: "Event",
    title: "Faculty of Computing Open Day – March 14, 2026",
    description:
      "Join us for an open day showcasing final year projects and AI demos.",
    date: "Mar 5, 2026",
    source: "Faculty of Computing",
    accent: "bg-green-50 border-green-300",
    icon: "🖥️",
  },
];

const filters = [
  { label: "All News", value: "all", icon: "📰" },
  { label: "Academic", value: "academic", icon: "🎓" },
  { label: "Events", value: "events", icon: "📅" },
  { label: "Deadlines", value: "deadlines", icon: "🔴" },
  { label: "Faculty", value: "faculty", icon: "🏛️" },
  { label: "Sports", value: "sports", icon: "🏆" },
  { label: "Careers", value: "careers", icon: "💼" },
];

export default function News() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const filtered = newsItems.filter((item) => {
    const matchCat = activeFilter === "all" || item.category === activeFilter;
    const matchSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 font-sans">
      {/* Header */}
      <div className="mb-4 sm:mb-5">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900">
          University News & Announcements
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Stay updated with the latest from Sabaragamuwa University
        </p>
      </div>

      {/* Filters - scrollable on mobile */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto pb-3 -mx-3 px-3 sm:px-0 sm:flex-wrap">
        {filters.map((f) => {
          const isActive = activeFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value as Category)}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition whitespace-nowrap ${
                isActive
                  ? "bg-red-900 text-white"
                  : "bg-white border text-gray-600"
              }`}
            >
              {f.icon} {f.label}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 my-4 sm:my-5">
        <input
          type="text"
          placeholder="🔍 Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm outline-none min-w-0"
        />
        <button className="bg-red-900 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap">
          Search
        </button>
      </div>

      {/* Featured */}
      {(activeFilter === "all" || activeFilter === "academic") &&
        search === "" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 sm:mb-5">
            <div className="h-32 sm:h-40 md:h-52 bg-gradient-to-r from-red-900 via-red-700 to-red-500 flex items-center justify-center text-5xl sm:text-6xl text-white">
              🎓
            </div>
            <div className="p-3 sm:p-4 md:p-6">
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                Sabaragamuwa University Launches Smart Campus Initiative 2026
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                The university has officially launched Smart Campus 2026 with
                AI-assisted learning and smart attendance systems.
              </p>
              <p className="text-xs text-gray-400 mt-2 sm:mt-3">
                📅 March 1, 2026 · University Administration
              </p>
            </div>
          </div>
        )}

      {/* News List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition w-full"
            >
              <div
                className={`sm:w-32 flex items-center justify-center text-4xl p-6 border-b sm:border-b-0 sm:border-r ${item.accent}`}
              >
                {item.icon}
              </div>

              <div className="p-4 flex flex-col gap-2">
                <span className="inline-block text-xs font-semibold bg-gray-100 px-2 py-1 rounded w-fit">
                  {item.badge}
                </span>

                <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600">{item.description}</p>

                <span className="text-xs text-gray-400">
                  📅 {item.date} · {item.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm text-center py-16 px-4">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-medium text-gray-500">
            No news found for this filter.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Try selecting a different category.
          </p>
        </div>
      )}
    </div>
  );
}