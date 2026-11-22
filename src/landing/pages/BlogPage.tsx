import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { blogArticleRoute } from "@/common/constants/routes";
import {
  BLOG_CATEGORIES,
  FEATURED_POST,
  BLOG_POSTS,
  type BlogPost,
} from "@/landing/data/blog";

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedSearch, setSubmittedSearch] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearch(searchQuery.trim().toLowerCase());
  };

  // Filter latest articles (excluding featured unless searching/filtering)
  const nonFeaturedPosts = useMemo(
    () => BLOG_POSTS.filter((post) => !post.featured),
    []
  );

  const filteredPosts = useMemo(() => {
    return nonFeaturedPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !submittedSearch ||
        post.title.toLowerCase().includes(submittedSearch) ||
        post.description.toLowerCase().includes(submittedSearch) ||
        post.category.toLowerCase().includes(submittedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [nonFeaturedPosts, selectedCategory, submittedSearch]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white border-b border-line-subtle">
        <Container className="py-14 sm:py-20 lg:pt-24 lg:pb-14 flex flex-col items-center text-center">
          <RevealGroup
            stagger={0.1}
            className="flex flex-col items-center max-w-[800px] gap-5"
          >
            <RevealItem>
              <div className="inline-flex items-center rounded-full border border-[#dee8fe] bg-white px-3.5 py-1.5">
                <span className="font-inter-semibold text-[12px] font-semibold tracking-[1.2px] text-[#576070]">
                  THE KREYIO BLOG
                </span>
              </div>
            </RevealItem>

            <RevealItem>
              <h1 className="font-inter-bold text-[38px] sm:text-[56px] lg:text-[60px] font-bold leading-[1.1] tracking-[-2px] text-[#070b13]">
                Notes on creator marketing{" "}
                <span className="text-[#3b5bff]">in India.</span>
              </h1>
            </RevealItem>

            <RevealItem>
              <p className="font-inter-regular text-[16px] sm:text-[18px] leading-[27px] text-[#394357] max-w-[620px]">
                Practical guides on casting, briefs, payments and measuring what
                every post sold.
              </p>
            </RevealItem>

            {/* Search Bar */}
            <RevealItem className="w-full max-w-[600px] mt-2">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 rounded-[14px] border border-[#e5e7eb] bg-white pl-5 pr-1.5 py-1.5 shadow-[0px_12px_32px_0px_rgba(8,13,26,0.06)] transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15"
              >
                <Search size={18} className="text-tertiary shrink-0" />
                <input
                  type="text"
                  placeholder="Search articles"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 font-inter-regular text-[15px] text-ink placeholder:text-tertiary outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-[10px] bg-ink px-[18px] py-[10px] font-inter-semibold text-[14px] font-semibold text-white transition hover:bg-[#27272a]"
                >
                  Search
                </button>
              </form>
            </RevealItem>

            {/* Category Filter Chips */}
            <RevealItem className="w-full">
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {BLOG_CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category);
                        setVisibleCount(6);
                      }}
                      className={`rounded-full px-4 py-2 font-inter-medium text-[14px] transition-colors ${
                        isActive
                          ? "bg-[#070b13] text-white shadow-sm"
                          : "border border-[#e5e7eb] bg-white text-[#394357] hover:border-ink hover:text-ink"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      {/* Featured Article */}
      {selectedCategory === "All" && !submittedSearch && (
        <section className="bg-white py-10 lg:py-14 border-b border-line-subtle">
          <Container>
            <Reveal>
              <article className="overflow-hidden rounded-[28px] border border-[#edeff3] bg-white shadow-[0px_12px_32px_0px_rgba(8,13,26,0.06)] flex flex-col lg:flex-row items-center transition hover:shadow-lg">
                <div className="w-full lg:w-[640px] h-[300px] sm:h-[380px] lg:h-[460px] shrink-0 overflow-hidden bg-slate-100">
                  <Link
                    to={blogArticleRoute(FEATURED_POST.slug)}
                    className="block size-full"
                  >
                    <img
                      src={FEATURED_POST.image}
                      alt={FEATURED_POST.title}
                      className="size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </Link>
                </div>

                <div className="flex flex-1 flex-col items-start gap-4 p-6 sm:p-10 lg:p-[48px_56px]">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#0d0d10] px-2.5 py-1 font-inter-semibold text-[12px] font-semibold text-white">
                      Featured
                    </span>
                    <span className="rounded-full bg-[#eef3ff] px-2.5 py-1 font-inter-semibold text-[12px] font-semibold text-[#3b5bff]">
                      {FEATURED_POST.category}
                    </span>
                  </div>

                  <Link to={blogArticleRoute(FEATURED_POST.slug)}>
                    <h2 className="font-inter-bold text-[26px] sm:text-[34px] lg:text-[36px] font-bold leading-tight tracking-[-1.2px] text-[#070b13] hover:text-[#3b5bff] transition-colors">
                      {FEATURED_POST.title}
                    </h2>
                  </Link>

                  <p className="font-inter-regular text-[16px] sm:text-[17px] leading-[27px] text-[#394357]">
                    {FEATURED_POST.description}
                  </p>

                  {FEATURED_POST.author && (
                    <div className="flex items-center gap-3 pt-1">
                      <img
                        src={FEATURED_POST.author.avatar}
                        alt={FEATURED_POST.author.name}
                        className="size-10 rounded-full object-cover border border-line"
                      />
                      <div className="flex flex-col">
                        <span className="font-inter-semibold text-[14px] font-semibold text-[#070b13]">
                          {FEATURED_POST.author.name}
                        </span>
                        <span className="font-inter-regular text-[13px] text-body">
                          {FEATURED_POST.date} · {FEATURED_POST.readTime}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <Link
                      to={blogArticleRoute(FEATURED_POST.slug)}
                      className="inline-flex items-center rounded-[12px] bg-[#070b13] px-5 py-3 font-inter-semibold text-[15px] font-semibold text-white transition hover:bg-[#27272a] shadow-sm"
                    >
                      Read article →
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Latest Articles Section */}
      <section className="bg-white py-14 lg:py-20">
        <Container className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-line-subtle pb-4">
            <div>
              <h2 className="font-inter-bold text-[28px] sm:text-[32px] font-bold tracking-[-1px] text-[#070b13]">
                Latest articles
              </h2>
            </div>
            <p className="font-inter-regular text-[14px] text-body">
              {displayedPosts.length} of {filteredPosts.length + (selectedCategory === "All" && !submittedSearch ? 1 : 0)} articles
            </p>
          </div>

          {displayedPosts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-inter-medium text-[16px] text-secondary">
                No articles match your search or filter criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSubmittedSearch("");
                }}
                className="mt-4 rounded-lg bg-subtle px-4 py-2 font-inter-medium text-[14px] text-ink hover:bg-line-strong transition"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {displayedPosts.map((post) => {
                const to = blogArticleRoute(post.slug);
                return (
                  <article
                    key={post.id}
                    className="flex flex-col overflow-hidden rounded-[20px] border border-[#edeff3] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_12px_28px_rgba(8,13,38,0.06)]"
                  >
                    <Link to={to} className="h-[230px] w-full overflow-hidden block bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="size-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <span className="self-start rounded-full bg-[#eef3ff] px-2.5 py-1 font-inter-semibold text-[12px] font-semibold text-[#3b5bff]">
                        {post.category}
                      </span>

                      <Link to={to}>
                        <h3 className="font-inter-bold text-[20px] font-bold leading-[27px] tracking-[-0.4px] text-[#070b13] hover:text-[#3b5bff] transition-colors">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="font-inter-regular text-[15px] leading-[23px] text-[#394357]">
                        {post.description}
                      </p>

                      <div className="mt-auto pt-4 flex items-center justify-between text-[13px] border-t border-line-subtle">
                        <span className="text-body">
                          {post.date} · {post.readTime}
                        </span>
                        <Link
                          to={to}
                          className="font-inter-semibold text-[14px] font-semibold text-[#3b5bff] hover:underline"
                        >
                          Read →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {displayedPosts.length < filteredPosts.length && (
            <div className="pt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="rounded-[12px] border border-[#d4d7df] bg-white px-6 py-3 font-inter-semibold text-[15px] font-semibold text-[#070b13] transition hover:border-ink hover:shadow-sm"
              >
                Load more articles
              </button>
            </div>
          )}

          {/* Newsletter Box */}
          <div className="mt-14 rounded-2xl sm:rounded-[28px] bg-[#0d0d10] p-8 sm:p-14 lg:p-[80px_120px] text-center text-white flex flex-col items-center gap-5">
            <h3 className="font-inter-bold text-[28px] sm:text-[40px] font-bold leading-tight tracking-[-1.2px] text-white">
              One useful email a month
            </h3>
            <p className="font-inter-regular text-[15px] sm:text-[17px] leading-[26px] text-[#dee8fe] max-w-[560px]">
              New guides and benchmarks for creator marketing in India. No spam,
              unsubscribe any time.
            </p>

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
                className="flex w-full max-w-[520px] items-center gap-2 rounded-[14px] bg-white pl-5 pr-1.5 py-1.5"
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
          </div>
        </Container>
      </section>
    </>
  );
}
