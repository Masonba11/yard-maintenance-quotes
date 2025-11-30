import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts } from "@/src/data/blog";
import LeadForm from "@/src/components/LeadForm";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Yard Maintenance Quotes Blog`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              {post.title}
            </h1>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:font-bold prose-h2:leading-tight
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:font-semibold prose-h3:leading-tight
            prose-p:text-gray-700 prose-p:leading-7 prose-p:mb-6 prose-p:text-lg
            prose-ul:text-gray-700 prose-ul:mb-8 prose-ul:pl-0
            prose-li:text-gray-700 prose-li:mb-3 prose-li:leading-7 prose-li:pl-0 prose-li:marker:text-primary-600
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-headings:first:mt-0"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <section
            id="quote-form"
            className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12 mb-12 border border-primary-100"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get connected with trusted local yard maintenance professionals
                in your area. Free quotes, no obligation.
              </p>
            </div>
            <LeadForm />
          </section>

          {/* Back to Blog */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
