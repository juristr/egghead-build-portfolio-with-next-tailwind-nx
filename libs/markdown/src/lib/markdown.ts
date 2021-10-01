import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

export function getParsedFileContentBySlug(
  fileName: string,
  postsPath: string
) {
  const postFilePath = join(postsPath, `${fileName}.md`);
  const fileContent = readFileSync(postFilePath);

  const { data, content } = matter(fileContent);

  return {
    frontMatter: data,
    content,
  };
}

export function renderMarkdown(): string {
  return 'markdown';
}
