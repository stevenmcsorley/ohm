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
          imageUrl="https://picsum.photos/200/300?random=1"
          link="#"
        />
        <ProfileCard
          title="Project Two"
          description="This is a brief description of Project Two."
          imageUrl="https://picsum.photos/200/300?random=2"
          link="#"
        />
        <ProfileCard
          title="Project Three"
          description="This is a brief description of Project Three."
          imageUrl="https://picsum.photos/200/300?random=3"
          link="#"
        />
        <ProfileCard
          title="Project Four"
          description="This is a brief description of Project Four."
          imageUrl="https://picsum.photos/200/300?random=4"
          link="#"
        />
      </div>
    </main>
  );
};

export default HomePage;
