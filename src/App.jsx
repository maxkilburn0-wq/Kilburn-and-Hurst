import { useState, useRef, useEffect } from "react";

const SERVICES = [
  {
    id: "web",
    icon: "◻",
    title: "Web Design",
    tagline: "Your shopfront. Done properly.",
    desc: "Custom websites built to convert visitors into customers. Fast, mobile-first, and live within 7 days.",
    price: "£275",
    monthly: null,
    features: ["Up to 5 pages", "Mobile optimised", "Contact form", "Domain setup", "Live in 7 days"],
  },
  {
    id: "ai",
    icon: "◈",
    title: "AI & Automation",
    tagline: "Your business, running 24/7.",
    desc: "Chatbots that answer customers, capture leads, and book appointments while you sleep.",
    price: "£50/mo",
    monthly: "£50/mo",
    features: ["Trained on your business", "Lead capture", "FAQ answering", "Website integration", "Live in 5 days"],
  },
  {
    id: "seo",
    icon: "◉",
    title: "SEO & Visibility",
    tagline: "Get found. Get customers.",
    desc: "Google Business setup, on-page SEO, and local search domination so new customers find you first.",
    price: "£250",
    monthly: "+ £35/mo",
    features: ["Google Business setup", "On-page SEO", "Directory listings", "Search Console", "Monthly report"],
  },
  {
    id: "social",
    icon: "◇",
    title: "Social Media",
    tagline: "Look the part online.",
    desc: "Profile refreshes, content strategy, and monthly management that builds your presence and trust.",
    price: "£295",
    monthly: "one-off",
    features: ["Bio & profile rewrite", "Cover image", "Pinned post", "Content strategy", "Monthly management"],
  },
  {
    id: "marketing",
    icon: "◐",
    title: "Marketing",
    tagline: "Keep customers coming back.",
    desc: "Email sequences, review automation, and retention campaigns that turn one-time buyers into regulars.",
    price: "£150",
    monthly: "+ £35/mo",
    features: ["Review automation", "Email sequences", "Re-engagement", "SMS campaigns", "Monthly send"],
  },
  {
    id: "ops",
    icon: "◎",
    title: "Operations",
    tagline: "Cut costs. Run leaner.",
    desc: "Inventory tracking, waste reduction, and automated systems that save local businesses thousands per year.",
    price: "£250",
    monthly: "+ £50/mo",
    features: ["Waste tracking setup", "Staff training", "Weekly report", "Cost analysis", "Tailored to your business"],
  },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [page, setPage] = useState("home");
  const [form, setForm] = useState({ name: "", business: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setSubmitting(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: "5079c0b7-0bc0-497c-a716-4dbed288ed65",
          name: form.name,
          email: form.email,
          business: form.business,
          message: form.message,
          subject: `New enquiry from ${form.name} — ${form.business}`,
        }),
      });
    } catch (e) {}
    setSubmitted(true);
    setSubmitting(false);
  };

  const scrollTo = (id) => {
    if (page !== "home") { setPage("home"); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100); }
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openService = (id) => {
    setActiveService(id);
    setTimeout(() => document.getElementById("service-detail")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const activeData = SERVICES.find(s => s.id === activeService);

  // ── FINANCE PAGE ──
  if (page === "finance") {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#050505", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
          @keyndef fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
          @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.3)} 50%{box-shadow:0 0 60px rgba(212,175,55,0.6)} }
        `}</style>

        {/* Nav */}
        <nav style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #111" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }} onClick={() => setPage("home")}>
            <div style={{ width: "6px", height: "6px", background: "#d4af37", borderRadius: "50%" }} />
            <span style={{ fontWeight: 600, fontSize: "14px" }}>Kilburn & Hurst</span>
          </div>
          <button onClick={() => setPage("home")} style={{ background: "none", border: "1px solid #222", color: "#888", padding: "8px 16px", borderRadius: "50px", fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            ← Back
          </button>
        </nav>

        {/* Hero */}
        <div style={{ padding: "80px 20px 60px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: "600px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <div style={{ width: "6px", height: "6px", background: "#d4af37", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: "10px", color: "#d4af37", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600 }}>Coming Soon — Private Access</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 10vw, 72px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: "24px" }}>
              Want to outperform<br />
              <em style={{ fontStyle: "italic", color: "#d4af37" }}>the S&P 500?</em>
            </h1>
            <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.8, fontWeight: 300, maxWidth: "420px", marginBottom: "32px" }}>
              Kilburn & Hurst is building an exclusive financial advisory arm. Private market insights, equity research, and portfolio strategy — the kind of edge previously reserved for institutional investors.
            </p>
            <button onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }} style={{
              background: "#d4af37", border: "none", color: "#000",
              padding: "16px 32px", borderRadius: "50px", fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, cursor: "pointer",
              animation: "glow 3s infinite",
            }}>
              Register Your Interest →
            </button>
          </div>
        </div>

        {/* Ticker */}
        <div style={{ background: "#0a0a0a", borderTop: "1px solid #111", borderBottom: "1px solid #111", padding: "12px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", animation: "ticker 20s linear infinite", whiteSpace: "nowrap" }}>
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{ display: "flex" }}>
                {["AAPL +2.4%", "TSLA +5.1%", "NVDA +3.8%", "MSFT +1.2%", "SPY +0.9%", "QQQ +1.7%", "AMZN +2.1%", "META +4.3%"].map((t, j) => (
                  <span key={j} style={{ fontSize: "11px", padding: "0 24px", color: j % 2 === 0 ? "#d4af37" : "#333", letterSpacing: "1px", fontWeight: 600 }}>{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Services preview */}
        <div style={{ padding: "60px 20px" }}>
          <div style={{ fontSize: "10px", color: "#333", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "32px" }}>What's Coming</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#111" }}>
            {[
              ["Stock Market Analysis", "Weekly equity research and high-conviction trade ideas"],
              ["Portfolio Advisory", "Personalised strategy built around your risk profile and goals"],
              ["Market Intelligence", "Macro trends, sector rotation, and institutional flow analysis"],
              ["Private Access", "Exclusive member community — limited spaces available"],
            ].map(([title, desc], i) => (
              <div key={i} style={{ background: "#050505", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ color: "#d4af37", fontFamily: "'Playfair Display', serif", fontSize: "20px", flexShrink: 0, lineHeight: 1, marginTop: "2px" }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontSize: "12px", color: "#444", fontWeight: 300, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px", padding: "24px", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "12px" }}>
            <div style={{ fontSize: "11px", color: "#d4af37", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Founding Member Access</div>
            <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.7, fontWeight: 300, marginBottom: "16px" }}>
              A limited number of founding member spots will be available at launch. Register your interest now to be first in line.
            </p>
            <button onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }} style={{
              background: "transparent", border: "1px solid #d4af37", color: "#d4af37",
              padding: "12px 24px", borderRadius: "50px", fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer",
            }}>
              Register Interest →
            </button>
          </div>
        </div>

        <footer style={{ borderTop: "1px solid #111", padding: "24px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "11px", color: "#333" }}>© 2026 Kilburn & Hurst</span>
          <span style={{ fontSize: "10px", color: "#222" }}>For informational purposes only. Not financial advice.</span>
        </footer>
      </div>
    );
  }

  // ── HOME PAGE ──
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f7f4", color: "#111", overflowX: "hidden", width: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; overflow-x: hidden; }
        ::selection { background: #111; color: #f8f7f4; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #111; }
        input, textarea { font-family: 'DM Sans', sans-serif; }
        input:focus, textarea:focus { outline: none; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>

      {/* Cursor glow */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9999,
        width: "400px", height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)",
        transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
        transition: "transform 0.1s ease",
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 20px", height: "56px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(248,247,244,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
          <div style={{ width: "6px", height: "6px", background: "#111", borderRadius: "50%", flexShrink: 0 }} />
          <span style={{ fontWeight: 600, fontSize: "14px", whiteSpace: "nowrap" }}>Kilburn & Hurst</span>
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {["Services", "Pricing", "Contact"].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none", fontSize: "12px",
              color: "#888", cursor: "pointer", fontWeight: 500, padding: "4px 8px",
              fontFamily: "'DM Sans', sans-serif",
            }}>{l}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: "#111", border: "none", color: "#f8f7f4",
            padding: "8px 16px", borderRadius: "50px", fontSize: "12px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer",
            whiteSpace: "nowrap", marginLeft: "4px",
          }}>Book Call</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "100px 20px 60px",
        background: "linear-gradient(160deg, #ede9e0 0%, #f8f7f4 70%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative lines */}
        <div style={{ position: "absolute", top: 0, right: "15%", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.04), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: "30%", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.03), transparent)", pointerEvents: "none" }} />

        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(100px, 30vw, 260px)",
          fontWeight: 700, color: "rgba(0,0,0,0.025)",
          pointerEvents: "none", userSelect: "none",
          whiteSpace: "nowrap", lineHeight: 1,
        }}>K&H</div>

        {/* Floating badge */}
        <div style={{
          position: "absolute", top: "120px", right: "20px",
          background: "#111", borderRadius: "50px", padding: "8px 16px",
          fontSize: "11px", color: "#f8f7f4", fontWeight: 500,
          animation: "float 4s ease-in-out infinite",
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          <div style={{ width: "5px", height: "5px", background: "#4ade80", borderRadius: "50%" }} />
          Available for new projects
        </div>

        <div style={{ position: "relative", maxWidth: "600px", animation: "fadeUp 0.8s ease 0.2s both" }}>
          <div style={{ fontSize: "10px", color: "#aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px", fontWeight: 500 }}>
            Digital Agency · Founded 2026
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(42px, 10vw, 80px)",
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: "-1.5px", marginBottom: "24px",
          }}>
            We build<br />
            businesses<br />
            that <em style={{ fontStyle: "italic", color: "#777", background: "linear-gradient(90deg, #777, #aaa, #777)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>grow.</em>
          </h1>
          <p style={{ fontSize: "15px", color: "#777", lineHeight: 1.8, maxWidth: "380px", fontWeight: 300, marginBottom: "32px" }}>
            We don't just build websites. We build revenue machines — websites, AI, SEO, social, and operations. Whatever it takes to make your business win.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("contact")} style={{
              background: "#111", border: "none", color: "#f8f7f4",
              padding: "14px 28px", borderRadius: "50px", fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)"; }}
            >Book Free Call</button>
            <button onClick={() => scrollTo("services")} style={{
              background: "transparent", border: "1px solid rgba(0,0,0,0.15)",
              color: "#555", padding: "14px 28px", borderRadius: "50px",
              fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer",
            }}>Our Services ↓</button>
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginTop: "48px" }}>
            {[["£275", "Website build"], ["7 days", "To go live"], ["£0", "Hidden fees"], ["24/7", "AI running"]].map(([v, l]) => (
              <div key={v}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600 }}>{v}</div>
                <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{ background: "#111", padding: "14px 0", overflow: "hidden", width: "100%" }}>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "flex" }}>
              {["Web Design", "AI Automation", "SEO", "Social Media", "Operations", "Lead Generation", "Google Business", "E-Commerce"].map((t, j) => (
                <span key={j} style={{ fontSize: "11px", padding: "0 28px", color: j % 2 === 0 ? "#f8f7f4" : "#555", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div id="services" style={{ padding: "80px 20px" }}>
        <Reveal style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "10px", color: "#aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>What We Do</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 7vw, 48px)", fontWeight: 600, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "12px" }}>
            Six services.<br />One agency.
          </h2>
          <p style={{ fontSize: "14px", color: "#888", fontWeight: 300, lineHeight: 1.7, maxWidth: "340px" }}>
            Tap any service to see full details and pricing.
          </p>
        </Reveal>

        <Reveal>
          <div onClick={() => openService("web")} style={{
            background: "#111", borderRadius: "16px", padding: "32px 28px",
            marginBottom: "12px", cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            transition: "all 0.3s", position: "relative", overflow: "hidden",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div>
              <div style={{ fontSize: "10px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Featured Service</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 600, color: "#f8f7f4", marginBottom: "8px" }}>Web Design</h3>
              <p style={{ fontSize: "13px", color: "#888", fontWeight: 300, lineHeight: 1.6, maxWidth: "260px" }}>Custom websites built to convert. Fast, mobile-first, live in 7 days.</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "16px" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#f8f7f4", fontWeight: 600 }}>£275</div>
              <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>See packages →</div>
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {SERVICES.slice(1).map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <div onClick={() => openService(s.id)} style={{
                background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: "12px", padding: "24px 20px",
                cursor: "pointer", transition: "all 0.25s", minHeight: "140px",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: "18px", marginBottom: "10px", color: "#ccc" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, marginBottom: "6px", lineHeight: 1.2 }}>{s.title}</h3>
                <p style={{ fontSize: "12px", color: "#aaa", lineHeight: 1.5, fontWeight: 300, marginBottom: "10px" }}>{s.tagline}</p>
                <div style={{ fontSize: "12px", color: "#111", fontWeight: 600 }}>{s.price} <span style={{ color: "#ccc", fontWeight: 400 }}>→</span></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* SERVICE DETAIL */}
      {activeService && activeData && (
        <div id="service-detail" style={{ padding: "0 20px 60px" }}>
          <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ background: "#111", padding: "28px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "10px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Service Detail</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 600, color: "#f8f7f4" }}>{activeData.title}</h3>
                </div>
                <button onClick={() => setActiveService(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#f8f7f4", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "16px", fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>×</button>
              </div>
            </div>
            <div style={{ padding: "24px" }}>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7, fontWeight: 300, marginBottom: "20px" }}>{activeData.desc}</p>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>What's included</div>
                {activeData.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", fontSize: "13px", color: "#555", marginBottom: "8px", fontWeight: 300 }}>
                    <span style={{ color: "#111", fontWeight: 700, flexShrink: 0 }}>—</span> {f}
                  </div>
                ))}
              </div>
              <div style={{ background: "#f8f7f4", borderRadius: "8px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 600 }}>{activeData.price}</div>
                  <div style={{ fontSize: "12px", color: "#aaa" }}>one-off</div>
                </div>
                {activeData.monthly && (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "16px", fontWeight: 600 }}>{activeData.monthly}</div>
                    <div style={{ fontSize: "12px", color: "#aaa" }}>retainer</div>
                  </div>
                )}
              </div>
              <button onClick={() => scrollTo("contact")} style={{ width: "100%", background: "#111", border: "none", color: "#f8f7f4", padding: "14px", borderRadius: "50px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                Get Started with {activeData.title}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRICING */}
      <div id="pricing" style={{ padding: "80px 20px", background: "#111" }}>
        <Reveal style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "10px", color: "#444", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Pricing</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 7vw, 48px)", fontWeight: 600, color: "#f8f7f4", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "12px" }}>
            Two packages.<br />No nonsense.
          </h2>
          <p style={{ fontSize: "14px", color: "#555", fontWeight: 300, lineHeight: 1.7 }}>Or pick individual services below.</p>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
          <Reveal>
            <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: "16px", padding: "28px 24px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Standard</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, color: "#f8f7f4" }}>Website</h3>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, color: "#f8f7f4", lineHeight: 1 }}>£275</div>
                  <div style={{ fontSize: "11px", color: "#444", marginTop: "2px" }}>one-off · domain £10/yr</div>
                </div>
              </div>
              {["Custom website — live in 7 days", "Mobile optimised", "Contact form", "Your own domain (.co.uk)", "No monthly fee"].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", fontSize: "13px", color: "#555", marginBottom: "8px", fontWeight: 300 }}>
                  <span style={{ color: "#f8f7f4", fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                </div>
              ))}
              <button onClick={() => scrollTo("contact")} style={{ width: "100%", marginTop: "20px", padding: "13px", background: "transparent", border: "1px solid #333", color: "#f8f7f4", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
                Get Started →
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ background: "#f8f7f4", borderRadius: "16px", padding: "28px 24px", position: "relative" }}>
              <div style={{ position: "absolute", top: "-10px", left: "24px", background: "#111", color: "#f8f7f4", fontSize: "9px", fontWeight: 700, padding: "3px 14px", letterSpacing: "2px", textTransform: "uppercase", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif" }}>Most Popular</div>
              <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Premium</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, color: "#111" }}>Website + AI</h3>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, color: "#111", lineHeight: 1 }}>£275</div>
                  <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>setup · £50/mo AI · domain £10/yr</div>
                </div>
              </div>
              {["Everything in Standard", "AI chatbot — answers customers 24/7", "Unlimited website updates", "Lead capture & automation", "Hosting covered", "Direct WhatsApp support", "Pricing scales with your business size"].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", fontSize: "13px", color: "#444", marginBottom: "8px", fontWeight: 300 }}>
                  <span style={{ color: "#111", fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                </div>
              ))}
              <button onClick={() => scrollTo("contact")} style={{ width: "100%", marginTop: "20px", padding: "13px", background: "#111", border: "none", color: "#f8f7f4", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
                Get Started →
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ fontSize: "10px", color: "#444", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px" }}>À La Carte — Individual Services</div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#222", borderRadius: "12px", overflow: "hidden" }}>
          {[
            ["Web Design", "Custom 5-page website, mobile optimised", "£275", "one-off"],
            ["Domain (.co.uk)", "Your own professional web address", "£10", "per year"],
            ["AI Chatbot", "24/7 customer assistant on your site", "£50", "per month"],
            ["Google Business Setup", "Get found in local searches", "£285", "one-off"],
            ["SEO Package", "On-page SEO + directory listings", "£250", "+ £35/mo"],
            ["Social Media Refresh", "Bio, profile, cover image, pinned post", "£295", "one-off"],
            ["Review Automation", "Automated Google review requests", "£150", "+ £35/mo"],
            ["Inventory Tracking", "Waste reduction & cost cutting system", "£250", "+ £50/mo"],
          ].map(([name, desc, price, freq], i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div style={{ background: "#111", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#f8f7f4", marginBottom: "2px" }}>{name}</div>
                  <div style={{ fontSize: "12px", color: "#444", fontWeight: 300 }}>{desc}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "#f8f7f4" }}>{price}</div>
                  <div style={{ fontSize: "11px", color: "#444" }}>{freq}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* FINANCE TEASER */}
      <div style={{ padding: "60px 20px", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <Reveal>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "5px", height: "5px", background: "#d4af37", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: "10px", color: "#d4af37", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600 }}>Coming Soon</span>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 6vw, 36px)", fontWeight: 600, color: "#f8f7f4", lineHeight: 1.2 }}>
              Want to outperform<br />
              <em style={{ fontStyle: "italic", color: "#d4af37" }}>the S&P 500?</em>
            </h3>
            <p style={{ fontSize: "13px", color: "#444", fontWeight: 300, lineHeight: 1.7, maxWidth: "320px" }}>
              Private equity and financial advisory — coming soon. Limited founding member spaces available.
            </p>
            <button onClick={() => setPage("finance")} style={{
              alignSelf: "flex-start", background: "transparent", border: "1px solid rgba(212,175,55,0.4)",
              color: "#d4af37", padding: "10px 20px", borderRadius: "50px",
              fontSize: "12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer",
            }}>
              Find Out More →
            </button>
          </div>
        </Reveal>
      </div>

      {/* PROCESS */}
      <div style={{ padding: "80px 20px", background: "#f8f7f4" }}>
        <Reveal style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "10px", color: "#aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>How It Works</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 7vw, 48px)", fontWeight: 600, letterSpacing: "-1px", lineHeight: 1.1 }}>
            Simple process.<br />Serious results.
          </h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { n: "01", t: "Discovery", d: "A focused 20-minute call to understand your business, your goals, and where you're losing money." },
            { n: "02", t: "Strategy", d: "We build a clear plan. No fluff. Just the services that will make a real difference." },
            { n: "03", t: "Build", d: "Fast, precise execution. Most projects are live within 7 days of agreement." },
            { n: "04", t: "Grow", d: "Ongoing support and continuous optimisation as your business scales." },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ padding: "28px 0", borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.06)" : "none", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 600, color: "rgba(0,0,0,0.06)", lineHeight: 1, flexShrink: 0, width: "56px" }}>{p.n}</div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>{p.t}</div>
                  <div style={{ fontSize: "13px", color: "#888", lineHeight: 1.7, fontWeight: 300 }}>{p.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ padding: "80px 20px", background: "linear-gradient(160deg, #ede9e0 0%, #f8f7f4 100%)" }}>
        <Reveal style={{ marginBottom: "40px" }}>
          <div style={{ fontSize: "10px", color: "#aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Get In Touch</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 7vw, 48px)", fontWeight: 600, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "12px" }}>
            Let's talk about<br />your business.
          </h2>
          <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.8, fontWeight: 300 }}>20 minutes. No hard sell. We'll tell you exactly what we'd build and what it would cost.</p>
        </Reveal>
        {submitted ? (
          <Reveal>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "12px", padding: "48px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 600, marginBottom: "8px" }}>Message received.</div>
              <p style={{ fontSize: "13px", color: "#aaa" }}>We'll be in touch within 24 hours.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[["name", "Your name", "text"], ["business", "Your business", "text"], ["email", "Email address", "email"]].map(([key, ph, type]) => (
                <input key={key} type={type} placeholder={ph} value={form[key]}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", padding: "14px 16px", fontSize: "14px", color: "#111", width: "100%", fontWeight: 300 }}
                  onFocus={e => e.target.style.borderColor = "#111"}
                  onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
                />
              ))}
              <textarea placeholder="What does your business need?" rows={4} value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", padding: "14px 16px", fontSize: "14px", color: "#111", width: "100%", resize: "vertical", fontWeight: 300 }}
                onFocus={e => e.target.style.borderColor = "#111"}
                onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
              />
              <button onClick={handleSubmit} disabled={submitting} style={{ background: submitting ? "#555" : "#111", border: "none", color: "#f8f7f4", padding: "15px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", cursor: submitting ? "default" : "pointer" }}>
                {submitting ? "Sending..." : "Send Message"}
              </button>
              <div style={{ textAlign: "center", fontSize: "12px", color: "#ccc", marginTop: "4px" }}>
                Or email: <a href="mailto:kilburnhurst@outlook.com" style={{ color: "#111", fontWeight: 600 }}>kilburnhurst@outlook.com</a>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#111", padding: "32px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "5px", height: "5px", background: "#f8f7f4", borderRadius: "50%" }} />
            <span style={{ fontWeight: 600, fontSize: "13px", color: "#f8f7f4" }}>Kilburn & Hurst</span>
          </div>
          <div style={{ fontSize: "11px", color: "#444" }}>© 2026 Kilburn & Hurst. All rights reserved.</div>
          <div style={{ fontSize: "11px", color: "#444" }}>kilburnhurst@outlook.com</div>
        </div>
      </footer>
    </div>
  );
}
