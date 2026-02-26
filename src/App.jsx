import { useState, useEffect, useRef } from "react";

// ─────────────────── DATA ───────────────────
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
    color: "#6ee7f7",
    num: "01",
  },
  {
    emoji: "🛒",
    year: "2025",
    type: "SQL · MySQL · Database",
    name: "SupplySync",
    desc: "A retail-focused MySQL project simulating real supermarket operations — inventory tracking, supplier handling, customer sales & billing, and business analytics with 20+ real-world SQL solutions.",
    github: "https://github.com/anandkundurthi/Dmart_mall_management",
    live: null,
    preview: null,
    color: "#a5f3c0",
    num: "02",
  },
  {
    emoji: "🎨",
    year: "2025",
    type: "HTML · CSS · JavaScript",
    name: "Color Picker",
    desc: "An interactive color picker built with vanilla HTML, CSS, and JavaScript. Demonstrates core frontend skills — DOM manipulation, event handling, and dynamic UI updates.",
    github: "https://github.com/anandkundurthi/colorPicker",
    live: null,
    preview: null,
    color: "#f0abfc",
    num: "03",
  },
  {
    emoji: "🚦",
    year: "2025",
    type: "HTML · CSS · JavaScript",
    name: "Traffic Light Simulation",
    desc: "An interactive traffic light with timed Red, Yellow, and Green cycles using JavaScript state machines with setInterval timing logic and CSS class toggling.",
    github: "https://github.com/anandkundurthi/traffic_light",
    live: null,
    preview: null,
    color: "#fde68a",
    num: "04",
  },
  {
    emoji: "🖌️",
    year: "2025",
    type: "Figma · UI/UX · Canva",
    name: "Diigoo Internship Designs",
    desc: "Production-ready UI components and design systems built for real clients during my 4-month internship at Diigoo, Hyderabad. Wireframing, prototyping, and design-to-dev handoff.",
    github: "https://www.linkedin.com/in/anand-venkata-raghava-saikundurthi-75914a358",
    live: null,
    preview: null,
    color: "#fca5a5",
    num: "05",
  },
];

const skills = [
  { icon: "⬡", name: "Backend Dev", tags: ["Python", "FastAPI", "Node.js", "REST APIs", "Express", "Uvicorn"] },
  { icon: "◈", name: "Frontend Dev", tags: ["React.js", "HTML5", "CSS3", "JavaScript", "Jinja2", "Responsive"] },
  { icon: "⬢", name: "Database", tags: ["SQL", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "SQLAlchemy"] },
  { icon: "◉", name: "UI/UX Design", tags: ["Figma", "Canva", "Wireframing", "Prototyping", "Usability"] },
  { icon: "⬣", name: "Tools & DevOps", tags: ["Git", "GitHub", "Linux", "PyPDF2", "Render", "Vite"] },
  { icon: "◈", name: "CS Fundamentals", tags: ["DSA", "OOP", "DBMS", "Problem Solving", "Debugging"] },
];

const certs = [
  { icon: "01", name: "Programming Foundations with Python", by: "NxtWave CCBP 4.0" },
  { icon: "02", name: "Complete Guide to SQL for Data Engineering", by: "Beginner to Advanced" },
  { icon: "03", name: "Build Your Own Responsive Website", by: "NxtWave CCBP 4.0" },
  { icon: "04", name: "Build Your Own Static Website", by: "NxtWave CCBP 4.0" },
];

const TYPING_WORDS = ["Full-Stack Developer", "UI/UX Designer", "Python Engineer", "React Developer", "Problem Solver"];
const STATS = [
  { n: 4, suffix: "+", label: "Months Industry XP" },
  { n: 5, suffix: "+", label: "Certifications" },
  { n: 6, suffix: "", label: "GitHub Projects" },
  { n: 100, suffix: "%", label: "Willingness to Learn" },
];

const NAV_ITEMS = ["About", "Skills", "Projects", "Education", "Contact"];

// ─────────────────── NOISE TEXTURE ───────────────────
function NoiseOverlay() {
  return (
    <svg style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.03, width: "100%", height: "100%" }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

// ─────────────────── CURSOR ───────────────────
function Cursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,.proj-row,.skill-pill").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    let raf;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (trailRef.current) {
        trailRef.current.style.left = pos.current.x + "px";
        trailRef.current.style.top = pos.current.y + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); };
  }, []);

  return (
    <>
      <div ref={trailRef} style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        width: hovering ? 56 : 40, height: hovering ? 56 : 40,
        border: `1px solid ${hovering ? "#6ee7f7" : "rgba(110,231,247,0.5)"}`,
        borderRadius: "50%", transform: "translate(-50%,-50%)",
        transition: "width 0.3s, height 0.3s, border-color 0.3s",
        mixBlendMode: "difference",
      }} />
      <div ref={cursorRef} style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        width: 5, height: 5,
        background: "#6ee7f7",
        borderRadius: "50%", transform: "translate(-50%,-50%)",
      }} />
    </>
  );
}

// ─────────────────── TYPING TEXT ───────────────────
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
    }, del ? 35 : text.length === word.length ? 1800 : 70);
    return () => clearTimeout(t);
  }, [text, del, idx]);
  return (
    <span style={{ color: "#6ee7f7" }}>
      {text}
      <span style={{ animation: "blink 1s step-end infinite", opacity: 1 }}>_</span>
    </span>
  );
}

// ─────────────────── COUNTER ───────────────────
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 50, inc = target / steps;
        let cur = 0, i = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, target); setCount(Math.floor(cur)); i++;
          if (i >= steps) clearInterval(t);
        }, 1200 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─────────────────── REVEAL ───────────────────
function Reveal({ children, delay = 0, from = "bottom" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const transforms = { bottom: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)" };
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : transforms[from] || transforms.bottom,
      transition: `opacity 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
    }}>
      {children}
    </div>
  );
}

// ─────────────────── CLOCK ───────────────────
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);
  return <span style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}>{time} IST</span>;
}

// ─────────────────── PROJECT ROW ───────────────────
function ProjectRow({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="proj-row"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr auto",
        alignItems: "center",
        gap: "2rem",
        padding: "1.8rem 2rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: hov ? "rgba(110,231,247,0.03)" : "transparent",
        transition: "background 0.3s",
        cursor: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 3, height: 36, background: hov ? p.color : "rgba(255,255,255,0.1)", borderRadius: 2, transition: "background 0.3s", flexShrink: 0 }} />
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{p.num}</span>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 6 }}>
          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: hov ? p.color : "#f0f0f8", transition: "color 0.3s", letterSpacing: "-0.01em" }}>
            {p.emoji} {p.name}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.type}</span>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 600 }}>{p.desc}</p>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "center" }}>
        <a href={p.github} target="_blank" rel="noreferrer" style={{
          fontSize: 11, color: hov ? p.color : "rgba(255,255,255,0.4)", textDecoration: "none",
          border: `1px solid ${hov ? p.color : "rgba(255,255,255,0.1)"}`,
          padding: "5px 14px", borderRadius: 4, transition: "all 0.25s", letterSpacing: "0.06em",
          textTransform: "uppercase", cursor: "none",
        }}>↗ View</a>
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" style={{
            fontSize: 11, color: "#4ade80", textDecoration: "none",
            border: "1px solid rgba(74,222,128,0.3)",
            padding: "5px 14px", borderRadius: 4, transition: "all 0.25s", letterSpacing: "0.06em",
            textTransform: "uppercase", cursor: "none",
          }}>⬢ Live</a>
        )}
      </div>
    </div>
  );
}

// ─────────────────── MAIN APP ───────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{
      background: "#060810",
      color: "#e8e8f0",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
      cursor: "none",
    }}>
      <NoiseOverlay />
      <Cursor />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #060810; }
        ::-webkit-scrollbar-thumb { background: #6ee7f7; border-radius: 2px; }
        .syne { font-family: 'Syne', sans-serif !important; }
        .mono { font-family: 'Space Mono', monospace !important; }
        a, button { cursor: none !important; }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(74,222,128,0.5)} 70%{box-shadow:0 0 0 8px rgba(74,222,128,0)} 100%{box-shadow:0 0 0 0 rgba(74,222,128,0)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .nav-item {
          background: none; border: none; color: rgba(232,232,240,0.45);
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif; transition: color 0.2s; padding: 6px 0;
          position: relative;
        }
        .nav-item::after {
          content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px;
          background: #6ee7f7; transition: width 0.3s;
        }
        .nav-item:hover { color: #6ee7f7; }
        .nav-item:hover::after { width: 100%; }
        .skill-pill {
          display: inline-block;
          border: 1px solid rgba(110,231,247,0.15);
          color: rgba(232,232,240,0.55);
          padding: 4px 13px; border-radius: 3px; font-size: 11px;
          margin: 3px; letter-spacing: 0.06em; font-family: 'Space Mono', monospace;
          transition: all 0.2s;
        }
        .skill-pill:hover { border-color: #6ee7f7; color: #6ee7f7; background: rgba(110,231,247,0.06); }
        .cert-row {
          display: flex; align-items: center; gap: 1.4rem;
          padding: 1.1rem 1.4rem; border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.25s;
        }
        .cert-row:hover { background: rgba(110,231,247,0.04); }
        .social-link {
          color: rgba(232,232,240,0.35); text-decoration: none; font-size: 10px;
          letter-spacing: 0.15em; text-transform: uppercase; font-family: 'Space Mono', monospace;
          writing-mode: vertical-rl; transition: color 0.25s, transform 0.25s;
        }
        .social-link:hover { color: #6ee7f7; transform: translateX(2px); }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #6ee7f7; color: #060810; padding: 13px 28px;
          border: none; border-radius: 4px; font-size: 12px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; font-family: 'Space Mono', monospace;
          text-decoration: none; transition: all 0.25s;
        }
        .btn-primary:hover { background: #a5f3fc; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(110,231,247,0.25); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(232,232,240,0.7); padding: 12px 24px;
          border: 1px solid rgba(232,232,240,0.18); border-radius: 4px; font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase; font-family: 'Space Mono', monospace;
          text-decoration: none; transition: all 0.25s;
        }
        .btn-outline:hover { border-color: #6ee7f7; color: #6ee7f7; transform: translateY(-2px); }
        .btn-green {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #4ade80; padding: 12px 24px;
          border: 1px solid rgba(74,222,128,0.3); border-radius: 4px; font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase; font-family: 'Space Mono', monospace;
          text-decoration: none; transition: all 0.25s;
        }
        .btn-green:hover { background: rgba(74,222,128,0.08); border-color: #4ade80; transform: translateY(-2px); }
        .stat-card {
          border: 1px solid rgba(255,255,255,0.07); border-radius: 6px;
          padding: 1.5rem 1.2rem; text-align: center;
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover { border-color: rgba(110,231,247,0.3); transform: translateY(-4px); }
        .exp-block {
          border-left: 1px solid rgba(255,255,255,0.08); padding-left: 1.8rem;
          margin-bottom: 2.5rem; position: relative;
        }
        .exp-block::before {
          content: ''; position: absolute; left: -5px; top: 4px;
          width: 9px; height: 9px; border-radius: 50%;
          background: #6ee7f7; box-shadow: 0 0 12px rgba(110,231,247,0.4);
        }
        .section-label {
          font-family: 'Space Mono', monospace; font-size: 10px;
          letter-spacing: 0.25em; text-transform: uppercase; color: #6ee7f7;
          margin-bottom: 1rem; display: flex; align-items: center; gap: 12px;
        }
        .section-label::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: rgba(110,231,247,0.3); }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .edu-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .proj-row { grid-template-columns: 1fr !important; gap: 1rem !important; }
          nav { padding: 1rem 1.5rem !important; }
          section { padding: 4rem 1.5rem !important; }
          .side-socials { display: none !important; }
          .hero-section { padding: 6rem 1.5rem 3rem !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* ── Side Socials ── */}
      <div className="side-socials" style={{ position: "fixed", left: 28, top: "50%", transform: "translateY(-50%)", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ width: 1, height: 60, background: "linear-gradient(transparent, rgba(110,231,247,0.2))" }} />
        <a href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
        <a href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
        <a href="mailto:anandsarmak@gmail.com" className="social-link">Email</a>
        <div style={{ width: 1, height: 60, background: "linear-gradient(rgba(110,231,247,0.2), transparent)" }} />
      </div>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.2rem 4rem",
        background: scrolled ? "rgba(6,8,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.06)" : "transparent"}`,
        transition: "all 0.4s",
      }}>
        <span className="syne" style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em", color: "#f0f0f8" }}>
          AK<span style={{ color: "#6ee7f7" }}>.</span>
        </span>
        <div className="nav-links" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {NAV_ITEMS.map(n => (
            <button key={n} className="nav-item" onClick={() => scrollTo(n)}>{n}</button>
          ))}
          <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 10 }} onClick={() => scrollTo("contact")}>
            Hire Me
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" className="hero-section" style={{ minHeight: "96vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem 3rem", position: "relative", zIndex: 2 }}>
        <div style={{ position: "absolute", right: "6%", top: "15%", width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(110,231,247,0.06)", animation: "spin 40s linear infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "8.5%", top: "18.5%", width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(110,231,247,0.04)", animation: "spin 25s linear infinite reverse", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "11%", top: "22%", width: 140, height: 140, borderRadius: "50%", border: "1px solid rgba(110,231,247,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(110,231,247,0.05) 0%,transparent 70%)", top: -100, right: -100, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(165,243,192,0.04) 0%,transparent 70%)", bottom: 0, left: "10%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(74,222,128,0.3)", borderRadius: 3, padding: "6px 16px", fontSize: 10, color: "#4ade80", letterSpacing: "0.1em", fontFamily: "'Space Mono', monospace", textTransform: "uppercase" }}>
              <div style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", animation: "pulse-ring 2s infinite" }} />
              Available for Opportunities
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, padding: "6px 16px", fontSize: 10, color: "rgba(232,232,240,0.4)", fontFamily: "'Space Mono', monospace" }}>
              <Clock />
            </div>
          </div>

          <div className="mono" style={{ fontSize: 11, color: "rgba(110,231,247,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            Hello, I'm
          </div>
          <h1 className="syne" style={{ fontSize: "clamp(4rem,10vw,9rem)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.04em", marginBottom: "1.5rem", color: "#f0f0f8" }}>
            Anand<br />
            <span style={{
              background: "linear-gradient(135deg, #6ee7f7 0%, #a5f3fc 40%, #6ee7f7 60%, #a5f3c0 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}>Kundurthi</span>
          </h1>

          <div className="syne" style={{ fontSize: "clamp(1rem,2.5vw,1.5rem)", fontWeight: 600, margin: "0 0 1.5rem", letterSpacing: "-0.01em", minHeight: "2rem", color: "rgba(232,232,240,0.7)" }}>
            <TypingText />
          </div>

          <p style={{ fontSize: "clamp(0.88rem,1.6vw,1rem)", color: "rgba(232,232,240,0.45)", maxWidth: 480, lineHeight: 1.9, marginBottom: "3rem", letterSpacing: "0.01em" }}>
            Full-Stack Developer skilled in Python, FastAPI, React.js, SQL, and MERN stack. I build production-ready web applications — from scalable APIs to pixel-perfect frontends.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects ↓</button>
            <a href="https://ai-resume-analyzer-tuet.onrender.com" target="_blank" rel="noreferrer" className="btn-outline">Live Project ↗</a>
            <a href="https://drive.google.com/file/d/YOUR_RESUME_DRIVE_ID/view" target="_blank" rel="noreferrer" className="btn-green">⬇ Resume</a>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>Say Hello</button>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", left: "4rem", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(rgba(110,231,247,0.3),transparent)" }} />
          <span className="mono" style={{ fontSize: 9, color: "rgba(232,232,240,0.25)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ── TICKER MARQUEE ── */}
      <div style={{ overflow: "hidden", padding: "0.9rem 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(110,231,247,0.02)", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", gap: "3rem", width: "max-content", animation: "marquee 28s linear infinite" }}>
          {[...Array(2)].map((_, si) =>
            ["Python","React.js","FastAPI","Figma","SQL","Full-Stack","MERN Stack","JavaScript","Node.js","MongoDB"].map((t, i) => (
              <span key={`${si}-${i}`} className="mono" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,240,0.25)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                {t} <span style={{ color: "#6ee7f7", opacity: 0.5 }}>✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section style={{ padding: "7rem 4rem", position: "relative", zIndex: 2 }}>
        <div className="section-label">About Me</div>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <Reveal>
            <h2 className="syne" style={{ fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.8rem", color: "#f0f0f8" }}>
              Turning ideas<br />into reality.
            </h2>
            <p style={{ fontSize: "0.95rem", color: "rgba(232,232,240,0.5)", lineHeight: 2, marginBottom: "2.5rem" }}>
              I'm <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>Anand Venkata Raghava Sai Kundurthi</strong> from <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>Nuzvid, Andhra Pradesh</strong>. I thrive where clean code meets beautiful design.
              <br /><br />
              With hands-on <strong style={{ color: "#6ee7f7", fontWeight: 500 }}>Full-Stack experience</strong> building and deploying real projects, UI/UX work at <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>Diigoo</strong>, and intensive training at <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>NxtWave CCBP 4.0</strong>, I build across the full stack.
            </p>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              {STATS.map(s => (
                <div key={s.label} className="stat-card">
                  <div className="syne" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#6ee7f7", lineHeight: 1, marginBottom: 6 }}>
                    <Counter target={s.n} suffix={s.suffix} />
                  </div>
                  <div className="mono" style={{ fontSize: 10, color: "rgba(232,232,240,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="section-label" style={{ marginBottom: "1.8rem" }}>Experience</div>
            <div className="exp-block">
              <div className="mono" style={{ fontSize: 10, color: "#6ee7f7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Apr – Jul 2025</div>
              <div className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 4, color: "#f0f0f8" }}>MERN Stack UI/UX Developer</div>
              <div className="mono" style={{ fontSize: 11, color: "rgba(110,231,247,0.5)", marginBottom: 10, letterSpacing: "0.06em" }}>Diigoo Tech · Hyderabad</div>
              <p style={{ fontSize: 13, color: "rgba(232,232,240,0.45)", lineHeight: 1.8 }}>Designed responsive UIs in Figma, created wireframes and prototypes, conducted usability testing, and collaborated with dev teams for smooth design-to-dev handoff.</p>
            </div>
            <div className="exp-block">
              <div className="mono" style={{ fontSize: 10, color: "#a5f3c0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>2025 – Ongoing</div>
              <div className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 4, color: "#f0f0f8" }}>CCBP 4.0 Fellow</div>
              <div className="mono" style={{ fontSize: 11, color: "rgba(165,243,192,0.5)", marginBottom: 10, letterSpacing: "0.06em" }}>NxtWave</div>
              <p style={{ fontSize: 13, color: "rgba(232,232,240,0.45)", lineHeight: 1.8 }}>Intensive training in Python, SQL, React.js, FastAPI, DSA, and DBMS with real project-based learning and industry-aligned curriculum.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "7rem 4rem", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 2 }}>
        <div className="section-label">Skills</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.8rem", color: "#f0f0f8" }}>What I Bring</h2>
          <p style={{ color: "rgba(232,232,240,0.4)", fontSize: "0.93rem", marginBottom: "3.5rem", letterSpacing: "0.02em" }}>From building APIs to designing pixel-perfect interfaces.</p>
        </Reveal>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div
                style={{ background: "#060810", padding: "2rem 1.8rem", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(110,231,247,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = "#060810"}
              >
                <div className="mono" style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "#6ee7f7" }}>{s.icon}</div>
                <div className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem", color: "#f0f0f8", letterSpacing: "-0.01em" }}>{s.name}</div>
                <div>{s.tags.map(t => <span key={t} className="skill-pill">{t}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "7rem 4rem", position: "relative", zIndex: 2 }}>
        <div className="section-label">My Work</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.8rem", color: "#f0f0f8" }}>Featured Projects</h2>
          <p style={{ color: "rgba(232,232,240,0.4)", fontSize: "0.93rem", marginBottom: "3rem", letterSpacing: "0.02em" }}>Real code I've written and shipped.</p>
        </Reveal>
        <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden" }}>
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <ProjectRow p={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={{ padding: "7rem 4rem", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 2 }}>
        <div className="section-label">Background</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "3.5rem", color: "#f0f0f8" }}>Education &<br />Certifications</h2>
        </Reveal>
        <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
          <Reveal>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,240,0.3)", marginBottom: "2rem" }}>Academic</div>
            {[
              { year: "Feb 2025 – Ongoing", inst: "NxtWave CCBP 4.0 Intensive", deg: "Full Stack Development Program", color: "#6ee7f7" },
              { year: "2018 – 2021", inst: "Krishna University, Machilipatnam", deg: "Bachelor of Commerce (Computers)", color: "#a5f3c0" },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, background: e.color, borderRadius: "50%", marginTop: 4, boxShadow: `0 0 10px ${e.color}60` }} />
                  {i === 0 && <div style={{ width: 1, height: 50, background: "linear-gradient(rgba(110,231,247,0.2),transparent)", marginTop: 6 }} />}
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: e.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{e.year}</div>
                  <div className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 4, color: "#f0f0f8" }}>{e.inst}</div>
                  <div style={{ fontSize: 12, color: "rgba(232,232,240,0.4)" }}>{e.deg}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,240,0.3)", marginBottom: "2rem" }}>Certifications</div>
            <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
              {certs.map(c => (
                <div key={c.name} className="cert-row">
                  <span className="mono" style={{ fontSize: 11, color: "#6ee7f7", minWidth: 28, opacity: 0.6 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#f0f0f8", marginBottom: 2 }}>{c.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: "rgba(232,232,240,0.35)", letterSpacing: "0.06em" }}>{c.by}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "7rem 4rem", position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(110,231,247,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />
        <Reveal>
          <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Contact</div>
            <h2 className="syne" style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.2rem", color: "#f0f0f8", lineHeight: 1.05 }}>
              Let's build something<br /><span style={{ color: "#6ee7f7" }}>great together.</span>
            </h2>
            <p style={{ color: "rgba(232,232,240,0.4)", fontSize: "0.92rem", lineHeight: 1.9, marginBottom: "3rem", letterSpacing: "0.02em" }}>
              Open to Full-Stack, Backend, and Frontend Developer roles.<br />
              Also open to internships, collaborations, and creative challenges.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
              <a href="mailto:anandsarmak@gmail.com" className="btn-primary">📧 Send Email</a>
              <a href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn ↗</a>
              <a href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer" className="btn-outline">GitHub ↗</a>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "rgba(232,232,240,0.28)", letterSpacing: "0.08em" }}>
              📍 Nuzvid, Andhra Pradesh &nbsp;·&nbsp; 📞 +91 7093254137
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: "center", padding: "1.5rem 4rem", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 2 }}>
        <span className="mono" style={{ fontSize: 10, color: "rgba(232,232,240,0.2)", letterSpacing: "0.12em" }}>
          Crafted with curiosity · coffee · way too many open tabs &nbsp;·&nbsp; © 2025 Anand Kundurthi
        </span>
      </footer>
    </div>
  );
