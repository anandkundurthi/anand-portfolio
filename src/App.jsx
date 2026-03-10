import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const AVATAR_URL = "https://raw.githubusercontent.com/anandkundurthi/anand-portfolio/main/src/assets/anand-avatar.png";

const PHOTO_URL = "/avatar.jpg";

const projects = [
  { emoji: "📄", year: "2025", type: "Python · FastAPI · React.js · MySQL", name: "AI Resume Analyzer", desc: "Full-stack AI-powered resume analysis platform that evaluates resumes against job descriptions using skill-matching algorithms. Features PDF text extraction via PyPDF2, REST API scoring with FastAPI, session-based authentication, and an animated dashboard showing match scores and improvement suggestions.", github: "https://github.com/anandkundurthi/ai-resume-analyzer", live: "https://ai-resume-analyzer-tuet.onrender.com", color: "#6ee7f7", num: "01" },
  { emoji: "🌐", year: "2024–2025", type: "React.js · Node.js · Express.js · PostgreSQL · MongoDB", name: "Full-Stack Web Applications", desc: "Suite of MERN stack applications implementing CRUD operations, REST APIs, and JWT authentication. Responsive UI layouts compatible across desktop and mobile. Optimized complex SQL queries using indexing and join optimization techniques.", github: "https://github.com/anandkundurthi", live: null, color: "#a5f3c0", num: "02" },
  { emoji: "🛒", year: "2025", type: "SQL · MySQL · Database Design", name: "SupplySync", desc: "A retail-focused MySQL project simulating real supermarket operations — inventory tracking, supplier handling, customer sales & billing, and business analytics with 20+ real-world SQL solutions.", github: "https://github.com/anandkundurthi/Dmart_mall_management", live: null, color: "#fde68a", num: "03" },
  { emoji: "🎨", year: "2025", type: "HTML · CSS · JavaScript", name: "Color Picker", desc: "An interactive color picker built with vanilla HTML, CSS, and JavaScript. Demonstrates core frontend skills — DOM manipulation, event handling, and dynamic UI updates.", github: "https://github.com/anandkundurthi/colorPicker", live: null, color: "#f0abfc", num: "04" },
  { emoji: "🚦", year: "2025", type: "HTML · CSS · JavaScript", name: "Traffic Light Simulation", desc: "JavaScript-based simulation of real-world traffic signals using timed state transitions, setInterval timing logic, and CSS class toggling.", github: "https://github.com/anandkundurthi/traffic_light", live: null, color: "#fca5a5", num: "05" },
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
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    let cleanup = null;
    const existing = document.querySelector('script[src*="three.min.js"]');
    const load = () => {
      const THREE = window.THREE;
      const W = el.clientWidth, H = el.clientHeight;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
      camera.position.set(0, 0, 5);
      const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.38, 180, 24, 2, 3);
      const knot = new THREE.Mesh(knotGeo, new THREE.MeshBasicMaterial({ color: 0x6ee7f7, wireframe: true, opacity: 0.18, transparent: true }));
      scene.add(knot);
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(2.6, 24, 16), new THREE.MeshBasicMaterial({ color: 0x6ee7f7, wireframe: true, opacity: 0.05, transparent: true }));
      scene.add(sphere);
      const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 1), new THREE.MeshBasicMaterial({ color: 0xa5f3c0, wireframe: true, opacity: 0.07, transparent: true }));
      scene.add(ico);
      const positions = new Float32Array(300 * 3);
      for (let i = 0; i < 900; i++) positions[i] = (Math.random() - 0.5) * 20;
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x6ee7f7, size: 0.03, opacity: 0.4, transparent: true })));
      let mouseX = 0, mouseY = 0;
      const onMouse = (e) => { mouseX = (e.clientX / window.innerWidth - 0.5) * 2; mouseY = -(e.clientY / window.innerHeight - 0.5) * 2; };
      window.addEventListener("mousemove", onMouse);
      const onResize = () => { const w = el.clientWidth, h = el.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); };
      window.addEventListener("resize", onResize);
      let t = 0, animId;
      const animate = () => {
        animId = requestAnimationFrame(animate); t += 0.005;
        knot.rotation.x = t * 0.4 + mouseY * 0.3; knot.rotation.y = t * 0.6 + mouseX * 0.3;
        sphere.rotation.y = t * 0.15; sphere.rotation.x = t * 0.08;
        ico.rotation.x = -t * 0.2 + mouseY * 0.1; ico.rotation.z = t * 0.25 + mouseX * 0.1;
        renderer.render(scene, camera);
      };
      animate();
      cleanup = () => { cancelAnimationFrame(animId); window.removeEventListener("mousemove", onMouse); window.removeEventListener("resize", onResize); renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); };
    };
    if (existing && window.THREE) { load(); }
    else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = load;
      document.head.appendChild(script);
    }
    return () => { if (cleanup) cleanup(); };
  }, []);
  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ─── PARTICLE FIELD ────────────────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    let mouse = { x: W / 2, y: H / 2 };
    const COUNT = 80;
    const particles = Array.from({ length: COUNT }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.5 + 0.1 }));
    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);
    let animId;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { p.vx += dx / dist * 0.06; p.vy += dy / dist * 0.06; }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110,231,247,${p.opacity})`; ctx.fill();
      });
      for (let i = 0; i < COUNT; i++) for (let j = i + 1; j < COUNT; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(110,231,247,${0.12 * (1 - d / 110)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("mousemove", onMouse); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.65 }} />;
}

/* ─── TILT CARD ─────────────────────────────────────────────────────────── */
function TiltCard({ children, color }) {
  const ref = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const onMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const rotX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -10;
    const rotY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 10;
    setTiltStyle({ transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${color}22`, transition: "box-shadow 0.1s" });
  }, [color]);
  const onLeave = useCallback(() => setTiltStyle({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)", transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)" }), []);
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transformStyle: "preserve-3d", willChange: "transform", ...tiltStyle }}>{children}</div>;
}

/* ─── PARALLAX ──────────────────────────────────────────────────────────── */
function Parallax({ children, speed = 0.15, style: s }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const fn = () => { const rect = el.getBoundingClientRect(); el.style.transform = `translateY(${(rect.top + rect.height / 2 - window.innerHeight / 2) * speed}px)`; };
    window.addEventListener("scroll", fn, { passive: true }); fn();
    return () => window.removeEventListener("scroll", fn);
  }, [speed]);
  return <div ref={ref} style={{ willChange: "transform", ...s }}>{children}</div>;
}

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
  const dot = useRef(null); const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 }); const ringPos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; } };
    window.addEventListener("mousemove", onMove);
    let animId;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => { animId = requestAnimationFrame(animate); ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12); ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12); if (ring.current) { ring.current.style.left = ringPos.current.x + "px"; ring.current.style.top = ringPos.current.y + "px"; } };
    animate();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(animId); };
  }, []);
  return (
    <>
      <div ref={dot} style={{ position: "fixed", width: 6, height: 6, background: "#6ee7f7", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", boxShadow: "0 0 10px rgba(110,231,247,0.8)" }} />
      <div ref={ring} style={{ position: "fixed", width: 32, height: 32, border: "1px solid rgba(110,231,247,0.5)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)" }} />
    </>
  );
}

/* ─── AVATAR ────────────────────────────────────────────────────────────── */
function Avatar() {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {/* Rotating border rings */}
      <div style={{ position: "absolute", inset: -16, borderRadius: "50%", border: "1px solid rgba(110,231,247,0.15)", animation: "spin 12s linear infinite" }} />
      <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "1px dashed rgba(110,231,247,0.1)", animation: "spin 8s linear infinite reverse" }} />
      {/* Glow behind */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,231,247,0.15) 0%, transparent 70%)", filter: "blur(20px)" }} />
      {/* Photo */}
      <div style={{ width: 220, height: 220, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(110,231,247,0.3)", position: "relative", boxShadow: "0 0 40px rgba(110,231,247,0.2), 0 0 80px rgba(110,231,247,0.08)" }}>
        <img
          src={PHOTO_URL}
          alt="Anand Kundurthi"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "brightness(1.05) contrast(1.05)" }}
          onError={(e) => {
            // Fallback: initials avatar
            e.target.style.display = "none";
            e.target.parentNode.style.background = "linear-gradient(135deg, #0d1117, #111827)";
            e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:3.5rem;font-weight:800;color:#6ee7f7;text-shadow:0 0 30px rgba(110,231,247,0.6)">AK</div>`;
          }}
        />
      </div>
      {/* Status badge */}
      <div style={{ position: "absolute", bottom: 12, right: 4, background: "rgba(6,8,16,0.9)", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 20, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6, backdropFilter: "blur(10px)" }}>
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
        window.emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // ← Replace with your EmailJS public key
      }
      await window.emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { // ← Replace with your EmailJS service & template IDs
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
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display: "grid", gridTemplateColumns: "60px 1fr 130px", alignItems: "center", gap: "1.5rem", padding: "1.8rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", background: hov ? "rgba(110,231,247,0.025)" : "transparent", transition: "background 0.3s", position: "relative", overflow: "hidden" }}>
        {hov && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${p.color}08, transparent)`, pointerEvents: "none" }} />}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 3, height: 36, background: hov ? p.color : "rgba(255,255,255,0.1)", borderRadius: 2, transition: "all 0.3s", boxShadow: hov ? `0 0 14px ${p.color}` : "none", flexShrink: 0 }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{p.num}</span>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: hov ? p.color : "#f0f0f8", transition: "color 0.3s", fontFamily: "'Syne', sans-serif" }}>{p.emoji} {p.name}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.type}</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <a href={p.github} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: hov ? p.color : "rgba(255,255,255,0.4)", textDecoration: "none", border: `1px solid ${hov ? p.color : "rgba(255,255,255,0.12)"}`, padding: "5px 12px", borderRadius: 4, transition: "all 0.25s", letterSpacing: "0.05em", whiteSpace: "nowrap", boxShadow: hov ? `0 0 10px ${p.color}44` : "none" }}>↗ View</a>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#4ade80", textDecoration: "none", border: "1px solid rgba(74,222,128,0.3)", padding: "5px 12px", borderRadius: 4, whiteSpace: "nowrap" }}>⬢ Live</a>}
        </div>
      </div>
    </TiltCard>
  );
}

/* ─── MAIN APP ──────────────────────────────────────────────────────────── */

/* ─── THEME CONTEXT ─────────────────────────────────────────────────────── */
const ThemeCtx = window._ThemeCtx || (() => { const ctx = { _val: "dark", _listeners: [] }; window._ThemeCtx = ctx; return ctx; })();

/* ─── MOBILE NAV ────────────────────────────────────────────────────────── */
function MobileNav({ scrollTo, theme }) {
  const [open, setOpen] = useState(false);
  const bg = theme === "light" ? "#f8f9fc" : "#060810";
  const fg = theme === "light" ? "#1a1a2e" : "#e8e8f0";
  const border = theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(110,231,247,0.08)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button onClick={() => setOpen(!open)} style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "8px 10px", cursor: "none", display: "flex", flexDirection: "column", gap: 4, transition: "border-color 0.2s" }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width: open ? (i === 1 ? 0 : 20) : 20, height: 1.5, background: "#6ee7f7", borderRadius: 2, transition: "all 0.3s", transform: open ? (i === 0 ? "rotate(45deg) translate(4px, 4px)" : i === 2 ? "rotate(-45deg) translate(4px, -4px)" : "none") : "none", opacity: open && i === 1 ? 0 : 1 }} />
        ))}
      </button>
      {open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: bg, zIndex: 98, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
          {["About","Skills","Projects","Education","Contact"].map(n => (
            <button key={n} onClick={() => { scrollTo(n); setOpen(false); }} style={{ background: "none", border: "none", color: fg, fontSize: "2rem", fontFamily: "'Syne', sans-serif", fontWeight: 800, letterSpacing: "-0.03em", cursor: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#6ee7f7"} onMouseLeave={e => e.target.style.color = fg}>
              {n}
            </button>
          ))}
          <button className="btn-cyan" onClick={() => { scrollTo("contact"); setOpen(false); }}>Hire Me</button>
        </div>
      )}
    </div>
  );
}

/* ─── SKILL BAR ─────────────────────────────────────────────────────────── */
function SkillBar({ name, pct, delay = 0, theme }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const barColor = theme === "light" ? "#0891b2" : "#6ee7f7";
  const textColor = theme === "light" ? "#374151" : "rgba(232,232,240,0.6)";
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
        <span style={{ fontSize: 11, color: textColor, fontFamily: "monospace", letterSpacing: "0.05em" }}>{name}</span>
        <span style={{ fontSize: 10, color: barColor, fontFamily: "monospace" }}>{width > 0 ? pct + "%" : "0%"}</span>
      </div>
      <div style={{ height: 3, background: theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: width + "%", background: `linear-gradient(90deg, ${barColor}, ${theme === "light" ? "#06b6d4" : "#a5f3c0"})`, borderRadius: 2, transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)", boxShadow: width > 0 ? `0 0 8px ${barColor}60` : "none" }} />
      </div>
    </div>
  );
}

/* ─── SECTION TRANSITION ────────────────────────────────────────────────── */
function SectionReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !entered) { setVis(true); setEntered(true); }
      else if (!e.isIntersecting && entered) { setVis(false); }
    }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [entered]);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0) scale(1)" : "translateY(40px) scale(0.98)", transition: `opacity 0.9s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.9s ${delay}s cubic-bezier(0.22,1,0.36,1)` }}>
      {children}
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => { const el = document.getElementById(id.toLowerCase()); if (el) el.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div style={{ background: bg, color: fg, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
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
        .skill-cell { background:#060810; padding:1.8rem; transition:background 0.3s; position:relative; overflow:hidden; }
        .skill-cell::after { content:''; position:absolute; inset:0; background:radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(110,231,247,0.06), transparent 60%); opacity:0; transition:opacity 0.3s; pointer-events:none; }
        .skill-cell:hover::after { opacity:1; }
        .skill-cell:hover { background:rgba(110,231,247,0.03); }
        .cert-row { display:flex; align-items:center; gap:1.2rem; padding:1rem 1.2rem; border-bottom:1px solid rgba(255,255,255,0.05); transition:all 0.25s; }
        .cert-row:last-child { border-bottom:none; }
        .cert-row:hover { background:rgba(110,231,247,0.04); padding-left:1.8rem; }
        .exp-block { border-left:1px solid rgba(255,255,255,0.08); padding-left:1.6rem; margin-bottom:2.2rem; position:relative; }
        .exp-block::before { content:''; position:absolute; left:-5px; top:4px; width:8px; height:8px; border-radius:50%; background:#6ee7f7; box-shadow:0 0 12px rgba(110,231,247,0.8); animation:glowPulse 2s ease infinite; }
        .section-label { font-family:monospace; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#6ee7f7; margin-bottom:1rem; display:flex; align-items:center; gap:12px; }
        .section-label::after { content:''; width:40px; height:1px; background:rgba(110,231,247,0.3); }
        .social-link { color:rgba(232,232,240,0.3); text-decoration:none; font-size:9px; letter-spacing:0.15em; text-transform:uppercase; font-family:monospace; writing-mode:vertical-rl; transition:all 0.25s; cursor:none; }
        .social-link:hover { color:#6ee7f7; text-shadow:0 0 10px rgba(110,231,247,0.6); }
        @media (max-width:768px) {
          .nav-links { display:none !important; }
          .side-socials { display:none !important; }
          .hero-section { padding:5rem 1.5rem 3rem !important; }
          .hero-inner { flex-direction:column-reverse !important; gap:2rem !important; }
          .about-grid { grid-template-columns:1fr !important; gap:2rem !important; }
          .skills-grid { grid-template-columns:1fr 1fr !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; }
          .edu-grid { grid-template-columns:1fr !important; gap:2rem !important; }
          section { padding:4rem 1.5rem !important; }
          nav { padding:1rem 1.5rem !important; }
        }
      `}</style>

      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <ParticleField />

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
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 4rem", background: scrolled ? (isDark ? "rgba(6,8,16,0.92)" : "rgba(240,244,248,0.92)") : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: `1px solid ${scrolled ? borderCol : "transparent"}`, transition: "all 0.4s", boxShadow: scrolled ? (isDark ? "0 4px 30px rgba(0,0,0,0.3)" : "0 4px 30px rgba(0,0,0,0.08)") : "none" }}>
        <span className="syne" style={{ fontWeight: 800, fontSize: "1.1rem", color: "#f0f0f8", textShadow: "0 0 20px rgba(110,231,247,0.3)" }}>AK<span style={{ color: "#6ee7f7" }}>.</span></span>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div className="nav-links" style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
            {["About","Skills","Projects","Education","Contact"].map(n => (
              <button key={n} className="nav-btn" style={{ color: isDark ? "rgba(232,232,240,0.45)" : "rgba(26,26,46,0.55)" }} onClick={() => scrollTo(n)}>{n}</button>
            ))}
            <button className="btn-cyan" style={{ padding: "8px 18px", fontSize: 10 }} onClick={() => scrollTo("contact")}>Hire Me</button>
          </div>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)", border: `1px solid ${borderCol}`, borderRadius: 20, padding: "6px 12px", cursor: "none", display: "flex", alignItems: "center", gap: 6, transition: "all 0.3s", color: isDark ? "#6ee7f7" : "#0891b2", fontSize: 14 }}>
            {isDark ? "☀️" : "🌙"}
          </button>
          {/* Mobile Menu */}
          <div className="mobile-menu-btn">
            <MobileNav scrollTo={scrollTo} theme={theme} />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <SectionReveal delay={0}>
      <section id="about" className="hero-section" style={{ minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem 3rem", position: "relative", overflow: "hidden" }}>
        <ThreeHero />
        <Parallax speed={0.05} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(110,231,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,247,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </Parallax>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4rem" }}>
            {/* Text side */}
            <div style={{ flex: 1 }}>
              <Parallax speed={-0.07}>
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
                <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                  <button className="btn-cyan" onClick={() => scrollTo("projects")}>View Projects</button>
                  <a href="https://ai-resume-analyzer-tuet.onrender.com" target="_blank" rel="noreferrer" className="btn-ghost">Live Project</a>
                  <a href="https://drive.google.com/file/d/1PEuAK9LEg8flKRgUPYbi0wOdSpA7Qx7U/view" target="_blank" rel="noreferrer" className="btn-green">Resume</a>
                  <button className="btn-ghost" onClick={() => scrollTo("contact")}>Say Hello</button>
                </div>
              </Parallax>
            </div>
            {/* Avatar side */}
            <Parallax speed={0.04} style={{ flexShrink: 0, animation: "avatarFloat 5s ease infinite" }}>
              <Avatar />
            </Parallax>
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
              {STATS.map(s => (
                <div key={s.label} className="stat-card">
                  <div className="syne" style={{ fontSize: "2rem", fontWeight: 800, color: "#6ee7f7", lineHeight: 1, marginBottom: 6, textShadow: "0 0 20px rgba(110,231,247,0.4)" }}><Counter target={s.n} suffix={s.suffix} /></div>
                  <div style={{ fontSize: 10, color: "rgba(232,232,240,0.32)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "monospace" }}>{s.label}</div>
                </div>
              ))}
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

      {/* SKILLS */}
      <SectionReveal delay={0}>
      <section id="skills" style={{ padding: "7rem 4rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(110,231,247,0.06)", borderBottom: "1px solid rgba(110,231,247,0.06)", position: "relative", zIndex: 2 }}>
        <div className="section-label">Skills</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.7rem", color: "#f0f0f8" }}>What I Bring</h2>
          <p style={{ color: "rgba(232,232,240,0.38)", fontSize: "0.92rem", marginBottom: "3rem" }}>From building APIs to designing pixel-perfect interfaces.</p>
        </Reveal>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(110,231,247,0.06)" }}>
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="skill-cell" style={{ background: isDark ? "#060810" : "#f8fafc" }} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "0.9rem", color: accentColor, filter: `drop-shadow(0 0 8px ${accentColor}60)` }}>{s.icon}</div>
                <div className="syne" style={{ fontWeight: 700, fontSize: "0.93rem", marginBottom: "0.9rem", color: fg }}>{s.name}</div>
                <div style={{ marginBottom: "0.9rem" }}>{s.tags.map(t => <span key={t} className="skill-pill">{t}</span>)}</div>
                <div>{s.bars.map((b, bi) => <SkillBar key={b.name} name={b.name} pct={b.pct} delay={bi * 0.1} theme={theme} />)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      </SectionReveal>

      {/* PROJECTS */}
      <SectionReveal delay={0}>
      <section id="projects" style={{ padding: "7rem 4rem", position: "relative", zIndex: 2 }}>
        <div className="section-label">My Work</div>
        <Reveal>
          <h2 className="syne" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.7rem", color: "#f0f0f8" }}>Featured Projects</h2>
          <p style={{ color: "rgba(232,232,240,0.38)", fontSize: "0.92rem", marginBottom: "2.5rem" }}>Real code I have written and shipped.</p>
        </Reveal>
        <div style={{ border: "1px solid rgba(110,231,247,0.08)", borderRadius: 10, overflow: "hidden" }}>
          {projects.map((p, i) => (<Reveal key={p.name} delay={i * 0.07}><ProjectRow p={p} /></Reveal>))}
        </div>
      </section>
      </SectionReveal>

      {/* EDUCATION */}
      <SectionReveal delay={0}>
      <section id="education" style={{ padding: "7rem 4rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(110,231,247,0.06)", borderBottom: "1px solid rgba(110,231,247,0.06)", position: "relative", zIndex: 2 }}>
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

      {/* CONTACT */}
      <SectionReveal delay={0}>
      <section id="contact" style={{ padding: "7rem 4rem", position: "relative", zIndex: 2 }}>
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
            <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <a href="mailto:anandsarmak@gmail.com" className="btn-cyan">Send Email</a>
              <a href="https://www.linkedin.com/in/anand-venkata-raghava-sai-kundurthi-75914a358/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
              <a href="https://github.com/anandkundurthi" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
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

      <footer style={{ textAlign: "center", padding: "1.5rem 4rem", borderTop: "1px solid rgba(110,231,247,0.06)", position: "relative", zIndex: 2 }}>
        <span style={{ fontSize: 10, color: "rgba(232,232,240,0.18)", fontFamily: "monospace", letterSpacing: "0.1em" }}>
          Crafted with curiosity, coffee, and way too many open tabs · 2025 Anand Kundurthi
        </span>
      </footer>
    </div>
  );
}
