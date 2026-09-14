import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Leaf,
  Menu,
  MessageCircle,
  Phone,
  Sprout,
  X,
  MapPin,
  Languages,
} from "lucide-react";

const T = {
  en: {
    lang: "English",
    nav: {
      home: "Home",
      about: "About",
      moringa: "Moringa Farming",
      farm: "Our Farm",
      services: "Consultancy",
      book: "Book Consultation",
    },
    /* heroLabel: "Moringa farming consultancy", */
    heroTitle: (
      <>
        Start your Moringa farming journey <em>with confidence.</em>
      </>
    ),
    heroText:
      "Practical guidance for farmers and landowners who want to understand Moringa cultivation, plan their farm, and get hands-on support.",
    book: "Book a Consultation",
    see: "See Our Farm",
    trust: ["Practical guidance", "Farm visit", "Direct consultation"],
    explore: "Explore",
    aboutLabel: "ABOUT VERDE AURA's FARM",
    aboutTitle: (
      <>
        Learn farming from the <em>field.</em>
      </>
    ),
    aboutLead:
      "Verde Aura Farms helps people interested in Moringa cultivation understand the practical side of starting and managing a farm.",
    aboutText:
      "Our approach is simple: understand your land and requirement, discuss the right approach, and provide practical guidance that can be applied on the farm.",
    talk: "Talk to us",
    morLabel: "MORINGA FARMING",
    morTitle: (
      <>
        Understand the basics
        <br />
        <em>before you plant.</em>
      </>
    ),
    morText:
      "Moringa cultivation involves decisions about land, planting, irrigation, crop care and harvesting. Start with the right information for your farm.",
    steps: [
      ["Land & Soil", "Understand land, soil and basic site suitability."],
      ["Planning", "Plan spacing, plantation and irrigation requirements."],
      ["Crop Care", "Learn practical crop management and maintenance."],
      ["Harvesting", "Understand harvesting and post-harvest handling."],
    ],
    note: "Information on this website is general educational guidance. Farm-specific recommendations should be discussed during a consultation.",
    farmLabel: "OUR FARM",
    farmTitle: (
      <>
        See the work
        <br />
        <em>for yourself.</em>
      </>
    ),
    farmText:
      "Explore real photographs from Verde Aura Farms, showing plantation, irrigation, crop stages and field conditions.",
    gallery: [
      "Farm View",
      "Moringa Plantation",
      "Moringa Flowers",
      "Irrigation",
      "Young Plants",
      "Nursery",
      "Moringa Pods",
      "Farm at Sunset",
    ],
    svcLabel: "CONSULTANCY",
    svcTitle: (
      <>
        Support for every stage of your <em>Moringa farming plan.</em>
      </>
    ),
    serviceHint: "Discuss your requirement and get practical guidance.",
    enqLabel: "BOOK A CONSULTATION",
    enqTitle: (
      <>
        Have land?
        <br />
        <em>Let’s discuss your plan.</em>
      </>
    ),
    enqLead:
      "Share a few details about your requirement. We can then discuss the next step, including a consultation or farm visit.",
    whatsapp: "WhatsApp",
    phone: "Call",
    location: "Farm Location",
    todo: "To be added",
    fields: {
      name: "Full Name *",
      mobile: "Mobile Number *",
      email: "Email",
      village: "Village / City",
      land: "Land Area",
      service: "Interested In",
      date: "Preferred Consultation Date",
      message: "Message",
    },
    place: {
      name: "Your name",
      mobile: "+91 XXXXX XXXXX",
      email: "you@example.com",
      village: "Your location",
      land: "e.g. 2 acres",
      message: "Tell us about your land or requirement...",
    },
    select: "Select a service",
    submit: "Request Consultation",
    submitted:
      "Thank you. Your consultation request has been received. We will contact you to discuss the next step.",
    privacy:
      "Your information will be used to respond to your consultation request.",
    ctaLabel: "VERDE AURA'S FARM",
    ctaTitle: "Ready to explore Moringa farming?",
    /* footer: "Moringa farming consultancy", */
  },
  mr: {
    lang: "मराठी",
    nav: {
      home: "मुख्यपृष्ठ",
      about: "आमच्याबद्दल",
      moringa: "शेवगा शेती",
      farm: "आमची शेती",
      services: "सल्ला सेवा",
      book: "सल्ल्यासाठी संपर्क",
    },
   /*  heroLabel: "शेवगा शेती सल्ला सेवा", */
    heroTitle: (
      <>
        शेवगा शेतीचा प्रवास <em>विश्वासाने सुरू करा.</em>
      </>
    ),
    heroText:
      "शेवगा शेती समजून घेऊ इच्छिणाऱ्या शेतकरी आणि जमीनधारकांसाठी लागवड, नियोजन आणि प्रत्यक्ष मार्गदर्शन.",
    book: "सल्ला बुक करा",
    see: "आमची शेती पहा",
    trust: ["प्रत्यक्ष मार्गदर्शन", "शेती भेट", "थेट सल्ला"],
    explore: "पुढे पहा",
    aboutLabel: "वर्दे ऑरा बद्दल",
    aboutTitle: (
      <>
        शेती शिका <em>प्रत्यक्ष अनुभवातून.</em>
      </>
    ),
    aboutLead:
      "शेवगा शेती सुरू करण्यास आणि व्यवस्थापनास इच्छुक असलेल्या शेतकऱ्यांना वर्दे ऑरा फार्म व्यावहारिक मार्गदर्शन देतो.",
    aboutText:
      "तुमची जमीन आणि गरज समजून घेणे, योग्य पद्धतीवर चर्चा करणे आणि शेतावर उपयोगी पडणारे मार्गदर्शन देणे हा आमचा दृष्टिकोन आहे.",
    talk: "आमच्याशी बोला",
    morLabel: "शेवगा शेती",
    morTitle: (
      <>
        लागवडीपूर्वी
        <br />
        <em>मूलभूत माहिती समजून घ्या.</em>
      </>
    ),
    morText:
      "शेवगा शेतीमध्ये जमीन, लागवड, पाणी व्यवस्थापन, पीक काळजी आणि काढणी याबाबत योग्य निर्णय महत्त्वाचे आहेत.",
    steps: [
      [
        "जमीन व माती",
        "जमीन, माती आणि क्षेत्राची प्राथमिक उपयुक्तता समजून घ्या.",
      ],
      ["नियोजन", "लागवड, अंतर आणि पाणी व्यवस्थापनाचे नियोजन करा."],
      [
        "पीक व्यवस्थापन",
        "पीक काळजी आणि दैनंदिन व्यवस्थापनाबाबत मार्गदर्शन घ्या.",
      ],
      ["काढणी", "काढणी आणि काढणीनंतरची हाताळणी समजून घ्या."],
    ],
    note: "या वेबसाइटवरील माहिती सामान्य शैक्षणिक मार्गदर्शनासाठी आहे. तुमच्या शेतासाठी विशिष्ट शिफारसी सल्लामसलतीदरम्यान घ्या.",
    farmLabel: "आमची शेती",
    farmTitle: (
      <>
        प्रत्यक्ष काम <em>स्वतः पहा.</em>
      </>
    ),
    farmText:
      "वर्दे ऑरा फार्ममधील प्रत्यक्ष फोटो येथे पाहा — लागवड, पाणी व्यवस्थापन, पिकाची वाढ आणि शेतातील प्रत्यक्ष परिस्थिती.",
    gallery: [
      "शेतीचा परिसर",
      "शेवगा लागवड",
      "शेवग्याची फुले",
      "पाणी व्यवस्थापन",
      "लहान रोपे",
      "रोपवाटिका",
      "शेवग्याच्या शेंगा",
      "सूर्यास्तातील शेती",
    ],
    svcLabel: "सल्ला सेवा",
    svcTitle: (
      <>
        तुमच्या शेवगा शेतीच्या <em>प्रत्येक टप्प्यावर मार्गदर्शन.</em>
      </>
    ),
    serviceHint: "तुमची गरज सांगा आणि व्यावहारिक मार्गदर्शन घ्या.",
    enqLabel: "सल्ला बुक करा",
    enqTitle: (
      <>
        जमीन आहे?
        <br />
        <em>तुमच्या नियोजनाबद्दल बोलूया.</em>
      </>
    ),
    enqLead:
      "तुमच्या गरजेची काही माहिती द्या. त्यानंतर सल्लामसलत किंवा शेती भेटीचा पुढील टप्पा ठरवता येईल.",
    whatsapp: "WhatsApp",
    phone: "फोन",
    location: "शेतीचे ठिकाण",
    todo: "लवकरच जोडले जाईल",
    fields: {
      name: "पूर्ण नाव *",
      mobile: "मोबाईल नंबर *",
      email: "ईमेल",
      village: "गाव / शहर",
      land: "जमिनीचे क्षेत्रफळ",
      service: "तुमची गरज",
      date: "सल्लामसलतीची तारीख",
      message: "संदेश",
    },
    place: {
      name: "तुमचे नाव",
      mobile: "+91 XXXXX XXXXX",
      email: "you@example.com",
      village: "तुमचे गाव / शहर",
      land: "उदा. 2 एकर",
      message: "तुमच्या जमीन किंवा गरजेबद्दल लिहा...",
    },
    select: "सेवा निवडा",
    submit: "सल्ल्यासाठी विनंती पाठवा",
    submitted:
      "धन्यवाद. तुमची सल्ला विनंती प्राप्त झाली आहे. पुढील टप्प्याबद्दल बोलण्यासाठी आम्ही तुमच्याशी संपर्क करू.",
    privacy:
      "तुमची माहिती फक्त सल्ला विनंतीला प्रतिसाद देण्यासाठी वापरली जाईल.",
    ctaLabel: "वर्दे ऑरा",
    ctaTitle: "शेवगा शेतीबद्दल जाणून घेण्यासाठी तयार आहात?",
    /* footer: "शेवगा शेती सल्ला सेवा", */
  },
};

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem("darsh-lang") || "en");
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [slide, setSlide] = useState(0);
  const [preview, setPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const apiBase = import.meta.env.VITE_API_BASE_URL || "";
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    village: "",
    landArea: "",
    service: "",
    date: "",
    message: "",
  });
  const t = T[lang];
  useEffect(() => {
    if (preview) return;
    const timer = setInterval(
      () => setSlide((i) => (i + 1) % farmImages.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [preview]);
  useEffect(() => {
    const onKey = (e) => {
      if (!preview) return;
      if (e.key === "Escape") setPreview(false);
      if (e.key === "ArrowRight") setSlide((i) => (i + 1) % farmImages.length);
      if (e.key === "ArrowLeft")
        setSlide((i) => (i - 1 + farmImages.length) % farmImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);
  useEffect(() => {
    document.body.style.overflow = preview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [preview]);
  const setLanguage = (l) => {
    setLang(l);
    localStorage.setItem("darsh-lang", l);
    document.documentElement.lang = l;
  };
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);
    if (sending) return;
    if (turnstileSiteKey && !captchaToken) {
      setError(
        lang === "mr"
          ? "कृपया CAPTCHA पूर्ण करा."
          : "Please complete the CAPTCHA.",
      );
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${apiBase}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          mobileNumber: form.mobile,
          name: form.name,
          landArea: form.landArea,
          preferredDate: form.date || null,
          captchaToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.detail || data.title || "Request could not be submitted.",
        );
      setSent(true);
      setForm({
        name: "",
        mobile: "",
        email: "",
        village: "",
        landArea: "",
        service: "",
        date: "",
        message: "",
      });
      setCaptchaToken("");
    } catch (err) {
      setError(err.message || "Request could not be submitted.");
    } finally {
      setSending(false);
    }
  };
  useEffect(() => {
    if (!turnstileSiteKey) return;
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const el = document.getElementById("turnstile-widget");
      if (el && window.turnstile) {
        window.turnstile.render(el, {
          sitekey: turnstileSiteKey,
          callback: setCaptchaToken,
          "expired-callback": () => setCaptchaToken(""),
          "error-callback": () => setCaptchaToken(""),
        });
      }
    };
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [turnstileSiteKey]);
  return (
    <div>
      <header className="header">
        <div className="container nav">
          <button className="brand" onClick={() => go("home")}>
            <span className="brand-mark">
              <Leaf size={21} />
            </span>
            <span>
              <strong>Verde Aura Farms</strong>
              <small>{t.footer}</small>
            </span>
          </button>
          <nav className={menu ? "nav-links open" : "nav-links"}>
            {Object.entries(t.nav)
              .slice(0, 5)
              .map(([k, v]) => (
                <button
                  key={k}
                  onClick={() =>
                    go(
                      k === "moringa"
                        ? "moringa"
                        : k === "farm"
                          ? "farm"
                          : k === "services"
                            ? "services"
                            : k,
                    )
                  }
                >
                  {v}
                </button>
              ))}
            <button className="nav-cta" onClick={() => go("enquiry")}>
              {t.nav.book}
              <ArrowRight size={16} />
            </button>
          </nav>
          <div className="lang-wrap">
            <Languages size={15} />
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
          <button
            className="menu-btn"
            onClick={() => setMenu(!menu)}
            aria-label="Menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section id="home" className="hero">
          <div className="hero-shade" />
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow">
                <span />
                {t.heroLabel}
              </div>
              <h1>{t.heroTitle}</h1>
              <p>{t.heroText}</p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => go("enquiry")}>
                  {t.book} <ArrowRight size={18} />
                </button>
                <button className="text-btn" onClick={() => go("farm")}>
                  {t.see} <ArrowRight size={17} />
                </button>
              </div>
              <div className="trust-row">
                {t.trust.map((x) => (
                  <div key={x}>
                    <Check size={17} />
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="scroll-cue" onClick={() => go("about")}>
            {t.explore}
            <ChevronDown size={18} />
          </div>
        </section>
        <section id="about" className="section">
          <div className="container two-col">
            <div className="photo photo-about">
              <div className="photo-badge">
                <Sprout size={20} />
                <span>
                  Verde Aura Farms
                  <br />
                  <strong>{t.trust[0]}</strong>
                </span>
              </div>
            </div>
            <div>
              <div className="section-label">{t.aboutLabel}</div>
              <h2>{t.aboutTitle}</h2>
              <p className="lead">{t.aboutLead}</p>
              <p>{t.aboutText}</p>
              <button className="outline-btn" onClick={() => go("enquiry")}>
                {t.talk} <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>
        <section id="moringa" className="section moringa-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="section-label">{t.morLabel}</div>
                <h2>{t.morTitle}</h2>
              </div>
              <p>{t.morText}</p>
            </div>
            <div className="steps">
              {t.steps.map((x, i) => (
                <div className="step" key={x[0]}>
                  <span>0{i + 1}</span>
                  <h3>{x[0]}</h3>
                  <p>{x[1]}</p>
                </div>
              ))}
            </div>
            <div className="note">{t.note}</div>
          </div>
        </section>
        <section id="farm" className="section farm-section">
          <div className="container">
            <div className="section-label">{t.farmLabel}</div>
            <div className="section-heading">
              <h2>{t.farmTitle}</h2>
              <p>{t.farmText}</p>
            </div>
            <div className="farm-slider">
              <div className="slider-main">
                <button
                  className="slider-arrow prev"
                  onClick={() =>
                    setSlide(
                      (slide - 1 + farmImages.length) % farmImages.length,
                    )
                  }
                  aria-label="Previous image"
                >
                  <ArrowRight size={22} />
                </button>
                <button
                  className="slider-image-btn"
                  onClick={() => setPreview(true)}
                  aria-label={`Open ${t.gallery[slide]} in preview`}
                >
                  <img
                    src={farmImages[slide].src}
                    alt={t.gallery[slide]}
                    loading="lazy"
                  />
                  <span className="slider-caption">
                    {t.gallery[slide]}{" "}
                    <small>
                      {slide + 1} / {farmImages.length}
                    </small>
                  </span>
                </button>
                <button
                  className="slider-arrow next"
                  onClick={() => setSlide((slide + 1) % farmImages.length)}
                  aria-label="Next image"
                >
                  <ArrowRight size={22} />
                </button>
              </div>
              <div
                className="slider-dots"
                role="tablist"
                aria-label="Farm images"
              >
                {farmImages.map((img, i) => (
                  <button
                    key={img.src}
                    className={i === slide ? "active" : ""}
                    onClick={() => setSlide(i)}
                    aria-label={`Show ${t.gallery[i]}`}
                    aria-selected={i === slide}
                    role="tab"
                  />
                ))}
              </div>
              <div className="slider-thumbs">
                {farmImages.map((img, i) => (
                  <button
                    key={img.src}
                    className={i === slide ? "active" : ""}
                    onClick={() => setSlide(i)}
                    aria-label={`Show ${t.gallery[i]}`}
                  >
                    <img src={img.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="dark-section">
          <div className="container">
            <div className="section-label light">{t.svcLabel}</div>
            <h2>{t.svcTitle}</h2>
            <div className="service-grid">
              {services.map((s, i) => (
                <div className="service" key={s}>
                  <span>0{i + 1}</span>
                  <h3>{serviceName(s, lang)}</h3>
                  <p>{t.serviceHint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="enquiry" className="section enquiry-section">
          <div className="container enquiry-wrap">
            <div>
              <div className="section-label">{t.enqLabel}</div>
              <h2>{t.enqTitle}</h2>
              <p className="lead">{t.enqLead}</p>
              <div className="contact-list">
                <div>
                  <MessageCircle size={19} />
                  <span>
                    {t.whatsapp}
                    <br />
                    <strong>{t.todo}</strong>
                  </span>
                </div>
                <div>
                  <Phone size={19} />
                  <span>
                    {t.phone}
                    <br />
                    <strong>{t.todo}</strong>
                  </span>
                </div>
                <div>
                  <MapPin size={19} />
                  <span>
                    {t.location}
                    <br />
                    <strong>{t.todo}</strong>
                  </span>
                </div>
              </div>
            </div>
            <form className="form" onSubmit={submit}>
              {sent && <div className="success">{t.submitted}</div>}
              {error && (
                <div className="error" role="alert">
                  {error}
                </div>
              )}
              <div className="form-row">
                <label>
                  {t.fields.name}
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.place.name}
                  />
                </label>
                <label>
                  {t.fields.mobile}
                  <input
                    required
                    value={form.mobile}
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                    placeholder={t.place.mobile}
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  {t.fields.email}
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder={t.place.email}
                  />
                </label>
                <label>
                  {t.fields.village}
                  <input
                    value={form.village}
                    onChange={(e) =>
                      setForm({ ...form, village: e.target.value })
                    }
                    placeholder={t.place.village}
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  {t.fields.land}
                  <input
                    value={form.landArea}
                    onChange={(e) =>
                      setForm({ ...form, landArea: e.target.value })
                    }
                    placeholder={t.place.land}
                  />
                </label>
                <label>
                  {t.fields.service}
                  <select
                    value={form.service}
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value })
                    }
                  >
                    <option value="">{t.select}</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {serviceName(s, lang)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                {t.fields.date}
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </label>
              <label>
                {t.fields.message}
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder={t.place.message}
                />
              </label>
              {turnstileSiteKey && (
                <div
                  id="turnstile-widget"
                  className="turnstile-widget"
                  aria-label="Security verification"
                />
              )}
              <button className="primary-btn submit-btn" disabled={sending}>
                {sending ? (
                  lang === "mr" ? (
                    "पाठवत आहे..."
                  ) : (
                    "Sending..."
                  )
                ) : (
                  <>
                    {t.submit} <ArrowRight size={18} />
                  </>
                )}
              </button>
              <small>{t.privacy}</small>
            </form>
          </div>
        </section>
        <section className="cta">
          <div className="container cta-inner">
            <div>
              <div className="section-label light">{t.ctaLabel}</div>
              <h2>{t.ctaTitle}</h2>
            </div>
            <button className="light-btn" onClick={() => go("enquiry")}>
              {t.nav.book}
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </main>
      {preview && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery[slide]}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPreview(false);
          }}
        >
          <button
            className="lightbox-close"
            onClick={() => setPreview(false)}
            aria-label="Close preview"
          >
            <X size={25} />
          </button>
          <button
            className="lightbox-arrow left"
            onClick={() =>
              setSlide((slide - 1 + farmImages.length) % farmImages.length)
            }
            aria-label="Previous image"
          >
            <ArrowRight size={28} />
          </button>
          <img src={farmImages[slide].src} alt={t.gallery[slide]} />
          <button
            className="lightbox-arrow right"
            onClick={() => setSlide((slide + 1) % farmImages.length)}
            aria-label="Next image"
          >
            <ArrowRight size={28} />
          </button>
          <div className="lightbox-label">
            {t.gallery[slide]}{" "}
            <span>
              {slide + 1} / {farmImages.length}
            </span>
          </div>
        </div>
      )}
      <footer>
        <div className="container footer">
          <div>
            <strong>Verde Aura Farms</strong>
            <p>{t.footer}</p>
          </div>
          <p>
            © {new Date().getFullYear()} Verde Aura Farms. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
const farmImages = [
  { src: "/images/farm/farm-field-wide.jpg" },
  { src: "/images/farm/moringa-mature.jpg" },
  { src: "/images/farm/moringa-flower.jpg" },
  { src: "/images/farm/plantation-with-drip.jpg" },
  { src: "/images/farm/young-moringa.jpg" },
  { src: "/images/farm/nursery-seedlings.jpg" },
  { src: "/images/farm/moringa-pod.jpg" },
  { src: "/images/farm/moringa-sunset.jpg" },
];
const services = [
  "Moringa Farming Consultation",
  "Land Assessment",
  "Farm Planning",
  "Plantation Guidance",
  "Irrigation Guidance",
  "Crop Management Guidance",
  "Farm Visit",
  "Harvesting Guidance",
];
function serviceName(s, l) {
  const m = {
    mr: {
      "Moringa Farming Consultation": "शेवगा शेती सल्ला",
      "Land Assessment": "जमीन मूल्यांकन",
      "Farm Planning": "शेती नियोजन",
      "Plantation Guidance": "लागवड मार्गदर्शन",
      "Irrigation Guidance": "पाणी व्यवस्थापन मार्गदर्शन",
      "Crop Management Guidance": "पीक व्यवस्थापन मार्गदर्शन",
      "Farm Visit": "शेती भेट",
      "Harvesting Guidance": "काढणी मार्गदर्शन",
    },
  };
  return m[l]?.[s] || s;
}
