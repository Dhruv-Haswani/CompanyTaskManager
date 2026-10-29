const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';

// Define Color Theme (Clean Modern Dark/Navy with Vibrant Accents)
const BG_DARK = '0B132B';
const CARD_BG = '1C2541';
const TEXT_WHITE = 'FFFFFF';
const TEXT_MUTED = '94A3B8';
const ACCENT_CYAN = '38BDF8';
const ACCENT_ORANGE = 'F97316';
const ACCENT_GREEN = '10B981';

// Slide 1: Title Slide
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText("COMPANYTASKMANAGER", {
    x: 0.8, y: 1.8, w: 11.5, h: 0.8,
    fontSize: 38, bold: true, color: ACCENT_CYAN, fontFace: 'Calibri'
  });

  slide.addText("Real-Time Enterprise Task Orchestration & Team Collaboration", {
    x: 0.8, y: 2.6, w: 11.5, h: 0.5,
    fontSize: 20, color: TEXT_WHITE, fontFace: 'Calibri'
  });

  slide.addShape(pptx.ShapeType.line, {
    x: 0.8, y: 3.3, w: 4.5, h: 0,
    line: { color: ACCENT_ORANGE, width: 3 }
  });

  slide.addText([
    { text: "Submitted by: ", options: { bold: true, color: TEXT_MUTED, fontSize: 14 } },
    { text: "Dhruv Haswani\n", options: { bold: true, color: TEXT_WHITE, fontSize: 16 } },
    { text: "Class D15B | B.Tech – Information Technology\n", options: { color: TEXT_MUTED, fontSize: 13 } },
    { text: "Department of Information Technology\n", options: { color: TEXT_MUTED, fontSize: 13 } },
    { text: "Vivekanand Education Society's Institute of Technology (VESIT)\n\n", options: { color: TEXT_WHITE, fontSize: 13 } },
    { text: "Project Guide: ", options: { bold: true, color: TEXT_MUTED, fontSize: 14 } },
    { text: "Mrs. Pooja Prajapati", options: { bold: true, color: ACCENT_CYAN, fontSize: 15 } }
  ], { x: 0.8, y: 3.8, w: 9.0, h: 2.5, fontFace: 'Calibri' });
}

// Slide 2: Problem & Solution
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText("01 | PROBLEM & SOLUTION", { x: 0.8, y: 0.5, w: 10, h: 0.4, fontSize: 13, bold: true, color: ACCENT_ORANGE });
  slide.addText("Addressing Team Friction & Synchronization Lags", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 24, bold: true, color: TEXT_WHITE });

  // Left Card: The Friction Today
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.8, w: 5.4, h: 4.8, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
  slide.addText("THE FRICTION TODAY", { x: 1.1, y: 2.1, w: 4.8, h: 0.4, fontSize: 14, bold: true, color: 'EF4444' });
  slide.addText("Isolated Task Boards & Manual Polling", { x: 1.1, y: 2.5, w: 4.8, h: 0.4, fontSize: 17, bold: true, color: TEXT_WHITE });
  slide.addText([
    { text: "• Outdated Status Updates: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Traditional web apps require browser reloads to view priority updates or completed tasks.\n\n" },
    { text: "• Fragmented Communication: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Teams juggle standalone chat platforms disconnected from the active task workflow.\n\n" },
    { text: "• Lack of Strict Role Security: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Absence of fine-grained RBAC creates security risks in assigning corporate responsibilities." }
  ], { x: 1.1, y: 3.1, w: 4.8, h: 3.2, fontSize: 13, color: TEXT_MUTED });

  // Right Card: The Solution
  slide.addShape(pptx.ShapeType.roundRect, { x: 6.6, y: 1.8, w: 5.8, h: 4.8, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
  slide.addText("THE COMPANYTASKMANAGER MODEL", { x: 6.9, y: 2.1, w: 5.2, h: 0.4, fontSize: 14, bold: true, color: ACCENT_GREEN });
  slide.addText("Instant Sync & Unified Team Collaboration", { x: 6.9, y: 2.5, w: 5.2, h: 0.4, fontSize: 17, bold: true, color: TEXT_WHITE });
  slide.addText([
    { text: "• Instant Reactive Sync: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Socket.IO WebSockets broadcast task changes to all connected browser windows synchronously.\n\n" },
    { text: "• Integrated Real-Time Chat: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Persistent multi-user chat room embedded directly inside the productivity portal.\n\n" },
    { text: "• Hardened JWT & RBAC: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Stateless Bearer token authorization strictly separating Admin and Employee permissions." }
  ], { x: 6.9, y: 3.1, w: 5.2, h: 3.2, fontSize: 13, color: TEXT_MUTED });
}

// Slide 3: Engineering Goals
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText("02 | ENGINEERING GOALS", { x: 0.8, y: 0.5, w: 10, h: 0.4, fontSize: 13, bold: true, color: ACCENT_ORANGE });
  slide.addText("Core Project Objectives & Syllabus Alignment", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 24, bold: true, color: TEXT_WHITE });

  const goals = [
    { num: "01", title: "FULL CRUD REST API", desc: "MERN architecture with modular endpoints for task creation, user filtering, status transitions, and data persistence." },
    { num: "02", title: "JWT AUTH & RBAC", desc: "bcrypt salted password hashing and stateless JWT bearer token authorization separating Admin and User privileges." },
    { num: "03", title: "REAL-TIME WEBSOCKETS", desc: "Socket.IO event engine enabling instant multi-browser task board synchronization and persistent live team chat." },
    { num: "04", title: "DOCKER & CI/CD", desc: "Multi-stage Docker containerization and automated GitHub Actions pipeline with continuous cloud deployment to Vercel and Render." }
  ];

  goals.forEach((g, idx) => {
    const xPos = 0.8 + (idx % 2) * 5.8;
    const yPos = 1.8 + Math.floor(idx / 2) * 2.5;

    slide.addShape(pptx.ShapeType.roundRect, { x: xPos, y: yPos, w: 5.4, h: 2.2, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
    slide.addText(g.num, { x: xPos + 0.3, y: yPos + 0.2, w: 1.0, h: 0.4, fontSize: 18, bold: true, color: ACCENT_CYAN });
    slide.addText(g.title, { x: xPos + 1.2, y: yPos + 0.2, w: 3.9, h: 0.4, fontSize: 15, bold: true, color: TEXT_WHITE });
    slide.addText(g.desc, { x: xPos + 0.3, y: yPos + 0.75, w: 4.8, h: 1.3, fontSize: 12.5, color: TEXT_MUTED });
  });
}

// Slide 4: Full Stack Architecture
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText("03 | FULL STACK ARCHITECTURE", { x: 0.8, y: 0.5, w: 10, h: 0.4, fontSize: 13, bold: true, color: ACCENT_ORANGE });
  slide.addText("Modern, Decoupled MERN Technology Stack", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 24, bold: true, color: TEXT_WHITE });

  const tech = [
    { title: "FRONTEND SPA", sub: "React 19 + Vite 8", desc: "Modular functional components, Tailwind CSS v4, Lucide icons, Context API for global state management." },
    { title: "BACKEND API", sub: "Node.js + Express", desc: "Asynchronous REST endpoints, centralized error handling, and unified HTTP server wrapping Socket.IO." },
    { title: "DATABASE", sub: "MongoDB Atlas", desc: "Cloud replica set document storage accessed via Mongoose ODM for users, tasks, and chat messages." },
    { title: "REAL-TIME LAYER", sub: "Socket.IO WebSockets", desc: "Bi-directional event channels delivering instant task synchronization and interactive live chat." },
    { title: "SECURITY", sub: "bcryptjs & JWT", desc: "Salted password encryption (10 rounds), stateless bearer token verification, and RBAC middleware." },
    { title: "DEVOPS & CLOUD", sub: "Docker & CI/CD", desc: "Docker Compose multi-container setup, GitHub Actions CI build check, Render (API), and Vercel (Client)." }
  ];

  tech.forEach((t, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const xPos = 0.8 + col * 3.9;
    const yPos = 1.8 + row * 2.5;

    slide.addShape(pptx.ShapeType.roundRect, { x: xPos, y: yPos, w: 3.6, h: 2.2, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
    slide.addText(t.title, { x: xPos + 0.2, y: yPos + 0.2, w: 3.2, h: 0.3, fontSize: 11, bold: true, color: ACCENT_CYAN });
    slide.addText(t.sub, { x: xPos + 0.2, y: yPos + 0.5, w: 3.2, h: 0.4, fontSize: 15, bold: true, color: TEXT_WHITE });
    slide.addText(t.desc, { x: xPos + 0.2, y: yPos + 0.95, w: 3.2, h: 1.1, fontSize: 11.5, color: TEXT_MUTED });
  });
}

// Slide 5: System Topology & Communication Flow
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText("04 | SYSTEM TOPOLOGY & COMMUNICATION", { x: 0.8, y: 0.5, w: 10, h: 0.4, fontSize: 13, bold: true, color: ACCENT_ORANGE });
  slide.addText("End-to-End Dual-Transport Flow", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 24, bold: true, color: TEXT_WHITE });

  const tiers = [
    { title: "CLIENT TIER", name: "React 19 SPA (Vercel CDN)", desc: "Renders responsive UI tabs: Exp 7 Docker, Task Manager, Live Chat. Communicates over HTTPS REST and persistent WSS." },
    { title: "TRANSPORT TIER", name: "Dual-Channel Routing", desc: "REST handles CRUD & JWT authentication; WebSockets (Socket.IO) handles live chat messages and broadcast triggers." },
    { title: "API GATEWAY TIER", name: "Express Server (Render Cloud)", desc: "Extracts Bearer tokens, validates payloads, enforces role access, mounts routes, and manages WebSocket connections." },
    { title: "PERSISTENCE TIER", name: "MongoDB Atlas (Cloud Cluster)", desc: "Stores normalized documents across users, tasks, and chatmessages collections with Mongoose schema validation." }
  ];

  tiers.forEach((tier, idx) => {
    const yPos = 1.8 + idx * 1.25;
    slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: yPos, w: 11.5, h: 1.05, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
    slide.addText(tier.title, { x: 1.1, y: yPos + 0.15, w: 2.2, h: 0.3, fontSize: 11, bold: true, color: ACCENT_ORANGE });
    slide.addText(tier.name, { x: 1.1, y: yPos + 0.45, w: 3.2, h: 0.4, fontSize: 14, bold: true, color: TEXT_WHITE });
    slide.addText(tier.desc, { x: 4.5, y: yPos + 0.2, w: 7.5, h: 0.7, fontSize: 12.5, color: TEXT_MUTED });
  });
}

// Slide 6: Defense in Depth (Security & RBAC)
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText("05 | DEFENSE IN DEPTH", { x: 0.8, y: 0.5, w: 10, h: 0.4, fontSize: 13, bold: true, color: ACCENT_ORANGE });
  slide.addText("Security Hardening & Role-Based Access Control", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 24, bold: true, color: TEXT_WHITE });

  // Left Card: Authentication Security
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.8, w: 5.4, h: 4.8, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
  slide.addText("AUTHENTICATION & INTEGRITY", { x: 1.1, y: 2.1, w: 4.8, h: 0.4, fontSize: 14, bold: true, color: ACCENT_CYAN });
  slide.addText("Cryptographic API Protection", { x: 1.1, y: 2.5, w: 4.8, h: 0.4, fontSize: 17, bold: true, color: TEXT_WHITE });
  slide.addText([
    { text: "• bcrypt Password Hashing: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Passwords salted with 10 rounds before saving in MongoDB. Plaintext credentials never stored.\n\n" },
    { text: "• Stateless JWT Bearer Tokens: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Tokens issued upon login with encrypted userId and role payloads, expiring in 1 hour.\n\n" },
    { text: "• Standardized Error Handlers: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Generic error messages returned to prevent user enumeration attacks." }
  ], { x: 1.1, y: 3.1, w: 4.8, h: 3.2, fontSize: 13, color: TEXT_MUTED });

  // Right Card: RBAC Model
  slide.addShape(pptx.ShapeType.roundRect, { x: 6.6, y: 1.8, w: 5.8, h: 4.8, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
  slide.addText("ACCESS CONTROL MODEL (RBAC)", { x: 6.9, y: 2.1, w: 5.2, h: 0.4, fontSize: 14, bold: true, color: ACCENT_GREEN });
  slide.addText("Role Segmentation & Enforcement", { x: 6.9, y: 2.5, w: 5.2, h: 0.4, fontSize: 17, bold: true, color: TEXT_WHITE });
  slide.addText([
    { text: "• Employee / Standard User: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Can view task assignments, update task status (Pending → Completed), and access Live Chat.\n\n" },
    { text: "• Administrator Manager: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Exclusive permissions to create new tasks, assign priorities, and permanently delete records.\n\n" },
    { text: "• HTTP 401 & 403 Enforcement: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "401 returned for missing/expired tokens; 403 Forbidden returned for non-admin privileged actions." }
  ], { x: 6.9, y: 3.1, w: 5.2, h: 3.2, fontSize: 13, color: TEXT_MUTED });
}

// Slide 7: DevOps Pipeline & CI/CD
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText("06 | QUALITY & DEVOPS PIPELINE", { x: 0.8, y: 0.5, w: 10, h: 0.4, fontSize: 13, bold: true, color: ACCENT_ORANGE });
  slide.addText("Containerization & Automated Cloud Deployment", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 24, bold: true, color: TEXT_WHITE });

  // Top Left: Docker
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.8, w: 5.4, h: 2.3, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
  slide.addText("DOCKER CONTAINERIZATION", { x: 1.1, y: 2.0, w: 4.8, h: 0.3, fontSize: 12, bold: true, color: ACCENT_CYAN });
  slide.addText("node:20-alpine Micro-Images", { x: 1.1, y: 2.3, w: 4.8, h: 0.35, fontSize: 15, bold: true, color: TEXT_WHITE });
  slide.addText("Multi-container orchestration via Docker Compose mapping port 3000 (frontend) and 5001 (backend) with bridge networking.", { x: 1.1, y: 2.75, w: 4.8, h: 1.1, fontSize: 12, color: TEXT_MUTED });

  // Top Right: GitHub Actions
  slide.addShape(pptx.ShapeType.roundRect, { x: 6.6, y: 1.8, w: 5.8, h: 2.3, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
  slide.addText("CONTINUOUS INTEGRATION (CI)", { x: 6.9, y: 2.0, w: 5.2, h: 0.3, fontSize: 12, bold: true, color: ACCENT_GREEN });
  slide.addText("GitHub Actions Automated Checks", { x: 6.9, y: 2.3, w: 5.2, h: 0.35, fontSize: 15, bold: true, color: TEXT_WHITE });
  slide.addText("Automated Ubuntu runners trigger on every git push: runs parallel 'frontend-build' (npm run build) and 'backend-check' (entry scripts).", { x: 6.9, y: 2.75, w: 5.2, h: 1.1, fontSize: 12, color: TEXT_MUTED });

  // Bottom Banner: Cloud Deployment
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 4.4, w: 11.6, h: 2.2, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
  slide.addText("CONTINUOUS DEPLOYMENT (CD) — LIVE CLOUD INFRASTRUCTURE", { x: 1.1, y: 4.6, w: 11, h: 0.3, fontSize: 12, bold: true, color: ACCENT_ORANGE });
  slide.addText("Zero-Downtime Multi-Cloud Delivery", { x: 1.1, y: 4.9, w: 11, h: 0.35, fontSize: 15, bold: true, color: TEXT_WHITE });
  slide.addText([
    { text: "• Vercel (Frontend): ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Directly connected to main branch. Edge-distributed SPA with instant SSL termination.\n" },
    { text: "• Render (Backend): ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Deploys Express & Socket.IO server from backend/ directory with live MongoDB Atlas connection.\n" },
    { text: "• Result: ", options: { bold: true, color: ACCENT_GREEN } },
    { text: "Every validated push to GitHub instantly updates production within seconds." }
  ], { x: 1.1, y: 5.35, w: 11, h: 1.1, fontSize: 12.5, color: TEXT_MUTED });
}

// Slide 8: Summary & Live Links
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText("07 | CONCLUSION & LIVE DEMO", { x: 0.8, y: 0.5, w: 10, h: 0.4, fontSize: 13, bold: true, color: ACCENT_ORANGE });
  slide.addText("10/10 Lab Syllabus Coverage & Production Verification", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 24, bold: true, color: TEXT_WHITE });

  // Left Card: Key Outcomes
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.8, w: 5.4, h: 4.8, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
  slide.addText("PROJECT OUTCOMES", { x: 1.1, y: 2.1, w: 4.8, h: 0.4, fontSize: 14, bold: true, color: ACCENT_GREEN });
  slide.addText("Full Spectrum FSD Realization", { x: 1.1, y: 2.5, w: 4.8, h: 0.4, fontSize: 17, bold: true, color: TEXT_WHITE });
  slide.addText([
    { text: "✔ 10/10 Syllabus Experiments: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Successfully realized from basic React components to real-time WebSockets and cloud DevOps.\n\n" },
    { text: "✔ 12/12 Test Checkpoints Passed: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Verified across CRUD, JWT auth, RBAC guards, Docker orchestration, and multi-client real-time sync.\n\n" },
    { text: "✔ Production Hardened: ", options: { bold: true, color: ACCENT_CYAN } },
    { text: "Active cloud URLs running with HTTPS and automated deployment pipelines." }
  ], { x: 1.1, y: 3.1, w: 4.8, h: 3.2, fontSize: 13, color: TEXT_MUTED });

  // Right Card: Project Links
  slide.addShape(pptx.ShapeType.roundRect, { x: 6.6, y: 1.8, w: 5.8, h: 4.8, fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1 });
  slide.addText("LIVE PRODUCTION LINKS", { x: 6.9, y: 2.1, w: 5.2, h: 0.4, fontSize: 14, bold: true, color: ACCENT_CYAN });
  slide.addText("Ready for Live Demonstration", { x: 6.9, y: 2.5, w: 5.2, h: 0.4, fontSize: 17, bold: true, color: TEXT_WHITE });
  slide.addText([
    { text: "• GitHub Repository:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "https://github.com/Dhruv-Haswani/CompanyTaskManager\n\n", options: { color: ACCENT_CYAN } },
    { text: "• Live Frontend (Vercel):\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "https://company-task-manager-mu.vercel.app/\n\n", options: { color: ACCENT_GREEN } },
    { text: "• Live Backend API (Render):\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "https://company-task-backend-r41r.onrender.com/api\n\n", options: { color: ACCENT_ORANGE } },
    { text: "• Cloud Database:\n", options: { bold: true, color: TEXT_WHITE } },
    { text: "MongoDB Atlas (CompanyDB Replica Set)", options: { color: TEXT_MUTED } }
  ], { x: 6.9, y: 3.1, w: 5.2, h: 3.2, fontSize: 12.5 });
}

const outputPath = path.join(__dirname, 'CompanyTaskManager_Presentation.pptx');
pptx.writeFile({ fileName: outputPath }).then(fileName => {
  console.log('Presentation successfully created at: ' + fileName);
}).catch(err => {
  console.error('Error generating presentation: ' + err);
});
