/**
 * Project catalogue.
 *
 * `featured: true` promotes a project into the large showcase rows at the top.
 * `accent` is a hex used for the generated cover gradient — there are no
 * screenshots in public/ yet, so covers are drawn, not photographed. Add real
 * screenshots to public/ and set `image` to use them instead.
 */

export const projects = [
  {
    name: "Full Stack Blog App",
    description:
      "A publishing platform built on the MERN stack with Clerk handling authentication, post authoring and threaded comments.",
    tech: ["React", "MongoDB", "Node.js", "Clerk"],
    live: "https://stackfullblog.netlify.app",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/Full%20Stack%20Blog%20App",
    image: null,
    accent: "#6E5BFF",
    category: "Full Stack",
    year: "2025",
    featured: true,
    features: [
      "Clerk authentication with protected routes",
      "Rich post authoring and editing",
      "Threaded comments on every post",
      "Author dashboard for managing drafts",
    ],
  },
  {
    name: "MERN Stack Code IDE",
    description:
      "A browser IDE that runs HTML, CSS and JavaScript live, with per-project persistence so work survives a refresh.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    live: "https://codestackide.netlify.app/",
    code: "http://github.com/AbdusSalam777/MyProjects/tree/main/codeide",
    image: null,
    accent: "#22D3EE",
    category: "Full Stack",
    year: "2025",
    featured: true,
    features: [
      "Live HTML, CSS and JS execution",
      "Save and reopen multiple projects",
      "Delete and rename workspaces",
      "Responsive editor layout",
    ],
  },
  {
    name: "Learnease",
    description:
      "A study manager that keeps quizzes, assignments and class schedules in one place, with document upload for course material.",
    tech: ["React", "Node.js", "MongoDB"],
    live: "https://learneasedev.netlify.app/",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/learnease",
    image: null,
    accent: "#FF6B3D",
    category: "Full Stack",
    year: "2025",
    featured: true,
    features: [
      "Track quizzes, assignments and schedules",
      "Upload and store Word documents",
      "Unified view of all study material",
      "Responsive dashboard interface",
    ],
  },
  {
    name: "Full Stack E-Commerce Store",
    description:
      "A storefront with account creation, cart management and transactional email verification on purchase.",
    tech: ["React", "Node.js", "MongoDB", "Nodemailer"],
    live: "https://shopcommercify.netlify.app",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/E-Commerce%20Store-MERN",
    image: null,
    accent: "#9D8FFF",
    category: "Full Stack",
    year: "2025",
    featured: true,
    features: [
      "Account signup and login",
      "Product browsing and cart",
      "Email verification on purchase",
      "Order history per account",
    ],
  },
  {
    name: "URL Shortener",
    description:
      "Link shortening with custom slugs and click analytics behind an authenticated dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    live: "https://shortpath.netlify.app/",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/URL-Shortener",
    image: null,
    accent: "#22D3EE",
    category: "Full Stack",
    year: "2025",
    featured: false,
    features: [
      "Shorten long links instantly",
      "Custom slug and alias support",
      "Click analytics and tracking",
      "Authenticated user dashboard",
    ],
  },
  {
    name: "Recipe Search App",
    description:
      "Ingredient-driven recipe search with saved collections backed by MongoDB.",
    tech: ["React", "Node.js", "MongoDB"],
    live: "https://recipiffy.netlify.app",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/Recipe%20App-REACT",
    image: null,
    accent: "#FF6B3D",
    category: "Full Stack",
    year: "2024",
    featured: false,
    features: [
      "Search recipes by ingredient",
      "Smart recommendations",
      "Save and manage collections",
      "MongoDB persistence",
    ],
  },
  {
    name: "Mini Blog Website",
    description:
      "A server-rendered blog with role-based access and a moderated comment system.",
    tech: ["Node.js", "Express", "MongoDB", "Tailwind CSS"],
    live: "https://blog-xtks.onrender.com",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/BLOG%20%7C%20NodeJS%20%7C%20MongoDB%20%7C%20ExpressJs",
    image: null,
    accent: "#6E5BFF",
    category: "Full Stack",
    year: "2024",
    featured: false,
    features: [
      "Create and publish posts",
      "Edit and delete your own articles",
      "Role-based access control",
      "Moderated comment system",
    ],
  },
  {
    name: "Grocify",
    description:
      "A grocery delivery storefront with authentication and cart flow.",
    tech: ["React", "Tailwind CSS", "MongoDB"],
    live: "https://grocify-4r32.onrender.com",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/Grocify%20Website%20%7C%20TailwindCSS",
    image: null,
    accent: "#9D8FFF",
    category: "Full Stack",
    year: "2024",
    featured: false,
    features: [
      "Product catalogue with detail pages",
      "Add to cart functionality",
      "User authentication",
      "Responsive shopping UI",
    ],
  },
  {
    name: "Amazon Mini Clone",
    description:
      "A responsive commerce clone covering catalogue, cart and auth with Firebase.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    live: "https://shopsparrow.netlify.app",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/Amazon%20Clone",
    image: null,
    accent: "#22D3EE",
    category: "Full Stack",
    year: "2024",
    featured: false,
    features: [
      "Product cards with detail views",
      "Add to cart functionality",
      "Firebase authentication",
      "Responsive shopping UI",
    ],
  },
  {
    name: "Movie Search App",
    description:
      "Real-time film search against the OMDb API with a persistent watchlist.",
    tech: ["React", "API", "CSS"],
    live: "https://mooviq.netlify.app",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/Movies%20Search%20APP-REACT",
    image: null,
    accent: "#FF6B3D",
    category: "Frontend",
    year: "2024",
    featured: false,
    features: [
      "OMDb API integration",
      "Instant search suggestions",
      "Save to watchlist",
      "Clean responsive design",
    ],
  },
  {
    name: "Weather App",
    description:
      "City weather lookup with a five-day forecast from a live weather API.",
    tech: ["React", "API", "Tailwind CSS"],
    live: "https://forecastive.netlify.app",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/Weather%20App-REACT",
    image: null,
    accent: "#22D3EE",
    category: "Frontend",
    year: "2024",
    featured: false,
    features: [
      "Search by city name",
      "Five-day forecast",
      "Live weather data",
      "Responsive Tailwind UI",
    ],
  },
  {
    name: "Quiz App",
    description:
      "Timed multiple-choice quizzes across categories with live scoring.",
    tech: ["React", "JavaScript", "CSS"],
    live: "https://quizizify.netlify.app",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/Quiz%20App",
    image: null,
    accent: "#6E5BFF",
    category: "Frontend",
    year: "2024",
    featured: false,
    features: [
      "Multiple quiz categories",
      "Timed challenge mode",
      "Scoring with feedback",
      "Dynamic question rendering",
    ],
  },
  {
    name: "QR Code Generator",
    description:
      "Generate, restyle and download QR codes for any text or link.",
    tech: ["React", "JavaScript", "CSS"],
    live: "https://qreatify.netlify.app",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/QR%20Code%20Generator",
    image: null,
    accent: "#9D8FFF",
    category: "Frontend",
    year: "2023",
    featured: false,
    features: [
      "Generate from custom text or links",
      "Customisable colours and size",
      "Downloadable QR image",
      "Instant live preview",
    ],
  },
  {
    name: "Dictionary App",
    description:
      "Word lookup with phonetics, audio pronunciation and usage examples.",
    tech: ["React", "API", "CSS"],
    live: "https://quickmean.netlify.app",
    code: "https://github.com/AbdusSalam777/MyProjects/tree/main/Dictionary%20App",
    image: null,
    accent: "#FF6B3D",
    category: "Frontend",
    year: "2023",
    featured: false,
    features: [
      "Definitions and phonetics",
      "Audio pronunciation",
      "Usage examples",
      "Clean minimal interface",
    ],
  },
];

export const categories = ["All", "Full Stack", "Frontend"];
