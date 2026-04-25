'use client';
import { useState } from "react";

type AdminTab = "overview" | "users" | "posts" | "knowledge" | "analytics" | "news";

const PRIMARY = "#7f1d1d";
const PRIMARY_LIGHT = "#fef2f2";
const PRIMARY_MID = "#b91c1c";

const ADMIN_TABS: { label: string; value: AdminTab; icon: string }[] = [
  { label: "Overview", value: "overview", icon: "📊" },
  { label: "User Management", value: "users", icon: "👥" },
  { label: "Post Moderation", value: "posts", icon: "📋" },
  { label: "Knowledge Base", value: "knowledge", icon: "📚" },
  { label: "Analytics & Logs", value: "analytics", icon: "📈" },
  { label: "News Management", value: "news", icon: "📰" },
];

const STUDENTS = [
  { index: "22FIS0582", name: "S. Vithuckshana", email: "22fis0582@ms.sab.ac.lk", role: "Student", status: "Active", avatar: "🧑‍🎓" },
  { index: "22FIS0581", name: "M. Mathurya", email: "22fis0581@ms.sab.ac.lk", role: "Student", status: "Active", avatar: "👨‍💻" },
  { index: "22FCS0580", name: "R. Abishek", email: "22fcs0580@ms.sab.ac.lk", role: "Student", status: "Active", avatar: "🧑‍💻" },
  { index: "21FIS0342", name: "K.D. Perera", email: "22fis0342@ms.sab.ac.lk", role: "Student", status: "Active", avatar: "👩‍🎓" },
  { index: "23FCS0211", name: "R.M. Gunasekara", email: "23fcs0211@ms.sab.ac.lk", role: "Student", status: "Banned", avatar: "🎓" },
  { index: "22FCS0088", name: "S. Vithuckshana B", email: "22fcs0088@ms.sab.ac.lk", role: "Moderator", status: "Active", avatar: "👩‍💻" },
];

const POSTS_DATA = [
  { id: 1, author: "S. Vithuckshana", title: "Best food spots near the university?", category: "Campus Life", status: "Active", reports: 0, time: "2h ago" },
  { id: 2, author: "K.D. Perera", title: "IS3040 Group Assignment — anyone need members?", category: "Academic", status: "Active", reports: 0, time: "5h ago" },
  { id: 3, author: "R.M. Gunasekara", title: "Inappropriate content post example", category: "Q&A", status: "Reported", reports: 3, time: "1d ago" },
  { id: 4, author: "M. Mathurya", title: "IEEE Student Branch – Open Recruitment 2026", category: "Clubs & Events", status: "Active", reports: 0, time: "2d ago" },
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

const StatCard = ({ value, label, sub, subColor }: { value: string | number; label: string; sub: string; subColor?: string }) => (
  <div style={{
    background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "20px 24px", flex: 1, minWidth: 160,
  }}>
    <div style={{ fontSize: 32, fontWeight: 700, color: subColor === "orange" ? "#d97706" : "#111827", marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 12, color: subColor === "orange" ? "#d97706" : "#16a34a", fontWeight: 500 }}>{sub}</div>
  </div>
);

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [userSearch, setUserSearch] = useState("");
  const [bannedUsers, setBannedUsers] = useState<Set<string>>(new Set(["23FCS0211"]));
  const [removedPosts, setRemovedPosts] = useState<Set<number>>(new Set());

  const filteredStudents = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      s.index.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div style={{ padding: "16px 20px 24px 20px", fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#fafafa", minHeight: "100vh" }} className="sm:p-5 md:p-7 lg:p-8">

      {/* PAGE HEADER */}
      <div style={{ marginBottom: 16 }} className="sm:mb-5">
        <h1 style={{ fontSize: 18, fontWeight: 700, color: PRIMARY, margin: 0, letterSpacing: "-0.3px" }} className="sm:text-xl md:text-2xl">
          Admin Dashboard
        </h1>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: "4px 0 0" }} className="sm:text-13">
          Smart UniMate · Mr. D. Patabandi · Administrator
        </p>
      </div>

      {/* TABS - scrollable on mobile */}
      <div style={{ display: "flex", flexWrap: "nowrap", gap: 0, borderBottom: "2px solid #f3f4f6", marginBottom: 16, overflowX: "auto", paddingBottom: 2 }} className="sm:mb-6 sm:flex-wrap">
        {ADMIN_TABS.map((t) => {
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

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div>
          {/* STAT CARDS */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }} className="sm:gap-14 sm:mb-5">
            <StatCard value="1,248" label="Total Students" sub="↑ 12 this week" />
            <StatCard value="347" label="Chatbot Queries Today" sub="↑ 23% vs yesterday" />
            <StatCard value="89" label="Active Posts" sub="↑ 5 new today" />
            <StatCard value="4" label="Reported Content" sub="Needs Review" subColor="orange" />
          </div>

          {/* CHARTS ROW */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }} className="sm:gap-14 sm:mb-5">
            {/* Bar Chart */}
            <div style={{
              flex: 2, minWidth: 260, background: "#fff", borderRadius: 12,
              border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "16px 20px",
            }} className="sm:p-5 md:p-6">
              <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 20px" }}>
                Chatbot Usage — Last 7 Days
              </p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
                {CHATBOT_DATA.map((d) => (
                  <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 500 }}>{d.queries}</span>
                    <div style={{
                      width: "100%", borderRadius: "4px 4px 0 0",
                      background: `linear-gradient(180deg, ${PRIMARY_MID}, ${PRIMARY})`,
                      height: `${(d.queries / maxQ) * 90}px`,
                      transition: "height 0.3s",
                      opacity: 0.85,
                    }} />
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pie Chart (User Roles) */}
            <div style={{
              flex: 1, minWidth: 200, background: "#fff", borderRadius: 12,
              border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "20px 24px",
            }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 20px" }}>
                User Roles
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Students", count: 1198, pct: 96, color: PRIMARY },
                  { label: "Moderators", count: 38, pct: 3, color: "#2563eb" },
                  { label: "Admins", count: 12, pct: 1, color: "#d97706" },
                ].map((r) => (
                  <div key={r.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{r.label}</span>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>{r.count} ({r.pct}%)</span>
                    </div>
                    <div style={{ height: 8, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${r.pct}%`, background: r.color, borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STUDENT ACCOUNTS TABLE */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.5px", textTransform: "uppercase", margin: 0 }}>Student Accounts</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 12 }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    style={{ padding: "6px 10px 6px 28px", border: "1.5px solid #e5e7eb", borderRadius: 7, fontSize: 12, fontFamily: "inherit", outline: "none", width: 140, color: "#374151" }}
                    onFocus={(e) => (e.target.style.borderColor = PRIMARY_MID)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
                <button style={{ padding: "6px 12px", background: PRIMARY, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_MID)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
                >+ Add</button>
              </div>
            </div>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 100px 90px 120px", padding: "10px 20px", background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
              {["Index No", "Name", "Email", "Role", "Status", "Actions"].map((h) => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</span>
              ))}
            </div>
            {filteredStudents.map((s, i) => {
              const isBanned = bannedUsers.has(s.index);
              return (
                <div key={s.index} style={{
                  display: "grid", gridTemplateColumns: "120px 1fr 1fr 100px 90px 120px",
                  padding: "12px 20px", borderTop: i === 0 ? "none" : "1px solid #f9fafb",
                  alignItems: "center", transition: "background 0.1s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  <span style={{ fontSize: 12.5, color: "#6b7280", fontFamily: "monospace" }}>{s.index}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{s.avatar}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{s.name}</span>
                  </div>
                  <span style={{ fontSize: 12.5, color: "#6b7280" }}>{s.email}</span>
                  <span style={{
                    fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 4, display: "inline-block",
                    background: s.role === "Moderator" ? "#eff6ff" : "#faf5ff",
                    color: s.role === "Moderator" ? "#1e40af" : "#6b21a8",
                    border: s.role === "Moderator" ? "1px solid #93c5fd" : "1px solid #d8b4fe",
                  }}>{s.role}</span>
                  <span style={{
                    fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 4, display: "inline-block",
                    background: isBanned ? "#fff0f0" : "#f0fdf4",
                    color: isBanned ? "#991b1b" : "#166534",
                    border: isBanned ? "1px solid #fca5a5" : "1px solid #86efac",
                  }}>{isBanned ? "Banned" : "Active"}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: "4px 10px", background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb", borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = PRIMARY)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                    >Edit</button>
                    <button
                      onClick={() => setBannedUsers((prev) => { const n = new Set(prev); isBanned ? n.delete(s.index) : n.add(s.index); return n; })}
                      style={{ padding: "4px 10px", background: "#fff", color: isBanned ? "#16a34a" : "#991b1b", border: `1.5px solid ${isBanned ? "#86efac" : "#fca5a5"}`, borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
                    >{isBanned ? "Unban" : "Ban"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── USER MANAGEMENT TAB ── */}
      {activeTab === "users" && (
        <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #f3f4f6" }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.5px", textTransform: "uppercase", margin: 0 }}>All Users</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 100px 90px 120px", padding: "10px 20px", background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
            {["Index No", "Name", "Email", "Role", "Status", "Actions"].map((h) => (
              <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>
          {STUDENTS.map((s, i) => {
            const isBanned = bannedUsers.has(s.index);
            return (
              <div key={s.index} style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 100px 90px 120px", padding: "12px 20px", borderTop: i === 0 ? "none" : "1px solid #f9fafb", alignItems: "center" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                <span style={{ fontSize: 12.5, color: "#6b7280", fontFamily: "monospace" }}>{s.index}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 20 }}>{s.avatar}</span><span style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{s.name}</span></div>
                <span style={{ fontSize: 12.5, color: "#6b7280" }}>{s.email}</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 4, display: "inline-block", background: s.role === "Moderator" ? "#eff6ff" : "#faf5ff", color: s.role === "Moderator" ? "#1e40af" : "#6b21a8", border: s.role === "Moderator" ? "1px solid #93c5fd" : "1px solid #d8b4fe" }}>{s.role}</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 4, display: "inline-block", background: isBanned ? "#fff0f0" : "#f0fdf4", color: isBanned ? "#991b1b" : "#166534", border: isBanned ? "1px solid #fca5a5" : "1px solid #86efac" }}>{isBanned ? "Banned" : "Active"}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ padding: "4px 10px", background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb", borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
                  <button onClick={() => setBannedUsers((prev) => { const n = new Set(prev); isBanned ? n.delete(s.index) : n.add(s.index); return n; })}
                    style={{ padding: "4px 10px", background: "#fff", color: isBanned ? "#16a34a" : "#991b1b", border: `1.5px solid ${isBanned ? "#86efac" : "#fca5a5"}`, borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
                  >{isBanned ? "Unban" : "Ban"}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── POST MODERATION TAB ── */}
      {activeTab === "posts" && (
        <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #f3f4f6" }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.5px", textTransform: "uppercase", margin: 0 }}>Post Moderation</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 90px 60px 130px", padding: "10px 20px", background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
            {["Post Title", "Author", "Category", "Reports", "Actions"].map((h) => (
              <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>
          {POSTS_DATA.filter((p) => !removedPosts.has(p.id)).map((p, i) => (
            <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr 120px 90px 60px 130px", padding: "13px 20px", borderTop: i === 0 ? "none" : "1px solid #f9fafb", alignItems: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{p.title}</div>
                <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 2 }}>{p.time}</div>
              </div>
              <span style={{ fontSize: 12.5, color: "#6b7280" }}>{p.author}</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 4, display: "inline-block", background: "#eff6ff", color: "#1e40af", border: "1px solid #93c5fd" }}>{p.category}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: p.reports > 0 ? "#991b1b" : "#9ca3af" }}>{p.reports}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ padding: "4px 10px", background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb", borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>View</button>
                <button onClick={() => setRemovedPosts((prev) => new Set([...prev, p.id]))}
                  style={{ padding: "4px 10px", background: "#fff", color: "#991b1b", border: "1.5px solid #fca5a5", borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
                >Remove</button>
              </div>
            </div>
          ))}
          {POSTS_DATA.every((p) => removedPosts.has(p.id)) && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#9ca3af", fontSize: 13 }}>✅ All posts reviewed.</div>
          )}
        </div>
      )}

      {/* ── KNOWLEDGE BASE TAB ── */}
      {activeTab === "knowledge" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { q: "What is the deadline for adding/dropping modules?", a: "Module add/drop deadline is the end of Week 2 of each semester.", tag: "Academic" },
            { q: "How does the GPA grading system work at SUSL?", a: "SUSL uses a 4.0 GPA scale. A = 4.0, B+ = 3.5, B = 3.0, C+ = 2.5, C = 2.0, D = 1.0, F = 0.0.", tag: "Academic" },
            { q: "How do I report a technical issue with the student portal?", a: "Submit a ticket via the IT Help Desk at it.support@sab.ac.lk or visit the ICT Centre.", tag: "Support" },
            { q: "Where is the library and what are its opening hours?", a: "The main library is near the Admin block, open Mon–Fri 8AM–8PM and Sat 8AM–1PM.", tag: "Campus" },
          ].map((kb, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#111827" }}>❓ {kb.q}</span>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 4, background: "#eff6ff", color: "#1e40af", border: "1px solid #93c5fd" }}>{kb.tag}</span>
                  <button style={{ padding: "3px 10px", background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb", borderRadius: 6, fontSize: 11.5, cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
                  <button style={{ padding: "3px 10px", background: "#fff", color: "#991b1b", border: "1.5px solid #fca5a5", borderRadius: 6, fontSize: 11.5, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>💡 {kb.a}</p>
            </div>
          ))}
          <button style={{ padding: "10px 20px", background: PRIMARY, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", alignSelf: "flex-start" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_MID)}
            onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
          >+ Add Knowledge Entry</button>
        </div>
      )}

      {/* ── ANALYTICS & LOGS TAB ── */}
      {activeTab === "analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <StatCard value="1,248" label="Total Students" sub="↑ 12 this week" />
            <StatCard value="347" label="Chatbot Queries Today" sub="↑ 23% vs yesterday" />
            <StatCard value="2,914" label="Total Queries (Month)" sub="↑ 8% vs last month" />
            <StatCard value="94%" label="Query Resolution Rate" sub="Based on feedback" />
          </div>
          <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "20px 24px" }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 16px" }}>Recent Activity Log</p>
            {[
              { time: "10:42 AM", event: "S. Vithuckshana logged in", type: "info" },
              { time: "10:38 AM", event: "Post 'Best food spots' received 3 new likes", type: "info" },
              { time: "09:15 AM", event: "R.M. Gunasekara's post flagged by 2 users", type: "warn" },
              { time: "08:50 AM", event: "New user registered: 23FCS0299 — A. Malshan", type: "info" },
              { time: "Yesterday", event: "Admin removed inappropriate post (ID #47)", type: "danger" },
            ].map((log, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderTop: i === 0 ? "none" : "1px solid #f9fafb" }}>
                <span style={{ fontSize: 10, color: "#9ca3af", whiteSpace: "nowrap", marginTop: 2, minWidth: 70 }}>{log.time}</span>
                <span style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, marginTop: 5, background: log.type === "danger" ? "#ef4444" : log.type === "warn" ? "#d97706" : "#16a34a" }} />
                <span style={{ fontSize: 13, color: "#374151" }}>{log.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── NEWS MANAGEMENT TAB ── */}
      {activeTab === "news" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={{ padding: "9px 20px", background: PRIMARY, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_MID)}
              onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
            >+ Add News Article</button>
          </div>
          {[
            { title: "Sabaragamuwa University Launches Smart Campus Initiative 2026", category: "Academic", date: "Mar 1, 2026", source: "University Administration", featured: true },
            { title: "Mid-Semester Exam Timetable – Semester 2, 2026", category: "Deadline", date: "Mar 3, 2026", source: "Examinations Division", featured: false },
            { title: "Faculty of Computing Open Day – March 14, 2026", category: "Event", date: "Mar 5, 2026", source: "Faculty of Computing", featured: false },
            { title: "Career Fair 2026 – Over 40 Companies Participating", category: "Careers", date: "Mar 4, 2026", source: "Career Guidance Unit", featured: false },
          ].map((article, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  {article.featured && <span style={{ fontSize: 10, fontWeight: 700, background: "#fef08a", color: "#713f12", padding: "1px 7px", borderRadius: 4 }}>⭐ FEATURED</span>}
                  <span style={{ fontSize: 10.5, fontWeight: 700, padding: "1px 8px", borderRadius: 4, background: "#eff6ff", color: "#1e40af", border: "1px solid #93c5fd" }}>{article.category}</span>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{article.title}</div>
                <div style={{ fontSize: 11.5, color: "#9ca3af" }}>📅 {article.date} · {article.source}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button style={{ padding: "6px 12px", background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb", borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
                <button style={{ padding: "6px 12px", background: "#fff", color: "#991b1b", border: "1.5px solid #fca5a5", borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}