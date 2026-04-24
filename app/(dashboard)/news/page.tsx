'use client';
import { useState } from "react";

type Category = "all" | "academic" | "events" | "deadlines" | "faculty" | "sports" | "careers";

interface NewsItem {
  id: number;
  category: Exclude<Category, "all">;
  badge: string;
  badgeStyle: React.CSSProperties;
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
    badgeStyle: { background: "#fff0f0", color: "#991b1b", border: "1px solid #fca5a5" },
    title: "Mid-Semester Exam Timetable – Semester 2, 2026",
    description:
      "IS and CS students: IS2030 is scheduled for March 22 at 9 AM, New Exam Hall B, Belihuloya Campus.",
    date: "Mar 3, 2026",
    source: "Examinations Division",
    accent: "#ef4444",
    icon: "📋",
  },
  {
    id: 2,
    category: "events",
    badge: "Event",
    badgeStyle: { background: "#f0fdf4", color: "#166534", border: "1px solid #86efac" },
    title: "Faculty of Computing Open Day – March 14, 2026",
    description:
      "Join us for an open day showcasing final year projects, AI demos, and industry panel discussions at the Faculty of Computing.",
    date: "Mar 5, 2026",
    source: "Faculty of Computing",
    accent: "#16a34a",
    icon: "🖥️",
  },
  {
    id: 3,
    category: "sports",
    badge: "Sports",
    badgeStyle: { background: "#fff7ed", color: "#9a3412", border: "1px solid #fdba74" },
    title: "Inter-University Badminton Championship Results 2026",
    description:
      "SUSL claimed the runner-up title at the Inter-University Badminton Championship held in Colombo last week.",
    date: "Feb 28, 2026",
    source: "Sports Division",
    accent: "#ea580c",
    icon: "🏅",
  },
  {
    id: 4,
    category: "academic",
    badge: "Academic",
    badgeStyle: { background: "#eff6ff", color: "#1e40af", border: "1px solid #93c5fd" },
    title: "New Elective Modules Available for Semester 3 Registration",
    description:
      "Students can now register for new elective modules including Machine Learning, Cloud Computing, and UI/UX Design before March 10.",
    date: "Mar 1, 2026",
    source: "Academic Affairs",
    accent: "#2563eb",
    icon: "📚",
  },
  {
    id: 5,
    category: "faculty",
    badge: "Faculty",
    badgeStyle: { background: "#faf5ff", color: "#6b21a8", border: "1px solid #d8b4fe" },
    title: "Professor Dr. Nimal Jayawardena Joins as Dean of Science Faculty",
    description:
      "We welcome Professor Dr. Nimal Jayawardena as the new Dean of the Faculty of Science effective March 2026.",
    date: "Mar 2, 2026",
    source: "University Administration",
    accent: "#9333ea",
    icon: "🏛️",
  },
  {
    id: 6,
    category: "careers",
    badge: "Careers",
    badgeStyle: { background: "#fefce8", color: "#854d0e", border: "1px solid #fde047" },
    title: "Career Fair 2026 – Over 40 Companies Participating",
    description:
      "The annual Career Fair returns on March 28 at the Main Hall. Students are encouraged to bring CVs and dress formally.",
    date: "Mar 4, 2026",
    source: "Career Guidance Unit",
    accent: "#ca8a04",
    icon: "💼",
  },
];

const filters: { label: string; value: Category; icon: string }[] = [
  { label: "All News", value: "all", icon: "📰" },
  { label: "Academic", value: "academic", icon: "🎓" },
  { label: "Events", value: "events", icon: "📅" },
  { label: "Deadlines", value: "deadlines", icon: "🔴" },
  { label: "Faculty", value: "faculty", icon: "🏛️" },
  { label: "Sports", value: "sports", icon: "🏆" },
  { label: "Careers", value: "careers", icon: "💼" },
];

const PRIMARY = "#7f1d1d";
const PRIMARY_MID = "#b91c1c";

const News = () => {
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
    <div style={{ padding: "28px 32px", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#fafafa", minHeight: "100vh" }}>

      {/* PAGE HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: PRIMARY, margin: 0, letterSpacing: "-0.3px" }}>
          University News & Announcements
        </h1>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "4px 0 0" }}>
          Stay updated with the latest from Sabaragamuwa University
        </p>
      </div>

      {/* FILTER TABS — wraps to next line instead of scrolling */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",          /* ← wrap instead of scroll */
        gap: 0,
        borderBottom: "2px solid #f3f4f6",
        marginBottom: 0,
      }}>
        {filters.map((f) => {
          const isActive = activeFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 14px",
                border: "none", background: "transparent",
                fontFamily: "inherit", fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? PRIMARY : "#6b7280",
                cursor: "pointer", whiteSpace: "nowrap",
                borderBottom: isActive ? `2px solid ${PRIMARY}` : "2px solid transparent",
                marginBottom: "-2px",
                transition: "all 0.12s",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = PRIMARY; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#6b7280"; }}
            >
              <span style={{ fontSize: 14 }}>{f.icon}</span>
              {f.label}
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      <div style={{ display: "flex", gap: 10, margin: "16px 0 20px" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            color: "#9ca3af", fontSize: 14, pointerEvents: "none",
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search news and announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px 10px 36px",
              border: "1.5px solid #e5e7eb", borderRadius: 8,
              fontSize: 14, color: "#374151", outline: "none",
              background: "#fff", boxSizing: "border-box",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.target.style.borderColor = PRIMARY_MID)}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        </div>
        <button
          style={{
            padding: "10px 22px",
            background: PRIMARY,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_MID)}
          onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
        >
          Search
        </button>
      </div>

      {/* CONTENT AREA */}
      <div>

        {/* FEATURED CARD */}
        {(activeFilter === "all" || activeFilter === "academic") && search === "" && (
          <div style={{
            background: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 16,
            border: "1.5px solid #f3f4f6",
            boxShadow: "0 2px 10px rgba(127,29,29,0.07)",
          }}>
            <div style={{
              height: 190,
              background: `linear-gradient(135deg, ${PRIMARY} 0%, #b91c1c 50%, #dc2626 100%)`,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", width: 300, height: 300, borderRadius: "50%",
                border: "60px solid rgba(255,255,255,0.05)", top: -80, right: -60,
              }} />
              <div style={{
                position: "absolute", width: 200, height: 200, borderRadius: "50%",
                border: "40px solid rgba(255,255,255,0.06)", bottom: -80, left: 40,
              }} />
              <span style={{ fontSize: 64, opacity: 0.25, position: "relative", zIndex: 1 }}>🎓</span>
              <div style={{
                position: "absolute", top: 14, left: 14,
                background: "#fef08a", color: "#713f12",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.5px",
                padding: "4px 10px", borderRadius: 5,
                display: "flex", alignItems: "center", gap: 4,
              }}>
                ⭐ FEATURED
              </div>
            </div>
            <div style={{ padding: "20px 22px 22px" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 10px", lineHeight: 1.4 }}>
                Sabaragamuwa University Launches Smart Campus Initiative 2026
              </h2>
              <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.65, margin: "0 0 14px" }}>
                The university has officially launched its Smart Campus 2026 initiative, introducing digital systems across all faculties including smart attendance, AI-assisted learning, and upgraded Wi-Fi in all lecture halls and hostels in Belihuloya.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{
                  background: "#eff6ff", color: "#1e40af",
                  border: "1px solid #93c5fd",
                  fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 4,
                }}>Academic</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>
                  📅 March 1, 2026 · University Administration
                </span>
              </div>
            </div>
          </div>
        )}

        {/* NEWS LIST */}
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 12,
                border: "1.5px solid #f3f4f6",
                display: "flex",
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(127,29,29,0.1)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: 120, flexShrink: 0,
                background: item.accent + "18",
                borderRight: `3px solid ${item.accent}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 30, minHeight: 100,
              }}>
                {item.icon}
              </div>
              <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
                <div>
                  <span style={{ ...item.badgeStyle, fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                    {item.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 13.5, fontWeight: 600, color: "#111827", margin: 0, lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 12.5, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                  {item.description}
                </p>
                <span style={{ fontSize: 11.5, color: "#9ca3af" }}>
                  📅 {item.date} · {item.source}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: "#9ca3af", background: "#fff",
            borderRadius: 10, border: "1.5px solid #f3f4f6",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>No news found for this filter.</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Try selecting a different category or clearing your search.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;