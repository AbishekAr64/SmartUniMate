'use client';
import { useState } from "react";

type Tab = "profile" | "posts" | "chat" | "notifications" | "settings";

const PRIMARY = "#7f1d1d";
const PRIMARY_LIGHT = "#fef2f2";
const PRIMARY_MID = "#b91c1c";

const TABS: { label: string; value: Tab; icon: string }[] = [
  { label: "My Profile", value: "profile", icon: "👤" },
  { label: "My Posts", value: "posts", icon: "📝" },
  { label: "Chat History", value: "chat", icon: "💬" },
  { label: "Notifications", value: "notifications", icon: "🔔" },
  { label: "Settings", value: "settings", icon: "⚙️" },
];

const RECENT_POSTS = [
  { id: 1, title: "Tips for the IS2030 Database Assignment 📁", category: "Academic", categoryStyle: { background: "#faf5ff", color: "#6b21a8", border: "1px solid #d8b4fe" }, time: "Yesterday" },
  { id: 2, title: "Best places to print project reports near campus 🖨️", category: "Campus Life", categoryStyle: { background: "#f0fdf4", color: "#166534", border: "1px solid #86efac" }, time: "3 days ago" },
  { id: 3, title: "Anyone joining the IEEE recruitment drive? 🎉", category: "Clubs & Events", categoryStyle: { background: "#eff6ff", color: "#1e40af", border: "1px solid #93c5fd" }, time: "5 days ago" },
];

const NOTIFICATIONS = [
  { id: 1, icon: "🔥", text: "K.D. Perera liked your post \"Tips for IS2030 Database Assignment\"", time: "2 hours ago", unread: true },
  { id: 2, icon: "💬", text: "T.N. Bandara commented on your post: \"Thanks so much, this really helped!\"", time: "5 hours ago", unread: true },
  { id: 3, icon: "📢", text: "New announcement: Mid-Semester Exam Timetable released.", time: "1 day ago", unread: false },
  { id: 4, icon: "🔥", text: "R.M. Gunasekara liked your post \"Best places to print near campus\"", time: "2 days ago", unread: false },
];

const CHAT_HISTORY = [
  { id: 1, query: "What are the GPA requirements for Dean's List?", reply: "To qualify for the Dean's List at SUSL, you typically need a GPA of 3.7 or above with no failed modules.", time: "Today, 10:42 AM" },
  { id: 2, query: "When is the deadline for Semester 3 module registration?", reply: "Semester 3 module registration closes on March 10, 2026. Visit the Academic Affairs portal to complete registration.", time: "Yesterday, 3:15 PM" },
  { id: 3, query: "How do I apply for a hostel room transfer?", reply: "Submit a Room Transfer Request form at the Student Affairs office. Requests are reviewed at the start of each semester.", time: "3 days ago, 9:00 AM" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "R. Abishek",
    index: "22FIS0580",
    email: "22fis0580@ms.sab.ac.lk",
    mobile: "075-3304697",
    faculty: "Faculty of Computing",
    department: "Computing & Information Systems",
    year: "Year 2 · Semester 1",
    hostel: "Block B, Room 214, Belihuloya",
  });
  const [draft, setDraft] = useState({ ...form });

  const field = (label: string, key: keyof typeof form, readOnly = false) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.2px", textTransform: "uppercase" }}>
        {label}
      </label>
      <input
        value={editing ? draft[key] : form[key]}
        readOnly={!editing || readOnly}
        onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
        style={{
          padding: "10px 14px",
          border: `1.5px solid ${editing && !readOnly ? PRIMARY_MID : "#e5e7eb"}`,
          borderRadius: 8,
          fontSize: 13.5,
          color: readOnly ? "#9ca3af" : "#111827",
          background: readOnly ? "#f9fafb" : editing ? "#fff" : "#fafafa",
          fontFamily: "inherit",
          outline: "none",
          cursor: readOnly ? "default" : editing ? "text" : "default",
          transition: "border 0.12s",
        }}
      />
    </div>
  );

  return (
    <div style={{ padding: "28px 32px", fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#fafafa", minHeight: "100vh" }}>

      {/* PAGE HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: PRIMARY, margin: 0, letterSpacing: "-0.3px" }}>
          Profile
        </h1>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "4px 0 0" }}>
          Manage your account and preferences
        </p>
      </div>

      {/* TABS */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 0,
        borderBottom: "2px solid #f3f4f6", marginBottom: 24,
      }}>
        {TABS.map((t) => {
          const isActive = activeTab === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setActiveTab(t.value)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 14px", border: "none", background: "transparent",
                fontFamily: "inherit", fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? PRIMARY : "#6b7280",
                cursor: "pointer", whiteSpace: "nowrap",
                borderBottom: isActive ? `2px solid ${PRIMARY}` : "2px solid transparent",
                marginBottom: "-2px", transition: "all 0.12s",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = PRIMARY; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#6b7280"; }}
            >
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── MY PROFILE TAB ── */}
      {activeTab === "profile" && (
        <div>
          {/* PROFILE HEADER CARD */}
          <div style={{
            background: "#fff", borderRadius: 12,
            border: "1.5px solid #f3f4f6",
            boxShadow: "0 2px 10px rgba(127,29,29,0.06)",
            padding: "24px 28px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
          }}>
            {/* Avatar */}
            <div style={{
              width: 90, height: 90, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, ${PRIMARY}22, #dc262622)`,
              border: `3px solid ${PRIMARY}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 48,
            }}>🧑‍🎓</div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 180 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                {form.name}
              </h2>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 2px" }}>
                Index: {form.index} · {form.department}
              </p>
              <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>
                {form.year.split("·")[0].trim()} · {form.faculty} · Sabaragamuwa University of Sri Lanka
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                <button
                  onClick={() => { setEditing(!editing); if (editing) setForm({ ...draft }); }}
                  style={{
                    padding: "8px 18px", background: editing ? PRIMARY : PRIMARY,
                    color: "#fff", border: "none", borderRadius: 8,
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_MID)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
                >
                  ✏️ {editing ? "Save Profile" : "Edit Profile"}
                </button>
                {editing && (
                  <button
                    onClick={() => { setEditing(false); setDraft({ ...form }); }}
                    style={{
                      padding: "8px 18px", background: "#fff",
                      color: "#6b7280", border: "1.5px solid #e5e7eb",
                      borderRadius: 8, fontSize: 13, fontWeight: 500,
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  style={{
                    padding: "8px 18px", background: "#fff",
                    color: "#374151", border: "1.5px solid #e5e7eb",
                    borderRadius: 8, fontSize: 13, fontWeight: 500,
                    cursor: "pointer", fontFamily: "inherit",
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "border-color 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = PRIMARY)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                >
                  🖼️ Change Photo
                </button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
              {[{ label: "Posts", value: 7 }, { label: "Questions", value: 24 }, { label: "Comments", value: 31 }].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: PRIMARY }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM FIELDS */}
          <div style={{
            background: "#fff", borderRadius: 12,
            border: "1.5px solid #f3f4f6",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            padding: "24px 28px", marginBottom: 20,
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
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

          {/* RECENT POSTS */}
          <div style={{
            background: "#fff", borderRadius: 12,
            border: "1.5px solid #f3f4f6",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            padding: "20px 24px",
          }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 14px" }}>
              My Recent Posts
            </p>
            {RECENT_POSTS.map((p, i) => (
              <div
                key={p.id}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 0",
                  borderTop: i === 0 ? "none" : "1px solid #f3f4f6",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 13.5, color: "#111827", fontWeight: 500 }}>{p.title}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, marginLeft: 16 }}>
                  <span style={{ ...p.categoryStyle, fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 4 }}>
                    {p.category}
                  </span>
                  <span style={{ fontSize: 11.5, color: "#9ca3af", whiteSpace: "nowrap" }}>{p.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MY POSTS TAB ── */}
      {activeTab === "posts" && (
        <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "20px 24px" }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 14px" }}>All My Posts</p>
          {RECENT_POSTS.map((p, i) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderTop: i === 0 ? "none" : "1px solid #f3f4f6", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "6px")}
              onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
            >
              <span style={{ fontSize: 13.5, color: "#111827", fontWeight: 500, transition: "padding 0.12s" }}>{p.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, marginLeft: 16 }}>
                <span style={{ ...p.categoryStyle, fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 4 }}>{p.category}</span>
                <span style={{ fontSize: 11.5, color: "#9ca3af", whiteSpace: "nowrap" }}>{p.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CHAT HISTORY TAB ── */}
      {activeTab === "chat" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {CHAT_HISTORY.map((c) => (
            <div key={c.id} style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>🧑‍🎓</span>
                <div style={{ background: PRIMARY_LIGHT, border: `1px solid ${PRIMARY}20`, borderRadius: 8, padding: "8px 14px", fontSize: 13.5, color: "#111827", fontWeight: 500 }}>
                  {c.query}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 18 }}>🤖</span>
                <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#4b5563", lineHeight: 1.6 }}>
                  {c.reply}
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 10, textAlign: "right" }}>{c.time}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── NOTIFICATIONS TAB ── */}
      {activeTab === "notifications" && (
        <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          {NOTIFICATIONS.map((n, i) => (
            <div key={n.id} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "16px 22px",
              borderTop: i === 0 ? "none" : "1px solid #f3f4f6",
              background: n.unread ? PRIMARY_LIGHT : "#fff",
              transition: "background 0.12s", cursor: "pointer",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
              onMouseLeave={(e) => (e.currentTarget.style.background = n.unread ? PRIMARY_LIGHT : "#fff")}
            >
              <span style={{ fontSize: 22, flexShrink: 0 }}>{n.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13.5, color: "#111827", margin: "0 0 4px", fontWeight: n.unread ? 600 : 400 }}>{n.text}</p>
                <span style={{ fontSize: 11.5, color: "#9ca3af" }}>{n.time}</span>
              </div>
              {n.unread && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: PRIMARY, flexShrink: 0, marginTop: 6 }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── SETTINGS TAB ── */}
      {activeTab === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { title: "Email Notifications", desc: "Receive email alerts for new replies and announcements", enabled: true },
            { title: "Push Notifications", desc: "Get browser push notifications for activity on your posts", enabled: false },
            { title: "Show Profile Publicly", desc: "Allow other students to view your profile and posts", enabled: true },
            { title: "Dark Mode", desc: "Switch to a darker colour scheme (system default)", enabled: false },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 12,
              border: "1.5px solid #f3f4f6",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              padding: "18px 22px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: "#6b7280" }}>{s.desc}</div>
              </div>
              <div style={{
                width: 44, height: 24, borderRadius: 12, flexShrink: 0,
                background: s.enabled ? PRIMARY : "#d1d5db",
                position: "relative", cursor: "pointer", transition: "background 0.2s",
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%", background: "#fff",
                  position: "absolute", top: 3,
                  left: s.enabled ? 23 : 3,
                  transition: "left 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }} />
              </div>
            </div>
          ))}

          {/* Logout */}
          <div style={{
            background: "#fff", borderRadius: 12,
            border: "1.5px solid #fee2e2",
            padding: "18px 22px", marginTop: 4,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#991b1b" }}>Log Out</div>
              <div style={{ fontSize: 12.5, color: "#9ca3af" }}>Sign out of your Smart UniMate account</div>
            </div>
            <button style={{
              padding: "8px 20px", background: "#fff",
              color: "#991b1b", border: "1.5px solid #fca5a5",
              borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.12s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#fff0f0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
            >
              🚪 Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}