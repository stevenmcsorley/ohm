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
  return (
    <div className="profile-card">
      <img src={imageUrl} alt={title} className="profile-card-image" />
      <div className="profile-card-content">
        <h2 className="profile-card-title">{title}</h2>
        <p className="profile-card-description">{description}</p>
        <a href={link} className="profile-card-link">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
