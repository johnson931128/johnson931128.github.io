import { allPosts } from "content-collections";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function EngineeringNotesSection() {
  const posts = [...allPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-2xl divide-y divide-border border-y border-border">
      {posts.map((post) => {
        const slug = post._meta.path.replace(/\.mdx$/, "");

        return (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="group grid gap-2 rounded-sm py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6"
          >
            <div>
              <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
                {post.title}
                <ArrowUpRight className="ml-1 inline-block size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
            </div>
            <time className="text-xs tabular-nums text-muted-foreground sm:pt-1">
              {post.publishedAt}
            </time>
          </Link>
        );
      })}
    </div>
  );
}
