import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

export function Article(props: ArticleProps) {
  return (
    <div>
      <h1>Visiting, {props.slug}</h1>
    </div>
  );
}
export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  return {
    props: {
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  return {
    paths: [
      {
        params: {
          slug: 'page1',
        },
      },

      {
        params: {
          slug: 'page2',
        },
      },
    ],
    fallback: false,
  };
};

export default Article;
