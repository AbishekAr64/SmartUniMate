'use client';
import { useState } from "react";

type Category = "all" | "academic" | "campus" | "clubs" | "tips" | "qna";
type SortBy = "recent" | "liked" | "mine";

interface Post {
  id: number;
  author: string;
  studentId: string;
  year: string;
  program: string;
  timeAgo: string;
  category: Exclude<Category, "all">;
  title: string;
  body: string;
  image?: string;
  likes: number;
  comments: number;
  avatar: string;
}

const POSTS: Post[] = [
  {
    id: 1,
    author: "M.P.G.N.R. Rathnayaka",
    studentId: "22FIS0517",
    year: "Year 2",
    program: "CIS",
    timeAgo: "2 hours ago",
    category: "campus",
    title: "Best food spots near the university? 🍛",
    body: "Hey freshers! I've been exploring the area around Belihuloya and found some great spots. The canteen near the Engineering block does amazing rice & curry for Rs. 120. There's also a small bakery on the main road with fresh rotis every morning. Any other recommendations?",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    likes: 24,
    comments: 8,
    avatar: "🧑‍🎓",
  },
  {
    id: 2,
    author: "K.D. Perera",
    studentId: "21FIS0342",
    year: "Year 3",
    program: "IS",
    timeAgo: "5 hours ago",
    category: "academic",
    title: "IS3040 Group Assignment — anyone need members?",
    body: "Our group has space for one more person for the IS3040 semester project. We're focusing on a smart inventory system using React + Node. DM me if you're interested. Deadline is April 30.",
    likes: 11,
    comments: 5,
    avatar: "👨‍💻",
  },
  {
    id: 3,
    author: "S. Vithuckshana",
    studentId: "22FCS0088",
    year: "Year 2",
    program: "CS",
    timeAgo: "1 day ago",
    category: "tips",
    title: "How I passed IS2030 without crying 😅",
    body: "Okay so Data Structures was rough. Here's what actually helped me: (1) Do past papers from 2019–2023, (2) Focus on linked lists and trees — they always appear, (3) Form a study group, even just 2–3 people. The library 3rd floor is quiet after 7 PM. Good luck everyone!",
    likes: 47,
    comments: 19,
    avatar: "👩‍💻",
  },
  {
    id: 4,
    author: "R.M. Gunasekara",
    studentId: "23FIS0211",
    year: "Year 1",
    program: "IS",
    timeAgo: "2 days ago",
    category: "clubs",
    title: "IEEE Student Branch – Open Recruitment 2026 🎉",
    body: "The SUSL IEEE Student Branch is now recruiting new members! We have workshops, hackathons, and networking events planned for this semester. Fill the Google Form at the Student Affairs office or contact us at ieee@susl.ac.lk. First meeting: March 20 at 3 PM, Lecture Hall 4.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    likes: 63,
    comments: 14,
    avatar: "🧑‍🔬",
  },
  {
    id: 5,
    author: "T.N. Bandara",
    studentId: "22FCS0155",
    year: "Year 2",
    program: "CS",
    timeAgo: "3 days ago",
    category: "qna",
    title: "Can I apply for the Dean's List if one grade is a B+?",
    body: "I got mostly A's this semester but one module is a B+. Does that disqualify me from the Dean's List? The handbook is confusing. Anyone who's been on it before, please help!",
    likes: 9,
    comments: 12,
    avatar: "🎓",
  },
];

const CATEGORIES: { label: string; value: Category; icon: string }[] = [
  { label: "All Posts", value: "all", icon: "📰" },
  { label: "Academic", value: "academic", icon: "📚" },
  { label: "Campus Life", value: "campus", icon: "🏫" },
  { label: "Clubs & Events", value: "clubs", icon: "🎉" },
  { label: "Tips & Guides", value: "tips", icon: "💡" },
  { label: "Q&A", value: "qna", icon: "❓" },
];

const SORTS: { label: string; value: SortBy; icon: string }[] = [
  { label: "Most Recent", value: "recent", icon: "🕐" },
  { label: "Most Liked", value: "liked", icon: "🔥" },
  { label: "My Posts", value: "mine", icon: "👤" },
];

const CATEGORY_BADGE: Record<Exclude<Category, "all">, React.CSSProperties> = {
  academic: { background: "#eff6ff", color: "#1e40af", border: "1px solid #93c5fd" },
  campus: { background: "#f0fdf4", color: "#166534", border: "1px solid #86efac" },
  clubs: { background: "#faf5ff", color: "#6b21a8", border: "1px solid #d8b4fe" },
  tips: { background: "#fefce8", color: "#854d0e", border: "1px solid #fde047" },
  qna: { background: "#fff7ed", color: "#9a3412", border: "1px solid #fdba74" },
};

const CATEGORY_LABEL: Record<Exclude<Category, "all">, string> = {
  academic: "Academic",
  campus: "Campus Life",
  clubs: "Clubs & Events",
  tips: "Tips & Guides",
  qna: "Q&A",
};

const PRIMARY = "#7f1d1d";
const PRIMARY_LIGHT = "#fef2f2";
const PRIMARY_MID = "#b91c1c";

export default function Community() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortBy>("recent");
  const [postText, setPostText] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = POSTS.filter((p) => {
    if (sortBy === "mine") return p.author === "S. Vithuckshana";
    if (activeCategory !== "all") return p.category === activeCategory;
    return true;
  }).sort((a, b) => {
    if (sortBy === "liked") return b.likes - a.likes;
    return b.id - a.id;
  });

  return (
    <div style={{ padding: "24px 28px", fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#fafafa", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: PRIMARY, margin: 0, letterSpacing: "-0.3px" }}>
          Community
        </h1>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "4px 0 0" }}>
          Share, discuss, and connect with fellow students
        </p>
      </div>

      {/* CATEGORY TABS */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 0,
        borderBottom: "2px solid #f3f4f6",
        paddingBottom: 0, overflowX: "auto",
      }}>
        {CATEGORIES.map((c) => {
          const isActive = activeCategory === c.value;
          return (
            <button
              key={c.value}
              onClick={() => { setActiveCategory(c.value); setSortBy("recent"); }}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 14px",
                border: "none", background: "transparent",
                fontFamily: "inherit", fontSize: 13, fontWeight: isActive ? 600 : 400,
                color: isActive ? PRIMARY : "#6b7280",
                cursor: "pointer", whiteSpace: "nowrap",
                borderBottom: isActive ? `2px solid ${PRIMARY}` : "2px solid transparent",
                marginBottom: "-2px",
                transition: "all 0.12s",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = PRIMARY; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#6b7280"; }}
            >
              <span style={{ fontSize: 14 }}>{c.icon}</span>
              {c.label}
            </button>
          );
        })}
      </div>

      {/* SORT TABS */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 20,
        paddingTop: 10,
      }}>
        {SORTS.map((s) => {
          const isActive = sortBy === s.value;
          return (
            <button
              key={s.value}
              onClick={() => setSortBy(s.value)}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "5px 12px",
                border: `1.5px solid ${isActive ? PRIMARY : "#e5e7eb"}`,
                borderRadius: 20,
                background: isActive ? PRIMARY_LIGHT : "#fff",
                color: isActive ? PRIMARY : "#6b7280",
                fontFamily: "inherit", fontSize: 12, fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.12s",
              }}
            >
              <span style={{ fontSize: 12 }}>{s.icon}</span>
              {s.label}
            </button>
          );
        })}
      </div>

      {/* COMPOSE BOX */}
      <div style={{
        background: "#fff", borderRadius: 12,
        border: "1.5px solid #f3f4f6",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        padding: "14px 16px",
        display: "flex", gap: 12, alignItems: "flex-start",
        marginBottom: 18,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg, ${PRIMARY}, #dc2626)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
        }}>👩‍💻</div>
        <div style={{ flex: 1, display: "flex", gap: 10 }}>
          <input
            type="text"
            placeholder="What's on your mind? Share tips, ask questions, or help a fellow student..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            style={{
              flex: 1, padding: "9px 14px",
              border: "1.5px solid #e5e7eb", borderRadius: 8,
              fontSize: 13, color: "#374151", outline: "none",
              fontFamily: "inherit", background: "#fafafa",
            }}
            onFocus={(e) => (e.target.style.borderColor = PRIMARY_MID)}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
          <button
            style={{
              padding: "9px 20px", background: PRIMARY,
              color: "#fff", border: "none", borderRadius: 8,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", flexShrink: 0,
              transition: "background 0.12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_MID)}
            onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
          >
            Post
          </button>
        </div>
      </div>

      {/* POSTS */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px 20px",
          background: "#fff", borderRadius: 12,
          border: "1.5px solid #f3f4f6", color: "#9ca3af",
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>No posts here yet.</div>
        </div>
      ) : (
        filtered.map((post) => {
          const liked = likedPosts.has(post.id);
          return (
            <div
              key={post.id}
              style={{
                background: "#fff", borderRadius: 12,
                border: "1.5px solid #f3f4f6",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                marginBottom: 14, overflow: "hidden",
                transition: "box-shadow 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(127,29,29,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)")}
            >
              <div style={{ padding: "16px 18px 0" }}>
                {/* POST HEADER */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                      background: `linear-gradient(135deg, ${PRIMARY}22, #dc262622)`,
                      border: `1.5px solid ${PRIMARY}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20,
                    }}>{post.avatar}</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#111827" }}>{post.author}</div>
                      <div style={{ fontSize: 11.5, color: "#9ca3af" }}>
                        {post.timeAgo} · {post.studentId} · {post.year} {post.program}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    ...CATEGORY_BADGE[post.category],
                    fontSize: 10.5, fontWeight: 700,
                    padding: "3px 9px", borderRadius: 4, flexShrink: 0,
                  }}>
                    {CATEGORY_LABEL[post.category]}
                  </span>
                </div>

                {/* POST CONTENT */}
                <h3 style={{ fontSize: 14.5, fontWeight: 700, color: "#111827", margin: "0 0 8px", lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.65, margin: "0 0 14px" }}>
                  {post.body}
                </p>
              </div>

              {/* POST IMAGE */}
              {post.image && (
                <div style={{ marginBottom: 0 }}>
                  <img
                    src={post.image}
                    alt="post"
                    style={{ width: "100%", maxHeight: 260, objectFit: "cover", display: "block" }}
                  />
                </div>
              )}

              {/* POST FOOTER */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 18px",
                borderTop: "1.5px solid #f9fafb",
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {/* Like */}
                  <button
                    onClick={() => toggleLike(post.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "5px 12px",
                      border: `1.5px solid ${liked ? PRIMARY : "#e5e7eb"}`,
                      borderRadius: 7, background: liked ? PRIMARY_LIGHT : "#fff",
                      color: liked ? PRIMARY : "#6b7280",
                      fontSize: 12, fontWeight: liked ? 600 : 400,
                      cursor: "pointer", fontFamily: "inherit",
                      transition: "all 0.12s",
                    }}
                  >
                    🔥 {post.likes + (liked ? 1 : 0)} Likes
                  </button>
                  {/* Comment */}
                  <button style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 12px",
                    border: "1.5px solid #e5e7eb", borderRadius: 7,
                    background: "#fff", color: "#6b7280",
                    fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.12s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#6b7280"; }}
                  >
                    💬 {post.comments} Comments
                  </button>
                  {/* Share */}
                  <button style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 12px",
                    border: "1.5px solid #e5e7eb", borderRadius: 7,
                    background: "#fff", color: "#6b7280",
                    fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.12s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#6b7280"; }}
                  >
                    🔗 Share
                  </button>
                </div>
                {/* Report */}
                <button style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "5px 12px",
                  border: "1.5px solid #fee2e2", borderRadius: 7,
                  background: "#fff", color: "#ef4444",
                  fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                  transition: "all 0.12s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#fff0f0"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                >
                  🚩 Report
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}