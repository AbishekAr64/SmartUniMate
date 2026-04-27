'use client';

import { useState, useEffect } from "react";

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
  commentsList?: string[];
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
    body: "Hey freshers! I've been exploring the area around Belihuloya...",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    likes: 24,
    comments: 8,
    commentsList: [
      "Try the canteen samosas!",
      "I recommend the new cafe on Oak St.",
    ],
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
    body: "Our group has space for one more person...",
    likes: 11,
    comments: 5,
    commentsList: ["I'm interested! DM me.", "What topics do you cover?"],
    avatar: "👨‍💻",
  },
];

const CATEGORIES = [
  { label: "All Posts", value: "all", icon: "📰" },
  { label: "Academic", value: "academic", icon: "📚" },
  { label: "Campus Life", value: "campus", icon: "🏫" },
  { label: "Clubs & Events", value: "clubs", icon: "🎉" },
  { label: "Tips & Guides", value: "tips", icon: "💡" },
  { label: "Q&A", value: "qna", icon: "❓" },
];

const SORTS = [
  { label: "Most Recent", value: "recent", icon: "🕐" },
  { label: "Most Liked", value: "liked", icon: "🔥" },
  { label: "My Posts", value: "mine", icon: "👤" },
];

export default function Community() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortBy>("recent");
  const [postText, setPostText] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('community_posts') : null;
      if (raw) return JSON.parse(raw) as Post[];
    } catch (e) {}
    return POSTS;
  });
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = posts
    .filter((p) => {
      if (sortBy === "mine") return p.author === "S. Vithuckshana";
      if (activeCategory !== "all") return p.category === activeCategory;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "liked") return b.likes - a.likes;
      return b.id - a.id;
    });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    try {
      localStorage.setItem('community_posts', JSON.stringify(posts));
    } catch (e) {}
  }, [posts]);

  const toggleComments = (id: number) => {
    setActiveCommentPostId((prev) => (prev === id ? null : id));
  };

  const handleCommentChange = (id: number, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const addComment = (id: number) => {
    const text = (commentInputs[id] || "").trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: p.comments + 1,
              commentsList: [...(p.commentsList || []), text],
            }
          : p
      )
    );
    setCommentInputs((prev) => ({ ...prev, [id]: "" }));
    setToast("Comment added");
  };

  const handleShare = async (post: Post) => {
    const shareUrl = window.location.href.split('#')[0] + `#post-${post.id}`;
    const shareData = { title: post.title, text: post.body, url: shareUrl };
    try {
      if ((navigator as any).share) {
        await (navigator as any).share(shareData);
        setToast("Shared successfully");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setToast("Link copied to clipboard");
      } else {
        setToast("Cannot share on this browser");
      }
    } catch (e) {
      setToast("Share failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 font-sans w-full">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-black text-white px-3 py-2 rounded">{toast}</div>
      )}
      {/* Header */}
      <div className="mb-4 sm:mb-5">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900">
          Community
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Share, discuss, and connect with fellow students
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto -mx-3 px-3 sm:px-0 sm:flex-wrap">
        {CATEGORIES.map((c) => {
          const isActive = activeCategory === c.value;
          return (
            <button
              key={c.value}
              onClick={() => setActiveCategory(c.value as Category)}
              className={`flex-shrink-0 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition whitespace-nowrap ${
                isActive
                  ? "bg-red-900 text-white"
                  : "bg-white text-gray-600 border"
              }`}
            >
              {c.icon} {c.label}
            </button>
          );
        })}
      </div>

      {/* Sort */}
      <div className="flex flex-wrap gap-2 my-3 sm:my-4">
        {SORTS.map((s) => (
          <button
            key={s.value}
            onClick={() => setSortBy(s.value as SortBy)}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border bg-white text-xs sm:text-sm flex-shrink-0"
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Compose */}
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 flex flex-col md:flex-row gap-2 sm:gap-3 mb-4 sm:mb-5 w-full">
        <div className="text-xl sm:text-2xl">👩‍💻</div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-1 w-full">
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full flex-1 border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm outline-none"
          />
          <button className="w-full sm:w-auto bg-red-900 text-white px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm">
            Post
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4 w-full">
        {filtered.map((post) => {
          const liked = likedPosts.has(post.id);

          return (
            <div
                id={`post-${post.id}`}
                key={post.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden w-full"
              >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 break-words">
                      {post.author}
                    </h3>
                    <p className="text-xs text-gray-400 break-words">
                      {post.timeAgo} · {post.studentId} · {post.year} {post.program}
                    </p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded self-start sm:self-auto">
                    {post.category}
                  </span>
                </div>

                <h2 className="mt-3 text-base sm:text-lg font-bold text-gray-900 break-words">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 break-words">
                  {post.body}
                </p>
              </div>

              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="w-full h-auto max-h-64 object-cover"
                />
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`px-3 py-1 rounded-lg border text-sm ${
                      liked
                        ? "bg-red-50 border-red-900 text-red-900"
                        : "bg-white border-gray-300 text-gray-600"
                    }`}
                  >
                    🔥 {post.likes + (liked ? 1 : 0)}
                  </button>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="px-3 py-1 rounded-lg border text-sm text-gray-600"
                  >
                    💬 {post.comments}
                  </button>

                  <button
                    onClick={() => handleShare(post)}
                    className="px-3 py-1 rounded-lg border text-sm text-gray-600"
                  >
                    🔗 Share
                  </button>
                </div>

                <button className="px-3 py-1 rounded-lg border border-red-200 text-red-500 text-sm self-start sm:self-auto">
                  🚩 Report
                </button>
              </div>
              {activeCommentPostId === post.id && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="space-y-2">
                    {post.commentsList && post.commentsList.length > 0 ? (
                      post.commentsList.map((c, i) => (
                        <p key={i} className="text-sm text-gray-700">
                          {c}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No comments yet</p>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <input
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      className="bg-red-900 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
