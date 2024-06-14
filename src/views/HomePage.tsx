import Hero from "../components/Hero";
import ProfileCard from "../components/ProfileCard";
const HomePage = () => {
  return (
    <main>
      <Hero />
      <div className="profile-cards-container">
        <ProfileCard
          title="Live IoT Data Streaming Using Redis and WebSockets"
          description="Exploring the implementation of real-time data streaming for IoT devices using Redis and WebSockets to deliver instantaneous updates."
          imageUrl="https://picsum.photos/200/300?random=1"
          link="/live-iot-data-streaming"
        />
        <ProfileCard
          title="Project 2"
          description="This is a brief description of Project Two."
          imageUrl="https://picsum.photos/200/300?random=2"
          link="#"
        />
        <ProfileCard
          title="Project 3"
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
        <ProfileCard
          title="Project Five"
          description="This is a brief description of Project Five."
          imageUrl="https://picsum.photos/200/300?random=5"
          link="#"
        />
        <ProfileCard
          title="Project Six"
          description="This is a brief description of Project Six."
          imageUrl="https://picsum.photos/200/300?random=6"
          link="#"
        />
        <ProfileCard
          title="Project 7"
          description="This is a brief description of Project Seven."
          imageUrl="https://picsum.photos/200/300?random=7"
          link="#"
        />
        <ProfileCard
          title="Project Eight"
          description="This is a brief description of Project Eight."
          imageUrl="https://picsum.photos/200/300?random=8"
          link="#"
        />
      </div>
    </main>
  );
};

export default HomePage;
