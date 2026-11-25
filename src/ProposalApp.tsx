import { useState, useEffect, useRef } from 'react';

/* ─── Shared design tokens ─────────────────────────────────────────── */
const C = {
  navy:     '#0F172A',
  petrol:   '#1B4965',
  gold:     '#C5A059',
  goldL:    '#D4B87A',
  cream:    '#F5F2EB',
  white:    '#FFFFFF',
  muted:    '#475569',
  border:   '#E2D9CC',
  whatsapp: '#25D366',
};

type Lang = 'ar' | 'en';
type SectionId =
  | 'proposal'
  | 'tracks'
  | 'opening-session'
  | 'why-different'
  | 'roadmap'
  | 'presenter';

const SECTION_IDS: SectionId[] = [
  'proposal',
  'tracks',
  'opening-session',
  'why-different',
  'roadmap',
  'presenter',
];

/* Universal WhatsApp link working on both Mobile (app) and Laptop (WhatsApp Web / Desktop) */
const WHATSAPP_URL =
  'https://api.whatsapp.com/send?phone=96892940008&text=' +
  encodeURIComponent('السلام عليكم أستاذ محمود، بخصوص مبادرة مسارات التطوير العملي لنادي الجالية المصرية بسلطنة عُمان');

/* ─── i18n strings ─────────────────────────────────────────────────── */
const T: Record<string, Record<Lang, string>> = {
  navProposal:     { ar: 'المقترح', en: 'Proposal' },
  navTracks:       { ar: 'المسارات الثلاثة', en: '3 Tracks' },
  navSession:      { ar: 'الندوة الافتتاحية', en: 'Opening Session' },
  navWhy:          { ar: 'لماذا هذا النموذج؟', en: 'Why This Model?' },
  navRoadmap:      { ar: 'خطة التنفيذ', en: 'Roadmap' },
  navPresenter:    { ar: 'مقدِّم المقترح', en: 'Presenter' },
  contactLabel:    { ar: 'للتواصل', en: 'Contact' },
  print:           { ar: 'طباعة / PDF', en: 'Print / PDF' },
  langToggle:      { ar: 'English', en: 'عربي' },
  clubName:        { ar: 'نادي الجالية المصرية بسلطنة عُمان', en: 'Egyptian Community Club in the Sultanate of Oman' },
  eyebrow:         { ar: 'مقترح مبادرة للبرنامج الأسبوعي المنتظم', en: 'Weekly Programme Initiative Proposal' },
  heroTitle:       { ar: 'مسارات التطوير العملي لأبناء الجالية', en: 'Practical Development Tracks for the Community' },
  heroSub:         { ar: 'من البيت إلى العمل إلى ريادة الأعمال — نموذج تفاعلي جديد لندوات وورش النادي', en: 'From Home to Work to Entrepreneurship — A New Interactive Model for Club Seminars & Workshops' },
  heroMeta:        { ar: 'مقدم إلى مجلس إدارة نادي الجالية المصرية بسلطنة عُمان', en: 'Submitted to the Board of Directors — Egyptian Community Club in the Sultanate of Oman' },
  heroCta:         { ar: 'اكتشف المسارات الثلاثة ↓', en: 'Explore the 3 Tracks ↓' },
  whyTitle:        { ar: 'لماذا هذا النموذج مختلف؟', en: 'Why Is This Format Different?' },
  whySub:          { ar: 'نقلة نوعية من الندوات النظرية المعتادة إلى تجربة عملية حية تخدم جميع أبناء الجالية', en: 'A qualitative shift from traditional lectures to a live practical experience serving all members of the community' },
  beforeTitle:     { ar: 'النمط التقليدي للندوات', en: 'Traditional Seminar Format' },
  afterTitle:      { ar: 'نموذج التطبيق الحي والتصويت المباشر', en: 'Live Demo + Direct Voting Model' },
  tracksTitle:     { ar: 'ثلاثة مسارات متكاملة تخدم جميع شرائح الجالية', en: 'Three Integrated Tracks Serving All Community Segments' },
  tracksSub:       { ar: 'خيط واحد يجمعها: الإدارة الحديثة وتطوير الأداء بأدوات العصر', en: 'One thread connects them: Modern management & performance development with today\'s tools' },
  sessionTitle:    { ar: 'ندوة افتتاحية تقيس احتياج الأعضاء', en: 'Opening Session That Measures Member Needs' },
  sessionSub:      { ar: 'أدوات النجاح العملي في 2026: يومك وعملك ومشروعك بأقل مجهود', en: 'Practical Success Tools in 2026: Your Day, Work & Project with Less Effort' },
  voteTitle:       { ar: 'جرّب تجربة تصويت الأعضاء', en: 'Try the Member Voting Experience' },
  voteSub:         { ar: 'اختر المسار الذي يهمك — هكذا يستلم النادي بيانات الاحتياج الحقيقي', en: 'Choose the track that interests you — this is how the Club receives real demand data' },
  roadmapTitle:    { ar: 'خطة التنفيذ على ثلاث مراحل', en: '3-Phase Implementation Roadmap' },
  roadmapSub:      { ar: 'آلية واضحة ومنضبطة تبدأ باعتماد اللقاء الافتتاحي وتنتهي بسلسلة ورش متخصصة', en: 'A clear, structured mechanism starting with the opening session approval and leading to specialized workshops' },
  bioTitle:        { ar: 'مقدِّم المقترح', en: 'About the Presenter' },
  bioName:         { ar: 'محمود حميده', en: 'Mahmoud Hemedah' },
  bioRole:         { ar: 'مستشار أول — الإدارة والحوكمة وتطوير الأعمال والذكاء الاصطناعي', en: 'Senior Consultant — Management, Governance, Business Development & AI' },
  bioDesc:         { ar: 'خبرة تتجاوز 17 عاماً في الإدارة والحوكمة وتطوير الأعمال وتقنيات الذكاء الاصطناعي، وتواجد ميداني في سلطنة عُمان في تطوير الشركات وفرق العمل وتطبيق أدوات Google الحديثة.', en: 'Over 17 years of experience in management, governance, business development, and AI technologies, with on-ground presence in Oman in corporate development, team building, and implementing modern Google tools.' },
  cvButton:        { ar: 'الاطلاع على السيرة المهنية والشهادات', en: 'View Professional CV & Credentials' },
  footerCta:       { ar: 'يسعدنا عقد لقاء تعريفي قصير مع مجلس الإدارة أو اللجنة الثقافية لمراجعة المحاور وتحديد موعد اللقاء الأول.', en: 'We welcome a brief introductory meeting with the Board or Cultural Committee to review the agenda and schedule the first session.' },
};

function t(key: string, lang: Lang) {
  return T[key]?.[lang] ?? key;
}

/* ─── In-View hook ─────────────────────────────────────────────────── */
function useInView(ref: React.RefObject<Element | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ─── Scroll-reveal wrapper ─────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section Header Pill & Gold Line ──────────────────────────────── */
function SectionHeader({
  badgeAr,
  badgeEn,
  title,
  subtitle,
  lang,
  dark = false,
}: {
  badgeAr: string;
  badgeEn: string;
  title: string;
  subtitle?: string;
  lang: Lang;
  dark?: boolean;
}) {
  const isAr = lang === 'ar';
  return (
    <div className="section-header" style={{ textAlign: 'center', marginBottom: 44 }}>
      <div className={dark ? 'section-badge-dark' : 'section-badge-light'} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: dark ? 'rgba(197,160,89,0.14)' : 'rgba(27,73,101,0.09)',
        border: `1px solid ${dark ? 'rgba(197,160,89,0.4)' : 'rgba(27,73,101,0.22)'}`,
        borderRadius: 999, padding: '6px 18px', marginBottom: 14,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.gold }} />
        <span style={{
          color: dark ? C.goldL : C.petrol,
          fontSize: 13, fontWeight: 700,
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
        }}>
          {isAr ? badgeAr : badgeEn}
        </span>
      </div>
      <h2 className={dark ? 'print-dark-heading' : ''} style={{
        fontSize: 'clamp(24px, 3.5vw, 38px)',
        fontWeight: 800,
        color: dark ? '#FFFFFF' : C.navy,
        fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
        margin: '0 auto 12px',
        lineHeight: 1.35,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p className={dark ? 'print-dark-sub' : ''} style={{
          color: dark ? 'rgba(255,255,255,0.84)' : '#334155',
          fontSize: 'clamp(16px, 2vw, 19px)',
          fontWeight: 600,
          fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
          margin: '0 auto',
          maxWidth: 720,
          lineHeight: 1.75,
        }}>
          {subtitle}
        </p>
      )}
      <div style={{ width: 64, height: 4, background: C.gold, borderRadius: 99, margin: '18px auto 0' }} />
    </div>
  );
}

/* ─── Static Ceremonial Draped Egyptian Flags (Left & Right Sides) ──── */
function EgyptDrapedFlagBanner({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  // Left banner: Red outer -> White center -> Black inner
  // Right banner: Black inner -> White center -> Red outer
  const colors = isLeft ? ['#CE1126', '#FFFFFF', '#000000'] : ['#000000', '#FFFFFF', '#CE1126'];

  return (
    <div
      className="egypt-drape-banner"
      style={{
        position: 'absolute',
        top: 0,
        [side]: 0,
        width: 'clamp(58px, 11.5vw, 165px)',
        height: '86%',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        opacity: 0.44,
        boxShadow: isLeft
          ? '12px 0 36px rgba(0,0,0,0.45)'
          : '-12px 0 36px rgba(0,0,0,0.45)',
        borderRight: isLeft ? '1.5px solid rgba(197,160,89,0.45)' : 'none',
        borderLeft: !isLeft ? '1.5px solid rgba(197,160,89,0.45)' : 'none',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 58%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 58%, transparent 100%)',
      }}
    >
      {/* Three vertical tricolor bands */}
      {colors.map((bg, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            height: '100%',
            background: bg,
            position: 'relative',
          }}
        />
      ))}

      {/* Authentic Official Golden Eagle of Saladin upright inside center White band */}
      <div style={{
        position: 'absolute',
        top: '23%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <img
          src="./egypt-eagle.svg"
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.18))',
          }}
        />
      </div>

      {/* Realistic vertical ceremonial curtain drape pleats/shading */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(90deg, rgba(0,0,0,0.34) 0%, rgba(255,255,255,0.12) 15%, rgba(0,0,0,0.05) 33%, rgba(0,0,0,0.22) 50%, rgba(255,255,255,0.12) 67%, rgba(0,0,0,0.06) 84%, rgba(0,0,0,0.34) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

function EgyptDrapedFlagsBg() {
  return (
    <div
      className="no-print"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <EgyptDrapedFlagBanner side="left" />
      <EgyptDrapedFlagBanner side="right" />
    </div>
  );
}

/* ─── WhatsApp Icon ────────────────────────────────────────────────── */
function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z"
        fill="#25D366"
      />
      <path
        d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17 0-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/* ─── Tool Product Logos (Official Product Assets in /public/logos/) ── */
type ToolKey =
  | 'gemini'
  | 'notebooklm'
  | 'calendar'
  | 'sheets'
  | 'workspace'
  | 'flow'
  | 'vids'
  | 'labs'
  | 'pomelli'
  | 'forms';

interface ToolInfo {
  key: ToolKey;
  name: string;
  roleAr: string;
  roleEn: string;
  accent: string;
  logoSrc?: string;
}

const TOOL_CATALOG: Record<ToolKey, ToolInfo> = {
  gemini:     { key: 'gemini',     name: 'Gemini',           roleAr: 'مساعد الذكاء الاصطناعي',      roleEn: 'AI Assistant',          accent: '#60A5FA', logoSrc: './logos/gemini.png' },
  notebooklm: { key: 'notebooklm', name: 'NotebookLM',       roleAr: 'مذاكرة وتلخيص ذكي',         roleEn: 'Smart Research & Notes', accent: '#34D399', logoSrc: './logos/notebooklm.svg' },
  calendar:   { key: 'calendar',   name: 'Google Calendar',  roleAr: 'تنظيم الجدول والمواعيد',     roleEn: 'Schedule & Time',       accent: '#38BDF8', logoSrc: './logos/calendar.svg' },
  sheets:     { key: 'sheets',     name: 'Google Sheets',    roleAr: 'الميزانية والتقارير',        roleEn: 'Budgets & Data',        accent: '#4ADE80', logoSrc: './logos/sheets.svg' },
  workspace:  { key: 'workspace',  name: 'Google Workspace', roleAr: 'بيئة العمل المتكاملة',       roleEn: 'Work Suite',            accent: '#FBBF24' },
  flow:       { key: 'flow',       name: 'Google Flow',      roleAr: 'إنتاج بصري وإبداعي',        roleEn: 'AI Visual Studio',      accent: '#C084FC', logoSrc: './logos/flow.png' },
  vids:       { key: 'vids',       name: 'Google Vids',      roleAr: 'صناعة عروض الفيديو',        roleEn: 'AI Video Creation',     accent: '#A78BFA', logoSrc: './logos/vids.svg' },
  labs:       { key: 'labs',       name: 'Google Labs',      roleAr: 'مختبر أدوات المستقبل',       roleEn: 'AI Experiments',        accent: '#2DD4BF', logoSrc: './logos/labs.ico' },
  pomelli:    { key: 'pomelli',    name: 'Pomelli',          roleAr: 'هوية وتسويق المشاريع',       roleEn: 'Brand & Marketing AI',  accent: '#FB7185', logoSrc: './logos/pomelli.png' },
  forms:      { key: 'forms',      name: 'Google Forms',     roleAr: 'نماذج العملاء والطلبات',     roleEn: 'Client Forms',          accent: '#818CF8', logoSrc: './logos/forms.svg' },
};

function ToolIcon({ toolKey }: { toolKey: ToolKey }) {
  const info = TOOL_CATALOG[toolKey];
  if (toolKey === 'workspace') {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 3,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyItems: 'center',
      }}>
        <img src="./logos/gmail.svg" alt="Gmail" style={{ width: 13, height: 13, objectFit: 'contain' }} />
        <img src="./logos/drive.svg" alt="Drive" style={{ width: 13, height: 13, objectFit: 'contain' }} />
        <img src="./logos/docs.svg"  alt="Docs"  style={{ width: 13, height: 13, objectFit: 'contain' }} />
        <img src="./logos/meet.svg"  alt="Meet"  style={{ width: 13, height: 13, objectFit: 'contain' }} />
      </div>
    );
  }
  return (
    <img
      src={info.logoSrc}
      alt={info.name}
      style={{
        width: 30,
        height: 30,
        objectFit: 'contain',
        display: 'block',
        borderRadius: toolKey === 'flow' || toolKey === 'pomelli' ? 6 : 0,
      }}
    />
  );
}

/* ─── NAVBAR (Big WhatsApp Hover-Expand Button + Reordered Active Tabs) ── */
function Navbar({
  lang,
  onToggleLang,
  activeSection,
  onSelectSection,
}: {
  lang: Lang;
  onToggleLang: () => void;
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [waHovered, setWaHovered] = useState(false);
  const isAr = lang === 'ar';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navItems: [SectionId, string][] = [
    ['proposal',        t('navProposal', lang)],
    ['tracks',          t('navTracks', lang)],
    ['opening-session', t('navSession', lang)],
    ['why-different',   t('navWhy', lang)],
    ['roadmap',         t('navRoadmap', lang)],
    ['presenter',       t('navPresenter', lang)],
  ];

  const handleNavClick = (id: SectionId) => {
    onSelectSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -96;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  return (
    <nav className="no-print" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(15,23,42,0.97)' : 'rgba(15,23,42,0.92)',
      backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(197,160,89,0.35)' : 'rgba(255,255,255,0.08)'}`,
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 68, gap: 12,
      }}>
        {/* Top-Right (in RTL): Large WhatsApp Button that expands on hover to reveal "للتواصل · 0096892940008" */}
        <div
          style={{ position: 'relative', flexShrink: 0 }}
          onMouseEnter={() => setWaHovered(true)}
          onMouseLeave={() => setWaHovered(false)}
          onFocus={() => setWaHovered(true)}
          onBlur={() => setWaHovered(false)}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isAr ? 'تواصل عبر واتساب: 0096892940008' : 'Contact via WhatsApp: 0096892940008'}
            title={isAr ? 'اضغط للتواصل عبر واتساب: 0096892940008' : 'Click to chat on WhatsApp: 0096892940008'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 48,
              minWidth: 48,
              padding: waHovered ? '0 16px' : '0 10px',
              gap: waHovered ? 10 : 0,
              borderRadius: 999,
              background: waHovered ? 'rgba(37, 211, 102, 0.22)' : 'rgba(37, 211, 102, 0.14)',
              border: `2px solid ${waHovered ? '#25D366' : 'rgba(37, 211, 102, 0.55)'}`,
              boxShadow: waHovered
                ? '0 0 22px rgba(37, 211, 102, 0.4)'
                : '0 4px 14px rgba(37, 211, 102, 0.2)',
              textDecoration: 'none',
              transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <WhatsAppIcon size={28} />
            </span>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              maxWidth: waHovered ? 240 : 0,
              opacity: waHovered ? 1 : 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              transition: 'max-width 0.3s ease, opacity 0.25s ease',
            }}>
              <span style={{
                color: '#FFFFFF',
                fontSize: 13.5,
                fontWeight: 700,
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}>
                {t('contactLabel', lang)}:
              </span>
              <span dir="ltr" style={{
                color: '#4ADE80',
                fontSize: 14,
                fontWeight: 800,
                fontFamily: 'Inter, sans-serif',
              }}>
                0096892940008
              </span>
            </span>
          </a>
        </div>

        {/* Desktop Nav Links with clear Active State */}
        <div className="nav-links" style={{
          display: 'flex', gap: 6, alignItems: 'center',
          overflowX: 'auto', padding: '4px 0',
        }}>
          {navItems.map(([id, label]) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  background: isActive ? C.gold : 'transparent',
                  color: isActive ? C.navy : 'rgba(255,255,255,0.84)',
                  border: isActive ? `1px solid ${C.gold}` : '1px solid transparent',
                  borderRadius: 10,
                  padding: '8px 13px',
                  fontSize: isAr ? 13.5 : 12.5,
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.22s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(197,160,89,0.35)' : 'none',
                  fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = C.goldL;
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.84)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Right/Left Action buttons */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={onToggleLang}
            style={{
              padding: '8px 14px', borderRadius: 8,
              background: 'rgba(255,255,255,0.09)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.18)',
              cursor: 'pointer', fontSize: 12.5, fontWeight: 700,
              fontFamily: isAr ? 'Inter, sans-serif' : 'Cairo, sans-serif',
              transition: 'all 0.2s ease',
            }}
          >
            {t('langToggle', lang)}
          </button>
          <button
            onClick={() => window.print()}
            className="print-btn"
            style={{
              padding: '8px 14px', borderRadius: 8, border: 'none',
              background: C.gold, color: C.navy,
              cursor: 'pointer', fontSize: 12.5, fontWeight: 800,
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
            }}
          >
            <span>🖨</span>
            <span className="print-label">{t('print', lang)}</span>
          </button>
        </div>
      </div>

      {/* Mobile Section Strip */}
      <div className="mobile-nav-strip" style={{
        display: 'none',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '8px 12px',
        gap: 6,
        overflowX: 'auto',
        background: 'rgba(15,23,42,0.96)',
      }}>
        {navItems.map(([id, label]) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              style={{
                background: isActive ? C.gold : 'rgba(255,255,255,0.06)',
                color: isActive ? C.navy : 'rgba(255,255,255,0.82)',
                border: 'none',
                borderRadius: 999,
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: isActive ? 800 : 600,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────────── */
function Hero({ lang, onGoTracks }: { lang: Lang; onGoTracks: () => void }) {
  const isAr = lang === 'ar';

  return (
    <section id="proposal" className="print-section print-hero" style={{
      minHeight: '95vh',
      background: `linear-gradient(160deg, ${C.navy} 0%, #0d2240 55%, ${C.petrol} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '116px 24px 72px',
    }}>
      {/* Static Ceremonial Draped Official Egyptian Flags (Left & Right) */}
      <EgyptDrapedFlagsBg />
      <div className="no-print" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, zIndex: 1 }} />

      <div style={{ maxWidth: 880, textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Club Name */}
        <div className="print-dark-accent" style={{
          display: 'inline-block',
          color: C.goldL,
          fontSize: 'clamp(15px, 1.9vw, 18px)',
          fontWeight: 800,
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
          marginBottom: 14,
        }}>
          {t('clubName', lang)}
        </div>

        <br />

        {/* Eyebrow */}
        <div className="section-badge-dark" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(197,160,89,0.16)', border: `1px solid rgba(197,160,89,0.45)`,
          borderRadius: 999, padding: '8px 22px', marginBottom: 26,
          animation: 'fadeSlideDown 0.8s ease both',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.gold, display: 'inline-block' }} />
          <span style={{ color: C.gold, fontSize: isAr ? 15 : 13, fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif', fontWeight: 700 }}>
            {t('eyebrow', lang)}
          </span>
        </div>

        {/* Title */}
        <h1 className="print-dark-heading" style={{
          color: '#fff', fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: 900,
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
          lineHeight: isAr ? 1.4 : 1.2, margin: '0 0 22px', letterSpacing: isAr ? 0 : '-0.02em',
          animation: 'fadeSlideDown 0.9s ease 0.1s both',
        }}>
          {t('heroTitle', lang)}
        </h1>

        {/* Subheadline */}
        <p className="print-dark-sub" style={{
          color: 'rgba(255,255,255,0.88)', fontSize: 'clamp(18px, 2.4vw, 23px)', fontWeight: 600,
          fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
          lineHeight: isAr ? 1.85 : 1.6, margin: '0 auto 28px', maxWidth: 720,
          animation: 'fadeSlideDown 1s ease 0.2s both',
        }}>
          {t('heroSub', lang)}
        </p>

        {/* Metadata line */}
        <div className="print-meta-box" style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.16)',
          borderRadius: 12,
          padding: '10px 22px',
          marginBottom: 38,
          animation: 'fadeSlideDown 1.1s ease 0.3s both',
        }}>
          <p className="print-dark-sub" style={{
            color: 'rgba(255,255,255,0.88)', fontSize: 15, fontWeight: 700,
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
            margin: 0,
          }}>
            {t('heroMeta', lang)}
          </p>
        </div>

        <div className="no-print">
          <button
            onClick={onGoTracks}
            style={{
              background: `linear-gradient(135deg, ${C.gold}, #b8893c)`,
              color: C.navy, border: 'none', borderRadius: 12,
              padding: '16px 42px', fontSize: isAr ? 18 : 16, fontWeight: 800,
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              cursor: 'pointer', boxShadow: `0 8px 32px rgba(197,160,89,0.4)`,
              transition: 'all 0.25s ease',
              animation: 'fadeSlideDown 1.2s ease 0.4s both',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
          >
            {t('heroCta', lang)}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="no-print" style={{ marginTop: 48, opacity: 0.55, animation: 'bounce 2s infinite' }}>
          <div style={{ width: 2, height: 42, background: `linear-gradient(to bottom, ${C.gold}, transparent)`, margin: '0 auto' }} />
        </div>
      </div>
    </section>
  );
}

/* ─── TRACKS (Window #2) ───────────────────────────────────────────── */
interface Track {
  id: number;
  emoji: string;
  badge: { ar: string; en: string };
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  desc: { ar: string; en: string };
  tools: ToolKey[];
  color: string;
}

const tracks: Track[] = [
  {
    id: 1, emoji: '🏠', color: '#1B4965',
    badge: { ar: 'المسار الأول', en: 'Track 1' },
    title: { ar: 'الأسرة والطلبة', en: 'Family & Students' },
    subtitle: { ar: 'الذكاء الاصطناعي للحياة', en: 'AI for Life' },
    desc: {
      ar: 'تطبيق عملي على أدوات Google الحديثة (Gemini وNotebookLM) في المذاكرة وتنظيم ميزانية الأسرة وجدول الأسبوع بسهولة دون تعقيد تقني — للأم والطالب.',
      en: 'Practical use of modern Google tools (Gemini & NotebookLM) for studying, family budgeting, and weekly scheduling — easily, without technical complexity — for mothers and students.',
    },
    tools: ['gemini', 'notebooklm', 'calendar', 'sheets'],
  },
  {
    id: 2, emoji: '💼', color: '#0F4C6B',
    badge: { ar: 'المسار الثاني', en: 'Track 2' },
    title: { ar: 'الموظفون والشباب', en: 'Employees & Youth' },
    subtitle: { ar: 'التطوير المهني والإداري', en: 'Professional & Managerial Development' },
    desc: {
      ar: 'إدارة الوقت والأولويات، مهارات التواصل والتقارير بأدوات Google Workspace والجيل الجديد من أدوات الإنتاج والعروض المرئية (Flow وVids وLabs وPomelli)، وبناء الهوية المهنية والسيرة الذاتية لسوق العمل العُماني.',
      en: 'Time & priority management, communication & reporting using Google Workspace and next-gen AI creation tools (Flow, Vids, Labs, Pomelli), and building your professional identity & CV for the Omani job market.',
    },
    tools: ['gemini', 'notebooklm', 'calendar', 'sheets', 'workspace', 'flow', 'vids', 'labs', 'pomelli'],
  },
  {
    id: 3, emoji: '🏗', color: '#0D2240',
    badge: { ar: 'المسار الثالث', en: 'Track 3' },
    title: { ar: 'أصحاب الأعمال', en: 'Business Owners' },
    subtitle: { ar: 'تأسيس وتنظيم المشاريع', en: 'Business Setup & Organization' },
    desc: {
      ar: 'تحويل الفكرة إلى مشروع منظم، وترتيب الإدارة والمبيعات والهوية التجارية والتسويق المرئي باستخدام Gemini وGoogle Workspace وFlow وVids وLabs وPomelli لتقليل الفوضى وتحسين استقرار العمل.',
      en: 'Transform your idea into an organized business — structure management, sales, brand identity, and visual marketing using Gemini, Google Workspace, Flow, Vids, Labs & Pomelli to reduce chaos and stabilize operations.',
    },
    tools: ['gemini', 'workspace', 'flow', 'vids', 'labs', 'pomelli', 'sheets', 'forms'],
  },
];

function TrackCardContent({ track, lang }: { track: Track; lang: Lang }) {
  const isAr = lang === 'ar';
  return (
    <div className="print-card" style={{
      background: `linear-gradient(135deg, ${track.color}, ${C.petrol})`,
      borderRadius: 24, padding: 'clamp(24px, 4vw, 44px)',
      boxShadow: `0 20px 60px rgba(0,0,0,0.42)`,
      border: `1px solid rgba(197,160,89,0.35)`,
      display: 'flex', flexDirection: 'column', gap: 28,
    }}>
      <div>
        <div className="section-badge-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(197,160,89,0.22)', borderRadius: 999, padding: '6px 18px', marginBottom: 14 }}>
          <span style={{ color: C.goldL, fontSize: 13, fontWeight: 800, fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
            {isAr ? track.badge.ar : track.badge.en}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
          <span style={{ fontSize: 40 }}>{track.emoji}</span>
          <div>
            <h3 className="print-dark-heading" style={{ color: '#fff', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, margin: '0 0 4px', fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {isAr ? track.title.ar : track.title.en}
            </h3>
            <p className="print-dark-accent" style={{ color: C.goldL, fontSize: 18, fontWeight: 700, margin: 0, fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
              {isAr ? track.subtitle.ar : track.subtitle.en}
            </p>
          </div>
        </div>
        <p className="print-dark-sub" style={{ color: 'rgba(255,255,255,0.92)', fontSize: 17, fontWeight: 600, lineHeight: isAr ? 1.9 : 1.7, margin: '16px 0 0', fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
          {isAr ? track.desc.ar : track.desc.en}
        </p>
      </div>

      {/* Tools Grid */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: 22 }}>
        <p className="print-dark-accent" style={{
          color: C.goldL, fontSize: 14, fontWeight: 800,
          margin: '0 0 14px',
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
        }}>
          {isAr ? 'الأدوات والتقنيات التطبيقية في هذا المسار:' : 'PRACTICAL TOOLS & PLATFORMS IN THIS TRACK:'}
        </p>
        <div className="print-tools-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: 10,
        }}>
          {track.tools.map(key => {
            const info = TOOL_CATALOG[key];
            return (
              <div key={key} className="print-tool-item" style={{
                background: 'rgba(15, 23, 42, 0.52)',
                borderRadius: 14,
                padding: '10px 14px',
                border: '1px solid rgba(255,255,255,0.14)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <div className="print-tool-icon" style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: '#FFFFFF',
                  border: `1.5px solid ${info.accent}66`,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  padding: 5,
                }}>
                  <ToolIcon toolKey={key} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="print-dark-heading" style={{ color: '#fff', fontSize: 14.5, fontWeight: 700, fontFamily: 'Inter, sans-serif', lineHeight: 1.25 }}>
                    {info.name}
                  </div>
                  <div className="print-dark-sub" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, fontWeight: 600, fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif', marginTop: 2 }}>
                    {isAr ? info.roleAr : info.roleEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TracksSection({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const isAr = lang === 'ar';

  return (
    <section id="tracks" className="print-section" style={{ background: C.navy, padding: '88px 24px', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader
            badgeAr="٠٢ · المسارات الثلاثة"
            badgeEn="02 · THE THREE TRACKS"
            title={t('tracksTitle', lang)}
            subtitle={t('tracksSub', lang)}
            lang={lang}
            dark
          />
        </Reveal>

        {/* Interactive Tab Switchers (screen only) */}
        <Reveal delay={100}>
          <div className="no-print" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 34, flexWrap: 'wrap' }}>
            {tracks.map((tr, i) => (
              <button key={tr.id} onClick={() => setActive(i)} style={{
                padding: '12px 26px', borderRadius: 999,
                border: `2px solid ${active === i ? C.gold : 'rgba(255,255,255,0.18)'}`,
                background: active === i ? C.gold : 'rgba(255,255,255,0.04)',
                color: active === i ? C.navy : 'rgba(255,255,255,0.85)',
                fontWeight: 800, fontSize: 15, cursor: 'pointer',
                fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                transition: 'all 0.25s ease',
                boxShadow: active === i ? '0 6px 22px rgba(197,160,89,0.35)' : 'none',
              }}>
                {tr.emoji} {isAr ? tr.title.ar : tr.title.en}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active track on screen */}
        <div key={active} className="no-print" style={{ animation: 'fadeSlideIn 0.4s ease both' }}>
          <TrackCardContent track={tracks[active]} lang={lang} />
        </div>

        {/* Print-only: show ALL 3 tracks cleanly in PDF */}
        <div className="print-only-block" style={{ display: 'none', flexDirection: 'column', gap: 18 }}>
          {tracks.map(tr => (
            <TrackCardContent key={tr.id} track={tr} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SESSION + VOTE WIDGET (Window #3) ─────────────────────────────── */
function SessionSection({ lang }: { lang: Lang }) {
  const isAr = lang === 'ar';
  const [votes, setVotes] = useState([0, 0, 0]);
  const [voted, setVoted] = useState<number | null>(null);
  const total = votes.reduce((a, b) => a + b, 0);

  const castVote = (i: number) => {
    if (voted !== null) return;
    setVotes(v => v.map((x, j) => j === i ? x + 1 : x));
    setVoted(i);
  };

  const resetVote = () => {
    setVotes([0, 0, 0]);
    setVoted(null);
  };

  const voteLabels = [
    { ar: 'الأسرة والطلبة 🏠', en: 'Family & Students 🏠' },
    { ar: 'الموظفون والشباب 💼', en: 'Employees & Youth 💼' },
    { ar: 'أصحاب الأعمال 🏗', en: 'Business Owners 🏗' },
  ];

  const highlights = [
    { icon: '⏱', ar: 'تطبيق حي على الشاشة (60 دقيقة)', en: 'Live on-screen demo session (60 minutes)' },
    { icon: '🛠', ar: 'أدوات Google المألوفة للجميع (Gemini · NotebookLM · Workspace)', en: 'Familiar Google tools for everyone (Gemini · NotebookLM · Workspace)' },
    { icon: '📱', ar: 'تصويت مباشر خلال 5 دقائق عبر QR Code', en: 'Live 5-minute QR Code voting' },
    { icon: '📊', ar: 'بيانات احتياج حقيقية يستلمها مجلس الإدارة فوراً', en: 'Real demand data delivered instantly to the Board' },
  ];

  return (
    <section id="opening-session" className="print-section" style={{ background: C.cream, padding: '88px 24px', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader
            badgeAr="٠٣ · الندوة الافتتاحية"
            badgeEn="03 · OPENING SESSION"
            title={t('sessionTitle', lang)}
            subtitle={t('sessionSub', lang)}
            lang={lang}
          />
        </Reveal>

        <div className="print-two-col" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* Highlights card */}
          <Reveal delay={100} className="card-flex">
            <div className="print-card" style={{ flex: '1 1 300px', background: '#fff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 6px 28px rgba(15,23,42,0.08)', border: `1px solid ${C.border}` }}>
              <h3 style={{ color: C.navy, fontSize: 20, fontWeight: 800, margin: '0 0 22px', fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                {isAr ? 'أبرز ملامح الندوة الافتتاحية' : 'Opening Session Highlights'}
              </h3>
              {highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderBottom: i < highlights.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{h.icon}</span>
                  <span style={{ color: '#1E293B', fontSize: 17, fontWeight: 600, lineHeight: isAr ? 1.85 : 1.6, fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
                    {isAr ? h.ar : h.en}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Vote widget */}
          <Reveal delay={200} className="card-flex">
            <div className="print-card" style={{ flex: '1 1 300px', background: `linear-gradient(160deg, ${C.navy} 0%, #0d2240 100%)`, borderRadius: 20, padding: '32px 28px', boxShadow: '0 8px 30px rgba(15,23,42,0.22)', border: `1px solid rgba(197,160,89,0.35)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                <div style={{ width: 54, height: 54, borderRadius: 12, background: '#fff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <QRIcon />
                </div>
                <div>
                  <h3 className="print-dark-heading" style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '0 0 4px', fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                    {t('voteTitle', lang)}
                  </h3>
                  <p className="print-dark-sub" style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13.5, fontWeight: 600, margin: 0, fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
                    {t('voteSub', lang)}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {voteLabels.map((label, i) => {
                  const pct = total > 0 ? Math.round((votes[i] / total) * 100) : 0;
                  const isVoted = voted === i;
                  return (
                    <div key={i}>
                      <button
                        onClick={() => castVote(i)}
                        disabled={voted !== null}
                        className="print-vote-option"
                        style={{
                          width: '100%', textAlign: isAr ? 'right' : 'left', direction: isAr ? 'rtl' : 'ltr',
                          padding: '13px 16px', borderRadius: 12,
                          border: `1.5px solid ${isVoted ? C.gold : 'rgba(255,255,255,0.18)'}`,
                          background: isVoted ? 'rgba(197,160,89,0.18)' : 'rgba(255,255,255,0.06)',
                          color: isVoted ? C.goldL : 'rgba(255,255,255,0.92)',
                          fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif', fontSize: 15.5, fontWeight: 700,
                          cursor: voted !== null ? 'default' : 'pointer',
                          transition: 'all 0.2s ease', marginBottom: 4,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{isAr ? label.ar : label.en}</span>
                          {voted !== null && <span style={{ fontSize: 14, fontWeight: 800, color: C.gold }}>{pct}%</span>}
                        </div>
                      </button>
                      {voted !== null && (
                        <div style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden', marginBottom: 6 }}>
                          <div style={{
                            height: '100%', width: `${pct}%`,
                            background: isVoted ? C.gold : 'rgba(255,255,255,0.3)',
                            borderRadius: 99, transition: 'width 0.8s ease',
                          }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {voted !== null ? (
                <div className="no-print" style={{ marginTop: 18, textAlign: 'center' }}>
                  <p style={{ color: C.goldL, fontSize: 14.5, margin: '0 0 10px', fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif', fontWeight: 700 }}>
                    {isAr ? '✓ تم تسجيل صوتك — هكذا يستلم النادي بيانات احتياج الأعضاء' : '✓ Vote recorded — this is how the Club captures real member demand data'}
                  </p>
                  <button onClick={resetVote} style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.25)',
                    color: 'rgba(255,255,255,0.75)', borderRadius: 8, padding: '5px 14px',
                    fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                  }}>
                    {isAr ? 'إعادة التجربة' : 'Try again'}
                  </button>
                </div>
              ) : (
                <p className="no-print" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13.5, fontWeight: 600, marginTop: 18, textAlign: 'center', fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
                  {isAr ? '👆 اضغط لاختيار المسار الذي يهمك' : '👆 Tap to choose the track that interests you'}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QRIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#0F172A" strokeWidth="2"/>
      <rect x="4" y="4" width="6" height="6" rx="0.5" fill="#0F172A"/>
      <rect x="16" y="2" width="10" height="10" rx="1.5" stroke="#0F172A" strokeWidth="2"/>
      <rect x="18" y="4" width="6" height="6" rx="0.5" fill="#0F172A"/>
      <rect x="2" y="16" width="10" height="10" rx="1.5" stroke="#0F172A" strokeWidth="2"/>
      <rect x="4" y="18" width="6" height="6" rx="0.5" fill="#0F172A"/>
      <rect x="16" y="16" width="4" height="4" fill="#0F172A"/>
      <rect x="22" y="16" width="4" height="4" fill="#0F172A"/>
      <rect x="16" y="22" width="4" height="4" fill="#0F172A"/>
      <rect x="22" y="22" width="4" height="4" fill="#0F172A"/>
    </svg>
  );
}

/* ─── WHY DIFFERENT (Window #4) ────────────────────────────────────── */
function WhySection({ lang }: { lang: Lang }) {
  const isAr = lang === 'ar';
  const before = [
    { ar: 'محاضرة نظرية طويلة بمحتوى عام', en: 'Long theoretical lecture with generic content' },
    { ar: 'مواضيع لا تلامس احتياج الأسرة أو صاحب العمل', en: 'Topics unrelated to family or business needs' },
    { ar: 'تأثير محدود بعد انتهاء الفعالية', en: 'Limited impact after the event ends' },
    { ar: 'لا توجد آلية لمعرفة ما يريده الأعضاء', en: 'No mechanism to understand what members want' },
  ];
  const after = [
    { ar: 'تطبيق حي على الشاشة بأدوات مألوفة ومتاحة (Gemini، NotebookLM، Workspace)', en: 'Live on-screen demos with familiar & accessible tools (Gemini, NotebookLM, Workspace)' },
    { ar: 'محتوى يلامس كل فرد في الأسرة: الطالب والموظف وصاحب المشروع', en: 'Content relevant to every family member: student, employee & business owner' },
    { ar: 'تصويت فوري بـ QR Code يقيس الاحتياج الحقيقي لأعضاء النادي', en: 'Instant QR Code voting that measures real member demand' },
    { ar: 'بيانات حقيقية تُخبر مجلس الإدارة بما يبحث عنه الأعضاء', en: 'Real data that tells the Board what members are looking for' },
  ];

  const cardStyle = (accent: string): React.CSSProperties => ({
    background: '#fff', borderRadius: 20, padding: '32px 28px',
    boxShadow: '0 6px 28px rgba(15,23,42,0.08)',
    border: `2px solid ${accent}`, flex: 1, minWidth: 280,
  });

  return (
    <section id="why-different" className="print-section" style={{ background: C.white, padding: '88px 24px', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader
            badgeAr="٠٤ · لماذا هذا النموذج؟"
            badgeEn="04 · WHY THIS MODEL?"
            title={t('whyTitle', lang)}
            subtitle={t('whySub', lang)}
            lang={lang}
          />
        </Reveal>

        <div className="print-two-col" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* Before */}
          <Reveal delay={100} className="card-flex">
            <div className="print-card" style={{ ...cardStyle('rgba(148,163,184,0.45)'), flex: 1, minWidth: 280 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 26 }}>😴</span>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#334155', fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {t('beforeTitle', lang)}
                </h3>
              </div>
              {before.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                  <span style={{ color: '#94a3b8', fontSize: 18, fontWeight: 800, marginTop: 2, flexShrink: 0 }}>✕</span>
                  <span style={{
                    color: '#334155', fontSize: 17, fontWeight: 600,
                    lineHeight: isAr ? 1.8 : 1.6,
                    fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                  }}>
                    {isAr ? item.ar : item.en}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* After */}
          <Reveal delay={200} className="card-flex">
            <div className="print-card" style={{ ...cardStyle(C.gold), background: C.cream, flex: 1, minWidth: 280 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 26 }}>🚀</span>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.petrol, fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {t('afterTitle', lang)}
                </h3>
              </div>
              {after.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                  <span style={{ color: C.gold, fontSize: 19, fontWeight: 900, marginTop: 1, flexShrink: 0 }}>✓</span>
                  <span style={{
                    color: '#0F172A', fontSize: 17, fontWeight: 600,
                    lineHeight: isAr ? 1.8 : 1.6,
                    fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                  }}>
                    {isAr ? item.ar : item.en}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── ROADMAP (Window #5) ──────────────────────────────────────────── */
function Roadmap({ lang }: { lang: Lang }) {
  const isAr = lang === 'ar';
  const phases = [
    {
      num: '01', ar: 'اعتماد اللقاء الافتتاحي', en: 'Approve the Opening Session',
      descAr: 'اعتماد المجلس للقاء الافتتاحي والإعلان عنه عبر قنوات النادي الرسمية (WhatsApp، الإعلانات الداخلية، المنصات).',
      descEn: 'Board approval for the opening session and announcing it through official Club channels (WhatsApp, internal notices, platforms).',
      icon: '✅',
    },
    {
      num: '02', ar: 'التنفيذ وقياس الاحتياج', en: 'Execution & Needs Assessment',
      descAr: 'تنفيذ الندوة الافتتاحية التفاعلية (60 دقيقة) مع تصويت مباشر بـ QR Code لقياس احتياج الأعضاء الفعلي وتجميع بيانات الطلب.',
      descEn: 'Conduct the interactive opening session (60 min) with live QR Code voting to measure actual member needs and collect demand data.',
      icon: '📊',
    },
    {
      num: '03', ar: 'إطلاق سلسلة الورش التطبيقية', en: 'Launch Specialized Workshop Series',
      descAr: 'بناءً على نتائج التصويت، إطلاق سلسلة ورش تطبيقية متخصصة لكل شريحة تحت مظلة النادي وبآلية منظمة يقرها المجلس.',
      descEn: 'Based on voting results, launch specialized applied workshops for each segment under the Club\'s umbrella, with an organized mechanism approved by the Board.',
      icon: '🚀',
    },
  ];

  return (
    <section id="roadmap" className="print-section" style={{ background: C.navy, padding: '88px 24px', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader
            badgeAr="٠٥ · خطة التنفيذ"
            badgeEn="05 · IMPLEMENTATION ROADMAP"
            title={t('roadmapTitle', lang)}
            subtitle={t('roadmapSub', lang)}
            lang={lang}
            dark
          />
        </Reveal>

        <div style={{ position: 'relative' }}>
          <div className="print-timeline-line" style={{
            position: 'absolute',
            [isAr ? 'right' : 'left']: 27,
            top: 0, bottom: 0, width: 2,
            background: `linear-gradient(to bottom, ${C.gold}, rgba(197,160,89,0.15))`,
          }} />

          {phases.map((p, i) => (
            <Reveal key={i} delay={i * 140}>
              <div className="print-phase-row" style={{ display: 'flex', gap: 24, [isAr ? 'paddingRight' : 'paddingLeft']: 74, marginBottom: i < phases.length - 1 ? 36 : 0, position: 'relative' }}>
                <div className="print-phase-circle" style={{
                  position: 'absolute', [isAr ? 'right' : 'left']: 0,
                  width: 56, height: 56, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${C.gold}, #b8893c)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 0 6px rgba(197,160,89,0.15)`,
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 22 }}>{p.icon}</span>
                </div>

                <div className="print-card" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 16, padding: '24px 26px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span className="print-dark-accent" style={{ color: C.goldL, fontSize: 12.5, fontWeight: 800, letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>
                      {isAr ? `المرحلة ${p.num}` : `PHASE ${p.num}`}
                    </span>
                  </div>
                  <h3 className="print-dark-heading" style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: '0 0 10px', fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                    {isAr ? p.ar : p.en}
                  </h3>
                  <p className="print-dark-sub" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16.5, fontWeight: 600, lineHeight: isAr ? 1.9 : 1.7, margin: 0, fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
                    {isAr ? p.descAr : p.descEn}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER / BIO (Window #6) ─────────────────────────────────────── */
function PresenterFooter({ lang }: { lang: Lang }) {
  const isAr = lang === 'ar';

  const creds = [
    { icon: '🎓', ar: 'خبرة تتجاوز 17 عاماً في الإدارة والحوكمة', en: '17+ years in Management & Governance' },
    { icon: '🏢', ar: 'تطوير الشركات وفرق العمل في سلطنة عُمان', en: 'Corporate & Team Development in Oman' },
    { icon: '🤖', ar: 'تطبيق أدوات الذكاء الاصطناعي وGoogle الحديثة', en: 'AI & Modern Google Tools Implementation' },
    { icon: '📈', ar: 'تطوير الأعمال والاستشارات التنفيذية', en: 'Business Development & Executive Consulting' },
  ];

  return (
    <footer id="presenter" className="print-section" style={{
      background: `linear-gradient(160deg, ${C.navy} 0%, #060f1e 100%)`,
      padding: '88px 24px 48px',
      borderTop: `2px solid rgba(197,160,89,0.35)`,
      scrollMarginTop: 80,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Static Ceremonial Draped Official Egyptian Flags (Left & Right) */}
      <EgyptDrapedFlagsBg />
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <SectionHeader
            badgeAr="٠٦ · مقدِّم المقترح"
            badgeEn="06 · ABOUT THE PRESENTER"
            title={t('bioName', lang)}
            subtitle={t('bioRole', lang)}
            lang={lang}
            dark
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="print-card" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(197,160,89,0.32)`, borderRadius: 24, padding: 'clamp(28px, 4vw, 48px)', marginBottom: 40 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
              {/* Personal Portrait Photo */}
              <div style={{ flexShrink: 0, margin: '0 auto' }}>
                <div style={{
                  width: 140, height: 140, borderRadius: '50%',
                  overflow: 'hidden',
                  border: `3px solid ${C.gold}`,
                  boxShadow: `0 0 0 6px rgba(197,160,89,0.18), 0 12px 30px rgba(0,0,0,0.45)`,
                  background: '#1E293B',
                }}>
                  <img
                    src="./mahmoud-hemeda.jpg"
                    alt={t('bioName', lang)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 18%',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: '1 1 320px' }}>
                <p className="print-dark-accent" style={{ color: C.goldL, fontSize: 13, fontWeight: 800, margin: '0 0 8px', fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {t('bioTitle', lang)}
                </p>
                <h3 className="print-dark-heading" style={{ color: '#fff', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 900, margin: '0 0 6px', fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {t('bioName', lang)}
                </h3>
                <p className="print-dark-accent" style={{ color: C.gold, fontSize: 17, fontWeight: 700, margin: '0 0 18px', fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
                  {t('bioRole', lang)}
                </p>
                <p className="print-dark-sub" style={{ color: 'rgba(255,255,255,0.88)', fontSize: 16.5, fontWeight: 600, lineHeight: isAr ? 1.95 : 1.7, margin: '0 0 26px', maxWidth: 620, fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
                  {t('bioDesc', lang)}
                </p>

                {/* Credentials grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
                  {creds.map((c, i) => (
                    <div key={i} className="print-cred-item" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ fontSize: 20 }}>{c.icon}</span>
                      <span className="print-dark-sub" style={{ color: 'rgba(255,255,255,0.88)', fontSize: 14.5, fontWeight: 600, fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif', lineHeight: 1.45 }}>
                        {isAr ? c.ar : c.en}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action buttons: CV + WhatsApp */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                  <a
                    href="https://drive.google.com/drive/folders/1fkSE85D4rGeHZb5pyb04g1eScovu5e_c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="print-link-btn"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: 'transparent', border: `1.5px solid ${C.gold}`,
                      color: C.gold, borderRadius: 10, padding: '12px 24px',
                      fontSize: 15, fontWeight: 700, textDecoration: 'none',
                      fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>📋</span>
                    {t('cvButton', lang)}
                    <span style={{ fontSize: 13 }}>↗</span>
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="print-link-btn"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 9,
                      background: 'rgba(37, 211, 102, 0.14)', border: '1.5px solid rgba(37, 211, 102, 0.5)',
                      color: '#4ADE80', borderRadius: 10, padding: '12px 22px',
                      fontSize: 15, fontWeight: 700, textDecoration: 'none',
                      fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                    }}
                  >
                    <WhatsAppIcon size={22} />
                    <span>{t('contactLabel', lang)}:</span>
                    <span dir="ltr" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>0096892940008</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Closing CTA */}
        <Reveal delay={150}>
          <div className="print-card" style={{ textAlign: 'center', padding: '36px 28px', background: `rgba(197,160,89,0.09)`, border: `1px solid rgba(197,160,89,0.28)`, borderRadius: 20 }}>
            <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>🤝</span>
            <p className="print-dark-sub" style={{
              color: 'rgba(255,255,255,0.92)', fontSize: 'clamp(17px, 2.5vw, 21px)',
              lineHeight: isAr ? 1.95 : 1.7, margin: '0 auto', maxWidth: 720,
              fontFamily: isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif', fontWeight: 600,
            }}>
              {t('footerCta', lang)}
            </p>
          </div>
        </Reveal>

        {/* Copyright */}
        <div style={{ textAlign: 'center', marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="print-dark-sub" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, margin: 0, fontFamily: isAr ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
            © 2026 · {isAr ? 'محمود حميده — مقترح مقدم لمجلس إدارة نادي الجالية المصرية بسلطنة عُمان' : 'Mahmoud Hemedah — Proposal submitted to the Board of Directors of the Egyptian Community Club in Oman'}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── GLOBAL STYLES & PRINT PDF ENGINE ─────────────────────────────── */
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0; padding: 0; overflow: auto !important;
    background: #0F172A; color: #1e293b;
    -webkit-font-smoothing: antialiased;
  }
  #proposal-root { min-height: 100vh; }
  .card-flex { flex: 1 1 300px; }
  .card-flex > div { height: 100%; }

  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(8px); }
  }

  @media (max-width: 960px) {
    .nav-links { display: none !important; }
    .mobile-nav-strip { display: flex !important; }
  }

  @media (max-width: 768px) {
    .egypt-drape-banner {
      width: 44px !important;
      opacity: 0.26 !important;
    }
  }

  @media (max-width: 560px) {
    .print-label { display: none !important; }
  }

  /* ── Executive Print / Save-as-PDF Stylesheet ───────────────────── */
  @media print {
    @page {
      size: A4 portrait;
      margin: 12mm 12mm;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      animation: none !important;
      transition: none !important;
    }

    html, body {
      background: #FFFFFF !important;
      color: #0F172A !important;
      font-size: 13px !important;
    }

    .no-print { display: none !important; }
    .print-only-block { display: flex !important; }

    /* Ensure NO section stays hidden due to Scroll-Reveal */
    .reveal-block {
      opacity: 1 !important;
      transform: none !important;
    }

    /* Clean executive light paper theme for all sections */
    .print-section {
      background: #FFFFFF !important;
      padding: 18px 0 !important;
      border-top: none !important;
      border-bottom: 1.5px solid #E2D9CC !important;
      min-height: auto !important;
    }

    .print-hero {
      background: #F5F2EB !important;
      border: 2px solid #C5A059 !important;
      border-radius: 16px !important;
      padding: 24px 20px !important;
      margin-bottom: 16px !important;
    }

    .print-dark-heading {
      color: #0F172A !important;
    }
    .print-dark-sub {
      color: #334155 !important;
    }
    .print-dark-accent {
      color: #1B4965 !important;
    }

    .section-badge-dark {
      background: #F5F2EB !important;
      border: 1px solid #C5A059 !important;
    }
    .section-badge-dark span {
      color: #1B4965 !important;
    }

    .print-meta-box {
      background: #FFFFFF !important;
      border: 1px solid #C5A059 !important;
    }

    .print-card {
      background: #FFFFFF !important;
      color: #0F172A !important;
      border: 1.5px solid #CBD5E1 !important;
      box-shadow: none !important;
      padding: 18px 20px !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    .print-two-col {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 14px !important;
    }

    .print-tools-grid {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 8px !important;
    }

    .print-tool-item {
      background: #F8FAFC !important;
      border: 1px solid #CBD5E1 !important;
      padding: 8px 10px !important;
    }

    .print-tool-icon {
      background: #FFFFFF !important;
      border: 1px solid #CBD5E1 !important;
      box-shadow: none !important;
    }

    .print-vote-option {
      background: #F8FAFC !important;
      border: 1px solid #CBD5E1 !important;
      color: #0F172A !important;
      padding: 8px 12px !important;
    }

    .print-cred-item {
      background: #F8FAFC !important;
      border: 1px solid #CBD5E1 !important;
    }

    .print-link-btn {
      background: #F5F2EB !important;
      border: 1px solid #1B4965 !important;
      color: #0F172A !important;
      padding: 8px 14px !important;
      font-size: 12.5px !important;
    }

    .section-header {
      margin-bottom: 18px !important;
      break-after: avoid !important;
      page-break-after: avoid !important;
    }

    .print-phase-row {
      margin-bottom: 14px !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    .print-timeline-line {
      background: #C5A059 !important;
    }

    a[href*="drive.google.com"]::after {
      content: " (" attr(href) ")";
      font-size: 10px;
      color: #475569;
    }
  }
`;

export function ProposalApp() {
  const [lang, setLang] = useState<Lang>('ar');
  const [activeSection, setActiveSection] = useState<SectionId>('proposal');
  const manualScrollLockUntil = useRef<number>(0);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.style.fontFamily = lang === 'ar'
      ? "'Cairo', 'Tajawal', system-ui, sans-serif"
      : "'Inter', system-ui, sans-serif";
  }, [lang]);

  // Accurate viewport-overlap ScrollSpy so no section (e.g. #why-different) is ever skipped
  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() < manualScrollLockUntil.current) return;

      const vh = window.innerHeight;
      const navBottom = 80;

      // At very top -> proposal
      if (window.scrollY < 40) {
        setActiveSection('proposal');
        return;
      }

      // At bottom -> presenter
      if (vh + window.scrollY >= document.documentElement.scrollHeight - 25) {
        setActiveSection('presenter');
        return;
      }

      // Focus on the primary reading band (top 62% below the fixed navbar)
      const focalBottom = Math.min(vh, navBottom + Math.max(380, (vh - navBottom) * 0.62));
      let bestId: SectionId = 'proposal';
      let bestVisible = -1;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, navBottom);
        const visibleBottom = Math.min(rect.bottom, focalBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        if (visibleHeight > bestVisible) {
          bestVisible = visibleHeight;
          bestId = id;
        }
      }

      setActiveSection(bestId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleSelectSection = (id: SectionId) => {
    manualScrollLockUntil.current = Date.now() + 750;
    setActiveSection(id);
  };

  const scrollToTracks = () => {
    handleSelectSection('tracks');
    const el = document.getElementById('tracks');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalCSS }} />
      <div style={{
        direction: lang === 'ar' ? 'rtl' : 'ltr',
        fontFamily: lang === 'ar' ? "'Cairo', 'Tajawal', sans-serif" : "'Inter', sans-serif",
      }}>
        <Navbar
          lang={lang}
          onToggleLang={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />
        <Hero lang={lang} onGoTracks={scrollToTracks} />
        <TracksSection lang={lang} />
        <SessionSection lang={lang} />
        <WhySection lang={lang} />
        <Roadmap lang={lang} />
        <PresenterFooter lang={lang} />
      </div>
    </>
  );
}
