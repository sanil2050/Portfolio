export const site = {
  name: "Sanil Mishra",
  role: "AI Engineer",
  email: "sanilmishra010@gmail.com",
  phone: "+91 8102240182",
  location: "Noida, India",
  website: "https://sanilmishra.me",
  websiteLabel: "sanilmishra.me",
  availability: "Available for Freelance & Full-Time Roles",
  resumeUrl: "/Sanil_Mishra_AI_Engineer_Resume.pdf",
  anchors: {
    projects: "#projects",
    highlights: "#highlights",
  },
  social: {
    github: "https://github.com/sanil2050",
    githubHandle: "sanil2050",
    linkedin: "https://www.linkedin.com/in/sanil-mishra-ai/",
    linkedinHandle: "sanil-mishra-ai",
  },
  hero: {
    title: "Hi, I'm Sanil Mishra.\nAI Engineer building agentic systems.",
    subtitle:
      "AI Engineer focused on Agentic AI, multi-agent orchestration, hybrid RAG, and rapid MVP development — moving from idea to working prototype across data pipelines, model training, ontology design, and backend APIs.",
    primaryCta: { label: "View My Projects", href: "/projects" },
  },
  footer: {
    note: "© 2026 Sanil Mishra. Built with Next.js & Tailwind CSS.",
    quickLinks: [
      { href: "/projects", label: "Projects" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
  contact: {
    heading:
      "Looking for an AI Engineer, Data Analyst, or ML collaborator? Let's build something impactful together.",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    {
      title: "Agentic AI & Multi-Agent Systems",
      description:
        "Designing autonomous multi-agent orchestration pipelines using LangChain, MCP (Model Context Protocol), and critic-auditing loops for rapid MVP deployment.",
      features: [
        "LangChain & multi-agent orchestration",
        "MCP (Model Context Protocol) tooling",
        "Research, Reader, Writer & Critic agent pipelines",
        "Rapid MVP prototyping with Claude Code, Gemini & Codex",
        "CLI & Streamlit interactive execution workflows",
      ],
    },
    {
      title: "Enterprise & Hybrid RAG",
      description:
        "Building production-oriented retrieval platforms blending dense semantic vectors, BM25 sparse search, GraphRAG, and RBAC security.",
      features: [
        "JWT authentication & RBAC permission filtering",
        "Document RAG (dense + BM25 sparse) & GraphRAG routing",
        "Reciprocal Rank Fusion (RRF) & cross-encoder reranking",
        "PostgreSQL + pgvector & Pinecone serverless indexes",
        "Grounded citations & page-level source traceability",
      ],
    },
    {
      title: "Machine Learning & Computer Vision",
      description:
        "Developing high-accuracy detection and classification models with PyTorch, Ultralytics YOLO, Scikit-learn, and XGBoost.",
      features: [
        "Ultralytics YOLOv8, YOLOv11 & YOLOv26 workflows",
        "Custom dataset curation, labeling & augmentation",
        "Systematic hyperparameter tuning & benchmarking",
        "ONNX model export for lightweight inference",
        "Scikit-learn & XGBoost predictive modeling",
      ],
    },
    {
      title: "Data Analysis & BI Reporting",
      description:
        "Transforming complex tabular datasets into statistical summaries, visual insights, and interactive business intelligence dashboards.",
      features: [
        "Python, Pandas & NumPy data pipelines",
        "Exploratory Data Analysis (EDA) & cleaning",
        "Tableau & Power BI visual reporting",
        "Advanced Microsoft Excel analytics",
        "Statistical trend & pattern extraction",
      ],
    },
    {
      title: "Backend & REST API Engineering",
      description:
        "Architecting clean backend APIs and document ingestion services with FastAPI and Django for AI-powered applications.",
      features: [
        "FastAPI services with Swagger / OpenAPI docs",
        "Django & REST API architecture",
        "PDF / DOCX extraction & page-aware chunking",
        "PostgreSQL + pgvector, Pinecone & SQL databases",
        "End-to-end data contracts & deployment readiness",
      ],
    },
    {
      title: "Explainable AI & Model Diagnostics",
      description:
        "Delivering interpretable, rigorously validated ML systems using SHAP explainability, class balancing, and strict evaluation metrics.",
      features: [
        "SHAP (Shapley Additive exPlanations) interpretability",
        "SMOTE & class-balancing techniques",
        "Precision, recall, accuracy & confusion matrix audits",
        "Evidence-before-answers citation verification",
        "Low-temperature grounded prompt design",
      ],
    },
  ],
  pricing: [
    {
      name: "Rapid MVP",
      price: "1–2 Weeks",
      unit: "",
      description:
        "Ideal for validating an AI workflow, multi-agent proof of concept, or working prototype fast.",
      features: [
        "Idea to working prototype in days",
        "Agentic workflow or RAG pipeline setup",
        "FastAPI / Streamlit demo interface",
        "LLM prompt & retrieval tuning",
        "Clean GitHub handoff & documentation",
      ],
      popular: false,
    },
    {
      name: "RAG & Agentic AI",
      price: "Custom",
      unit: "",
      description:
        "Designed for secure Enterprise/Hybrid RAG platforms, multi-agent systems, and full-stack AI APIs.",
      features: [
        "JWT / RBAC document-level security",
        "Hybrid dense + BM25 / GraphRAG retrieval",
        "RRF fusion & cross-encoder reranking",
        "PostgreSQL + pgvector or Pinecone DB",
        "FastAPI backend with OpenAPI docs",
        "Source-traceable grounded responses",
      ],
      popular: true,
    },
    {
      name: "Full-Time & Consulting",
      price: "Flexible",
      unit: "",
      description:
        "For AI Engineer, Data Analyst, or ML research roles and ongoing model/analytics consulting.",
      features: [
        "Full-time or freelance AI engineering",
        "Computer vision (YOLO / PyTorch / ONNX)",
        "Predictive ML with XGBoost & SHAP",
        "Pandas, Tableau, Power BI & Excel BI",
        "Independent full-stack ownership",
      ],
      popular: false,
    },
  ],
  projects: [
    {
      title: "Enterprise RAG Platform",
      brand: "— Flagship RAG · 2026",
      h1: "Enterprise RAG",
      caption: "RBAC-secured Document\n& GraphRAG platform.",
      description:
        "Production-oriented RAG platform for secure Q&A over internal company knowledge, enforcing JWT authentication and RBAC permission filtering. Features query rewriting, a bounded 3-step Agent Planner routing across Document RAG (hybrid dense + sparse) and GraphRAG, Reciprocal Rank Fusion (RRF), cross-encoder reranking, evidence-before-answers grounding with Nemotron, PDF/DOCX ingestion into PostgreSQL + pgvector, and a FastAPI server with OpenAPI docs.",
      image: "/images/bookmark-wave-blue.jpg",
      tags: [
        "Python",
        "FastAPI",
        "LangChain",
        "PostgreSQL",
        "pgvector",
        "Google Gemini",
        "Nemotron",
        "JWT/RBAC",
      ],
      liveUrl: "https://github.com/sanil2050/enterprise-rag",
      githubUrl: "https://github.com/sanil2050/enterprise-rag",
      accentColor: "rgb(0, 123, 255)",
      step: 1,
    },
    {
      title: "Hybrid RAG Pipeline",
      brand: "— Agentic RAG · 2026",
      h1: "Hybrid RAG",
      caption: "Dense + BM25 Pinecone\nretrieval with Gemini.",
      description:
        "End-to-end Agentic RAG pipeline ingesting PDFs via pypdf into ~500-character overlapping chunks, combining HuggingFace all-MiniLM-L6-v2 (384-dim) dense embeddings and a BM25 sparse encoder in a serverless AWS Pinecone hybrid index. Uses batched upserts, PineconeHybridSearchRetriever (top-k=5), and Google Gemini 2.5 Flash (temperature 0.2) with page-level source traceability.",
      image: "/images/bookmark-wave-orange.jpg",
      tags: [
        "Python",
        "LangChain",
        "Pinecone",
        "HuggingFace",
        "Google Gemini",
        "BM25",
      ],
      liveUrl: "https://github.com/sanil2050/hybrid-rag-pipeline",
      githubUrl: "https://github.com/sanil2050/hybrid-rag-pipeline",
      accentColor: "rgb(255, 73, 25)",
      step: 2,
    },
    {
      title: "Multi-Agent AI Research System",
      brand: "— Multi-Agent · 2026",
      h1: "Multi-Agent AI",
      caption: "4-agent research, writer\n& critic pipeline.",
      description:
        "LangChain-orchestrated 4-agent system: Research Agent queries Tavily Search API for ranked web sources, Reader Agent scrapes clean text with BeautifulSoup, Writer Agent synthesizes cited reports with Gemini 2.5 Flash, and Critic Agent audits quality with a 1–10 score and verdict. Exposed via a Streamlit web UI (live logs, downloadable reports) and headless CLI mode.",
      image: "/images/bookmark-wave-purple.jpg",
      tags: [
        "Python",
        "LangChain",
        "Google Gemini",
        "Tavily API",
        "Streamlit",
        "BeautifulSoup",
      ],
      liveUrl: "https://github.com/sanil2050/Multi-Agent-Ai-Research-System",
      githubUrl: "https://github.com/sanil2050/Multi-Agent-Ai-Research-System",
      accentColor: "rgb(190, 55, 241)",
      step: 3,
    },
    {
      title: "Breast Cancer Classification (YOLOv11 & YOLOv26)",
      brand: "— Research & CV · 2026",
      h1: "Cancer Vision",
      caption: "Mammography classification\nwith YOLOv11 & v26.",
      description:
        "Preprocessed and unified CBIS-DDSM and VinDr-Mammo mammography datasets into benign and malignant classes using 70:10:10 train/val/test splits, data augmentation, and class balancing. Tuned hyperparameters independently on Ultralytics YOLOv11 and YOLOv26 classification heads and benchmarked held-out diagnostic precision, recall, and accuracy.",
      image: "/images/insight1.jpg",
      tags: ["Python", "PyTorch", "YOLOv11/v26", "CBIS-DDSM", "VinDr-Mammo"],
      liveUrl: "https://github.com/sanil2050",
      githubUrl: "https://github.com/sanil2050",
      accentColor: "rgb(16, 185, 129)",
      step: 1,
    },
    {
      title: "Object Detection using YOLOv8",
      brand: "— Computer Vision · 2025",
      h1: "YOLOv8 Detect",
      caption: "92% accuracy detection\nwith ONNX export.",
      description:
        "Curated and labeled a custom bounding-box dataset of cold-drink bottles, applying flips, color jitter, mosaic augmentation, and COCO transfer learning. Trained YOLOv8 to 92% detection accuracy, built an inference pipeline with configurable confidence and NMS thresholds, exported to ONNX, and audited confusion matrices.",
      image: "/images/hero_developer_image.png",
      tags: ["Python", "PyTorch", "Ultralytics YOLOv8", "ONNX"],
      liveUrl: "https://github.com/sanil2050/YoloV8-and-Label-Studio--Integration",
      githubUrl: "https://github.com/sanil2050/YoloV8-and-Label-Studio--Integration",
      accentColor: "rgb(0, 123, 255)",
      step: 2,
    },
    {
      title: "Predictive Analysis of Youth Suicide Risk",
      brand: "— Explainable ML · 2026",
      h1: "Youth Risk ML",
      caption: "98.19% XGBoost accuracy\nwith SHAP insights.",
      description:
        "Designed a predictive classification pipeline featuring preprocessing, feature engineering, and SMOTE class balancing. Benchmarked Logistic Regression, Random Forest, and XGBoost (reaching 98.19% accuracy) and integrated SHAP explainability for interpretable feature importance.",
      image: "/images/insight2.jpg",
      tags: ["Python", "Scikit-learn", "XGBoost", "SHAP", "SMOTE", "Pandas"],
      liveUrl: "https://github.com/sanil2050",
      githubUrl: "https://github.com/sanil2050",
      accentColor: "rgb(255, 170, 0)",
      step: 3,
    },
    {
      title: "Hate Speech Detection Using ML",
      brand: "— NLP & ML · 2025",
      h1: "Hate Speech ML",
      caption: "Multi-class tweet NLP\nclassification pipeline.",
      description:
        "Collected and cleaned a labeled tweet dataset spanning hate speech, offensive language, and neutral classes. Preprocessed text, vectorized features with CountVectorizer, and trained a DecisionTreeClassifier in a modular end-to-end Scikit-learn classification pipeline.",
      image: "/images/bookmark-wave-purple.jpg",
      tags: ["Python", "Scikit-learn", "CountVectorizer", "DecisionTree", "NLP"],
      liveUrl: "https://github.com/sanil2050",
      githubUrl: "https://github.com/sanil2050",
      accentColor: "rgb(190, 55, 241)",
      step: 1,
    },
    {
      title: "Data Analysis Project",
      brand: "— Data Analytics · 2025",
      h1: "Data Analytics",
      caption: "End-to-end Pandas EDA\n& statistical insights.",
      description:
        "Built a Python and Pandas data analysis pipeline to clean, transform, and explore tabular datasets, generating visualizations and statistical summaries to extract clear trends and patterns.",
      image: "/images/bookmark-wave-blue.jpg",
      tags: ["Python", "Pandas", "NumPy", "EDA", "Visualization"],
      liveUrl: "https://github.com/sanil2050",
      githubUrl: "https://github.com/sanil2050",
      accentColor: "rgb(16, 185, 129)",
      step: 2,
    },
  ],
  highlights: [
    {
      id: "01",
      counter: "(01 / 04)",
      name: "Sanil Mishra",
      role: "AI Engineer · Noida, India",
      label: "Core Focus",
      services:
        "Agentic AI, Enterprise RAG, Multi-Agent Orchestration & Rapid MVPs",
      quote:
        "Moving from idea to working AI prototype in days across data pipelines, model training, ontology design, and backend APIs.",
      image: "/images/sanil.png",
    },
    {
      id: "02",
      counter: "(02 / 04)",
      name: "Verified Credentials",
      role: "Oracle & Data Science Certifications",
      label: "Certifications",
      services:
        "Oracle Agentic AI Foundations · Oracle Cloud Infrastructure AI · Data Science Mastery 2025 · Microsoft Excel 2026",
      quote:
        "Certified across Oracle Agentic AI Foundations, Oracle Cloud Infrastructure AI, and end-to-end Python, Excel, and Tableau analytics.",
      image: "/images/bookmark-wave-blue.jpg",
    },
    {
      id: "03",
      counter: "(03 / 04)",
      name: "Applied ML & Vision",
      role: "Computer Vision & Explainable AI",
      label: "Benchmarks",
      services:
        "YOLOv11 & YOLOv26 Mammography · YOLOv8 (92% Accuracy, ONNX) · XGBoost + SHAP (98.19% Accuracy)",
      quote:
        "Benchmarking YOLO vision architectures on clinical mammography datasets alongside SHAP-explainable models and ONNX inference.",
      image: "/images/insight1.jpg",
    },
    {
      id: "04",
      counter: "(04 / 04)",
      name: "Academic Foundation",
      role: "MCA · Galgotias University",
      label: "Education & Languages",
      services:
        "MCA (Galgotias University) · BCA (Chandigarh University) · English & Hindi",
      quote:
        "Combining postgraduate computer applications training with independent full-stack AI engineering, leadership, and rapid delivery.",
      image: "/images/hero_developer_image.png",
    },
  ],
  testimonials: [],
  about: {
    title: "Sanil Mishra",
    role: "AI Engineer · Agentic AI, RAG & Data Analytics",
    description:
      "AI Engineer focused on Agentic AI, automation, and rapid MVP development. Experienced in building enterprise-grade workflows using multi-agent orchestration, hybrid retrieval-augmented generation (RAG), and LLM-powered automation. Comfortable working independently across the full stack — data pipelines, model training, ontology design, and backend APIs — and skilled at using AI coding agents (Claude Code, Gemini, Codex) to move from idea to working prototype in days, not weeks.",
    journey: [
      "I am pursuing a Master of Computer Applications (MCA) at Galgotias University following my BCA from Chandigarh University, building applied AI systems across Agentic AI, Enterprise RAG, computer vision, and data analytics.",
      "My work focuses on shipping reliable, traceable AI pipelines independently — from PDF/DOCX ingestion, pgvector and Pinecone hybrid indexing, and bounded multi-agent planners to YOLOv8/v11/v26 vision models, XGBoost with SHAP explainability, and FastAPI backends.",
    ],
    whatIDo: [
      "Agentic AI & Multi-Agent Systems: LangChain, MCP, Tavily Search, and self-auditing critic loops.",
      "Enterprise & Hybrid RAG: JWT/RBAC filtering, dense + BM25 + GraphRAG routing, RRF fusion, and grounded citations.",
      "Machine Learning & Vision: PyTorch, Ultralytics YOLOv8/v11/v26, ONNX export, Scikit-learn, XGBoost, and SHAP.",
      "Data Analytics & Backend APIs: Python, Pandas, NumPy, Tableau, Power BI, Excel, FastAPI, Django, and SQL.",
    ],
  },
  skills: [
    "LangChain",
    "MCP (Model Context Protocol)",
    "Multi-Agent Orchestration",
    "Hybrid RAG (Dense + Sparse)",
    "GraphRAG",
    "Embeddings",
    "Prompt Engineering",
    "Claude Code",
    "Google Gemini",
    "Codex",
    "GLM / Kimi / OpenClaw",
    "Local Models",
    "Python",
    "C / C++",
    "JavaScript",
    "PyTorch",
    "Scikit-learn",
    "XGBoost",
    "Explainable AI (SHAP)",
    "YOLOv8 / YOLOv11 / YOLOv26",
    "ONNX",
    "Pinecone DB",
    "PostgreSQL + pgvector",
    "SQL",
    "FastAPI",
    "Django",
    "REST API",
    "Pandas",
    "NumPy",
    "Tableau",
    "Power BI",
    "Microsoft Excel",
    "Git & GitHub",
  ],
  softSkills: [
    "Leadership",
    "Teamwork",
    "Communication",
    "Planning",
    "Time Management",
  ],
  experience: [
    {
      role: "AI Engineer & Data Analyst",
      company: "Applied Research & Independent Engineering",
      period: "2024 – Present",
      description:
        "Designing and shipping enterprise-grade Agentic AI workflows, Hybrid RAG systems, computer vision benchmarks, and end-to-end data analytics pipelines.",
      highlights: [
        "Built a production-oriented Enterprise RAG Platform enforcing JWT/RBAC filtering, query rewriting, a bounded 3-step Agent Planner across Document RAG and GraphRAG, RRF fusion, cross-encoder reranking, and Nemotron-grounded answers over PostgreSQL + pgvector via FastAPI.",
        "Engineered an end-to-end Hybrid RAG Pipeline blending HuggingFace all-MiniLM-L6-v2 dense vectors and BM25 sparse search in Pinecone with Google Gemini 2.5 Flash and page-level source traceability.",
        "Orchestrated a 4-agent Multi-Agent AI Research System (Research, Reader, Writer, Critic) using LangChain, Tavily Search API, BeautifulSoup, and Gemini 2.5 Flash with a Streamlit web UI and headless CLI.",
        "Conducted mammography classification research benchmarking YOLOv11 and YOLOv26 on CBIS-DDSM and VinDr-Mammo, and trained custom YOLOv8 detection to 92% accuracy with ONNX export.",
        "Built predictive ML and BI pipelines with Pandas, NumPy, Scikit-learn, XGBoost (98.19% accuracy with SHAP explainability), Tableau, Power BI, and Microsoft Excel.",
      ],
      skills: [
        "Python",
        "LangChain",
        "FastAPI",
        "PostgreSQL + pgvector",
        "Pinecone",
        "PyTorch & YOLO",
        "XGBoost & SHAP",
        "Pandas & BI",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Galgotias University",
      status: "Current / Postgraduate",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Chandigarh University",
      status: "Graduated",
    },
    {
      degree: "Senior Secondary (10+2)",
      institution: "T.P.S College",
      status: "Completed",
    },
    {
      degree: "Matriculation (10th)",
      institution: "Dr. D. Ram DAV Public School",
      status: "Completed",
    },
  ],
  certifications: [
    {
      title: "Oracle Agentic AI Foundations",
      issuer: "MITS: FDP on Agentic AI",
      badge: "Agentic AI",
    },
    {
      title: "Oracle Cloud Infrastructure AI Foundations",
      issuer: "Oracle Cloud",
      badge: "Cloud AI",
    },
    {
      title: "Microsoft Excel 2026: Beginner to Excel Pro in only 6 Hours",
      issuer: "Data Analysis & Productivity",
      badge: "Data Analytics",
    },
    {
      title: "Data Science Mastery 2025: Excel, Python & Tableau",
      issuer: "Data Science & BI",
      badge: "Data Mastery",
    },
  ],
  languages: ["English (Fluent)", "Hindi (Native)"],
  insights: {
    coreCapabilities: {
      title: "Everything you need to\nbuild intelligent AI systems",
      sections: [
        {
          title: "Agentic AI & RAG",
          description:
            "Designing bounded multi-agent planners, MCP integrations, and RBAC-secured hybrid dense + sparse retrieval pipelines with grounded citations.",
        },
        {
          title: "Machine Learning & Vision",
          description:
            "Training and benchmarking PyTorch, Ultralytics YOLO, Scikit-learn, and XGBoost models with SHAP explainability and ONNX export.",
        },
        {
          title: "Backend APIs & Analytics",
          description:
            "Shipping FastAPI and Django services backed by PostgreSQL + pgvector, Pinecone, Pandas pipelines, Tableau, and Power BI.",
        },
      ],
    },
    designUX: {
      title: "From idea to working\nAI prototype in days",
      sections: [
        {
          title: "Rapid MVP Execution",
          description:
            "Leveraging AI coding agents (Claude Code, Gemini, Codex) alongside clean engineering to move rapidly from concept to production-ready demos.",
        },
        {
          title: "Traceable & Grounded",
          description:
            "Enforcing evidence-before-answers retrieval, RRF reranking, and source page traceability to minimize hallucinations.",
        },
        {
          title: "Full-Stack Ownership",
          description:
            "Handling data ingestion, ontology design, model evaluation, and REST API delivery independently end-to-end.",
        },
      ],
    },
  },
}
