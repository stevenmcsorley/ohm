import fm from "front-matter";

interface PostMetadata {
  id: string;
  title: string;
  description: string;
}

interface PostData extends PostMetadata {
  content: string;
}

export async function getPostMetadata(): Promise<PostMetadata[]> {
  const response = await fetch("/posts/posts.json");
  const posts: PostMetadata[] = await response.json();
  return posts;
}

export async function getPostData(id: string): Promise<PostData> {
  const response = await fetch(`/posts/${id}.md`);
  const rawContent = await response.text();
  const { attributes, body } = fm<{
    id: string;
    title: string;
    description: string;
  }>(rawContent);

  return {
    id: attributes.id,
    title: attributes.title,
    description: attributes.description,
    content: body,
  };
}
