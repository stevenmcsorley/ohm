import { Link } from "react-router-dom";
import "./PostExcerpt.css";

interface PostExcerptProps {
  id: string;
  title: string;
  description: string;
  className?: string;
}

const PostExcerpt: React.FC<PostExcerptProps> = ({
  id,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={`post-excerpt bg-white p-4 shadow-md rounded-md ${className}`}
    >
      <Link to={`/blog/${id}`}>
        <img
          src={`https://picsum.photos/300/200?random=${id}`}
          alt={title}
          className="w-full h-48 object-cover rounded-md"
        />
      </Link>
      <div className="post-excerpt-content mt-4">
        <h2 className="text-xl font-bold">
          <Link to={`/blog/${id}`}>{title}</Link>
        </h2>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
};

export default PostExcerpt;
