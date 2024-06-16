import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { getPostData } from "../utils/loadPosts";
import rehypeRaw from "rehype-raw";
import "./BlogPost.css";
import "./gitbub.css";

interface PostData {
  id: string;
  title: string;
  description: string;
  content: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await getPostData(id);
      setPost(postData);
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-post">
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <h1>{post.title}</h1>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;
