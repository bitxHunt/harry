import { createFileRoute } from '@tanstack/react-router';
import { articles } from '@/data/data';
import { ArticleLayout } from '@/components/articles/layout';
import { FoundingClub } from '@/components/articles/founding-school-club';
import { BriskWalkPage } from '@/components/articles/brisk-walk';

export const Route = createFileRoute('/articles/$slug')({
  component: RouteComponent,
})

const articleMap: Record<string, React.ReactNode> = {
  "founding-school-club": <FoundingClub />,
  "brisk-walk": <BriskWalkPage/>
};

function RouteComponent() {
  const { slug } = Route.useParams();
  const post = articles.find((a) => a.slug === slug);
  const content = articleMap[slug];

  if (!post || !content) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-neutral-400">Post not found</p>
      </div>
    );
  }

  return (
    <ArticleLayout
      title={post.title}
      category={post.category}
      tag={post.tag}
      date={post.date}
      readTime={post.readTime}
    >
      {content}
    </ArticleLayout>
  );
}