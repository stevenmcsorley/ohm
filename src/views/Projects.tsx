import { Helmet } from "react-helmet-async";

const Projects = () => {
  return (
    <div className="container">
      <Helmet>
        <title>Steven McSorley | Projects</title>
        <meta
          name="description"
          content="Welcome to Steven McSorley's portfolio. Explore my projects and get to know me."
        />
        <meta property="og:title" content="Steven McSorley | Projects" />
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
      <h1>Projects</h1>
      <p>This is the Projects page.</p>
    </div>
  );
};

export default Projects;
