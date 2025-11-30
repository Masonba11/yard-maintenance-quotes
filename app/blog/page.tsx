import Link from "next/link";
import { getAllBlogPosts } from "@/src/data/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yard Maintenance Blog | Tips, Guides & Expert Advice",
  description:
    "Read expert tips and guides on yard maintenance, seasonal cleanup, weed control, and landscaping for homeowners across the United States.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-24 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/YMQhero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Blog
            </h1>
            <p className="text-xl text-white/90">
              Expert tips, guides, and advice for yard maintenance
            </p>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">

          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0"
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-md">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 gap-1.5 transition-all">
                    Read article
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
