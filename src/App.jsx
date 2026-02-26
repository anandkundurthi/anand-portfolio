import { useState, useEffect, useRef } from "react";

const projects = [
  {
    emoji: "📄",
    year: "2025",
    type: "Python · FastAPI · SQLite",
    name: "AI Resume Analyzer",
    desc: "A full-stack resume analysis tool that compares resumes against job descriptions using a skill-based matching algorithm. Features user authentication, PDF extraction, animated match score, skill gap analysis, and career suggestions.",
    github: "https://github.com/anandkundurthi/ai-resume-analyzer",
    live: "https://ai-resume-analyzer-tuet.onrender.com",
    preview: "https://ai-resume-analyzer-tuet.onrender.com",
    bg: "linear-gradient(135deg,#001a33,#002d5e,#003f85)",
    accent: "#60a5fa",
  },
  {
    emoji: "🛒",
    year: "2025",
    type: "SQL · MySQL · Database",
    name: "SupplySync",
    desc: "A retail-focused MySQL project simulating real supermarket operations — inventory tracking, supplier handling, customer sales & billing, and business analytics with 20+ real-world SQL solutions.",
    github: "https://github.com/anandkundurthi/Dmart_mall_management",
    live: null, preview: null,
    bg: "linear-gradient(135deg,#001a33,#002d5e,#003f85)",
    accent: "#60a5fa",
  },
  {
    emoji: "🎨",
    year: "2025",
    type: "HTML · CSS · JavaScript",
    name: "Color Picker",
    desc: "An interactive color picker built with vanilla HTML, CSS, and JavaScript. Demonstrates core frontend skills — DOM manipulation, event handling, and dynamic UI updates.",
    github: "https://github.com/anandkundurthi/colorPicker",
    live: null, preview: null,
    bg: "linear-gradient(135deg,#1a003a,#3d0070,#7c1fff)",
    accent: "#c084fc",
  },
  {
    emoji: "🚦",
    year: "2025",
    type: "HTML · CSS · JavaScript",
    name: "Traffic Light Simulation",
    desc: "An interactive traffic light with timed Red, Yellow, and Green cycles using JavaScript state machines with setInterval timing logic and CSS class toggling.",
    github: "https://github.com/anandkundurthi/traffic_light",
    live: null, preview: null,
    bg: "linear-gradient(135deg,#001400,#002800,#005200)",
    accent: "#4ade80",
  },
  {
    emoji: "🖌️",
    year: "2025",
    type: "Figma · UI/UX · Canva",
    name: "Diigoo Internship Designs",
    desc: "Production-ready UI components and design systems built for real clients during my 4-month internship at Diigoo, Hyderabad. Wireframing, prototyping, and design-to-dev handoff.",
    github: "https://www.linkedin.com/in/anand-venkata-raghava-saikundurthi-75914a358",
    live: null, preview: null,
    bg: "linear-gradient(135deg,#1a0533,#2d1060,#4a1a8f)",
    accent: "#f472b6",
  },
];

const skills = [
  { icon: "🐍", name: "Backend Dev", tags: ["Python", "FastAPI", "Node.js", "REST APIs", "Express", "Session Auth", "Uvicorn"] },
  { icon: "⚛️", name: "Frontend Dev", tags: ["React.js", "HTML5", "CSS3", "JavaScript", "Jinja2", "Responsive Design"] },
  { icon: "🗄️", name: "Database", tags: ["SQL", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "SQLAlchemy ORM"] },
  { icon: "🎨", name: "UI/UX Design", tags: ["Figma", "Canva", "Wireframing", "Prototyping", "Usability Testing"] },
  { icon: "🛠️", name: "Tools & DevOps", tags: ["Git", "GitHub", "Linux", "PyPDF2", "Cloud Deployment", "Render", "Vite"] },
  { icon: "🧠", name: "CS Fundamentals", tags: ["DSA", "OOP", "DBMS", "Problem Solving", "Debugging"] },
];

const certs = [
  { icon: "🐍", name: "Programming Foundations with Python", by: "NxtWave CCBP 4.0" },
  { icon: "🗄️", name: "Complete Guide to SQL for Data Engineering", by: "Beginner to Advanced" },
  { icon: "📱", name: "Build Your Own Responsive Website", by: "NxtWave CCBP 4.0" },
  { icon: "🌐", name: "Build Your Own Static Website", by: "NxtWave CCBP 4.0" },
];

const marqueeItems = [
  "Python","React.js","FastAPI","Figma","SQL","Full-Stack","MERN Stack","JavaScript","Node.js","MongoDB",
  "Python","React.js","FastAPI","Figma","SQL","Full-Stack","MERN Stack","JavaScript","Node.js","MongoDB",
];

const TYPING_WORDS = ["Full-Stack Developer", "UI/UX Designer", "Python Engineer", "React Developer", "Problem Solver"];
const STATS = [
  { n: 4, suffix: "+", label: "Months industry XP" },
  { n: 5, suffix: "+", label: "Certifications" },
  { n: 6, suffix: "", label: "GitHub Projects" },
  { n: 100, suffix: "%", label: "Willingness to learn" },
];

// ── Particle Canvas ──
function Particles({ dark }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        const dx = mouse.current.x - p.x, dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { p.vx -= dx / dist * 0.04; p.vy -= dy / dist * 0.04; }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167,139,250,0.4)";
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167,139,250,${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); window.removeEventListener("mousemove", onMouse); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.55 }} />;
}

// ── Custom Cursor ──
function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
    };
    const expand = () => ringRef.current?.classList.add("cur-big");
    const shrink = () => ringRef.current?.classList.remove("cur-big");
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,.proj-card,.skill-card,.tag-chip").forEach(el => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });
    let raf;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;
      if (ringRef.current) { ringRef.current.style.left = pos.current.x + "px"; ringRef.current.style.top = pos.current.y + "px"; }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); };
  }, []);
  return (
    <>
      <div ref={ringRef} className="cur-ring" style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, width: 36, height: 36, border: "1.5px solid rgba(167,139,250,0.8)", borderRadius: "50%", transform: "translate(-50%,-50%)", transition: "width 0.25s,height 0.25s" }} />
      <div ref={dotRef} style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, width: 5, height: 5, background: "#f472b6", borderRadius: "50%", transform: "translate(-50%,-50%)" }} />
      <style>{`.cur-big{width:64px!important;height:64px!important;background:rgba(167,139,250,0.08)!important}`}</style>
    </>
  );
}

// ── Typing Text ──
function TypingText() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = TYPING_WORDS[idx];
    const t = setTimeout(() => {
      if (!del && text.length < word.length) setText(word.slice(0, text.length + 1));
      else if (!del && text.length === word.length) setDel(true);
      else if (del && text.length > 0) setText(text.slice(0, -1));
      else { setDel(false); setIdx((idx + 1) % TYPING_WORDS.length); }
    }, del ? 40 : text.length === word.length ? 1800 : 75);
    return () => clearTimeout(t);
  }, [text, del, idx]);
  return <span style={{ color: "#a78bfa" }}>{text}<span style={{ animation: "blink 1s infinite", color: "#f472b6" }}>|</span></span>;
}

// ── Animated Counter ──
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 40, inc = target / steps;
        let cur = 0, i = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, target); setCount(Math.floor(cur)); i++;
          if (i >= steps) clearInterval(t);
        }, 1500 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Scroll Reveal ──
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease` }}>
      {children}
    </div>
  );
}

// ── Magnetic Button ──
function MagBtn({ children, className, style, onClick, href, target: t, rel }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px,${y * 0.25}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  const props = { ref, className, style: { ...style, transition: "transform 0.3s ease,background 0.25s,box-shadow 0.25s" }, onMouseMove: onMove, onMouseLeave: onLeave };
  if (href) return <a href={href} target={t} rel={rel} {...props}>{children}</a>;
  return <button onClick={onClick} {...props}>{children}</button>;
}

// ── Project Card ──
function ProjectCard({ p, dark }) {
  const [hov, setHov] = useState(false);
  const card = dark ? "#0f0f1a" : "#ffffff";
  const border = dark ? "#1e1e2e" : "#e2dff5";
  const text = dark ? "#f2f0ff" : "#0f1e35";
  const muted = dark ? "#7a7a99" : "#6b7a90";
  return (
    <div className="proj-card" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", overflow: "hidden", background: card, border: `1px solid ${border}` }}>
      {p.preview && (
        <div style={{ position: "absolute", inset: 0, zIndex: 10, opacity: hov ? 1 : 0, transition: "opacity 0.45s", pointerEvents: hov ? "auto" : "none" }}>
          <iframe src={p.preview} style={{ width: "100%", height: "100%", border: "none" }} title={p.name} loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 55%,rgba(10,10,20,0.97) 100%)" }} />
          <div style={{ position: "absolute", bottom: 16, left: 16, fontSize: 11, color: "#a78bfa", fontWeight: 700 }}>👁 Live Preview</div>
        </div>
      )}
      <div style={{ height: 160, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,0.02) 20px,rgba(255,255,255,0.02) 21px)" }} />
        <span style={{ transform: hov ? "scale(1.25) rotate(8deg)" : "scale(1)", transition: "transform 0.3s", display: "inline-block" }}>{p.emoji}</span>
      </div>
      <div style={{ padding: "1.3rem" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: muted }}>{p.year}</span>
          <span style={{ fontSize: 10, color: p.accent, background: `${p.accent}18`, border: `1px solid ${p.accent}33`, padding: "2px 9px", borderRadius: 100 }}>{p.type}</span>
        </div>
        <div className="syne" style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: 6, lineHeight: 1.3, color: text }}>{p.name}</div>
        <p style={{ fontSize: 12, color: muted, lineHeight: 1.7, marginBottom: "1rem" }}>{p.desc}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">↗ GitHub</a>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="proj-link">🚀 Live</a>}
          {p.preview && <span style={{ fontSize: 11, color: "#a78bfa", padding: "5px 12px", border: "1px dashed rgba(167,139,250,0.3)", borderRadius: 100 }}>hover ✦</span>}
        </div>
      </div>
    </div>
  );
}

// ── Live Clock ──
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);
  return <span style={{ fontFamily: "monospace" }}>{time} IST</span>;
}

// ── Main App ──
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  const bg = dark ? "#080810" : "#f8f7ff";
  const bg2 = dark ? "#0a0a14" : "#f0eeff";
  const card = dark ? "#0f0f1a" : "#ffffff";
  const border = dark ? "#1e1e2e" : "#e2dff5";
  const text = dark ? "#f2f0ff" : "#0f1e35";
  const muted = dark ? "#7a7a99" : "#6b7a90";

  return (
    <div style={{ background: bg, color: text, fontFamily: "'DM Sans',system-ui,sans-serif", minHeight: "100vh", overflowX: "hidden", cursor: "none", transition: "background 0.4s,color 0.4s" }}>
      <Particles dark={dark} />
      <Cursor />

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:${bg}}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#a78bfa,#f472b6);border-radius:2px}
        .syne{font-family:'Syne',system-ui,sans-serif!important}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.9)}}
        .tag-chip{display:inline-block;background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.2);color:#a78bfa;padding:3px 12px;border-radius:100px;font-size:11px;margin:3px;transition:all 0.2s;cursor:none}
        .tag-chip:hover{background:rgba(167,139,250,0.25);transform:scale(1.06)}
        .proj-card{border-radius:20px;overflow:hidden;transition:transform 0.35s,border-color 0.3s,box-shadow 0.35s}
        .proj-card:hover{transform:translateY(-12px);border-color:#a78bfa!important;box-shadow:0 24px 64px rgba(167,139,250,0.18)}
        .skill-card{border-radius:18px;padding:1.5rem;transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s;background:${card};border:1px solid ${border}}
        .skill-card:hover{transform:translateY(-6px);border-color:#a78bfa;box-shadow:0 12px 40px rgba(167,139,250,0.12)}
        .stat-box{background:${card};border:1px solid ${border};border-radius:16px;padding:1.3rem;transition:transform 0.3s,border-color 0.3s}
        .stat-box:hover{transform:translateY(-4px);border-color:#a78bfa}
        .exp-card{background:${card};border:1px solid ${border};border-radius:18px;padding:1.6rem;margin-bottom:1rem;transition:border-color 0.3s,transform 0.3s}
        .exp-card:hover{border-color:#f472b6;transform:translateX(5px)}
        .cert-item{background:${card};border:1px solid ${border};border-radius:14px;padding:1rem 1.3rem;display:flex;align-items:center;gap:1rem;margin-bottom:0.8rem;transition:border-color 0.3s,transform 0.3s}
        .cert-item:hover{border-color:#4ade80;transform:translateX(7px)}
        .nav-link{color:${muted};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;transition:color 0.2s;cursor:none;background:none;border:none;font-family:'DM Sans',system-ui,sans-serif}
        .nav-link:hover{color:${text}}
        .btn-primary{background:#a78bfa;color:#000;padding:12px 28px;border-radius:100px;font-weight:600;font-size:14px;display:inline-flex;align-items:center;gap:6px;border:none;cursor:none;font-family:'DM Sans',system-ui,sans-serif;text-decoration:none}
        .btn-primary:hover{background:#f472b6;box-shadow:0 8px 28px rgba(244,114,182,0.35);color:#000}
        .btn-ghost{color:${text};padding:11px 24px;border-radius:100px;font-size:13px;border:1px solid ${border};display:inline-flex;align-items:center;gap:6px;text-decoration:none;cursor:none;background:none;font-family:'DM Sans',system-ui,sans-serif}
        .btn-ghost:hover{border-color:#a78bfa;color:#a78bfa}
        .btn-resume{color:#4ade80;padding:11px 24px;border-radius:100px;font-size:13px;border:1px solid rgba(74,222,128,0.35);display:inline-flex;align-items:center;gap:6px;text-decoration:none;cursor:none;background:transparent;font-family:'DM Sans',system-ui,sans-serif;transition:all 0.25s}
        .btn-resume:hover{background:rgba(74,222,128,0.08);border-color:#4ade80;box-shadow:0 0 20px rgba(74,222,128,0.15)}
        .proj-link{color:${muted};font-size:12px;display:inline-flex;align-items:center;gap:4px;transition:all 0.2s;border:1px solid ${border};padding:5px 13px;border-radius:100px;text-decoration:none;cursor:none}
        .proj-link:hover{color:#a78bfa;border-color:#a78bfa;transform:translateY(-2px)}
        section{padding:6rem 4rem;position:relative;z-index:2}
        .sl-label{font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#a78bfa;margin-bottom:0.8rem;display:flex;align-items:center;gap:10px}
        .sl-label::before{content:'';width:20px;height:1px;background:#a78bfa}
        .toggle-btn{width:52px;height:28px;border-radius:100px;border:1px solid ${border};background:${card};cursor:none;position:relative;transition:all 0.3s;display:flex;align-items:center;padding:3px;flex-shrink:0}
        .toggle-knob{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#f472b6);transition:transform 0.3s;flex-shrink:0}
        .side-socials{position:fixed;left:24px;top:50%;transform:translateY(-50%);z-index:50;display:flex;flex-direction:column;align-items:center;gap:12px}
        .side-link{color:${muted};text-decoration:none;transition:all 0.2s;writing-mode:vertical-rl;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;cursor:none}
        .side-link:hover{color:#a78bfa;transform:translateX(2px)}
        .side-line{width:1px;height:60px;background:linear-gradient(${border},transparent)}
        @media(max-width:768px){section{padding:4rem 1.5rem}.about-grid{grid-template-columns:1fr!important;gap:2rem!important}.skills-grid{grid-template-columns:1fr 1fr!important}.proj-grid{grid-template-columns:1fr!important}.edu-grid{grid-template-columns:1fr!important;gap:2rem!important}.stats-grid{grid-template-columns:1fr 1fr!important}nav{padding:1rem 1.5rem!important}.nav-links{display:none!important}.hero-section{padding:5rem 1.5rem 3rem!important}.side-socials{display:none!important}}
      `}</style>

      {/* Side Socials */}
      <div className="side-socials">
        <div className="side-line" />
        <a href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer" className="side-link">GitHub</a>
        <a href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer" className="side-link">LinkedIn</a>
        <a href="mailto:anandsarmak@gmail.com" className="side-link">Email</a>
        <div className="side-line" style={{ background: `linear-gradient(transparent,${border})` }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 4rem", background: scrolled ? (dark ? "rgba(8,8,16,0.94)" : "rgba(248,247,255,0.94)") : "transparent", backdropFilter: "blur(24px)", borderBottom: `1px solid ${scrolled ? border : "transparent"}`, transition: "all 0.3s" }}>
        <span className="syne" style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: text }}>AK<span style={{ color: "#a78bfa" }}>.</span></span>
        <div className="nav-links" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["About","Skills","Projects","Education","Contact"].map(n => (
            <button key={n} className="nav-link" onClick={() => scrollTo(n)}>{n}</button>
          ))}
          <button className="toggle-btn" onClick={() => setDark(!dark)}>
            <div className="toggle-knob" style={{ transform: dark ? "translateX(0)" : "translateX(24px)" }} />
            <span style={{ position: "absolute", right: dark ? 6 : "auto", left: dark ? "auto" : 6, fontSize: 11 }}>{dark ? "🌙" : "☀️"}</span>
          </button>
          <MagBtn className="btn-primary" style={{ padding: "8px 20px", fontSize: "12px" }} onClick={() => scrollTo("contact")}>Hire Me</MagBtn>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" className="hero-section" style={{ minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem 3rem", position: "relative", overflow: "hidden", zIndex: 2 }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(123,94,167,0.15) 0%,transparent 70%)", top: -150, right: -150, pointerEvents: "none", animation: "floatA 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(74,222,128,0.06) 0%,transparent 70%)", bottom: 0, left: "5%", pointerEvents: "none", animation: "floatB 12s ease-in-out infinite" }} />
        <div style={{ position: "absolute", right: "8%", top: "18%", width: 200, height: 200, borderRadius: "50%", border: "1px dashed rgba(167,139,250,0.15)", animation: "spinSlow 25s linear infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "10.5%", top: "21%", width: 140, height: 140, borderRadius: "50%", border: "1px dashed rgba(244,114,182,0.12)", animation: "spinSlow 16s linear infinite reverse", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "2rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(74,222,128,0.35)", borderRadius: 100, padding: "6px 16px", fontSize: 11, color: "#4ade80", letterSpacing: "0.08em" }}>
              <div style={{ width: 7, height: 7, background: "#4ade80", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              Available for opportunities
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${border}`, borderRadius: 100, padding: "6px 16px", fontSize: 11, color: muted }}>
              🕐 <Clock />
            </div>
          </div>

          <div style={{ fontSize: "0.9rem", color: muted, marginBottom: "0.3rem" }}>Hello, I'm</div>
          <h1 className="syne" style={{ fontSize: "clamp(3.5rem,9vw,8rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "0.2rem", color: text }}>
            Anand<br />
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Kundurthi</span>
          </h1>

          <div className="syne" style={{ fontSize: "clamp(1.1rem,3vw,1.7rem)", fontWeight: 700, margin: "1.2rem 0", letterSpacing: "-0.02em", minHeight: "2.2rem" }}>
            <TypingText />
          </div>

          <p style={{ fontSize: "clamp(0.9rem,2vw,1.05rem)", color: muted, maxWidth: 500, margin: "1rem 0 2.5rem", lineHeight: 1.9 }}>
            Full-Stack Developer skilled in Python, FastAPI, React.js, SQL, and MERN stack. I build and deploy production-ready web applications — from scalable backend APIs to polished, responsive frontends.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <MagBtn className="btn-primary" onClick={() => scrollTo("projects")}>View Projects ↓</MagBtn>
            <MagBtn className="btn-ghost" href="https://ai-resume-analyzer-tuet.onrender.com" target="_blank" rel="noreferrer">Live Project ↗</MagBtn>
            <MagBtn className="btn-resume" href="https://drive.google.com/file/d/YOUR_RESUME_DRIVE_ID/view" target="_blank" rel="noreferrer">⬇ Resume</MagBtn>
            <MagBtn className="btn-ghost" onClick={() => scrollTo("contact")}>Say Hello 👋</MagBtn>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", padding: "1rem 0", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, background: bg2, position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", gap: "3rem", width: "max-content", animation: "marquee 24s linear infinite" }}>
          {marqueeItems.map((t, i) => (
            <span key={i} className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: muted, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "1.5rem" }}>
              {t} <span style={{ color: "#a78bfa" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section style={{ padding: "6rem 4rem" }}>
        <div className="sl-label">About Me</div>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <Reveal>
            <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem", color: text }}>Turning ideas<br />into reality.</h2>
            <p style={{ fontSize: "0.97rem", color: muted, lineHeight: 2, marginBottom: "2rem" }}>
              I'm <strong style={{ color: text, fontWeight: 500 }}>Anand Venkata Raghava Sai Kundurthi</strong> from <strong style={{ color: text, fontWeight: 500 }}>Nuzvid, Andhra Pradesh</strong>. I thrive where clean code meets beautiful design.
              <br /><br />
              With hands-on <strong style={{ color: text, fontWeight: 500 }}>Full-Stack experience</strong> building and deploying real projects, UI/UX work at <strong style={{ color: text, fontWeight: 500 }}>Diigoo</strong>, and intensive training at <strong style={{ color: text, fontWeight: 500 }}>NxtWave CCBP 4.0</strong>, I build across the full stack.
            </p>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {STATS.map(s => (
                <div key={s.label} className="stat-box">
                  <div className="syne" style={{ fontSize: "2rem", fontWeight: 800, color: "#a78bfa", lineHeight: 1, marginBottom: 4 }}>
                    <Counter target={s.n} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: 12, color: muted }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="exp-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", color: text }}>MERN Stack UI/UX Developer</span>
                <span style={{ fontSize: 11, color: "#f472b6", background: "rgba(244,114,182,0.1)", padding: "3px 10px", borderRadius: 100 }}>Apr – Jul 2025</span>
              </div>
              <div style={{ fontSize: 13, color: "#a78bfa", marginBottom: 8 }}>Diigoo Tech · Hyderabad</div>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.7 }}>Designed responsive UIs in Figma, created wireframes and prototypes, conducted usability testing, and collaborated with dev teams for smooth design-to-dev handoff.</p>
            </div>
            <div className="exp-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", color: text }}>CCBP 4.0 Fellow</span>
                <span style={{ fontSize: 11, color: "#f472b6", background: "rgba(244,114,182,0.1)", padding: "3px 10px", borderRadius: 100 }}>2025 – Ongoing</span>
              </div>
              <div style={{ fontSize: 13, color: "#a78bfa", marginBottom: 8 }}>NxtWave</div>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.7 }}>Intensive training in Python, SQL, React.js, FastAPI, DSA, and DBMS with real project-based learning and industry-aligned curriculum.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "6rem 4rem", background: bg2 }}>
        <div className="sl-label">Skills</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.8rem", color: text }}>What I Bring</h2>
          <p style={{ color: muted, fontSize: "0.95rem", marginBottom: "3rem" }}>From building APIs to designing pixel-perfect interfaces.</p>
        </Reveal>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem" }}>
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.07}>
              <div className="skill-card">
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{s.icon}</div>
                <div className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.8rem", color: text }}>{s.name}</div>
                <div>{s.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 4rem" }}>
        <div className="sl-label">My Work</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.8rem", color: text }}>Featured Projects</h2>
          <p style={{ color: muted, fontSize: "0.95rem", marginBottom: "3rem" }}>Real code I've written and shipped — hover to preview live projects ✦</p>
        </Reveal>
        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <ProjectCard p={p} dark={dark} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "6rem 4rem", background: bg2 }}>
        <div className="sl-label">Background</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "3rem", color: text }}>Education &<br />Certifications</h2>
        </Reveal>
        <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: muted, marginBottom: "1.5rem" }}>Academic</div>
            {[
              { year: "Feb 2025 – Ongoing", institute: "NxtWave CCBP 4.0 Intensive", degree: "Full Stack Development Program", color: "#a78bfa" },
              { year: "2018 – 2021", institute: "Krishna University, Machilipatnam", degree: "Bachelor of Commerce (Computers)", color: "#f472b6" },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: "1.2rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 12, height: 12, background: e.color, borderRadius: "50%", marginTop: 4, flexShrink: 0 }} />
                  {i === 0 && <div style={{ width: 1, height: 44, background: border, marginTop: 6 }} />}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: e.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{e.year}</div>
                  <div className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 3, color: text }}>{e.institute}</div>
                  <div style={{ fontSize: 13, color: muted }}>{e.degree}</div>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: muted, marginBottom: "1.5rem" }}>Certifications</div>
            {certs.map(c => (
              <div key={c.name} className="cert-item">
                <span style={{ fontSize: "1.4rem" }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: text }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: muted }}>{c.by}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem 4rem", textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: 600, margin: "0 auto", background: card, border: `1px solid ${border}`, borderRadius: 28, padding: "4rem 3rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, left: -60, width: 200, height: 200, background: "radial-gradient(circle,rgba(123,94,167,0.2),transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle,rgba(244,114,182,0.15),transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.2rem" }}>👋</div>
              <h2 className="syne" style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem", color: text }}>
                Let's build something<br />great together!
              </h2>
              <p style={{ color: muted, fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "2.5rem" }}>
                Open to Full-Stack, Backend, and Frontend Developer roles.<br />
                Also open to internships, collaborations, and creative challenges.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                <MagBtn className="btn-primary" href="mailto:anandsarmak@gmail.com">📧 Send Email</MagBtn>
                <MagBtn className="btn-ghost" href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer">LinkedIn ↗</MagBtn>
                <MagBtn className="btn-ghost" href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer">GitHub ↗</MagBtn>
              </div>
              <div style={{ fontSize: 12, color: muted }}>📍 Nuzvid, Andhra Pradesh &nbsp;·&nbsp; 📞 +91 7093254137</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "1.5rem 4rem", borderTop: `1px solid ${border}`, fontSize: 12, color: muted, position: "relative", zIndex: 2 }}>
        Crafted with 💜 curiosity · ☕ coffee · 💻 way too many open tabs &nbsp;·&nbsp; © 2025 Anand Kundurthi
      </footer>
    </div>
  );
}HTMLEOF
