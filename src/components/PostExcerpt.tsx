import { Link } from "react-router-dom";
import { CalendarIcon, TagIcon } from "@heroicons/react/24/solid";
import "./PostExcerpt.css";

interface PostExcerptProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  category: string;
  className?: string;
}

const PostExcerpt: React.FC<PostExcerptProps> = ({
  id,
  title,
  description,
  slug,
  date,
  category,
  className,
}) => {
  return (
    <div
      className={`flex flex-col post-excerpt bg-black shadow-md rounded-md ${className}`}
    >
      <Link to={`/blog/${slug}`}>
        <img
          src={`/imgs/${id}.webp`}
          alt={title}
          className="w-full max-h-44 opacity-90 object-cover rounded-t-md hover:opacity-100"
        />
      </Link>
      <div className="post-excerpt-content mt-0 text-white flex flex-col flex-grow">
        <div className="flex items-end mb-4 place-content-between">
          <div className="flex flex-row items-center mr-4">
            <CalendarIcon className="w-4 h-4 text-pink-500 mr-2" />
            <span className="text-sm font-thin">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <TagIcon className="w-4 h-4 text-pink-500 mr-2" />
            <span className="text-sm font-thin">{category}</span>
          </div>
        </div>
        <h2 className="text-base font-thin text-left">
          <Link
            to={`/blog/${slug}`}
            className="hover:text-pink-500 transition-colors duration-200"
          >
            {title}
          </Link>
        </h2>
        <p className="mt-2 flex-grow text-left italic ">{description}</p>
      </div>
    </div>
  );
};

export default PostExcerpt;
