import { useState, useEffect, useRef } from "react";

const projects = [
  {
    emoji: "📄", year: "2025", type: "Python · FastAPI · SQLite", name: "AI Resume Analyzer",
    desc: "A full-stack resume analysis tool that compares resumes against job descriptions using a skill-based matching algorithm. Features user authentication, PDF extraction, animated match score, skill gap analysis, and career suggestions.",
    github: "https://github.com/anandkundurthi/ai-resume-analyzer",
    live: "https://ai-resume-analyzer-tuet.onrender.com",
    color: "#6ee7f7", num: "01",
  },
  {
    emoji: "🛒", year: "2025", type: "SQL · MySQL · Database", name: "SupplySync",
    desc: "A retail-focused MySQL project simulating real supermarket operations — inventory tracking, supplier handling, customer sales & billing, and business analytics with 20+ real-world SQL solutions.",
    github: "https://github.com/anandkundurthi/Dmart_mall_management",
    live: null, color: "#a5f3c0", num: "02",
  },
  {
    emoji: "🎨", year: "2025", type: "HTML · CSS · JavaScript", name: "Color Picker",
    desc: "An interactive color picker built with vanilla HTML, CSS, and JavaScript. Demonstrates core frontend skills — DOM manipulation, event handling, and dynamic UI updates.",
    github: "https://github.com/anandkundurthi/colorPicker",
    live: null, color: "#f0abfc", num: "03",
  },
  {
    emoji: "🚦", year: "2025", type: "HTML · CSS · JavaScript", name: "Traffic Light Simulation",
    desc: "An interactive traffic light with timed Red, Yellow, and Green cycles using JavaScript state machines with setInterval timing logic and CSS class toggling.",
    github: "https://github.com/anandkundurthi/traffic_light",
    live: null, color: "#fde68a", num: "04",
  },
  {
    emoji: "🖌️", year: "2025", type: "Figma · UI/UX · Canva", name: "Diigoo Internship Designs",
    desc: "Production-ready UI components and design systems built for real clients during my 4-month internship at Diigoo, Hyderabad. Wireframing, prototyping, and design-to-dev handoff.",
    github: "https://www.linkedin.com/in/anand-venkata-raghava-saikundurthi-75914a358",
    live: null, color: "#fca5a5", num: "05",
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
  { num: "01", name: "Programming Foundations with Python", by: "NxtWave CCBP 4.0" },
  { num: "02", name: "Complete Guide to SQL for Data Engineering", by: "Beginner to Advanced" },
  { num: "03", name: "Build Your Own Responsive Website", by: "NxtWave CCBP 4.0" },
  { num: "04", name: "Build Your Own Static Website", by: "NxtWave CCBP 4.0" },
];

const TYPING_WORDS = ["Full-Stack Developer", "UI/UX Designer", "Python Engineer", "React Developer", "Problem Solver"];
const STATS = [
  { n: 4, suffix: "+", label: "Months Industry XP" },
  { n: 5, suffix: "+", label: "Certifications" },
  { n: 6, suffix: "", label: "GitHub Projects" },
  { n: 100, suffix: "%", label: "Willingness to Learn" },
];

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
      {text}<span style={{ animation: "blink 1s step-end infinite" }}>_</span>
    </span>
  );
}

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 50;
        const inc = target / steps;
        let cur = 0, i = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, target);
          setCount(Math.floor(cur));
          i++;
          if (i >= steps) clearInterval(t);
        }, 1200 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
    }}>
      {children}
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      try {
        setTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      } catch(e) {
        setTime(new Date().toLocaleTimeString());
      }
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);
  return <span>{time} IST</span>;
}

function ProjectRow({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1fr 130px",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1.6rem 2rem",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: hov ? "rgba(110,231,247,0.03)" : "transparent",
        transition: "background 0.3s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 3, height: 32, background: hov ? p.color : "rgba(255,255,255,0.1)", borderRadius: 2, transition: "background 0.3s", flexShrink: 0 }} />
        <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{p.num}</span>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 5, flexWrap: "wrap" }}>
          <span style={{ fontSize: "1rem", fontWeight: 700, color: hov ? p.color : "#f0f0f8", transition: "color 0.3s", fontFamily: "'Syne', sans-serif" }}>
            {p.emoji} {p.name}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.type}</span>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
        <a href={p.github} target="_blank" rel="noreferrer" style={{
          fontSize: 11, color: hov ? p.color : "rgba(255,255,255,0.4)", textDecoration: "none",
          border: `1px solid ${hov ? p.color : "rgba(255,255,255,0.12)"}`,
          padding: "5px 12px", borderRadius: 4, transition: "all 0.25s", letterSpacing: "0.05em",
          whiteSpace: "nowrap",
        }}>↗ View</a>
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" style={{
            fontSize: 11, color: "#4ade80", textDecoration: "none",
            border: "1px solid rgba(74,222,128,0.3)",
            padding: "5px 12px", borderRadius: 4, transition: "all 0.25s",
            whiteSpace: "nowrap",
          }}>⬢ Live</a>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#060810", color: "#e8e8f0", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #060810; }
        ::-webkit-scrollbar-thumb { background: #6ee7f7; border-radius: 2px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulseGreen { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.4)} 50%{box-shadow:0 0 0 6px rgba(74,222,128,0)} }
        .syne { font-family: 'Syne', sans-serif !important; }
        .nav-btn {
          background: none; border: none; color: rgba(232,232,240,0.45);
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif; transition: color 0.2s; padding: 6px 0;
          cursor: pointer;
        }
        .nav-btn:hover { color: #6ee7f7; }
        .btn-cyan {
          display: inline-flex; align-items: center; gap: 8px;
          background: #6ee7f7; color: #060810; padding: 12px 26px;
          border: none; border-radius: 4px; font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; font-family: monospace;
          text-decoration: none; transition: all 0.25s; cursor: pointer;
        }
        .btn-cyan:hover { background: #a5f3fc; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(110,231,247,0.25); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(232,232,240,0.65); padding: 11px 22px;
          border: 1px solid rgba(232,232,240,0.15); border-radius: 4px; font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase; font-family: monospace;
          text-decoration: none; transition: all 0.25s; cursor: pointer;
        }
        .btn-ghost:hover { border-color: #6ee7f7; color: #6ee7f7; transform: translateY(-2px); }
        .btn-green {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #4ade80; padding: 11px 22px;
          border: 1px solid rgba(74,222,128,0.3); border-radius: 4px; font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase; font-family: monospace;
          text-decoration: none; transition: all 0.25s; cursor: pointer;
        }
        .btn-green:hover { background: rgba(74,222,128,0.07); border-color: #4ade80; transform: translateY(-2px); }
        .stat-card {
          border: 1px solid rgba(255,255,255,0.07); border-radius: 6px;
          padding: 1.4rem 1rem; text-align: center;
          background: rgba(255,255,255,0.02); transition: border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover { border-color: rgba(110,231,247,0.3); transform: translateY(-4px); }
        .skill-pill {
          display: inline-block; border: 1px solid rgba(110,231,247,0.15);
          color: rgba(232,232,240,0.5); padding: 4px 12px; border-radius: 3px;
          font-size: 11px; margin: 3px; letter-spacing: 0.05em; font-family: monospace;
          transition: all 0.2s;
        }
        .skill-pill:hover { border-color: #6ee7f7; color: #6ee7f7; background: rgba(110,231,247,0.05); }
        .skill-cell { background: #060810; padding: 1.8rem; transition: background 0.3s; }
        .skill-cell:hover { background: rgba(110,231,247,0.03); }
        .cert-row {
          display: flex; align-items: center; gap: 1.2rem;
          padding: 1rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s;
        }
        .cert-row:last-child { border-bottom: none; }
        .cert-row:hover { background: rgba(110,231,247,0.03); }
        .exp-block {
          border-left: 1px solid rgba(255,255,255,0.08); padding-left: 1.6rem;
          margin-bottom: 2.2rem; position: relative;
        }
        .exp-block::before {
          content: ''; position: absolute; left: -5px; top: 4px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #6ee7f7; box-shadow: 0 0 10px rgba(110,231,247,0.5);
        }
        .section-label {
          font-family: monospace; font-size: 10px; letter-spacing: 0.25em;
          text-transform: uppercase; color: #6ee7f7; margin-bottom: 1rem;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after { content: ''; width: 40px; height: 1px; background: rgba(110,231,247,0.3); }
        .social-link {
          color: rgba(232,232,240,0.3); text-decoration: none; font-size: 9px;
          letter-spacing: 0.15em; text-transform: uppercase; font-family: monospace;
          writing-mode: vertical-rl; transition: color 0.25s;
        }
        .social-link:hover { color: #6ee7f7; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .side-socials { display: none !important; }
          .hero-section { padding: 5rem 1.5rem 3rem !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .edu-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          section { padding: 4rem 1.5rem !important; }
          nav { padding: 1rem 1.5rem !important; }
        }
      `}</style>

      {/* Side Socials */}
      <div className="side-socials" style={{ position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ width: 1, height: 50, background: "linear-gradient(transparent, rgba(110,231,247,0.2))" }} />
        <a href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
        <a href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
        <a href="mailto:anandsarmak@gmail.com" className="social-link">Email</a>
        <div style={{ width: 1, height: 50, background: "linear-gradient(rgba(110,231,247,0.2), transparent)" }} />
      </div>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.2rem 4rem",
        background: scrolled ? "rgba(6,8,16,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.06)" : "transparent"}`,
        transition: "all 0.4s",
      }}>
        <span className="syne" style={{ fontWeight: 800, fontSize: "1.1rem", color: "#f0f0f8" }}>
          AK<span style={{ color: "#6ee7f7" }}>.</span>
        </span>
        <div className="nav-links" style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
          {["About","Skills","Projects","Education","Contact"].map(n => (
            <button key={n} className="nav-btn" onClick={() => scrollTo(n)}>{n}</button>
          ))}
          <button className="btn-cyan" style={{ padding: "8px 18px", fontSize: 10 }} onClick={() => scrollTo("contact")}>
            Hire Me
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" className="hero-section" style={{ minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem 3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "7%", top: "12%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(110,231,247,0.05)", animation: "spin 40s linear infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "9.5%", top: "15.5%", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(110,231,247,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "12%", top: "19%", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(110,231,247,0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(110,231,247,0.05) 0%,transparent 70%)", top: -120, right: -120, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(165,243,192,0.04) 0%,transparent 70%)", bottom: 0, left: "8%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(74,222,128,0.3)", borderRadius: 3, padding: "6px 14px", fontSize: 10, color: "#4ade80", letterSpacing: "0.1em", fontFamily: "monospace", textTransform: "uppercase" }}>
              <div style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", animation: "pulseGreen 2s infinite" }} />
              Available for Opportunities
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, padding: "6px 14px", fontSize: 10, color: "rgba(232,232,240,0.4)", fontFamily: "monospace" }}>
              <Clock />
            </div>
          </div>

          <div style={{ fontSize: 11, color: "rgba(110,231,247,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.7rem", fontFamily: "monospace" }}>
            Hello, I'm
          </div>

          <h1 className="syne" style={{ fontSize: "clamp(3.5rem,9vw,8.5rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "1.4rem", color: "#f0f0f8" }}>
            Anand<br />
            <span style={{
              background: "linear-gradient(135deg, #6ee7f7 0%, #a5f3fc 40%, #6ee7f7 70%, #a5f3c0 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}>Kundurthi</span>
          </h1>

          <div className="syne" style={{ fontSize: "clamp(1rem,2.5vw,1.5rem)", fontWeight: 600, margin: "0 0 1.4rem", minHeight: "2rem", color: "rgba(232,232,240,0.65)" }}>
            <TypingText />
          </div>

          <p style={{ fontSize: "clamp(0.88rem,1.5vw,1rem)", color: "rgba(232,232,240,0.42)", maxWidth: 480, lineHeight: 1.9, marginBottom: "2.8rem" }}>
            Full-Stack Developer skilled in Python, FastAPI, React.js, SQL, and MERN stack. I build production-ready web applications from scalable APIs to pixel-perfect frontends.
          </p>

          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <button className="btn-cyan" onClick={() => scrollTo("projects")}>View Projects</button>
            <a href="https://ai-resume-analyzer-tuet.onrender.com" target="_blank" rel="noreferrer" className="btn-ghost">Live Project</a>
            <a href="https://drive.google.com/file/d/YOUR_RESUME_DRIVE_ID/view" target="_blank" rel="noreferrer" className="btn-green">Resume</a>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}>Say Hello</button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", padding: "0.8rem 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(110,231,247,0.015)" }}>
        <div style={{ display: "flex", gap: "3rem", width: "max-content", animation: "marquee 26s linear infinite" }}>
          {["Python","React.js","FastAPI","Figma","SQL","Full-Stack","MERN","JavaScript","Node.js","MongoDB","Python","React.js","FastAPI","Figma","SQL","Full-Stack","MERN","JavaScript","Node.js","MongoDB"].map((t, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,240,0.22)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "1.5rem", fontFamily: "monospace" }}>
              {t} <span style={{ color: "#6ee7f7", opacity: 0.4 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section style={{ padding: "7rem 4rem" }}>
        <div className="section-label">About Me</div>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <Reveal>
            <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.6rem", color: "#f0f0f8" }}>
              Turning ideas<br />into reality.
            </h2>
            <p style={{ fontSize: "0.93rem", color: "rgba(232,232,240,0.48)", lineHeight: 2, marginBottom: "2.4rem" }}>
              I'm <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>Anand Venkata Raghava Sai Kundurthi</strong> from <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>Nuzvid, Andhra Pradesh</strong>. I thrive where clean code meets beautiful design.
              <br /><br />
              With hands-on <strong style={{ color: "#6ee7f7", fontWeight: 500 }}>Full-Stack experience</strong> building and deploying real projects, UI/UX work at <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>Diigoo</strong>, and intensive training at <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>NxtWave CCBP 4.0</strong>, I build across the full stack.
            </p>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              {STATS.map(s => (
                <div key={s.label} className="stat-card">
                  <div className="syne" style={{ fontSize: "2rem", fontWeight: 800, color: "#6ee7f7", lineHeight: 1, marginBottom: 6 }}>
                    <Counter target={s.n} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(232,232,240,0.32)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "monospace" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="section-label" style={{ marginBottom: "1.6rem" }}>Experience</div>
            <div className="exp-block">
              <div style={{ fontSize: 10, color: "#6ee7f7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7, fontFamily: "monospace" }}>Apr - Jul 2025</div>
              <div className="syne" style={{ fontWeight: 700, fontSize: "0.93rem", marginBottom: 3, color: "#f0f0f8" }}>MERN Stack UI/UX Developer</div>
              <div style={{ fontSize: 11, color: "rgba(110,231,247,0.5)", marginBottom: 9, fontFamily: "monospace" }}>Diigoo Tech · Hyderabad</div>
              <p style={{ fontSize: 13, color: "rgba(232,232,240,0.43)", lineHeight: 1.8 }}>Designed responsive UIs in Figma, created wireframes and prototypes, conducted usability testing, and collaborated with dev teams for smooth design-to-dev handoff.</p>
            </div>
            <div className="exp-block">
              <div style={{ fontSize: 10, color: "#a5f3c0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7, fontFamily: "monospace" }}>2025 - Ongoing</div>
              <div className="syne" style={{ fontWeight: 700, fontSize: "0.93rem", marginBottom: 3, color: "#f0f0f8" }}>CCBP 4.0 Fellow</div>
              <div style={{ fontSize: 11, color: "rgba(165,243,192,0.5)", marginBottom: 9, fontFamily: "monospace" }}>NxtWave</div>
              <p style={{ fontSize: 13, color: "rgba(232,232,240,0.43)", lineHeight: 1.8 }}>Intensive training in Python, SQL, React.js, FastAPI, DSA, and DBMS with real project-based learning and industry-aligned curriculum.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "7rem 4rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="section-label">Skills</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.7rem", color: "#f0f0f8" }}>What I Bring</h2>
          <p style={{ color: "rgba(232,232,240,0.38)", fontSize: "0.92rem", marginBottom: "3rem" }}>From building APIs to designing pixel-perfect interfaces.</p>
        </Reveal>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="skill-cell">
                <div style={{ fontSize: "1.3rem", marginBottom: "0.9rem", color: "#6ee7f7" }}>{s.icon}</div>
                <div className="syne" style={{ fontWeight: 700, fontSize: "0.93rem", marginBottom: "0.9rem", color: "#f0f0f8" }}>{s.name}</div>
                <div>{s.tags.map(t => <span key={t} className="skill-pill">{t}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "7rem 4rem" }}>
        <div className="section-label">My Work</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.7rem", color: "#f0f0f8" }}>Featured Projects</h2>
          <p style={{ color: "rgba(232,232,240,0.38)", fontSize: "0.92rem", marginBottom: "2.5rem" }}>Real code I have written and shipped.</p>
        </Reveal>
        <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden" }}>
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <ProjectRow p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "7rem 4rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="section-label">Background</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "3rem", color: "#f0f0f8" }}>Education and Certifications</h2>
        </Reveal>
        <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
          <Reveal>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,240,0.28)", marginBottom: "1.8rem", fontFamily: "monospace" }}>Academic</div>
            {[
              { year: "Feb 2025 - Ongoing", inst: "NxtWave CCBP 4.0 Intensive", deg: "Full Stack Development Program", color: "#6ee7f7" },
              { year: "2018 - 2021", inst: "Krishna University, Machilipatnam", deg: "Bachelor of Commerce (Computers)", color: "#a5f3c0" },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: "1.4rem", marginBottom: "2.2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, background: e.color, borderRadius: "50%", marginTop: 3, boxShadow: `0 0 10px ${e.color}55` }} />
                  {i === 0 && <div style={{ width: 1, height: 46, background: "linear-gradient(rgba(110,231,247,0.2),transparent)", marginTop: 5 }} />}
                </div>
                <div>
                  <div style={{ fontSize: 10, color: e.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5, fontFamily: "monospace" }}>{e.year}</div>
                  <div className="syne" style={{ fontWeight: 700, fontSize: "0.93rem", marginBottom: 3, color: "#f0f0f8" }}>{e.inst}</div>
                  <div style={{ fontSize: 12, color: "rgba(232,232,240,0.38)" }}>{e.deg}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,240,0.28)", marginBottom: "1.8rem", fontFamily: "monospace" }}>Certifications</div>
            <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
              {certs.map(c => (
                <div key={c.num} className="cert-row">
                  <span style={{ fontSize: 11, color: "#6ee7f7", minWidth: 26, opacity: 0.55, fontFamily: "monospace" }}>{c.num}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#f0f0f8", marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(232,232,240,0.32)", fontFamily: "monospace", letterSpacing: "0.05em" }}>{c.by}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem 4rem", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(110,231,247,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />
        <Reveal>
          <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Contact</div>
            <h2 className="syne" style={{ fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem", color: "#f0f0f8", lineHeight: 1.05 }}>
              Let's build something<br />
              <span style={{ color: "#6ee7f7" }}>great together.</span>
            </h2>
            <p style={{ color: "rgba(232,232,240,0.38)", fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "2.8rem" }}>
              Open to Full-Stack, Backend, and Frontend Developer roles.<br />
              Also open to internships, collaborations, and creative challenges.
            </p>
            <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.8rem" }}>
              <a href="mailto:anandsarmak@gmail.com" className="btn-cyan">Send Email</a>
              <a href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
              <a href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
            </div>
            <div style={{ fontSize: 11, color: "rgba(232,232,240,0.25)", fontFamily: "monospace", letterSpacing: "0.06em" }}>
              Nuzvid, Andhra Pradesh · +91 7093254137
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "1.5rem 4rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{ fontSize: 10, color: "rgba(232,232,240,0.18)", fontFamily: "monospace", letterSpacing: "0.1em" }}>
          Crafted with curiosity, coffee, and way too many open tabs · 2025 Anand Kundurthi
        </span>
      </footer>

    </div>
  );
}
