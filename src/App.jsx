import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const AVATAR_URL = "https://raw.githubusercontent.com/anandkundurthi/anand-portfolio/main/src/assets/anand-avatar.png";

const PHOTO_URL = "https://raw.githubusercontent.com/anandkundurthi/anand-portfolio/main/dist/avatar.jpg";
const PHOTO_FALLBACKS = [
  "https://raw.githubusercontent.com/anandkundurthi/anand-portfolio/main/dist/avatar.jpg",
  "/avatar.jpg?v=4",
  "https://raw.githubusercontent.com/anandkundurthi/anand-portfolio/main/public/avatar.jpg",
  "https://raw.githubusercontent.com/anandkundurthi/anand-portfolio/main/src/assets/anand-avatar.png",
];

const projects = [
  { emoji: "📄", year: "2025", type: "Python · FastAPI · React.js · MySQL", name: "AI Resume Analyzer", desc: "Full-stack AI-powered resume analysis platform that evaluates resumes against job descriptions using skill-matching algorithms. Features PDF text extraction via PyPDF2, REST API scoring with FastAPI, session-based authentication, and an animated dashboard showing match scores and improvement suggestions.", github: "https://github.com/anandkundurthi/ai-resume-analyzer", live: "https://ai-resume-analyzer-tuet.onrender.com", color: "#6ee7f7", num: "01", screenshot: "https://opengraph.githubassets.com/1/anandkundurthi/ai-resume-analyzer" },
  { emoji: "🌐", year: "2024–2025", type: "React.js · Node.js · Express.js · PostgreSQL · MongoDB", name: "Full-Stack Web Applications", desc: "Suite of MERN stack applications implementing CRUD operations, REST APIs, and JWT authentication. Responsive UI layouts compatible across desktop and mobile. Optimized complex SQL queries using indexing and join optimization techniques.", github: "https://github.com/anandkundurthi", live: null, color: "#a5f3c0", num: "02", screenshot: "https://opengraph.githubassets.com/1/anandkundurthi/anandkundurthi" },
  { emoji: "🛒", year: "2025", type: "SQL · MySQL · Database Design", name: "SupplySync", desc: "A retail-focused MySQL project simulating real supermarket operations — inventory tracking, supplier handling, customer sales & billing, and business analytics with 20+ real-world SQL solutions.", github: "https://github.com/anandkundurthi/Dmart_mall_management", live: null, color: "#fde68a", num: "03", screenshot: "https://opengraph.githubassets.com/1/anandkundurthi/Dmart_mall_management" },
  { emoji: "🎨", year: "2025", type: "HTML · CSS · JavaScript", name: "Color Picker", desc: "An interactive color picker built with vanilla HTML, CSS, and JavaScript. Demonstrates core frontend skills — DOM manipulation, event handling, and dynamic UI updates.", github: "https://github.com/anandkundurthi/colorPicker", live: null, color: "#f0abfc", num: "04", screenshot: "https://opengraph.githubassets.com/1/anandkundurthi/colorPicker" },
  { emoji: "🚦", year: "2025", type: "HTML · CSS · JavaScript", name: "Traffic Light Simulation", desc: "JavaScript-based simulation of real-world traffic signals using timed state transitions, setInterval timing logic, and CSS class toggling.", github: "https://github.com/anandkundurthi/traffic_light", live: null, color: "#fca5a5", num: "05", screenshot: "https://opengraph.githubassets.com/1/anandkundurthi/traffic_light" },
];

const skills = [
  { icon: "⬡", name: "Languages", tags: ["Python", "JavaScript ES6+", "SQL", "HTML5", "CSS3"], bars: [{ name: "Python", pct: 88 }, { name: "JavaScript", pct: 82 }, { name: "SQL", pct: 78 }, { name: "HTML/CSS", pct: 90 }] },
  { icon: "◈", name: "Frontend", tags: ["React.js", "Responsive Design", "Component Architecture", "Jinja2"], bars: [{ name: "React.js", pct: 85 }, { name: "Responsive UI", pct: 88 }, { name: "Jinja2", pct: 72 }] },
  { icon: "⬢", name: "Backend", tags: ["FastAPI", "Node.js", "Express.js", "REST APIs", "JWT Auth", "Session Mgmt"], bars: [{ name: "FastAPI", pct: 83 }, { name: "Node.js", pct: 76 }, { name: "REST APIs", pct: 87 }] },
  { icon: "◉", name: "Databases", tags: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "SQLAlchemy ORM"], bars: [{ name: "PostgreSQL", pct: 80 }, { name: "MySQL", pct: 82 }, { name: "MongoDB", pct: 70 }] },
  { icon: "⬣", name: "Tools & Platforms", tags: ["Git", "GitHub", "Linux", "Render", "Figma", "Canva", "PyPDF2"], bars: [{ name: "Git/GitHub", pct: 85 }, { name: "Figma", pct: 75 }, { name: "Linux", pct: 70 }] },
  { icon: "◈", name: "Core Concepts", tags: ["DSA", "System Design", "UI/UX Design", "Agile", "REST APIs"], bars: [{ name: "DSA", pct: 72 }, { name: "UI/UX Design", pct: 78 }, { name: "System Design", pct: 68 }] },
];

const certs = [
  { num: "01", name: "AI for India", by: "Government of India / GUVI" },
  { num: "02", name: "Complete Guide to SQL for Data Engineering", by: "Beginner to Advanced" },
  { num: "03", name: "Build Your Own Responsive Website", by: "NxtWave CCBP 4.0" },
  { num: "04", name: "Build Your Own Static Website", by: "NxtWave CCBP 4.0" },
  { num: "05", name: "Letter of Recommendation", by: "Diigoo Tech Private Limited" },
];

const TYPING_WORDS = ["Full-Stack Developer", "UI/UX Developer", "Python Engineer", "React Developer", "FastAPI Builder"];
const STATS = [
  { n: 4, suffix: "+", label: "Months Industry XP" },
  { n: 5, suffix: "+", label: "Certifications" },
  { n: 6, suffix: "", label: "GitHub Projects" },
  { n: 100, suffix: "%", label: "Willingness to Learn" },
];

/* ─── MOBILE NAV ────────────────────────────────────────────────────────── */
function MobileNav({ scrollTo }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        style={{ background: "none", border: "1px solid rgba(110,231,247,0.2)", borderRadius: 6, padding: "10px 12px", cursor: "none", display: "flex", flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center", zIndex: 101 }}
      >
        <div style={{ width: 22, height: 2, background: "#6ee7f7", borderRadius: 2 }} />
        <div style={{ width: 22, height: 2, background: "#6ee7f7", borderRadius: 2 }} />
        <div style={{ width: 22, height: 2, background: "#6ee7f7", borderRadius: 2 }} />
      </button>

      {/* Full-screen overlay — rendered in body via portal-style fixed positioning */}
      {open && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(6,8,16,0.98)", backdropFilter: "blur(20px)",
          zIndex: 9998, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2.5rem"
        }}>
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "1px solid rgba(110,231,247,0.2)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", color: "#6ee7f7", fontSize: 20, cursor: "none", zIndex: 9999 }}
          >✕</button>

          {/* Logo */}
          <div style={{ position: "absolute", top: 22, left: 24, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#f0f0f8" }}>
            AK<span style={{ color: "#6ee7f7" }}>.</span>
          </div>

          {/* Nav links */}
          {["About","Skills","Projects","Education","Contact"].map((n, i) => (
            <button
              key={n}
              onClick={() => { setOpen(false); setTimeout(() => scrollTo(n), 300); }}
              style={{ background: "none", border: "none", color: "rgba(232,232,240,0.7)", fontSize: "2.2rem", fontFamily: "'Syne',sans-serif", fontWeight: 800, cursor: "none", letterSpacing: "-0.02em", transition: "color 0.2s", padding: "0.2rem 0" }}
              onMouseEnter={e => e.currentTarget.style.color = "#6ee7f7"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(232,232,240,0.7)"}
            >{n}</button>
          ))}

          <button className="btn-cyan" onClick={() => { setOpen(false); setTimeout(() => scrollTo("contact"), 300); }}>
            Hire Me
          </button>

          {/* Bottom line */}
          <div style={{ position: "absolute", bottom: 30, fontSize: 10, color: "rgba(110,231,247,0.3)", fontFamily: "monospace", letterSpacing: "0.15em" }}>
            ANAND KUNDURTHI · FULL-STACK DEVELOPER
          </div>
        </div>
      )}
    </>
  );
}

/* ─── SKILL BAR ─────────────────────────────────────────────────────────── */
function SkillBar({ name, pct, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => setWidth(pct), delay * 1000);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, delay]);
  return (
    <div ref={ref} style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color:"rgba(232,232,240,0.42)", fontFamily: "monospace", letterSpacing: "0.05em" }}>{name}</span>
        <span style={{ fontSize: 10, color: "#6ee7f7", fontFamily: "monospace" }}>{width > 0 ? pct+"%" : "0%"}</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: width+"%", background: "linear-gradient(90deg, #6ee7f7, #a5f3c0)", borderRadius: 2, transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)", boxShadow: width>0?"0 0 8px rgba(110,231,247,0.5)":"none" }} />
      </div>
    </div>
  );
}

/* ─── SECTION REVEAL ────────────────────────────────────────────────────── */
function SectionReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(40px)", transition: `opacity 0.9s ${delay}s ease, transform 0.9s ${delay}s ease` }}>
      {children}
    </div>
  );
}

/* ─── PAGE LOADER ───────────────────────────────────────────────────────── */
function PageLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) { p = 100; clearInterval(t); setTimeout(() => { setFadeOut(true); setTimeout(onDone, 600); }, 300); }
      setProgress(Math.min(p, 100));
    }, 80);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <div style={{ position: "fixed", inset: 0, background: "#060810", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem", opacity: fadeOut ? 0 : 1, transition: "opacity 0.6s ease", pointerEvents: fadeOut ? "none" : "all" }}>
      {/* Spinning rings */}
      <div style={{ position: "relative", width: 100, height: 100 }}>
        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(110,231,247,0.15)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", inset: 8, border: "1px solid rgba(110,231,247,0.25)", borderTopColor: "#6ee7f7", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <div style={{ position: "absolute", inset: 18, border: "1px solid rgba(110,231,247,0.1)", borderBottomColor: "#a5f3c0", borderRadius: "50%", animation: "spin 1.5s linear infinite reverse" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#6ee7f7", textShadow: "0 0 20px rgba(110,231,247,0.6)" }}>AK.</span>
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ width: 200, height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #6ee7f7, #a5f3c0)", transition: "width 0.1s ease", boxShadow: "0 0 10px rgba(110,231,247,0.6)" }} />
      </div>
      <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(110,231,247,0.4)", letterSpacing: "0.2em" }}>{Math.floor(progress)}%</span>
    </div>
  );
}

/* ─── SCROLL PROGRESS BAR ───────────────────────────────────────────────── */
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 200, background: "rgba(0,0,0,0.2)" }}>
      <div style={{ height: "100%", width: `${width}%`, background: "linear-gradient(90deg, #6ee7f7, #a5f3c0, #6ee7f7)", backgroundSize: "200% auto", animation: "shimmer 2s linear infinite", transition: "width 0.1s ease", boxShadow: "0 0 8px rgba(110,231,247,0.8), 0 0 2px rgba(110,231,247,1)" }} />
    </div>
  );
}


/* ─── THREE.JS HERO ─────────────────────────────────────────────────────── */
function ThreeHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, animId, nodes = [], edges = [], pulses = [];

    // ── IntersectionObserver: fully stop when hero off screen ──
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([e]) => { isVisible = e.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const NODE_COUNT = 42;
    const CONNECT_DIST = 160;
    const LABELS = ["API","SQL","Git","AI","ML","DB","UI","UX","JS","TS",
                    "CSS","DOM","JWT","ORM","CLI","SSH","CDN","DNS","CI","CD"];

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() > 0.82 ? 4.5 : 2.5,   // some bigger "hub" nodes
        label: Math.random() > 0.55 ? LABELS[i % LABELS.length] : null,
        pulse: 0,           // glow pulse phase
        pulseSpeed: 0.02 + Math.random() * 0.02,
        color: Math.random() > 0.5 ? "#6ee7f7" : "#a5f3c0",
      }));
      // Build static edge list — only pairs within CONNECT_DIST at init
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx*dx + dy*dy) < CONNECT_DIST) {
            edges.push([i, j]);
          }
        }
      }
      // Spawn initial signal pulses
      pulses = [];
      for (let k = 0; k < 8; k++) spawnPulse();
    };

    const spawnPulse = () => {
      if (edges.length === 0) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({ edge, t: 0, speed: 0.004 + Math.random() * 0.006 });
    };

    const resize = () => {
      W = canvas.parentElement.clientWidth;
      H = canvas.parentElement.clientHeight;
      canvas.width  = W;
      canvas.height = H;
      initNodes();
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Throttle to 24fps — smooth enough, lightweight
    let lastFrame = 0;
    const INTERVAL = 1000 / 24;

    const draw = (now) => {
      animId = requestAnimationFrame(draw);
      if (!isVisible) return;
      if (now - lastFrame < INTERVAL) return;
      lastFrame = now;

      ctx.clearRect(0, 0, W, H);

      // ── Move nodes (drift) ──
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > H) { n.y = H; n.vy *= -1; }
        n.pulse = (n.pulse + n.pulseSpeed) % (Math.PI * 2);
      });

      // ── Draw edges ──
      edges.forEach(([i, j]) => {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > CONNECT_DIST) return; // nodes drifted apart
        const alpha = (1 - dist / CONNECT_DIST) * 0.18;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(110,231,247,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      // ── Draw signal pulses along edges ──
      pulses.forEach((p, idx) => {
        p.t += p.speed;
        if (p.t >= 1) {
          // respawn on a random edge
          p.edge = edges[Math.floor(Math.random() * edges.length)];
          p.t = 0;
          p.speed = 0.004 + Math.random() * 0.006;
          return;
        }
        const [i, j] = p.edge;
        const a = nodes[i], b = nodes[j];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        // pulse dot
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(110,231,247,0.9)";
        ctx.fill();
        // fading trail
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.08);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.08);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(110,231,247,0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Spawn new pulses occasionally
      if (Math.random() < 0.04 && pulses.length < 14) spawnPulse();

      // ── Draw nodes ──
      nodes.forEach(n => {
        const glow = 0.5 + 0.5 * Math.sin(n.pulse);
        // outer glow ring for hub nodes
        if (n.r > 3) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 4 + glow * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(110,231,247,${0.04 + glow * 0.06})`;
          ctx.fill();
        }
        // node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color === "#6ee7f7"
          ? `rgba(110,231,247,${0.55 + glow * 0.35})`
          : `rgba(165,243,192,${0.45 + glow * 0.3})`;
        ctx.fill();
        // label on hub nodes
        if (n.label && n.r > 3) {
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(232,232,240,${0.25 + glow * 0.25})`;
          ctx.fillText(n.label, n.x, n.y - n.r - 5);
        }
      });
    };

    draw(0);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.85, willChange: "transform" }}
    />
  );
}

/* ─── PARTICLE FIELD ────────────────────────────────────────────────────── */
/* ParticleField removed for performance */

/* ─── TILT CARD ─────────────────────────────────────────────────────────── */
function TiltCard({ children, color }) {
  const ref = useRef(null);
  // Use direct DOM manipulation instead of setState to avoid React re-renders on every mousemove
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const rotX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -8;
    const rotY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015,1.015,1.015)`;
    el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 24px ${color}22`;
    el.style.transition = "box-shadow 0.1s";
  }, [color]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = "all 0.5s cubic-bezier(0.23,1,0.32,1)";
    el.style.boxShadow = "none";
  }, []);
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>{children}</div>;
}

/* Parallax removed for performance */

/* ─── HELPERS ───────────────────────────────────────────────────────────── */
function TypingText() {
  const [idx, setIdx] = useState(0); const [text, setText] = useState(""); const [del, setDel] = useState(false);
  useEffect(() => {
    const word = TYPING_WORDS[idx];
    const t = setTimeout(() => {
      if (!del && text.length < word.length) setText(word.slice(0, text.length + 1));
      else if (!del) setDel(true);
      else if (text.length > 0) setText(text.slice(0, -1));
      else { setDel(false); setIdx((idx + 1) % TYPING_WORDS.length); }
    }, del ? 35 : text.length === word.length ? 1800 : 70);
    return () => clearTimeout(t);
  }, [text, del, idx]);
  return <span style={{ color: "#6ee7f7" }}>{text}<span style={{ animation: "blink 1s step-end infinite" }}>_</span></span>;
}

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0); const ref = useRef(null); const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let cur = 0, i = 0; const steps = 50; const inc = target / steps;
        const t = setInterval(() => { cur = Math.min(cur + inc, target); setCount(Math.floor(cur)); i++; if (i >= steps) clearInterval(t); }, 1200 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)` }}>{children}</div>;
}

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => { try { setTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" })); } catch { setTime(new Date().toLocaleTimeString()); } };
    update(); const i = setInterval(update, 1000); return () => clearInterval(i);
  }, []);
  return <span>{time} IST</span>;
}

/* ─── CUSTOM CURSOR ─────────────────────────────────────────────────────── */
function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  // Cache magnetic buttons once — never querySelectorAll in mousemove
  const btnsRef = useRef([]);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    // Cache all magnetic buttons once on mount + re-cache every 2s for dynamic ones
    const cacheBtns = () => {
      btnsRef.current = Array.from(document.querySelectorAll(".btn-cyan, .btn-ghost, .btn-green, .nav-btn"));
    };
    cacheBtns();
    const cacheInterval = setInterval(cacheBtns, 2000);

    const onMove = (e) => {
      const x = e.clientX, y = e.clientY;
      pos.current = { x, y };
      // Dot follows mouse instantly via direct style — no lerp needed
      if (dot.current) {
        dot.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      }
      // Magnetic pull on cached buttons — no DOM query here
      btnsRef.current.forEach(btn => {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = x - cx, dy = y - cy;
        const distSq = dx * dx + dy * dy;
        if (distSq < 6400) { // 80^2 — avoid sqrt
          const dist = Math.sqrt(distSq);
          const pull = (1 - dist / 80) * 0.3;
          btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        } else if (btn._pulled) {
          btn.style.transform = "";
          btn._pulled = false;
        }
        btn._pulled = distSq < 6400;
      });
    };

    // passive: true so browser never waits for JS before scrolling
    window.addEventListener("mousemove", onMove, { passive: true });

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      // Ring lerps smoothly behind cursor
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      clearInterval(cacheInterval);
      btnsRef.current.forEach(btn => { btn.style.transform = ""; });
    };
  }, []);

  return (
    <>
      {/* Main dot — no transform:translate(-50%,-50%), use offset instead */}
      <div ref={dot} style={{
        position: "fixed", top: 0, left: 0,
        width: 6, height: 6, background: "#6ee7f7",
        borderRadius: "50%", pointerEvents: "none", zIndex: 9999,
        boxShadow: "0 0 10px rgba(110,231,247,0.9)",
        willChange: "transform",
      }} />
      {/* Lagging ring */}
      <div ref={ring} style={{
        position: "fixed", top: 0, left: 0,
        width: 36, height: 36,
        border: "1.5px solid rgba(110,231,247,0.45)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 9998,
        willChange: "transform",
      }} />
    </>
  );
}

/* ─── AVATAR ────────────────────────────────────────────────────────────── */
function Avatar() {
  const gradRef = useRef(null); // kept for compatibility
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {/* Animated gradient halo */}
      <div ref={gradRef} style={{
        position: "absolute", inset: -4, borderRadius: "50%",
        background: "conic-gradient(#6ee7f7, #a5f3c0, #f0abfc, #fde68a, #6ee7f7)",
        filter: "blur(2px)", zIndex: 0,
        animation: "rotateBorder 4s linear infinite",
      }} />
      {/* Outer glow orb */}
      <div style={{ position: "absolute", inset: -24, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,231,247,0.12) 0%, transparent 70%)", filter: "blur(18px)", zIndex: 0, animation: "glowPulse 3s ease infinite" }} />
      {/* Rotating dashed ring */}
      <div style={{ position: "absolute", inset: -14, borderRadius: "50%", border: "1px dashed rgba(110,231,247,0.18)", animation: "spin 10s linear infinite reverse", zIndex: 0 }} />
      {/* Photo circle — sits on top of gradient */}
      <div style={{ width: 220, height: 220, borderRadius: "50%", overflow: "hidden", border: "3px solid #060810", position: "relative", zIndex: 1, boxShadow: "0 0 40px rgba(110,231,247,0.2), 0 0 80px rgba(110,231,247,0.08)" }}>
        <img
          src={PHOTO_URL}
          alt="Anand Kundurthi"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "brightness(1.05) contrast(1.05)" }}
          onError={(e) => {
            const img = e.target;
            const tried = parseInt(img.dataset.tried || "0");
            if (tried < PHOTO_FALLBACKS.length - 1) {
              img.dataset.tried = tried + 1;
              img.src = PHOTO_FALLBACKS[tried + 1];
            } else {
              img.style.display = "none";
              img.parentNode.style.background = "linear-gradient(135deg, #0d1117, #111827)";
              img.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:3.5rem;font-weight:800;color:#6ee7f7;text-shadow:0 0 30px rgba(110,231,247,0.6)">AK</div>`;
            }
          }}
        />
      </div>
      {/* Status badge */}
      <div style={{ position: "absolute", bottom: 12, right: 4, zIndex: 2, background: "rgba(6,8,16,0.9)", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 20, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6, backdropFilter: "blur(10px)" }}>
        <div style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", animation: "pulseGreen 2s infinite" }} />
        <span style={{ fontSize: 9, color: "#4ade80", fontFamily: "monospace", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>Available</span>
      </div>
    </div>
  );
}

/* ─── CONTACT FORM ──────────────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(null);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      // Load EmailJS
      if (!window.emailjs) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
        window.emailjs.init("Mffsv4BJ2iFYVa-xe");
      }
      await window.emailjs.send("service_fgf1mpm", "gp18zim", {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: "Anand",
      });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputStyle = (field) => ({
    width: "100%", background: focused === field ? "rgba(110,231,247,0.04)" : "rgba(255,255,255,0.02)",
    border: `1px solid ${focused === field ? "rgba(110,231,247,0.4)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 6, padding: "12px 16px", color: "#f0f0f8", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    outline: "none", transition: "all 0.25s", resize: "none",
    boxShadow: focused === field ? "0 0 20px rgba(110,231,247,0.08)" : "none",
  });

  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(110,231,247,0.1)", borderRadius: 12, padding: "2rem", maxWidth: 500, margin: "0 auto", backdropFilter: "blur(10px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label style={{ fontSize: 10, color: "rgba(110,231,247,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "monospace", display: "block", marginBottom: 6 }}>Name</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Your name" style={inputStyle("name")} />
        </div>
        <div>
          <label style={{ fontSize: 10, color: "rgba(110,231,247,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "monospace", display: "block", marginBottom: 6 }}>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="your@email.com" style={inputStyle("email")} />
        </div>
      </div>
      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ fontSize: 10, color: "rgba(110,231,247,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "monospace", display: "block", marginBottom: 6 }}>Message</label>
        <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Tell me about your project or opportunity..." rows={4} style={inputStyle("message")} />
      </div>
      <button
        onClick={handleSubmit}
        disabled={status === "sending" || !form.name || !form.email || !form.message}
        className="btn-cyan"
        style={{ width: "100%", justifyContent: "center", opacity: (!form.name || !form.email || !form.message) ? 0.5 : 1, fontSize: 11 }}
      >
        {status === "sending" ? "⟳ Sending..." : status === "success" ? "✓ Message Sent!" : status === "error" ? "✗ Failed — Try Email" : "Send Message →"}
      </button>
      {status === "success" && <p style={{ textAlign: "center", color: "#4ade80", fontSize: 12, marginTop: 10, fontFamily: "monospace" }}>Thanks! I'll get back to you soon.</p>}
    </div>
  );
}

/* ─── PROJECT ROW ───────────────────────────────────────────────────────── */
function ProjectRow({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <TiltCard color={p.color}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative", overflow: "hidden",
          padding: "2rem 2.2rem",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: hov
            ? `linear-gradient(135deg, ${p.color}12 0%, rgba(255,255,255,0.04) 100%)`
            : "rgba(255,255,255,0.015)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "background 0.4s",
          borderLeft: hov ? `2px solid ${p.color}` : "2px solid transparent",
        }}
      >
        {/* Glow sweep on hover */}
        <div style={{
          position: "absolute", inset: 0, opacity: hov ? 1 : 0, transition: "opacity 0.4s", pointerEvents: "none",
          background: `radial-gradient(ellipse at top left, ${p.color}18 0%, transparent 60%)`,
        }} />
        {/* Screenshot preview on hover */}
        {p.screenshot && hov && (
          <div className="project-screenshot" style={{
            position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
            width: 180, height: 100, borderRadius: 8, overflow: "hidden",
            border: `1px solid ${p.color}44`, boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${p.color}22`,
            zIndex: 10, pointerEvents: "none",
            animation: "toastSlide 0.25s cubic-bezier(0.22,1,0.36,1)",
          }}>
            <img src={p.screenshot} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${p.color}22, transparent)` }} />
          </div>
        )}
        {/* Top row: number + name + type + links */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", marginBottom: "0.9rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{
              fontFamily: "monospace", fontSize: 10, color: p.color,
              background: `${p.color}18`, border: `1px solid ${p.color}33`,
              padding: "3px 10px", borderRadius: 20, letterSpacing: "0.1em"
            }}>{p.num}</span>
            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: hov ? p.color : "#f0f0f8", transition: "color 0.3s", fontFamily: "'Syne', sans-serif" }}>
              {p.emoji} {p.name}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <a href={p.github} target="_blank" rel="noreferrer" style={{
              fontSize: 11, color: hov ? p.color : "rgba(255,255,255,0.45)", textDecoration: "none",
              border: `1px solid ${hov ? p.color : "rgba(255,255,255,0.1)"}`,
              padding: "5px 14px", borderRadius: 20, transition: "all 0.25s", letterSpacing: "0.05em",
              background: hov ? `${p.color}10` : "transparent",
              boxShadow: hov ? `0 0 14px ${p.color}44` : "none",
            }}>↗ Code</a>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" style={{
                fontSize: 11, color: "#4ade80", textDecoration: "none",
                border: "1px solid rgba(74,222,128,0.35)", padding: "5px 14px",
                borderRadius: 20, background: "rgba(74,222,128,0.07)",
                boxShadow: hov ? "0 0 14px rgba(74,222,128,0.3)" : "none", transition: "box-shadow 0.3s",
              }}>⬢ Live</a>
            )}
          </div>
        </div>
        {/* Tech stack badge row */}
        <div style={{ marginBottom: "0.7rem" }}>
          {p.type.split(" · ").map(tech => (
            <span key={tech} style={{
              display: "inline-block", fontSize: 10, fontFamily: "monospace",
              color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4,
              padding: "2px 8px", margin: "0 4px 4px 0", letterSpacing: "0.04em"
            }}>{tech}</span>
          ))}
        </div>
        {/* Description */}
        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.42)", lineHeight: 1.75, margin: 0, maxWidth: 720 }}>{p.desc}</p>
      </div>
    </TiltCard>
  );
}


/* ─── TOAST SYSTEM ──────────────────────────────────────────────────────── */
const ToastContext = React.createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9997, display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: t.type === "success" ? "rgba(6,8,16,0.95)" : "rgba(6,8,16,0.95)",
            border: `1px solid ${t.type === "success" ? "rgba(110,231,247,0.35)" : "rgba(251,191,36,0.35)"}`,
            borderRadius: 8, padding: "12px 18px",
            backdropFilter: "blur(16px)",
            boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${t.type === "success" ? "rgba(110,231,247,0.1)" : "rgba(251,191,36,0.1)"}`,
            animation: "toastSlide 0.35s cubic-bezier(0.22,1,0.36,1)",
            minWidth: 220,
          }}>
            <span style={{ fontSize: 15 }}>{t.type === "success" ? "✓" : "⚡"}</span>
            <span style={{ fontSize: 12, color: "#e8e8f0", fontFamily: "monospace", letterSpacing: "0.04em" }}>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
const useToast = () => React.useContext(ToastContext);

/* ─── CLICK RIPPLE ───────────────────────────────────────────────────────── */
function ClickRipple() {
  const [ripples, setRipples] = useState([]);
  useEffect(() => {
    const onClick = (e) => {
      const id = Date.now() + Math.random();
      setRipples(r => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 800);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return (
    <>
      {ripples.map(r => (
        <div key={r.id} style={{
          position: "fixed", left: r.x, top: r.y, width: 0, height: 0,
          pointerEvents: "none", zIndex: 9995,
          border: "1.5px solid rgba(110,231,247,0.8)",
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          animation: "rippleOut 0.75s cubic-bezier(0.22,1,0.36,1) forwards",
        }} />
      ))}
    </>
  );
}

/* ─── SPOTLIGHT ──────────────────────────────────────────────────────────── */
function Spotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const onMove = (e) => {
      if (el) { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div ref={ref} style={{
      position: "fixed", width: 500, height: 500,
      borderRadius: "50%", pointerEvents: "none", zIndex: 1,
      transform: "translate(-50%,-50%)",
      background: "radial-gradient(circle, rgba(110,231,247,0.04) 0%, transparent 65%)",
      transition: "left 0.08s linear, top 0.08s linear",
    }} />
  );
}

/* ─── HIRE EASTER EGG ────────────────────────────────────────────────────── */
function HireEasterEgg() {
  const [typed, setTyped] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      setTyped(t => {
        const next = (t + e.key).slice(-4);
        if (next === "hire") { setShow(true); setTimeout(() => setShow(false), 4000); }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9993, pointerEvents: "none",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "rgba(6,8,16,0.97)", border: "1px solid rgba(110,231,247,0.4)",
        borderRadius: 16, padding: "2.5rem 4rem", textAlign: "center",
        backdropFilter: "blur(20px)", boxShadow: "0 0 80px rgba(110,231,247,0.15)",
        animation: "toastSlide 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.8rem" }}>🎉</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#6ee7f7", marginBottom: "0.5rem" }}>
          Great taste!
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(232,232,240,0.5)", letterSpacing: "0.08em" }}>
          You typed <span style={{ color: "#6ee7f7" }}>"hire"</span> — scroll to Contact ↓
        </div>
      </div>
    </div>
  );
}





/* ─── CURRENTLY BUILDING TICKER ─────────────────────────────────────────── */
function BuildingTicker() {
  const items = [
    "⚡ Currently Building: AI Resume Analyzer v2 with GPT integration",
    "🔧 Learning: Advanced System Design patterns",
    "📦 Exploring: Docker & containerized deployments",
    "🌱 Growing: TypeScript & Next.js skills",
  ];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % items.length); setVisible(true); }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      background: "rgba(110,231,247,0.04)", borderTop: "1px solid rgba(110,231,247,0.08)",
      borderBottom: "1px solid rgba(110,231,247,0.08)", padding: "0.65rem 4rem",
      display: "flex", alignItems: "center", gap: "1rem", overflow: "hidden",
      position: "relative", zIndex: 2,
    }}>
      <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.18em", color: "#4ade80", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>
        ● LIVE
      </span>
      <div style={{ width: 1, height: 14, background: "rgba(110,231,247,0.2)", flexShrink: 0 }} />
      <span style={{
        fontSize: 11, fontFamily: "monospace", color: "rgba(232,232,240,0.55)",
        letterSpacing: "0.05em", opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>{items[idx]}</span>
    </div>
  );
}

/* ─── ACHIEVEMENTS STRIP ─────────────────────────────────────────────────── */
function AchievementsStrip() {
  const items = [
    { icon: "🚀", val: "5+", label: "Projects Shipped" },
    { icon: "⭐", val: "4mo", label: "Industry XP" },
    { icon: "📜", val: "5+", label: "Certifications" },
    { icon: "💻", val: "6+", label: "GitHub Repos" },
    { icon: "🛠️", val: "10+", label: "Tech Stack" },
    { icon: "🎯", val: "100%", label: "Passion to Build" },
  ];
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(110,231,247,0.04), rgba(165,243,192,0.03))",
      borderTop: "1px solid rgba(110,231,247,0.08)", borderBottom: "1px solid rgba(110,231,247,0.08)",
      padding: "2rem 4rem", display: "flex", justifyContent: "space-between",
      flexWrap: "wrap", gap: "1.5rem", position: "relative", zIndex: 2,
    }}>
      {items.map((item, i) => (
        <div key={i} style={{ textAlign: "center", flex: "1 1 120px" }}>
          <div style={{ fontSize: "1.4rem", marginBottom: "0.3rem" }}>{item.icon}</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#6ee7f7", textShadow: "0 0 16px rgba(110,231,247,0.4)" }}>{item.val}</div>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(232,232,240,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── QUOTE BLOCK ────────────────────────────────────────────────────────── */
function QuoteBlock() {
  return (
    <div style={{ padding: "5rem 4rem", position: "relative", zIndex: 2, background: "rgba(255,255,255,0.008)" }}>
      <div style={{
        maxWidth: 740, margin: "0 auto", textAlign: "center",
        border: "1px solid rgba(110,231,247,0.1)", borderRadius: 16,
        padding: "3rem 3.5rem", background: "rgba(110,231,247,0.02)",
        backdropFilter: "blur(10px)", position: "relative",
      }}>
        <div style={{ fontSize: "3rem", lineHeight: 1, marginBottom: "1.5rem", opacity: 0.3, color: "#6ee7f7", fontFamily: "Georgia, serif" }}>"</div>
        <p style={{ fontSize: "1.1rem", fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#f0f0f8", lineHeight: 1.7, marginBottom: "1.8rem", letterSpacing: "-0.01em" }}>
          I don't just write code — I craft experiences. Every API endpoint, every UI component, every database query is a chance to build something that actually matters to people.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #6ee7f7, #a5f3c0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#060810", fontFamily: "'Syne', sans-serif" }}>AK</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f0f0f8", fontFamily: "'Syne', sans-serif" }}>Anand Kundurthi</div>
            <div style={{ fontSize: 10, color: "rgba(110,231,247,0.5)", fontFamily: "monospace", letterSpacing: "0.08em" }}>UI/UX Intern · Diigoo Tech</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CIRCULAR SKILL RING ────────────────────────────────────────────────── */
function SkillRing({ name, pct, delay = 0, color = "#6ee7f7" }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const SIZE = 72, STROKE = 5, R = (SIZE - STROKE * 2) / 2;
  const CIRC = 2 * Math.PI * R;
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => setProgress(pct), delay * 1000);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, delay]);
  const offset = CIRC - (progress / 100) * CIRC;
  return (
    <div ref={ref} className="skill-ring-wrap">
      {/* Ring — shown on desktop */}
      <div className="skill-ring-circle" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ position: "relative", width: SIZE, height: SIZE }}>
          <svg width={SIZE} height={SIZE} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE} />
            <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke={color} strokeWidth={STROKE}
              strokeDasharray={CIRC} strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: `stroke-dashoffset 1.4s ${delay}s cubic-bezier(0.22,1,0.36,1)`, filter: `drop-shadow(0 0 4px ${color}88)` }}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: progress > 0 ? color : "rgba(255,255,255,0.3)" }}>{progress > 0 ? pct+"%" : "0%"}</span>
          </div>
        </div>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(232,232,240,0.42)", letterSpacing: "0.05em", textAlign: "center", maxWidth: 72 }}>{name}</span>
      </div>
      {/* Bar — shown on mobile/medium */}
      <div className="skill-ring-bar" style={{ display: "none", width: "100%", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(232,232,240,0.55)", letterSpacing: "0.04em" }}>{name}</span>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: color, fontWeight: 700 }}>{progress > 0 ? pct+"%" : "0%"}</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: progress + "%",
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            borderRadius: 4,
            transition: `width 1.4s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
            boxShadow: progress > 0 ? `0 0 8px ${color}66` : "none",
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─── PROJECT FILTER ─────────────────────────────────────────────────────── */
function ProjectFilter({ active, onChange }) {
  const filters = ["All", "Python", "React", "SQL", "JavaScript", "Node.js"];
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2rem" }}>
      {filters.map(f => (
        <button key={f} onClick={() => onChange(f)}
          style={{
            background: active === f ? "rgba(110,231,247,0.12)" : "transparent",
            border: `1px solid ${active === f ? "rgba(110,231,247,0.5)" : "rgba(255,255,255,0.1)"}`,
            color: active === f ? "#6ee7f7" : "rgba(232,232,240,0.4)",
            borderRadius: 20, padding: "5px 16px", fontSize: 11, fontFamily: "monospace",
            letterSpacing: "0.06em", cursor: "none", transition: "all 0.2s",
            boxShadow: active === f ? "0 0 12px rgba(110,231,247,0.15)" : "none",
          }}>
          {f}
        </button>
      ))}
    </div>
  );
}

/* ─── COPY CONTACT BTN ───────────────────────────────────────────────────── */
function CopyContactBtn() {
  const toast = useToast();
  const copy = () => {
    const info = "Anand Kundurthi | anandsarmak@gmail.com | +91 7093254137 | linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358";
    navigator.clipboard.writeText(info).then(() => toast("Contact info copied to clipboard!", "success")).catch(() => toast("Copy failed — use email link", "warn"));
  };
  return (
    <button onClick={copy} className="btn-ghost" style={{ cursor: "none" }}>
      📋 Copy Info
    </button>
  );
}

/* ─── MAIN APP ──────────────────────────────────────────────────────────── */

/* ─── WAVE DIVIDER ──────────────────────────────────────────────────────── */
function WaveDivider({ flip = false, color = "rgba(110,231,247,0.06)" }) {
  return (
    <div style={{ lineHeight: 0, position: "relative", zIndex: 2, transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
        <path d="M0,32 C240,56 480,8 720,32 C960,56 1200,8 1440,32 L1440,56 L0,56 Z" fill={color} />
        <path d="M0,40 C360,16 720,56 1080,24 C1260,12 1380,36 1440,40 L1440,56 L0,56 Z" fill={color} opacity="0.5" />
      </svg>
    </div>
  );
}

/* ─── BACK TO TOP ────────────────────────────────────────────────────────── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 200,
        width: 42, height: 42, borderRadius: "50%", cursor: "none",
        background: "rgba(6,8,16,0.9)", border: "1px solid rgba(110,231,247,0.35)",
        color: "#6ee7f7", fontSize: 18, display: "flex", alignItems: "center",
        justifyContent: "center", backdropFilter: "blur(12px)",
        boxShadow: "0 0 20px rgba(110,231,247,0.15)",
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)", pointerEvents: show ? "all" : "none",
      }}
      title="Back to top"
    >↑</button>
  );
}

/* ─── SHARE BUTTON ───────────────────────────────────────────────────────── */
function ShareBtn() {
  const toast = useToast();
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText("https://anand-portfolio-self.vercel.app")
          .then(() => toast("Portfolio link copied! Share away 🚀", "success"))
          .catch(() => toast("Copy failed", "warn"));
      }}
      className="btn-ghost"
      style={{ cursor: "none", fontSize: 10, padding: "8px 16px" }}
    >
      🔗 Share
    </button>
  );
}

/* ─── ACTIVE NAV HOOK ────────────────────────────────────────────────────── */
function useActiveSection(sections) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.35 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ─── GITHUB HEATMAP ─────────────────────────────────────────────────────── */
function GitHubHeatmap() {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Use GitHub contributions via a public proxy
    fetch("https://github-contributions-api.jogruber.de/v4/anandkundurthi?y=last")
      .then(r => r.json())
      .then(data => {
        const contributions = data.contributions || [];
        // Group into weeks of 7 days
        const grouped = [];
        for (let i = 0; i < contributions.length; i += 7) {
          grouped.push(contributions.slice(i, i + 7));
        }
        setWeeks(grouped.slice(-26)); // last 26 weeks
        setTotal(contributions.reduce((s, d) => s + d.count, 0));
        setLoading(false);
      })
      .catch(() => {
        // Fallback: generate realistic-looking mock data
        const mock = Array.from({ length: 26 }, () =>
          Array.from({ length: 7 }, () => ({ count: Math.random() > 0.5 ? Math.floor(Math.random() * 6) : 0 }))
        );
        setWeeks(mock);
        setTotal(mock.flat().reduce((s, d) => s + d.count, 0));
        setLoading(false);
      });
  }, []);

  const getColor = (count) => {
    if (count === 0) return "rgba(255,255,255,0.05)";
    if (count <= 1) return "rgba(110,231,247,0.2)";
    if (count <= 2) return "rgba(110,231,247,0.45)";
    if (count <= 4) return "rgba(110,231,247,0.7)";
    return "#6ee7f7";
  };

  return (
    <SectionReveal>
      <section style={{ padding: "5rem 4rem", position: "relative", zIndex: 2 }}>
        <div className="section-label">Activity</div>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: "2rem", flexWrap: "wrap" }}>
            <h2 className="syne" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0f8" }}>
              GitHub Contributions
            </h2>
            {!loading && (
              <span style={{ fontFamily: "monospace", fontSize: 12, color: "#6ee7f7" }}>
                {total} contributions in the last 6 months
              </span>
            )}
          </div>
        </Reveal>
        {loading ? (
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {Array.from({ length: 26 * 7 }, (_, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: "rgba(255,255,255,0.04)", animation: "glowPulse 1.5s ease infinite", animationDelay: `${(i % 7) * 0.1}s` }} />
            ))}
          </div>
        ) : (
          <div style={{ overflowX: "auto", paddingBottom: 8 }}>
            <div style={{ display: "flex", gap: 3, minWidth: "fit-content" }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={`${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                      className="heatmap-cell"
                      style={{
                        width: 12, height: 12, borderRadius: 2,
                        background: getColor(day.count),
                        transition: "transform 0.15s, box-shadow 0.15s",
                        cursor: "default",
                        boxShadow: day.count > 3 ? "0 0 6px rgba(110,231,247,0.5)" : "none",
                      }}
                      onMouseEnter={e => { e.target.style.transform = "scale(1.5)"; e.target.style.boxShadow = "0 0 8px rgba(110,231,247,0.8)"; }}
                      onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = day.count > 3 ? "0 0 6px rgba(110,231,247,0.5)" : "none"; }}
                    />
                  ))}
                </div>
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
              <span style={{ fontSize: 10, color: "rgba(232,232,240,0.3)", fontFamily: "monospace" }}>Less</span>
              {[0, 1, 2, 4, 6].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: 2, background: getColor(c) }} />
              ))}
              <span style={{ fontSize: 10, color: "rgba(232,232,240,0.3)", fontFamily: "monospace" }}>More</span>
            </div>
          </div>
        )}
      </section>
    </SectionReveal>
  );
}

/* ─── TECH STACK SHOWCASE ────────────────────────────────────────────────── */
function TechStack() {
  const techs = [
    { name: "Python",     color: "#3b82f6", icon: "🐍" },
    { name: "React",      color: "#6ee7f7", icon: "⚛️" },
    { name: "FastAPI",    color: "#4ade80", icon: "⚡" },
    { name: "Node.js",    color: "#a5f3c0", icon: "🟢" },
    { name: "PostgreSQL", color: "#818cf8", icon: "🐘" },
    { name: "MongoDB",    color: "#4ade80", icon: "🍃" },
    { name: "MySQL",      color: "#f0abfc", icon: "🐬" },
    { name: "JavaScript", color: "#fde68a", icon: "𝙅𝙎" },
    { name: "TypeScript", color: "#93c5fd", icon: "𝙏𝙎" },
    { name: "Git",        color: "#fca5a5", icon: "⎇" },
    { name: "Linux",      color: "#fde68a", icon: "🐧" },
    { name: "Figma",      color: "#f0abfc", icon: "✦" },
    { name: "Express",    color: "#e8e8f0", icon: "🚂" },
    { name: "SQL",        color: "#6ee7f7", icon: "⬡" },
    { name: "Docker",     color: "#93c5fd", icon: "🐳" },
    { name: "REST API",   color: "#4ade80", icon: "🔌" },
  ];
  return (
    <SectionReveal>
      <section style={{ padding: "5rem 4rem", background: "rgba(255,255,255,0.008)", position: "relative", zIndex: 2 }}>
        <div className="section-label">Stack</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0f8", marginBottom: "2.5rem" }}>
            Tech I Work With
          </h2>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
          {techs.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.04}>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  border: `1px solid ${t.color}33`,
                  background: `${t.color}08`,
                  borderRadius: 8, padding: "10px 18px",
                  transition: "all 0.25s", cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${t.color}18`;
                  e.currentTarget.style.borderColor = t.color;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${t.color}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${t.color}08`;
                  e.currentTarget.style.borderColor = `${t.color}33`;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(232,232,240,0.7)", letterSpacing: "0.04em" }}>{t.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}

/* ─── WHAT I'M LOOKING FOR ───────────────────────────────────────────────── */
function LookingFor() {
  const prefs = [
    { icon: "💼", label: "Role", value: "Full-Stack / Backend Developer" },
    { icon: "🌍", label: "Location", value: "Remote · Hybrid · Anywhere in India" },
    { icon: "🕐", label: "Type", value: "Full-Time · Internship · Contract" },
    { icon: "🚀", label: "Stack", value: "Python · React · Node.js · FastAPI" },
    { icon: "🤝", label: "Style", value: "Collaborative · Agile · Fast-learner" },
    { icon: "📈", label: "Goal", value: "Grow into a Senior Dev role in 2 years" },
  ];
  return (
    <SectionReveal>
      <section style={{ padding: "5rem 4rem", position: "relative", zIndex: 2 }}>
        <div className="section-label">Availability</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0f8", marginBottom: "2.5rem" }}>
            What I'm Looking For
          </h2>
        </Reveal>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1px", background: "rgba(110,231,247,0.07)", borderRadius: 16,
          overflow: "hidden", border: "1px solid rgba(110,231,247,0.1)",
        }}>
          {prefs.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.06}>
              <div
                style={{ padding: "1.6rem 2rem", background: "#060810", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(110,231,247,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = "#060810"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: "#6ee7f7", letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.label}</span>
                </div>
                <div className="syne" style={{ fontWeight: 700, fontSize: "0.92rem", color: "#f0f0f8", lineHeight: 1.5 }}>{p.value}</div>
              </div>
            </Reveal>
          ))}
        </div>
        {/* Open to work badge */}
        <Reveal delay={0.3}>
          <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 24, padding: "8px 20px" }}>
              <div style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", animation: "pulseGreen 2s infinite" }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#4ade80", letterSpacing: "0.08em" }}>Open to opportunities — Available immediately</span>
            </div>
          </div>
        </Reveal>
      </section>
    </SectionReveal>
  );
}

/* ─── ANIMATED STAT COUNTER (scroll-triggered) ───────────────────────────── */
function AnimatedStat({ n, suffix, label, icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const steps = 60;
        const inc = n / steps;
        const t = setInterval(() => {
          start = Math.min(start + inc, n);
          setCount(Math.floor(start));
          if (start >= n) clearInterval(t);
        }, 1400 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [n]);
  return (
    <div ref={ref} className="stat-card" style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
      <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{icon}</div>
      <div className="syne" style={{ fontSize: "2.4rem", fontWeight: 800, color: "#6ee7f7", lineHeight: 1, marginBottom: 6, textShadow: "0 0 20px rgba(110,231,247,0.4)" }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 10, color: "rgba(232,232,240,0.32)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "monospace" }}>{label}</div>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const filteredProjects = projects.filter(p => projectFilter === "All" || p.type.includes(projectFilter));
  const activeSection = useActiveSection(["about","skills","projects","education","contact"]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => { const el = document.getElementById(id.toLowerCase()); if (el) el.scrollIntoView({ behavior: "smooth" }); };

  return (
    <ToastProvider>
    <div style={{ background: "#060810", color: "#e8e8f0", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #6ee7f7; border-radius: 2px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulseGreen { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.4)} 50%{box-shadow:0 0 0 8px rgba(74,222,128,0)} }
        @keyframes floatY { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-18px)} }
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes avatarFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes toastSlide { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes rippleOut { from{width:0;height:0;opacity:0.8} to{width:120px;height:120px;opacity:0} }
        @keyframes rotateBorder { from{filter:blur(2px) hue-rotate(0deg)} to{filter:blur(2px) hue-rotate(360deg)} }
        .nav-btn { transition: color 0.2s, border-color 0.2s !important; }
        .syne { font-family: 'Syne', sans-serif !important; }
        .nav-btn { background:none; border:none; color:rgba(232,232,240,0.45); font-size:11px; letter-spacing:0.15em; text-transform:uppercase; font-family:'DM Sans',sans-serif; transition:color 0.2s; padding:6px 0; cursor:none; }
        .nav-btn:hover { color:#6ee7f7; }
        .btn-cyan { display:inline-flex; align-items:center; gap:8px; background:#6ee7f7; color:#060810; padding:12px 26px; border:none; border-radius:4px; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; font-family:monospace; text-decoration:none; transition:all 0.25s; cursor:none; position:relative; overflow:hidden; }
        .btn-cyan::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent); transform:translateX(-100%); transition:transform 0.5s; }
        .btn-cyan:hover::before { transform:translateX(100%); }
        .btn-cyan:hover { background:#a5f3fc; transform:translateY(-2px); box-shadow:0 10px 30px rgba(110,231,247,0.35); }
        .btn-ghost { display:inline-flex; align-items:center; gap:8px; background:transparent; color:rgba(232,232,240,0.65); padding:11px 22px; border:1px solid rgba(232,232,240,0.15); border-radius:4px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; font-family:monospace; text-decoration:none; transition:all 0.25s; cursor:none; }
        .btn-ghost:hover { border-color:#6ee7f7; color:#6ee7f7; transform:translateY(-2px); box-shadow:0 0 15px rgba(110,231,247,0.15); }
        .btn-green { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#4ade80; padding:11px 22px; border:1px solid rgba(74,222,128,0.3); border-radius:4px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; font-family:monospace; text-decoration:none; transition:all 0.25s; cursor:none; }
        .btn-green:hover { background:rgba(74,222,128,0.07); border-color:#4ade80; transform:translateY(-2px); box-shadow:0 0 15px rgba(74,222,128,0.2); }
        .stat-card { border:1px solid rgba(255,255,255,0.07); border-radius:8px; padding:1.4rem 1rem; text-align:center; background:rgba(255,255,255,0.02); transition:all 0.3s; }
        .stat-card:hover { border-color:rgba(110,231,247,0.4); transform:translateY(-6px); box-shadow:0 12px 40px rgba(110,231,247,0.1); }
        .skill-pill { display:inline-block; border:1px solid rgba(110,231,247,0.15); color:rgba(232,232,240,0.5); padding:4px 12px; border-radius:3px; font-size:11px; margin:3px; letter-spacing:0.05em; font-family:monospace; transition:all 0.2s; }
        .skill-pill:hover { border-color:#6ee7f7; color:#6ee7f7; background:rgba(110,231,247,0.07); box-shadow:0 0 10px rgba(110,231,247,0.2); }
        .skill-cell { contain: layout style; background:#060810; padding:1.8rem; transition:background 0.3s; position:relative; overflow:hidden; }
        .skill-cell::after { content:''; position:absolute; inset:0; background:radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(110,231,247,0.06), transparent 60%); opacity:0; transition:opacity 0.3s; pointer-events:none; }
        .skill-cell:hover::after { opacity:1; }
        .skill-cell:hover { background:rgba(110,231,247,0.03); }
        .cert-row { contain: layout; display:flex; align-items:center; gap:1.2rem; padding:1rem 1.2rem; border-bottom:1px solid rgba(255,255,255,0.05); transition:all 0.25s; }
        .cert-row:last-child { border-bottom:none; }
        .cert-row:hover { background:rgba(110,231,247,0.04); padding-left:1.8rem; }
        .exp-block { border-left:1px solid rgba(255,255,255,0.08); padding-left:1.6rem; margin-bottom:2.2rem; position:relative; }
        .exp-block::before { content:''; position:absolute; left:-5px; top:4px; width:8px; height:8px; border-radius:50%; background:#6ee7f7; box-shadow:0 0 12px rgba(110,231,247,0.8); animation:glowPulse 2s ease infinite; }
        .section-label { font-family:monospace; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#6ee7f7; margin-bottom:1rem; display:flex; align-items:center; gap:12px; }
        .section-label::after { content:''; width:40px; height:1px; background:rgba(110,231,247,0.3); }
        .social-link { color:rgba(232,232,240,0.3); text-decoration:none; font-size:9px; letter-spacing:0.15em; text-transform:uppercase; font-family:monospace; writing-mode:vertical-rl; transition:all 0.25s; cursor:none; }
        .social-link:hover { color:#6ee7f7; text-shadow:0 0 10px rgba(110,231,247,0.6); }
        [data-theme="light"] .skill-cell { background: #ffffff !important; }
        [data-theme="light"] .skill-pill { border-color: rgba(8,145,178,0.25); color: rgba(15,23,42,0.6); }
        [data-theme="light"] .skill-pill:hover { border-color: #0891b2; color: #0891b2; background: rgba(8,145,178,0.06); }
        [data-theme="light"] .cert-row:hover { background: rgba(8,145,178,0.06); }
        [data-theme="light"] .nav-btn { color: rgba(15,23,42,0.55); }
        [data-theme="light"] .nav-btn:hover { color: #0891b2; }
        [data-theme="light"] .stat-card { border-color: rgba(8,145,178,0.15); background: rgba(8,145,178,0.04); }
        [data-theme="light"] .exp-block { border-left-color: rgba(8,145,178,0.2); }
        [data-theme="light"] .section-label { color: #0891b2; }
        [data-theme="light"] .section-label::after { background: rgba(8,145,178,0.3); }
        @media (max-width:768px) {
          /* ── NAV ── */
          .mobile-menu-btn { display:flex !important; align-items:center; }
          .nav-links { display:none !important; }
          nav { padding:0.8rem 1.2rem !important; }
          .side-socials { display:none !important; }

          /* ── HERO ── */
          .hero-section { padding:3rem 1.2rem 2.5rem !important; }
          .hero-inner { flex-direction:column !important; gap:1.5rem !important; align-items:center !important; text-align:center !important; }
          .avatar-wrap { transform:scale(0.72) !important; margin-bottom:-2rem !important; }
          .hero-btns { justify-content:center !important; flex-wrap:wrap !important; gap:0.6rem !important; }
          .hero-btns a, .hero-btns button { font-size:10px !important; padding:10px 16px !important; }

          /* ── SECTIONS ── */
          section { padding:3rem 1.2rem !important; }

          /* ── ABOUT ── */
          .about-grid { grid-template-columns:1fr !important; gap:2rem !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; gap:0.6rem !important; }

          /* ── SKILLS ── */
          .skills-grid { grid-template-columns:1fr !important; }
          .skill-cell { padding:1.4rem 1rem !important; }
          .skill-ring-circle { display:none !important; }
          .skill-ring-bar { display:block !important; }
          .skill-ring-wrap { width:100% !important; }
          .skill-cell > div:nth-child(3) { flex-direction:column !important; gap:4px !important; }

          /* ── EDUCATION ── */
          .edu-grid { grid-template-columns:1fr !important; gap:2rem !important; }

          /* ── BUILDING TICKER ── */
          .building-ticker { padding:0.6rem 1.2rem !important; }

          /* ── ACHIEVEMENTS STRIP ── */
          .achievements-strip { padding:1.5rem 1.2rem !important; flex-direction:row !important; flex-wrap:wrap !important; }
          .achievements-strip > div { flex:1 1 80px !important; }

          /* ── TECH STACK ── */
          .tech-badge { padding:8px 12px !important; font-size:11px !important; }

          /* ── LOOKING FOR ── */
          .looking-grid { grid-template-columns:1fr !important; }

          /* ── GITHUB HEATMAP ── */
          .heatmap-cell { width:9px !important; height:9px !important; }

          /* ── PROJECT ROWS ── */
          .project-screenshot { display:none !important; }
          .project-row-inner { flex-wrap:wrap !important; gap:0.6rem !important; }
          .project-num { font-size:10px !important; }

          /* ── CONTACT ── */
          .contact-btns { flex-direction:column !important; align-items:stretch !important; }
          .contact-btns a, .contact-btns button { text-align:center !important; justify-content:center !important; }

          /* ── QUOTE BLOCK ── */
          .quote-block { padding:2rem 1.4rem !important; }

          /* ── BACK TO TOP ── */
          .back-to-top { bottom:16px !important; right:16px !important; width:36px !important; height:36px !important; }

          /* ── WAVE DIVIDERS ── */
          svg { height:32px !important; }

          /* ── TYPOGRAPHY ── */
          h2 { font-size:clamp(1.6rem,7vw,2.4rem) !important; }
          .section-label { font-size:9px !important; letter-spacing:0.18em !important; }
        }

        @media (max-width:1024px) {
          .skill-ring-circle { display:none !important; }
          .skill-ring-bar { display:block !important; }
          .skill-ring-wrap { width:100% !important; }
          .skills-grid { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width:480px) {
          .avatar-wrap { transform:scale(0.65) !important; margin-bottom:-2.5rem !important; }
          .hero-btns a, .hero-btns button { width:100% !important; justify-content:center !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; }
          .skills-grid { grid-template-columns:1fr !important; }
          section { padding:2.5rem 1rem !important; }
          nav { padding:0.7rem 1rem !important; }
        }
      `}</style>

      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <ClickRipple />
      <Spotlight />
      <BackToTop />
      <HireEasterEgg />
      <ScrollProgress />

      {/* Ambient orbs */}
      <div style={{ position: "fixed", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,231,247,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1, animation: "floatY 8s ease infinite" }} />
      <div style={{ position: "fixed", bottom: -200, left: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(165,243,192,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1, animation: "floatY 11s ease infinite 2s" }} />

      {/* Side Socials */}
      <div className="side-socials" style={{ position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ width: 1, height: 50, background: "linear-gradient(transparent, rgba(110,231,247,0.3))" }} />
        <a href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
        <a href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
        <a href="mailto:anandsarmak@gmail.com" className="social-link">Email</a>
        <div style={{ width: 1, height: 50, background: "linear-gradient(rgba(110,231,247,0.3), transparent)" }} />
      </div>

      {/* NAV */}
        
       <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", background: "rgba(6,8,16,0.85)", backdropFilter: "blur(12px)" }}>

  <span className="syne" style={{ fontWeight: 800, fontSize: "1.1rem", color: "#f0f0f8" }}>
    AK<span style={{ color: "#6ee7f7" }}>.</span>
  </span>

  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
    <div className="nav-links" style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
      {["About","Skills","Projects","Education","Contact"].map(n => (
        <button key={n} className="nav-btn" onClick={() => scrollTo(n)}
          style={{ color: activeSection === n.toLowerCase() ? "#6ee7f7" : undefined, borderBottom: activeSection === n.toLowerCase() ? "1px solid #6ee7f7" : "1px solid transparent", paddingBottom: 4 }}
        >{n}</button>
      ))}
      <ShareBtn />
      <button className="btn-cyan" style={{ padding: "8px 18px", fontSize: 10 }} onClick={() => scrollTo("contact")}>Hire Me</button>
    </div>
    <div className="mobile-menu-btn" style={{ display: "none" }}>
      <MobileNav scrollTo={scrollTo} />
    </div>
  </div>

</nav>

      {/* HERO */}
      <SectionReveal><section id="about" className="hero-section" style={{ minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem 3rem", position: "relative", overflow: "hidden" }}>
        <ThreeHero />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(110,231,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,247,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4rem" }}>
            {/* Text side */}
            <div style={{ flex: 1 }}>
              <div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "2.5rem" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(74,222,128,0.3)", borderRadius: 3, padding: "6px 14px", fontSize: 10, color: "#4ade80", letterSpacing: "0.1em", fontFamily: "monospace", textTransform: "uppercase", background: "rgba(74,222,128,0.04)" }}>
                    <div style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", animation: "pulseGreen 2s infinite" }} />
                    Available for Opportunities
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, padding: "6px 14px", fontSize: 10, color: "rgba(232,232,240,0.4)", fontFamily: "monospace", background: "rgba(255,255,255,0.02)" }}>
                    <Clock />
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "rgba(110,231,247,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.7rem", fontFamily: "monospace" }}>Hello, I'm</div>
                <h1 className="syne" style={{ fontSize: "clamp(3rem,7vw,7rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "1.4rem", color: "#f0f0f8", textShadow: "0 0 40px rgba(110,231,247,0.15)" }}>
                  Anand<br />
                  <span style={{ background: "linear-gradient(135deg, #6ee7f7 0%, #a5f3fc 40%, #6ee7f7 70%, #a5f3c0 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 4s linear infinite" }}>Kundurthi</span>
                </h1>
                <div className="syne" style={{ fontSize: "clamp(1rem,2.2vw,1.4rem)", fontWeight: 600, margin: "0 0 1.4rem", minHeight: "2rem", color: "rgba(232,232,240,0.65)" }}><TypingText /></div>
                <p style={{ fontSize: "0.92rem", color: "rgba(232,232,240,0.42)", maxWidth: 480, lineHeight: 1.9, marginBottom: "2.8rem" }}>
                  Full-Stack Developer with experience building scalable web applications using Python, FastAPI, React.js, and Node.js. Skilled in designing REST APIs, optimizing SQL queries, and delivering end-to-end product features.
                </p>
                <div className="hero-btns" style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                  <button className="btn-cyan" onClick={() => scrollTo("projects")}>View Projects</button>
                  <a href="https://ai-resume-analyzer-tuet.onrender.com" target="_blank" rel="noreferrer" className="btn-ghost">Live Project</a>
                  <a href="https://drive.google.com/file/d/1PEuAK9LEg8flKRgUPYbi0wOdSpA7Qx7U/view" target="_blank" rel="noreferrer" className="btn-green">Resume</a>
                  <button className="btn-ghost" onClick={() => scrollTo("contact")}>Say Hello</button>
                </div>
              </div>
            </div>
            {/* Avatar side */}
            <div style={{ flexShrink: 0, animation: "avatarFloat 5s ease infinite" }} className="avatar-wrap">
              <Avatar />
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2 }}>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(110,231,247,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(#6ee7f7, transparent)", animation: "glowPulse 1.5s ease infinite" }} />
        </div>
      </section>
        </SectionReveal>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", padding: "0.9rem 0", borderTop: "1px solid rgba(110,231,247,0.07)", borderBottom: "1px solid rgba(110,231,247,0.07)", background: "rgba(110,231,247,0.012)", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", gap: "3rem", width: "max-content", animation: "marquee 26s linear infinite" }}>
          {["Python","React.js","FastAPI","Figma","SQL","Node.js","MERN","JavaScript","Express.js","MongoDB","Python","React.js","FastAPI","Figma","SQL","Node.js","MERN","JavaScript","Express.js","MongoDB"].map((t, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,240,0.22)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "1.5rem", fontFamily: "monospace" }}>
              {t} <span style={{ color: "#6ee7f7", opacity: 0.4 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <BuildingTicker />

      <WaveDivider />

      {/* ABOUT */}
      <section style={{ padding: "7rem 4rem", position: "relative", zIndex: 2 }}>
        <div className="section-label">About Me</div>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <Reveal>
            <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.6rem", color: "#f0f0f8" }}>Turning ideas<br />into reality.</h2>
            <p style={{ fontSize: "0.93rem", color: "rgba(232,232,240,0.48)", lineHeight: 2, marginBottom: "2.4rem" }}>
              I'm <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>Anand Venkata Raghava Sai Kundurthi</strong> from <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>Nuzvid, Andhra Pradesh</strong>. I bridge the gap between clean backend architecture and pixel-perfect frontend experiences.
              <br /><br />
              With hands-on <strong style={{ color: "#6ee7f7", fontWeight: 500 }}>Full-Stack experience</strong> at <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>Diigoo Tech</strong> and intensive training at <strong style={{ color: "#f0f0f8", fontWeight: 500 }}>NxtWave CCBP 4.0</strong>, I build end-to-end — from system design to deployment.
            </p>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              <AnimatedStat n={4} suffix="mo+" label="Industry XP" icon="🏢" />
              <AnimatedStat n={5} suffix="+" label="Certifications" icon="📜" />
              <AnimatedStat n={6} suffix="" label="GitHub Projects" icon="💻" />
              <AnimatedStat n={100} suffix="%" label="Passion to Build" icon="🔥" />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="section-label" style={{ marginBottom: "1.6rem" }}>Experience</div>
            <div className="exp-block">
              <div style={{ fontSize: 10, color: "#6ee7f7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7, fontFamily: "monospace" }}>Apr 2025 – Jul 2025</div>
              <div className="syne" style={{ fontWeight: 700, fontSize: "0.93rem", marginBottom: 3, color: "#f0f0f8" }}>UI/UX Developer Intern (Full-Stack)</div>
              <div style={{ fontSize: 11, color: "rgba(110,231,247,0.5)", marginBottom: 9, fontFamily: "monospace" }}>Diigoo Tech Private Limited · Hyderabad</div>
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {["Developed responsive React.js interfaces, reducing re-renders via memoization and optimized component structure.", "Designed Figma wireframes and interactive prototypes translating business requirements into user-focused solutions.", "Conducted usability testing with stakeholders to identify UX bottlenecks and improve task completion flows.", "Integrated REST APIs with frontend components ensuring accurate data rendering and state management."].map((pt, i) => (
                  <li key={i} style={{ fontSize: 12, color: "rgba(232,232,240,0.43)", lineHeight: 1.8, marginBottom: 6, paddingLeft: 14, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#6ee7f7" }}>›</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="exp-block">
              <div style={{ fontSize: 10, color: "#a5f3c0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7, fontFamily: "monospace" }}>Feb 2025 – Ongoing</div>
              <div className="syne" style={{ fontWeight: 700, fontSize: "0.93rem", marginBottom: 3, color: "#f0f0f8" }}>CCBP 4.0 Fellow — Full-Stack Development</div>
              <div style={{ fontSize: 11, color: "rgba(165,243,192,0.5)", marginBottom: 9, fontFamily: "monospace" }}>NxtWave · Remote</div>
              <p style={{ fontSize: 12, color: "rgba(232,232,240,0.43)", lineHeight: 1.8 }}>Python · DSA · React.js · Node.js · SQL · REST APIs · Linux · System Design</p>
            </div>
          </Reveal>
        </div>
      </section>

      <AchievementsStrip />
      <WaveDivider flip={true} color="rgba(165,243,192,0.05)" />
      <TechStack />
      <WaveDivider color="rgba(110,231,247,0.06)" />
      <LookingFor />
      <WaveDivider flip={true} color="rgba(110,231,247,0.04)" />
      <QuoteBlock />

      {/* SKILLS */}
      <SectionReveal><section id="skills" style={{ padding: "7rem 4rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(110,231,247,0.06)", borderBottom: "1px solid rgba(110,231,247,0.06)", position: "relative", zIndex: 2 }}>
        <div className="section-label">Skills</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.7rem", color: "#f0f0f8" }}>What I Bring</h2>
          <p style={{ color: "rgba(232,232,240,0.38)", fontSize: "0.92rem", marginBottom: "3rem" }}>From building APIs to designing pixel-perfect interfaces.</p>
        </Reveal>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(110,231,247,0.06)" }}>
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="skill-cell" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "0.9rem", color: "#6ee7f7", filter: "drop-shadow(0 0 8px rgba(110,231,247,0.6))" }}>{s.icon}</div>
                <div className="syne" style={{ fontWeight: 700, fontSize: "0.93rem", marginBottom: "0.9rem", color: "#f0f0f8" }}>{s.name}</div>
                <div style={{ marginBottom: "0.8rem" }}>{s.tags.map(t => <span key={t} className="skill-pill">{t}</span>)}</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>{s.bars.map((b,bi) => <SkillRing key={b.name} name={b.name} pct={b.pct} delay={bi*0.1} color={["#6ee7f7","#a5f3c0","#f0abfc","#fde68a","#fca5a5","#93c5fd"][bi % 6]} />)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
        </SectionReveal>

      {/* PROJECTS */}
      <SectionReveal><section id="projects" style={{ padding: "7rem 4rem", position: "relative", zIndex: 2 }}>
        <div className="section-label">My Work</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.7rem", color: "#f0f0f8" }}>Featured Projects</h2>
          <p style={{ color: "rgba(232,232,240,0.38)", fontSize: "0.92rem", marginBottom: "2rem" }}>Real code I have written and shipped.</p>
        </Reveal>
        <ProjectFilter active={projectFilter} onChange={setProjectFilter} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(110,231,247,0.06)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(110,231,247,0.1)", backdropFilter: "blur(20px)" }}>
          {filteredProjects.length === 0
            ? <div style={{ padding: "3rem", textAlign: "center", color: "rgba(232,232,240,0.3)", fontFamily: "monospace", fontSize: 13 }}>No projects match this filter.</div>
            : filteredProjects.map((p, i) => (<Reveal key={p.name} delay={i * 0.07}><ProjectRow p={p} /></Reveal>))}
        </div>
      </section>
        </SectionReveal>

      {/* EDUCATION */}
      <SectionReveal><section id="education" style={{ padding: "7rem 4rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(110,231,247,0.06)", borderBottom: "1px solid rgba(110,231,247,0.06)", position: "relative", zIndex: 2 }}>
        <div className="section-label">Background</div>
        <Reveal><h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "3rem", color: "#f0f0f8" }}>Education & Certifications</h2></Reveal>
        <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
          <Reveal>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,240,0.28)", marginBottom: "1.8rem", fontFamily: "monospace" }}>Academic</div>
            {[{ year: "Feb 2025 – Ongoing", inst: "NxtWave CCBP 4.0 Intensive Fellowship", deg: "Full-Stack Development (Pursuing) · Remote", color: "#6ee7f7" }, { year: "2018 – 2021", inst: "Krishna University, Machilipatnam", deg: "Bachelor of Commerce (Computers) · Andhra Pradesh", color: "#a5f3c0" }].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: "1.4rem", marginBottom: "2.2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, background: e.color, borderRadius: "50%", marginTop: 3, boxShadow: `0 0 14px ${e.color}` }} />
                  {i === 0 && <div style={{ width: 1, height: 46, background: "linear-gradient(rgba(110,231,247,0.3),transparent)", marginTop: 5 }} />}
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
            <div style={{ border: "1px solid rgba(110,231,247,0.08)", borderRadius: 8, overflow: "hidden" }}>
              {certs.map(c => (
                <div key={c.num} className="cert-row">
                  <span style={{ fontSize: 11, color: "#6ee7f7", minWidth: 26, opacity: 0.6, fontFamily: "monospace" }}>{c.num}</span>
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
        </SectionReveal>

      <WaveDivider color="rgba(110,231,247,0.05)" />
      <GitHubHeatmap />
      <WaveDivider flip={true} color="rgba(110,231,247,0.05)" />

      {/* CONTACT */}
      <SectionReveal><section id="contact" style={{ padding: "7rem 4rem", position: "relative", zIndex: 2 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(110,231,247,0.05) 0%,transparent 70%)", pointerEvents: "none", animation: "floatY 6s ease infinite" }} />
        <Reveal>
          <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", textAlign: "center" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Contact</div>
            <h2 className="syne" style={{ fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem", color: "#f0f0f8", lineHeight: 1.05 }}>
              Let's build something<br />
              <span style={{ color: "#6ee7f7", textShadow: "0 0 30px rgba(110,231,247,0.4)" }}>great together.</span>
            </h2>
            <p style={{ color: "rgba(232,232,240,0.38)", fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "2.5rem" }}>
              Open to Full-Stack, Backend, and Frontend Developer roles.<br />Also open to internships, collaborations, and creative challenges.
            </p>
            {/* Direct links */}
            <div className="contact-btns" style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <a href="mailto:anandsarmak@gmail.com" className="btn-cyan">Send Email</a>
              <a href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
              <a href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
              <CopyContactBtn />
            </div>
            {/* Contact Form */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: "1.5rem" }}>
                <div style={{ height: 1, width: 60, background: "rgba(110,231,247,0.15)" }} />
                <span style={{ fontSize: 10, color: "rgba(110,231,247,0.4)", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" }}>or send a message</span>
                <div style={{ height: 1, width: 60, background: "rgba(110,231,247,0.15)" }} />
              </div>
              <ContactForm />
            </div>
            <div style={{ fontSize: 11, color: "rgba(232,232,240,0.25)", fontFamily: "monospace", letterSpacing: "0.06em" }}>
              Nuzvid, Andhra Pradesh · +91 7093254137 · anandsarmak@gmail.com
            </div>
          </div>
        </Reveal>
      </section>
        </SectionReveal>

      <WaveDivider color="rgba(110,231,247,0.04)" />
      <footer style={{ textAlign: "center", padding: "1.5rem 4rem", borderTop: "1px solid rgba(110,231,247,0.06)", position: "relative", zIndex: 2 }}>
        <span style={{ fontSize: 10, color: "rgba(232,232,240,0.18)", fontFamily: "monospace", letterSpacing: "0.1em" }}>
          Crafted with curiosity, coffee, and way too many open tabs · 2025 Anand Kundurthi
        </span>
      </footer>
    </div>
    </ToastProvider>
  );
}
