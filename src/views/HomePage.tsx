import Header from "../components/Header";
import Hero from "../components/Hero";
import ProfileCard from "../components/ProfileCard";
const HomePage = () => {
  return (
    <main>
      <Header />
      <Hero />
      <div className="profile-cards-container">
        <ProfileCard
          title="Project One"
          description="This is a brief description of Project One."
          imageUrl="https://via.placeholder.com/300"
          link="#"
        />
        <ProfileCard
          title="Project Two"
          description="This is a brief description of Project Two."
          imageUrl="https://via.placeholder.com/300"
          link="#"
        />
      </div>
    </main>
  );
};

export default HomePage;
