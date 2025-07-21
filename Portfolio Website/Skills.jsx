import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub, FaFigma,
} from 'react-icons/fa';
import {
  SiMongodb, SiMysql, SiExpress, SiTailwindcss, SiTypescript,
  SiRedux, SiNextdotjs, SiFirebase, SiRender, SiNetlify, SiGit, SiNpm,SiPostgresql
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" />, category: 'Frontend', proficiency: 95 },
  { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" />, category: 'Frontend', proficiency: 90 },
  { name: 'JavaScript', icon: <FaJs className="text-yellow-400" />, category: 'Frontend', proficiency: 88 },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" />, category: 'Frontend', proficiency: 85 },
  { name: 'React', icon: <FaReact className="text-cyan-400" />, category: 'Frontend', proficiency: 90 },
  { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-300" />, category: 'Frontend', proficiency: 92 },

  { name: 'Node.js', icon: <FaNodeJs className="text-green-500" />, category: 'Backend', proficiency: 88 },
  { name: 'Express.js', icon: <SiExpress className="text-gray-300" />, category: 'Backend', proficiency: 85 },

  { name: 'MongoDB', icon: <SiMongodb className="text-green-400" />, category: 'Database', proficiency: 85 },
  { name: 'MySQL', icon: <SiMysql className="text-blue-400" />, category: 'Database', proficiency: 80 },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400" />, category: 'Database', proficiency: 80 },

  { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" />, category: 'Database', proficiency: 82 },

  { name: 'Git', icon: <SiGit className="text-orange-500" />, category: 'Tools', proficiency: 90 },
  { name: 'GitHub', icon: <FaGithub className="text-white" />, category: 'Tools', proficiency: 92 },
  { name: 'Render', icon: <SiRender className="text-white" />, category: 'Tools', proficiency: 80 },
  { name: 'Netlify', icon: <SiNetlify className="text-teal-400" />, category: 'Tools', proficiency: 85 },
  { name: 'npm', icon: <SiNpm className="text-red-500" />, category: 'Tools', proficiency: 88 },

  {
    name: 'After Effects',
    icon: (
      <div className="w-12 h-12 bg-[#00005B] rounded-md flex items-center justify-center">
        <span className="text-[#9999FF] text-xl font-bold">Ae</span>
      </div>
    ),
    category: 'Design',
    proficiency: 75,
  },
  {
    name: 'Canva',
    icon: (
      <div className="w-12 h-12 bg-[#00C4CC] rounded-full flex items-center justify-center">
        <span className="text-white text-xl font-semibold">C</span>
      </div>
    ),
    category: 'Design',
    proficiency: 85,
  },
];

const SkillCard = ({ skill, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 group relative overflow-hidden border border-gray-700 hover:border-cyan-400/30 w-full"
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
    >
      <div className="text-5xl sm:text-6xl mb-3 group-hover:scale-110 transition-transform duration-500">
        {skill.icon}
      </div>
      <p className="mt-1 text-lg sm:text-xl font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </p>

      {/* Progress bar */}
      <div className="w-full mt-4 bg-gray-700 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.proficiency}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          className={`h-full rounded-full ${
            skill.proficiency > 85
              ? 'bg-green-500'
              : skill.proficiency > 70
              ? 'bg-blue-500'
              : 'bg-yellow-500'
          }`}
        />
      </div>
      <span className="text-xs mt-1 text-gray-400">{skill.proficiency}%</span>

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

const Skills = () => {
  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <>
      <Helmet>
        <title>Skills | Abdus Portfolio</title>
      </Helmet>

      <section
        id="skills"
        className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 flex items-center justify-center"
      >
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-6 animate-gradient bg-300% animate-shine">
              Technical Expertise
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
              A curated collection of technologies I've mastered to craft
              exceptional digital experiences
            </p>
          </motion.div>

          <div className="flex flex-col items-center w-full">
            {categories.map((category) => (
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: '-100px' }}
                className="w-full mb-16 max-w-6xl"
              >
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 pb-2 text-center relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-32 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 after:rounded-full">
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center px-2">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
