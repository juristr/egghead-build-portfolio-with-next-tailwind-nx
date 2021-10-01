import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  joinPathFragments,
  names,
} from '@nrwl/devkit';

interface NewArticleSchemaOptions {
  title: string;
  author: string;
  excerpt?: string;
}

export default async function (tree: Tree, schema: NewArticleSchemaOptions) {
  generateFiles(tree, joinPathFragments(__dirname, './files'), './_articles', {
    title: schema.title,
    author: schema.author,
    excerpt: schema.excerpt || '',
    normalizedTitle: names(schema.title).fileName,
    creationDate: new Date().toISOString(),
  });

  await formatFiles(tree);
}
