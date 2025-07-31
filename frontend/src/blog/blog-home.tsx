import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";
import { BLOG_META } from "./shared";
import { BlogPostKind } from "../route";
import { BlogMeta } from "./shared";

type BlogPost = {
  kind: BlogPostKind;
  meta: BlogMeta;
};

type BlogPostCardProps = {
  post: BlogPost;
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "3rem",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.2rem",
    color: "#666",
  },
  sectionHeading: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
  },
  postsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  card: {
    padding: "1.5rem",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  cardTitle: {
    fontSize: "1.3rem",
    marginBottom: "1rem",
    lineHeight: 1.4,
  },
  cardDescription: {
    color: "#666",
    marginBottom: "1rem",
  },
  cardMeta: {
    display: "flex",
    gap: "0.5rem",
    color: "#888",
    fontSize: "0.9rem",
  },
} as const;

export function BlogHome() {
  const blogPosts: BlogPost[] = Object.entries(BLOG_META)
    .map(([kind, meta]) => ({
      kind: kind as BlogPostKind,
      meta,
    }))
    .sort(
      (a, b) =>
        new Date(b.meta.datePublished).getTime() -
        new Date(a.meta.datePublished).getTime(),
    );
  const recentPosts: BlogPost[] = blogPosts.slice(0, 3);
  const olderPosts: BlogPost[] = blogPosts.slice(3);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Erfolgreich bewerben</h1>
        <p style={styles.subheading}>
          Aktuelle Guides, praktische Beispiele und clevere Tools für deine
          Bewerbung
        </p>
      </header>

      <section>
        <h2 style={styles.sectionHeading}>Neue Artikel</h2>
        <div style={styles.postsGrid}>
          {recentPosts.map((post) => (
            <BlogPostCard key={post.kind} post={post} />
          ))}
        </div>
      </section>

      {olderPosts.length > 0 && (
        <section>
          <h2 style={styles.sectionHeading}>Weitere Artikel</h2>
          <div style={styles.postsGrid}>
            {olderPosts.map((post) => (
              <BlogPostCard key={post.kind} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article style={styles.card}>
      <h3 style={styles.cardTitle}>
        <a
          href={serializeRoute({
            kind: RouteKind.Blog,
            blogRoute: { kind: post.kind },
          })}
          style={{ ...linkStyles, textDecoration: "none" }}
        >
          {post.meta.title}
        </a>
      </h3>
      <p style={styles.cardDescription}>{post.meta.description}</p>
      <div style={styles.cardMeta}>
        <span>{post.meta.readingTime}</span>
        <span>•</span>
        <span>{formatDate(post.meta.datePublished)}</span>
      </div>
    </article>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
