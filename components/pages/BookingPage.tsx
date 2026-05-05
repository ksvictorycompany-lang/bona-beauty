"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle, Phone } from "lucide-react";

type FormState = "idle" | "submitting" | "success";

const SERVICE_TYPES = ["Schnitt", "Farbe", "Behandlung", "Braut"];
const TIME_SLOTS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
const PERKS = ["Kostenlose Erstberatung","Keine Wartezeit","Premium Produkte","Diskrete Atmosphäre"];

export function BookingPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedService, setSelectedService] = useState("Schnitt");
  const [selectedTime, setSelectedTime] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", phone: "", date: "" });

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date || !selectedTime) return;
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1400);
  };

  const inputStyle: React.CSSProperties = {
    background: "#FAFAF8",
    border: "1px solid rgba(201,160,64,0.2)",
    borderRadius: "10px",
    color: "#1C0A08",
    fontFamily: "var(--font-space-grotesk)",
    fontSize: "14px",
    padding: "14px 16px",
    width: "100%",
    outline: "none",
    colorScheme: "light" as React.CSSProperties["colorScheme"],
    transition: "border-color 0.2s",
  };

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 90% 90%, rgba(201,160,64,0.07) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 min-h-full flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: hasEntered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.5em] uppercase mb-8"
          style={{ color: "rgba(201,160,64,0.75)", fontFamily: "var(--font-space-grotesk)" }}
        >
          TERMIN BUCHEN
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: hasEntered ? 1 : 0, x: hasEntered ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h2
              className="leading-none tracking-tight mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
                color: "#1C0A08",
              }}
            >
              Ihr Termin<br />
              bei{" "}
              <span style={{ color: "#C4665A" }}>Bona.</span>
            </h2>

            <p className="text-sm leading-relaxed mb-8"
              style={{ color: "rgba(28,10,8,0.5)", fontFamily: "var(--font-space-grotesk)", maxWidth: "320px" }}>
              Buchen Sie Ihren Wunschtermin und erleben Sie Premium-Haircare in
              entspannter Atmosphäre.
            </p>

            <ul className="flex flex-col gap-3 mb-10">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,160,64,0.12)" }}>
                    <Check className="w-3 h-3" style={{ color: "#C9A040" }} />
                  </div>
                  <span className="text-sm" style={{ color: "rgba(28,10,8,0.6)", fontFamily: "var(--font-space-grotesk)" }}>
                    {perk}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 pt-8" style={{ borderTop: "1px solid rgba(201,160,64,0.15)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,160,64,0.10)" }}>
                <Phone className="w-4 h-4" style={{ color: "#C9A040" }} />
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "rgba(28,10,8,0.35)", fontFamily: "var(--font-space-grotesk)" }}>
                  Oder rufen Sie uns an
                </p>
                <a href="tel:+493000000000" className="text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: "#C4665A", fontFamily: "var(--font-space-grotesk)" }}>
                  +49 30 000 0000
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 rounded-2xl p-8"
            style={{ background: "#FFFFFF", border: "1px solid rgba(201,160,64,0.18)", boxShadow: "0 4px 32px rgba(28,10,8,0.06)" }}
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="text-center py-12"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}>
                    <CheckCircle className="w-16 h-16 mx-auto" style={{ color: "#C9A040" }} />
                  </motion.div>
                  <h3 className="mt-6 text-3xl"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, fontStyle: "italic", color: "#1C0A08" }}>
                    Anfrage gesendet!
                  </h3>
                  <p className="mt-3 text-sm"
                    style={{ color: "rgba(28,10,8,0.5)", fontFamily: "var(--font-space-grotesk)" }}>
                    Wir melden uns innerhalb von 24 Stunden zur Bestätigung.
                  </p>
                  <button
                    onClick={() => { setFormState("idle"); setForm({ name: "", phone: "", date: "" }); setSelectedTime(""); }}
                    className="mt-8 px-6 py-3 rounded-full text-sm font-semibold"
                    style={{ background: "rgba(201,160,64,0.12)", color: "#C9A040", fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Weiteren Termin buchen
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Service selector */}
                  <div>
                    <label className="text-xs tracking-wider uppercase mb-3 block"
                      style={{ color: "rgba(28,10,8,0.4)", fontFamily: "var(--font-space-grotesk)" }}>
                      Service
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_TYPES.map((s) => (
                        <button key={s} type="button" onClick={() => setSelectedService(s)}
                          className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                          style={{
                            background: selectedService === s ? "#C4665A" : "rgba(201,160,64,0.08)",
                            color: selectedService === s ? "#ffffff" : "rgba(28,10,8,0.5)",
                            fontFamily: "var(--font-space-grotesk)",
                            border: selectedService === s ? "1px solid #C4665A" : "1px solid rgba(201,160,64,0.2)",
                          }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date + Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs tracking-wider uppercase mb-2 block"
                        style={{ color: "rgba(28,10,8,0.4)", fontFamily: "var(--font-space-grotesk)" }}>
                        Datum
                      </label>
                      <input type="date" required value={form.date}
                        onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(201,160,64,0.6)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(201,160,64,0.2)")}
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase mb-2 block"
                        style={{ color: "rgba(28,10,8,0.4)", fontFamily: "var(--font-space-grotesk)" }}>
                        Ihr Name
                      </label>
                      <input type="text" required placeholder="z. B. Sophie Müller" value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(201,160,64,0.6)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(201,160,64,0.2)")}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs tracking-wider uppercase mb-2 block"
                      style={{ color: "rgba(28,10,8,0.4)", fontFamily: "var(--font-space-grotesk)" }}>
                      Telefon
                    </label>
                    <input type="tel" placeholder="+49 …" value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(201,160,64,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(201,160,64,0.2)")}
                    />
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="text-xs tracking-wider uppercase mb-3 block"
                      style={{ color: "rgba(28,10,8,0.4)", fontFamily: "var(--font-space-grotesk)" }}>
                      Uhrzeit
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button key={slot} type="button" onClick={() => setSelectedTime(slot)}
                          className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                          style={{
                            background: selectedTime === slot ? "#C4665A" : "rgba(201,160,64,0.07)",
                            color: selectedTime === slot ? "#ffffff" : "rgba(28,10,8,0.5)",
                            fontFamily: "var(--font-space-grotesk)",
                            border: selectedTime === slot ? "1px solid #C4665A" : "1px solid rgba(201,160,64,0.15)",
                          }}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={formState === "submitting"}
                    className="w-full py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-200"
                    style={{
                      background: formState === "submitting" ? "rgba(196,102,90,0.5)" : "#C4665A",
                      color: "#ffffff",
                      fontFamily: "var(--font-space-grotesk)",
                      cursor: formState === "submitting" ? "not-allowed" : "pointer",
                    }}>
                    {formState === "submitting" ? "Wird gesendet…" : "Termin anfragen"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Impressum footer */}
        <div
          className="mt-16 pt-6 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: "1px solid rgba(201,160,64,0.12)" }}
        >
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs transition-opacity duration-200 hover:opacity-60"
              style={{ color: "rgba(28,10,8,0.35)", fontFamily: "var(--font-space-grotesk)" }}
            >
              Impressum
            </a>
            <span style={{ color: "rgba(28,10,8,0.2)", fontSize: "10px" }}>·</span>
            <a
              href="#"
              className="text-xs transition-opacity duration-200 hover:opacity-60"
              style={{ color: "rgba(28,10,8,0.35)", fontFamily: "var(--font-space-grotesk)" }}
            >
              Datenschutz
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="TikTok" className="transition-opacity duration-200 hover:opacity-60" style={{ color: "rgba(28,10,8,0.4)" }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M9 0C8.4 0 8 .4 8 1v9a2 2 0 1 1-2-2H5a2 2 0 0 0 0 4h.1A4 4 0 0 0 9 9V1c0-.6.4-1 1-1h2V0H9ZM15 3V1a1 1 0 0 0-1-1h-1v3a3 3 0 0 0 3 3V4a3 3 0 0 1-1-.3V3Z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="transition-opacity duration-200 hover:opacity-60" style={{ color: "rgba(28,10,8,0.4)" }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C5.8 0 5.6 0 4.7.1 3 .2 1.7 1 .9 2S.1 3.6 0 5.4C0 6.2 0 6.4 0 8s0 1.8.1 2.6c.1 1.8.9 3 1.8 3.8S3.4 15.8 5.2 16C6 16 6.2 16 8 16s1.8 0 2.6-.1c1.8-.1 3-.9 3.8-1.8s1.7-2 1.8-3.8c.1-.9.1-1 .1-2.6V8c0-1.8 0-2-.1-2.6C16 3.6 15.2 2.4 14.3 1.6S12.6.2 10.8.1C10 0 9.8 0 8 0Zm0 1.4c1.7 0 1.9 0 2.6.1 1.3.1 2.1.6 2.7 1.2s1.1 1.4 1.2 2.7c0 .7.1.9.1 2.6s0 1.9-.1 2.6c-.1 1.3-.6 2.1-1.2 2.7s-1.4 1.1-2.7 1.2c-.7 0-.9.1-2.6.1s-1.9 0-2.6-.1c-1.3-.1-2.1-.6-2.7-1.2S1.6 11.8 1.5 10.5C1.4 9.9 1.4 9.7 1.4 8s0-1.9.1-2.6C1.6 4 2.1 3.2 2.7 2.6S4.1 1.5 5.4 1.4C6.1 1.4 6.3 1.4 8 1.4Zm0 2.4a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm0 6.9a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.2-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
