import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { CalendarIcon, TagIcon } from "@heroicons/react/24/solid";
import { getPostData } from "../utils/loadPosts";
import rehypeRaw from "rehype-raw";
import "./BlogPost.css";

interface PostData {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  date: string;
  category: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    const fetchPost = async () => {
      try {
        const postData = await getPostData(slug);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (!post) {
    return <div className="text-center py-10 text-white">Loading...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen py-10">
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto blog-post-container">
          <h1 className="text-4xl font-thin mb-4 text-left">{post.title}</h1>
          <div className="text-gray-400 mb-4 flex flex-col md:flex-row justify-between">
            <div className="flex">
              <CalendarIcon className="w-5 h-5 text-pink-500 mr-2" />
              <span className="mr-4">{new Date(post.date).toDateString()}</span>
            </div>
            <div className="flex">
              <TagIcon className="w-5 h-5 text-pink-500 mr-2" />
              <span>{post.category}</span>
            </div>
          </div>
          <img
            src={`https://picsum.photos/1200/600?random=${post.id}`}
            alt={post.title}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
          <div className="blog-post-content">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
