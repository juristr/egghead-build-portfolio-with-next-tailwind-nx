import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { getParsedFileContentBySlug, renderMarkdown } from '@juridev/markdown';

export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '_articles');

export function Article({ frontMatter }) {
  return (
    <div className="m-6">
      <article className="prose prose-lg">
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
      </article>
    </div>
  );
}
export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  // 1. parse the content of our markdown and separate it into frontmatter and content
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  // 2. convert markdown content => HTML
  const renderHTML = renderMarkdown();

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Article;
