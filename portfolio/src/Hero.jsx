import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCode,
  FaServer,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiMongodb,
  SiMysql,
  SiJavascript,
  SiTypescript,
  SiExpress,
  SiPostgresql,
  SiPostman
} from "react-icons/si";

const Hero = () => {
  const skills = [
    { icon: <FaHtml5 className="text-orange-500 text-4xl" />, name: "HTML5" },
    { icon: <FaCss3Alt className="text-blue-500 text-4xl" />, name: "CSS3" },
    {
      icon: <SiJavascript className="text-yellow-400 text-4xl" />,
      name: "JavaScript",
    },
    { icon: <FaReact className="text-cyan-400 text-4xl" />, name: "React" },
    { icon: <FaNodeJs className="text-green-500 text-4xl" />, name: "Node.js" },
    { icon: <SiExpress className="text-gray-100 text-4xl" />, name: "Express" },
    {
      icon: <SiMongodb className="text-green-400 text-4xl" />,
      name: "MongoDB",
    },
    { icon: <SiMysql className="text-blue-400 text-4xl" />, name: "MySQL" },
    {
      icon: <SiPostgresql className="text-blue-500 text-4xl" />,
      name: "PostgreSQL",
    },
    {
      icon: <SiTypescript className="text-blue-600 text-4xl" />,
      name: "TypeScript",
    },
    {
      icon: <FaServer className="text-purple-400 text-4xl" />,
      name: "REST APIs",
    },
      {
      icon: <SiPostman className="text-orange-500 text-4xl" />,
      name: "Postman",
    }
  ];

  return (
    <>
      <Helmet>
        <title>Home | Abdus Portfolio</title>
      </Helmet>
      <section
        id="home"
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-20 flex flex-col relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-400/20"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 50],
                y: [0, (Math.random() - 0.5) * 50],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Glow effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>

        {/* Main Hero Section */}
        <div className="flex-grow flex flex-col justify-center items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.p
              className="text-cyan-400 font-mono mb-4 text-lg tracking-wider"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Abdus Salam
            </motion.h1>
            <motion.h2
              className="text-2xl sm:text-3xl text-gray-300 mb-8 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 10px rgba(34, 211, 238, 0.5)",
              }}
            >
              Full-Stack Developer | MERN Stack Specialist
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              I build{" "}
              <span className="text-cyan-400 font-medium">
                high-performance web applications
              </span>{" "}
              with clean, maintainable code. Passionate about creating{" "}
              <span className="text-cyan-400 font-medium">
                efficient solutions
              </span>{" "}
              that deliver exceptional user experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-20 relative z-10"
            >
              <a
                href="#contact"
                className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-cyan-500/30 relative overflow-hidden group"
              >
                <span className="relative z-10">Let's Connect</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 relative z-10"
        >
          <motion.h3
            className="text-2xl font-semibold text-center mb-12 text-cyan-400"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            My Technical Expertise
          </motion.h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(34, 211, 238, 0.4)",
                  backgroundColor: "rgba(8, 51, 68, 0.4)",
                }}
                className="relative p-[2px] rounded-xl bg-gradient-to-tr from-cyan-500/50 via-transparent to-blue-500/50 animate-pulseGlow"
              >
                <div className="flex flex-col items-center p-6 bg-gray-900/80 rounded-xl backdrop-blur-sm">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <span className="mt-3 text-gray-300 font-medium">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About Me */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 mb-20 relative z-10 hover:border-cyan-400/30 transition-all group"
        >
          <div className="flex items-center mb-6">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaCode className="text-cyan-400 text-2xl mr-3" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-cyan-400">
              About My Work
            </h3>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              With expertise in both frontend and backend development, I create{" "}
              <span className="text-cyan-400 font-medium">
                seamless full-stack solutions
              </span>
              . My approach combines modern JavaScript frameworks with robust
              database systems to build{" "}
              <span className="text-cyan-400 font-medium">
                scalable applications
              </span>
              .
            </p>
            <p>
              I specialize in the{" "}
              <span className="text-cyan-400 font-medium">MERN stack</span>{" "}
              (MongoDB, Express, React, Node.js) with extensive experience in
              building high-performance RESTful APIs using Express.js. Whether
              it's crafting microservices architecture or implementing real-time
              features with WebSockets, I ensure my solutions are efficient,
              maintainable, and well-documented.
            </p>
            <p>
              I also work with{" "}
              <span className="text-cyan-400 font-medium">MySQL</span> and{" "}
              <span className="text-cyan-400 font-medium">PostgreSQL</span> for
              relational database solutions. My foundation in{" "}
              <span className="text-cyan-400 font-medium">HTML5</span> and{" "}
              <span className="text-cyan-400 font-medium">CSS3</span> ensures
              pixel-perfect, responsive designs that work across all devices.
            </p>
            <p>
              When not coding, I enjoy learning new technologies, contributing
              to open-source projects, and sharing knowledge with the developer
              community through tech talks and workshops.
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center relative z-10"
        >
          <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
            Let's Build Something Extraordinary
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Have a project in mind or want to discuss potential opportunities?
            I'd love to hear about it!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="mailto:abdusalam0381@gmail.com"
              className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-cyan-500/30 relative overflow-hidden group"
            >
              <span className="relative z-10">Get In Touch</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-cyan-400 rounded-full mt-2"
              animate={{ y: [0, 4, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;