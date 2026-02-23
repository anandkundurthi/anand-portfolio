import { useState, useEffect } from "react";

const projects = [
  {
    emoji: "🛒",
    year: "2025",
    type: "SQL · MySQL · Database",
    name: "SupplySync — Product & Stock Management Database",
    desc: "A retail-focused MySQL project simulating real supermarket operations — inventory tracking, supplier handling, customer sales & billing, and business analytics. Designed a normalized 3NF database and solved 20+ real-world business problems with SQL.",
    github: "https://github.com/anandkundurthi/Dmart_mall_management",
    bg: "linear-gradient(135deg,#001a33,#002d5e,#003f85)",
    accent: "#60a5fa",
  },
  {
    emoji: "📚",
    year: "2025",
    type: "SQL · MySQL · Database",
    name: "BiblioBase — Library Management Database System",
    desc: "A comprehensive library management system built with MySQL — handling book cataloging, member records, issue & return tracking, fine calculation, and availability queries. Demonstrates relational database design and real-world SQL problem solving.",
    github: "https://github.com/anandkundurthi/library-management-sql",
    bg: "linear-gradient(135deg,#1a0a00,#3d1f00,#6b3800)",
    accent: "#fb923c",
  },
  {
    emoji: "🎨",
    year: "2025",
    type: "HTML · CSS · JavaScript",
    name: "Color Picker",
    desc: "An interactive color picker built with vanilla HTML, CSS, and JavaScript. Demonstrates core frontend skills — DOM manipulation, event handling, and dynamic UI updates with no external dependencies.",
    github: "https://github.com/anandkundurthi/colorPicker",
    bg: "linear-gradient(135deg,#1a003a,#3d0070,#7c1fff)",
    accent: "#c084fc",
  },
  {
    emoji: "🚦",
    year: "2025",
    type: "HTML · CSS · JavaScript",
    name: "Traffic Light Simulation",
    desc: "An interactive traffic light with timed Red, Yellow, and Green cycles. Uses JavaScript state machines with setInterval timing logic and CSS class toggling to replicate real-world signal behavior.",
    github: "https://github.com/anandkundurthi/traffic_light",
    bg: "linear-gradient(135deg,#001400,#002800,#005200)",
    accent: "#4ade80",
  },
  {
    emoji: "🖌️",
    year: "2025",
    type: "Figma · UI/UX · Canva",
    name: "Diigoo Internship Designs",
    desc: "Production-ready UI components and design systems built for real clients during my 4-month internship at Diigoo, Hyderabad. Wireframing, prototyping, usability testing, and seamless design-to-dev handoff.",
    github: "https://www.linkedin.com/in/anand-venkata-raghava-saikundurthi-75914a358",
    bg: "linear-gradient(135deg,#1a0533,#2d1060,#4a1a8f)",
    accent: "#f472b6",
  },
];

const skills = [
  { icon: "🎨", name: "UI/UX Design", tags: ["Figma", "Canva", "Wireframing", "Prototyping", "Usability Testing"] },
  { icon: "⚛️", name: "Frontend Dev", tags: ["React.js", "HTML5", "CSS3", "JavaScript", "Responsive Design"] },
  { icon: "🐍", name: "Backend Dev", tags: ["Python", "FastAPI", "Node.js", "REST APIs", "Express"] },
  { icon: "🗄️", name: "Database", tags: ["SQL", "MySQL", "DBMS", "MongoDB", "Data Engineering"] },
  { icon: "🧠", name: "CS Fundamentals", tags: ["DSA", "OOP", "Debugging", "Problem Solving"] },
  { icon: "🤝", name: "Soft Skills", tags: ["Communication", "Collaboration", "Creativity", "Critical Thinking"] },
];

const certs = [
  { icon: "🐍", name: "Programming Foundations with Python", by: "NxtWave CCBP 4.0" },
  { icon: "🗄️", name: "Complete Guide to SQL for Data Engineering", by: "Beginner to Advanced" },
  { icon: "📱", name: "Build Your Own Responsive Website", by: "NxtWave CCBP 4.0" },
  { icon: "🌐", name: "Build Your Own Static Website", by: "NxtWave CCBP 4.0" },
];

const marqueeItems = [
  "Python","React.js","FastAPI","Figma","SQL","UI/UX","MERN Stack","JavaScript","Node.js","MongoDB",
  "Python","React.js","FastAPI","Figma","SQL","UI/UX","MERN Stack","JavaScript","Node.js","MongoDB",
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#080810", color: "#f2f0ff", fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080810; }
        ::-webkit-scrollbar-thumb { background: #7b5ea7; border-radius: 2px; }
        .syne { font-family: 'Syne', system-ui, sans-serif !important; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .fade1 { opacity:0; animation: fadeUp 0.7s 0.1s ease forwards; }
        .fade2 { opacity:0; animation: fadeUp 0.7s 0.25s ease forwards; }
        .fade3 { opacity:0; animation: fadeUp 0.8s 0.4s ease forwards; }
        .fade4 { opacity:0; animation: fadeUp 0.7s 0.55s ease forwards; }
        .fade5 { opacity:0; animation: fadeUp 0.7s 0.7s ease forwards; }
        .tag-chip {
          display:inline-block; background:rgba(167,139,250,0.1);
          border:1px solid rgba(167,139,250,0.2); color:#a78bfa;
          padding:3px 12px; border-radius:100px; font-size:11px;
          margin:3px; transition:all 0.2s; cursor:default;
        }
        .tag-chip:hover { background:rgba(167,139,250,0.22); }
        .proj-card {
          background:#0f0f1a; border:1px solid #1e1e2e;
          border-radius:20px; overflow:hidden;
          transition:transform 0.3s, border-color 0.3s;
        }
        .proj-card:hover { transform:translateY(-8px); border-color:#a78bfa; }
        .skill-card {
          background:#0f0f1a; border:1px solid #1e1e2e;
          border-radius:18px; padding:1.5rem;
          transition:transform 0.3s, border-color 0.3s;
        }
        .skill-card:hover { transform:translateY(-5px); border-color:#a78bfa; }
        .stat-box {
          background:#0f0f1a; border:1px solid #1e1e2e;
          border-radius:16px; padding:1.3rem;
          transition:transform 0.3s, border-color 0.3s;
        }
        .stat-box:hover { transform:translateY(-4px); border-color:#a78bfa; }
        .exp-card {
          background:#0f0f1a; border:1px solid #1e1e2e;
          border-radius:18px; padding:1.6rem; margin-bottom:1rem;
          transition:border-color 0.3s;
        }
        .exp-card:hover { border-color:#f472b6; }
        .cert-item {
          background:#0f0f1a; border:1px solid #1e1e2e;
          border-radius:14px; padding:1rem 1.3rem;
          display:flex; align-items:center; gap:1rem;
          margin-bottom:0.8rem;
          transition:border-color 0.3s, transform 0.3s;
        }
        .cert-item:hover { border-color:#4ade80; transform:translateX(5px); }
        .nav-link {
          color:#7a7a99; font-size:11px; letter-spacing:0.1em;
          text-transform:uppercase; transition:color 0.2s;
          cursor:pointer; background:none; border:none;
          font-family:'DM Sans',system-ui,sans-serif;
        }
        .nav-link:hover { color:#f2f0ff; }
        .btn-primary {
          background:#a78bfa; color:#000; padding:12px 28px;
          border-radius:100px; font-weight:600; font-size:14px;
          display:inline-flex; align-items:center; gap:6px;
          transition:all 0.25s; border:none; cursor:pointer;
          font-family:'DM Sans',system-ui,sans-serif;
          text-decoration:none;
        }
        .btn-primary:hover { background:#f472b6; transform:translateY(-2px); color:#000; }
        .btn-ghost {
          color:#f2f0ff; padding:11px 24px; border-radius:100px;
          font-size:13px; border:1px solid #1e1e2e;
          display:inline-flex; align-items:center; gap:6px;
          transition:all 0.25s; text-decoration:none; cursor:pointer;
          background:none; font-family:'DM Sans',system-ui,sans-serif;
        }
        .btn-ghost:hover { border-color:#a78bfa; color:#a78bfa; }
        .proj-link {
          color:#7a7a99; font-size:12px; display:inline-flex;
          align-items:center; gap:4px; transition:color 0.2s;
          border:1px solid #1e1e2e; padding:6px 14px;
          border-radius:100px; text-decoration:none;
        }
        .proj-link:hover { color:#a78bfa; border-color:#a78bfa; }
        section { padding: 6rem 4rem; }
        .sl-label {
          font-size:11px; font-weight:700; letter-spacing:0.22em;
          text-transform:uppercase; color:#a78bfa; margin-bottom:0.8rem;
          display:flex; align-items:center; gap:10px;
        }
        .sl-label::before { content:''; width:20px; height:1px; background:#a78bfa; }
        @media (max-width: 768px) {
          section { padding: 4rem 1.5rem; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .proj-grid { grid-template-columns: 1fr !important; }
          .edu-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          nav { padding: 1rem 1.5rem !important; }
          .nav-links { display: none !important; }
          .hero-section { padding: 5rem 1.5rem 3rem !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem 4rem",
        background: scrolled ? "rgba(8,8,16,0.92)" : "rgba(8,8,16,0.5)",
        backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${scrolled ? "#1e1e2e" : "transparent"}`,
        transition: "all 0.3s",
      }}>
        <span className="syne" style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
          AK<span style={{ color: "#a78bfa" }}>.</span>
        </span>
        <div className="nav-links" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["About","Skills","Projects","Education","Contact"].map(n => (
            <button key={n} className="nav-link" onClick={() => scrollTo(n)}>{n}</button>
          ))}
          <button className="btn-primary" style={{ padding: "8px 20px", fontSize: "12px" }} onClick={() => scrollTo("contact")}>
            Hire Me
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" className="hero-section" style={{
        minHeight: "92vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "5rem 4rem 3rem", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(123,94,167,0.18) 0%,transparent 70%)", top:-150, right:-150, pointerEvents:"none", animation:"floatA 9s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(74,222,128,0.08) 0%,transparent 70%)", bottom:0, left:"5%", pointerEvents:"none", animation:"floatB 12s ease-in-out infinite" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="fade1" style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(74,222,128,0.35)", borderRadius:100, padding:"6px 16px", fontSize:11, color:"#4ade80", marginBottom:"2rem", letterSpacing:"0.08em" }}>
            <div style={{ width:7, height:7, background:"#4ade80", borderRadius:"50%", animation:"blink 2s infinite" }} />
            Available for opportunities
          </div>
          <div className="fade2" style={{ fontSize:"0.9rem", color:"#7a7a99", marginBottom:"0.3rem" }}>Hello, I'm</div>
          <h1 className="syne fade3" style={{ fontSize:"clamp(3.5rem,9vw,8rem)", fontWeight:800, lineHeight:0.9, letterSpacing:"-0.04em", marginBottom:"0.2rem" }}>
            Anand<br />
            <span style={{ background:"linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Kundurthi</span>
          </h1>
          <p 
            className="fade4" 
            style={{ 
              fontSize:"clamp(0.9rem,2vw,1.1rem)", 
              color:"#cfcfe6",   // changed here
              maxWidth:520, 
              margin:"2rem 0 2.5rem", 
              lineHeight:1.8 
            }}
          >
            Full Stack Developer skilled in React.js, JavaScript, Python, SQL, and database design with a strong foundation in Data Structures and DBMS. 
            Focused on building scalable web applications, optimized backend systems, and responsive user-centered interfaces using MERN stack and FastAPI.
          </p>
          <div className="fade5" style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects ↓</button>
            <a className="btn-ghost" href="https://anand-portfolio-self.vercel.app/" target="_blank" rel="noreferrer">Live Portfolio ↗</a>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}>Say Hello 👋</button>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ overflow:"hidden", padding:"1rem 0", borderTop:"1px solid #1e1e2e", borderBottom:"1px solid #1e1e2e", background:"#0a0a14" }}>
        <div style={{ display:"flex", gap:"3rem", width:"max-content", animation:"marquee 24s linear infinite" }}>
          {marqueeItems.map((t, i) => (
            <span key={i} className="syne" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#7a7a99", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"1.5rem" }}>
              {t} <span style={{ color:"#a78bfa" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section style={{ padding:"6rem 4rem" }}>
        <div className="sl-label">About Me</div>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>
          <div>
            <h2 className="syne" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"1.5rem" }}>
              Turning ideas<br />into reality.
            </h2>
            <p style={{ fontSize:"0.97rem", color:"#7a7a99", lineHeight:2, marginBottom:"2rem" }}>
              I'm <strong style={{ color:"#f2f0ff", fontWeight:500 }}>Anand Venkata Raghava Sai Kundurthi</strong> from{" "}
              <strong style={{ color:"#f2f0ff", fontWeight:500 }}>Nuzvid, Andhra Pradesh</strong>. I thrive where clean code meets beautiful design.
              <br /><br />
              With hands-on <strong style={{ color:"#f2f0ff", fontWeight:500 }}>UI/UX experience at Diigoo</strong> and intensive training at{" "}
              <strong style={{ color:"#f2f0ff", fontWeight:500 }}>NxtWave CCBP 4.0</strong>, I'm building across the full stack — from Python & FastAPI to React.js & SQL.
            </p>
            <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
              {[["4+","Months industry XP"],["5+","Certifications"],["5","GitHub Projects"],["∞","Willingness to learn"]].map(([n,l]) => (
                <div key={l} className="stat-box">
                  <div className="syne" style={{ fontSize:"2rem", fontWeight:800, color:"#a78bfa", lineHeight:1, marginBottom:4 }}>{n}</div>
                  <div style={{ fontSize:12, color:"#7a7a99" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="exp-card">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <span className="syne" style={{ fontWeight:700, fontSize:"0.95rem" }}>UI/UX Intern</span>
                <span style={{ fontSize:11, color:"#f472b6", background:"rgba(244,114,182,0.1)", padding:"3px 10px", borderRadius:100 }}>Apr – Jul 2025</span>
              </div>
              <div style={{ fontSize:13, color:"#a78bfa", marginBottom:8 }}>Diigoo · Hyderabad</div>
              <p style={{ fontSize:13, color:"#7a7a99", lineHeight:1.7 }}>Designed responsive UIs in Figma, created wireframes and prototypes, conducted usability testing, and collaborated closely with dev teams for smooth design-to-dev handoff.</p>
            </div>
            <div className="exp-card">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <span className="syne" style={{ fontWeight:700, fontSize:"0.95rem" }}>CCBP 4.0 Fellow</span>
                <span style={{ fontSize:11, color:"#f472b6", background:"rgba(244,114,182,0.1)", padding:"3px 10px", borderRadius:100 }}>2025 – Present</span>
              </div>
              <div style={{ fontSize:13, color:"#a78bfa", marginBottom:8 }}>NxtWave</div>
              <p style={{ fontSize:13, color:"#7a7a99", lineHeight:1.7 }}>Intensive training in Python, SQL, React.js, FastAPI, DSA, and DBMS with real project-based learning and industry-aligned curriculum.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:"6rem 4rem", background:"#0a0a14" }}>
        <div className="sl-label">Skills</div>
        <h2 className="syne" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:"0.8rem" }}>What I Bring</h2>
        <p style={{ color:"#7a7a99", fontSize:"0.95rem", marginBottom:"3rem" }}>From building APIs to designing pixel-perfect interfaces.</p>
        <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
          {skills.map(s => (
            <div key={s.name} className="skill-card">
              <div style={{ fontSize:"2rem", marginBottom:"0.8rem" }}>{s.icon}</div>
              <div className="syne" style={{ fontWeight:700, fontSize:"0.95rem", marginBottom:"0.8rem" }}>{s.name}</div>
              <div>{s.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding:"6rem 4rem" }}>
        <div className="sl-label">My Work</div>
        <h2 className="syne" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:"0.8rem" }}>Featured Projects</h2>
        <p style={{ color:"#7a7a99", fontSize:"0.95rem", marginBottom:"3rem" }}>Real code I've written and shipped — each one a step forward.</p>
        <div className="proj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
          {projects.map(p => (
            <div key={p.name} className="proj-card">
              <div style={{ height:170, background:p.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"3rem", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,0.02) 20px,rgba(255,255,255,0.02) 21px)" }} />
                {p.emoji}
              </div>
              <div style={{ padding:"1.4rem" }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
                  <span style={{ fontSize:11, color:"#7a7a99" }}>{p.year}</span>
                  <span style={{ fontSize:10, color:p.accent, background:`${p.accent}18`, border:`1px solid ${p.accent}33`, padding:"2px 9px", borderRadius:100 }}>{p.type}</span>
                </div>
                <div className="syne" style={{ fontWeight:800, fontSize:"1rem", letterSpacing:"-0.02em", marginBottom:8, lineHeight:1.3 }}>{p.name}</div>
                <p style={{ fontSize:12, color:"#7a7a99", lineHeight:1.7, marginBottom:"1.2rem" }}>{p.desc}</p>
                <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
                  ↗ {p.github.includes("github") ? "GitHub" : "LinkedIn"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={{ padding:"6rem 4rem", background:"#0a0a14" }}>
        <div className="sl-label">Background</div>
        <h2 className="syne" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:"3rem" }}>Education &<br />Certifications</h2>
        <div className="edu-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem" }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#7a7a99", marginBottom:"1.5rem" }}>Academic</div>
            {[
              { year:"Feb 2025 – Nov 2025", institute:"NxtWave CCBP 4.0 Intensive", degree:"Full Stack Development Program", color:"#a78bfa" },
              { year:"2018 – 2021", institute:"Krishna University, Machhlipattanam", degree:"Bachelor of Commerce (Computers)", color:"#f472b6" },
            ].map((e, i) => (
              <div key={i} style={{ display:"flex", gap:"1.2rem", marginBottom:"2rem" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:12, height:12, background:e.color, borderRadius:"50%", marginTop:4, flexShrink:0 }} />
                  {i === 0 && <div style={{ width:1, height:44, background:"#1e1e2e", marginTop:6 }} />}
                </div>
                <div>
                  <div style={{ fontSize:11, color:e.color, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:4 }}>{e.year}</div>
                  <div className="syne" style={{ fontWeight:700, fontSize:"0.95rem", marginBottom:3 }}>{e.institute}</div>
                  <div style={{ fontSize:13, color:"#7a7a99" }}>{e.degree}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#7a7a99", marginBottom:"1.5rem" }}>Certifications</div>
            {certs.map(c => (
              <div key={c.name} className="cert-item">
                <span style={{ fontSize:"1.4rem" }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:500 }}>{c.name}</div>
                  <div style={{ fontSize:11, color:"#7a7a99" }}>{c.by}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"6rem 4rem", textAlign:"center" }}>
        <div style={{ maxWidth:600, margin:"0 auto", background:"#0f0f1a", border:"1px solid #1e1e2e", borderRadius:28, padding:"4rem 3rem", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-60, left:-60, width:200, height:200, background:"radial-gradient(circle,rgba(123,94,167,0.2),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-60, right:-60, width:200, height:200, background:"radial-gradient(circle,rgba(244,114,182,0.15),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:"3rem", marginBottom:"1.2rem" }}>👋</div>
            <h2 className="syne" style={{ fontSize:"clamp(1.8rem,3.5vw,2.5rem)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:"1rem" }}>
              Let's build something<br />great together!
            </h2>
            <p style={{ color:"#7a7a99", fontSize:"0.9rem", lineHeight:1.9, marginBottom:"2.5rem" }}>
              Open to fresher/entry-level roles in Frontend Development, UI/UX, or Database.<br />
              Also open to internships, collaborations, and creative challenges.
            </p>
            <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"1.5rem" }}>
              <a className="btn-primary" href="mailto:anandsarmak@gmail.com">📧 Send Email</a>
              <a className="btn-ghost" href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="btn-ghost" href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
            <div style={{ fontSize:12, color:"#7a7a99" }}>📍 Nuzvid, Andhra Pradesh &nbsp;·&nbsp; 📞 +91 7093254137</div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign:"center", padding:"1.5rem 4rem", borderTop:"1px solid #1e1e2e", fontSize:12, color:"#7a7a99" }}>
        Crafted with 💜 curiosity · ☕ coffee · 💻 way too many open tabs &nbsp;·&nbsp; © 2025 Anand Kundurthi
      </footer>
    </div>
  );
}
