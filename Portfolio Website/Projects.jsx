import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiMongodb,
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiCss3,
} from "react-icons/si";

const projects = [
  {
    name: "Weather App",
    description:
      "Real-time weather updates with city search and 5-day forecast.",
    tech: ["React", "API", "Tailwind CSS"],
    live: "https://forecastive.netlify.app",
    code: "https://github.com/yourusername/weather-app",
    image: "/weather.png",
    category: "Frontend",
    features: [
      "Search by city name",
      "5-day weather forecast",
      "Live weather data from API",
      "Responsive UI with Tailwind CSS",
    ],
  },
  {
    name: "Quiz App",
    description:
      "Interactive quiz with scoring, categories, and timed challenges.",
    tech: ["React", "JavaScript", "CSS"],
    live: "https://quizizify.netlify.app",
    code: "https://github.com/yourusername/quiz-app",
    image: "/quiz.png",
    category: "Frontend",
    features: [
      "Multiple quiz categories",
      "Timed challenge mode",
      "Scoring system with feedback",
      "Dynamic question rendering",
    ],
  },
  {
    name: "Movie Search App",
    description: "Find movies with real-time OMDb API results and watchlist.",
    tech: ["React", "API", "CSS"],
    live: "https://mooviq.netlify.app",
    code: "https://github.com/yourusername/movie-app",
    image: "/moovie.png",
    category: "Frontend",
    features: [
      "OMDb API integration",
      "Instant search suggestions",
      "Save to watchlist feature",
      "Clean responsive design",
    ],
  },
  {
    name: "QR Code Generator",
    description: "Generate and customize QR codes for any text or link.",
    tech: ["React", "JavaScript", "CSS"],
    live: "https://qreatify.netlify.app",
    code: "https://github.com/yourusername/qr-generator",
    image: "/qrcode.png",
    category: "Frontend",
    features: [
      "Generate QR from custom text/links",
      "Customizable colors and size",
      "Downloadable QR image",
      "Instant preview",
    ],
  },
  {
    name: "Recipe App",
    description: "Find, save and organize recipes using an AI-powered engine.",
    tech: ["React", "Node.js", "MongoDB"],
    live: "https://recipiffy.netlify.app",
    code: "https://github.com/yourusername/recipe-app",
    image: "/recipe.png",
    category: "Full Stack",
    features: [
      "Search recipes using ingredients",
      "AI-powered recommendations",
      "Save and manage your recipes",
      "MongoDB data storage",
    ],
  },
  {
    name: "Dictionary App",
    description:
      "Comprehensive word definitions with pronunciation and examples.",
    tech: ["React", "API", "CSS"],
    live: "https://quickmean.netlify.app",
    code: "https://github.com/yourusername/dictionary-app",
    image: "/dic.png",
    category: "Frontend",
    features: [
      "Word definitions & phonetics",
      "Audio pronunciation",
      "Usage examples",
      "Clean & simple UI",
    ],
  },
  {
    name: "Dev Tools Collection",
    description: "Collection of developer tools like formatters & encoders.",
    tech: ["React", "Tailwind CSS"],
    live: "https://multitooly.netlify.app",
    code: "https://github.com/yourusername/dev-tools",
    image: "/tool.png",
    category: "Frontend",
    features: [
      "JSON, XML formatters",
      "Base64 encoders/decoders",
      "Color converters",
      "Built with Tailwind CSS",
    ],
  },
  {
    name: "E-commerce Clone",
    description: "A responsive clone of a popular e-commerce platform.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    live: "https://shopsparrow.netlify.app",
    code: "https://github.com/yourusername/ecommerce-clone",
    image: "/tool.png",
    category: "Full Stack",
    features: [
      "Product cards with details",
      "Add to cart functionality",
      "User authentication",
      "Responsive shopping UI",
    ],
  },
  {
    name: "URL Shortener",
    description:
      "A full-stack application to shorten long URLs with analytics and custom slugs.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    live: "https://url-shortener-eu5v.onrender.com",
    code: "https://github.com/yourusername/url-shortener",
    image: "/url-shortener.png",
    category: "Full Stack",
    features: [
      "Create short URLs from long links",
      "Custom slug/alias support",
      "Click analytics and tracking",
      "User authentication system",
      "Responsive dashboard interface",
    ],
  },
  {
    name: "Grocify website",
    description: "A responsive website for a grocery delivery service.",
    tech: ["React", "Tailwind CSS", "MongoDB"],
    live: "https://grocify-4r32.onrender.com",
    code: "https://github.com/yourusername/ecommerce-clone",
    image: "/tool.png",
    category: "Full Stack",
    features: [
      "Product cards with details",
      "Add to cart functionality",
      "User authentication",
      "Responsive shopping UI",
    ],
  },
  {
    name: "Blog Website",
    description:
      "A full-stack blog platform where users can create, edit, and read articles with authentication and a modern UI.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    live: "https://blog-xtks.onrender.com",
    code: "https://github.com/yourusername/blog-website",
    image: "/blog-website.png",
    category: "Full Stack",
    features: [
      "Create and publish blog posts",
      "Edit and delete your own articles",
      "User authentication and role-based access",
      "Comment system with moderation",
      "Responsive and accessible UI",
    ],
  },
];

const TechIcon = ({ tech }) => {
  const icons = {
    React: <SiReact className="text-blue-400" />,
    "Next.js": <SiNextdotjs className="text-white" />,
    TypeScript: <SiTypescript className="text-blue-500" />,
    "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
    Firebase: <SiFirebase className="text-yellow-500" />,
    MongoDB: <SiMongodb className="text-green-500" />,
    JavaScript: <SiJavascript className="text-yellow-400" />,
    "Node.js": <SiNodedotjs className="text-green-500" />,
    CSS: <SiCss3 className="text-blue-400" />,
    API: <span className="text-xs">API</span>,
  };
  return icons[tech] || null;
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-cyan-400/30 transition-all duration-500 shadow-xl hover:shadow-cyan-500/20 relative group h-full flex flex-col"
      whileHover={{ y: -10 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>

      <div className="p-4 sm:p-5 relative z-20 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
            {project.name}
          </h3>
          <div className="flex gap-2">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="View code on GitHub"
              >
                <FaGithub size={16} />
              </a>
            )}
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              aria-label="View live demo"
            >
              <FaExternalLinkAlt size={12} />
            </a>
          </div>
        </div>

        <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
          {project.description}
        </p>

        <div className="mb-3 sm:mb-4 flex-grow">
          <h4 className="text-xs font-semibold text-cyan-400 mb-1">FEATURES</h4>
          <ul className="text-gray-400 text-xs space-y-1">
            {project.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-cyan-400 mr-1">•</span>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-cyan-400 mb-1">
            TECH STACK
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-[10px] sm:text-xs px-2 py-1 bg-gray-800 rounded-full flex items-center gap-1 hover:bg-gray-700 transition-colors"
              >
                <TechIcon tech={tech} />
                <span className="hidden sm:inline">{tech}</span>
              </motion.span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[10px] px-2 py-1 bg-gray-800 rounded-full text-gray-400">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Frontend", "Full Stack"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Projects | Abdus Portfolio</title>
      </Helmet>
      <section
        id="projects"
        className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e17] to-[#0f172a]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text mb-2 sm:mb-3">
              My Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm">
              Here are some of my projects. Each one was built to solve a
              problem or explore new technologies.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex justify-center mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex bg-gray-900 rounded-full p-0.5 sm:p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full transition-all ${
                    activeFilter === category
                      ? "bg-cyan-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>

          <motion.div
            className="text-center mt-8 sm:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-3">
              Want to see more? Check out my GitHub for additional projects.
            </p>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors border border-gray-700 hover:border-cyan-400/30 text-xs sm:text-sm"
            >
              <FaGithub className="mr-1 sm:mr-2" /> View GitHub
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Projects;
