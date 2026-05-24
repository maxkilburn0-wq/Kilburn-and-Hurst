import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Services", "How It Works", "Pricing", "Contact"];

const SERVICES = [
  {
    icon: "💬",
    title: "AI Customer Assistant",
    desc: "A 24/7 chatbot that answers your customers' questions, captures leads, and handles bookings — without you lifting a finger.",
  },
  {
    icon: "📋",
    title: "Automated Lead Capture",
    desc: "Never miss an enquiry again. Every visitor who shows interest gets followed up automatically with personalised messages.",
  },
  {
    icon: "📅",
    title: "Smart Booking System",
    desc: "Customers book appointments, get confirmations, and receive reminders — all automated. Zero no-shows, zero admin.",
  },
  {
    icon: "📊",
    title: "Review & Reputation Automation",
    desc: "Automatically ask happy customers for Google reviews at the right moment. More 5-stars, less effort.",
  },
];

const STEPS = [
  { num: "01", title: "Discovery Call", desc: "We spend 20 minutes understanding your business, your biggest time-wasters, and where customers fall through the cracks." },
  { num: "02", title: "Custom Build", desc: "We build your AI system in 5–7 days, tailored to your exact business — your services, your tone, your brand." },
  { num: "03", title: "Go Live", desc: "We plug it into your website and test everything. You see it working before we go live." },
  { num: "04", title: "Ongoing Support", desc: "Monthly retainer covers updates, improvements, and any tweaks as your business grows." },
];

const PRICING = [
  {
    name: "Starter",
    price: "£997",
    sub: "+ £297/mo",
    tag: "Best for solo traders",
    features: ["AI Customer Chatbot", "Lead Capture & Follow-up", "Email Notifications", "Monthly Optimisation", "Setup in 5 days"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "£1,997",
    sub: "+ £497/mo",
    tag: "Most Popular",
    features: ["Everything in Starter", "Smart Booking System", "Review Automation", "CRM Integration", "Priority Support", "Weekly Reporting"],
    highlight: true,
  },
  {
    name: "Full Stack",
    price: "£3,500",
    sub: "+ £797/mo",
    tag: "For growing businesses",
    features: ["Everything in Growth", "Custom AI Workflows", "Multi-location Support", "Staff Handover Automation", "Dedicated Account Manager"],
    highlight: false,
  },
];

const FAQS = [
  { q: "Do I need to be technical?", a: "Not at all. We build everything and hand it over ready to run. You just watch it work." },
  { q: "How long does setup take?", a: "Most clients are live within 5–7 days of signing. We move fast." },
  { q: "What if I want changes later?", a: "Your monthly retainer covers ongoing updates and tweaks. We're not a build-and-disappear agency." },
  { q: "Will it actually sound like my business?", a: "Yes. We spend time learning your tone, your services, and how you talk to customers before we build anything." },
  { q: "What businesses do you work with?", a: "Garages, restaurants, estate agents, gyms, tradespeople, clinics — any local business that gets repetitive enquiries." },
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

function Section({ children, id, style = {} }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <section id={id} ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      ...style
    }}>
      {children}
    </section>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", business: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setActiveNav(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#080808", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300&family=Oswald:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #c8441a; }
        ::selection { background: #c8441a; color: #fff; }
        input, textarea { font-family: 'DM Sans', sans-serif; }
        input:focus, textarea:focus { outline: none; }
        a { text-decoration: none; color: inherit; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        background: activeNav ? "rgba(8,8,8,0.95)" : "transparent",
        backdropFilter: activeNav ? "blur(12px)" : "none",
        borderBottom: activeNav ? "1px solid #1a1a1a" : "none",
        transition: "all 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "70px",
      }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "22px", letterSpacing: "2px", fontWeight: 700 }}>
          IRONCLAD<span style={{ color: "#c8441a" }}>AI</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))}
              style={{ background: "none", border: "none", color: "#aaa", fontSize: "13px", cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
              {l}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: "#c8441a", border: "none", color: "#fff", padding: "10px 20px",
            borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontWeight: 700, letterSpacing: "1px",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            GET STARTED
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 5% 80px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.3,
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translate(-50%,-50%)",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,68,26,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "860px" }}>
          <div style={{
            display: "inline-block", background: "rgba(200,68,26,0.15)", border: "1px solid rgba(200,68,26,0.4)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "24px",
            fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#c8441a",
          }}>
            AI Automation for Local Business
          </div>

          <h1 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(52px, 9vw, 96px)",
            lineHeight: 0.95, fontWeight: 700, marginBottom: "28px",
            letterSpacing: "-1px",
          }}>
            STOP LOSING<br />
            CUSTOMERS TO<br />
            <span style={{
              color: "transparent",
              WebkitTextStroke: "2px #c8441a",
            }}>SILENCE.</span>
          </h1>

          <p style={{ fontSize: "18px", color: "#888", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 40px", fontWeight: 300 }}>
            We build AI systems that answer enquiries, book appointments, and follow up leads — 24/7, automatically. While you sleep.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("contact")} style={{
              background: "#c8441a", border: "none", color: "#fff",
              padding: "16px 36px", borderRadius: "8px", fontSize: "15px",
              cursor: "pointer", fontWeight: 700, letterSpacing: "1px",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 0 40px rgba(200,68,26,0.4)",
            }}>
              BOOK FREE CALL →
            </button>
            <button onClick={() => scrollTo("how-it-works")} style={{
              background: "transparent", border: "1px solid #333", color: "#aaa",
              padding: "16px 36px", borderRadius: "8px", fontSize: "15px",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>
              See How It Works
            </button>
          </div>

          <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "60px", flexWrap: "wrap" }}>
            {[["24/7", "Always On"], ["5–7 Days", "To Go Live"], ["£0", "Missed Enquiries"]].map(([n, l]) => (
              <div key={n} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "32px", color: "#c8441a", fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: "12px", color: "#555", letterSpacing: "1px", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <Section id="services" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#c8441a", textTransform: "uppercase", marginBottom: "12px" }}>What We Build</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700 }}>
              FOUR SYSTEMS.<br />ONE GOAL: MORE REVENUE.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{
                background: "#0f0f0f", border: "1px solid #1a1a1a",
                borderRadius: "12px", padding: "32px 28px",
                transition: "border-color 0.3s, transform 0.3s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8441a"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "20px", marginBottom: "12px", fontWeight: 600 }}>{s.title}</h3>
                <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works" style={{ padding: "100px 5%", background: "#0c0c0c" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#c8441a", textTransform: "uppercase", marginBottom: "12px" }}>The Process</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700 }}>FROM CALL TO LIVE IN DAYS.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: "32px", alignItems: "flex-start",
                padding: "32px 0",
                borderBottom: i < STEPS.length - 1 ? "1px solid #1a1a1a" : "none",
              }}>
                <div style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: "48px", fontWeight: 700,
                  color: "transparent", WebkitTextStroke: "1px #333",
                  lineHeight: 1, flexShrink: 0, width: "80px",
                }}>{s.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "22px", marginBottom: "8px", fontWeight: 600 }}>{s.title}</h3>
                  <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#c8441a", textTransform: "uppercase", marginBottom: "12px" }}>Pricing</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700 }}>STRAIGHTFORWARD PRICING.</h2>
            <p style={{ color: "#666", marginTop: "16px" }}>No hidden fees. No long contracts. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {PRICING.map((p, i) => (
              <div key={i} style={{
                background: p.highlight ? "#c8441a" : "#0f0f0f",
                border: `1px solid ${p.highlight ? "#c8441a" : "#1a1a1a"}`,
                borderRadius: "16px", padding: "40px 32px",
                position: "relative",
                transform: p.highlight ? "scale(1.03)" : "scale(1)",
              }}>
                {p.highlight && (
                  <div style={{
                    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                    background: "#fff", color: "#c8441a", fontSize: "11px", fontWeight: 700,
                    padding: "4px 16px", borderRadius: "100px", letterSpacing: "2px", textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>{p.tag}</div>
                )}
                {!p.highlight && <div style={{ fontSize: "12px", color: "#555", marginBottom: "8px", letterSpacing: "1px" }}>{p.tag}</div>}
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "48px", fontWeight: 700, lineHeight: 1 }}>{p.price}</div>
                <div style={{ fontSize: "14px", color: p.highlight ? "rgba(255,255,255,0.7)" : "#555", marginBottom: "32px", marginTop: "4px" }}>setup {p.sub} retainer</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "18px", marginBottom: "16px", fontWeight: 600 }}>{p.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", color: p.highlight ? "rgba(255,255,255,0.9)" : "#888" }}>
                      <span style={{ color: p.highlight ? "#fff" : "#c8441a", fontWeight: 700 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo("contact")} style={{
                  width: "100%", padding: "14px",
                  background: p.highlight ? "#fff" : "#c8441a",
                  color: p.highlight ? "#c8441a" : "#fff",
                  border: "none", borderRadius: "8px", fontWeight: 700,
                  cursor: "pointer", fontSize: "14px", letterSpacing: "1px",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  GET STARTED →
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section style={{ padding: "100px 5%", background: "#0c0c0c" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#c8441a", textTransform: "uppercase", marginBottom: "12px" }}>FAQ</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700 }}>COMMON QUESTIONS.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: "100%", background: "none", border: "none", color: "#fff",
                  padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 500, textAlign: "left",
                }}>
                  {f.q}
                  <span style={{ color: "#c8441a", fontSize: "20px", transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.8, paddingBottom: "24px" }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#c8441a", textTransform: "uppercase", marginBottom: "12px" }}>Get Started</div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, marginBottom: "16px" }}>
            BOOK YOUR FREE CALL.
          </h2>
          <p style={{ color: "#666", marginBottom: "48px", lineHeight: 1.7 }}>
            20 minutes. No hard sell. We'll tell you exactly what we'd build for your business and what it would cost.
          </p>

          {submitted ? (
            <div style={{ background: "#0f0f0f", border: "1px solid #c8441a", borderRadius: "12px", padding: "48px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "28px", marginBottom: "8px" }}>WE'LL BE IN TOUCH.</h3>
              <p style={{ color: "#666" }}>Expect a message within 24 hours.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left" }}>
              {[["name", "Your Name", "text"], ["business", "Your Business", "text"], ["email", "Your Email", "email"]].map(([key, ph, type]) => (
                <input key={key} type={type} placeholder={ph} value={formData[key]}
                  onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                  style={{
                    background: "#0f0f0f", border: "1px solid #222", borderRadius: "8px",
                    padding: "16px 18px", color: "#fff", fontSize: "14px", width: "100%",
                  }}
                  onFocus={e => e.target.style.borderColor = "#c8441a"}
                  onBlur={e => e.target.style.borderColor = "#222"}
                />
              ))}
              <textarea placeholder="What's the biggest time-waster in your business right now?" rows={4}
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                style={{
                  background: "#0f0f0f", border: "1px solid #222", borderRadius: "8px",
                  padding: "16px 18px", color: "#fff", fontSize: "14px", width: "100%",
                  resize: "vertical", fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={e => e.target.style.borderColor = "#c8441a"}
                onBlur={e => e.target.style.borderColor = "#222"}
              />
              <button onClick={() => { if (formData.name && formData.email) setSubmitted(true); }} style={{
                background: "#c8441a", border: "none", color: "#fff",
                padding: "18px", borderRadius: "8px", fontSize: "15px",
                cursor: "pointer", fontWeight: 700, letterSpacing: "1px",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 0 40px rgba(200,68,26,0.3)",
              }}>
                BOOK FREE CALL →
              </button>
            </div>
          )}
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "32px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "18px", letterSpacing: "2px" }}>
          IRONCLAD<span style={{ color: "#c8441a" }}>AI</span>
        </div>
        <div style={{ color: "#444", fontSize: "13px" }}>
          © 2026 Ironclad AI. Built for businesses that mean business.
        </div>
        <div style={{ color: "#444", fontSize: "13px" }}>
          maxkilburn0@gmail.com
        </div>
      </footer>
    </div>
  );
}
