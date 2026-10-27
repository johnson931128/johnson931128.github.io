import { allPosts } from "content-collections";
import Link from "next/link";
import { LEARNING_NOTE_SUBJECTS } from "@/data/learning-notes";
import styles from "./portfolio.module.css";

export default function EngineeringNotes() {
  const posts = [...allPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);
  return <>
    <p className={styles.sectionIntro}>Working notes on robotics, computer architecture, and operating systems.</p>
    <div className={styles.noteList}>{LEARNING_NOTE_SUBJECTS.map((subject) => <Link key={subject.slug} href={`/notes/${subject.slug}`} prefetch={false} className={styles.noteRow}><div><h3>{subject.title}</h3><p>{subject.description}</p></div><span>{subject.notes.length} notes <span aria-hidden="true">↗</span></span></Link>)}</div>
    {posts.length ? <div className={styles.articles}><h3>From the notebook</h3><ul>{posts.map((post) => <li key={post._meta.path}><time dateTime={post.publishedAt}>{post.publishedAt}</time><Link href={`/blog/${post._meta.path.replace(/\.mdx$/, "")}`} prefetch={false}>{post.title}</Link></li>)}</ul></div> : null}
  </>;
}
