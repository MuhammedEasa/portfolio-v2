/** All site copy, bilingual. hi.txt is raw material; nothing copied verbatim. */

export type Bi = { en: string; ar: string };
export type Lang = "en" | "ar";

/** Render Western digits as Arabic-Indic for Arabic text. */
export const arabize = (value: string | number) =>
  String(value).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

/* ------------------------------------------------------------------ */
/*  Identity                                                           */
/* ------------------------------------------------------------------ */

export const identity = {
  first: { en: "MUHAMMED", ar: "محمد" } as Bi,
  last: { en: "Easa", ar: "عيسى" } as Bi,
  role: { en: "Full-Stack Engineer", ar: "مهندس برمجيات متكامل" } as Bi,
  place: { en: "Dubai, United Arab Emirates", ar: "دبي، الإمارات العربية المتحدة" } as Bi,
  zone: "UTC+4",
  email: "easandd@gmail.com",
  github: "https://github.com/MuhammedEasa",
  githubLabel: "github.com/MuhammedEasa",
  website: "https://muhammedeasa.com",
  whatsapp: "+971 50 422 8524",
  whatsappHref: "https://wa.me/971504228524",
  copyright: { en: "© Muhammed Easa", ar: "© محمد عيسى" } as Bi,
};

/* ------------------------------------------------------------------ */
/*  The five leaves                                                    */
/* ------------------------------------------------------------------ */

export const leaves: { href: string; title: Bi }[] = [
  { href: "/", title: { en: "Frontispiece", ar: "الديباجة" } },
  { href: "/work", title: { en: "The Works", ar: "الأعمال" } },
  { href: "/practice", title: { en: "The Practice", ar: "الخدمات" } },
  { href: "/chronicle", title: { en: "The Chronicle", ar: "السيرة" } },
  { href: "/correspondence", title: { en: "Correspondence", ar: "المراسلات" } },
];

export function nextLeaf(current: string) {
  const i = leaves.findIndex((p) => p.href === current);
  return leaves[(i + 1) % leaves.length];
}

/* ------------------------------------------------------------------ */
/*  Interface words                                                    */
/* ------------------------------------------------------------------ */

export const ui = {
  ascend: { en: "Back to the top", ar: "العودة إلى الأعلى" } as Bi,
  whatsapp: { en: "Chat on WhatsApp", ar: "راسلنا على واتساب" } as Bi,
  pageTurns: { en: "The page turns", ar: "تُقلب الصفحة" } as Bi,
  menuOpen: { en: "Open the book", ar: "افتح الفهرس" } as Bi,
  menuClose: { en: "Close", ar: "أغلق" } as Bi,
  toDay: { en: "Light the hall", ar: "أضئ القاعة" } as Bi,
  toNight: { en: "Dim the hall", ar: "أطفئ القاعة" } as Bi,
  toArabic: "العربية",
  toEnglish: "English",
  cursor: {
    turn: { en: "turn", ar: "اقلب" } as Bi,
    visit: { en: "visit", ar: "زيارة" } as Bi,
    write: { en: "write", ar: "راسل" } as Bi,
    send: { en: "send", ar: "أرسل" } as Bi,
    sealed: { en: "sealed", ar: "سرّي" } as Bi,
    study: { en: "study", ar: "تمرين" } as Bi,
    open: { en: "open", ar: "افتح" } as Bi,
    again: { en: "again", ar: "مجددًا" } as Bi,
    ascend: { en: "rise", ar: "اصعد" } as Bi,
    chat: { en: "chat", ar: "دردشة" } as Bi,
  },
};

/* ------------------------------------------------------------------ */
/*  Frontispiece                                                       */
/* ------------------------------------------------------------------ */

export const front = {
  statline: {
    en: "Trading, payments, operations — ten products live in production, and every deadline met.",
    ar: "تداول ومدفوعات وعمليات — عشرة منتجات قيد التشغيل، والتزام تام بالمواعيد.",
  } as Bi,

  ctaWorks: { en: "View the works", ar: "شاهد الأعمال" } as Bi,

  counts: [
    {
      value: { en: "10+", ar: "+١٠" } as Bi,
      label: { en: "Products live in production", ar: "منتجات قيد التشغيل الفعلي" } as Bi,
    },
    {
      value: { en: "100%", ar: "٪١٠٠" } as Bi,
      label: { en: "Deadlines met — all of them", ar: "التزام بالمواعيد — كلها" } as Bi,
    },
    {
      value: { en: "95+", ar: "+٩٥" } as Bi,
      label: { en: "Lighthouse score, as standard", ar: "درجة الأداء، معيارًا ثابتًا" } as Bi,
    },
  ],

  storyLabel: { en: "What he builds", ar: "ما يبنيه" } as Bi,
  story: [
    {
      en: "He builds the systems money moves through — trading platforms, payment flows, client onboarding. Software that has to be right the first time, because real funds are riding on it.",
      ar: "يبني الأنظمة التي تتحرك الأموال من خلالها — منصات تداول، وتدفقات دفع، وتسجيل عملاء. برمجيات يجب أن تصيب من المرة الأولى، لأن أموالًا حقيقية تعتمد عليها.",
    },
    {
      en: "More than ten of his products are in production today, across very different industries — finance, e-commerce, fitness, enterprise operations. Every one of them shipped on the day it was promised.",
      ar: "أكثر من عشرة من منتجاته قيد التشغيل اليوم، في صناعات شديدة الاختلاف — المال والتجارة الإلكترونية واللياقة وعمليات المؤسسات. وكل واحد منها سُلّم في يومه الموعود.",
    },
  ] as Bi[],

  presentLabel: { en: "Today", ar: "اليوم" } as Bi,
  present: {
    en: "Senior Software Developer at a CAT-1, SCA-licensed financial firm in Dubai — designing the platforms that move trades, clients, and compliance every day.",
    ar: "مطوّر برمجيات أوّل في شركة مالية مرخّصة من هيئة الأوراق المالية والسلع (الفئة الأولى) في دبي — يصمّم المنصات التي تحرّك التداول والعملاء والامتثال كل يوم.",
  } as Bi,

  selectedLabel: { en: "Selected works", ar: "أعمال مختارة" } as Bi,
  allWorks: { en: "The complete works", ar: "جميع الأعمال" } as Bi,

  inviteLine: {
    en: "Available now · replies within a day",
    ar: "متاح الآن · يصلك الرد خلال يوم",
  } as Bi,
  invite: { en: "Send word", ar: "أرسل رسالة" } as Bi,
};

/* ------------------------------------------------------------------ */
/*  The Works                                                          */
/* ------------------------------------------------------------------ */

export type Work = {
  numeral: string;
  title: Bi;
  year: number;
  kind: Bi;
  account: Bi;
  stack: string[];
  url?: string;
  urlLabel?: string;
  confidential?: boolean;
  study?: boolean;
};

export const worksFolio = {
  folio: { en: "Folio II", ar: "الورقة الثانية" } as Bi,
  argument: {
    en: "A selection from four years of building, across very different industries. More than ten products carry his hand — these are the ones that may be shown.",
    ar: "مختارات من أربع سنوات من البناء، في صناعات شديدة الاختلاف. أكثر من عشرة منتجات تحمل توقيعه — وهذه ما يمكن عرضه منها.",
  } as Bi,
  entry: { en: "Entry", ar: "العمل" } as Bi,
  sealedNote: { en: "Held in confidence — NDA", ar: "محفوظ بسرّية — اتفاقية عدم إفصاح" } as Bi,
  studyNote: { en: "Study work — built to master the craft", ar: "عمل تدريبي — بُني لإتقان الحرفة" } as Bi,
};

export const works: Work[] = [
  {
    numeral: "I",
    title: { en: "FatToFit Fitness", ar: "FatToFit Fitness" },
    year: 2024,
    kind: { en: "Fitness platform", ar: "منصة لياقة" },
    account: {
      en: "A complete website for a Dubai gym — fast, bold, and built to turn visitors into members.",
      ar: "موقع متكامل لصالة رياضية في دبي — سريع وجريء، صُمّم ليحوّل الزوّار إلى أعضاء.",
    },
    stack: ["Next.js", "Tailwind CSS"],
    url: "https://fattofitfitness.com",
    urlLabel: "fattofitfitness.com",
  },
  {
    numeral: "II",
    title: { en: "CFX Prime", ar: "CFX Prime" },
    year: 2024,
    kind: { en: "Trading platform", ar: "منصة تداول" },
    account: {
      en: "The public face of a trading broker — built for trust, speed, and live markets.",
      ar: "الواجهة الرقمية لوسيط تداول — بُنيت على الثقة والسرعة وأسواق تعمل بلا توقف.",
    },
    stack: ["React", "TypeScript"],
    url: "https://cfxprime.com",
    urlLabel: "cfxprime.com",
  },
  {
    numeral: "III",
    title: { en: "Operations Intelligence", ar: "منصة ذكاء العمليات" },
    year: 2024,
    kind: { en: "Enterprise tooling", ar: "أدوات مؤسسية" },
    account: {
      en: "A private platform that runs a company's daily operations: live dashboards, roles and permissions, a full audit trail. A non-technical team has run it alone since handoff.",
      ar: "منصة خاصة تدير العمليات اليومية لشركة نامية: لوحات متابعة لحظية، وصلاحيات دقيقة، وسجلّ تدقيق كامل. يديرها فريق غير تقني بمفرده منذ التسليم.",
    },
    stack: ["Next.js", "Node.js", "MongoDB", "WebSockets", "Redis"],
    confidential: true,
  },
  {
    numeral: "IV",
    title: { en: "Nexafiz Global", ar: "Nexafiz Global" },
    year: 2023,
    kind: { en: "Digital income platform", ar: "منصة دخل رقمي" },
    account: {
      en: "A platform that turns everyday purchases into income through a global referral network, with live analytics behind it.",
      ar: "منصة تحوّل المشتريات اليومية إلى دخل عبر شبكة إحالات عالمية، تدعمها تحليلات لحظية.",
    },
    stack: ["Next.js", "Node.js"],
    url: "https://nexafizglobal.com",
    urlLabel: "nexafizglobal.com",
  },
  {
    numeral: "V",
    title: { en: "Al-Midan", ar: "الميدان" },
    year: 2023,
    kind: { en: "Freelance marketplace", ar: "سوق عمل حر" },
    account: {
      en: "A two-sided marketplace for freelancers and clients, with courses, live chat, and payments — his deep dive into distributed systems.",
      ar: "سوق يجمع المستقلين والعملاء، مع منصة دورات ومحادثة فورية ومدفوعات — وكان مدخله العميق إلى الأنظمة الموزّعة.",
    },
    stack: ["Next.js", "Node.js", "Kafka", "Socket.IO", "MongoDB", "Redux"],
    study: true,
  },
  {
    numeral: "VI",
    title: { en: "Full-Stack Commerce", ar: "متجر إلكتروني متكامل" },
    year: 2022,
    kind: { en: "E-commerce platform", ar: "تجارة إلكترونية" },
    account: {
      en: "His first production system: a complete online store with payments, wallets, and order tracking, deployed on AWS — and used by real customers.",
      ar: "أول أنظمته في بيئة الإنتاج: متجر إلكتروني متكامل بالمدفوعات والمحافظ وتتبّع الطلبات، منشور على AWS ويستخدمه عملاء حقيقيون.",
    },
    stack: ["Node.js", "Express", "MongoDB", "AWS", "NGINX", "Razorpay"],
    study: true,
  },
];

/* ------------------------------------------------------------------ */
/*  The Practice                                                       */
/* ------------------------------------------------------------------ */

export const practiceFolio = {
  folio: { en: "Folio III", ar: "الورقة الثالثة" } as Bi,
  argument: {
    en: "Six services, one way of working. Every engagement ends the same way: you own everything.",
    ar: "ست خدمات وطريقة عمل واحدة. وكل تعاقد ينتهي بالنتيجة نفسها: كل شيء ملككم.",
  } as Bi,
  mannerLabel: { en: "In four stages, always", ar: "أربع مراحل، دائمًا" } as Bi,
  mannerTitle: { en: "The Manner of Working", ar: "طريقة العمل" } as Bi,
  serveLabel: { en: "Whom the practice serves", ar: "لمن يعمل" } as Bi,
};

export type Service = {
  numeral: string;
  title: Bi;
  account: Bi;
  deliverables: Bi[];
};

export const services: Service[] = [
  {
    numeral: "I",
    title: { en: "Frontend Development", ar: "واجهات المستخدم" },
    account: {
      en: "Fast, polished interfaces in React and Next.js. A 95+ performance score is the starting point, not the goal.",
      ar: "واجهات سريعة ومصقولة بـ React وNext.js. درجة أداء ٩٥+ هي نقطة البداية لا الهدف.",
    },
    deliverables: [
      { en: "React / Next.js application", ar: "تطبيق React / Next.js" },
      { en: "Performance audit", ar: "تدقيق أداء" },
      { en: "Responsive design", ar: "تصميم متجاوب" },
      { en: "Animation system", ar: "نظام حركة" },
    ],
  },
  {
    numeral: "II",
    title: { en: "Backend & APIs", ar: "الأنظمة الخلفية" },
    account: {
      en: "APIs and databases built to survive real traffic — containerised, automated, ready to grow.",
      ar: "واجهات برمجية وقواعد بيانات تتحمّل الاستخدام الحقيقي — مهيّأة بالحاويات، مؤتمتة، وجاهزة للنمو.",
    },
    deliverables: [
      { en: "API design", ar: "تصميم الواجهات البرمجية" },
      { en: "Database architecture", ar: "هيكلة قواعد البيانات" },
      { en: "Docker setup", ar: "تهيئة Docker" },
      { en: "Automated deployment", ar: "نشر مؤتمت" },
    ],
  },
  {
    numeral: "III",
    title: { en: "Fintech & Regulated Systems", ar: "الأنظمة المالية المنظّمة" },
    account: {
      en: "Trading platforms, payment flows, KYC and compliance systems — built by someone who works inside a regulated financial firm every day.",
      ar: "منصات تداول، وتدفقات دفع، وأنظمة اعرف عميلك والامتثال — يبنيها من يعمل داخل شركة مالية منظّمة كل يوم.",
    },
    deliverables: [
      { en: "Trading & brokerage platforms", ar: "منصات التداول والوساطة" },
      { en: "Payment & wallet flows", ar: "تدفقات الدفع والمحافظ" },
      { en: "KYC / AML pipelines", ar: "خطوط اعرف عميلك ومكافحة غسل الأموال" },
      { en: "Audit-ready architecture", ar: "بنية جاهزة للتدقيق" },
    ],
  },
  {
    numeral: "IV",
    title: { en: "AI Integration", ar: "تكامل الذكاء الاصطناعي" },
    account: {
      en: "Practical AI inside real products — assistants, search that understands meaning, automated workflows. On your own servers when privacy demands it.",
      ar: "ذكاء اصطناعي عملي داخل منتجات حقيقية — مساعدون محادثون، وبحث يفهم المعنى، وسير عمل مؤتمت. وعلى خوادمكم الخاصة حين تقتضي الخصوصية.",
    },
    deliverables: [
      { en: "OpenCLAW workflows", ar: "سير عمل OpenCLAW" },
      { en: "Assistant integration", ar: "دمج المساعدات الذكية" },
      { en: "Semantic search", ar: "بحث دلالي" },
      { en: "Automation pipelines", ar: "خطوط أتمتة" },
    ],
  },
  {
    numeral: "V",
    title: { en: "Full Product Delivery", ar: "المنتج الكامل" },
    account: {
      en: "From idea to launch under one owner. A working staging site in week one; full documentation at handoff.",
      ar: "من الفكرة إلى الإطلاق بمسؤولية واحدة. نسخة تجريبية تعمل من الأسبوع الأول، وتوثيق كامل عند التسليم.",
    },
    deliverables: [
      { en: "Technical architecture", ar: "البنية التقنية" },
      { en: "Staging from week one", ar: "بيئة تجريبية من الأسبوع الأول" },
      { en: "Full QA", ar: "فحص جودة شامل" },
      { en: "Documented production deploy", ar: "نشر موثّق للإنتاج" },
    ],
  },
  {
    numeral: "VI",
    title: { en: "WordPress & Elementor", ar: "ووردبريس وElementor" },
    account: {
      en: "Custom WordPress, tuned hard for speed — and handed over so your own team can run it without calling anyone.",
      ar: "مواقع ووردبريس مخصّصة ومضبوطة للسرعة — تُسلَّم بحيث يديرها فريقكم بأنفسهم دون الحاجة إلى أحد.",
    },
    deliverables: [
      { en: "Custom theme or plugin", ar: "قالب أو إضافة مخصّصة" },
      { en: "Elementor Pro setup", ar: "تهيئة Elementor Pro" },
      { en: "Speed optimisation", ar: "تحسين السرعة" },
      { en: "Admin training", ar: "تدريب فريق الإدارة" },
    ],
  },
];

export const stages = [
  {
    numeral: "I",
    title: { en: "Discovery", ar: "الاستكشاف" } as Bi,
    when: { en: "Day one", ar: "اليوم الأول" } as Bi,
    account: {
      en: "Thirty minutes on goals, timeline, and constraints — and the hard questions, before any price.",
      ar: "ثلاثون دقيقة عن الأهداف والمدة والقيود — والأسئلة الصعبة قبل أي تسعير.",
    } as Bi,
  },
  {
    numeral: "II",
    title: { en: "Proposal", ar: "العرض" } as Bi,
    when: { en: "Within two days", ar: "خلال يومين" } as Bi,
    account: {
      en: "What gets built, how long it takes, what it costs — in writing, before work begins.",
      ar: "ما الذي سيُبنى، وكم يستغرق، وكم يكلّف — كتابةً، قبل أن يبدأ العمل.",
    } as Bi,
  },
  {
    numeral: "III",
    title: { en: "Development", ar: "التنفيذ" } as Bi,
    when: { en: "One-to-two-week sprints", ar: "دفعات كل أسبوع أو أسبوعين" } as Bi,
    account: {
      en: "Work arrives in deployed pieces you can see and use. Problems are raised the day they appear.",
      ar: "يصلكم العمل على دفعات منشورة تُرى وتُستخدم. والعوائق تُطرح يوم ظهورها.",
    } as Bi,
  },
  {
    numeral: "IV",
    title: { en: "Delivery", ar: "التسليم" } as Bi,
    when: { en: "At launch", ar: "عند الإطلاق" } as Bi,
    account: {
      en: "Deployed to your infrastructure, fully documented — with support after launch.",
      ar: "يُنشر على بنيتكم التحتية مع توثيق كامل — ودعم بعد الإطلاق.",
    } as Bi,
  },
];

export const terms: Bi[] = [
  {
    en: "The full price is known before work begins.",
    ar: "السعر الكامل معلوم قبل أن يبدأ العمل.",
  },
  {
    en: "Everything is yours from the first commit — code, credentials, documents.",
    ar: "كل شيء ملككم منذ أول إيداع — الكود وبيانات الدخول والمستندات.",
  },
];

export const clientele = [
  {
    who: { en: "Startups", ar: "الشركات الناشئة" } as Bi,
    what: { en: "systems built for growth", ar: "أنظمة تُبنى للنمو" } as Bi,
  },
  {
    who: { en: "Growing businesses", ar: "الأعمال النامية" } as Bi,
    what: { en: "real products, not templates", ar: "منتجات حقيقية لا قوالب جاهزة" } as Bi,
  },
  {
    who: { en: "Agencies", ar: "الوكالات" } as Bi,
    what: { en: "a brief taken, delivered on time", ar: "موجز يُستلم وعمل يُسلَّم في موعده" } as Bi,
  },
  {
    who: { en: "Internal tools", ar: "الأدوات الداخلية" } as Bi,
    what: { en: "manual work turned into software", ar: "عمل يدوي يتحوّل إلى برمجيات" } as Bi,
  },
];

/* ------------------------------------------------------------------ */
/*  The Chronicle                                                      */
/* ------------------------------------------------------------------ */

export const chronicleFolio = {
  folio: { en: "Folio IV", ar: "الورقة الرابعة" } as Bi,
  argument: {
    en: "Four years, charted — from a first production deploy to the systems behind a regulated trading floor in Dubai.",
    ar: "أربع سنوات موثّقة — من أول نشر في الإنتاج إلى الأنظمة التي تقف خلف قاعة تداول مرخّصة في دبي.",
  } as Bi,
  annalsLabel: { en: "The years", ar: "السنوات" } as Bi,
  instrumentsLabel: { en: "What the work is done with", ar: "عدّة العمل" } as Bi,
  instrumentsTitle: { en: "The Instruments", ar: "الأدوات" } as Bi,
  aiLabel: { en: "On intelligence", ar: "في الذكاء الاصطناعي" } as Bi,
  financeLabel: { en: "On finance", ar: "في المال" } as Bi,
  tenetsLabel: { en: "Held across every engagement", ar: "ثوابت في كل تعاقد" } as Bi,
  tenetsTitle: { en: "The Tenets", ar: "المبادئ" } as Bi,
  tonguesLabel: { en: "The tongues", ar: "اللغات" } as Bi,
};

export const annals = [
  {
    year: 2021,
    title: { en: "The first line", ar: "السطر الأول" } as Bi,
    account: {
      en: "The practice began in 2021: teach yourself by shipping. Within months the projects stopped being practice and became products.",
      ar: "بدأت الممارسة عام ٢٠٢١: علِّم نفسك بالإطلاق. وخلال أشهر لم تعد المشاريع تدريبًا — صارت منتجات.",
    } as Bi,
  },
  {
    year: 2022,
    title: { en: "First production", ar: "أول إنتاج" } as Bi,
    account: {
      en: "His first real system went live: a complete online store on AWS, used by real customers.",
      ar: "أول نظام حقيقي له يدخل الخدمة: متجر إلكتروني متكامل على AWS يستخدمه عملاء حقيقيون.",
    } as Bi,
  },
  {
    year: 2023,
    title: { en: "Paying clients", ar: "عملاء يدفعون" } as Bi,
    account: {
      en: "He moved into distributed systems — live chat, payments, microservices — and shipped his first commercial work.",
      ar: "انتقل إلى الأنظمة الموزّعة — محادثة فورية ومدفوعات وخدمات مصغّرة — وسلّم أول أعماله التجارية.",
    } as Bi,
  },
  {
    year: 2024,
    title: { en: "Trusted with more", ar: "ثقة أكبر" } as Bi,
    account: {
      en: "A gym in Dubai. A trading broker. A confidential operations platform. Three industries — all delivered on time.",
      ar: "صالة رياضية في دبي، ووسيط تداول، ومنصة عمليات سرّية. ثلاث صناعات — سُلّمت كلها في موعدها.",
    } as Bi,
  },
  {
    year: 2025,
    title: { en: "The regulated floor", ar: "قاعة التداول" } as Bi,
    account: {
      en: "Senior Software Developer inside UAE finance — the systems that carry trading, onboarding, and compliance now carry his architecture.",
      ar: "مطوّر برمجيات أوّل في القطاع المالي الإماراتي — الأنظمة التي تحمل التداول وتسجيل العملاء والامتثال تقوم اليوم على هندسته.",
    } as Bi,
  },
];

export const instruments = [
  {
    title: { en: "Frontend", ar: "الواجهات" } as Bi,
    items: ["React", "Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Framer Motion", "Angular", "WordPress"],
  },
  {
    title: { en: "Backend", ar: "الأنظمة الخلفية" } as Bi,
    items: ["Node.js", "Express", "Java", "Apache Kafka", "REST", "GraphQL"],
  },
  {
    title: { en: "Databases", ar: "قواعد البيانات" } as Bi,
    items: ["MongoDB", "MySQL", "Elasticsearch", "Firebase", "Redis"],
  },
  {
    title: { en: "Infrastructure", ar: "البنية والتشغيل" } as Bi,
    items: ["Docker", "Kubernetes", "AWS", "Vercel", "GitHub Actions", "NGINX"],
  },
  {
    title: { en: "AI & automation", ar: "الذكاء الاصطناعي والأتمتة" } as Bi,
    items: [
      "Production AI integration",
      "On-premise & local models",
      "Speech recognition",
      "Browser-side inference",
      "Prompt engineering",
    ],
  },
  {
    title: { en: "CRM & integrations", ar: "أنظمة CRM والتكاملات" } as Bi,
    items: ["CRM development", "HubSpot API", "Webhooks", "Third-party APIs"],
  },
];

export const intelligence = {
  intro: {
    en: "He treats AI as infrastructure, not novelty. Every feature he ships answers to the same standards as the rest of production — latency, reliability, audit. His own framework, OpenCLAW, chains model calls with memory and conditional logic, entirely on the client's servers.",
    ar: "يتعامل مع الذكاء الاصطناعي كبنية تحتية لا كزينة. كل ميزة يطلقها تخضع لمعايير الإنتاج نفسها — سرعة الاستجابة والموثوقية وقابلية التدقيق. وإطاره الخاص OpenCLAW يربط استدعاءات النماذج بذاكرة ومنطق شرطي، على خوادم العميل بالكامل.",
  } as Bi,
  capabilities: [
    {
      name: { en: "Assistants that know your business", ar: "مساعدون يعرفون عملك" } as Bi,
      use: {
        en: "they answer from your documents, your data, your tone — not the open internet",
        ar: "يجيبون من مستنداتكم وبياناتكم وبأسلوبكم — لا من الإنترنت المفتوح",
      } as Bi,
    },
    {
      name: { en: "Search that understands intent", ar: "بحث يفهم القصد" } as Bi,
      use: {
        en: "ask in plain language and find the thing, not the keyword",
        ar: "اسأل بلغة طبيعية لتجد ما تريده، لا الكلمة المفتاحية",
      } as Bi,
    },
    {
      name: { en: "Automation with judgement", ar: "أتمتة تُحسِن التقدير" } as Bi,
      use: {
        en: "documents read, classified, and routed before anyone has opened them",
        ar: "مستندات تُقرأ وتُصنَّف وتُوجَّه قبل أن يفتحها أحد",
      } as Bi,
    },
    {
      name: { en: "AI inside existing products", ar: "ذكاء اصطناعي داخل منتجاتكم القائمة" } as Bi,
      use: {
        en: "added to the systems you already run — no rebuild, no migration",
        ar: "يُضاف إلى الأنظمة التي تعمل لديكم — دون إعادة بناء أو ترحيل",
      } as Bi,
    },
    {
      name: { en: "Privacy-first deployments", ar: "نشرٌ يقدّم الخصوصية أولًا" } as Bi,
      use: {
        en: "on-premise models where data is regulated; nothing leaves without a decision",
        ar: "نماذج محلية حيث تخضع البيانات للتنظيم؛ لا شيء يغادر دون قرار",
      } as Bi,
    },
  ],
};

export const finance = {
  intro: {
    en: "Finance is his chosen field, learned from the inside — trading platforms and payment systems in Dubai. He studies what sits underneath the markets, and wires platforms into the providers around them.",
    ar: "المال هو ميدانه المختار، تعلّمه من الداخل — منصات تداول وأنظمة دفع في دبي. يدرس ما يقوم عليه السوق من الأسفل، ويصل المنصات بمزوّدي الخدمات من حولها.",
  } as Bi,
  areas: [
    { en: "Order books and matching engines", ar: "دفاتر الأوامر ومحركات المطابقة" },
    { en: "Third-party provider integrations — liquidity, market data, payments", ar: "تكاملات مع مزوّدين خارجيين — السيولة وبيانات السوق والمدفوعات" },
    { en: "API design and documentation — REST, OpenAPI / Swagger", ar: "تصميم الواجهات البرمجية وتوثيقها — REST وOpenAPI / Swagger" },
    { en: "Risk and margin systems", ar: "أنظمة المخاطر والهامش" },
    { en: "UAE fintech regulation", ar: "التنظيم المالي الإماراتي" },
    { en: "Payment rails — SWIFT and local networks", ar: "قنوات الدفع — سويفت والشبكات المحلية" },
    { en: "On-chain protocols — Ethereum, Solana", ar: "بروتوكولات السلاسل — إيثيريوم وسولانا" },
    { en: "Backtesting and time-series pipelines", ar: "الاختبار الرجعي وسلاسل البيانات الزمنية" },
    { en: "KYC, AML, and transaction monitoring", ar: "اعرف عميلك ومكافحة غسل الأموال ومراقبة المعاملات" },
    { en: "Smart-contract security", ar: "أمان العقود الذكية" },
  ] as Bi[],
};

export const tenets = [
  {
    numeral: "I",
    title: { en: "Plan before code", ar: "التخطيط قبل الكود" } as Bi,
    account: {
      en: "Structure comes first. It prevents the expensive rewrites.",
      ar: "الهيكل أولًا — فهو ما يقي من إعادة البناء المكلفة.",
    } as Bi,
  },
  {
    numeral: "II",
    title: { en: "Speed is a feature", ar: "السرعة ميزة" } as Bi,
    account: {
      en: "Slow software is broken software. A 95+ score is the standard, not the stretch.",
      ar: "البرنامج البطيء برنامج معطّل. أداء ٩٥+ هو المعيار لا الاستثناء.",
    } as Bi,
  },
  {
    numeral: "III",
    title: { en: "Written for the next engineer", ar: "كود لمن يأتي بعده" } as Bi,
    account: {
      en: "Code is read more than it is written. Documentation is part of the product.",
      ar: "الكود يُقرأ أكثر مما يُكتب، والتوثيق جزء من المنتج.",
    } as Bi,
  },
  {
    numeral: "IV",
    title: { en: "A date given is a date kept", ar: "الموعد عهد" } as Bi,
    account: {
      en: "Problems are raised the day they appear — never hidden.",
      ar: "المشكلات تُعلن يوم ظهورها — ولا تُخبّأ أبدًا.",
    } as Bi,
  },
];

export const tongues = [
  { name: { en: "English", ar: "الإنجليزية" } as Bi, level: { en: "Fluent", ar: "بطلاقة" } as Bi },
  { name: { en: "Malayalam", ar: "المالايالامية" } as Bi, level: { en: "Mother tongue", ar: "اللغة الأم" } as Bi },
  { name: { en: "Tamil", ar: "التاميلية" } as Bi, level: { en: "Conversational", ar: "محادثة" } as Bi },
  { name: { en: "Hindi", ar: "الهندية" } as Bi, level: { en: "Learning", ar: "قيد التعلّم" } as Bi },
  { name: { en: "Urdu", ar: "الأردية" } as Bi, level: { en: "Learning", ar: "قيد التعلّم" } as Bi },
  { name: { en: "Arabic", ar: "العربية" } as Bi, level: { en: "Learning", ar: "قيد التعلّم" } as Bi },
];

/* ------------------------------------------------------------------ */
/*  Correspondence                                                     */
/* ------------------------------------------------------------------ */

export const letterFolio = {
  folio: { en: "Folio V", ar: "الورقة الخامسة" } as Bi,
  argument: {
    en: "For CTO and partner-level conversations, senior engineering roles, and serious freelance work. The first call is thirty minutes — and commits you to nothing.",
    ar: "لمحادثات على مستوى المدير التقني والشريك، والأدوار الهندسية القيادية، والمشاريع الجادة. الحديث الأول ثلاثون دقيقة — ولا يُلزمكم بشيء.",
  } as Bi,
  particularsLabel: { en: "Particulars", ar: "البيانات" } as Bi,
  sendLabel: { en: "Send word", ar: "أرسل رسالة" } as Bi,
  particulars: [
    {
      term: { en: "Standing", ar: "الحالة" } as Bi,
      detail: { en: "Available now", ar: "متاح الآن" } as Bi,
    },
    {
      term: { en: "Seat", ar: "المقر" } as Bi,
      detail: { en: "Dubai · UTC+4", ar: "دبي · UTC+4" } as Bi,
    },
    {
      term: { en: "Manner", ar: "أسلوب العمل" } as Bi,
      detail: { en: "Fully remote, async-first", ar: "عن بُعد بالكامل" } as Bi,
    },
    {
      term: { en: "Reply", ar: "الرد" } as Bi,
      detail: { en: "Within twenty-four hours", ar: "خلال أربعٍ وعشرين ساعة" } as Bi,
    },
  ],
};

export const letter = {
  nameLabel: { en: "Your name", ar: "الاسم" } as Bi,
  namePlaceholder: { en: "How should the reply address you?", ar: "كيف نخاطبك في الرد؟" } as Bi,
  emailLabel: { en: "Your email", ar: "البريد الإلكتروني" } as Bi,
  emailPlaceholder: { en: "Where the reply should travel", ar: "أين يصلك الرد؟" } as Bi,
  messageLabel: { en: "The matter", ar: "الرسالة" } as Bi,
  messagePlaceholder: {
    en: "Goals, timeline, constraints — hard questions welcome",
    ar: "الأهداف والمدة والقيود — الأسئلة الصعبة مرحَّب بها",
  } as Bi,
  submit: { en: "Dispatch", ar: "أرسل" } as Bi,
  sending: { en: "Dispatching…", ar: "يُرسَل…" } as Bi,
  sendingNote: { en: "The seal is being pressed", ar: "يُختم الظرف الآن" } as Bi,
  sentTitle: { en: "Word received.", ar: "وصلت رسالتك." } as Bi,
  sentBody: {
    en: "Your letter is on its way. A reply comes within twenty-four hours — usually sooner.",
    ar: "رسالتك في طريقها، والرد يصلك خلال أربعٍ وعشرين ساعة — وغالبًا قبل ذلك.",
  } as Bi,
  sendAnother: { en: "Send another", ar: "أرسل رسالة أخرى" } as Bi,
  errName: { en: "A name of at least two letters.", ar: "اسم من حرفين على الأقل." } as Bi,
  errEmail: { en: "A valid address, so a reply can find you.", ar: "عنوان صحيح ليصلك الرد." } as Bi,
  errMessage: { en: "Say a little more — ten characters at least.", ar: "أخبرنا أكثر — عشرة أحرف على الأقل." } as Bi,
  errRate: {
    en: "Too many dispatches — try again in an hour.",
    ar: "محاولات كثيرة — حاول مرة أخرى بعد ساعة.",
  } as Bi,
  errServer: {
    en: "The dispatch failed. Write directly to easandd@gmail.com.",
    ar: "تعذّر الإرسال. راسلنا مباشرة على easandd@gmail.com.",
  } as Bi,
  errNetwork: {
    en: "The dispatch could not leave. Check your connection and try again.",
    ar: "تعذّر الاتصال. تحقق من الشبكة وحاول مجددًا.",
  } as Bi,
};
