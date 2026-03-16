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
  const [phase, setPhase] = useState("loading"); // loading | reveal | done
  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 14 + 3;
      if (p >= 100) {
        p = 100; clearInterval(t);
        setTimeout(() => setPhase("reveal"), 200);
        setTimeout(() => { setPhase("done"); onDone(); }, 1400);
      }
      setProgress(Math.min(p, 100));
    }, 60);
    return () => clearInterval(t);
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#020408",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      // Cinematic split — slides up on reveal
      clipPath: phase === "reveal" ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
      transition: phase === "reveal" ? "clip-path 1.1s cubic-bezier(0.76,0,0.24,1)" : "none",
    }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,231,247,0.08) 0%, transparent 65%)", filter: "blur(40px)", animation: "glowPulse 2s ease infinite" }} />
      {/* Horizontal scan line */}
      <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(110,231,247,0.5),transparent)", animation: "scanLine 1.8s ease-in-out infinite", top: "50%" }} />

      {/* Big AK letters */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: "3rem" }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(5rem,14vw,10rem)", lineHeight: 0.85,
          letterSpacing: "-0.06em", color: "transparent",
          WebkitTextStroke: "1px rgba(110,231,247,0.3)",
          position: "relative",
          animation: "fadeInUp 0.6s ease forwards",
        }}>
          AK
          <div style={{ position: "absolute", inset: 0, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "inherit", lineHeight: "inherit", letterSpacing: "inherit", color: "#6ee7f7", clipPath: `inset(0 ${100 - progress}% 0 0)`, WebkitTextStroke: "0", textShadow: "0 0 60px rgba(110,231,247,0.6), 0 0 120px rgba(110,231,247,0.3)" }}>AK</div>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.5em", color: "rgba(110,231,247,0.35)", marginTop: "1rem", textTransform: "uppercase", animation: "fadeInUp 0.6s 0.2s ease both" }}>
          Initializing Portfolio
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: "relative", zIndex: 2, width: "min(320px, 80vw)" }}>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden", marginBottom: "0.8rem" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #6ee7f7, #a5f3c0, #f0abfc)", transition: "width 0.08s linear", boxShadow: "0 0 12px rgba(110,231,247,0.8), 0 0 24px rgba(110,231,247,0.4)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(110,231,247,0.3)", letterSpacing: "0.2em" }}>LOADING</span>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(110,231,247,0.5)", letterSpacing: "0.1em" }}>{Math.floor(progress).toString().padStart(3,"0")}%</span>
        </div>
      </div>
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
    let W, H, animId, mouseX = 0.5, mouseY = 0.5;
    let isVisible = true;
    const observer = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; }, { threshold: 0 });
    observer.observe(canvas);

    const resize = () => {
      W = canvas.parentElement.clientWidth;
      H = canvas.parentElement.clientHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    canvas.parentElement.addEventListener("mousemove", (e) => {
      const r = canvas.parentElement.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width;
      mouseY = (e.clientY - r.top) / r.height;
    }, { passive: true });

    // ── 3D Globe parameters ──
    const RADIUS = Math.min(W, H) * 0.28;
    const LATLINES = 12, LNGLINES = 16;
    const DOTS = 180;

    let rotX = 0.3, rotY = 0;

    // Project 3D point to 2D with perspective
    const project = (x, y, z, cx, cy) => {
      // Apply rotation
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      // Rotate Y
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      // Rotate X
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const fov = 900;
      const scale = fov / (fov + z2 + 300);
      return { sx: cx + x1 * scale, sy: cy + y2 * scale, scale, z: z2 };
    };

    let lastFrame = 0;
    const INTERVAL = 1000 / 30;

    const draw = (now) => {
      animId = requestAnimationFrame(draw);
      if (!isVisible) return;
      if (now - lastFrame < INTERVAL) return;
      lastFrame = now;

      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.72, cy = H * 0.5;
      const R = Math.min(W, H) * 0.26;

      // Auto-rotate + subtle mouse influence
      rotY += 0.004;
      rotX = 0.25 + (mouseY - 0.5) * 0.3;

      // ── Draw latitude lines ──
      for (let i = 0; i <= LATLINES; i++) {
        const lat = (i / LATLINES) * Math.PI - Math.PI / 2;
        const r = Math.cos(lat) * R;
        const y = Math.sin(lat) * R;
        const pts = [];
        for (let j = 0; j <= 64; j++) {
          const lng = (j / 64) * Math.PI * 2;
          const x = Math.cos(lng) * r;
          const z = Math.sin(lng) * r;
          pts.push(project(x, y, z, cx, cy));
        }
        ctx.beginPath();
        pts.forEach((p, idx) => {
          const alpha = Math.max(0, (p.z + R) / (2 * R)) * 0.15 + 0.03;
          if (idx === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        });
        ctx.strokeStyle = "rgba(110,231,247,0.12)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Draw longitude lines ──
      for (let j = 0; j < LNGLINES; j++) {
        const lng = (j / LNGLINES) * Math.PI * 2;
        const pts = [];
        for (let i = 0; i <= 48; i++) {
          const lat = (i / 48) * Math.PI - Math.PI / 2;
          const x = Math.cos(lat) * Math.cos(lng) * R;
          const y = Math.sin(lat) * R;
          const z = Math.cos(lat) * Math.sin(lng) * R;
          pts.push(project(x, y, z, cx, cy));
        }
        ctx.beginPath();
        pts.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        });
        ctx.strokeStyle = "rgba(110,231,247,0.08)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Draw floating dots on globe surface ──
      const LABELS = ["API","SQL","Git","React","Python","Node","AI","ML","DB","JWT","CSS","DOM"];
      for (let i = 0; i < DOTS; i++) {
        const lat = (i / DOTS) * Math.PI * 2;
        const lng = ((i * 2.4) % (Math.PI * 2));
        const x = Math.cos(lat) * Math.cos(lng) * R;
        const y = Math.sin(lat) * R;
        const z = Math.cos(lat) * Math.sin(lng) * R;
        const p = project(x, y, z, cx, cy);
        if (p.z < -R * 0.1) continue; // cull back face
        const brightness = (p.z + R) / (2 * R);
        const size = p.scale * (brightness > 0.7 ? 2.5 : 1.5);
        const alpha = brightness * 0.8 + 0.1;
        const isHub = i % 14 === 0;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, isHub ? size * 2 : size, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0
          ? `rgba(110,231,247,${alpha})`
          : `rgba(165,243,192,${alpha * 0.7})`;
        ctx.fill();
        // Labels on hub dots facing camera
        if (isHub && brightness > 0.6) {
          ctx.font = `bold ${Math.floor(8 * p.scale)}px monospace`;
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(232,232,240,${alpha * 0.7})`;
          ctx.fillText(LABELS[(i / 14) % LABELS.length], p.sx, p.sy - size * 2 - 3);
        }
      }

      // ── Orbit ring around globe ──
      for (let k = 0; k < 3; k++) {
        const orbitR = R * (1.15 + k * 0.12);
        const orbitTilt = [0.4, -0.3, 0.7][k];
        const pts = [];
        for (let j = 0; j <= 80; j++) {
          const a = (j / 80) * Math.PI * 2;
          const x = Math.cos(a) * orbitR;
          const y = Math.sin(a) * Math.sin(orbitTilt) * orbitR;
          const z = Math.sin(a) * Math.cos(orbitTilt) * orbitR;
          pts.push(project(x, y, z, cx, cy));
        }
        ctx.beginPath();
        pts.forEach((p, idx) => {
          if (p.z < -R * 0.3) return;
          if (idx === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        });
        ctx.strokeStyle = ["rgba(110,231,247,0.18)","rgba(165,243,192,0.12)","rgba(240,171,252,0.1)"][k];
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Orbiting dot
        const orbAngle = rotY * [1.2, -0.8, 1.6][k];
        const ox = Math.cos(orbAngle) * orbitR;
        const oy = Math.sin(orbAngle) * Math.sin(orbitTilt) * orbitR;
        const oz = Math.sin(orbAngle) * Math.cos(orbitTilt) * orbitR;
        const op = project(ox, oy, oz, cx, cy);
        if (op.z > -R * 0.3) {
          ctx.beginPath();
          ctx.arc(op.sx, op.sy, 3 * op.scale, 0, Math.PI * 2);
          ctx.fillStyle = ["#6ee7f7","#a5f3c0","#f0abfc"][k];
          ctx.fill();
          ctx.shadowBlur = 10;
          ctx.shadowColor = ["#6ee7f7","#a5f3c0","#f0abfc"][k];
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // ── Background neural nodes (left side) ──
      const nodeCount = 16;
      for (let i = 0; i < nodeCount; i++) {
        const nx = (W * 0.05) + Math.sin(i * 1.3 + rotY * 0.3) * W * 0.18;
        const ny = (H * 0.1) + (i / nodeCount) * H * 0.8 + Math.cos(i * 0.9) * 30;
        ctx.beginPath();
        ctx.arc(nx, ny, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(110,231,247,0.2)";
        ctx.fill();
        if (i > 0) {
          const px = (W * 0.05) + Math.sin((i-1) * 1.3 + rotY * 0.3) * W * 0.18;
          const py = (H * 0.1) + ((i-1) / nodeCount) * H * 0.8 + Math.cos((i-1) * 0.9) * 30;
          ctx.beginPath();
          ctx.moveTo(px, py); ctx.lineTo(nx, ny);
          ctx.strokeStyle = "rgba(110,231,247,0.06)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    draw(0);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.9, willChange: "transform" }} />
  );
}

/* ─── PARTICLE FIELD ────────────────────────────────────────────────────── */
/* ParticleField removed for performance */

/* ─── TILT CARD ─────────────────────────────────────────────────────────── */
function TiltCard({ children, color }) {
  const ref = useRef(null);
  const shineRef = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / rect.height) * -28;
    const rotY = ((x - rect.width / 2) / rect.width) * 28;
    el.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.06,1.06,1.06) translateZ(30px)`;
    // Rim light — brighten the edge facing the mouse
    const rimX = (x / rect.width) * 100;
    const rimY = (y / rect.height) * 100;
    el.style.boxShadow = `0 40px 120px rgba(0,0,0,0.7), 0 0 80px ${color}30, 0 0 30px ${color}18, inset 0 1px 0 rgba(255,255,255,0.08)`;
    el.style.outline = `1px solid ${color}40`;
    el.style.transition = "box-shadow 0.08s, transform 0.08s, outline 0.08s";
    // Shine layer follows mouse
    if (shineRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      shineRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.06) 0%, transparent 60%)`;
      shineRef.current.style.opacity = "1";
    }
  }, [color]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1) translateZ(0)";
    el.style.transition = "all 0.7s cubic-bezier(0.23,1,0.32,1)";
    el.style.boxShadow = "none";
    el.style.outline = "1px solid transparent";
    if (shineRef.current) shineRef.current.style.opacity = "0";
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transformStyle: "preserve-3d", willChange: "transform", position: "relative" }}>
      {/* Shine overlay */}
      <div ref={shineRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0, transition: "opacity 0.3s", zIndex: 10, borderRadius: "inherit" }} />
      {children}
    </div>
  );
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
  const gradRef = useRef(null);
  return (
    <div style={{ position: "relative", flexShrink: 0, transformStyle: "preserve-3d" }}>
      {/* Animated gradient halo */}
      <div ref={gradRef} style={{
        position: "absolute", inset: -4, borderRadius: "50%",
        background: "conic-gradient(#6ee7f7, #a5f3c0, #f0abfc, #fde68a, #6ee7f7)",
        filter: "blur(2px)", zIndex: 0,
        animation: "rotateBorder 4s linear infinite",
      }} />
      {/* Outer glow orb */}
      <div style={{ position: "absolute", inset: -24, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,231,247,0.12) 0%, transparent 70%)", filter: "blur(18px)", zIndex: 0, animation: "glowPulse 3s ease infinite" }} />
      {/* 3D rotating hex frame — 3 rings at different 3D angles */}
      <div style={{ position: "absolute", inset: -20, zIndex: 0, transformStyle: "preserve-3d", animation: "spin3d 12s linear infinite" }}>
        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(110,231,247,0.2)", borderRadius: "50%", transform: "rotateX(60deg)", boxShadow: "0 0 12px rgba(110,231,247,0.15) inset" }} />
        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(165,243,192,0.15)", borderRadius: "50%", transform: "rotateX(60deg) rotateY(60deg)", boxShadow: "0 0 8px rgba(165,243,192,0.1) inset" }} />
        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(240,171,252,0.12)", borderRadius: "50%", transform: "rotateX(60deg) rotateY(120deg)", boxShadow: "0 0 8px rgba(240,171,252,0.1) inset" }} />
      </div>
      {/* Floating orbit dot */}
      <div style={{ position: "absolute", inset: -18, zIndex: 0, animation: "orbitDot 4s linear infinite" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 7, height: 7, background: "#6ee7f7", borderRadius: "50%", boxShadow: "0 0 10px rgba(110,231,247,0.9), 0 0 20px rgba(110,231,247,0.5)" }} />
      </div>
      <div style={{ position: "absolute", inset: -28, zIndex: 0, animation: "orbitDot 6s linear infinite reverse" }}>
        <div style={{ position: "absolute", top: "25%", left: 0, width: 5, height: 5, background: "#a5f3c0", borderRadius: "50%", boxShadow: "0 0 8px rgba(165,243,192,0.9)" }} />
      </div>
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
  const [flipped, setFlipped] = useState(false);
  return (
    <div style={{ perspective: "1200px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{
        position: "relative", transformStyle: "preserve-3d",
        transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        minHeight: 120,
      }}>
        {/* FRONT */}
        <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
        <TiltCard color={p.color}>
      <div
        style={{
          position: "relative", overflow: "hidden",
          padding: "2rem 2.2rem",
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
        {/* Flip button */}
        <button onClick={() => setFlipped(true)} style={{ marginTop: 12, fontFamily: "monospace", fontSize: 9, color: p.color, border: `1px solid ${p.color}33`, background: `${p.color}08`, borderRadius: 4, padding: "4px 10px", cursor: "none", opacity: hov ? 1 : 0, transition: "opacity 0.3s" }}>
          Details ↻
        </button>
      </div>
    </TiltCard>
        </div>
        {/* BACK FACE */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)", background: `linear-gradient(135deg, ${p.color}15, rgba(6,8,16,0.98))`,
          borderLeft: `3px solid ${p.color}`, padding: "1.8rem 2.2rem",
          display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 120,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span className="syne" style={{ fontWeight: 800, fontSize: "1rem", color: p.color }}>{p.emoji} {p.name}</span>
              <button onClick={() => setFlipped(false)} style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(232,232,240,0.4)", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", borderRadius: 4, padding: "4px 10px", cursor: "none" }}>← Back</button>
            </div>
            <p style={{ fontSize: 12, color: "rgba(232,232,240,0.6)", lineHeight: 1.9, marginBottom: "1rem" }}>{p.desc}</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            {p.type.split(" · ").map(t => (
              <span key={t} style={{ fontFamily: "monospace", fontSize: 10, color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}30`, borderRadius: 3, padding: "3px 8px" }}>{t}</span>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <a href={p.github} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: 10, color: "#f0f0f8", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, padding: "5px 12px", textDecoration: "none" }}>GitHub ↗</a>
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: 10, color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 4, padding: "5px 12px", textDecoration: "none" }}>Live ↗</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
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
      setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 1000);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return (
    <>
      {ripples.map(r => (
        <div key={r.id} style={{ position: "fixed", left: r.x, top: r.y, pointerEvents: "none", zIndex: 9995, transform: "translate(-50%,-50%)", transformStyle: "preserve-3d", perspective: "400px" }}>
          {/* Ring 1 — front, fast */}
          <div style={{ position: "absolute", width: 0, height: 0, border: "2px solid rgba(110,231,247,0.9)", borderRadius: "50%", transform: "translate(-50%,-50%) perspective(400px) rotateX(0deg)", animation: "ripple3d1 0.8s cubic-bezier(0.22,1,0.36,1) forwards", boxShadow: "0 0 8px rgba(110,231,247,0.4)" }} />
          {/* Ring 2 — tilted, medium */}
          <div style={{ position: "absolute", width: 0, height: 0, border: "1.5px solid rgba(165,243,192,0.6)", borderRadius: "50%", transform: "translate(-50%,-50%) perspective(400px) rotateX(55deg)", animation: "ripple3d2 0.9s cubic-bezier(0.22,1,0.36,1) 0.05s forwards" }} />
          {/* Ring 3 — far depth, slow */}
          <div style={{ position: "absolute", width: 0, height: 0, border: "1px solid rgba(240,171,252,0.4)", borderRadius: "50%", transform: "translate(-50%,-50%) perspective(400px) rotateX(70deg) rotateY(20deg)", animation: "ripple3d3 1s cubic-bezier(0.22,1,0.36,1) 0.1s forwards" }} />
          {/* Center flash */}
          <div style={{ position: "absolute", width: 8, height: 8, background: "radial-gradient(circle, rgba(110,231,247,0.9), transparent)", borderRadius: "50%", transform: "translate(-50%,-50%)", animation: "centerFlash 0.4s ease forwards" }} />
        </div>
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
      background: "linear-gradient(90deg, rgba(110,231,247,0.06), rgba(165,243,192,0.03), rgba(110,231,247,0.06))",
      borderTop: "1px solid rgba(110,231,247,0.12)", borderBottom: "1px solid rgba(110,231,247,0.12)",
      padding: "0.7rem 4rem", display: "flex", alignItems: "center", gap: "1.2rem",
      overflow: "hidden", position: "relative", zIndex: 2,
    }}>
      {/* Animated signal bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
        {[0.4,0.7,1,0.7,0.4].map((h,i) => (
          <div key={i} style={{ width: 2, height: `${h*14}px`, background: "#4ade80", borderRadius: 2, animation: `signalBar 1s ease infinite`, animationDelay: `${i*0.12}s`, boxShadow: "0 0 6px rgba(74,222,128,0.7)" }} />
        ))}
      </div>
      <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.22em", color: "#4ade80", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0, textShadow: "0 0 10px rgba(74,222,128,0.7)" }}>
        LIVE
      </span>
      <div style={{ width: 1, height: 16, background: "linear-gradient(transparent, rgba(110,231,247,0.4), transparent)", flexShrink: 0 }} />
      <span style={{
        fontSize: 11, fontFamily: "monospace", color: "rgba(232,232,240,0.7)",
        letterSpacing: "0.06em", opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease", textShadow: visible ? "0 0 8px rgba(110,231,247,0.3)" : "none",
      }}>{items[idx]}</span>
      {/* Shimmer sweep */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(110,231,247,0.04) 50%, transparent 100%)", animation: "shimmer 3s linear infinite", pointerEvents: "none" }} />
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
        <div key={i} style={{ textAlign: "center", flex: "1 1 120px", transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s", borderRadius: 8, padding: "1rem 0.5rem", cursor: "default" }}
          onMouseEnter={e => { e.currentTarget.style.transform = `perspective(400px) translateZ(20px) translateY(-6px) rotateX(-4deg)`; e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(110,231,247,0.1)`; e.currentTarget.style.background = "rgba(110,231,247,0.03)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "transparent"; }}
        >
          <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem", filter: "drop-shadow(0 0 8px rgba(110,231,247,0.4))" }}>{item.icon}</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#6ee7f7", textShadow: "0 0 20px rgba(110,231,247,0.6), 0 0 40px rgba(110,231,247,0.2)", lineHeight: 1 }}>{item.val}</div>
          <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(232,232,240,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{item.label}</div>
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
        border: "1px solid rgba(110,231,247,0.15)", borderRadius: 16,
        padding: "3.5rem 3.5rem", background: "rgba(110,231,247,0.025)",
        backdropFilter: "blur(20px)", position: "relative", overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: "0 0 60px rgba(110,231,247,0.04), inset 0 1px 0 rgba(110,231,247,0.12)",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "perspective(800px) rotateX(-1deg) translateZ(10px)"; e.currentTarget.style.boxShadow = "0 30px 80px rgba(0,0,0,0.4), 0 0 80px rgba(110,231,247,0.08), inset 0 1px 0 rgba(110,231,247,0.2)"; e.currentTarget.style.borderColor = "rgba(110,231,247,0.3)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 60px rgba(110,231,247,0.04), inset 0 1px 0 rgba(110,231,247,0.12)"; e.currentTarget.style.borderColor = "rgba(110,231,247,0.15)"; }}
      >
        {/* Corner accents */}
        {["tl","tr","bl","br"].map(pos => (
          <div key={pos} style={{ position: "absolute", width: 20, height: 20, borderColor: "rgba(110,231,247,0.3)", borderStyle: "solid", borderWidth: pos.includes("t") ? "1px 0 0" : "0 0 1px", ...(pos.includes("l") ? { left: 16, borderLeftWidth: 1, borderRightWidth: 0 } : { right: 16, borderRightWidth: 1, borderLeftWidth: 0 }), ...(pos.includes("t") ? { top: 16 } : { bottom: 16 }) }} />
        ))}
        {/* Ambient glow inside */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 300, height: 100, background: "radial-gradient(ellipse, rgba(110,231,247,0.06), transparent)", filter: "blur(20px)", pointerEvents: "none" }} />
        <div style={{ fontSize: "4rem", lineHeight: 1, marginBottom: "1.2rem", color: "#6ee7f7", fontFamily: "Georgia, serif", textShadow: "0 0 30px rgba(110,231,247,0.5)", opacity: 0.5 }}>"</div>
        <p style={{ fontSize: "1.2rem", fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#f0f0f8", lineHeight: 1.8, marginBottom: "2rem", letterSpacing: "-0.01em", textShadow: "0 0 20px rgba(255,255,255,0.05)" }}>
          I don't just write code — I craft experiences. Every API endpoint, every UI component, every database query is a chance to build something that actually matters to people.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6ee7f7, #a5f3c0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#060810", fontFamily: "'Syne', sans-serif", boxShadow: "0 0 20px rgba(110,231,247,0.4)" }}>AK</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f0f0f8", fontFamily: "'Syne', sans-serif" }}>Anand Kundurthi</div>
            <div style={{ fontSize: 10, color: "rgba(110,231,247,0.5)", fontFamily: "monospace", letterSpacing: "0.1em" }}>Full-Stack Developer · Diigoo Tech</div>
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
  const glowColor = color.replace(/[\d.]+\)$/, "0.4)");
  return (
    <div style={{ lineHeight: 0, position: "relative", zIndex: 2, transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", filter: `drop-shadow(0 0 8px ${glowColor})` }}>
        <path d="M0,32 C240,60 480,4 720,32 C960,60 1200,4 1440,32 L1440,64 L0,64 Z" fill={color} />
        <path d="M0,40 C360,12 720,58 1080,22 C1260,8 1380,38 1440,42 L1440,64 L0,64 Z" fill={color} opacity="0.6" />
        {/* Glowing edge line */}
        <path d="M0,32 C240,60 480,4 720,32 C960,60 1200,4 1440,32" stroke={color.replace(/[\d.]+\)$/, "0.5)")} strokeWidth="1" fill="none" filter="url(#glow)"/>
        <defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
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
        width: 46, height: 46, borderRadius: "50%", cursor: "none",
        background: "rgba(6,8,16,0.95)", border: "1px solid rgba(110,231,247,0.5)",
        color: "#6ee7f7", fontSize: 18, display: "flex", alignItems: "center",
        justifyContent: "center", backdropFilter: "blur(16px)",
        boxShadow: "0 0 30px rgba(110,231,247,0.25), 0 0 60px rgba(110,231,247,0.1), inset 0 1px 0 rgba(110,231,247,0.2)",
        textShadow: "0 0 10px rgba(110,231,247,0.8)",
        opacity: show ? 1 : 0, transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", pointerEvents: show ? "all" : "none",
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
                      onMouseEnter={e => { e.target.style.transform = "scale(2) perspective(100px) translateZ(8px)"; e.target.style.boxShadow = "0 0 12px rgba(110,231,247,1), 0 0 24px rgba(110,231,247,0.5)"; e.target.style.zIndex = "10"; e.target.style.position = "relative"; }}
                      onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = day.count > 3 ? "0 0 6px rgba(110,231,247,0.5)" : "none"; e.target.style.zIndex = ""; }}
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
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0f8", marginBottom: "2.5rem" }}>
            Tech I <span style={{color:"#6ee7f7",textShadow:"0 0 30px rgba(110,231,247,0.4)"}}>Work With</span>
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
                  e.currentTarget.style.transform = `perspective(300px) translateZ(16px) translateY(-5px)`;
                  e.currentTarget.style.boxShadow = `0 12px 32px ${t.color}33, 0 0 20px ${t.color}22, inset 0 1px 0 rgba(255,255,255,0.1)`;
                  e.currentTarget.style.textShadow = `0 0 10px ${t.color}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${t.color}08`;
                  e.currentTarget.style.borderColor = `${t.color}33`;
                  e.currentTarget.style.transform = "perspective(300px) translateZ(0) translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.textShadow = "none";
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
                style={{ padding: "1.6rem 2rem", background: "#060810", transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)", transformStyle: "preserve-3d" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(110,231,247,0.04)"; e.currentTarget.style.transform = "perspective(400px) translateZ(14px)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(110,231,247,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#060810"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
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


/* ─── 3D FLOATING PARTICLES ─────────────────────────────────────────────── */
function Particles3D() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, animId;
    const COUNT = 60;
    let particles = [];

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random() * 800 - 400,  // depth -400 to +400
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.5,
      color: Math.random() > 0.6 ? "#6ee7f7" : Math.random() > 0.5 ? "#a5f3c0" : "#f0abfc",
    }));

    let lastFrame = 0;
    const draw = (now) => {
      animId = requestAnimationFrame(draw);
      if (now - lastFrame < 50) return; // 20fps — very light
      lastFrame = now;
      ctx.clearRect(0, 0, W, H);

      // Sort by z for depth order
      particles.sort((a, b) => a.z - b.z);

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        if (p.z < -400 || p.z > 400) p.vz *= -1;

        // Perspective projection
        const fov = 600;
        const scale = fov / (fov + p.z + 400);
        const sx = W/2 + (p.x - W/2) * scale;
        const sy = H/2 + (p.y - H/2) * scale;
        const r = Math.max(0.5, 2.5 * scale);
        const alpha = scale * 0.5;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `,${alpha})`).replace("rgb", "rgba").replace("#6ee7f7", `rgba(110,231,247,${alpha})`).replace("#a5f3c0", `rgba(165,243,192,${alpha})`).replace("#f0abfc", `rgba(240,171,252,${alpha})`);
        ctx.fill();
      });
    };
    draw(0);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.6 }} />;
}


/* ─── 3D MORPHING BACKGROUND ────────────────────────────────────────────── */
function MorphBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, animId, mx = 0.5, my = 0.5;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", e => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    }, { passive: true });

    let t = 0;
    // Morphing blob control points
    const blobs = [
      { x: 0.25, y: 0.3,  r: 0.22, color: "rgba(110,231,247,", phase: 0   },
      { x: 0.75, y: 0.6,  r: 0.18, color: "rgba(165,243,192,", phase: 1.2 },
      { x: 0.5,  y: 0.8,  r: 0.15, color: "rgba(110,231,247,", phase: 2.4 },
    ];

    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      blobs.forEach(b => {
        // Morph position with mouse influence + time
        const bx = (b.x + Math.sin(t + b.phase) * 0.08 + (mx - 0.5) * 0.06) * W;
        const by = (b.y + Math.cos(t * 0.7 + b.phase) * 0.06 + (my - 0.5) * 0.04) * H;
        const br = (b.r + Math.sin(t * 1.3 + b.phase) * 0.02) * Math.min(W, H);

        // Draw morphing blob using bezier curves
        const pts = 8;
        ctx.beginPath();
        for (let i = 0; i <= pts; i++) {
          const angle = (i / pts) * Math.PI * 2;
          const warp = 1 + Math.sin(t * 1.8 + angle * 3 + b.phase) * 0.18;
          const r = br * warp;
          const px = bx + Math.cos(angle) * r;
          const py = by + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br * 1.2);
        grad.addColorStop(0, b.color + "0.06)");
        grad.addColorStop(0.5, b.color + "0.03)");
        grad.addColorStop(1, b.color + "0)");
        ctx.fillStyle = grad;
        ctx.fill();
      });
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 1 }} />;
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
        body::after { content:''; position:fixed; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px); pointer-events:none; z-index:9990; animation:none; }
        html { scroll-behavior: smooth; }
        .scene-3d { transform-style: preserve-3d; perspective: 1000px; }
        .depth-1 { transform: translateZ(10px); }
        .depth-2 { transform: translateZ(20px); }
        .depth-3 { transform: translateZ(40px); }
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #6ee7f7; border-radius: 2px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scanLine { 0%{top:-2px;opacity:0} 10%{opacity:0.6} 90%{opacity:0.4} 100%{top:102%;opacity:0} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glitch1 { 0%,85%,100%{opacity:0;transform:translate(0)} 86%{opacity:0.7;transform:translate(-3px,0);clip-path:inset(20% 0 50% 0)} 88%{opacity:0.7;transform:translate(3px,0);clip-path:inset(60% 0 15% 0)} 90%{opacity:0;} }
        @keyframes glitch2 { 0%,87%,100%{opacity:0;transform:translate(0)} 88%{opacity:0.5;transform:translate(3px,0);clip-path:inset(40% 0 30% 0)} 89%{opacity:0.5;transform:translate(-3px,0);clip-path:inset(10% 0 70% 0)} 91%{opacity:0;} }
        @keyframes neonFlicker { 0%,95%,100%{opacity:1} 96%{opacity:0.7} 97%{opacity:1} 98%{opacity:0.5} 99%{opacity:1} }
        @keyframes signalBar { 0%,100%{transform:scaleY(1);opacity:0.7} 50%{transform:scaleY(1.6);opacity:1} }
        @keyframes lensFlare { 0%,100%{opacity:0;transform:translate(-50%,-50%) scale(0.8)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes floatZ { 0%,100%{transform:perspective(600px) rotateX(4deg) translateZ(0)} 50%{transform:perspective(600px) rotateX(4deg) translateZ(12px)} }
        @keyframes pulseGreen { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.4)} 50%{box-shadow:0 0 0 8px rgba(74,222,128,0)} }
        @keyframes floatY { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-18px)} }
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes avatarFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes toastSlide { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ripple3d1 { 0%{width:0;height:0;opacity:1} 100%{width:160px;height:160px;opacity:0;transform:translate(-50%,-50%) perspective(400px) rotateX(0deg)} }
        @keyframes ripple3d2 { 0%{width:0;height:0;opacity:0.8} 100%{width:200px;height:200px;opacity:0;transform:translate(-50%,-50%) perspective(400px) rotateX(55deg)} }
        @keyframes ripple3d3 { 0%{width:0;height:0;opacity:0.6} 100%{width:260px;height:260px;opacity:0;transform:translate(-50%,-50%) perspective(400px) rotateX(70deg) rotateY(20deg)} }
        @keyframes centerFlash { 0%{opacity:1;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(-50%,-50%) scale(4)} }
        @keyframes rippleOut { from{width:0;height:0;opacity:0.8} to{width:120px;height:120px;opacity:0} }
        @keyframes rotateBorder { from{filter:blur(2px) hue-rotate(0deg)} to{filter:blur(2px) hue-rotate(360deg)} }
        @keyframes spin3d { from{transform:rotateY(0deg) rotateX(15deg)} to{transform:rotateY(360deg) rotateX(15deg)} }
        @keyframes orbitDot { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .hero-name-3d { transform: perspective(500px) rotateX(3deg); filter: drop-shadow(2px 3px 0 rgba(110,231,247,0.3)) drop-shadow(4px 6px 0 rgba(110,231,247,0.18)) drop-shadow(6px 9px 0 rgba(110,231,247,0.1)) drop-shadow(8px 12px 16px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(110,231,247,0.12)); transition: transform 0.7s cubic-bezier(0.23,1,0.32,1), filter 0.7s; }
        .nav-btn { transition: color 0.2s, border-color 0.2s !important; }
        .syne { font-family: 'Syne', sans-serif !important; }
        .nav-btn { background:none; border:none; color:rgba(232,232,240,0.45); font-size:11px; letter-spacing:0.15em; text-transform:uppercase; font-family:'DM Sans',sans-serif; transition:color 0.2s; padding:6px 0; cursor:none; }
        .nav-btn:hover { color:#6ee7f7; text-shadow:0 0 12px rgba(110,231,247,0.7); }
        .btn-cyan { display:inline-flex; align-items:center; gap:8px; background:#6ee7f7; color:#060810; padding:12px 26px; border:none; border-radius:4px; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; font-family:monospace; text-decoration:none; transition:all 0.25s; cursor:none; position:relative; overflow:hidden; }
        .btn-cyan::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent); transform:translateX(-100%); transition:transform 0.5s; }
        .btn-cyan:hover::before { transform:translateX(100%); }
        .btn-cyan:hover { background:#a5f3fc; transform:translateY(-2px); box-shadow:0 10px 40px rgba(110,231,247,0.55), 0 0 60px rgba(110,231,247,0.2); text-shadow:0 0 12px rgba(0,0,0,0.5); }
        .btn-ghost { display:inline-flex; align-items:center; gap:8px; background:transparent; color:rgba(232,232,240,0.65); padding:11px 22px; border:1px solid rgba(232,232,240,0.15); border-radius:4px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; font-family:monospace; text-decoration:none; transition:all 0.25s; cursor:none; }
        .btn-ghost:hover { border-color:#6ee7f7; color:#6ee7f7; transform:translateY(-2px); box-shadow:0 0 20px rgba(110,231,247,0.25), inset 0 0 20px rgba(110,231,247,0.05); }
        .btn-green { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#4ade80; padding:11px 22px; border:1px solid rgba(74,222,128,0.3); border-radius:4px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; font-family:monospace; text-decoration:none; transition:all 0.25s; cursor:none; }
        .btn-green:hover { background:rgba(74,222,128,0.07); border-color:#4ade80; transform:translateY(-2px); box-shadow:0 0 15px rgba(74,222,128,0.2); }
        .stat-card { border:1px solid rgba(255,255,255,0.07); border-radius:8px; padding:1.4rem 1rem; text-align:center; background:rgba(255,255,255,0.02); transition:all 0.4s cubic-bezier(0.23,1,0.32,1); transform-style:preserve-3d; }
        .stat-card:hover { border-color:rgba(110,231,247,0.45); transform:perspective(400px) translateZ(20px) translateY(-8px) rotateX(-4deg); box-shadow:0 24px 60px rgba(0,0,0,0.5), 0 0 30px rgba(110,231,247,0.12); background:rgba(110,231,247,0.03); }
        .skill-pill { display:inline-block; border:1px solid rgba(110,231,247,0.15); color:rgba(232,232,240,0.5); padding:4px 12px; border-radius:3px; font-size:11px; margin:3px; letter-spacing:0.05em; font-family:monospace; transition:all 0.2s; }
        .skill-pill:hover { border-color:#6ee7f7; color:#6ee7f7; background:rgba(110,231,247,0.08); box-shadow:0 0 16px rgba(110,231,247,0.4), inset 0 0 8px rgba(110,231,247,0.06); text-shadow:0 0 8px rgba(110,231,247,0.5); }
        .skill-cell { contain: layout style; background:#060810; padding:1.8rem; transition:background 0.3s, transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s; position:relative; overflow:hidden; transform-style:preserve-3d; }
        .skill-cell::after { content:''; position:absolute; inset:0; background:radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(110,231,247,0.07), transparent 60%); opacity:0; transition:opacity 0.3s; pointer-events:none; }
        .skill-cell:hover::after { opacity:1; }
        .skill-cell:hover { background:rgba(110,231,247,0.05); transform:perspective(350px) rotateX(-7deg) rotateY(3deg) translateZ(32px) scale(1.04); box-shadow:0 40px 120px rgba(0,0,0,0.7), 0 0 60px rgba(110,231,247,0.14), inset 0 1px 0 rgba(110,231,247,0.22), inset 0 -1px 0 rgba(110,231,247,0.06); }
        .skill-icon-3d { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), filter 0.4s; display: inline-block; }
        .skill-cell:hover .skill-icon-3d { transform: translateZ(40px) scale(1.3) rotateY(15deg); filter: drop-shadow(0 0 12px rgba(110,231,247,0.8)) drop-shadow(0 0 24px rgba(110,231,247,0.4)); }
        .cert-row { contain: layout; display:flex; align-items:center; gap:1.2rem; padding:1rem 1.2rem; border-bottom:1px solid rgba(255,255,255,0.05); transition:all 0.4s cubic-bezier(0.23,1,0.32,1); transform-style:preserve-3d; }
        .cert-row:last-child { border-bottom:none; }
        .cert-row:hover { background:rgba(110,231,247,0.04); transform:perspective(500px) translateZ(16px) translateX(8px); box-shadow:-4px 0 20px rgba(110,231,247,0.07); border-radius:6px; }
        .exp-block { border-left:1px solid rgba(110,231,247,0.15); padding-left:1.6rem; margin-bottom:2.2rem; position:relative; transition:all 0.45s cubic-bezier(0.23,1,0.32,1); transform-style:preserve-3d; transform:perspective(600px) translateZ(0) rotateY(0); }
        .exp-block::before { content:''; position:absolute; left:-5px; top:4px; width:8px; height:8px; border-radius:50%; background:#6ee7f7; box-shadow:0 0 12px rgba(110,231,247,0.8); animation:glowPulse 2s ease infinite; }
        .exp-block:hover { border-left-color:rgba(110,231,247,0.5); transform:perspective(600px) translateZ(24px) rotateY(-2deg) translateX(6px); box-shadow:-8px 0 30px rgba(110,231,247,0.08); background:rgba(110,231,247,0.02); border-radius:0 8px 8px 0; padding-right:1rem; }
        .section-label { font-family:monospace; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#6ee7f7; margin-bottom:1rem; display:flex; align-items:center; gap:12px; text-shadow:0 0 16px rgba(110,231,247,0.6); }
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
      <Particles3D />
      <MorphBg />
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
        
       <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 2rem",
        background: scrolled ? "rgba(4,6,12,0.96)" : "rgba(6,8,16,0.7)",
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(110,231,247,0.1), 0 4px 0 rgba(110,231,247,0.04), 0 8px 0 rgba(110,231,247,0.02), 0 20px 60px rgba(0,0,0,0.5)"
          : "0 1px 0 rgba(110,231,247,0.06)",
        transform: scrolled ? "perspective(1200px) rotateX(0.5deg) translateZ(0)" : "none",
        borderBottom: "1px solid rgba(110,231,247,0.07)",
        transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
      }}>
        {/* Glass depth plane — sits visually behind nav content */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(110,231,247,0.025) 0%, transparent 100%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(110,231,247,0.12), transparent)", pointerEvents: "none", zIndex: 0 }} />

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
      <SectionReveal><section id="about" className="hero-section" style={{ minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem 3rem", position: "relative", overflow: "hidden", perspective: "1200px" }}>
        <ThreeHero />
        {/* 3D floating orbs + light rays */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, transformStyle: "preserve-3d" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(110,231,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,247,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          {/* LIGHT RAYS — emanating from top-right */}
          {[15,25,35,45,55,65,75].map((angle, i) => (
            <div key={i} style={{
              position: "absolute", top: 0, right: "20%",
              width: "1px", height: "120%",
              background: `linear-gradient(180deg, rgba(110,231,247,${0.04 - i*0.004}), transparent 60%)`,
              transformOrigin: "top center",
              transform: `rotate(${angle - 45}deg)`,
              animation: `lensFlare ${4 + i * 0.7}s ease infinite ${i * 0.3}s`,
              filter: "blur(2px)",
            }} />
          ))}

          {/* LENS FLARE — main orb */}
          <div style={{ position: "absolute", top: "8%", right: "22%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,231,247,0.08) 0%, rgba(110,231,247,0.03) 40%, transparent 70%)", filter: "blur(30px)", animation: "glowPulse 4s ease infinite" }} />
          {/* Secondary flare */}
          <div style={{ position: "absolute", top: "12%", right: "30%", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,171,252,0.15), transparent)", filter: "blur(8px)", animation: "floatY 5s ease infinite 1s" }} />
          <div style={{ position: "absolute", top: "5%", right: "18%", width: 12, height: 12, borderRadius: "50%", background: "#6ee7f7", boxShadow: "0 0 20px 8px rgba(110,231,247,0.4), 0 0 60px 20px rgba(110,231,247,0.15)", animation: "glowPulse 3s ease infinite" }} />

          {/* Depth rings */}
          <div style={{ position: "absolute", top: "15%", right: "8%", width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(110,231,247,0.06)", transform: "translateZ(-60px) rotateX(45deg)", animation: "floatY 7s ease infinite" }} />
          <div style={{ position: "absolute", bottom: "20%", left: "5%", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(165,243,192,0.07)", transform: "translateZ(-30px) rotateY(30deg)", animation: "floatY 9s ease infinite 1s" }} />
          <div style={{ position: "absolute", top: "40%", right: "15%", width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,231,247,0.08), transparent)", transform: "translateZ(20px)", animation: "floatY 5s ease infinite 2s" }} />
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
                <h1 className="syne hero-name-3d" style={{ fontSize: "clamp(3rem,7vw,7rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "1.4rem", color: "#f0f0f8",
                  transformStyle: "preserve-3d", display: "inline-block",
                  perspective: "800px",
                }}
                  onMouseMove={e => {
                    const r = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - r.left) / r.width - 0.5) * 30;
                    const y = ((e.clientY - r.top) / r.height - 0.5) * -30;
                    e.currentTarget.style.transform = `perspective(500px) rotateX(${y}deg) rotateY(${x}deg)`;
                    e.currentTarget.style.transition = "transform 0.1s";
                    // Shift shadow layers to follow tilt
                    const sx = x * 0.4, sy = -y * 0.4;
                    e.currentTarget.style.filter = `drop-shadow(${sx*0.5}px ${sy*0.5}px 0 rgba(110,231,247,0.35)) drop-shadow(${sx}px ${sy}px 0 rgba(110,231,247,0.2)) drop-shadow(${sx*1.5}px ${sy*1.5}px 0 rgba(110,231,247,0.12)) drop-shadow(${sx*2}px ${sy*2}px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(110,231,247,0.15))`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "perspective(500px) rotateX(3deg) rotateY(0deg)";
                    e.currentTarget.style.transition = "transform 0.7s cubic-bezier(0.23,1,0.32,1), filter 0.7s";
                    e.currentTarget.style.filter = "drop-shadow(2px 3px 0 rgba(110,231,247,0.3)) drop-shadow(4px 6px 0 rgba(110,231,247,0.18)) drop-shadow(6px 9px 0 rgba(110,231,247,0.1)) drop-shadow(8px 12px 16px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(110,231,247,0.12))";
                  }}
                >
                  <span style={{ display: "block", transformStyle: "preserve-3d", position: "relative", animation: "neonFlicker 8s ease infinite" }}>
                    Anand
                    <span style={{ position: "absolute", inset: 0, color: "#6ee7f7", animation: "glitch1 6s ease infinite", pointerEvents: "none" }}>Anand</span>
                    <span style={{ position: "absolute", inset: 0, color: "#f0abfc", animation: "glitch2 6s ease infinite 0.3s", pointerEvents: "none" }}>Anand</span>
                  </span>
                  <span style={{ background: "linear-gradient(135deg, #6ee7f7 0%, #a5f3fc 40%, #6ee7f7 70%, #a5f3c0 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 4s linear infinite", display: "block", transformStyle: "preserve-3d", position: "relative" }}>
                    Kundurthi
                    <span style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#f0abfc,#fde68a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "glitch1 7s ease infinite 1s", pointerEvents: "none" }}>Kundurthi</span>
                  </span>
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
            <div
              className="avatar-wrap"
              style={{ flexShrink: 0, animation: "avatarFloat 5s ease infinite", transformStyle: "preserve-3d", willChange: "transform" }}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const rotY = ((e.clientX - rect.left - rect.width/2) / rect.width) * 20;
                const rotX = ((e.clientY - rect.top - rect.height/2) / rect.height) * -20;
                el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
                el.style.transition = "transform 0.1s";
                el.style.animationPlayState = "paused";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.transition = "transform 0.6s cubic-bezier(0.23,1,0.32,1)";
                e.currentTarget.style.animationPlayState = "running";
              }}
            >
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
            <h2 className="syne" style={{ fontSize: "clamp(2.8rem,5.5vw,4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "1.6rem", color: "#f0f0f8", textShadow: "0 0 40px rgba(110,231,247,0.08)" }}>Turning ideas<br /><span style={{color:"#6ee7f7",textShadow:"0 0 30px rgba(110,231,247,0.4)"}}>into reality.</span></h2>
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
          <h2 className="syne" style={{ fontSize: "clamp(2.8rem,5.5vw,4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.7rem", color: "#f0f0f8" }}>What I <span style={{color:"#6ee7f7",textShadow:"0 0 30px rgba(110,231,247,0.35)"}}>Bring</span></h2>
          <p style={{ color: "rgba(232,232,240,0.38)", fontSize: "0.92rem", marginBottom: "3rem" }}>From building APIs to designing pixel-perfect interfaces.</p>
        </Reveal>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(110,231,247,0.06)" }}>
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="skill-cell" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
                {/* 3D floating icon cube */}
                <div style={{ perspective: 120, marginBottom: "1rem", display: "inline-block" }}>
                  <div
                    style={{ width: 46, height: 46, position: "relative", transformStyle: "preserve-3d", transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)", cursor: "default" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "rotateY(180deg) rotateX(15deg)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)"; }}
                  >
                    {/* Front face */}
                    <div style={{ position: "absolute", inset: 0, background: "rgba(110,231,247,0.06)", border: "1px solid rgba(110,231,247,0.25)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", backfaceVisibility: "hidden", boxShadow: "0 4px 20px rgba(110,231,247,0.15)" }}>{s.icon}</div>
                    {/* Back face */}
                    <div style={{ position: "absolute", inset: 0, background: "rgba(110,231,247,0.1)", border: "1px solid rgba(110,231,247,0.4)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontFamily: "monospace", color: "#6ee7f7", letterSpacing: "0.05em", transform: "rotateY(180deg)", backfaceVisibility: "hidden", textAlign: "center", padding: 4 }}>{s.bars.length}+</div>
                  </div>
                </div>
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
          <h2 className="syne" style={{ fontSize: "clamp(2.8rem,5.5vw,4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.7rem", color: "#f0f0f8" }}>Featured <span style={{color:"#6ee7f7",textShadow:"0 0 30px rgba(110,231,247,0.35)"}}>Projects</span></h2>
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
              <div key={i} style={{ display: "flex", gap: "1.4rem", marginBottom: "2.2rem", transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)", transformStyle: "preserve-3d" }}
                onMouseEnter={el => { el.currentTarget.style.transform = `perspective(500px) translateZ(20px) translateX(8px) rotateY(-3deg)`; el.currentTarget.style.filter = `drop-shadow(-8px 8px 20px rgba(0,0,0,0.4))`; }}
                onMouseLeave={el => { el.currentTarget.style.transform = "perspective(500px) translateZ(0) translateX(0) rotateY(0)"; el.currentTarget.style.filter = "none"; }}
              >
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
            <h2 className="syne" style={{ fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem", color: "#f0f0f8", lineHeight: 1.0 }}>
              Let's build something<br />
              <span style={{ color: "#6ee7f7", textShadow: "0 0 40px rgba(110,231,247,0.6), 0 0 80px rgba(110,231,247,0.2)" }}>great together.</span>
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
      <footer style={{ padding: "2rem 4rem", borderTop: "1px solid rgba(110,231,247,0.08)", position: "relative", zIndex: 2, background: "linear-gradient(180deg, transparent, rgba(110,231,247,0.015))", boxShadow: "inset 0 1px 0 rgba(110,231,247,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontSize: 10, color: "rgba(232,232,240,0.2)", fontFamily: "monospace", letterSpacing: "0.12em" }}>
            Crafted with curiosity, coffee, and way too many open tabs
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", boxShadow: "0 0 8px rgba(74,222,128,0.8)", animation: "pulseGreen 2s infinite" }} />
            <span style={{ fontSize: 10, color: "rgba(110,231,247,0.4)", fontFamily: "monospace", letterSpacing: "0.1em" }}>© 2026 Anand Kundurthi</span>
          </div>
          <span style={{ fontSize: 10, color: "rgba(232,232,240,0.15)", fontFamily: "monospace", letterSpacing: "0.1em" }}>
            Built with React · Vercel
          </span>
        </div>
        {/* Neon bottom glow line */}
        <div style={{ marginTop: "1.2rem", height: "1px", background: "linear-gradient(90deg, transparent, rgba(110,231,247,0.15), rgba(165,243,192,0.1), rgba(110,231,247,0.15), transparent)", boxShadow: "0 0 10px rgba(110,231,247,0.1)" }} />
      </footer>
    </div>
    </ToastProvider>
  );
}
