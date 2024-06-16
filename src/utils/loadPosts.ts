import fm from "front-matter";

interface PostMetadata {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  category: string;
  related: boolean;
}

interface PostData extends PostMetadata {
  content: string;
}

export async function getPostMetadata(): Promise<PostMetadata[]> {
  const response = await fetch("/posts/posts.json");
  const posts: PostMetadata[] = await response.json();
  return posts;
}

export async function getPostData(slug: string): Promise<PostData> {
  const posts = await getPostMetadata();
  const postMeta = posts.find((post) => post.slug === slug);

  if (!postMeta) {
    throw new Error("Post not found");
  }

  const response = await fetch(`/posts/${postMeta.id}.md`);
  const rawContent = await response.text();
  const { attributes, body } = fm<{
    id: string;
    title: string;
    description: string;
    slug: string;
    date: string;
    category: string;
    related: boolean;
  }>(rawContent);

  return {
    id: attributes.id,
    title: attributes.title,
    description: attributes.description,
    slug: attributes.slug,
    date: attributes.date,
    category: attributes.category,
    related: attributes.related,
    content: body,
  };
}
