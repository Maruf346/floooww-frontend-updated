import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, Copy, Share2 } from "lucide-react";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { ROUTES, blogArticleRoute } from "@/common/constants/routes";
import { BLOG_POSTS, FEATURED_POST } from "@/landing/data/blog";

const SECTIONS = [
  { id: "the-shift", title: "The shift" },
  { id: "what-a-match-score-looks-at", title: "What a match score looks at" },
  { id: "watch-match-scores", title: "Watch: match scores in 2 minutes" },
  { id: "what-the-numbers-show", title: "What the numbers show" },
  { id: "what-this-means-for-you", title: "What this means for you" },
];

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState("the-shift");
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Determine current article or default to the featured one
  const currentPost =
    BLOG_POSTS.find((p) => p.slug === slug || p.id === slug) ?? FEATURED_POST;

  // 3 Related articles
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== currentPost.slug && !p.featured
  ).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Banner */}
      <section className="relative h-[480px] sm:h-[600px] lg:h-[640px] w-full overflow-hidden bg-slate-900">
        <img
          src="/assets/blog/article-banner.png"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080a12]/35 via-[#080a12]/60 to-[#080a12]/95" />

        <Container className="relative h-full flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20 text-white">
          <RevealGroup stagger={0.1} className="max-w-[900px] space-y-4">
            {/* Breadcrumb */}
            <RevealItem className="flex items-center gap-2.5">
              <Link
                to={ROUTES.blog}
                className="font-inter-medium text-[14px] text-white/80 transition hover:text-white"
              >
                Blog
              </Link>
              <span className="font-inter-regular text-[14px] text-white/50">/</span>
              <div className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
                <span className="font-inter-semibold text-[12px] font-semibold text-white">
                  {currentPost.category}
                </span>
              </div>
            </RevealItem>

            {/* Title */}
            <RevealItem>
              <h1 className="font-inter-bold text-[32px] sm:text-[46px] lg:text-[56px] font-bold leading-tight sm:leading-[62px] tracking-[-2px] text-white">
                {currentPost.title}
              </h1>
            </RevealItem>

            {/* Subtitle */}
            <RevealItem>
              <p className="font-inter-regular text-[17px] sm:text-[20px] leading-[30px] text-white/85">
                {currentPost.description}
              </p>
            </RevealItem>

            {/* Author info */}
            <RevealItem className="flex items-center gap-3.5 pt-2">
              <img
                src={currentPost.author?.avatar ?? "/assets/blog/author-ananya.png"}
                alt="Ananya Mehta"
                className="size-11 rounded-full object-cover border border-white/20"
              />
              <div className="flex flex-col">
                <span className="font-inter-semibold text-[15px] font-semibold text-white">
                  {currentPost.author?.name ?? "Ananya Mehta"}
                </span>
                <span className="font-inter-regular text-[13px] text-white/70">
                  Kreyio editorial · {currentPost.date} · {currentPost.readTime}
                </span>
              </div>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      {/* Article Body */}
      <section className="bg-white py-14 lg:py-20 border-b border-line-subtle">
        <Container className="grid gap-12 lg:grid-cols-[240px_minmax(0,720px)] lg:gap-16 xl:gap-[72px]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[104px] lg:self-start space-y-6">
            <nav
              aria-label="On this page"
              className="rounded-[16px] border border-line bg-[#f6f8fb] p-5 space-y-3"
            >
              <p className="font-inter-semibold text-[11px] font-semibold tracking-[1px] text-tertiary">
                ON THIS PAGE
              </p>
              <div className="space-y-1">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-inter-regular text-[14px] leading-5 transition-colors ${
                        isActive
                          ? "bg-white font-inter-semibold font-semibold text-[#070b13] shadow-sm"
                          : "text-[#394357] hover:bg-white/70 hover:text-ink"
                      }`}
                    >
                      <div
                        className={`h-[18px] w-[3px] rounded-[2px] transition-colors ${
                          isActive ? "bg-[#0d0d10]" : "bg-transparent"
                        }`}
                      />
                      <span className="min-w-0 flex-1">{section.title}</span>
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Share buttons */}
            <div className="space-y-2">
              <p className="font-inter-semibold text-[11px] font-semibold tracking-[1px] text-tertiary">
                SHARE
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on LinkedIn"
                  className="flex size-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white font-inter-semibold text-[12px] text-[#394357] transition hover:border-ink hover:text-ink shadow-2xs"
                >
                  in
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}&text=${encodeURIComponent(currentPost.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on X"
                  className="flex size-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white font-inter-semibold text-[12px] text-[#394357] transition hover:border-ink hover:text-ink shadow-2xs"
                >
                  X
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    currentPost.title + " " + window.location.href
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on WhatsApp"
                  className="flex size-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white font-inter-semibold text-[12px] text-[#394357] transition hover:border-ink hover:text-ink shadow-2xs"
                >
                  WA
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy article link"
                  className="flex size-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#394357] transition hover:border-ink hover:text-ink shadow-2xs"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <main className="space-y-10 min-w-0">
            {/* 1. The shift */}
            <section id="the-shift" className="scroll-mt-28 space-y-5">
              <p className="font-inter-medium text-[20px] sm:text-[22px] leading-[35px] text-[#070b13]">
                For years, brands picked creators by follower count. In 2026 that is changing
                fast. The brands getting the best results now look at fit: who the creator’s audience
                is, what they usually post, and what happened the last time they worked with a
                brand like yours.
              </p>

              <p className="font-inter-regular text-[17px] sm:text-[18px] leading-[30px] text-[#394357]">
                The old way rewarded reach. A large audience looked safe, even when most of it had
                little to do with the product. Fit asks a sharper question: will the people watching
                this creator actually want what you sell?
              </p>

              <figure className="space-y-2 pt-2">
                <img
                  src="/assets/blog/article-figure1.png"
                  alt="Audience match breakdown"
                  className="w-full rounded-[16px] object-cover h-[320px] sm:h-[400px] border border-line"
                />
                <figcaption className="font-inter-regular text-[13px] text-body">
                  Creators with smaller, closer audiences often drive more orders per post.
                </figcaption>
              </figure>
            </section>

            {/* 2. What a match score looks at */}
            <section id="what-a-match-score-looks-at" className="scroll-mt-28 space-y-5 pt-4">
              <h2 className="font-inter-bold text-[28px] sm:text-[32px] font-bold tracking-[-0.8px] leading-[40px] text-[#070b13]">
                What a match score looks at
              </h2>
              <p className="font-inter-regular text-[17px] sm:text-[18px] leading-[30px] text-[#394357]">
                A match score is not a popularity contest. It compares your brief with each creator
                on four things:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex flex-col gap-2.5 rounded-[16px] bg-[#f6f8fb] p-5 border border-line-subtle">
                  <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#0d0d10] font-inter-bold text-[14px] font-bold text-white">
                    1
                  </div>
                  <h3 className="font-inter-semibold text-[17px] font-semibold text-[#070b13]">
                    Audience
                  </h3>
                  <p className="font-inter-regular text-[15px] leading-[23px] text-[#394357]">
                    Age, gender and city against the people you want to reach.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 rounded-[16px] bg-[#f6f8fb] p-5 border border-line-subtle">
                  <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#0d0d10] font-inter-bold text-[14px] font-bold text-white">
                    2
                  </div>
                  <h3 className="font-inter-semibold text-[17px] font-semibold text-[#070b13]">
                    Niche
                  </h3>
                  <p className="font-inter-regular text-[15px] leading-[23px] text-[#394357]">
                    How often the creator posts about your category.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 rounded-[16px] bg-[#f6f8fb] p-5 border border-line-subtle">
                  <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#0d0d10] font-inter-bold text-[14px] font-bold text-white">
                    3
                  </div>
                  <h3 className="font-inter-semibold text-[17px] font-semibold text-[#070b13]">
                    Results
                  </h3>
                  <p className="font-inter-regular text-[15px] leading-[23px] text-[#394357]">
                    Engagement, clicks and sales from past projects on Kreyio.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 rounded-[16px] bg-[#f6f8fb] p-5 border border-line-subtle">
                  <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#0d0d10] font-inter-bold text-[14px] font-bold text-white">
                    4
                  </div>
                  <h3 className="font-inter-semibold text-[17px] font-semibold text-[#070b13]">
                    Reliability
                  </h3>
                  <p className="font-inter-regular text-[15px] leading-[23px] text-[#394357]">
                    On-time delivery and brand reviews.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Watch: match scores in 2 minutes */}
            <section id="watch-match-scores" className="scroll-mt-28 space-y-5 pt-4">
              <h2 className="font-inter-bold text-[28px] sm:text-[32px] font-bold tracking-[-0.8px] leading-[40px] text-[#070b13]">
                Watch: match scores in 2 minutes
              </h2>

              <div className="space-y-2">
                <div className="relative h-[320px] sm:h-[405px] w-full overflow-hidden rounded-[16px] border border-line bg-black">
                  <img
                    src="/assets/blog/article-video-player.png"
                    alt="Video thumbnail"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#070b13]/35" />

                  {/* Play Button */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label="Play video"
                    className="absolute left-1/2 top-1/2 flex size-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.25)] transition hover:scale-105 active:scale-95"
                  >
                    <span className="font-inter-regular text-[28px] text-[#3b5bff] pl-1">
                      ▶
                    </span>
                  </button>

                  {/* Video Badge */}
                  <div className="absolute left-4 top-4 rounded-[8px] bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                    <span className="font-inter-semibold text-[13px] font-semibold text-[#070b13]">
                      Video · How match scores work
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 rounded-[8px] bg-[#070b13]/75 px-2.5 py-1 backdrop-blur-sm">
                    <span className="font-inter-semibold text-[13px] font-semibold text-white">
                      2:04
                    </span>
                  </div>
                </div>

                <p className="font-inter-regular text-[13px] text-body">
                  A two-minute walkthrough of match scores inside Kreyio: filters, reasons and
                  shortlisting.
                </p>
              </div>
            </section>

            {/* 4. What the numbers show */}
            <section id="what-the-numbers-show" className="scroll-mt-28 space-y-5 pt-4">
              <h2 className="font-inter-bold text-[28px] sm:text-[32px] font-bold tracking-[-0.8px] leading-[40px] text-[#070b13]">
                What the numbers show
              </h2>

              <p className="font-inter-regular text-[17px] sm:text-[18px] leading-[30px] text-[#394357]">
                When brands shortlist on fit, they usually end up with a mix: a few established
                creators and several smaller ones whose audiences match the product closely. The
                smaller creators often cost less and convert better.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <figure className="space-y-2">
                  <img
                    src="/assets/blog/article-established.png"
                    alt="Established creator reach"
                    className="h-[240px] sm:h-[260px] w-full rounded-[16px] object-cover border border-line"
                  />
                  <figcaption className="font-inter-regular text-[13px] text-body">
                    Established creator · broad reach
                  </figcaption>
                </figure>

                <figure className="space-y-2">
                  <img
                    src="/assets/blog/article-niche.png"
                    alt="Niche creator engagement"
                    className="h-[240px] sm:h-[260px] w-full rounded-[16px] object-cover border border-line"
                  />
                  <figcaption className="font-inter-regular text-[13px] text-body">
                    Niche creator · closer audience
                  </figcaption>
                </figure>
              </div>

              {/* Pull quote */}
              <blockquote className="rounded-[20px] bg-[#070b13] p-8 sm:p-10 text-white space-y-3">
                <div className="font-inter-bold text-[56px] leading-[40px] text-[#3b5bff]">
                  “
                </div>
                <p className="font-inter-medium text-[22px] sm:text-[26px] leading-[38px] tracking-[-0.4px] text-white">
                  Our best seller had a fifth of the followers of our first pick, and sold three
                  times as much.
                </p>
                <cite className="block not-italic font-inter-regular text-[13px] text-[#f29b07]">
                  Sample quote: replace with a real customer before publishing
                </cite>
              </blockquote>
            </section>

            {/* 5. What this means for you */}
            <section id="what-this-means-for-you" className="scroll-mt-28 space-y-5 pt-4">
              <h2 className="font-inter-bold text-[28px] sm:text-[32px] font-bold tracking-[-0.8px] leading-[40px] text-[#070b13]">
                What this means for you
              </h2>

              <p className="font-inter-regular text-[17px] sm:text-[18px] leading-[30px] text-[#394357]">
                Start with a clear brief, then shortlist on match score, not follower count.
                Check the reason shown under each score, and keep one or two newer creators in
                every project so you can find your next breakout.
              </p>

              {/* Key takeaways */}
              <div className="rounded-[16px] border border-[#dee8fe] bg-[#f5f5f7] p-6 space-y-3">
                <p className="font-inter-semibold text-[12px] font-semibold tracking-[1px] text-[#576070]">
                  KEY TAKEAWAYS
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <span className="font-inter-bold text-[14px] text-[#149d46] font-bold">✓</span>
                    <p className="font-inter-regular text-[15px] leading-relaxed text-[#070b13]">
                      Fit beats follower count.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-inter-bold text-[14px] text-[#149d46] font-bold">✓</span>
                    <p className="font-inter-regular text-[15px] leading-relaxed text-[#070b13]">
                      Every match score comes with the reason behind it.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-inter-bold text-[14px] text-[#149d46] font-bold">✓</span>
                    <p className="font-inter-regular text-[15px] leading-relaxed text-[#070b13]">
                      Keep one or two newer creators in every project.
                    </p>
                  </div>
                </div>
              </div>

              {/* Category tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="rounded-full bg-[#eef3ff] px-3 py-1 font-inter-semibold text-[12px] font-semibold text-[#3b5bff]">
                  Matching
                </span>
                <span className="rounded-full bg-[#eef3ff] px-3 py-1 font-inter-semibold text-[12px] font-semibold text-[#3b5bff]">
                  Creator discovery
                </span>
                <span className="rounded-full bg-[#eef3ff] px-3 py-1 font-inter-semibold text-[12px] font-semibold text-[#3b5bff]">
                  Guides
                </span>
              </div>

              {/* Author box */}
              <div className="flex items-center gap-4 rounded-[16px] border border-[#edeff3] bg-white p-6 shadow-2xs">
                <img
                  src="/assets/blog/author-ananya.png"
                  alt="Ananya Mehta"
                  className="size-14 rounded-full object-cover border border-line"
                />
                <div className="space-y-1">
                  <h3 className="font-inter-semibold text-[16px] font-semibold text-[#070b13]">
                    Ananya Mehta
                  </h3>
                  <p className="font-inter-regular text-[14px] text-[#394357]">
                    Writes about creator marketing and measurement for the Kreyio blog.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </Container>
      </section>

      {/* Keep Reading (Related Articles) */}
      <section className="bg-[#f6f8fb] py-16 lg:py-24 border-b border-line-subtle">
        <Container className="space-y-8">
          <div className="flex items-end justify-between border-b border-line-subtle pb-4">
            <h2 className="font-inter-bold text-[28px] sm:text-[32px] font-bold tracking-[-1px] text-[#070b13]">
              Keep reading
            </h2>
            <Link
              to={ROUTES.blog}
              className="font-inter-semibold text-[15px] font-semibold text-[#3b5bff] hover:underline"
            >
              All articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => {
              const to = blogArticleRoute(post.slug);
              return (
                <article
                  key={post.id}
                  className="flex flex-col overflow-hidden rounded-[20px] border border-[#edeff3] bg-white transition hover:-translate-y-1 hover:shadow-md"
                >
                  <Link to={to} className="h-[200px] w-full overflow-hidden block">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="size-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col gap-2.5 p-5">
                    <span className="self-start rounded-full bg-[#eef3ff] px-3 py-1 font-inter-semibold text-[12px] font-semibold text-[#3b5bff]">
                      {post.category}
                    </span>

                    <Link to={to}>
                      <h3 className="font-inter-bold text-[18px] sm:text-[19px] font-bold leading-tight text-[#070b13] hover:text-[#3b5bff] transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    <div className="mt-auto pt-3 text-[13px] text-body">
                      {post.date} · {post.readTime}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="bg-[#0d0d10] py-16 lg:py-20 text-white">
        <Container className="flex flex-col items-center text-center gap-5 max-w-[700px]">
          <h2 className="font-inter-bold text-[28px] sm:text-[34px] font-bold leading-tight tracking-[-1px] text-white">
            Enjoyed this? Get one useful email a month.
          </h2>

          {subscribed ? (
            <div className="rounded-xl bg-white/10 px-6 py-3 font-inter-medium text-[15px] text-white">
              Thanks for subscribing! Check your inbox soon.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) setSubscribed(true);
              }}
              className="flex w-full max-w-[520px] items-center gap-2 rounded-[14px] bg-white pl-5 pr-1.5 py-1.5 mt-2"
            >
              <input
                required
                type="email"
                placeholder="you@company.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 font-inter-regular text-[15px] text-ink placeholder:text-tertiary outline-none bg-transparent"
              />
              <button
                type="submit"
                className="shrink-0 rounded-[10px] bg-[#070b13] px-5 py-3 font-inter-semibold text-[15px] font-semibold text-white transition hover:bg-[#27272a]"
              >
                Subscribe
              </button>
            </form>
          )}
        </Container>
      </section>
    </>
  );
}
