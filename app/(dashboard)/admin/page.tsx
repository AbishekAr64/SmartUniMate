'use client';
import { useState } from "react";

type AdminTab =
  | "overview"
  | "users"
  | "posts"
  | "knowledge"
  | "analytics"
  | "news";

const ADMIN_TABS = [
  { label: "Overview", value: "overview", icon: "📊" },
  { label: "Users", value: "users", icon: "👥" },
  { label: "Posts", value: "posts", icon: "📋" },
  { label: "Knowledge", value: "knowledge", icon: "📚" },
  { label: "Analytics", value: "analytics", icon: "📈" },
  { label: "News", value: "news", icon: "📰" },
];

const STUDENTS = [
  {
    index: "22FIS0582",
    name: "S. Vithuckshana",
    email: "22fis0582@ms.sab.ac.lk",
    role: "Student",
    avatar: "🧑‍🎓",
  },
  {
    index: "22FCS0088",
    name: "S. Vithuckshana B",
    email: "22fcs0088@ms.sab.ac.lk",
    role: "Moderator",
    avatar: "👩‍💻",
  },
];

const POSTS = [
  {
    id: 1,
    title: "Best food spots near university?",
    author: "S. Vithuckshana",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Inappropriate content post example",
    author: "R.M. Gunasekara",
    time: "1d ago",
  },
];

const CHATBOT = [
  { day: "Mon", value: 38 },
  { day: "Tue", value: 52 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 61 },
  { day: "Fri", value: 74 },
  { day: "Sat", value: 29 },
  { day: "Sun", value: 48 },
];

const max = Math.max(...CHATBOT.map((d) => d.value));

function Card({
  title,
  value,
  sub,
}: {
  title: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-3 sm:p-4 w-full shadow-sm">
      <div className="text-xl sm:text-2xl font-bold">{value}</div>
      <div className="text-[10px] sm:text-xs text-gray-400 uppercase mt-1 tracking-wide">
        {title}
      </div>
      <div className="text-xs sm:text-sm text-green-600 mt-2">{sub}</div>
    </div>
  );
}

/** Mobile-only user card — shown below sm breakpoint */
function UserCardMobile({
  s,
}: {
  s: (typeof STUDENTS)[number];
}) {
  return (
    <div className="p-3 border-t first:border-t-0">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-sm flex items-center gap-2">
          {s.avatar} {s.name}
        </span>
        <button className="text-xs border px-2 py-1 rounded hover:bg-red-50">
          Manage
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-gray-500">
        <span>
          <span className="font-medium text-gray-700">Index:</span> {s.index}
        </span>
        <span>
          <span className="font-medium text-gray-700">Role:</span> {s.role}
        </span>
        <span className="col-span-2 break-all">
          <span className="font-medium text-gray-700">Email:</span> {s.email}
        </span>
        <span className="text-green-600">● Active</span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [search, setSearch] = useState("");

  const filtered = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.index.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900">
          Admin Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Smart UniMate Admin Panel
        </p>
      </div>

      {/* TABS — scrollable, no scrollbar visible */}
      <div className="flex gap-2 overflow-x-auto border-b border-gray-200 pb-3 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
        {ADMIN_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value as AdminTab)}
            className={`whitespace-nowrap px-3 py-2 text-[11px] sm:text-sm rounded-lg transition flex-shrink-0 ${
              tab === t.value
                ? "bg-red-900 text-white"
                : "bg-white border text-gray-600 hover:bg-red-50"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === "overview" && (
        <div className="space-y-4 mt-4">

          {/* STATS — 2 cols on mobile, 4 on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Card title="Students" value="1,248" sub="↑ 12 this week" />
            <Card title="Queries" value="347" sub="↑ 23%" />
            <Card title="Posts" value="89" sub="↑ 5 today" />
            <Card title="Reports" value="4" sub="Needs review" />
          </div>

          {/* CHART */}
          <div className="bg-white border rounded-xl p-4">
            <h2 className="text-xs sm:text-sm text-gray-400 mb-4">
              Chatbot Usage
            </h2>
            <div className="overflow-x-auto">
              <div className="flex items-end gap-2 h-36 min-w-[280px]">
                {CHATBOT.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center">
                    <div className="text-[10px] text-gray-500">{d.value}</div>
                    <div
                      className="w-full bg-red-700 rounded-t"
                      style={{ height: `${(d.value / max) * 100}%` }}
                    />
                    <div className="text-[10px] text-gray-400 mt-1">{d.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* USER TABLE */}
          <div className="bg-white border rounded-xl overflow-hidden">

            {/* SEARCH */}
            <div className="p-3 border-b">
              <input
                className="border rounded-lg px-3 py-2 text-xs sm:text-sm w-full"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Desktop table — hidden on xs, shown sm+ */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-gray-100 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <tr>
                    {["Index", "Name", "Email", "Role", "Status", "Action"].map(
                      (h) => (
                        <th key={h} className="px-4 py-3">
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr
                      key={s.index}
                      className="border-t text-xs sm:text-sm hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-gray-500">{s.index}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2">
                          {s.avatar} {s.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 break-all text-gray-500">
                        {s.email}
                      </td>
                      <td className="px-4 py-3">{s.role}</td>
                      <td className="px-4 py-3 text-green-600">Active</td>
                      <td className="px-4 py-3">
                        <button className="text-xs border px-2 py-1 rounded hover:bg-red-50">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards — shown only on xs */}
            <div className="sm:hidden">
              {filtered.map((s) => (
                <UserCardMobile key={s.index} s={s} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── POSTS ── */}
      {tab === "posts" && (
        <div className="bg-white border rounded-xl p-4 space-y-3 mt-4">
          {POSTS.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="font-semibold text-sm">{p.title}</div>
              <div className="text-xs text-gray-400 mt-1">
                {p.author} · {p.time}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── USERS placeholder ── */}
      {tab === "users" && (
        <div className="bg-white border rounded-xl p-6 mt-4 text-sm text-gray-400 text-center">
          User management section
        </div>
      )}

      {/* ── KNOWLEDGE placeholder ── */}
      {tab === "knowledge" && (
        <div className="bg-white border rounded-xl p-6 mt-4 text-sm text-gray-400 text-center">
          Knowledge base section
        </div>
      )}

      {/* ── ANALYTICS ── */}
      {tab === "analytics" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
          <Card title="Students" value="1,248" sub="↑ 12" />
          <Card title="Queries" value="347" sub="↑ 23%" />
          <Card title="Success" value="94%" sub="Stable" />
          <Card title="Monthly" value="2.9K" sub="↑ 8%" />
        </div>
      )}

      {/* ── NEWS ── */}
      {tab === "news" && (
        <div className="bg-white border rounded-xl p-4 mt-4">
          <button className="bg-red-900 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-red-800 transition">
            + Add News
          </button>
        </div>
      )}

    </div>
  );
}