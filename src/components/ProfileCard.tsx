import ReactGA from "react-ga4";
import "./ProfileCard.css";

interface ProfileCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ProfileCard = ({
  title,
  description,
  imageUrl,
  link,
}: ProfileCardProps) => {
  const handleReadMoreClick = () => {
    ReactGA.event({
      category: "Project",
      action: "Click",
      label: title,
    });
  };

  return (
    <div className="profile-card">
      <img src={imageUrl} alt={title} className="profile-card-image" />
      <div className="profile-card-content">
        <h2 className="profile-card-title">{title}</h2>
        <p className="profile-card-description">{description}</p>
        <a
          href={link}
          className="profile-card-link"
          onClick={handleReadMoreClick}
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
