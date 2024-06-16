import { Helmet } from "react-helmet-async";
import PostExcerpt from "../components/PostExcerpt";
import { getPostMetadata } from "../utils/loadPosts";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  related: boolean;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [randomQuote, setRandomQuote] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPostMetadata();
      setPosts(posts);
    };

    const fetchQuote = async () => {
      const response = await fetch("/quotes.json");
      const quotes = await response.json();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    };

    fetchPosts();
    fetchQuote();
  }, []);

  const mainPosts = posts.filter((post) => !post.related);
  const relatedContent = posts.filter((post) => post.related);

  return (
    <main>
      <Helmet>
        <title>Steven McSorley | Home</title>
        <meta
          name="description"
          content="Welcome to Steven McSorley's portfolio. Explore my projects and get to know me."
        />
        <meta property="og:title" content="Steven McSorley | Home" />
        <meta
          property="og:description"
          content="Welcome to Steven McSorley's portfolio. Explore my projects and get to know me."
        />
        <meta
          property="og:image"
          content="https://stevenmcsorley.co.uk/og.png"
        />
        <meta property="og:url" content="https://stevenmcsorley.co.uk" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Steven McSorley | Software Engineer"
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Main Posts */}
        <div className="flex flex-col w-full lg:w-3/4 gap-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainPosts.map((post) => (
              <PostExcerpt
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                slug={post.slug}
                date={post.date}
                category={post.category}
                className="h-auto"
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 flex flex-col gap-8">
          {/* Random Quote */}
          <div className="bg-black p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4 text-white">Work & Life</h2>
            <p className="text-white">{randomQuote}</p>
          </div>

          {/* Related Content */}
          <div className="bg-black p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4 text-white">Featured</h2>
            <ul className="space-y-4">
              {relatedContent.map((post) => (
                <li key={post.id}>
                  <PostExcerpt
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    slug={post.slug}
                    date={post.date}
                    category={post.category}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
