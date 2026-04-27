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
    <div className="bg-white dark:bg-stone-900 border border-gray-200 dark:border-stone-800 rounded-xl p-3 sm:p-4 w-full shadow-sm">
      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-gray-500 dark:text-stone-400 uppercase mt-1 tracking-wide">
        {title}
      </div>
      <div className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-2">
        {sub}
      </div>
    </div>
  );
}

function UserCardMobile({ s }: { s: (typeof STUDENTS)[number] }) {
  return (
    <div className="p-3 border-t border-gray-200 dark:border-stone-800">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-sm flex items-center gap-2 text-gray-900 dark:text-white">
          {s.avatar} {s.name}
        </span>
        <button className="text-xs border border-gray-300 dark:border-stone-700 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-stone-800">
          Manage
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-gray-600 dark:text-stone-400">
        <span>
          <span className="font-medium text-gray-800 dark:text-stone-200">
            Index:
          </span>{" "}
          {s.index}
        </span>
        <span>
          <span className="font-medium text-gray-800 dark:text-stone-200">
            Role:
          </span>{" "}
          {s.role}
        </span>
        <span className="col-span-2 break-all">
          <span className="font-medium text-gray-800 dark:text-stone-200">
            Email:
          </span>{" "}
          {s.email}
        </span>
        <span className="text-green-600 dark:text-green-400">● Active</span>
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
    <div className="min-h-screen bg-gray-50 dark:bg-stone-950 p-3 sm:p-4 md:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900 dark:text-red-400">
          Admin Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-stone-400">
          Smart UniMate Admin Panel
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 overflow-x-auto border-b border-gray-200 dark:border-stone-800 pb-3 -mx-3 px-3 sm:mx-0 sm:px-0">
        {ADMIN_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value as AdminTab)}
            className={`whitespace-nowrap px-3 py-2 text-[11px] sm:text-sm rounded-lg transition flex-shrink-0 border ${
              tab === t.value
                ? "bg-red-900 text-white border-red-900"
                : "bg-white dark:bg-stone-900 text-gray-600 dark:text-stone-300 border-gray-200 dark:border-stone-800 hover:bg-red-50 dark:hover:bg-stone-800"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div className="space-y-4 mt-4">

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Card title="Students" value="1,248" sub="↑ 12 this week" />
            <Card title="Queries" value="347" sub="↑ 23%" />
            <Card title="Posts" value="89" sub="↑ 5 today" />
            <Card title="Reports" value="4" sub="Needs review" />
          </div>

          {/* CHART */}
          <div className="bg-white dark:bg-stone-900 border border-gray-200 dark:border-stone-800 rounded-xl p-4">
            <h2 className="text-xs sm:text-sm text-gray-500 dark:text-stone-400 mb-4">
              Chatbot Usage
            </h2>

            <div className="flex items-end gap-2 h-36 min-w-0">
              {CHATBOT.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center">
                  <div className="text-[10px] text-gray-500 dark:text-stone-400">
                    {d.value}
                  </div>
                  <div
                    className="w-full bg-red-700 dark:bg-red-500 rounded-t"
                    style={{ height: `${(d.value / max) * 100}%` }}
                  />
                  <div className="text-[10px] text-gray-400 dark:text-stone-500 mt-1">
                    {d.day}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* USERS */}
          <div className="bg-white dark:bg-stone-900 border border-gray-200 dark:border-stone-800 rounded-xl overflow-hidden">

            {/* SEARCH */}
            <div className="p-3 border-b border-gray-200 dark:border-stone-800">
              <input
                className="border border-gray-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-xs sm:text-sm w-full"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-stone-800 text-[10px] sm:text-xs text-gray-500 dark:text-stone-300 uppercase">
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
                      className="border-t border-gray-200 dark:border-stone-800 text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-stone-800"
                    >
                      <td className="px-4 py-3 text-gray-500 dark:text-stone-400">
                        {s.index}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">
                        {s.avatar} {s.name}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-stone-400 break-all">
                        {s.email}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-stone-300">
                        {s.role}
                      </td>
                      <td className="px-4 py-3 text-green-600 dark:text-green-400">
                        Active
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs border border-gray-300 dark:border-stone-700 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-stone-800">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}
            <div className="sm:hidden">
              {filtered.map((s) => (
                <UserCardMobile key={s.index} s={s} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POSTS */}
      {tab === "posts" && (
        <div className="bg-white dark:bg-stone-900 border border-gray-200 dark:border-stone-800 rounded-xl p-4 space-y-3 mt-4">
          {POSTS.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 dark:border-stone-800 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-stone-800 cursor-pointer"
            >
              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                {p.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-stone-400 mt-1">
                {p.author} · {p.time}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PLACEHOLDERS */}
      {["users", "knowledge"].includes(tab) && (
        <div className="bg-white dark:bg-stone-900 border border-gray-200 dark:border-stone-800 rounded-xl p-6 mt-4 text-sm text-gray-500 dark:text-stone-400 text-center">
          {tab} section
        </div>
      )}

      {tab === "analytics" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
          <Card title="Students" value="1,248" sub="↑ 12" />
          <Card title="Queries" value="347" sub="↑ 23%" />
          <Card title="Success" value="94%" sub="Stable" />
          <Card title="Monthly" value="2.9K" sub="↑ 8%" />
        </div>
      )}

      {tab === "news" && (
        <div className="bg-white dark:bg-stone-900 border border-gray-200 dark:border-stone-800 rounded-xl p-4 mt-4">
          <button className="bg-red-900 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-red-800">
            + Add News
          </button>
        </div>
      )}

    </div>
  );
}