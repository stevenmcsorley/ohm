// FeaturedCarousel.tsx
import Slider from "react-slick";
import PostExcerpt from "./PostExcerpt";

interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  category: string;
}

const FeaturedCarousel = ({ posts }: { posts: Post[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {posts.map((post) => (
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
    </Slider>
  );
};

export default FeaturedCarousel;
