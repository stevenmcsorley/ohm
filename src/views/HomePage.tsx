import { Helmet } from "react-helmet-async";
import PostExcerpt from "../components/PostExcerpt";
import { getPostMetadata } from "../utils/loadPosts";
import { useEffect, useState } from "react";
// import SearchBar from "../components/SearchBar";
// import FilterBar from "../components/FilterBar";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  related: boolean;
  date: string;
  category: string;
}

const HomePage = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [randomQuote, setRandomQuote] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPostMetadata();
      // setPosts(posts);
      setFilteredPosts(posts);
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

  const mainPosts = filteredPosts.filter((post) => !post.related);
  const relatedContent = filteredPosts.filter((post) => post.related);

  // const handleSearch = (query: string) => {
  //   setFilteredPosts(
  //     posts.filter(
  //       (post) =>
  //         post.title.toLowerCase().includes(query.toLowerCase()) ||
  //         post.description.toLowerCase().includes(query.toLowerCase())
  //     )
  //   );
  // };

  // const handleFilter = (filters: { category?: string; sort?: string }) => {
  //   let updatedPosts = [...posts];

  //   if (filters.category && filters.category !== "") {
  //     updatedPosts = updatedPosts.filter(
  //       (post) => post.category === filters.category
  //     );
  //   }

  //   if (filters.sort) {
  //     console.log(filters.sort);
  //     updatedPosts = updatedPosts.sort((a, b) => {
  //       if (filters.sort === "date") {
  //         return new Date(b.date).getTime() - new Date(a.date).getTime();
  //       }
  //       if (filters.sort === "title") {
  //         return a.title.localeCompare(b.title);
  //       }
  //       return 0;
  //     });
  //   }

  //   setFilteredPosts(updatedPosts);
  // };

  return (
    <main className="bg-stone-950">
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
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 ">
        {/* Main Posts */}
        <div className="flex flex-col w-full lg:w-3/4 gap-0">
          {/* <SearchBar onSearch={handleSearch} />
          <FilterBar onFilter={handleFilter} /> */}
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
        <div className="lg:w-1/4 gap-0 bg-stone-950 border-l-4 border-orange-500">
          {/* Random Quote */}
          <div className="bg-black p-4 shadow-md rounded-md mb-8 md:ml-8">
            <h2 className="text-xl font-bold mb-4 text-white">Work & Life</h2>
            <p className="text-white">{randomQuote}</p>
          </div>
          s{/* Related Content */}
          <div className="bg-stone-950 p-0 shadow-md rounded-md ">
            <h2 className="text-xl font-bold mb-4 pt-4 text-white border-t-4 border-orange-500">
              Featured
            </h2>
            <ul className="space-y-4 md:ml-8">
              {relatedContent.map((post) => (
                <li key={post.id}>
                  <PostExcerpt
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    slug={post.slug}
                    date={post.date}
                    category={post.category}
                    className="mb-8"
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
