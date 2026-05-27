import React from "react";
import Link from "next/link";

export interface RelatedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  comingSoon?: boolean;
}

const serifFont: React.CSSProperties = {
  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
};

export function BlogRelatedPosts({
  posts,
  showProductCta = true,
}: {
  posts: RelatedBlogPost[];
  showProductCta?: boolean;
}) {
  return (
    <section aria-label="Related articles and product" className="my-4">
      {/* Related Articles */}
      <div className="mb-6">
        <span className="text-[0.67rem] font-semibold tracking-[0.14em] uppercase text-orange-700 block mb-2">
          Continue Reading
        </span>
        <h2
          style={serifFont}
          className="text-[clamp(1.4rem,3vw,2rem)] font-normal text-neutral-900 leading-snug
                     hover:text-orange-700 transition-colors duration-300"
        >
          Related Articles
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 mb-12">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-stone-50 border border-stone-200 rounded-xl px-6 py-5 flex flex-col
                       hover:border-orange-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-900/10
                       transition-all duration-300"
          >
            <span className="text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-orange-700 block mb-2">
              {post.tag}
            </span>
            <h3
              style={serifFont}
              className="text-[1rem] font-normal text-neutral-900 mb-2 leading-snug"
            >
              {post.title}
            </h3>
            <p className="text-[0.82rem] text-stone-500 leading-relaxed m-0 mb-4 flex-1">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-[0.72rem] text-stone-400">{post.readTime}</span>
              {post.comingSoon ? (
                <span className="text-[0.72rem] text-stone-400 italic">
                  Coming soon
                </span>
              ) : (
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[0.78rem] text-orange-700 font-medium hover:underline"
                >
                  Read →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Product CTA */}
      {showProductCta && (
        <div className="bg-gradient-to-br from-[#fffaf6] to-[#f8f4ef] border border-orange-200/70 rounded-2xl px-8 py-8">
          <span className="text-[0.67rem] font-semibold tracking-[0.14em] uppercase text-orange-700 block mb-3">
            Try It Today
          </span>
          <p
            style={serifFont}
            className="text-[1.2rem] text-neutral-900 mb-2 font-normal leading-snug"
          >
            Looking for an easy daily Vitamin D3 + K2 supplement?
          </p>
          <p className="text-[0.87rem] text-stone-600 mb-6 leading-relaxed m-0">
            Try{" "}
            <strong className="text-neutral-900">
              SIPA Nutrition Daily D3 + K2 Sachets
            </strong>{" "}
            — India&apos;s first vegan D3+K2 formula. 600 IU VitaShine® D3 + 55 mcg
            K2 MK-7. Clinically dosed. 100% lab tested. No sugar. Just ≈ ₹13 a day.
          </p>
          <Link
            href="/productOverview"
            className="group relative overflow-hidden inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[10px]
                       border-[1.5px] border-[#1a1a1a] hover:border-[#c2410c] text-[#1a1a1a] hover:text-white
                       bg-transparent transition-colors duration-[400ms] cursor-pointer"
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span className="absolute inset-0 bg-[#c2410c] -translate-x-full group-hover:translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)]" />
            <span className="relative z-10">Shop Now — ₹399</span>
            <svg
              className="relative z-10 w-3.5 h-3.5 stroke-current group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 14 14"
              fill="none"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
