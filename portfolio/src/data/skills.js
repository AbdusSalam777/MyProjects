/**
 * Tech stack, grouped by role.
 *
 * Deliberately no percentage bars — "React 87%" is unfalsifiable and reads as
 * filler to anyone hiring. Grouping by what each tool is *for* is more useful.
 *
 * `icon` holds the react-icons component itself; the Skills section renders it.
 */

import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiPostman,
  SiNetlify,
  SiRender,
  SiVite,
  SiNpm,
  SiJsonwebtokens,
} from "react-icons/si";

export const stackGroups = [
  {
    title: "Front end",
    caption: "Interfaces people actually enjoy using",
    items: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "Vite", icon: SiVite, color: "#A855F7" },
    ],
  },
  {
    title: "Back end",
    caption: "APIs that stay up and stay fast",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#5FA04E" },
      { name: "Express", icon: SiExpress, color: "#E5E7EB" },
      { name: "REST APIs", icon: SiPostman, color: "#FF6C37" },
      { name: "JWT Auth", icon: SiJsonwebtokens, color: "#D63AFF" },
    ],
  },
  {
    title: "Data",
    caption: "Schemas designed before the first query",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "Ship & tooling",
    caption: "From local branch to live URL",
    items: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#E5E7EB" },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
      { name: "Render", icon: SiRender, color: "#E5E7EB" },
      { name: "npm", icon: SiNpm, color: "#CB3837" },
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    ],
  },
];

/** Flat list for the infinite marquee. */
export const marqueeStack = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "TypeScript",
  "PostgreSQL",
  "Tailwind CSS",
  "REST APIs",
  "Redux",
  "Firebase",
  "Vite",
  "Git",
];
