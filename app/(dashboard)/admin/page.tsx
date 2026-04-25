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
  { label: "User Management", value: "users", icon: "👥" },
  { label: "Post Moderation", value: "posts", icon: "📋" },
  { label: "Knowledge Base", value: "knowledge", icon: "📚" },
  { label: "Analytics & Logs", value: "analytics", icon: "📈" },
  { label: "News Management", value: "news", icon: "📰" },
];

const STUDENTS = [
  { index: "22FIS0582", name: "S. Vithuckshana", email: "22fis0582@ms.sab.ac.lk", role: "Student", status: "Active", avatar: "🧑‍🎓" },
  { index: "22FCS0088", name: "S. Vithuckshana B", email: "22fcs0088@ms.sab.ac.lk", role: "Moderator", status: "Active", avatar: "👩‍💻" },
];

const POSTS_DATA = [
  { id: 1, author: "S. Vithuckshana", title: "Best food spots near the university?", category: "Campus Life", status: "Active", reports: 0, time: "2h ago" },
  { id: 3, author: "R.M. Gunasekara", title: "Inappropriate content post example", category: "Q&A", status: "Reported", reports: 3, time: "1d ago" },
];

const CHATBOT_DATA = [
  { day: "Mon", queries: 38 },
  { day: "Tue", queries: 52 },
  { day: "Wed", queries: 45 },
  { day: "Thu", queries: 61 },
  { day: "Fri", queries: 74 },
  { day: "Sat", queries: 29 },
  { day: "Sun", queries: 48 },
];

const maxQ = Math.max(...CHATBOT_DATA.map((d) => d.queries));

function StatCard({
  value,
  label,
  sub,
}: {
  value: string | number;
  label: string;
  sub: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm flex-1 min-w-[160px]">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">
        {label}
      </div>
      <div className="text-sm text-green-600 mt-2">{sub}</div>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [userSearch, setUserSearch] = useState("");
  const [bannedUsers, setBannedUsers] = useState<Set<string>>(new Set(["23FCS0211"]));
  const [removedPosts, setRemovedPosts] = useState<Set<number>>(new Set());

  const filteredStudents = STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    s.index.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-red-900">
          Admin Dashboard
        </h1>
        <p className="text-xs text-gray-400">
          Smart UniMate · Administrator Panel
        </p>
      </div>

      {/* TABS */}
      <div className="flex overflow-x-auto border-b mb-6 gap-2">
        {ADMIN_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveTab(t.value as AdminTab)}
            className={`flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap border-b-2 transition
              ${activeTab === t.value
                ? "border-red-700 text-red-700 font-semibold"
                : "border-transparent text-gray-500"
              }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value="1,248" label="Students" sub="↑ 12 this week" />
            <StatCard value="347" label="Queries Today" sub="↑ 23%" />
            <StatCard value="89" label="Active Posts" sub="↑ 5 today" />
            <StatCard value="4" label="Reports" sub="Needs review" />
          </div>

          {/* CHART */}
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <h2 className="text-xs uppercase text-gray-400 mb-4">
              Chatbot Usage
            </h2>

            <div className="flex items-end gap-3 h-40">
              {CHATBOT_DATA.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-gray-500">{d.queries}</div>
                  <div
                    className="w-full bg-red-700 rounded-t"
                    style={{ height: `${(d.queries / maxQ) * 100}%` }}
                  />
                  <div className="text-xs text-gray-400">{d.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* USERS TABLE */}
          <div className="bg-white border rounded-xl overflow-x-auto">
            <div className="flex justify-between p-4 border-b flex-wrap gap-2">
              <input
                className="border rounded px-3 py-1 text-sm"
                placeholder="Search..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>

            <div className="min-w-[700px]">
              <div className="grid grid-cols-6 bg-gray-100 text-xs font-bold p-3 text-gray-500">
                <span>Index</span>
                <span>Name</span>
                <span>Email</span>
                <span>Role</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {filteredStudents.map((s) => {
                const banned = bannedUsers.has(s.index);

                return (
                  <div
                    key={s.index}
                    className="grid grid-cols-6 p-3 border-t text-sm items-center hover:bg-gray-50"
                  >
                    <span className="font-mono text-gray-500">{s.index}</span>
                    <span className="flex items-center gap-2">
                      {s.avatar} {s.name}
                    </span>
                    <span className="text-gray-500">{s.email}</span>
                    <span>{s.role}</span>
                    <span className={banned ? "text-red-600" : "text-green-600"}>
                      {banned ? "Banned" : "Active"}
                    </span>

                    <button
                      onClick={() =>
                        setBannedUsers((prev) => {
                          const copy = new Set(prev);
                          banned ? copy.delete(s.index) : copy.add(s.index);
                          return copy;
                        })
                      }
                      className="text-xs border px-2 py-1 rounded hover:bg-red-50"
                    >
                      {banned ? "Unban" : "Ban"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* USERS TAB */}
      {activeTab === "users" && (
        <div className="bg-white border rounded-xl p-4">
          <h2 className="text-sm font-bold mb-4">All Users</h2>
          <p className="text-gray-400 text-sm">User management section</p>
        </div>
      )}

      {/* POSTS TAB */}
      {activeTab === "posts" && (
        <div className="bg-white border rounded-xl p-4 space-y-3">
          {POSTS_DATA.map((p) => (
            <div key={p.id} className="border p-3 rounded hover:bg-gray-50">
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-gray-400">
                {p.author} · {p.time}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* KNOWLEDGE TAB */}
      {activeTab === "knowledge" && (
        <div className="bg-white border rounded-xl p-4 text-sm text-gray-600">
          Knowledge base content here
        </div>
      )}

      {/* ANALYTICS */}
      {activeTab === "analytics" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="1,248" label="Students" sub="↑ 12" />
          <StatCard value="347" label="Queries" sub="↑ 23%" />
          <StatCard value="94%" label="Success Rate" sub="Stable" />
          <StatCard value="2.9K" label="Monthly Queries" sub="↑ 8%" />
        </div>
      )}

      {/* NEWS */}
      {activeTab === "news" && (
        <div className="space-y-3">
          <button className="bg-red-800 text-white px-4 py-2 rounded">
            + Add News
          </button>

          <div className="bg-white border rounded-xl p-4">
            News management panel
          </div>
        </div>
      )}

    </div>
  );
}