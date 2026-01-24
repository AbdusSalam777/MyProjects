const courses = [
  {
    name: "Qaidah & Nazara Course",
    slug: "qaidah-nazara-ability-student",
    duration: "Flexible (Student Ability)",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Learn Qaidah & Nazara at your own pace based on your ability.",
    topics: [
      "Alphabet recognition",
      "Basic pronunciation",
      "Simple reading exercises"
    ],
    demoLink: "https://faizanonline.net/qaidah-nazara-ability-student/demo-class",
    image: "/images/nazracourse.png"
  },
  {
    name: "Tajweed Course",
    slug: "tajweed-course",
    duration: "6 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "This course teaches correct pronunciation and rules of Quranic recitation.",
    topics: [
      "Introduction to Tajweed",
      "Makhaarij and Sifaat of letters",
      "Rules of Noon Sakin and Tanween",
      "Rules of Meem Sakin",
      "Qalqalah and Madd rules"
    ],
    demoLink: "https://faizanonline.net/tajweed-course/demo-class",
    image: "/images/Quran-Tajweed-Course.png"
  },
  {
    name: "The Qaidah Teacher Course",
    slug: "qaidah-teacher-course",
    duration: "3 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Train to teach Qaidah effectively to beginners.",
    topics: [
      "Teaching methodology",
      "Lesson planning",
      "Student assessment",
      "Interactive sessions"
    ],
    demoLink: "https://faizanonline.net/qaidah-teacher-course/demo-class",
    image: "/images/qaidateachercourse.png"
  },
  {
    name: "The Nazirah Course (Female)",
    slug: "nazirah-teacher-female",
    duration: "8 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Training for females to become Nazirah teachers.",
    topics: [
      "Lesson planning for students",
      "Correct pronunciation",
      "Interactive teaching methods"
    ],
    demoLink: "https://faizanonline.net/nazirah-teacher-female/demo-class",
    image: "/images/nazracoursefemale.png"
  },
  {
    name: "Blessing of the Holy Quran Course",
    slug: "blessing-holy-quran",
    duration: "5 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Deepen your understanding of the Holy Quran and its blessings.",
    topics: [
      "Surah recitation",
      "Quranic stories",
      "Practical lessons"
    ],
    demoLink: "https://faizanonline.net/blessing-holy-quran/demo-class",
    image: "/images/blessingsqurancourse.png"
  },
  {
    name: "The Memorisation Of Holy Quran Course",
    slug: "memorisation-holy-quran",
    duration: "Flexible (Student Ability)",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Memorize the Holy Quran according to your ability.",
    topics: [
      "Daily memorization targets",
      "Revision strategies",
      "Correct pronunciation"
    ],
    demoLink: "https://faizanonline.net/memorisation-holy-quran/demo-class",
    image: "/images/memrizationquran.png"
  },
  {
    name: "The Revision Of Manzil Course",
    slug: "revision-manzil-course",
    duration: "6 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Course focused on revising Manzil memorization efficiently.",
    topics: [
      "Daily revision schedules",
      "Error correction",
      "Revision strategies"
    ],
    demoLink: "https://faizanonline.net/revision-manzil-course/demo-class",
    image: "/images/revisionofmanzil.png"
  },
  {
    name: "The Tajweed And Qiraat Course",
    slug: "tajweed-qiraat-course",
    duration: "1.5 years",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Advanced Tajweed and Qiraat for serious learners.",
    topics: [
      "Tajweed rules",
      "Multiple Qiraat",
      "Advanced recitation practice"
    ],
    demoLink: "https://faizanonline.net/tajweed-qiraat-course/demo-class",
    image: "/images/tajweedandqirat.png"
  },
  {
    name: "The Tafseer Course",
    slug: "tafseer-course",
    duration: "Flexible (Student Ability)",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Understand the meaning of Quranic verses deeply.",
    topics: [
      "Verse by verse explanation",
      "Lessons from Quranic stories",
      "Practical applications"
    ],
    demoLink: "https://faizanonline.net/tafseer-course/demo-class",
    image: "/images/quranandtafseer.png"
  },
  {
    name: "The Lesson from the Book Of ALLAH Course",
    slug: "lesson-from-quran-course",
    duration: "6 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Learn important lessons and morals from the Quran.",
    topics: [
      "Daily life lessons",
      "Moral stories",
      "Practical guidance"
    ],
    demoLink: "https://faizanonline.net/lesson-from-quran-course/demo-class",
    image: "/images/lessonsfromquran.png"
  },
  {
    name: "The Introduction of the Quranic Chapters Course",
    slug: "intro-quranic-chapters",
    duration: "6 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Overview of Quranic chapters and their key themes.",
    topics: [
      "Chapter summary",
      "Themes and lessons",
      "Practical understanding"
    ],
    demoLink: "https://faizanonline.net/intro-quranic-chapters/demo-class",
    image: "/images/introquranic.png"
  },
  {
    name: "The Commentary of the Quran Sirat-ul-jinan Course",
    slug: "commentary-quran-sirat-ul-jinan",
    duration: "2.5 years",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Detailed commentary and explanations from Sirat-ul-Jinan.",
    topics: [
      "Verse explanations",
      "Lessons and applications",
      "Story analysis"
    ],
    demoLink: "https://faizanonline.net/commentary-quran-sirat-ul-jinan/demo-class",
    image: "/images/commentaryquran.png"
  },
  {
    name: "Blessing of AHADITH Course (For Adults)",
    slug: "blessing-ahadith-adults",
    duration: "1 year",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Study and understand 40+ important Ahadith for adults.",
    topics: [
      "Selected Ahadith",
      "Practical guidance",
      "Moral lessons"
    ],
    demoLink: "https://faizanonline.net/blessing-ahadith-adults/demo-class",
    image: "/images/blessingofahadith.png"
  },
  {
    name: "The Islamic ETIQUETTE Course",
    slug: "islamic-etiquette",
    duration: "3 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Learn proper Islamic manners and etiquette in daily life.",
    topics: [
      "Social manners",
      "Family etiquette",
      "Mosque and community behavior"
    ],
    demoLink: "https://faizanonline.net/islamic-etiquette/demo-class",
    image: "/images/ettiquetecourse.png"
  },
  {
    name: "Arabic Grammar Course",
    slug: "arabic-grammar",
    duration: "1 year",
    classDuration: "30 Minutes",
    languages: "Arabic/Urdu",
    overview: "Learn Arabic grammar for better understanding of Quran and texts.",
    topics: [
      "Nouns and verbs",
      "Sentence structure",
      "Tenses and rules"
    ],
    demoLink: "https://faizanonline.net/arabic-grammar/demo-class",
    image: "/images/arabicgrammar.png"
  },
  {
    name: "The Taharah Course For Kids",
    slug: "taharah-kids",
    duration: "2 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Teach children proper Taharah practices.",
    topics: [
      "Wudu and Ghusl",
      "Cleanliness rules",
      "Practical exercises"
    ],
    demoLink: "https://faizanonline.net/taharah-kids/demo-class",
    image: "/images/taharacourse.png"
  },
  {
    name: "The Taharah Course For Adults",
    slug: "taharah-adults",
    duration: "2.5 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Teach adults proper Taharah and purification methods.",
    topics: [
      "Wudu, Ghusl & Tayammum",
      "Cleanliness and rules",
      "Practical guidance"
    ],
    demoLink: "https://faizanonline.net/taharah-adults/demo-class",
    image: "/images/taharacourseadults.png"
  },
  {
    name: "The Salah Course For Kids",
    slug: "salah-kids",
    duration: "3 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Teach children proper Salah practices.",
    topics: [
      "Salah steps",
      "Daily prayers",
      "Practical exercises"
    ],
    demoLink: "https://faizanonline.net/salah-kids/demo-class",
    image: "/images/salahcoursekids.png"
  },
  {
    name: "The Salah Course For Adults",
    slug: "salah-adults",
    duration: "2 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Teach adults proper Salah practices.",
    topics: [
      "Daily Salah guidance",
      "Hands-on practice",
      "Error correction"
    ],
    demoLink: "https://faizanonline.net/salah-adults/demo-class",
    image: "/images/salahcourseadults.png"
  },
  {
    name: "The Zakah Course",
    slug: "zakah-course",
    duration: "1 month",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Understand Zakah rules and calculation.",
    topics: [
      "Nisab calculation",
      "Distribution rules",
      "Practical examples"
    ],
    demoLink: "https://faizanonline.net/zakah-course/demo-class",
    image: "/images/zakahcourse.png"
  },
  {
    name: "Pre Alim Course",
    slug: "pre-alim-course",
    duration: "6 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Foundation course for Alim studies.",
    topics: [
      "Basic Islamic studies",
      "Quranic reading",
      "Hadith introduction"
    ],
    demoLink: "https://faizanonline.net/pre-alim-course/demo-class",
    image: "/images/prealimcourse.png"
  },
  {
    name: "The Marriage Course",
    slug: "marriage-course",
    duration: "1.5 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Learn Islamic teachings regarding marriage and family life.",
    topics: [
      "Nikah guidelines",
      "Rights and responsibilities",
      "Family ethics"
    ],
    demoLink: "https://faizanonline.net/marriage-course/demo-class",
    image: "/images/marriagecourse.png"
  },
  {
    name: "Belief in the Finality of Prophethood Course",
    slug: "belief-finality-prophethood",
    duration: "2 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Learn about the finality of Prophethood in Islam.",
    topics: [
      "Prophet Muhammad ﷺ teachings",
      "Concept of Khatm-un-Nubuwwah",
      "Practical implications"
    ],
    demoLink: "https://faizanonline.net/belief-finality-prophethood/demo-class",
    image: "/images/beliefcourse.png"
  },
  {
    name: "The Imamaat Course",
    slug: "imamaat-course",
    duration: "6 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Study Islamic leadership and Imamaat rules.",
    topics: [
      "Roles of Imams",
      "Prayer leadership",
      "Community guidance"
    ],
    demoLink: "https://faizanonline.net/imamaat-course/demo-class",
    image: "/images/imamatcourse.png"
  },
  {
    name: "Ruling of Hajj Course",
    slug: "ruling-hajj-course",
    duration: "1 month",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Learn correct procedures and rulings for Hajj.",
    topics: [
      "Hajj rituals",
      "Important du'as",
      "Practical guidance"
    ],
    demoLink: "https://faizanonline.net/ruling-hajj-course/demo-class",
    image: "./images/hajjcourse.png"
  },
  {
    name: "Ruling of Umrah Course",
    slug: "ruling-umrah-course",
    duration: "1 month",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Learn correct procedures and rulings for Umrah.",
    topics: [
      "Umrah rituals",
      "Important du'as",
      "Practical guidance"
    ],
    demoLink: "https://faizanonline.net/ruling-umrah-course/demo-class",
    image: "/images/umrahcourse.png"
  },
  {
    name: "The Fard Uloom Course",
    slug: "fard-uloom-course",
    duration: "12 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Comprehensive study of Fard Uloom.",
    topics: [
      "Fiqh basics",
      "Hadith studies",
      "Tafseer introduction"
    ],
    demoLink: "https://faizanonline.net/fard-uloom-course/demo-class",
    image: "/images/farduloom.png"
  },
  {
    name: "The FIQH Course",
    slug: "fiqh-course",
    duration: "30 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Detailed study of Islamic jurisprudence (Fiqh).",
    topics: [
      "Hanafi Fiqh",
      "Practical rulings",
      "Case studies"
    ],
    demoLink: "https://faizanonline.net/fiqh-course/demo-class",
    image: "/images/fiqhcourse.png"
  },
  {
    name: "The Salah Course (For Women)",
    slug: "salah-women",
    duration: "2 months",
    classDuration: "30 Minutes",
    languages: "Urdu/Roman",
    overview: "Teach women proper Salah practices.",
    topics: [
      "Daily Salah",
      "Women's prayer guidelines",
      "Hands-on practice"
    ],
    demoLink: "https://faizanonline.net/salah-women/demo-class",
    image: "/images/salahcoursewomen.png"
  }
];
