import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/common/components/ui/Container";
import { Reveal } from "@/common/components/motion/Reveal";
import { ROUTES, blogArticleRoute } from "@/common/constants/routes";
import { BLOG_COPY, BLOG_POSTS, type BlogPost } from "@/landing/data/blog";

function Category({ children }: { children: string }) {
  return (
    <span className="inline-flex self-start rounded-full bg-subtle px-[11px] py-1 font-inter-semibold text-[11px] font-semibold tracking-[0.66px] text-secondary">
      {children}
    </span>
  );
}

function ReadMore({ to, label = "Read article →" }: { to: string; label?: string }) {
  return (
    <Link to={to} className="font-inter-semibold text-[13px] font-semibold text-primary hover:underline">
      {label}
    </Link>
  );
}

function FeatureCard({ post }: { post: BlogPost }) {
  const to = blogArticleRoute(post.slug);
  return (
    <article className="flex size-full flex-col overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_12px_28px_rgba(8,13,38,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <Link to={to} className="h-[230px] sm:h-[260px] w-full overflow-hidden block shrink-0 bg-slate-100">
        <img
          src={post.image}
          alt={post.title}
          className="size-full object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div className="flex flex-col gap-3">
          <Category>{post.category}</Category>
          <Link to={to}>
            <h3 className="font-inter-bold text-[22px] sm:text-[24px] xl:text-[26px] font-bold leading-tight sm:leading-8 tracking-[-0.39px] text-ink hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-[14px] sm:text-[15px] leading-[22px] text-tertiary line-clamp-2">
            {post.description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between text-[13px] pt-3 border-t border-line-subtle">
          <time className="text-tertiary">{post.date}</time>
          <ReadMore to={to} label="Read article →" />
        </div>
      </div>
    </article>
  );
}

function CompactCard({ post }: { post: BlogPost }) {
  const to = blogArticleRoute(post.slug);
  return (
    <article className="flex h-[239px] w-full overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_12px_28px_rgba(8,13,38,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <Link to={to} className="w-[38%] shrink-0 overflow-hidden sm:w-[210px] block bg-slate-100">
        <img
          src={post.image}
          alt={post.title}
          className="size-full object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-[22px]">
        <div className="flex flex-col gap-2">
          <Category>{post.category}</Category>
          <Link to={to}>
            <h3 className="font-inter-bold text-[17px] sm:text-[18px] font-bold leading-6 tracking-[-0.27px] text-ink hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
        </div>
        <div className="flex items-center justify-between pt-1 text-[13px] border-t border-line-subtle">
          <time className="text-tertiary">{post.date}</time>
          <ReadMore to={to} label="Read →" />
        </div>
      </div>
    </article>
  );
}

/**
 * Latest articles section from Figma (node 842:4114).
 * Always displays exactly THREE cards per part (1 Feature on left, 2 Compact on right).
 * Next / Previous buttons rotate through the parts smoothly.
 */
export function BlogSection() {
  const PAGE_SIZE = 3;
  const totalPages = Math.ceil(BLOG_POSTS.length / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(0);

  const rotate = (direction: -1 | 1) => {
    setCurrentPage((prev) => (prev + direction + totalPages) % totalPages);
  };

  // Get exactly 3 articles for the current part
  const currentArticles = useMemo(() => {
    const startIndex = currentPage * PAGE_SIZE;
    const items: BlogPost[] = [];
    for (let i = 0; i < 3; i++) {
      items.push(BLOG_POSTS[(startIndex + i) % BLOG_POSTS.length]!);
    }
    return items;
  }, [currentPage]);

  return (
    <section aria-labelledby="blog-title" className="bg-white py-20 sm:py-24 lg:py-[104px]">
      <Container>
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-inter-semibold text-[12px] font-semibold tracking-[1.44px] text-secondary">
              {BLOG_COPY.eyebrow}
            </p>
            <Link to={ROUTES.blog} className="group inline-block">
              <h2
                id="blog-title"
                className="mt-3 font-inter-bold text-[32px] font-bold tracking-[-0.8px] text-ink sm:text-[40px] group-hover:text-primary transition-colors"
              >
                {BLOG_COPY.title}
              </h2>
            </Link>
          </div>

          {/* Controls: View all + Next/Prev buttons */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              to={ROUTES.blog}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 font-inter-semibold text-[13px] font-semibold text-ink transition-colors hover:border-ink hover:bg-subtle shadow-2xs"
            >
              <span>View all</span>
              <ArrowRight size={14} />
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous articles"
                onClick={() => rotate(-1)}
                className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink hover:bg-subtle active:scale-95 shadow-2xs"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next articles"
                onClick={() => rotate(1)}
                className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink hover:bg-subtle active:scale-95 shadow-2xs"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* 3-Card Layout: 1 Feature Card on Left + 2 Compact Cards on Right */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-[22px] lg:h-[492px] lg:grid-cols-[minmax(0,1fr)_minmax(0,538px)]"
            >
              {/* Feature card (1 card on left) */}
              <div className="flex min-h-[492px] flex-col lg:min-h-0">
                <FeatureCard post={currentArticles[0]!} />
              </div>

              {/* Compact column (exactly 2 cards on right) */}
              <div className="grid min-h-[492px] gap-[14px] lg:min-h-0 lg:grid-rows-2">
                <CompactCard post={currentArticles[1]!} />
                <CompactCard post={currentArticles[2]!} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
