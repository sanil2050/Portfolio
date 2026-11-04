import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONTS_HEAD, BASE_CSS, renderClientScript, tabler, tablerSvg } from './src/shared.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target both root dist and app/dist so whatever working dir server runs from, it is 100% updated
const DIST_DIRS = Array.from(new Set([
  path.join(__dirname, 'dist'),
  path.resolve(__dirname, '..', 'dist'),
  path.resolve('dist'),
  path.resolve('app', 'dist')
]));

DIST_DIRS.forEach(distPath => {
  ['', 'about', 'project', 'pricing', 'articles', 'assets'].forEach(sub => {
    const dir = path.join(distPath, sub);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const ASSETS_SOURCES = [
    path.resolve(__dirname, 'assets'),
    path.resolve(__dirname, '..', 'assets')
  ];
  const ASSETS_DIST = path.join(distPath, 'assets');
  if (!fs.existsSync(ASSETS_DIST)) fs.mkdirSync(ASSETS_DIST, { recursive: true });
  ASSETS_SOURCES.forEach(srcDir => {
    if (fs.existsSync(srcDir)) {
      fs.readdirSync(srcDir).forEach(file => {
        try {
          const src = path.join(srcDir, file);
          const dest = path.join(ASSETS_DIST, file);
          if (!fs.existsSync(dest) || fs.statSync(dest).size !== fs.statSync(src).size) {
            fs.copyFileSync(src, dest);
          }
        } catch (e) { }
      });
    }
  });
});

// Common Nav Header (Supaste Notch + macOS Dock Magnification)
function renderHeader(activeRoute = '/', base = '.') {
  return `
  <header class="header-nav">
    <div class="nav-notch-wrap">
      <div class="nav-container" id="macDockNav">
        <a href="${base}/index.html" class="nav-logo dock-item" data-dock-item aria-label="Sanil Mishra Home">
          <img src="${base}/assets/logo.png" alt="Sanil Mishra" class="nav-logo-img" />
        </a>

        <nav class="nav-links" id="dockLinks">
          <a href="${base}/index.html" class="nav-link dock-item ${activeRoute === '/' ? 'active' : ''}" data-dock-item>
            <span class="dock-label">Overview</span>
            <span class="dock-dot"></span>
          </a>
          <a href="${base}/about/index.html" class="nav-link dock-item ${activeRoute === '/about' ? 'active' : ''}" data-dock-item>
            <span class="dock-label">About & Experience</span>
            <span class="dock-dot"></span>
          </a>
          <a href="${base}/project/index.html" class="nav-link dock-item ${activeRoute === '/project' ? 'active' : ''}" data-dock-item>
            <span class="dock-label">Projects</span>
            <span class="dock-dot"></span>
          </a>
          <a href="${base}/pricing/index.html" class="nav-link dock-item ${activeRoute === '/pricing' ? 'active' : ''}" data-dock-item>
            <span class="dock-label">Services & Pricing</span>
            <span class="dock-dot"></span>
          </a>
          <a href="${base}/articles/index.html" class="nav-link dock-item ${activeRoute === '/articles' ? 'active' : ''}" data-dock-item>
            <span class="dock-label">Articles</span>
            <span class="dock-dot"></span>
          </a>
          <a href="${base}/index.html#contact" class="nav-link dock-item" data-dock-item>
            <span class="dock-label">Contact</span>
            <span class="dock-dot"></span>
          </a>
        </nav>

        <div class="nav-actions">
          <a href="${base}/assets/Sanil_Mishra_AI_Engineer_Resume.pdf" target="_blank" class="btn-primary btn-sm nav-cta-pill dock-item" data-dock-item>
            ${tabler('download', 14, 2.2)}
            <span>Resume</span>
          </a>
          <button id="menuToggleBtn" class="menu-toggle-btn" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation Drawer -->
  <div id="navDrawer" class="nav-drawer">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
      <a href="${base}/index.html" aria-label="Sanil Mishra Home">
        <img src="${base}/assets/logo.png" alt="Sanil Mishra" class="nav-logo-img" style="height:32px;" />
      </a>
    </div>
    <a href="${base}/index.html" class="drawer-link">Overview <span>→</span></a>
    <a href="${base}/about/index.html" class="drawer-link">About & Experience <span>→</span></a>
    <a href="${base}/project/index.html" class="drawer-link">Case Studies & Projects <span>→</span></a>
    <a href="${base}/pricing/index.html" class="drawer-link">Services & Pricing <span>→</span></a>
    <a href="${base}/articles/index.html" class="drawer-link">Research & Articles <span>→</span></a>
    <a href="${base}/index.html#contact" class="drawer-link">Get in Touch <span>→</span></a>
    <div style="margin-top:auto; padding-top:20px; display:flex; flex-direction:column; gap:12px;">
      <a href="${base}/assets/Sanil_Mishra_AI_Engineer_Resume.pdf" target="_blank" class="btn-primary" style="width:100%; text-align:center;">
        ${tabler('download', 16, 2)} Download Resume (PDF)
      </a>
      <p style="font-size:0.85rem; color:var(--text-subtle); text-align:center;">sanilmishra010@gmail.com · +91 8102240182</p>
    </div>
  </div>
  `;
}

// Common Footer
function renderFooter(base = '.') {
  return `
  <footer class="footer">
    <div class="footer-giant-brand">SANIL MISHRA</div>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div style="margin-bottom:16px;">
            <a href="${base}/index.html" aria-label="Sanil Mishra Home">
              <img src="${base}/assets/logo.png" alt="Sanil Mishra" class="footer-logo-img" />
            </a>
          </div>
          <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.7; max-width:340px; margin-bottom:20px;">
            AI Engineer specializing in Agentic AI orchestration, Enterprise RAG pipelines, computer vision benchmarks, and data analytics architectures.
          </p>
          <div style="display:flex; gap:14px; flex-wrap:wrap;">
            <a href="https://github.com/sanil2050" target="_blank" class="btn-secondary btn-sm" aria-label="GitHub">
              ${tabler('brand-github', 15, 2)} GitHub
            </a>
            <a href="https://www.linkedin.com/in/sanil-mishra-ai/" target="_blank" class="btn-secondary btn-sm" aria-label="LinkedIn">
              ${tabler('brand-linkedin', 15, 2)} LinkedIn
            </a>
            <a href="mailto:sanilmishra010@gmail.com" class="btn-secondary btn-sm" aria-label="Email">
              ${tabler('mail', 15, 2)} Email
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h5>Navigation</h5>
          <ul>
            <li><a href="${base}/index.html">Overview</a></li>
            <li><a href="${base}/about/index.html">About & Experience</a></li>
            <li><a href="${base}/project/index.html">Featured Projects</a></li>
            <li><a href="${base}/pricing/index.html">Services & Pricing</a></li>
            <li><a href="${base}/articles/index.html">Research Notes</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Specializations</h5>
          <ul>
            <li><a href="${base}/project/index.html">Enterprise RAG & RBAC</a></li>
            <li><a href="${base}/project/index.html">Multi-Agent Systems</a></li>
            <li><a href="${base}/project/index.html">YOLOv8/v11/v26 Vision</a></li>
            <li><a href="${base}/project/index.html">Predictive Data Science</a></li>
            <li><a href="${base}/pricing/index.html">Rapid MVP Engineering</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Direct Contact</h5>
          <ul>
            <li style="color:var(--text-muted); font-size:0.92rem;">Location: Noida, India</li>
            <li><a href="mailto:sanilmishra010@gmail.com">sanilmishra010@gmail.com</a></li>
            <li><a href="tel:+918102240182">+91 8102240182</a></li>
            <li><a href="https://sanilmishra.me" target="_blank">sanilmishra.me</a></li>
            <li><a href="${base}/assets/Sanil_Mishra_AI_Engineer_Resume.pdf" target="_blank" style="color:var(--accent-purple); font-weight:600;">Download Resume PDF ↓</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2026 Sanil Mishra · All rights reserved.</span>
        <span>Built with high-fidelity performance & modern web standards</span>
      </div>
    </div>
  </footer>
  <div id="toastMsg" class="toast-msg"></div>
  `;
}

const RIBBON_SKILLS = [
  { name: "Python", icon: "brand-python" },
  { name: "FastAPI", icon: "api" },
  { name: "Django", icon: "api" },
  { name: "Django REST Framework (DRF)", icon: "api" },
  { name: "REST API Development", icon: "api" },
  { name: "Microservices", icon: "server" },
  { name: "JWT Authentication", icon: "shield-lock" },
  { name: "Role-Based Access Control (RBAC)", icon: "shield-lock" },
  { name: "Swagger", icon: "api" },
  { name: "OpenAPI", icon: "api" },
  { name: "Generative AI", icon: "sparkles" },
  { name: "LLM Applications", icon: "brain" },
  { name: "Retrieval-Augmented Generation (RAG)", icon: "database-search" },
  { name: "Hybrid Search", icon: "database-search" },
  { name: "Dense Retrieval", icon: "database-search" },
  { name: "Sparse Retrieval", icon: "database-search" },
  { name: "GraphRAG", icon: "hierarchy" },
  { name: "Multi-Agent Orchestration", icon: "robot" },
  { name: "Agentic Workflows", icon: "robot" },
  { name: "LangChain", icon: "robot" },
  { name: "Model Context Protocol (MCP)", icon: "hierarchy" },
  { name: "Prompt Engineering", icon: "sparkles" },
  { name: "Context Engineering", icon: "sparkles" },
  { name: "Query Rewriting", icon: "git-merge" },
  { name: "Semantic Routing", icon: "git-merge" },
  { name: "Cross-Encoder Reranking", icon: "git-merge" },
  { name: "Reciprocal Rank Fusion (RRF)", icon: "git-merge" },
  { name: "Hallucination Mitigation", icon: "shield-check" },
  { name: "Google Gemini", icon: "sparkles" },
  { name: "Gemini 2.5 Flash", icon: "sparkles" },
  { name: "NVIDIA Nemotron", icon: "cpu" },
  { name: "Claude Code", icon: "sparkles" },
  { name: "OpenAI Codex", icon: "code" },
  { name: "GLM", icon: "brain" },
  { name: "Kimi", icon: "brain" },
  { name: "Hugging Face Transformers", icon: "brain" },
  { name: "Sentence Embeddings", icon: "vector" },
  { name: "all-MiniLM-L6-v2", icon: "vector" },
  { name: "Local LLM Deployment", icon: "server" },
  { name: "PyTorch", icon: "cpu" },
  { name: "Scikit-learn", icon: "cpu" },
  { name: "XGBoost", icon: "cpu" },
  { name: "Deep Learning", icon: "brain" },
  { name: "Natural Language Processing (NLP)", icon: "brain" },
  { name: "Transfer Learning", icon: "cpu" },
  { name: "Hyperparameter Optimization", icon: "target" },
  { name: "Explainable AI (SHAP)", icon: "microscope" },
  { name: "Ultralytics YOLOv8", icon: "scan-eye" },
  { name: "YOLOv11", icon: "scan-eye" },
  { name: "YOLOv26", icon: "scan-eye" },
  { name: "ONNX", icon: "bolt" },
  { name: "ONNX Runtime", icon: "bolt" },
  { name: "PostgreSQL", icon: "database" },
  { name: "pgvector", icon: "database" },
  { name: "Pinecone", icon: "database" },
  { name: "AWS Serverless", icon: "server" },
  { name: "Vector Databases", icon: "database" },
  { name: "BM25", icon: "file-search" },
  { name: "SQL", icon: "database" },
  { name: "Pandas", icon: "chart-dots-3" },
  { name: "NumPy", icon: "chart-dots-3" },
  { name: "BeautifulSoup", icon: "world-search" },
  { name: "Tavily Search API", icon: "world-search" },
  { name: "C", icon: "code" },
  { name: "C++", icon: "code" },
  { name: "JavaScript", icon: "code" },
  { name: "HTML", icon: "code" },
  { name: "CSS", icon: "code" },
  { name: "Git", icon: "git-merge" },
  { name: "GitHub", icon: "brand-github" },
  { name: "VS Code", icon: "code" },
  { name: "Streamlit", icon: "chart-bar" },
  { name: "Power BI", icon: "chart-bar" },
  { name: "Tableau", icon: "chart-bar" },
  { name: "Microsoft Excel", icon: "chart-dots-3" },
  { name: "Semantic Search", icon: "database-search" },
  { name: "Keyword Search", icon: "search" },
  { name: "Vector Search", icon: "vector" },
  { name: "Embedding Generation", icon: "vector" },
  { name: "Agent Planning", icon: "robot" },
  { name: "Multi-Agent Systems", icon: "robot" },
  { name: "Web Search Automation", icon: "world-search" },
  { name: "Content Extraction", icon: "file-text" },
  { name: "Report Generation", icon: "file-text" },
  { name: "PDF Parsing", icon: "file-text" },
  { name: "DOCX Parsing", icon: "file-text" },
  { name: "Page-Aware Chunking", icon: "file-text" },
  { name: "Document Ingestion", icon: "file-text" },
  { name: "Citation Verification", icon: "shield-check" },
  { name: "Grounded Generation", icon: "sparkles" },
  { name: "Source Attribution", icon: "link" },
  { name: "Object Detection", icon: "scan-eye" },
  { name: "Image Classification", icon: "scan-eye" },
  { name: "Medical Imaging", icon: "scan-eye" },
  { name: "Mammography Classification", icon: "scan-eye" },
  { name: "Data Augmentation", icon: "chart-dots-3" },
  { name: "Model Benchmarking", icon: "award" },
  { name: "Precision", icon: "target" },
  { name: "Recall", icon: "target" },
  { name: "Accuracy", icon: "check" },
  { name: "Confusion Matrix", icon: "chart-dots-3" }
];

function renderStatWave(id, accentColor, glowColor) {
  return `
  <div class="stat-card-wave" aria-hidden="true">
    <svg viewBox="0 0 360 85" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGrad-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.05" />
          <stop offset="35%" stop-color="${accentColor}" stop-opacity="0.75" />
          <stop offset="65%" stop-color="${glowColor}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.1" />
        </linearGradient>
        <filter id="waveGlow-${id}" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M-10,76 Q 70,82 140,68 T 260,42 T 370,58" stroke="url(#waveGrad-${id})" stroke-width="1.2" opacity="0.35" />
      <path d="M-10,79 Q 75,85 145,64 T 265,38 T 370,54" stroke="url(#waveGrad-${id})" stroke-width="1.6" opacity="0.6" />
      <path d="M-10,82 Q 80,88 150,60 T 270,34 T 370,50" stroke="url(#waveGrad-${id})" stroke-width="2.4" filter="url(#waveGlow-${id})" />
      <path d="M-10,85 Q 85,90 155,57 T 275,32 T 370,48" stroke="url(#waveGrad-${id})" stroke-width="1.4" opacity="0.5" />
      <path d="M-10,87 Q 90,92 160,54 T 280,30 T 370,46" stroke="url(#waveGrad-${id})" stroke-width="1" opacity="0.3" />
    </svg>
  </div>`;
}

// -------------------------------------------------------------
// 1. HOME PAGE (index.html)
// -------------------------------------------------------------
function buildHomePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sanil Mishra · AI Engineer & Agentic Systems Architect</title>
  <meta name="description" content="Portfolio of Sanil Mishra - AI Engineer focused on Agentic AI, Enterprise RAG, Computer Vision, and full-stack machine learning architectures.">
  <link rel="icon" type="image/png" href="./assets/logo.png">
  ${FONTS_HEAD}
  <style>
    ${BASE_CSS}

    /* Hero Layout */
    .hero-section {
      min-height: 94vh;
      padding-top: 140px;
      padding-bottom: 80px;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      background: #060606;
    }
    .hero-video-bg-container {
      position: absolute;
      inset: -40px;
      width: calc(100% + 80px);
      height: calc(100% + 80px);
      overflow: hidden;
      z-index: 0;
      pointer-events: none;
      perspective: 1200px;
    }
    .hero-video-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 112%;
      min-height: 112%;
      width: 112%;
      height: 112%;
      transform: translate(-50%, -50%) scale(1.1);
      transform-origin: center center;
      object-fit: cover;
      opacity: 0.85;
      filter: saturate(1.2) brightness(0.95);
      will-change: transform;
    }
    .hero-video-overlay {
      position: absolute;
      inset: -25px;
      background:
        radial-gradient(circle at 60% 40%, rgba(6, 6, 6, 0.1) 0%, rgba(6, 6, 6, 0.55) 70%, #060606 100%),
        linear-gradient(180deg, rgba(6, 6, 6, 0.5) 0%, transparent 25%, rgba(6, 6, 6, 0.7) 85%, #060606 100%);
      pointer-events: none;
      will-change: transform;
    }
    .hero-content-container {
      position: relative;
      z-index: 2;
      width: 100%;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.25fr 0.85fr;
      gap: 60px;
      align-items: center;
    }
    /* Hero Status Capsule Badge — Matching Reference Green Glow */
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 20px;
      border-radius: 9999px;
      background: #021408;
      border: 1px solid #10b981;
      color: #00e676;
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.25), inset 0 0 12px rgba(16, 185, 129, 0.15);
      transition: all 0.3s ease;
      cursor: default;
      user-select: none;
    }
    .status-pill:hover {
      box-shadow: 0 0 28px rgba(16, 185, 129, 0.4), inset 0 0 16px rgba(16, 185, 129, 0.25);
      border-color: #34d399;
      transform: translateY(-1px);
    }
    .status-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #00e676;
      box-shadow: 0 0 10px #00e676, 0 0 18px rgba(0, 230, 118, 0.8);
      flex-shrink: 0;
      animation: blinkGreenDot 1.4s infinite ease-in-out;
    }
    @keyframes blinkGreenDot {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
        box-shadow: 0 0 10px #00e676, 0 0 18px rgba(0, 230, 118, 0.9);
      }
      50% {
        opacity: 0.2;
        transform: scale(0.75);
        box-shadow: 0 0 2px rgba(0, 230, 118, 0.3);
      }
    }
    .hero-headline {
      font-size: clamp(2.8rem, 5.8vw, 5.2rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.05;
      margin: 20px 0 16px;
    }
    .hero-salutation {
      display: block;
      color: #ffffff;
      font-size: clamp(2.4rem, 4.8vw, 3.8rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.1;
      margin-bottom: 6px;
    }
    .hero-tech-text-wrap {
      width: 100%;
      height: clamp(85px, 13vw, 140px);
      position: relative;
      margin: 0 0 12px -2px;
      overflow: visible;
      letter-spacing: normal !important;
    }
    .hero-headline span.gradient-text {
      background: linear-gradient(135deg, #b388ff 0%, #7c4dff 50%, #448aff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .typewriter-wrapper {
      font-family: var(--font-mono);
      font-size: clamp(1.2rem, 2.2vw, 1.85rem);
      font-weight: 900;
      color: var(--accent-purple);
      margin-bottom: 24px;
      min-height: 48px;
      display: flex;
      align-items: center;
      position: relative;
    }
    .glitch-text-wrapper {
      position: relative;
      display: inline-block;
      user-select: none;
      font-weight: 900;
      letter-spacing: -0.01em;
      --g-offset: 10px;
      --g-skew: 0deg;
      --g-s1: #ff0000;
      --g-s2: #00ffff;
      --g-speed: 2s;
    }
    .glitch-text-wrapper #typewriterText {
      position: relative;
      z-index: 2;
      display: inline-block;
      color: var(--accent-purple);
      text-shadow: 0 0 14px rgba(179, 136, 255, 0.45);
    }
    .glitch-text-wrapper::before,
    .glitch-text-wrapper::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
      font-weight: 900;
      font-family: var(--font-mono);
    }
    .glitch-text-wrapper::before {
      color: #ffffff;
      animation: glitch-slices-1 var(--g-speed) infinite ease-in-out;
    }
    .glitch-text-wrapper::after {
      color: #ffffff;
      animation: glitch-slices-2 var(--g-speed) infinite ease-in-out;
    }
    @keyframes glitch-slices-1 {
      0% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      12% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      13% { clip-path: inset(18% 0 58% 0); transform: translate(calc(var(--g-offset) * -1), 0) skewX(var(--g-skew)); text-shadow: -3px 0 var(--g-s1); }
      17% { clip-path: inset(62% 0 12% 0); transform: translate(calc(var(--g-offset) * 0.8), 0) skewX(var(--g-skew)); text-shadow: 2px 0 var(--g-s2); }
      21% { clip-path: inset(38% 0 42% 0); transform: translate(calc(var(--g-offset) * -0.5), 0) skewX(0); text-shadow: -2px 0 var(--g-s1); }
      25% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      52% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      53% { clip-path: inset(12% 0 74% 0); transform: translate(calc(var(--g-offset) * 1.1), 0) skewX(var(--g-skew)); text-shadow: 3px 0 var(--g-s1); }
      57% { clip-path: inset(78% 0 6% 0); transform: translate(calc(var(--g-offset) * -0.9), 0) skewX(var(--g-skew)); text-shadow: -3px 0 var(--g-s2); }
      61% { clip-path: inset(30% 0 38% 0); transform: translate(calc(var(--g-offset) * 0.6), 0) skewX(0); text-shadow: 2px 0 var(--g-s1); }
      66% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      82% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      83% { clip-path: inset(48% 0 24% 0); transform: translate(calc(var(--g-offset) * -1.2), 0) skewX(var(--g-skew)); text-shadow: -4px 0 var(--g-s1); }
      87% { clip-path: inset(16% 0 64% 0); transform: translate(calc(var(--g-offset) * 0.7), 0) skewX(var(--g-skew)); text-shadow: 2px 0 var(--g-s2); }
      91% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      100% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
    }
    @keyframes glitch-slices-2 {
      0% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      14% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      15% { clip-path: inset(68% 0 14% 0); transform: translate(calc(var(--g-offset) * 1), 0) skewX(var(--g-skew)); text-shadow: 3px 0 var(--g-s2); }
      19% { clip-path: inset(14% 0 68% 0); transform: translate(calc(var(--g-offset) * -0.8), 0) skewX(var(--g-skew)); text-shadow: -2px 0 var(--g-s1); }
      23% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      55% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      56% { clip-path: inset(42% 0 36% 0); transform: translate(calc(var(--g-offset) * -1.2), 0) skewX(var(--g-skew)); text-shadow: -3px 0 var(--g-s2); }
      60% { clip-path: inset(22% 0 62% 0); transform: translate(calc(var(--g-offset) * 0.9), 0) skewX(var(--g-skew)); text-shadow: 3px 0 var(--g-s1); }
      64% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      85% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      86% { clip-path: inset(82% 0 6% 0); transform: translate(calc(var(--g-offset) * 1.1), 0) skewX(var(--g-skew)); text-shadow: 4px 0 var(--g-s2); }
      90% { clip-path: inset(6% 0 78% 0); transform: translate(calc(var(--g-offset) * -0.7), 0) skewX(var(--g-skew)); text-shadow: -2px 0 var(--g-s1); }
      94% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
      100% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); text-shadow: none; }
    }
    .typewriter-cursor {
      display: inline-block;
      width: 3px;
      height: 1.2em;
      background-color: var(--accent-purple);
      margin-left: 6px;
      animation: blinkCursor 0.9s infinite;
    }
    @keyframes blinkCursor {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .hero-bio {
      font-size: 1.05rem;
      line-height: 1.8;
      color: var(--text-muted);
      max-width: 640px;
      margin-bottom: 36px;
    }
    .hero-cta-group {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 48px;
    }

    /* Profile Visual Card */
    .profile-card-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
    }
    .profile-glow {
      position: absolute;
      width: 360px;
      height: 360px;
      background: radial-gradient(circle, rgba(179, 136, 255, 0.25) 0%, rgba(0, 230, 118, 0.1) 40%, transparent 70%);
      filter: blur(40px);
      z-index: 1;
      pointer-events: none;
    }
    .profile-card {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 460px;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .profile-card:hover {
      transform: translateY(-6px);
    }
    .profile-img-wrap {
      width: 100%;
      position: relative;
      -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 78%, transparent 100%);
      mask-image: linear-gradient(180deg, #000 0%, #000 78%, transparent 100%);
    }
    .profile-img-wrap img {
      width: 100%;
      height: auto;
      display: block;
    }
    .profile-card-footer {
      padding: 16px 8px 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Expandable Contact Screen */
    #workTogetherBtn { cursor: pointer; font-family: inherit; }
    .contact-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: #ffffff;
      color: #0a0a0a;
      overflow-y: auto;
      visibility: hidden;
      pointer-events: none;
      clip-path: inset(0 0 0 0 round 100px);
      transition: clip-path 0.55s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .contact-overlay.visible { visibility: visible; }
    .contact-overlay.open { pointer-events: auto; }
    .co-close {
      position: fixed;
      top: 22px;
      right: 22px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #0a0a0a;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.3s ease 0.25s, transform 0.2s ease;
    }
    .contact-overlay.open .co-close { opacity: 1; }
    .co-close:hover { transform: scale(1.08); }
    .co-inner {
      max-width: 1100px;
      min-height: 100%;
      margin: 0 auto;
      padding: 64px 40px;
      display: flex;
      align-items: center;
      gap: 64px;
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.4s ease 0.2s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
    }
    .contact-overlay.open .co-inner { opacity: 1; transform: none; }
    .co-left, .co-right { flex: 1; width: 100%; }
    .co-title {
      font-size: clamp(2.2rem, 4.5vw, 3.4rem);
      font-weight: 500;
      line-height: 1;
      letter-spacing: -0.03em;
      margin-bottom: 28px;
    }
    .co-points { display: flex; flex-direction: column; gap: 22px; }
    .co-point { display: flex; align-items: center; gap: 16px; }
    .co-icon {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      background: rgba(10, 10, 10, 0.06);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .co-point-label {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(10, 10, 10, 0.5);
    }
    .co-point a, .co-point span { font-size: 1.02rem; font-weight: 500; color: #0a0a0a; }
    .co-point a:hover { text-decoration: underline; }
    .co-note {
      margin-top: 32px;
      padding-top: 28px;
      border-top: 1px solid rgba(10, 10, 10, 0.12);
      font-size: 1.05rem;
      line-height: 1.55;
      color: rgba(10, 10, 10, 0.75);
    }
    .co-form { display: flex; flex-direction: column; gap: 18px; }
    .co-field label {
      display: block;
      margin-bottom: 8px;
      font-family: var(--font-mono);
      font-size: 0.62rem;
      letter-spacing: 0.5px;
      color: #0a0a0a;
    }
    .co-field input, .co-field select, .co-field textarea {
      width: 100%;
      border: 0;
      border-radius: 8px;
      background: #f2f2f4;
      color: #0a0a0a;
      padding: 0 16px;
      height: 42px;
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
      transition: box-shadow 0.2s ease;
    }
    .co-field textarea { height: auto; padding: 12px 16px; resize: none; }
    .co-field input::placeholder, .co-field textarea::placeholder { color: rgba(10, 10, 10, 0.45); }
    .co-field input:focus, .co-field select:focus, .co-field textarea:focus { box-shadow: 0 0 0 2px rgba(10, 10, 10, 0.2); }
    .co-row { display: flex; gap: 16px; }
    .co-grow { flex: 1; }
    .co-select { width: 140px; flex-shrink: 0; }
    .co-submit {
      height: 44px;
      border-radius: 9999px;
      background: #0a0a0a;
      color: #fff;
      font-weight: 500;
      font-size: 0.95rem;
      letter-spacing: -0.02em;
      cursor: pointer;
    }
    .co-submit:hover { background: #262626; }
    @media (max-width: 860px) {
      .co-inner { flex-direction: column; align-items: stretch; gap: 36px; padding: 80px 22px 40px; }
      .co-row { flex-direction: column; }
      .co-select { width: 100%; }
    }
    @media (prefers-reduced-motion: reduce) {
      .contact-overlay, .co-inner { transition-duration: 0.01s; }
    }

    /* Tech Marquee */
    .tech-ticker-wrap {
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      padding: 22px 0;
      background: #ffffff;
      overflow: hidden;
      position: relative;
      z-index: 5;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }
    .tech-ticker-wrap::before,
    .tech-ticker-wrap::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 120px;
      z-index: 3;
      pointer-events: none;
    }
    .tech-ticker-wrap::before {
      left: 0;
      background: linear-gradient(90deg, #ffffff 15%, rgba(255, 255, 255, 0) 100%);
    }
    .tech-ticker-wrap::after {
      right: 0;
      background: linear-gradient(270deg, #ffffff 15%, rgba(255, 255, 255, 0) 100%);
    }
    .tech-ticker-wrap .container {
      max-width: none;
      padding: 0;
    }
    .tech-ticker-track {
      display: flex;
      width: max-content;
      animation: techTickerScroll 160s linear infinite;
      will-change: transform;
    }
    .tech-ticker-wrap:hover .tech-ticker-track { animation-play-state: paused; }
    .tech-ticker-set {
      display: flex;
      align-items: center;
      gap: 48px;
      padding-right: 48px;
      flex-shrink: 0;
    }
    .tech-pill {
      white-space: nowrap;
      font-family: var(--font-mono);
      font-size: 0.88rem;
      font-weight: 600;
      color: #111111;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tech-pill .tabler-icon {
      color: #6d28d9;
    }
    .tech-pill::before {
      content: '●';
      color: #7c3aed;
      font-size: 0.65rem;
    }
    @keyframes techTickerScroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .tech-ticker-track { animation: none; }
    }

    /* Stats Grid — Match glowing neon card style with luminous borders & wave meshes */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 22px;
      margin-top: 56px;
    }
    .stat-card-styled {
      position: relative;
      background: #08080c;
      border: 1px solid var(--card-border);
      border-radius: 22px;
      padding: 30px 24px 38px;
      text-align: left;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--card-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .stat-card-styled::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 260px 140px at 50% 115%, var(--card-bg-glow) 0%, transparent 75%);
      pointer-events: none;
      z-index: 0;
    }
    .stat-card-styled:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 38px var(--card-hover-glow), 0 20px 48px rgba(0, 0, 0, 0.75);
      border-color: var(--card-glow);
    }
    .stat-card-purple {
      --card-border: rgba(168, 85, 247, 0.55);
      --card-accent: #a855f7;
      --card-glow: #c084fc;
      --card-bg-glow: rgba(168, 85, 247, 0.22);
      --card-shadow: 0 0 26px rgba(168, 85, 247, 0.22), 0 14px 36px rgba(0, 0, 0, 0.7);
      --card-hover-glow: rgba(192, 132, 252, 0.45);
    }
    .stat-card-green {
      --card-border: rgba(34, 197, 94, 0.55);
      --card-accent: #22c55e;
      --card-glow: #4ade80;
      --card-bg-glow: rgba(34, 197, 94, 0.22);
      --card-shadow: 0 0 26px rgba(34, 197, 94, 0.22), 0 14px 36px rgba(0, 0, 0, 0.7);
      --card-hover-glow: rgba(74, 222, 128, 0.45);
    }
    .stat-card-blue {
      --card-border: rgba(14, 165, 233, 0.55);
      --card-accent: #0ea5e9;
      --card-glow: #38bdf8;
      --card-bg-glow: rgba(14, 165, 233, 0.22);
      --card-shadow: 0 0 26px rgba(14, 165, 233, 0.22), 0 14px 36px rgba(0, 0, 0, 0.7);
      --card-hover-glow: rgba(56, 189, 248, 0.45);
    }
    .stat-card-amber {
      --card-border: rgba(245, 158, 11, 0.55);
      --card-accent: #f59e0b;
      --card-glow: #fbbf24;
      --card-bg-glow: rgba(245, 158, 11, 0.22);
      --card-shadow: 0 0 26px rgba(245, 158, 11, 0.22), 0 14px 36px rgba(0, 0, 0, 0.7);
      --card-hover-glow: rgba(251, 191, 36, 0.45);
    }
    .stat-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: var(--card-bg-glow);
      border: 1px solid var(--card-border);
      box-shadow: 0 0 18px var(--card-bg-glow);
      color: var(--card-glow);
      margin-bottom: 24px;
      position: relative;
      z-index: 2;
    }
    .stat-badge svg {
      width: 22px;
      height: 22px;
    }
    .stat-number {
      font-family: var(--font-sans);
      font-size: clamp(2.3rem, 3.2vw, 3.4rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #ffffff;
      line-height: 1.1;
      margin-bottom: 8px;
      position: relative;
      z-index: 2;
    }
    .stat-title {
      font-size: 1.18rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
      line-height: 1.3;
      margin-bottom: 8px;
      position: relative;
      z-index: 2;
    }
    .stat-desc {
      font-size: 0.88rem;
      color: #94a3b8;
      line-height: 1.55;
      position: relative;
      z-index: 2;
    }
    .stat-card-wave {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 72px;
      width: 100%;
      pointer-events: none;
      z-index: 1;
    }
    .stat-card-wave svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Specialized Capabilities Services Grid — Matching Luminous Reference */
    .services-grid-luminous {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    @media (max-width: 1024px) {
      .services-grid-luminous {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 680px) {
      .services-grid-luminous {
        grid-template-columns: 1fr;
      }
    }
    .service-card-luminous {
      position: relative;
      background: #08080c;
      border: 1.5px solid var(--srv-border);
      border-radius: 20px;
      padding: 28px 26px 32px;
      text-align: left;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 24px var(--srv-glow), 0 12px 32px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .service-card-luminous::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 260px 140px at 50% 115%, var(--srv-bg-glow) 0%, transparent 75%);
      pointer-events: none;
      z-index: 0;
    }
    .service-card-luminous:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 38px var(--srv-hover-glow), 0 18px 44px rgba(0, 0, 0, 0.75);
      border-color: var(--srv-bright);
    }
    .service-card-purple {
      --srv-border: rgba(168, 85, 247, 0.55);
      --srv-glow: rgba(168, 85, 247, 0.22);
      --srv-bright: #c084fc;
      --srv-bg-glow: rgba(168, 85, 247, 0.2);
      --srv-hover-glow: rgba(192, 132, 252, 0.42);
    }
    .service-card-cyan {
      --srv-border: rgba(14, 165, 233, 0.55);
      --srv-glow: rgba(14, 165, 233, 0.22);
      --srv-bright: #38bdf8;
      --srv-bg-glow: rgba(14, 165, 233, 0.2);
      --srv-hover-glow: rgba(56, 189, 248, 0.42);
    }
    .service-card-magenta {
      --srv-border: rgba(192, 132, 252, 0.55);
      --srv-glow: rgba(168, 85, 247, 0.22);
      --srv-bright: #d8b4fe;
      --srv-bg-glow: rgba(192, 132, 252, 0.2);
      --srv-hover-glow: rgba(216, 180, 254, 0.42);
    }
    .srv-header-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 18px;
      position: relative;
      z-index: 2;
    }
    .srv-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: var(--srv-bg-glow);
      border: 1px solid var(--srv-border);
      box-shadow: 0 0 16px var(--srv-glow);
      color: var(--srv-bright);
      flex-shrink: 0;
    }
    .srv-badge svg {
      width: 22px;
      height: 22px;
    }
    .srv-divider {
      width: 1.5px;
      height: 28px;
      background: var(--srv-border);
      opacity: 0.6;
      flex-shrink: 0;
    }
    .srv-title {
      font-size: 1.18rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
      line-height: 1.3;
      margin: 0;
    }
    .srv-desc {
      font-size: 0.9rem;
      color: #94a3b8;
      line-height: 1.6;
      position: relative;
      z-index: 2;
      margin: 0;
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 32px;
      margin-top: 48px;
    }
    .project-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .project-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }
    .project-card-title {
      font-size: 1.35rem;
      font-weight: 700;
      margin-bottom: 12px;
      line-height: 1.3;
    }
    .project-card-desc {
      font-size: 0.94rem;
      line-height: 1.7;
      margin-bottom: 24px;
      flex-grow: 1;
    }
    .project-tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      margin-top: auto;
    }
    .section-light .project-tech-tags {
      border-top-color: rgba(0, 0, 0, 0.08);
    }

    @media (max-width: 992px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 48px;
      }
      .profile-card-wrapper {
        order: -1;
      }
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 540px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  ${renderHeader('/', '.')}

  <main>
    <!-- HERO SECTION -->
    <section class="hero-section" id="heroSection">
      <div class="hero-video-bg-container" id="heroVideoBgContainer" aria-hidden="true">
        <video class="hero-video-bg" id="heroVideoBg" autoplay loop muted playsinline preload="auto">
          <source src="./assets/hero-bg.mp4" type="video/mp4">
        </video>
        <div class="hero-video-overlay" id="heroVideoOverlay"></div>
        <div class="sec-grid-dark" style="opacity: 0.35;"></div>
      </div>
      <div class="container hero-content-container">
        <div class="hero-grid">
          <div>
            <div class="status-pill" style="margin-bottom:20px;">
              <span class="status-dot"></span>
              <span>Available for Freelance & Full-time role</span>
            </div>

            <h1 class="hero-headline" aria-label="HI, I'M SANIL MISHRA">
              <span class="hero-salutation">HI, I'M</span>
              <div class="hero-tech-text-wrap" id="heroTechTextWrap">
                <div id="heroTechText" class="tech-text" role="img" aria-label="SANIL MISHRA">
                  <canvas id="heroTechCanvas" class="tech-text-canvas"></canvas>
                  <span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Sanil Mishra</span>
                </div>
              </div>
            </h1>

            <div class="typewriter-wrapper">
              <span class="glitch-text-wrapper" id="glitchTextWrapper" data-text="Enterprise RAG Architect">
                <span id="typewriterText">Enterprise RAG Architect</span>
              </span>
              <span class="typewriter-cursor"></span>
            </div>

            <p class="hero-bio">
              AI Engineer focused on Agentic AI, automation, and rapid MVP development. Experienced in building enterprise-grade workflows using multi-agent orchestration, hybrid retrieval-augmented generation (RAG), and LLM-powered automation. Comfortable working independently across the full stack data pipelines, model training, ontology design, and backend APIs and skilled at using AI coding agents (Claude Code, Gemini, Codex, Local Models) to move from idea to working prototype in days, not weeks.
            </p>

            <div class="hero-cta-group">
              <button type="button" class="btn-primary" id="workTogetherBtn" aria-haspopup="dialog" aria-controls="contactOverlay">
                Let's Work Together
                ${tabler('arrow-up-right', 16, 2.2)}
              </button>
              <a href="./assets/Sanil_Mishra_AI_Engineer_Resume.pdf" target="_blank" class="btn-secondary">
                ${tabler('download', 16, 2)}
                View Resume
              </a>
              <a href="./project/index.html" class="btn-secondary">
                ${tabler('code', 16, 2)}
                View All Projects
              </a>
            </div>
          </div>

          <div class="profile-card-wrapper">
            <div class="profile-card">
              <div class="profile-img-wrap">
                <img src="./assets/profile-portrait.png" alt="Sanil Mishra - AI Engineer" loading="eager">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TECH TICKER MARQUEE -->
    <div class="tech-ticker-wrap">
      <div class="container">
        <div class="tech-ticker-track" aria-label="Core technologies and skills">
          ${[0, 1].map(n => `<div class="tech-ticker-set"${n ? ' aria-hidden="true"' : ''}>
            ${RIBBON_SKILLS.map(item => `<div class="tech-pill">${tabler(item.icon, 14, 2)} ${item.name}</div>`).join('')}
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- METRICS & STATISTICS SECTION -->
    <section class="section">
      <div class="sec-grid-dark"></div>
      <div class="container">
        <div style="text-align:center; max-width:700px; margin:0 auto 50px;">
          <div class="section-label">STATISTICS & BENCHMARKS</div>
          <h2 class="section-title">Engineered for Accuracy & Scalability</h2>
          <p class="section-desc" style="margin:0 auto;">
            Rigorous evaluation across production retrieval architectures, predictive classification, and deep computer vision systems.
          </p>
        </div>

        <div class="stats-grid">
          <!-- CARD 1: PURPLE (92% Detection Accuracy) -->
          <div class="stat-card-styled stat-card-purple">
            <div class="stat-badge">
              <svg class="stat-badge-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <path d="M12 3v2" /><path d="M12 19v2" /><path d="M3 12h2" /><path d="M19 12h2" />
              </svg>
            </div>
            <div class="stat-number">92%</div>
            <div class="stat-title">Detection Accuracy</div>
            <div class="stat-desc">Custom YOLOv8 object detection with ONNX deployment.</div>
            ${renderStatWave('purple', '#a855f7', '#c084fc')}
          </div>

          <!-- CARD 2: GREEN (4 Agents Autonomous AI Research) -->
          <div class="stat-card-styled stat-card-green">
            <div class="stat-badge">
              <svg class="stat-badge-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="6" r="2.5" />
                <path d="M9 11a3 3 0 0 1 6 0" />
                <circle cx="6" cy="17" r="2" />
                <path d="M3.5 21a2.5 2.5 0 0 1 5 0" />
                <circle cx="18" cy="17" r="2" />
                <path d="M15.5 21a2.5 2.5 0 0 1 5 0" />
                <path d="M12 11v3" /><path d="M7 14h10" />
              </svg>
            </div>
            <div class="stat-number">4 Agents</div>
            <div class="stat-title">Autonomous AI Research</div>
            <div class="stat-desc">Research, Reader, Writer and Critic agent pipeline.</div>
            ${renderStatWave('green', '#22c55e', '#4ade80')}
          </div>

          <!-- CARD 3: BLUE (384-d Vector Embeddings) -->
          <div class="stat-card-styled stat-card-blue">
            <div class="stat-badge">
              <svg class="stat-badge-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 4l-8 4l8 4l8 -4l-8 -4" />
                <path d="M4 12l8 4l8 -4" />
                <path d="M4 16l8 4l8 -4" />
              </svg>
            </div>
            <div class="stat-number">384-d</div>
            <div class="stat-title">Vector Embeddings</div>
            <div class="stat-desc">MiniLM embeddings powering Pinecone hybrid retrieval.</div>
            ${renderStatWave('blue', '#0ea5e9', '#38bdf8')}
          </div>

          <!-- CARD 4: AMBER (2 Branches Hybrid GraphRAG) -->
          <div class="stat-card-styled stat-card-amber">
            <div class="stat-badge">
              <svg class="stat-badge-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="18" r="2" />
                <circle cx="6" cy="6" r="2" />
                <circle cx="18" cy="6" r="2" />
                <path d="M12 16v-5" />
                <path d="M12 11c0 -2.5 -2.5 -3 -6 -3" />
                <path d="M12 11c0 -2.5 2.5 -3 6 -3" />
              </svg>
            </div>
            <div class="stat-number">2 Branches</div>
            <div class="stat-title">Hybrid GraphRAG</div>
            <div class="stat-desc">Parallel Document RAG and GraphRAG retrieval architecture.</div>
            ${renderStatWave('amber', '#f59e0b', '#fbbf24')}
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- INK ORBIT BENTO: LIVE SYSTEM ARCHITECTURES & WORKFLOW AUTOMATION -->
    <!-- (Inspired by ink-orbit-saas-template & Sanil Mishra's GitHub Mermaid Workflows) -->
    <!-- ================================================================= -->
    <section class="ib-root" id="workflows">
      <div class="ib-shell">
        <div class="ib-sec">
          <div class="ib-head">
            <span class="ib-tag">ARCHITECTURE IN MOTION</span>
            <h2 class="ib-h2">
              Deterministic <span class="gradient-text">Agentic AI</span> & Hybrid Retrieval
            </h2>
            <p style="color:var(--ib-muted); max-width:680px; margin:0 auto; font-size:1rem; line-height:1.7;">
              Interactive execution flows across my flagship architectures on GitHub (<a href="https://github.com/sanil2050" target="_blank" style="color:var(--accent-purple); text-decoration:underline;">@sanil2050</a>). Watch live data packets stream across routing hubs, dual-branch vector retrievers, and self-auditing critic loops.
            </p>
          </div>

          <div class="ib-bento">
            <!-- CARD 1: FULL-WIDTH LIVE SVG WORKFLOW DIAGRAM WITH PACKETS & TABS -->
            <div class="ib-frame ib-frame-hover ib-wide">
              <!-- Tactical CAD Brackets -->
              <span class="ib-c ib-c-tl"></span>
              <span class="ib-c ib-c-tr"></span>
              <span class="ib-c ib-c-bl"></span>
              <span class="ib-c ib-c-br"></span>

              <div class="ib-card" style="padding: clamp(20px, 3vw, 36px);">
                <!-- Workflow Preset Switcher Tabs -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:12px;">
                  <div class="ib-tab-group">
                    <button class="ib-tab-btn ib-wf-btn active" data-wf="enterprise">
                      1. Enterprise RAG & GraphRAG
                    </button>
                    <button class="ib-tab-btn ib-wf-btn" data-wf="multiagent">
                      2. Multi-Agent 4-Tier Swarm
                    </button>
                    <button class="ib-tab-btn ib-wf-btn" data-wf="hybridrag">
                      3. Pinecone Hybrid Retrieval
                    </button>
                  </div>

                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="status-dot"></span>
                    <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-green); text-transform:uppercase; letter-spacing:0.06em;">
                      Engine Online · Packets Flowing
                    </span>
                  </div>
                </div>

                <!-- LIVE SVG FLOW CANVAS -->
                <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:16px; position:relative; overflow:hidden;">
                  <svg class="ib-diagram" viewBox="0 0 720 200" role="img" aria-label="Live System Architecture Flow">
                    <defs>
                      <radialGradient id="hubGlow" cx="360" cy="100" r="140" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="var(--accent-purple)" stopOpacity="0.18" />
                        <stop offset="1" stopColor="var(--accent-purple)" stopOpacity="0" />
                      </radialGradient>
                      <filter id="neonPktGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    <!-- Background radial aura -->
                    <rect x="0" y="0" width="720" height="200" fill="url(#hubGlow)" />

                    <!-- STAGE 1: LEFT CLUSTER (Inputs & Gateways) -->
                    <!-- Top Input Node -->
                    <g transform="translate(18, 20)">
                      <rect width="134" height="38" rx="6" class="ib-node" />
                      <g id="ibNodeL1Icon">${tablerSvg('shield-lock', 7, 11, 16, '#b388ff', 2)}</g>
                      <text id="ibNodeL1Title" x="27" y="18" fill="#ffffff" font-size="9.5" font-family="var(--font-mono)" font-weight="600">JWT Auth & RBAC</text>
                      <text id="ibNodeL1Sub" x="27" y="29" fill="var(--ib-muted)" font-size="7.5" font-family="var(--font-sans)">Header Token Verified</text>
                    </g>

                    <!-- Mid Input Node -->
                    <g transform="translate(18, 76)">
                      <rect width="134" height="38" rx="6" class="ib-node" />
                      <g id="ibNodeL2Icon">${tablerSvg('database', 7, 11, 16, '#00e676', 2)}</g>
                      <text id="ibNodeL2Title" x="27" y="18" fill="#ffffff" font-size="9.5" font-family="var(--font-mono)" font-weight="600">PostgreSQL Store</text>
                      <text id="ibNodeL2Sub" x="27" y="29" fill="var(--ib-muted)" font-size="7.5" font-family="var(--font-sans)">Conversation History</text>
                    </g>

                    <!-- Bottom Input Node -->
                    <g transform="translate(18, 132)">
                      <rect width="134" height="38" rx="6" class="ib-node" />
                      <g id="ibNodeL3Icon">${tablerSvg('world-search', 7, 11, 16, '#29b6f6', 2)}</g>
                      <text id="ibNodeL3Title" x="27" y="18" fill="#ffffff" font-size="9.5" font-family="var(--font-mono)" font-weight="600">User Knowledge Query</text>
                      <text id="ibNodeL3Sub" x="27" y="29" fill="var(--ib-muted)" font-size="7.5" font-family="var(--font-sans)">Natural Language Input</text>
                    </g>

                    <!-- INGRESS WIRES: Left Nodes directly into Central Neural Hub -->
                    <path id="wfWireL1" d="M152,39 C210,39 230,84 275,84" class="ib-flow ib-flow-on" />
                    <path id="wfWireL2" d="M152,95 C205,95 230,95 275,95" class="ib-flow ib-flow-on" />
                    <path id="wfWireL3" d="M152,151 C210,151 230,106 275,106" class="ib-flow ib-flow-on" />

                    <!-- Ingress Terminal Dots (Source & Hub Ports) -->
                    <circle cx="152" cy="39" r="3.5" fill="#b388ff" />
                    <circle cx="152" cy="95" r="3.5" fill="#00e676" />
                    <circle cx="152" cy="151" r="3.5" fill="#29b6f6" />
                    <circle cx="275" cy="84" r="3" fill="#b388ff" />
                    <circle cx="275" cy="95" r="3" fill="#00e676" />
                    <circle cx="275" cy="106" r="3" fill="#29b6f6" />

                    <!-- STAGE 2: CENTRAL NEURAL HUB CHIP -->
                    <g transform="translate(275, 72)">
                      <!-- Pulsing Outer Ring -->
                      <rect x="-4" y="-4" width="168" height="54" rx="8" fill="none" stroke="var(--accent-purple)" stroke-opacity="0.5" class="ib-glow" />
                      <!-- Main Hub Box -->
                      <rect width="160" height="46" rx="6" fill="#141414" stroke="var(--accent-purple)" stroke-width="1.5" style="filter: drop-shadow(0 4px 16px rgba(179,136,255,0.25));" />
                      <!-- Core Glyph with Tabler Icon -->
                      <g id="ibHubIcon">
                        ${tablerSvg('brain', 10, 13, 20, 'var(--accent-purple)', 2)}
                      </g>
                      <!-- Text Details -->
                      <text id="ibHubTitle" x="36" y="22" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="700" letter-spacing="0.08em">NEMOTRON 3 PLANNER</text>
                      <text id="ibHubSub" x="36" y="34" fill="var(--accent-purple)" font-size="7.5" font-family="var(--font-sans)">Bounded 3-Step GraphRAG</text>
                      <!-- Small chevron -->
                      <path d="M145 20l4 4-4 4" fill="none" stroke="var(--ib-muted)" stroke-width="1.3" />
                    </g>

                    <!-- STAGE 3: EGRESS WIRES FROM HUB TO RETRIEVAL / WORKER NODES -->
                    <path id="wfWireR1" d="M435,82 C475,82 485,45 520,45" class="ib-flow ib-flow-on" />
                    <path id="wfWireR2" d="M435,90 C475,90 485,85 520,85" class="ib-flow ib-flow-on" />
                    <path id="wfWireR3" d="M435,100 C475,100 485,125 520,125" class="ib-flow ib-flow-on" />
                    <path id="wfWireR4" d="M435,108 C475,108 485,165 520,165" class="ib-flow ib-flow-on" />

                    <!-- Egress Terminal Dots (Hub & Branch Ports) -->
                    <circle cx="435" cy="82" r="3" fill="#b388ff" />
                    <circle cx="435" cy="90" r="3" fill="#00e676" />
                    <circle cx="435" cy="100" r="3" fill="#29b6f6" />
                    <circle cx="435" cy="108" r="3" fill="#ffb300" />
                    <circle cx="520" cy="45" r="3.5" fill="#b388ff" />
                    <circle cx="520" cy="85" r="3.5" fill="#00e676" />
                    <circle cx="520" cy="125" r="3.5" fill="#29b6f6" />
                    <circle cx="520" cy="165" r="3.5" fill="#ffb300" />

                    <!-- ANIMATED FLOWING DATA PACKETS (Direct Unbroken Motion) -->
                    <!-- Left to Hub -->
                    <circle r="3.2" class="ib-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.2s" repeatCount="indefinite" path="M152,39 C210,39 230,84 275,84" />
                    </circle>
                    <circle r="3.2" class="ib-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.0s" begin="0.6s" repeatCount="indefinite" path="M152,95 C205,95 230,95 275,95" />
                    </circle>
                    <circle r="3.2" class="ib-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.3s" begin="1.1s" repeatCount="indefinite" path="M152,151 C210,151 230,106 275,106" />
                    </circle>

                    <!-- Hub to Right Branches -->
                    <circle r="3.2" class="ib-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.1s" begin="0.3s" repeatCount="indefinite" path="M435,82 C475,82 485,45 520,45" />
                    </circle>
                    <circle r="3.2" class="ib-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.3s" begin="0.9s" repeatCount="indefinite" path="M435,90 C475,90 485,85 520,85" />
                    </circle>
                    <circle r="3.2" class="ib-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.2s" begin="0.5s" repeatCount="indefinite" path="M435,100 C475,100 485,125 520,125" />
                    </circle>
                    <circle r="3.2" class="ib-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.4s" begin="1.3s" repeatCount="indefinite" path="M435,108 C475,108 485,165 520,165" />
                    </circle>

                    <!-- STAGE 5: RIGHT BRANCH NODES -->
                    <!-- Branch Node 1 -->
                    <g transform="translate(520, 28)">
                      <rect width="180" height="34" rx="5" class="ib-node" />
                      <g id="ibNodeR1Icon">${tablerSvg('vector', 7, 9, 15, '#b388ff', 2)}</g>
                      <text id="ibNodeR1Title" x="26" y="16" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">pgvector Semantic</text>
                      <text id="ibNodeR1Sub" x="26" y="26" fill="var(--ib-muted)" font-size="7" font-family="var(--font-sans)">384-d dense vector cosine</text>
                    </g>

                    <!-- Branch Node 2 -->
                    <g transform="translate(520, 68)">
                      <rect width="180" height="34" rx="5" class="ib-node" />
                      <g id="ibNodeR2Icon">${tablerSvg('file-search', 7, 9, 15, '#00e676', 2)}</g>
                      <text id="ibNodeR2Title" x="26" y="16" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">tsvector Lexical</text>
                      <text id="ibNodeR2Sub" x="26" y="26" fill="var(--ib-muted)" font-size="7" font-family="var(--font-sans)">BM25 keyword search</text>
                    </g>

                    <!-- Branch Node 3 -->
                    <g transform="translate(520, 108)">
                      <rect width="180" height="34" rx="5" class="ib-node" />
                      <g id="ibNodeR3Icon">${tablerSvg('hierarchy', 7, 9, 15, '#29b6f6', 2)}</g>
                      <text id="ibNodeR3Title" x="26" y="16" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">GraphRAG Triples</text>
                      <text id="ibNodeR3Sub" x="26" y="26" fill="var(--ib-muted)" font-size="7" font-family="var(--font-sans)">Entity relations (3 hops)</text>
                    </g>

                    <!-- Branch Node 4 -->
                    <g transform="translate(520, 148)">
                      <rect width="180" height="34" rx="5" class="ib-node" />
                      <g id="ibNodeR4Icon">${tablerSvg('git-merge', 7, 9, 15, '#ffb300', 2)}</g>
                      <text id="ibNodeR4Title" x="26" y="16" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">RRF & Reranker</text>
                      <text id="ibNodeR4Sub" x="26" y="26" fill="var(--ib-muted)" font-size="7" font-family="var(--font-sans)">Cross-Encoder scoring</text>
                    </g>
                  </svg>
                </div>

                <!-- LIVE PRINTING REPORT SHEETS (Pipeline Execution Trace) -->
                <div style="margin-top:16px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.07); border-radius:10px; padding:18px 22px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                      <span id="ibReportCount" class="badge-tag accent-purple">TRACE #128</span>
                      <span id="ibSheetHeader" style="font-family:var(--font-mono); font-size:0.8rem; color:#ffffff; font-weight:600; letter-spacing:0.04em;">
                        ENTERPRISE RAG TRACE
                      </span>
                    </div>
                    <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-green);">
                      ● 100% Grounded Context
                    </span>
                  </div>

                  <div id="ibSheetStack" class="ib-sheet ib-sheet-new" style="display:flex; flex-direction:column; gap:8px;">
                    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:10px 14px; font-family:var(--font-mono); font-size:0.82rem; color:#e0e0e0; display:flex; align-items:center; gap:10px;">
                      <span style="color:var(--accent-purple); font-weight:700;">01</span>
                      <span id="ibSheet1">[Query Rewriter] Intent isolated: "RBAC Bounded GraphRAG Traversal"</span>
                    </div>
                    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:10px 14px; font-family:var(--font-mono); font-size:0.82rem; color:#e0e0e0; display:flex; align-items:center; gap:10px;">
                      <span style="color:var(--accent-green); font-weight:700;">02</span>
                      <span id="ibSheet2">[RRF Re-Ranker] Fused 5 pgvector chunks + 3 entity triples (score: 0.96)</span>
                    </div>
                    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:10px 14px; font-family:var(--font-mono); font-size:0.82rem; color:#e0e0e0; display:flex; align-items:center; gap:10px;">
                      <span style="color:var(--accent-blue); font-weight:700;">03</span>
                      <span id="ibSheet3">[Nemotron 3 Ultra] Grounding Score: 9.9/10 · Source citation verified</span>
                    </div>
                  </div>
                </div>

                <!-- DUAL EXPLANATION COLUMNS -->
                <div class="ib-wide-copy" style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
                  <div>
                    <h3 style="font-size:1.05rem; font-weight:600; color:#ffffff; margin-bottom:6px;">Deterministic Planning & Rewriting</h3>
                    <p id="ibWfDescLeft" style="font-size:0.92rem; color:var(--text-muted); line-height:1.6;">
                      User queries are authenticated with JWT and RBAC permissions, then rewritten with conversational context to extract deterministic intent.
                    </p>
                  </div>
                  <div>
                    <h3 style="font-size:1.05rem; font-weight:600; color:#ffffff; margin-bottom:6px;">Dual-Branch Retrieval & Verification</h3>
                    <p id="ibWfDescRight" style="font-size:0.92rem; color:var(--text-muted); line-height:1.6;">
                      Dispatches parallel retrieval across pgvector semantic chunks and GraphRAG knowledge triples, fused via RRF and cross-encoder reranked before Nemotron synthesis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- CARD 2: INTEGRATIONS & TOOLCHAIN HUB (Auto-cycling Sync) -->
            <div class="ib-frame ib-frame-hover">
              <span class="ib-c ib-c-tl"></span>
              <span class="ib-c ib-c-tr"></span>
              <span class="ib-c ib-c-bl"></span>
              <span class="ib-c ib-c-br"></span>

              <div class="ib-card">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span class="badge-tag accent-purple">TOOLCHAIN & ECOSYSTEM</span>
                  <span id="ibSyncStatus" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">
                    syncing · pinecone hybrid index (top-k=5)
                  </span>
                </div>

                <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:12px; position:relative; overflow:hidden;">
                  <svg class="ib-diagram" viewBox="0 0 480 200" role="group" aria-label="Tool Ecosystem Hub">
                    <!-- Subtle Central Glow Aura -->
                    <circle cx="240" cy="100" r="64" fill="rgba(179,136,255,0.06)" filter="url(#neonPktGlow)" />

                    <!-- CONNECTING FLOW WIRES: Continuous S-curve Béziers Connecting Nodes to Center Hub -->
                    <!-- Wire 0: Pinecone to Hub (Top Left) -->
                    <path id="toolWire0" d="M140,36 C165,36 158,84 182,84" class="ib-tool-wire ib-flow-on" />
                    <!-- Wire 1: pgvector to Hub (Mid Left) -->
                    <path id="toolWire1" d="M140,100 C158,100 164,100 182,100" class="ib-tool-wire" />
                    <!-- Wire 2: Tavily to Hub (Bottom Left) -->
                    <path id="toolWire2" d="M140,164 C165,164 158,116 182,116" class="ib-tool-wire" />
                    <!-- Wire 3: Hub to LangChain (Top Right) -->
                    <path id="toolWire3" d="M298,84 C322,84 315,36 340,36" class="ib-tool-wire" />
                    <!-- Wire 4: Hub to Gemini 2.5 (Mid Right) -->
                    <path id="toolWire4" d="M298,100 C316,100 322,100 340,100" class="ib-tool-wire" />
                    <!-- Wire 5: Hub to Nemotron (Bottom Right) -->
                    <path id="toolWire5" d="M298,116 C322,116 315,164 340,164" class="ib-tool-wire" />

                    <!-- Hub Terminal Connection Port Dots (Left & Right Ports) -->
                    <circle cx="182" cy="84" r="3" fill="#b388ff" />
                    <circle cx="182" cy="100" r="3" fill="#00e676" />
                    <circle cx="182" cy="116" r="3" fill="#29b6f6" />
                    <circle cx="298" cy="84" r="3" fill="#b388ff" />
                    <circle cx="298" cy="100" r="3" fill="#29b6f6" />
                    <circle cx="298" cy="116" r="3" fill="#ffb300" />

                    <!-- Tool Card Connection Port Dots -->
                    <circle cx="140" cy="36" r="3.2" fill="#b388ff" />
                    <circle cx="140" cy="100" r="3.2" fill="#00e676" />
                    <circle cx="140" cy="164" r="3.2" fill="#29b6f6" />
                    <circle cx="340" cy="36" r="3.2" fill="#b388ff" />
                    <circle cx="340" cy="100" r="3.2" fill="#29b6f6" />
                    <circle cx="340" cy="164" r="3.2" fill="#ffb300" />

                    <!-- ANIMATED FLOWING DATA PACKETS ON BEZIERS -->
                    <circle id="toolPkt0" r="3" class="ib-tool-pkt ib-pkt-on" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.2s" repeatCount="indefinite" path="M140,36 C165,36 158,84 182,84" />
                    </circle>
                    <circle id="toolPkt1" r="3" class="ib-tool-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.0s" begin="0.3s" repeatCount="indefinite" path="M140,100 C158,100 164,100 182,100" />
                    </circle>
                    <circle id="toolPkt2" r="3" class="ib-tool-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.3s" begin="0.6s" repeatCount="indefinite" path="M140,164 C165,164 158,116 182,116" />
                    </circle>
                    <circle id="toolPkt3" r="3" class="ib-tool-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.1s" begin="0.2s" repeatCount="indefinite" path="M298,84 C322,84 315,36 340,36" />
                    </circle>
                    <circle id="toolPkt4" r="3" class="ib-tool-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.2s" begin="0.5s" repeatCount="indefinite" path="M298,100 C316,100 322,100 340,100" />
                    </circle>
                    <circle id="toolPkt5" r="3" class="ib-tool-pkt" filter="url(#neonPktGlow)">
                      <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M298,116 C322,116 315,164 340,164" />
                    </circle>

                    <!-- CENTRAL NEURAL CORE PROCESSOR HUB -->
                    <g transform="translate(182, 72)">
                      <!-- Pulsing Outer Ring -->
                      <rect x="-4" y="-4" width="124" height="64" rx="10" fill="none" stroke="var(--accent-purple)" stroke-opacity="0.45" class="ib-glow" />
                      <!-- Main Hub Box -->
                      <rect width="116" height="56" rx="8" fill="#141414" stroke="var(--accent-purple)" stroke-width="1.6" style="filter: drop-shadow(0 4px 18px rgba(179,136,255,0.3));" />
                      <!-- CPU Tabler Icon -->
                      <g transform="translate(10, 18)">
                        ${tablerSvg('cpu', 0, 0, 20, 'var(--accent-purple)', 2)}
                      </g>
                      <!-- Text Details -->
                      <text x="36" y="25" fill="#ffffff" font-size="8.8" font-family="var(--font-mono)" font-weight="700" letter-spacing="0.06em">TOOL ENGINE</text>
                      <text x="36" y="38" fill="var(--accent-purple)" font-size="7.5" font-family="var(--font-sans)">Active Dispatch</text>
                      <path d="M104 26l3 3-3 3" fill="none" stroke="var(--ib-muted)" stroke-width="1.3" />
                    </g>

                    <!-- LEFT STAGE: DATA STORES & RETRIEVAL ENDPOINTS -->
                    <!-- Tool 0: Pinecone (Top Left) -->
                    <g class="ib-tool ib-tool-on" transform="translate(14, 16)" data-tool-idx="0">
                      <rect width="126" height="40" rx="8" class="ib-node" />
                      <circle cx="12" cy="20" r="3.5" fill="#b388ff" />
                      <g transform="translate(20, 12)">
                        ${tablerSvg('database-search', 0, 0, 16, '#b388ff', 2)}
                      </g>
                      <text x="42" y="18" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">Pinecone Index</text>
                      <text x="42" y="30" fill="var(--ib-muted)" font-size="7.2" font-family="var(--font-sans)">Serverless Vector DB</text>
                    </g>

                    <!-- Tool 1: PostgreSQL + pgvector (Mid Left) -->
                    <g class="ib-tool" transform="translate(14, 80)" data-tool-idx="1">
                      <rect width="126" height="40" rx="8" class="ib-node" />
                      <circle cx="12" cy="20" r="3.5" fill="#00e676" />
                      <g transform="translate(20, 12)">
                        ${tablerSvg('database', 0, 0, 16, '#00e676', 2)}
                      </g>
                      <text x="42" y="18" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">PostgreSQL Store</text>
                      <text x="42" y="30" fill="var(--ib-muted)" font-size="7.2" font-family="var(--font-sans)">pgvector HNSW Store</text>
                    </g>

                    <!-- Tool 2: Tavily Search (Bottom Left) -->
                    <g class="ib-tool" transform="translate(14, 144)" data-tool-idx="2">
                      <rect width="126" height="40" rx="8" class="ib-node" />
                      <circle cx="12" cy="20" r="3.5" fill="#29b6f6" />
                      <g transform="translate(20, 12)">
                        ${tablerSvg('world-search', 0, 0, 16, '#29b6f6', 2)}
                      </g>
                      <text x="42" y="18" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">Tavily Search</text>
                      <text x="42" y="30" fill="var(--ib-muted)" font-size="7.2" font-family="var(--font-sans)">Live Web Grounding</text>
                    </g>

                    <!-- RIGHT STAGE: REASONING & EXECUTION RUNTIMES -->
                    <!-- Tool 3: LangChain & MCP (Top Right) -->
                    <g class="ib-tool" transform="translate(340, 16)" data-tool-idx="3">
                      <rect width="126" height="40" rx="8" class="ib-node" />
                      <circle cx="12" cy="20" r="3.5" fill="#b388ff" />
                      <g transform="translate(20, 12)">
                        ${tablerSvg('robot', 0, 0, 16, '#b388ff', 2)}
                      </g>
                      <text x="42" y="18" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">LangChain &amp; MCP</text>
                      <text x="42" y="30" fill="var(--ib-muted)" font-size="7.2" font-family="var(--font-sans)">Agent State Graph</text>
                    </g>

                    <!-- Tool 4: Google Gemini 2.5 (Mid Right) -->
                    <g class="ib-tool" transform="translate(340, 80)" data-tool-idx="4">
                      <rect width="126" height="40" rx="8" class="ib-node" />
                      <circle cx="12" cy="20" r="3.5" fill="#29b6f6" />
                      <g transform="translate(20, 12)">
                        ${tablerSvg('sparkles', 0, 0, 16, '#29b6f6', 2)}
                      </g>
                      <text x="42" y="18" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">Gemini 2.5 Flash</text>
                      <text x="42" y="30" fill="var(--ib-muted)" font-size="7.2" font-family="var(--font-sans)">Fast Streaming LLM</text>
                    </g>

                    <!-- Tool 5: Nemotron 3 Ultra (Bottom Right) -->
                    <g class="ib-tool" transform="translate(340, 144)" data-tool-idx="5">
                      <rect width="126" height="40" rx="8" class="ib-node" />
                      <circle cx="12" cy="20" r="3.5" fill="#ffb300" />
                      <g transform="translate(20, 12)">
                        ${tablerSvg('brain', 0, 0, 16, '#ffb300', 2)}
                      </g>
                      <text x="42" y="18" fill="#ffffff" font-size="9" font-family="var(--font-mono)" font-weight="600">Nemotron 3 Ultra</text>
                      <text x="42" y="30" fill="var(--ib-muted)" font-size="7.2" font-family="var(--font-sans)">Factuality &amp; Critic</text>
                    </g>
                  </svg>
                </div>

                <div style="margin-top:auto;">
                  <h3 style="font-size:1.15rem; font-weight:600; color:#fff; margin-bottom:6px;">Integrated Toolchain & Storage</h3>
                  <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.6;">
                    Wired across production vector stores, relational DBs, LLM reasoning APIs, and live web retrieval endpoints for zero-latency execution.
                  </p>
                </div>
              </div>
            </div>

            <!-- CARD 3: INTERACTIVE SCRUBBABLE PERFORMANCE CHART -->
            <div class="ib-frame ib-frame-hover">
              <span class="ib-c ib-c-tl"></span>
              <span class="ib-c ib-c-tr"></span>
              <span class="ib-c ib-c-bl"></span>
              <span class="ib-c ib-c-br"></span>

              <div class="ib-card">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <span class="badge-tag accent-green">BENCHMARKS & ACCURACY</span>
                  <div class="ib-tab-group" style="margin-bottom:0; padding:2px;">
                    <button class="ib-tab-btn ib-bench-btn active" data-bench="xgboost" style="padding:4px 8px; font-size:0.72rem; display:inline-flex; align-items:center; gap:4px;">${tabler('chart-dots-3', 12, 2)} XGBoost</button>
                    <button class="ib-tab-btn ib-bench-btn" data-bench="yolo" style="padding:4px 8px; font-size:0.72rem; display:inline-flex; align-items:center; gap:4px;">${tabler('scan-eye', 12, 2)} YOLO</button>
                    <button class="ib-tab-btn ib-bench-btn" data-bench="rag" style="padding:4px 8px; font-size:0.72rem; display:inline-flex; align-items:center; gap:4px;">${tabler('vector', 12, 2)} RAG</button>
                  </div>
                </div>

                <div class="ib-chart-wrap" style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:12px; position:relative;">
                  <span id="ibChartPill" class="ib-chart-pill">Epoch #11: ROC-AUC 98.2% · 12ms</span>
                  <svg id="ibChartSvg" class="ib-chart" viewBox="0 0 320 130" role="img" aria-label="Model Accuracy Curve">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="var(--accent-purple)" stopOpacity="0.25" />
                        <stop offset="1" stopColor="var(--accent-purple)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <!-- Horizontal Grid lines -->
                    <line x1="16" y1="30" x2="304" y2="30" stroke="rgba(255,255,255,0.06)" />
                    <line x1="16" y1="65" x2="304" y2="65" stroke="rgba(255,255,255,0.06)" />
                    <line x1="16" y1="100" x2="304" y2="100" stroke="rgba(255,255,255,0.06)" />

                    <!-- Area Fill & Stroke Line -->
                    <path id="ibChartArea" d="" fill="url(#chartGradient)" />
                    <path id="ibChartLine" d="" fill="none" stroke="var(--accent-purple)" stroke-width="2.2" class="ib-line-draw" />

                    <!-- Forecast / Held-Out Test Cutoff Line -->
                    <line id="ibForecastLine" x1="220" y1="14" x2="220" y2="114" stroke="rgba(255,255,255,0.25)" stroke-dasharray="3 3" />
                    <text x="216" y="24" text-anchor="end" fill="var(--ib-faint)" font-size="7.5" font-family="var(--font-mono)">TEST HELD-OUT</text>

                    <!-- Dynamic Pointer Scrub Guide & Dot -->
                    <line id="ibScrubGuide" x1="304" y1="12" x2="304" y2="116" class="ib-scrub-guide" />
                    <circle id="ibScrubDot" cx="304" cy="18" r="4.5" class="ib-scrub-dot" />
                  </svg>
                </div>

                <div style="margin-top:auto;">
                  <h3 id="ibChartTitle" style="font-size:1.15rem; font-weight:600; color:#fff; margin-bottom:6px;">Clinical Risk Prediction</h3>
                  <p id="ibChartDesc" style="font-size:0.92rem; color:var(--text-muted); line-height:1.6;">
                    XGBoost with SHAP explainability on clinical risk benchmarks (98.19% ROC-AUC).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED PROJECTS (SIGNATURE SHOWCASE PANEL) -->
    <section class="section section-light" id="projects">
      <div class="sec-light-tint"></div>
      <div class="container">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:24px; margin-bottom:48px;">
          <div>
            <div class="section-label">PROVEN NEURAL SOLUTIONS</div>
            <h2 class="section-title">Featured Projects</h2>
            <p class="section-desc">
              Real-world systems spanning autonomous Agentic AI pipelines, deep learning vision models, and enterprise data analytics.
            </p>
          </div>
          <a href="./project/index.html" class="btn-primary" style="background:#060606; color:#fff;">
            Explore All 8 Projects ↗
          </a>
        </div>

        <div class="projects-grid">
          <!-- Project 1 -->
          <div class="card-light project-card">
            <div class="project-card-header">
              <span class="badge-tag accent-purple">Flagship RAG</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">// 2026</span>
            </div>
            <h3 class="project-card-title">Enterprise RAG Platform</h3>
            <p class="project-card-desc">
              Built a production-oriented RAG platform for secure Q&A over internal company knowledge with JWT authentication and RBAC-based permission filtering. Designed query rewriting using conversation history, dispatching an Agent Planner across Document RAG (hybrid dense + sparse retrieval) and GraphRAG branches (bounded to 3 steps). Fused with Reciprocal Rank Fusion (RRF) and cross-encoder reranking, enforcing evidence-grounded answers with Nemotron.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">FastAPI</span>
              <span class="badge-tag">LangChain</span>
              <span class="badge-tag">PostgreSQL</span>
              <span class="badge-tag">pgvector</span>
              <span class="badge-tag">Nemotron</span>
            </div>
            <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:center;">
              <a href="https://github.com/sanil2050/enterprise-rag" target="_blank" style="font-weight:600; color:#5b21b6; font-size:0.9rem; display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 16, 2)} View on GitHub ${tabler('arrow-up-right', 14, 2)}
              </a>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="card-light project-card">
            <div class="project-card-header">
              <span class="badge-tag accent-green">Agentic RAG</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">// 2026</span>
            </div>
            <h3 class="project-card-title">Hybrid RAG Pipeline</h3>
            <p class="project-card-desc">
              End-to-end PDF ingestion pipeline with pypdf, text cleaning, and recursive chunking (~500 chars, 50 overlap). Generated 384-dimensional dense vector embeddings with HuggingFace all-MiniLM-L6-v2 and fitted a BM25 sparse encoder into a Pinecone hybrid index. Features batched upserts and a PineconeHybridSearchRetriever (top-k=5) streaming grounded answers via Google Gemini 2.5 Flash with strict page-level source citations.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">LangChain</span>
              <span class="badge-tag">Pinecone</span>
              <span class="badge-tag">HuggingFace</span>
              <span class="badge-tag">Gemini 2.5</span>
              <span class="badge-tag">BM25</span>
            </div>
            <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:center;">
              <a href="https://github.com/sanil2050/hybrid-rag-pipeline" target="_blank" style="font-weight:600; color:#5b21b6; font-size:0.9rem; display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 16, 2)} View on GitHub ${tabler('arrow-up-right', 14, 2)}
              </a>
            </div>
          </div>

          <!-- Project 3 -->
          <div class="card-light project-card">
            <div class="project-card-header">
              <span class="badge-tag accent-blue">Multi-Agent</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">// 2026</span>
            </div>
            <h3 class="project-card-title">Multi-Agent AI Research System</h3>
            <p class="project-card-desc">
              Autonomous 4-agent collaborative pipeline: Research Agent queries Tavily Search API for ranked web summaries, Reader Agent isolates clean content with BeautifulSoup, Writer Agent synthesizes structured reports with citations using Gemini 2.5 Flash, and Critic Agent audits reports with numerical scores (1–10) and actionable feedback. Sequenced with Streamlit web UI (live execution logs) and CLI mode.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">LangChain</span>
              <span class="badge-tag">Gemini</span>
              <span class="badge-tag">Tavily API</span>
              <span class="badge-tag">Streamlit</span>
            </div>
            <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:center;">
              <a href="https://github.com/sanil2050/Multi-Agent-Ai-Research-System" target="_blank" style="font-weight:600; color:#5b21b6; font-size:0.9rem; display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 16, 2)} View on GitHub ${tabler('arrow-up-right', 14, 2)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- APPLIED EXPERIENCE TIMELINE (NEW & RICH) -->
    <section class="section" id="experience">
      <div class="sec-grid-dark"></div>
      <div class="container">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; margin-bottom:48px;">
          <div>
            <div class="section-label">TRACK RECORD</div>
            <h2 class="section-title">Experience & Applied Work</h2>
            <p class="section-desc">Hands-on technical leadership developing intelligent agent systems, multi-modal vision models, and enterprise data analytics.</p>
          </div>
          <span class="badge-tag accent-purple">2024 - Present</span>
        </div>

        <div class="card-dark" style="padding:44px; border-left:4px solid var(--accent-purple);">
          <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:16px; margin-bottom:12px;">
            <h3 style="font-size:1.6rem; font-weight:700; display:flex; align-items:center; gap:12px;">
              <span style="color:var(--accent-purple); display:inline-flex;">${tabler('briefcase', 24, 2)}</span>
              AI Engineer & Data Analyst
            </h3>
            <span style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent-purple); background:rgba(179,136,255,0.1); padding:4px 12px; border-radius:6px;">
              Applied Research & Independent Engineering
            </span>
          </div>

          <ul style="color:var(--text-muted); font-size:0.96rem; line-height:1.8; margin-bottom:32px; display:flex; flex-direction:column; gap:14px; list-style:none;">
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-purple); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Built an enterprise-grade, production-oriented RAG platform enforcing JWT authentication & RBAC filtering, query rewriting, an Agent Planner routing across Document RAG & GraphRAG (bounded to 3 steps), RRF fusion, cross-encoder reranking, and grounded answers with Nemotron via FastAPI and PostgreSQL + pgvector.</span>
            </li>
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-green); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Engineered an end-to-end Hybrid RAG pipeline combining dense vector embeddings (HuggingFace all-MiniLM-L6-v2) and BM25 sparse retrieval into a Pinecone hybrid index, ensuring strict page-level source traceability with Google Gemini 2.5 Flash.</span>
            </li>
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-blue); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Orchestrated autonomous multi-agent systems (LangChain, Tavily API, BeautifulSoup, Gemini 2.5 Flash) featuring Research, Reader, Writer, and self-auditing Critic agents with Streamlit web UI (live logs) and CLI execution modes.</span>
            </li>
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-amber); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Conducted deep learning computer vision research on mammography classification benchmarking YOLOv11 & YOLOv26 on CBIS-DDSM & VinDr-Mammo; trained custom YOLOv8 object detection to 92% accuracy with ONNX export.</span>
            </li>
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-pink); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Developed end-to-end data analysis workflows in Python/Pandas, Scikit-learn, XGBoost (with SHAP explainability), and created business intelligence reporting using Tableau, Power BI, and Microsoft Excel.</span>
            </li>
          </ul>

          <div style="display:flex; gap:12px; flex-wrap:wrap; padding-top:20px; border-top:1px solid rgba(255,255,255,0.06);">
            <a href="https://github.com/sanil2050/enterprise-rag" target="_blank" class="badge-tag" style="padding:8px 14px; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('link', 14, 2)} Enterprise RAG Platform ${tabler('arrow-up-right', 12, 2)}
            </a>
            <a href="https://github.com/sanil2050/hybrid-rag-pipeline" target="_blank" class="badge-tag" style="padding:8px 14px; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('link', 14, 2)} Hybrid RAG Pipeline ${tabler('arrow-up-right', 12, 2)}
            </a>
            <a href="https://github.com/sanil2050/Multi-Agent-Ai-Research-System" target="_blank" class="badge-tag" style="padding:8px 14px; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('link', 14, 2)} Multi-Agent AI System ${tabler('arrow-up-right', 12, 2)}
            </a>
            <a href="https://github.com/sanil2050" target="_blank" class="badge-tag" style="padding:8px 14px; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('brand-github', 14, 2)} GitHub Repositories ${tabler('arrow-up-right', 12, 2)}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CORE CAPABILITIES (SERVICES / ARCHITECTURE) -->
    <section class="section" id="services" style="background:#090909;">
      <div class="container">
        <div style="text-align:center; max-width:720px; margin:0 auto 56px;">
          <div class="section-label">WHAT I DELIVER</div>
          <h2 class="section-title">Specialized Engineering Capabilities</h2>
          <p class="section-desc" style="margin:0 auto;">
            Bridging autonomous Agentic AI systems, enterprise vector retrieval, computer vision, and scalable production APIs.
          </p>
        </div>

        <div class="services-grid-luminous">
          <!-- CARD 1: Agentic AI & Multi-Agent Systems (Purple) -->
          <div class="service-card-luminous service-card-purple">
            <div class="srv-header-row">
              <div class="srv-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 4l-8 4l8 4l8 -4l-8 -4" />
                  <path d="M4 12l8 4l8 -4" />
                  <path d="M4 16l8 4l8 -4" />
                </svg>
              </div>
              <div class="srv-divider"></div>
              <h3 class="srv-title">Agentic AI &<br>Multi-Agent Systems</h3>
            </div>
            <p class="srv-desc">
              Designing autonomous multi-agent orchestration pipelines using LangChain, Model Context Protocol (MCP), and structured critic-auditing loops for rapid MVP turnaround.
            </p>
          </div>

          <!-- CARD 2: Enterprise & Hybrid RAG (Cyan) -->
          <div class="service-card-luminous service-card-cyan">
            <div class="srv-header-row">
              <div class="srv-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <ellipse cx="12" cy="6" rx="8" ry="3" />
                  <path d="M4 6v6a8 3 0 0 0 16 0v-6" />
                  <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
                </svg>
              </div>
              <div class="srv-divider"></div>
              <h3 class="srv-title">Enterprise &<br>Hybrid RAG</h3>
            </div>
            <p class="srv-desc">
              Building production-grade retrieval platforms blending dense semantic vectors, BM25 sparse search, GraphRAG, and RBAC security on Pinecone and PostgreSQL pgvector.
            </p>
          </div>

          <!-- CARD 3: Data Analysis & BI Dashboards (Magenta / Violet) -->
          <div class="service-card-luminous service-card-magenta">
            <div class="srv-header-row">
              <div class="srv-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 3v18h18" />
                  <rect x="7" y="10" width="3" height="8" rx="1" />
                  <rect x="13" y="6" width="3" height="12" rx="1" />
                  <rect x="19" y="13" width="3" height="5" rx="1" />
                </svg>
              </div>
              <div class="srv-divider"></div>
              <h3 class="srv-title">Data Analysis &<br>BI Dashboards</h3>
            </div>
            <p class="srv-desc">
              Transforming complex datasets into actionable business intelligence using Pandas, NumPy, Microsoft Excel, Tableau, and Power BI with exploratory data analysis.
            </p>
          </div>

          <!-- CARD 4: Computer Vision & YOLO Fine-Tuning (Cyan) -->
          <div class="service-card-luminous service-card-cyan">
            <div class="srv-header-row">
              <div class="srv-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                  <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                  <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div class="srv-divider"></div>
              <h3 class="srv-title">Computer Vision &<br>YOLO Fine-Tuning</h3>
            </div>
            <p class="srv-desc">
              Developing high-accuracy detection and medical classification systems using PyTorch, Ultralytics YOLOv8/v11/v26, and ONNX export for low-latency inference.
            </p>
          </div>

          <!-- CARD 5: Scalable Backend & APIs (Purple) -->
          <div class="service-card-luminous service-card-purple">
            <div class="srv-header-row">
              <div class="srv-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="14" y1="4" x2="10" y2="20" />
                </svg>
              </div>
              <div class="srv-divider"></div>
              <h3 class="srv-title">Scalable Backend &<br>APIs</h3>
            </div>
            <p class="srv-desc">
              Architecting resilient server-side architectures and clean RESTful APIs with FastAPI and Django, complete with Swagger documentation and JWT security.
            </p>
          </div>

          <!-- CARD 6: Explainable AI & Diagnostics (Cyan) -->
          <div class="service-card-luminous service-card-cyan">
            <div class="srv-header-row">
              <div class="srv-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
              </div>
              <div class="srv-divider"></div>
              <h3 class="srv-title">Explainable AI &<br>Diagnostics</h3>
            </div>
            <p class="srv-desc">
              Surfacing interpretable model predictions using SHAP (Shapley Additive exPlanations), class-balance optimization (SMOTE), and rigorous metric benchmarks.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQS (ACCORDION SECTION) -->
    <section class="section section-light" id="faq">
      <div class="sec-light-tint"></div>
      <div class="container">
        <div style="max-width:700px; margin-bottom:48px;">
          <div class="section-label">COMMON INQUIRIES</div>
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="section-desc">Answers to common questions regarding my development workflow, tech stack, and engagement availability.</p>
        </div>

        <div style="max-width:860px;">
          <div class="faq-item">
            <div class="faq-header">
              <h4 class="faq-question">What is your turnaround time for a working AI MVP or prototype?</h4>
              <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer">
              By leveraging advanced AI developer tooling alongside pre-tested modular architectures for LangChain, FastAPI, and pgvector, I frequently take client concepts from zero to a functioning MVP within 3 to 10 days.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header">
              <h4 class="faq-question">How do you ensure zero hallucination in RAG deployments?</h4>
              <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer">
              I implement multi-stage hybrid retrieval combining dense semantic embeddings (MiniLM) and BM25 keyword matching with cross-encoder reranking. Furthermore, queries are bounded by conversation-aware planning, GraphRAG relations, and strict prompt grounding backed by self-auditing critic models or Nemotron before generating any user-facing answer.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header">
              <h4 class="faq-question">Are you available for full-time engineering roles or contract work?</h4>
              <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer">
              Yes, I am actively available for full-time AI Engineer, Data Analyst, and ML positions, as well as high-impact freelance/contract engagements. Reach out directly via email or the contact form below.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header">
              <h4 class="faq-question">Can you work with proprietary on-premise data and custom fine-tuning?</h4>
              <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer">
              Absolutely. I build secure, self-contained local pipelines using Ollama, private PostgreSQL with pgvector, and custom PyTorch fine-tuning workflows where data never leaves internal infrastructure.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT SECTION -->
    <section class="section" id="contact">
      <div class="sec-grid-dark"></div>
      <div class="container">
        <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:64px; align-items:flex-start;">
          <div>
            <div class="section-label">GET IN TOUCH</div>
            <h2 class="section-title">Let's Build Something Impactful</h2>
            <p class="section-desc" style="margin-bottom:36px;">
              Looking for an AI Engineer, Data Analyst, or autonomous pipeline collaborator? Drop a note or reach out directly.
            </p>

            <div style="display:flex; flex-direction:column; gap:20px;">
              <a href="mailto:sanilmishra010@gmail.com" class="card-dark" style="display:flex; align-items:center; gap:16px; padding:20px;">
                <div style="color:var(--accent-purple); display:inline-flex;">
                  ${tabler('mail', 24, 2)}
                </div>
                <div>
                  <div style="font-size:0.8rem; color:var(--text-subtle);">Email Me Directly</div>
                  <div style="font-weight:600; color:#fff;">sanilmishra010@gmail.com</div>
                </div>
              </a>

              <a href="tel:+918102240182" class="card-dark" style="display:flex; align-items:center; gap:16px; padding:20px;">
                <div style="color:var(--accent-green); display:inline-flex;">
                  ${tabler('phone', 24, 2)}
                </div>
                <div>
                  <div style="font-size:0.8rem; color:var(--text-subtle);">Direct Phone / WhatsApp</div>
                  <div style="font-weight:600; color:#fff;">+91 8102240182</div>
                </div>
              </a>

              <div class="card-dark" style="display:flex; align-items:center; gap:16px; padding:20px;">
                <div style="color:var(--accent-blue); display:inline-flex;">
                  ${tabler('map-pin', 24, 2)}
                </div>
                <div>
                  <div style="font-size:0.8rem; color:var(--text-subtle);">Location</div>
                  <div style="font-weight:600; color:#fff;">Noida, Uttar Pradesh, India</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-dark" style="padding:40px;">
            <h3 style="font-size:1.4rem; font-weight:600; margin-bottom:8px;">Send a Direct Message</h3>
            <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:28px;">
              Fill in your details below to launch your default mail client with prefilled context.
            </p>

            <form id="contactForm">
              <div class="form-group">
                <label class="form-label" for="name">Your Name</label>
                <input class="form-input" type="text" id="name" name="name" placeholder="John Doe" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="email">Your Email Address</label>
                <input class="form-input" type="email" id="email" name="email" placeholder="john@company.com" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="message">Project Scope or Message</label>
                <textarea class="form-textarea" id="message" name="message" placeholder="Tell me about your AI project, timeline, or open role..." required></textarea>
              </div>

              <button type="submit" class="btn-primary" style="width:100%; justify-content:center; padding:15px; display:inline-flex; align-items:center; gap:8px;">
                Send Inquiry via Email ${tabler('arrow-up-right', 18, 2.2)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- EXPANDABLE CONTACT SCREEN -->
  <div class="contact-overlay" id="contactOverlay" role="dialog" aria-modal="true" aria-labelledby="coTitle" aria-hidden="true">
    <button type="button" class="co-close" id="contactOverlayClose" aria-label="Close contact">
      ${tabler('x', 20, 2.2)}
    </button>
    <div class="co-inner">
      <div class="co-left">
        <h2 class="co-title" id="coTitle">Let's work together</h2>
        <div class="co-points">
          <div class="co-point">
            <div class="co-icon">${tabler('mail', 22, 2)}</div>
            <div>
              <div class="co-point-label">Email</div>
              <a href="mailto:sanilmishra010@gmail.com">sanilmishra010@gmail.com</a>
            </div>
          </div>
          <div class="co-point">
            <div class="co-icon">${tabler('phone', 22, 2)}</div>
            <div>
              <div class="co-point-label">Phone / WhatsApp</div>
              <a href="tel:+918102240182">+91 8102240182</a>
            </div>
          </div>
          <div class="co-point">
            <div class="co-icon">${tabler('map-pin', 22, 2)}</div>
            <div>
              <div class="co-point-label">Location</div>
              <span>Noida, Uttar Pradesh, India</span>
            </div>
          </div>
        </div>
        <p class="co-note">Looking for an AI Engineer, Data Analyst, or autonomous pipeline collaborator? Tell me about your project and I'll get back to you.</p>
      </div>

      <div class="co-right">
        <form id="contactFormOverlay" class="co-form">
          <div class="co-field">
            <label for="coName">FULL NAME *</label>
            <input type="text" id="coName" name="name" required autocomplete="name">
          </div>
          <div class="co-field">
            <label for="coEmail">EMAIL *</label>
            <input type="email" id="coEmail" name="email" required autocomplete="email">
          </div>
          <div class="co-row">
            <div class="co-field co-grow">
              <label for="coUse">PROJECT TYPE</label>
              <input type="text" id="coUse" name="usecase" placeholder="e.g., Enterprise RAG, Multi-agent automation">
            </div>
            <div class="co-field co-select">
              <label for="coTimeline">TIMELINE</label>
              <select id="coTimeline" name="timeline">
                <option value="">Select</option>
                <option>ASAP</option>
                <option>1-4 weeks</option>
                <option>1-3 months</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>
          <div class="co-field">
            <label for="coMessage">PROJECT SCOPE OR MESSAGE *</label>
            <textarea id="coMessage" name="message" rows="4" required placeholder="Tell me about your AI project, timeline, or open role..."></textarea>
          </div>
          <button type="submit" class="co-submit">Send inquiry</button>
        </form>
      </div>
    </div>
  </div>

  ${renderFooter('.')}
  ${renderClientScript()}
</body>
</html>
`;
}

// -------------------------------------------------------------
// 2. ABOUT PAGE (about/index.html)
// -------------------------------------------------------------
function buildAboutPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About Sanil Mishra · AI Engineer & Data Analyst</title>
  <meta name="description" content="Background, academic credentials, certifications, and technical journey of Sanil Mishra.">
  <link rel="icon" type="image/png" href="../assets/logo.png">
  ${FONTS_HEAD}
  <style>
    ${BASE_CSS}
    .page-header {
      padding: 160px 0 60px;
      position: relative;
    }
  </style>
</head>
<body>
  ${renderHeader('/about', '..')}

  <main>
    <div class="page-header">
      <div class="sec-grid-dark"></div>
      <div class="container">
        <div class="section-label">CURRICULUM VITAE & STORY</div>
        <h1 class="section-title" style="max-width:850px;">Architecting Systems That Think, Retrieve & Act</h1>
        <p class="section-desc">
          A deep dive into my professional track record, educational background, verified industry certifications, soft skills, and engineering philosophy.
        </p>
      </div>
    </div>

    <!-- BIOGRAPHY & MISSION -->
    <section class="section" style="padding-top:20px;">
      <div class="container">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center;">
          <div>
            <h2 style="font-size:2rem; margin-bottom:20px; font-weight:700;">Mission & Philosophy</h2>
            <p style="color:var(--text-muted); font-size:1.02rem; line-height:1.8; margin-bottom:18px;">
              I believe the real potential of artificial intelligence is unlocked not by raw parameter counts alone, but through deterministic orchestration, groundable retrieval, and autonomous multi-agent division of labor.
            </p>
            <p style="color:var(--text-muted); font-size:1.02rem; line-height:1.8; margin-bottom:24px;">
              Whether engineering an enterprise RAG pipeline that eliminates hallucination via strict page-level source tracing, or benchmarking YOLO detection heads for medical classification, I emphasize empirical verification, low latency, and rapid delivery from prototype to production.
            </p>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <div class="status-pill">● Available for Full-Time Roles</div>
              <div class="status-pill" style="border-color:rgba(179,136,255,0.3); color:var(--accent-purple);">● Freelance AI Architect</div>
            </div>
          </div>
          <div class="card-dark" style="padding:40px;">
            <h3 style="font-size:1.3rem; margin-bottom:20px; font-weight:600; display:flex; align-items:center; gap:10px;">
              <span style="color:var(--accent-purple); display:inline-flex;">${tabler('shield-check', 20, 2)}</span>
              Core Competencies
            </h3>
            <ul style="display:flex; flex-direction:column; gap:14px; color:var(--text-muted); font-size:0.95rem; list-style:none;">
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 16, 2.5)}</span> Agentic AI & Model Context Protocol (MCP)</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 16, 2.5)}</span> Enterprise Hybrid Vector Retrieval (Dense + BM25)</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 16, 2.5)}</span> Computer Vision Benchmarking (YOLOv8/v11/v26)</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 16, 2.5)}</span> High-throughput FastAPI / PostgreSQL pgvector backends</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 16, 2.5)}</span> Explainable AI (SHAP) & Tabular Classification (XGBoost)</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 16, 2.5)}</span> Business Intelligence & Dashboarding (Tableau & Power BI)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FULL APPLIED EXPERIENCE -->
    <section class="section" style="background:#090909;">
      <div class="container">
        <div style="margin-bottom:40px;">
          <div class="section-label">EXPERIENCE & APPLIED WORK</div>
          <h2 class="section-title">Hands-On Technical Leadership</h2>
        </div>

        <div class="card-dark" style="padding:44px; border-left:4px solid var(--accent-purple);">
          <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:16px; margin-bottom:12px;">
            <h3 style="font-size:1.6rem; font-weight:700; display:flex; align-items:center; gap:12px;">
              <span style="color:var(--accent-purple); display:inline-flex;">${tabler('briefcase', 24, 2)}</span>
              AI Engineer & Data Analyst
            </h3>
            <span style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent-purple); background:rgba(179,136,255,0.1); padding:4px 12px; border-radius:6px;">
              Applied Research & Independent Engineering · 2024 - Present
            </span>
          </div>

          <ul style="color:var(--text-muted); font-size:0.96rem; line-height:1.8; margin-bottom:32px; display:flex; flex-direction:column; gap:14px; list-style:none;">
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-purple); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Built an enterprise-grade, production-oriented RAG platform enforcing JWT authentication & RBAC filtering, query rewriting, an Agent Planner routing across Document RAG & GraphRAG (bounded to 3 steps), RRF fusion, cross-encoder reranking, and grounded answers with Nemotron via FastAPI and PostgreSQL + pgvector.</span>
            </li>
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-green); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Engineered an end-to-end Hybrid RAG pipeline combining dense vector embeddings (HuggingFace all-MiniLM-L6-v2) and BM25 sparse retrieval into a Pinecone hybrid index, ensuring strict page-level source traceability with Google Gemini 2.5 Flash.</span>
            </li>
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-blue); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Orchestrated autonomous multi-agent systems (LangChain, Tavily API, BeautifulSoup, Gemini 2.5 Flash) featuring Research, Reader, Writer, and self-auditing Critic agents with Streamlit web UI (live logs) and CLI execution modes.</span>
            </li>
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-amber); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Conducted deep learning computer vision research on mammography classification benchmarking YOLOv11 & YOLOv26 on CBIS-DDSM & VinDr-Mammo; trained custom YOLOv8 object detection to 92% accuracy with ONNX export.</span>
            </li>
            <li style="display:flex; gap:12px; align-items:flex-start;">
              <span style="color:var(--accent-pink); flex-shrink:0; margin-top:4px;">${tabler('check', 16, 2.5)}</span>
              <span>Developed end-to-end data analysis workflows in Python/Pandas, Scikit-learn, XGBoost (with SHAP explainability), and created business intelligence reporting using Tableau, Power BI, and Microsoft Excel.</span>
            </li>
          </ul>

          <div style="display:flex; gap:12px; flex-wrap:wrap; padding-top:20px; border-top:1px solid rgba(255,255,255,0.06);">
            <a href="https://github.com/sanil2050/enterprise-rag" target="_blank" class="badge-tag" style="padding:8px 14px; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('link', 14, 2)} Enterprise RAG Platform ${tabler('arrow-up-right', 12, 2)}
            </a>
            <a href="https://github.com/sanil2050/hybrid-rag-pipeline" target="_blank" class="badge-tag" style="padding:8px 14px; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('link', 14, 2)} Hybrid RAG Pipeline ${tabler('arrow-up-right', 12, 2)}
            </a>
            <a href="https://github.com/sanil2050/Multi-Agent-Ai-Research-System" target="_blank" class="badge-tag" style="padding:8px 14px; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('link', 14, 2)} Multi-Agent AI System ${tabler('arrow-up-right', 12, 2)}
            </a>
            <a href="https://github.com/sanil2050" target="_blank" class="badge-tag" style="padding:8px 14px; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('brand-github', 14, 2)} GitHub Repositories ${tabler('arrow-up-right', 12, 2)}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- EDUCATION & CERTIFICATIONS -->
    <section class="section section-light">
      <div class="sec-light-tint"></div>
      <div class="container">
        <div style="margin-bottom:48px;">
          <div class="section-label">ACADEMIC FOUNDATION</div>
          <h2 class="section-title">Education & Credentials</h2>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px;">
          <!-- Education Column -->
          <div>
            <h3 style="font-size:1.4rem; margin-bottom:24px; font-weight:700; display:flex; align-items:center; gap:10px;">
              <span style="color:#5b21b6; display:inline-flex;">${tabler('school', 22, 2)}</span>
              Degrees
            </h3>
            
            <div class="card-light" style="margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span class="badge-tag accent-purple">Current / Advanced</span>
                <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">MCA</span>
              </div>
              <h4 style="font-size:1.2rem; font-weight:600; margin-bottom:6px;">Master of Computer Applications (MCA)</h4>
              <p style="color:var(--text-dark-muted); font-size:0.95rem;">Galgotias University</p>
            </div>

            <div class="card-light" style="margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span class="badge-tag accent-green">Graduated</span>
                <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">BCA</span>
              </div>
              <h4 style="font-size:1.2rem; font-weight:600; margin-bottom:6px;">Bachelor of Computer Applications (BCA)</h4>
              <p style="color:var(--text-dark-muted); font-size:0.95rem;">Chandigarh University</p>
            </div>

            <div class="card-light">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span class="badge-tag">Completed</span>
                <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">10+2 & 10th</span>
              </div>
              <h4 style="font-size:1.1rem; font-weight:600; margin-bottom:4px;">Senior Secondary (10+2)</h4>
              <p style="color:var(--text-dark-muted); font-size:0.9rem; margin-bottom:12px;">T.P.S College</p>
              <h4 style="font-size:1.1rem; font-weight:600; margin-bottom:4px;">Matriculation (10th)</h4>
              <p style="color:var(--text-dark-muted); font-size:0.9rem;">Dr. D. Ram DAV Public School</p>
            </div>

            <!-- Languages -->
            <div style="margin-top:24px; padding:16px; background:#f0f0f2; border-radius:10px; display:flex; gap:16px; align-items:center;">
              <span style="font-weight:600; font-size:0.9rem;">Languages:</span>
              <span class="badge-tag accent-purple">English (Fluent)</span>
              <span class="badge-tag accent-green">Hindi (Native)</span>
            </div>
          </div>

          <!-- Certifications Column -->
          <div>
            <h3 style="font-size:1.4rem; margin-bottom:24px; font-weight:700; display:flex; align-items:center; gap:10px;">
              <span style="color:#059669; display:inline-flex;">${tabler('certificate', 22, 2)}</span>
              Verified Certifications
            </h3>

            <div class="card-light" style="margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span class="badge-tag accent-purple">Agentic AI</span>
                <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">Oracle</span>
              </div>
              <h4 style="font-size:1.15rem; font-weight:600; margin-bottom:4px;">Oracle Agentic AI Foundations</h4>
              <p style="color:var(--text-dark-muted); font-size:0.9rem;">MITS: Faculty Development Program on Agentic AI</p>
            </div>

            <div class="card-light" style="margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span class="badge-tag accent-blue">Cloud AI</span>
                <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">Oracle Cloud</span>
              </div>
              <h4 style="font-size:1.15rem; font-weight:600; margin-bottom:4px;">Oracle Cloud Infrastructure AI Foundations</h4>
              <p style="color:var(--text-dark-muted); font-size:0.9rem;">Oracle Cloud Infrastructure Certification</p>
            </div>

            <div class="card-light" style="margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span class="badge-tag accent-green">Productivity & BI</span>
                <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">Microsoft</span>
              </div>
              <h4 style="font-size:1.15rem; font-weight:600; margin-bottom:4px;">Microsoft Excel 2026: Pro Mastery</h4>
              <p style="color:var(--text-dark-muted); font-size:0.9rem;">Data Analysis, Formulas, Pivots & Reporting</p>
            </div>

            <div class="card-light" style="margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span class="badge-tag">Data Science</span>
                <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dark-muted);">Data Mastery</span>
              </div>
              <h4 style="font-size:1.15rem; font-weight:600; margin-bottom:4px;">Data Science Mastery 2025: Excel, Python & Tableau</h4>
              <p style="color:var(--text-dark-muted); font-size:0.9rem;">Comprehensive data exploration, pipelines & BI</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROFESSIONAL ATTRIBUTES & SOFT SKILLS -->
    <section class="section">
      <div class="container">
        <div style="margin-bottom:40px;">
          <div class="section-label">LEADERSHIP & VALUES</div>
          <h2 class="section-title">Professional Attributes & Soft Skills</h2>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:20px;">
          <div class="card-dark">
            <div style="color:var(--accent-purple); margin-bottom:8px;">${tabler('award', 24, 2)}</div>
            <h4 style="font-size:1.15rem; color:var(--accent-purple); margin-bottom:8px;">Leadership</h4>
            <p style="color:var(--text-muted); font-size:0.9rem;">Guiding technical roadmaps, prioritizing sprint backlogs, and cross-functional direction.</p>
          </div>
          <div class="card-dark">
            <div style="color:var(--accent-green); margin-bottom:8px;">${tabler('users', 24, 2)}</div>
            <h4 style="font-size:1.15rem; color:var(--accent-green); margin-bottom:8px;">Teamwork</h4>
            <p style="color:var(--text-muted); font-size:0.9rem;">Seamless collaboration with researchers, product managers, and backend engineers.</p>
          </div>
          <div class="card-dark">
            <div style="color:var(--accent-blue); margin-bottom:8px;">${tabler('world-search', 24, 2)}</div>
            <h4 style="font-size:1.15rem; color:var(--accent-blue); margin-bottom:8px;">Communication</h4>
            <p style="color:var(--text-muted); font-size:0.9rem;">Articulating complex vector architectures, model trade-offs, and metrics clearly.</p>
          </div>
          <div class="card-dark">
            <div style="color:var(--accent-amber); margin-bottom:8px;">${tabler('target', 24, 2)}</div>
            <h4 style="font-size:1.15rem; color:var(--accent-amber); margin-bottom:8px;">Planning & Strategy</h4>
            <p style="color:var(--text-muted); font-size:0.9rem;">Structured milestones, backlog prioritization, and iterative execution.</p>
          </div>
          <div class="card-dark">
            <div style="color:var(--accent-pink); margin-bottom:8px;">${tabler('clock', 24, 2)}</div>
            <h4 style="font-size:1.15rem; color:var(--accent-pink); margin-bottom:8px;">Time Management</h4>
            <p style="color:var(--text-muted); font-size:0.9rem;">Agile sprint cadence, rapid MVP turnaround in days, and meeting deadlines reliably.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderFooter('..')}
  ${renderClientScript()}
</body>
</html>
`;
}

// -------------------------------------------------------------
// 3. PROJECTS PAGE (project/index.html)
// -------------------------------------------------------------
function buildProjectPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Case Studies & Projects · Sanil Mishra</title>
  <meta name="description" content="Detailed engineering case studies across Agentic AI, Hybrid RAG, Computer Vision, and Predictive Analytics.">
  <link rel="icon" type="image/png" href="../assets/logo.png">
  ${FONTS_HEAD}
  <style>
    ${BASE_CSS}
    .page-header {
      padding: 160px 0 60px;
      position: relative;
    }
  </style>
</head>
<body>
  ${renderHeader('/project', '..')}

  <main>
    <div class="page-header">
      <div class="sec-grid-dark"></div>
      <div class="container">
        <div class="section-label">CASE STUDIES & CODE</div>
        <h1 class="section-title">Featured Projects & Systems</h1>
        <p class="section-desc">
          Interactive catalog of end-to-end architectures: multi-agent autonomous loops, hybrid vector retrieval, medical computer vision, and machine learning pipelines.
        </p>

        <!-- Category Filters -->
        <div class="filter-tabs" style="margin-top:36px;">
          <button class="filter-btn active" data-filter="All" style="display:inline-flex; align-items:center; gap:6px;">
            ${tabler('stack-2', 15, 2)} All Projects
          </button>
          <button class="filter-btn" data-filter="Agentic AI & RAG" style="display:inline-flex; align-items:center; gap:6px;">
            ${tabler('robot', 15, 2)} Agentic AI & RAG
          </button>
          <button class="filter-btn" data-filter="Computer Vision & ML" style="display:inline-flex; align-items:center; gap:6px;">
            ${tabler('scan-eye', 15, 2)} Computer Vision & ML
          </button>
          <button class="filter-btn" data-filter="Data Analytics" style="display:inline-flex; align-items:center; gap:6px;">
            ${tabler('chart-bar', 15, 2)} Data Analytics
          </button>
        </div>

        <!-- Architecture Workflow Callout Card -->
        <div class="ib-frame ib-frame-hover" style="margin-top:24px; margin-bottom:12px;">
          <span class="ib-c ib-c-tl"></span>
          <span class="ib-c ib-c-tr"></span>
          <span class="ib-c ib-c-bl"></span>
          <span class="ib-c ib-c-br"></span>
          <div class="card-dark" style="padding:22px 28px; background:linear-gradient(180deg, #161616, #0e0e0e); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
            <div style="display:flex; align-items:center; gap:14px;">
              <div class="status-dot"></div>
              <div>
                <h4 style="font-size:1.05rem; font-weight:600; color:#fff;">System Architecture Flowcharts & Production Schemas</h4>
                <p style="font-size:0.86rem; color:var(--text-muted); margin-top:2px;">
                  Every system is backed by verified GitHub Mermaid architecture diagrams (JWT/RBAC, RRF rank fusion, cross-encoders, and 4-agent state loops).
                </p>
              </div>
            </div>
            <a href="../index.html#workflows" class="btn-secondary btn-sm" style="border-color:var(--accent-purple); color:#ffffff; display:inline-flex; align-items:center; gap:8px;">
              ${tabler('cpu', 15, 2)} Launch Live SVG Workflow Simulator ${tabler('arrow-up-right', 13, 2)}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- PROJECTS GALLERY -->
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="projects-grid" style="grid-template-columns:repeat(auto-fit, minmax(380px, 1fr));">
          
          <!-- Project 1 -->
          <div class="card-dark project-card" data-category="Agentic AI & RAG">
            <div class="project-card-header">
              <span class="badge-tag accent-purple">Flagship RAG</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-subtle);">2026</span>
            </div>
            <h3 class="project-card-title">Enterprise RAG Platform</h3>
            <p class="project-card-desc">
              Built a production-oriented RAG platform for secure Q&A over internal company knowledge, enforcing JWT authentication and RBAC-based permission filtering. Designed a routing pipeline rewriting queries using conversation history, dispatching an Agent Planner across Document RAG (hybrid dense + sparse retrieval) and GraphRAG branches (bounded to 3 steps). Fused results with Reciprocal Rank Fusion (RRF) and cross-encoder reranking, enforcing evidence-before-answers grounded with Nemotron. Built a document ingestion pipeline with PostgreSQL & pgvector, exposed via FastAPI with Swagger docs.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">FastAPI</span>
              <span class="badge-tag">LangChain</span>
              <span class="badge-tag">PostgreSQL</span>
              <span class="badge-tag">pgvector</span>
              <span class="badge-tag">Nemotron</span>
              <span class="badge-tag">GraphRAG</span>
            </div>
            <div style="margin-top:24px;">
              <a href="https://github.com/sanil2050/enterprise-rag" target="_blank" class="btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 15, 2)} View Repository ${tabler('arrow-up-right', 13, 2)}
              </a>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="card-dark project-card" data-category="Agentic AI & RAG">
            <div class="project-card-header">
              <span class="badge-tag accent-green">Agentic RAG</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-subtle);">2026</span>
            </div>
            <h3 class="project-card-title">Hybrid RAG Pipeline — Agentic RAG System</h3>
            <p class="project-card-desc">
              Ingested PDFs with pypdf, extracted and cleaned page-level text, and split into ~500-character chunks (50-character overlap) using RecursiveCharacterTextSplitter. Generated dense vector embeddings with HuggingFace all-MiniLM-L6-v2 (384-dim) and fit a BM25 sparse encoder into a Pinecone hybrid index. Implemented batched upserts and a PineconeHybridSearchRetriever (top-k=5) that feeds grounded context to Google Gemini 2.5 Flash (temp 0.2) with strict source file and page-level traceability.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">LangChain</span>
              <span class="badge-tag">Pinecone</span>
              <span class="badge-tag">HuggingFace</span>
              <span class="badge-tag">Google Gemini</span>
              <span class="badge-tag">BM25</span>
            </div>
            <div style="margin-top:24px;">
              <a href="https://github.com/sanil2050/hybrid-rag-pipeline" target="_blank" class="btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 15, 2)} View Repository ${tabler('arrow-up-right', 13, 2)}
              </a>
            </div>
          </div>

          <!-- Project 3 -->
          <div class="card-dark project-card" data-category="Agentic AI & RAG">
            <div class="project-card-header">
              <span class="badge-tag accent-blue">Multi-Agent</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-subtle);">2026</span>
            </div>
            <h3 class="project-card-title">Multi-Agent AI Research System</h3>
            <p class="project-card-desc">
              Constructed an autonomous 4-agent collaborative pipeline: Research Agent queries Tavily Search API for ranked web summaries, Reader Agent isolates clean content with BeautifulSoup, Writer Agent synthesizes structured reports with citations using Gemini 2.5 Flash, and Critic Agent audits reports with numerical scores (1–10) and feedback. Sequenced in a LangChain pipeline with Streamlit web UI (live logs, downloadable reports) and headless CLI mode.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">LangChain</span>
              <span class="badge-tag">Gemini 2.5</span>
              <span class="badge-tag">Tavily API</span>
              <span class="badge-tag">Streamlit</span>
            </div>
            <div style="margin-top:24px;">
              <a href="https://github.com/sanil2050/Multi-Agent-Ai-Research-System" target="_blank" class="btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 15, 2)} View Repository ${tabler('arrow-up-right', 13, 2)}
              </a>
            </div>
          </div>

          <!-- Project 4 -->
          <div class="card-dark project-card" data-category="Computer Vision & ML">
            <div class="project-card-header">
              <span class="badge-tag accent-amber">Research & CV</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-subtle);">2026</span>
            </div>
            <h3 class="project-card-title">Breast Cancer Classification using YOLOv11 & YOLOv26</h3>
            <p class="project-card-desc">
              Preprocessed and combined two public mammography datasets (CBIS-DDSM & VinDr-Mammo) into a unified classification dataset spanning benign and malignant cases. Applied 70:10:10 train/val/test splits, data augmentation (rotation, flipping, contrast adjustment), and class-balancing techniques. Ran systematic hyperparameter tuning independently on YOLOv11 and YOLOv26 classification heads, benchmarking precision, recall, and accuracy on held-out test data.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">PyTorch</span>
              <span class="badge-tag">Ultralytics YOLO</span>
              <span class="badge-tag">CBIS-DDSM</span>
              <span class="badge-tag">VinDr-Mammo</span>
            </div>
            <div style="margin-top:24px;">
              <a href="https://github.com/sanil2050" target="_blank" class="btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 15, 2)} View GitHub Profile ${tabler('arrow-up-right', 13, 2)}
              </a>
            </div>
          </div>

          <!-- Project 5 -->
          <div class="card-dark project-card" data-category="Computer Vision & ML">
            <div class="project-card-header">
              <span class="badge-tag">Computer Vision</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-subtle);">2025</span>
            </div>
            <h3 class="project-card-title">Object Detection using YOLOv8</h3>
            <p class="project-card-desc">
              Curated and labeled a custom dataset of cold-drink bottles with bounding-box annotations for supervised training. Applied data augmentation (flips, color jitter, mosaic) and transfer learning from pretrained COCO weights. Trained YOLOv8 to 92% detection accuracy, built an inference pipeline with configurable confidence and NMS thresholds, exported to ONNX format, and evaluated confusion matrices.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">PyTorch</span>
              <span class="badge-tag">Ultralytics YOLOv8</span>
              <span class="badge-tag">ONNX Runtime</span>
            </div>
            <div style="margin-top:24px;">
              <a href="https://github.com/sanil2050/YoloV8-and-Label-Studio--Integration" target="_blank" class="btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 15, 2)} View Repository ${tabler('arrow-up-right', 13, 2)}
              </a>
            </div>
          </div>

          <!-- Project 6 -->
          <div class="card-dark project-card" data-category="Data Analytics">
            <div class="project-card-header">
              <span class="badge-tag accent-green">Data Science & ML</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-subtle);">2026</span>
            </div>
            <h3 class="project-card-title">Predictive Analysis of Youth Suicide Risk</h3>
            <p class="project-card-desc">
              Designed a high-impact predictive classification system incorporating rigorous preprocessing, feature engineering, and SMOTE class balancing. Benchmarked Logistic Regression, Random Forest, and XGBoost (98.19% accuracy). Integrated SHAP explainability for interpretable feature importance and clinical risk factor transparency.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">Scikit-learn</span>
              <span class="badge-tag">XGBoost</span>
              <span class="badge-tag">SHAP</span>
              <span class="badge-tag">Pandas</span>
            </div>
            <div style="margin-top:24px;">
              <a href="https://github.com/sanil2050" target="_blank" class="btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 15, 2)} View GitHub Profile ${tabler('arrow-up-right', 13, 2)}
              </a>
            </div>
          </div>

          <!-- Project 7 -->
          <div class="card-dark project-card" data-category="Computer Vision & ML">
            <div class="project-card-header">
              <span class="badge-tag">NLP & ML</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-subtle);">2025</span>
            </div>
            <h3 class="project-card-title">Hate Speech Detection Using Machine Learning</h3>
            <p class="project-card-desc">
              Collected and cleaned a labeled tweet dataset spanning hate speech, offensive language, and neutral categories. Preprocessed text (lowercasing, punctuation and stopword removal) and vectorized with CountVectorizer for bag-of-words. Trained a DecisionTreeClassifier for multi-class classification in an end-to-end pipeline.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">Scikit-learn</span>
              <span class="badge-tag">CountVectorizer</span>
              <span class="badge-tag">NLP</span>
            </div>
            <div style="margin-top:24px;">
              <a href="https://github.com/sanil2050" target="_blank" class="btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 15, 2)} View GitHub Profile ${tabler('arrow-up-right', 13, 2)}
              </a>
            </div>
          </div>

          <!-- Project 8 -->
          <div class="card-dark project-card" data-category="Data Analytics">
            <div class="project-card-header">
              <span class="badge-tag accent-blue">Data Analytics</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-subtle);">2025</span>
            </div>
            <h3 class="project-card-title">End-to-End Data Analysis Pipeline</h3>
            <p class="project-card-desc">
              Built a comprehensive tabular data analysis pipeline in Python, Pandas, and NumPy to clean, transform, and explore large datasets. Generated automated visualizations and computed statistical summaries to identify trends, patterns, and actionable business insights.
            </p>
            <div class="project-tech-tags">
              <span class="badge-tag">Python</span>
              <span class="badge-tag">Pandas</span>
              <span class="badge-tag">NumPy</span>
              <span class="badge-tag">Data Visualization</span>
            </div>
            <div style="margin-top:24px;">
              <a href="https://github.com/sanil2050" target="_blank" class="btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                ${tabler('brand-github', 15, 2)} View GitHub Profile ${tabler('arrow-up-right', 13, 2)}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  </main>

  ${renderFooter('..')}
  ${renderClientScript()}
</body>
</html>
`;
}

// -------------------------------------------------------------
// 4. PRICING & SERVICES PAGE (pricing/index.html)
// -------------------------------------------------------------
function buildPricingPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Services & Engagement Models · Sanil Mishra</title>
  <meta name="description" content="Transparent collaboration models for MVP prototyping, Enterprise RAG systems, and full-time AI engineering.">
  <link rel="icon" type="image/png" href="../assets/logo.png">
  ${FONTS_HEAD}
  <style>
    ${BASE_CSS}
    .page-header {
      padding: 160px 0 60px;
      position: relative;
    }
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      align-items: stretch;
    }
    @media (max-width: 992px) {
      .pricing-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  ${renderHeader('/pricing', '..')}

  <main>
    <div class="page-header">
      <div class="sec-grid-dark"></div>
      <div class="container">
        <div style="text-align:center; max-width:760px; margin:0 auto;">
          <div class="section-label">ENGAGEMENT & PACKAGES</div>
          <h1 class="section-title">Transparent AI Engineering</h1>
          <p class="section-desc" style="margin:0 auto 36px;">
            Structured engagement frameworks designed for startups needing rapid MVPs, as well as enterprises seeking high-accuracy RAG architectures and full-time expertise.
          </p>
        </div>
      </div>
    </div>

    <!-- PRICING TIERS -->
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="pricing-grid">
          
          <!-- Tier 1 -->
          <div class="card-dark" style="display:flex; flex-direction:column;">
            <div class="badge-tag" style="margin-bottom:16px; align-self:flex-start; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('bolt', 14, 2)} Rapid Sprint
            </div>
            <h3 style="font-size:1.6rem; font-weight:700; margin-bottom:8px;">AI Prototype & MVP</h3>
            <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:24px;">Ideal for validating concepts, testing agentic pipelines, or hackathon-speed demo builds.</p>
            
            <div style="font-size:2.4rem; font-weight:800; margin-bottom:4px;">1–2 Weeks</div>
            <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-subtle); margin-bottom:32px;">Fixed Scope Sprints</div>

            <ul style="display:flex; flex-direction:column; gap:14px; color:var(--text-muted); font-size:0.92rem; margin-bottom:36px; flex-grow:1; list-style:none;">
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Custom Multi-Agent or RAG pipeline</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Streamlit or React user interface</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> FastAPI / Python backend integration</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Daily asynchronous progress updates</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Source code transfer & walkthrough</li>
            </ul>

            <a href="../index.html#contact" class="btn-secondary" style="width:100%; text-align:center; display:inline-flex; justify-content:center; align-items:center; gap:6px;">
              Discuss MVP Scope ${tabler('arrow-up-right', 15, 2)}
            </a>
          </div>

          <!-- Tier 2 (Highlighted) -->
          <div class="card-dark" style="display:flex; flex-direction:column; border-color:var(--accent-purple); box-shadow:0 16px 40px -12px var(--accent-purple-glow); position:relative;">
            <div style="position:absolute; top:20px; right:24px;" class="badge-tag accent-purple">Most Popular</div>
            <div class="badge-tag accent-purple" style="margin-bottom:16px; align-self:flex-start; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('sparkles', 14, 2)} Enterprise Solution
            </div>
            <h3 style="font-size:1.6rem; font-weight:700; margin-bottom:8px;">Production RAG System</h3>
            <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:24px;">For organizations requiring secure, grounded document retrieval with zero hallucinations.</p>
            
            <div style="font-size:2.4rem; font-weight:800; margin-bottom:4px; color:var(--accent-purple);">Custom Build</div>
            <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-subtle); margin-bottom:32px;">Milestone-Based Contract</div>

            <ul style="display:flex; flex-direction:column; gap:14px; color:var(--text-muted); font-size:0.92rem; margin-bottom:36px; flex-grow:1; list-style:none;">
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Hybrid Retrieval (Dense MiniLM + BM25)</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Role-Based Access Control (RBAC) & JWT</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> PostgreSQL + pgvector / Pinecone setup</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Cross-Encoder reranking & ground auditing</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Complete REST API with Swagger docs</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-purple); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Production deployment & benchmark metrics</li>
            </ul>

            <a href="../index.html#contact" class="btn-primary" style="width:100%; text-align:center; display:inline-flex; justify-content:center; align-items:center; gap:6px;">
              Request Architecture Call ${tabler('arrow-up-right', 15, 2)}
            </a>
          </div>

          <!-- Tier 3 -->
          <div class="card-dark" style="display:flex; flex-direction:column;">
            <div class="badge-tag accent-green" style="margin-bottom:16px; align-self:flex-start; display:inline-flex; align-items:center; gap:6px;">
              ${tabler('cpu', 14, 2)} Full-Time / Retainer
            </div>
            <h3 style="font-size:1.6rem; font-weight:700; margin-bottom:8px;">Dedicated AI Engineer</h3>
            <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:24px;">Embedding directly into your engineering team for ongoing Agentic AI, CV, or Data roles.</p>
            
            <div style="font-size:2.4rem; font-weight:800; margin-bottom:4px;">Full-Time</div>
            <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-subtle); margin-bottom:32px;">On-Site / Remote Engagement</div>

            <ul style="display:flex; flex-direction:column; gap:14px; color:var(--text-muted); font-size:0.92rem; margin-bottom:36px; flex-grow:1; list-style:none;">
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-green); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> 40+ hours/week dedicated engineering</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-green); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Full-stack ownership: data, models & APIs</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-green); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Active participation in agile sprint cycles</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-green); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Computer Vision (YOLO) & predictive ML</li>
              <li style="display:flex; gap:10px; align-items:center;"><span style="color:var(--accent-green); flex-shrink:0;">${tabler('check', 15, 2.5)}</span> Data warehouse ETL & BI dashboarding</li>
            </ul>

            <a href="mailto:sanilmishra010@gmail.com" class="btn-secondary" style="width:100%; text-align:center; display:inline-flex; justify-content:center; align-items:center; gap:6px;">
              Interview Sanil Mishra ${tabler('arrow-up-right', 15, 2)}
            </a>
          </div>

        </div>
      </div>
    </section>
  </main>

  ${renderFooter('..')}
  ${renderClientScript()}
</body>
</html>
`;
}

// -------------------------------------------------------------
// 5. ARTICLES PAGE (articles/index.html)
// -------------------------------------------------------------
function buildArticlesPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Articles & Research Notes · Sanil Mishra</title>
  <meta name="description" content="Technical writeups on Agentic AI, Hybrid RAG systems, YOLO computer vision, and explainable machine learning.">
  <link rel="icon" type="image/png" href="../assets/logo.png">
  ${FONTS_HEAD}
  <style>
    ${BASE_CSS}
    .page-header {
      padding: 160px 0 60px;
      position: relative;
    }
  </style>
</head>
<body>
  ${renderHeader('/articles', '..')}

  <main>
    <div class="page-header">
      <div class="sec-grid-dark"></div>
      <div class="container">
        <div class="section-label">TECHNICAL INSIGHTS</div>
        <h1 class="section-title">Research Notes & Architecture Deep Dives</h1>
        <p class="section-desc">
          Documenting lessons learned from building enterprise multi-agent workflows, fine-tuning computer vision heads, and optimizing retrieval pipelines.
        </p>
      </div>
    </div>

    <!-- ARTICLES LIST -->
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div style="display:grid; grid-template-columns:1fr; gap:36px; max-width:960px;">
          
          <!-- Article 1 -->
          <article class="card-dark" style="padding:40px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span class="badge-tag accent-purple">Enterprise RAG</span>
              <span style="font-family:var(--font-mono); font-size:0.82rem; color:var(--text-subtle); display:inline-flex; align-items:center; gap:5px;">
                ${tabler('clock', 13, 2)} 8 Mins Read · 2026
              </span>
            </div>
            <h2 style="font-size:1.8rem; font-weight:700; margin-bottom:14px; line-height:1.25;">
              Designing Production-Ready Enterprise RAG with Hybrid Retrieval and RBAC
            </h2>
            <p style="color:var(--text-muted); font-size:1rem; line-height:1.75; margin-bottom:20px;">
              Why naive vector search fails in corporate knowledge graphs, and how fusing dense semantic embeddings with BM25 sparse keyword indices and Reciprocal Rank Fusion (RRF) delivers bulletproof retrieval while enforcing zero-leakage role-based access control.
            </p>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px;">
              <span class="badge-tag">Hybrid Search</span>
              <span class="badge-tag">pgvector</span>
              <span class="badge-tag">FastAPI</span>
              <span class="badge-tag">Reranking</span>
            </div>
          </article>

          <!-- Article 2 -->
          <article class="card-dark" style="padding:40px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span class="badge-tag accent-green">Agentic Systems</span>
              <span style="font-family:var(--font-mono); font-size:0.82rem; color:var(--text-subtle); display:inline-flex; align-items:center; gap:5px;">
                ${tabler('clock', 13, 2)} 6 Mins Read · 2026
              </span>
            </div>
            <h2 style="font-size:1.8rem; font-weight:700; margin-bottom:14px; line-height:1.25;">
              Autonomous Multi-Agent Collaboration: Orchestrating Research, Writing & Critic Loops
            </h2>
            <p style="color:var(--text-muted); font-size:1rem; line-height:1.75; margin-bottom:20px;">
              A step-by-step breakdown of implementing a 4-agent collaborative ecosystem using LangChain and Google Gemini. Exploring how dedicated Critic agents auditing intermediate synthesis dramatically improve final report quality and citation fidelity.
            </p>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px;">
              <span class="badge-tag">LangChain</span>
              <span class="badge-tag">Tavily API</span>
              <span class="badge-tag">Critic Loops</span>
              <span class="badge-tag">Autonomous Agents</span>
            </div>
          </article>

          <!-- Article 3 -->
          <article class="card-dark" style="padding:40px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span class="badge-tag accent-blue">Computer Vision</span>
              <span style="font-family:var(--font-mono); font-size:0.82rem; color:var(--text-subtle); display:inline-flex; align-items:center; gap:5px;">
                ${tabler('clock', 13, 2)} 10 Mins Read · 2026
              </span>
            </div>
            <h2 style="font-size:1.8rem; font-weight:700; margin-bottom:14px; line-height:1.25;">
              Benchmarking YOLOv11 & YOLOv26 on Medical Mammography Datasets
            </h2>
            <p style="color:var(--text-muted); font-size:1rem; line-height:1.75; margin-bottom:20px;">
              Empirical insights from training state-of-the-art vision models on the CBIS-DDSM and VinDr-Mammo datasets. Handling high-imbalance class distributions, transfer learning considerations, and optimizing bounding box recall for clinical screening.
            </p>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px;">
              <span class="badge-tag">PyTorch</span>
              <span class="badge-tag">Ultralytics</span>
              <span class="badge-tag">Medical Imaging</span>
              <span class="badge-tag">Benchmarking</span>
            </div>
          </article>

          <!-- Article 4 -->
          <article class="card-dark" style="padding:40px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span class="badge-tag accent-amber">Explainable AI</span>
              <span style="font-family:var(--font-mono); font-size:0.82rem; color:var(--text-subtle); display:inline-flex; align-items:center; gap:5px;">
                ${tabler('clock', 13, 2)} 7 Mins Read · 2026
              </span>
            </div>
            <h2 style="font-size:1.8rem; font-weight:700; margin-bottom:14px; line-height:1.25;">
              Interpretable Machine Learning: Leveraging SHAP for High-Stakes Risk Prediction
            </h2>
            <p style="color:var(--text-muted); font-size:1rem; line-height:1.75; margin-bottom:20px;">
              Achieving 98.19% classification accuracy with XGBoost is only half the battle. How Shapley Additive exPlanations (SHAP) provides global and local feature importance transparency required by healthcare practitioners and stakeholders.
            </p>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px;">
              <span class="badge-tag">XGBoost</span>
              <span class="badge-tag">SHAP</span>
              <span class="badge-tag">Model Interpretability</span>
              <span class="badge-tag">Scikit-learn</span>
            </div>
          </article>
              <span class="badge-tag">XGBoost</span>
              <span class="badge-tag">SHAP</span>
              <span class="badge-tag">Model Interpretability</span>
              <span class="badge-tag">Scikit-learn</span>
            </div>
          </article>

        </div>
      </div>
    </section>
  </main>

  ${renderFooter('..')}
  ${renderClientScript()}
</body>
</html>
`;
}

// -------------------------------------------------------------
// Build Execution
// -------------------------------------------------------------
console.log('Generating website pages with Sanil Mishra portfolio data across target directories...');

const homeHtml = buildHomePage();
const aboutHtml = buildAboutPage();
const projectHtml = buildProjectPage();
const pricingHtml = buildPricingPage();
const articlesHtml = buildArticlesPage();

DIST_DIRS.forEach(distPath => {
  const pages = [
    { file: path.join(distPath, 'index.html'), html: homeHtml },
    { file: path.join(distPath, 'about', 'index.html'), html: aboutHtml },
    { file: path.join(distPath, 'project', 'index.html'), html: projectHtml },
    { file: path.join(distPath, 'pricing', 'index.html'), html: pricingHtml },
    { file: path.join(distPath, 'articles', 'index.html'), html: articlesHtml }
  ];

  pages.forEach(p => {
    fs.writeFileSync(p.file, p.html, 'utf8');
    console.log('Generated:', p.file);
  });
});

console.log('Build completed successfully.');
