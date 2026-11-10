import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { BLOG_COPY, BLOG_POSTS, type BlogPost } from "@/landing/data/blog";

function Category({ children }: { children: string }) {
  return (
    <span className="inline-flex self-start rounded-full bg-[#f1f4ff] px-[11px] py-1 font-inter-semibold text-[11px] font-semibold tracking-[0.66px] text-primary">
      {children}
    </span>
  );
}

function ReadMore() {
  return (
    <button type="button" className="font-inter-semibold text-[13px] font-semibold text-primary">
      Read more →
    </button>
  );
}

function FeatureCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_12px_28px_rgba(8,13,38,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <div className="min-h-[220px] flex-1 overflow-hidden">
        <img
          src={post.image}
          alt=""
          className="size-full object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col gap-3 p-7">
        <Category>{post.category}</Category>
        <h3 className="font-inter-bold text-[24px] font-bold leading-8 tracking-[-0.39px] text-ink xl:text-[26px]">
          {post.title}
        </h3>
        <p className="text-[15px] leading-[22px] text-tertiary">{post.description}</p>
        <div className="mt-1 flex items-center justify-between text-[13px]">
          <time className="text-tertiary">{post.date}</time>
          <ReadMore />
        </div>
      </div>
    </article>
  );
}

function CompactCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex min-h-0 flex-1 overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_12px_28px_rgba(8,13,38,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <div className="w-[38%] shrink-0 overflow-hidden sm:w-[210px]">
        <img
          src={post.image}
          alt=""
          className="size-full object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-5 sm:p-[22px]">
        <Category>{post.category}</Category>
        <h3 className="font-inter-bold text-[18px] font-bold leading-6 tracking-[-0.27px] text-ink">
          {post.title}
        </h3>
        <div className="flex items-center justify-between pt-1 text-[13px]">
          <time className="text-tertiary">{post.date}</time>
          <ReadMore />
        </div>
      </div>
    </article>
  );
}

/** Latest articles section from Figma, with controls that rotate the three-card editorial set. */
export function BlogSection() {
  const [start, setStart] = useState(0);
  const posts = BLOG_POSTS.map((_, index) => BLOG_POSTS[(index + start) % BLOG_POSTS.length]!);
  const rotate = (direction: -1 | 1) =>
    setStart((current) => (current + direction + BLOG_POSTS.length) % BLOG_POSTS.length);

  return (
    <section aria-labelledby="blog-title" className="bg-[#f3f5f7] py-20 sm:py-24 lg:py-[104px]">
      <Container>
        <Reveal className="flex items-end gap-2">
          <div className="flex-1">
            <p className="font-inter-semibold text-[12px] font-semibold tracking-[1.44px] text-primary">
              {BLOG_COPY.eyebrow}
            </p>
            <h2
              id="blog-title"
              className="mt-3 font-inter-bold text-[32px] font-bold tracking-[-0.8px] text-ink sm:text-[40px]"
            >
              {BLOG_COPY.title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Previous articles"
            onClick={() => rotate(-1)}
            className="grid size-10 place-items-center rounded-[20px] border border-line bg-white text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next articles"
            onClick={() => rotate(1)}
            className="grid size-10 place-items-center rounded-[20px] border border-line bg-white text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight size={18} />
          </button>
        </Reveal>
        <RevealGroup
          stagger={0.1}
          className="mt-10 grid gap-[22px] lg:h-[492px] lg:grid-cols-[minmax(0,1fr)_minmax(0,538px)]"
        >
          <RevealItem className="flex min-h-[492px] flex-col pt-2 lg:min-h-0">
            <motion.div layout className="flex min-h-0 flex-1">
              <FeatureCard post={posts[0]!} />
            </motion.div>
          </RevealItem>
          <div className="grid min-h-[492px] gap-[14px] lg:min-h-0 lg:grid-rows-2">
            {posts.slice(1).map((post) => (
              <RevealItem key={post.id} className="flex min-h-[239px] pt-2 lg:min-h-0">
                <motion.div layout className="flex min-h-0 flex-1">
                  <CompactCard post={post} />
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
