'use client';
import { useState } from "react";

type Tab = "profile" | "posts" | "chat" | "notifications" | "settings";

const TABS = [
  { label: "My Profile", value: "profile", icon: "👤" },
  { label: "My Posts", value: "posts", icon: "📝" },
  { label: "Chat History", value: "chat", icon: "💬" },
  { label: "Notifications", value: "notifications", icon: "🔔" },
  { label: "Settings", value: "settings", icon: "⚙️" },
];

const RECENT_POSTS = [
  { id: 1, title: "Tips for the IS2030 Database Assignment 📁", category: "Academic", time: "Yesterday" },
  { id: 2, title: "Best places to print project reports near campus 🖨️", category: "Campus Life", time: "3 days ago" },
  { id: 3, title: "Anyone joining the IEEE recruitment drive? 🎉", category: "Clubs & Events", time: "5 days ago" },
];

const NOTIFICATIONS = [
  { id: 1, icon: "🔥", text: "K.D. Perera liked your post", time: "2 hours ago", unread: true },
  { id: 2, icon: "💬", text: "T.N. Bandara commented on your post", time: "5 hours ago", unread: true },
  { id: 3, icon: "📢", text: "New announcement: Mid-Semester Exam Timetable released.", time: "1 day ago", unread: false },
];

const CHAT_HISTORY = [
  { id: 1, query: "What are the GPA requirements for Dean's List?", reply: "You need GPA 3.7 or above.", time: "Today, 10:42 AM" },
  { id: 2, query: "When is the deadline for Semester 3 module registration?", reply: "March 10, 2026.", time: "Yesterday, 3:15 PM" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "R. Abishek",
    index: "22FIS0580",
    email: "22fis0580@ms.sab.ac.lk",
    mobile: "0753304697",
    faculty: "Faculty of Computing",
    department: "Computing & Information Systems",
    year: "Year 2 · Semester 1",
    hostel: "Block B, Room 214",
  });

  const [draft, setDraft] = useState({ ...form });

  const field = (label: string, key: keyof typeof form, readOnly = false) => (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <input
        value={editing ? draft[key] : form[key]}
        readOnly={!editing || readOnly}
        onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
        className={`px-4 py-2 rounded-lg border text-sm outline-none ${
          readOnly
            ? "bg-gray-50 text-gray-400 border-gray-200"
            : editing
            ? "bg-white border-red-700"
            : "bg-gray-50 border-gray-200"
        }`}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 font-sans">
      {/* Header */}
      <div className="mb-4 sm:mb-5">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900">Profile</h1>
        <p className="text-xs sm:text-sm text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Tabs - scrollable on mobile */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 mb-4 sm:mb-6 overflow-x-auto pb-3 -mx-3 px-3 sm:px-0 sm:flex-wrap">
        {TABS.map((t) => {
          const isActive = activeTab === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setActiveTab(t.value as Tab)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition whitespace-nowrap ${
                isActive
                  ? "bg-red-900 text-white"
                  : "bg-white border text-gray-600"
              }`}
            >
              {t.icon} {t.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <>
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 flex flex-col lg:flex-row gap-4 sm:gap-6 mb-4 sm:mb-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-red-100 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl mx-auto lg:mx-0">
              🧑‍🎓
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{form.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Index: {form.index} · {form.department}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                {form.year} · {form.faculty}
              </p>

              <div className="flex flex-wrap gap-2 mt-3 sm:mt-4 justify-center lg:justify-start">
                <button
                  onClick={() => {
                    if (editing) setForm({ ...draft });
                    setEditing(!editing);
                  }}
                  className="bg-red-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm"
                >
                  ✏️ {editing ? "Save" : "Edit"}
                </button>

                {editing && (
                  <button
                    onClick={() => {
                      setEditing(false);
                      setDraft({ ...form });
                    }}
                    className="border px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3 sm:gap-6 justify-center lg:justify-start">
              {["Posts", "Questions", "Comments"].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-red-900">
                    {[7, 24, 31][i]}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 uppercase">{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 mb-4 sm:mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {field("Full Name", "name")}
              {field("Index Number", "index", true)}
              {field("University Email", "email", true)}
              {field("Mobile", "mobile")}
              {field("Faculty", "faculty", true)}
              {field("Department", "department", true)}
              {field("Year / Semester", "year", true)}
              {field("Hostel Block", "hostel")}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-3 sm:mb-4">
              My Recent Posts
            </p>
            {RECENT_POSTS.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-t first:border-t-0"
              >
                <span className="text-sm font-medium text-gray-900">{p.title}</span>
                <span className="text-xs text-gray-400">{p.time}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          {RECENT_POSTS.map((p) => (
            <div key={p.id} className="py-3 border-t first:border-t-0">
              {p.title}
            </div>
          ))}
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <div className="space-y-4">
          {CHAT_HISTORY.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="mb-2 text-sm font-medium">🧑‍🎓 {c.query}</div>
              <div className="text-sm text-gray-600">🤖 {c.reply}</div>
              <div className="text-xs text-gray-400 mt-2 text-right">{c.time}</div>
            </div>
          ))}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`flex gap-3 p-4 border-t first:border-t-0 ${
                n.unread ? "bg-red-50" : "bg-white"
              }`}
            >
              <span>{n.icon}</span>
              <div className="flex-1">
                <p className="text-sm">{n.text}</p>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-4">
          {["Email Notifications", "Push Notifications", "Dark Mode"].map((s) => (
            <div
              key={s}
              className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between"
            >
              <span>{s}</span>
              <div className="w-11 h-6 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}