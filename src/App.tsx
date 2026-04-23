import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Solution = {
  id: string;
  title: string;
  visual: string;
  tasks: string[];
  conditions: string[];
};

type Partner = {
  name: string;
  href?: string;
  logo?: string;
  className?: string;
};

const nav = [
  ["/", "О нас"],
  ["/#projects", "Проекты"],
  ["/solutions", "Решения"],
  ["/technologies", "Технологии"],
  ["/#partners", "Партнеры"],
  ["/#vacancies", "Вакансии"],
  ["/#contacts", "Контакты"],
];

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const industries = [
  ["01", "Медицина", "Видеоаналитика для контроля состояния пациентов, оборудования и выполнения протоколов ухода."],
  ["02", "Строительный контроль и надзор", "Мониторинг процессов, зон риска, техники и соблюдения требований безопасности на объектах."],
  ["03", "Лесопарковые территории", "Наблюдение за состоянием территорий, потоками людей и событиями в распределенной инфраструктуре."],
  ["04", "ЖКХ", "Контроль городской и коммунальной инфраструктуры с передачей событий в режиме реального времени."],
  ["05", "Массовое пребывание людей", "Повышение безопасности общественных пространств за счет раннего обнаружения инцидентов."],
];

const vacancies = [
  {
    title: "Middle computer vision engineer",
    description: "Разработка моделей детекции, трекинга и обработки видеопотоков для промышленных объектов.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Middle backend developer",
    description: "Создание серверной логики, API и интеграций для систем видеоаналитики и телеметрии.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Стажировка",
    description: "Приглашаем студентов и выпускников, которым интересны компьютерное зрение, данные и прикладной AI.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
];

const solutions: Solution[] = [
  {
    id: "01",
    title: "Подземная видеоаналитика в шахтах",
    visual: "mine",
    tasks: [
      "Контроль производственных и технологических процессов.",
      "Контроль соблюдения ТБ во время нахождения на объекте.",
      "Контроль динамических опасных зон.",
    ],
    conditions: [
      "Сложные условия съемки: пыль и недостаточное освещение.",
      "Длительные технологические процессы до нескольких часов.",
      "Большое количество объектов заказчика с отличающимися процессами и инфраструктурой.",
      "Интеграция с телеметрией техники.",
    ],
  },
  {
    id: "02",
    title: "Контроль СИЗ на предприятии",
    visual: "ppe",
    tasks: [
      "Контроль СИЗ на территории предприятий.",
      "Подсчет человеко-часов при выполнении работ подрядной организацией на объекте заказчика.",
    ],
    conditions: ["Большое количество видов СИЗ.", "Сложные условия съемки."],
  },
  {
    id: "03",
    title: "Контроль СИЗ и ремней безопасности на электроустановках",
    visual: "power",
    tasks: [
      "Контроль базового набора СИЗ.",
      "Контроль диэлектрического набора СИЗ при выполнении сотрудниками определенных действий.",
      "Контроль ремней безопасности при въезде и выезде через КПП.",
      "Контроль последовательности выполняемых операций сотрудником.",
    ],
    conditions: [
      "Большое количество выполняемых операций.",
      "Камеры общего видеонаблюдения.",
      "Большое количество камер на улице.",
    ],
  },
  {
    id: "04",
    title: "Контроль состояния пациентов в реанимации",
    visual: "medical",
    tasks: [
      "Контроль за аппаратами жизнеобеспечения пациентов.",
      "Контроль выполнения протоколов ухода за пациентами.",
      "Контроль за пациентами с целью выявления признаков состояний, угрожающих жизни.",
    ],
    conditions: [
      "Большое количество факторов, требующих аналитики.",
      "Наличие камер видеонаблюдения в непосредственной зоне нахождения пациента.",
    ],
  },
];

const partnerGroups: Array<{ id: string; title: string; featured?: boolean; wide?: boolean; partners: Partner[] }> = [
  {
    id: "01",
    title: "Медицина и наука",
    featured: true,
    partners: [
      { name: "Онкоцентр Герцена", href: "https://mnioi.nmicr.ru/", logo: "/assets/Герцена_лого.jpg", className: "wide-logo" },
      { name: "Бакулевка", href: "https://bakulev.ru/", logo: "/assets/Бакулевка_лого.png", className: "wide-logo" },
      { name: "ВРОНЦ", href: "https://ronc.ru/", logo: favicon("ronc.ru") },
      { name: "Курчатовский институт", href: "https://www.nrcki.ru/", logo: favicon("nrcki.ru") },
      { name: "Институт МЯТ ФМБА", href: "https://fmbaros.ru/", logo: "/assets/фмба_лого.webp", className: "wide-logo" },
      { name: "ФМБА", href: "https://fmbaros.ru/", logo: "/assets/фмба_лого.webp", className: "wide-logo" },
      { name: "МГУ", href: "https://www.msu.ru/", logo: "/assets/МГУ_лого.jpg", className: "tall-logo" },
      { name: "МИФИ", href: "https://mephi.ru/", logo: "/assets/МИФИ_лого.jpg", className: "tall-logo" },
      { name: "Сколтех", href: "https://www.skoltech.ru/", logo: "/assets/partners/skoltech.png" },
    ],
  },
  {
    id: "02",
    title: "Государственный и промышленный контур",
    partners: [
      { name: "Правительство Москвы", href: "https://www.mos.ru/", logo: "/assets/правительство_москвы_лого.png", className: "wide-logo" },
      { name: "Минпромторг", href: "https://minpromtorg.gov.ru/", logo: "/assets/минпромторг_лого.png", className: "wide-logo" },
      { name: "Ростех", href: "https://rostec.ru/", logo: "/assets/partners/rostec.svg", className: "tall-logo" },
      { name: "Росатом", href: "https://www.rosatom.ru/", logo: "/assets/росатом_лого.webp", className: "wide-logo" },
      { name: "Атомстройэкспорт", href: "https://ase-ec.ru/", logo: "/assets/partners/atomstroiexport.svg" },
      { name: "Титан", href: "https://titan-group.ru/", logo: "/assets/Титан_лого.png", className: "wide-logo" },
      { name: "РАД", href: "https://www.gp-rad.ru/", logo: favicon("gp-rad.ru") },
      { name: "Пионер", href: "https://pioneer.ru/", logo: favicon("pioneer.ru") },
      { name: "Мосинжпроект", href: "https://mosinzhproekt.ru/", logo: favicon("mosinzhproekt.ru") },
      { name: "Гипроздрав", href: "https://giprozdraw.ru/", logo: "/assets/гипроздрав_лого.jpg", className: "wide-logo" },
      { name: "Hutton Development", href: "https://hutton.ru/", logo: favicon("hutton.ru") },
      { name: "Инфратех Концессии", href: "https://concessii.ru/", logo: "/assets/инфратех_лого.webp", className: "wide-logo" },
    ],
  },
  {
    id: "03",
    title: "Технологии и инфраструктура",
    partners: [
      { name: "Р-Фарм", href: "https://r-pharm.com/", logo: "/assets/partners/r-pharm.jpg", className: "tall-logo" },
      { name: "Фармстандарт", href: "https://pharmstd.com/", logo: "/assets/partners/pharmstandard.svg" },
      { name: "RUVDS.com", href: "https://ruvds.com/", logo: "/assets/ruvds_лого.jpg", className: "wide-logo" },
    ],
  },
  {
    id: "04",
    title: "Производители и приборостроение",
    wide: true,
    partners: [
      { name: "Polimaster", href: "https://polimaster.com/", logo: favicon("polimaster.com") },
      { name: "ЭкоСфера", href: "https://ekosf.ru/", logo: favicon("ekosf.ru") },
      { name: "Экотест", href: "https://ecotest.ua/", logo: favicon("ecotest.ua") },
      { name: "ПТФМ", href: "https://www.ptfm.ru/", logo: favicon("ptfm.ru") },
      { name: "НПП «Гамма»", href: "https://khv.nppgamma.ru/", logo: favicon("nppgamma.ru") },
      { name: "Атомтех", href: "http://www.atomtex.com/", logo: "/assets/атомтех_лого.avif", className: "wide-logo" },
      { name: "Позитрон", href: "https://npk-positron.ru/", logo: favicon("npk-positron.ru") },
      { name: "IBA Dosimetry", href: "https://www.iba-dosimetry.com/", logo: favicon("iba-dosimetry.com") },
      { name: "Gammex", href: "https://www.sunnuclear.com/diagnostic-imaging-qa-solutions", logo: favicon("sunnuclear.com") },
    ],
  },
];

const techTabs = [
  {
    id: "vision",
    number: "01",
    title: "Системы компьютерного зрения",
    flow: ["Камеры", "Edge/GPU", "AI-модели", "События"],
    groups: [
      ["Видео и изображение", "Python 3.10+, OpenCV 4.x, Pillow, scikit-image, FFmpeg, GStreamer."],
      ["Модели и инференс", "PyTorch 2.x, ONNX Runtime, TensorRT, YOLOv8/YOLOv10, ByteTrack, DeepSORT, StrongSORT."],
      ["Действия и сложная съемка", "HRNet, MediaPipe, SlowFast, TimeSformer, Retinex, Zero-DCE, EnlightenGAN, domain adaptation."],
      ["Промышленная интеграция", "MQTT, OPC UA, Kafka, NVIDIA Jetson, x86-серверы с GPU, Docker, Kubernetes, OpenShift, Prometheus, Grafana."],
    ],
  },
  {
    id: "integration",
    number: "02",
    title: "Интеграция данных и автоматизация процессов",
    flow: ["Источники", "ETL", "Платформа", "Документы"],
    groups: [
      ["Бэкенд и ETL", "Python 3.10+, FastAPI, Django, SQLAlchemy, psycopg2, ODBC/JDBC, REST/GraphQL, SOAP, Apache Airflow, Pandas, Polars, Dask."],
      ["Геоданные", "GDAL, Fiona, Shapely, GeoPandas, PostGIS, PostgreSQL Pro, Leaflet, OpenLayers, Yandex Maps API."],
      ["AI и RAG", "LangChain, LlamaIndex, PGVector, ruBERT, Llama-3-8B-instruct, Saiga, Mistral-варианты."],
      ["Документы, ЭП и безопасность", "Camunda BPMN 2.0, React, Vue 3, python-docx, reportlab, WeasyPrint, PyPDF2, КриптоПро CSP, VipNet, ГОСТ, RBAC, аудит."],
    ],
  },
];

const COOKIE_STORAGE_KEY = "techcentr-cookie-consent";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [activeTech, setActiveTech] = useState("vision");
  const [path, setPath] = useState(() => window.location.pathname);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const activeTechItem = useMemo(() => techTabs.find((tab) => tab.id === activeTech) ?? techTabs[0], [activeTech]);

  const reveal: any = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: shouldReduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  };

  const page = path === "/solutions" ? "solutions" : path === "/technologies" ? "technologies" : "home";

  const navigate = (href: string) => {
    const [nextPath, hash] = href.split("#");
    const targetPath = nextPath || "/";
    window.history.pushState({}, "", href);
    setPath(targetPath);
    setMenuOpen(false);
    window.setTimeout(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <>
      <Header compact={compact} menuOpen={menuOpen} navigate={navigate} setMenuOpen={setMenuOpen} />
      <main id="top">
        {page === "home" && (
          <>
            <Hero reveal={reveal} />
            <IndustriesSection reveal={reveal} />
            <ProjectsSection reveal={reveal} />
            <VacanciesSection reveal={reveal} />
            <ContactsSection reveal={reveal} />
            <PartnersSection reveal={reveal} compact />
          </>
        )}
        {page === "solutions" && (
          <>
            <PageHero eyebrow="Направления внедрения" title="Решения" text="Проекты видеоаналитики для шахт, производственных предприятий, электроустановок и медицинских учреждений." />
            <SolutionsSection reveal={reveal} />
          </>
        )}
        {page === "technologies" && (
          <>
            <PageHero eyebrow="Инженерная база" title="Технологии" text="Компьютерное зрение, обработка видеопотоков, интеграция данных и надежное развертывание в закрытом контуре." />
            <TechnologiesSection reveal={reveal} activeTech={activeTech} activeTechItem={activeTechItem} setActiveTech={setActiveTech} />
          </>
        )}
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© 2026 ООО «Техноцентр»</span>
          <a href="#top">Наверх</a>
        </div>
      </footer>
      <CookieBanner />
    </>
  );
}

function Header({
  compact,
  menuOpen,
  navigate,
  setMenuOpen,
}: {
  compact: boolean;
  menuOpen: boolean;
  navigate: (href: string) => void;
  setMenuOpen: (value: boolean | ((value: boolean) => boolean)) => void;
}) {
  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="Техноцентр" onClick={(event) => { event.preventDefault(); navigate("/"); }}>
          <img src="/assets/Техноцентр_лого.png" alt="ООО «Техноцентр»" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} id="main-nav" aria-label="Основная навигация">
          {nav.map(([href, label]) => (
            <a key={href} href={href} onClick={(event) => { event.preventDefault(); navigate(href); }}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero({ reveal }: { reveal: any }) {
  return (
    <section className="hero" id="about">
      <div className="hero-media" aria-hidden="true">
        <div className="camera-feed feed-one">
          <span className="scan-line" />
          <span className="target target-a" />
          <span className="target target-b" />
          <span className="feed-label">AI video analytics</span>
        </div>
        <div className="camera-feed feed-two">
          <span className="heatmap-dot dot-one" />
          <span className="heatmap-dot dot-two" />
          <span className="heatmap-dot dot-three" />
        </div>
      </div>
      <div className="container hero-grid">
        <motion.div className="hero-copy" {...reveal}>
          <p className="eyebrow">ООО «Техноцентр»</p>
          <h1>Компьютерное зрение и видеоаналитика</h1>
          <p className="hero-lead">Разрабатываем передовые решения для промышленных предприятий и государственных структур.</p>
        </motion.div>
        <motion.article className="hero-panel" {...reveal} transition={{ duration: 0.65, delay: 0.12 }}>
          <p>Мы ориентируемся на нужды промышленных предприятий и государственных структур.</p>
          <p>
            Наша инновационная система видеоаналитики, основанная на использовании камер с искусственным интеллектом,
            обеспечивает непрерывный мониторинг окружающей среды. Она поставляет актуальные данные в режиме реального
            времени, что способствует существенному повышению уровня безопасности, оптимизации производственных
            процессов и принятию обоснованных управленческих решений в разнообразных отраслях.
          </p>
        </motion.article>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

function IndustriesSection({ reveal }: { reveal: any }) {
  return (
    <section className="section industries">
      <div className="container">
        <SectionHeading eyebrow="Где применяются разработки" title="Отрасли" />
        <div className="industry-grid">
          {industries.map(([id, title, text]) => (
            <motion.article key={id} {...reveal}>
              <span>{id}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ reveal }: { reveal: any }) {
  return (
    <section className="section projects-strip" id="projects">
      <div className="container projects-grid">
        <motion.div {...reveal}>
          <p className="eyebrow">Реализованный опыт</p>
          <h2>Нашей компанией при поддержке бизнес-партнеров были успешно реализованы проекты в промышленности, медицине и инфраструктурном контроле.</h2>
        </motion.div>
        <motion.div className="photo-slot large-slot" {...reveal}>
          <div>
            <span>Видеоаналитика</span>
            <p>Камеры, диспетчерский центр и события, которые система передает оператору в режиме реального времени.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VacanciesSection({ reveal }: { reveal: any }) {
  return (
    <section className="section vacancies" id="vacancies">
      <div className="container">
        <SectionHeading eyebrow="Работа" title="Наши вакансии" centered />
        <div className="vacancy-frame">
          <div className="vacancy-grid">
            {vacancies.map((vacancy) => (
              <motion.article className="vacancy-card" key={vacancy.title} {...reveal}>
                <img src={vacancy.image} alt="" />
                <h3>{vacancy.title}</h3>
                <p>{vacancy.description}</p>
                <a href="mailto:info@tehcntr.ru?subject=Отклик на вакансию">Откликнуться...</a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection({ reveal, compact = false }: { reveal: any; compact?: boolean }) {
  return (
    <section className={`section partners ${compact ? "partners-compact" : ""}`} id="partners">
      <div className="container">
        <div className="partners-hero">
          <SectionHeading eyebrow="Экосистема внедрения" title="Наши партнеры" />
          <p>
            Объединяем опыт медицинских центров, научных организаций, промышленных компаний, производителей
            оборудования и технологических платформ.
          </p>
        </div>
        <div className="partner-orbit" aria-hidden="true">
          {["медицина", "наука", "промышленность", "госсектор", "инфраструктура"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="partner-groups">
          {partnerGroups.map((group) => (
            <motion.article
              key={group.id}
              className={`partner-group ${group.featured ? "featured" : ""} ${group.wide ? "wide" : ""}`}
              {...reveal}
            >
              <div className="group-title">
                <span>{group.id}</span>
                <h3>{group.title}</h3>
              </div>
              <div className={`partner-logos ${group.wide ? "compact" : ""}`}>
                {group.partners.map((partner) => (
                  <PartnerLogo key={partner.name} partner={partner} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionsSection({ reveal }: { reveal: any }) {
  return (
    <section className="section solutions" id="solutions">
      <div className="container">
        <SectionHeading eyebrow="Направления внедрения" title="Решения" centered />
        <div className="solution-list">
          {solutions.map((solution) => (
            <motion.article className="solution-card" key={solution.id} {...reveal}>
              <div className={`solution-visual ${solution.visual}`}>
                <span>{solution.id}</span>
              </div>
              <div className="solution-content">
                <h3>{solution.title}</h3>
                <div className="columns">
                  <ListBlock title="Задачи заказчика" items={solution.tasks} />
                  <ListBlock title="Условия реализации" items={solution.conditions} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologiesSection({
  reveal,
  activeTech,
  activeTechItem,
  setActiveTech,
}: {
  reveal: any;
  activeTech: string;
  activeTechItem: typeof techTabs[number];
  setActiveTech: (id: string) => void;
}) {
  return (
    <section className="section technologies" id="technologies">
      <div className="container">
        <SectionHeading eyebrow="Инженерная база" title="Технологии" />
        <div className="tech-map" aria-label="Карта технологического стека">
          {[
            ["01", "Видеопотоки", "Захват, декодирование, стабилизация и подготовка изображения в реальном времени."],
            ["02", "AI-модели", "Детекция, трекинг, распознавание действий и контроль последовательности операций."],
            ["03", "Интеграции", "Телеметрия, АСУ ТП, API, ETL, геоданные и документы в едином контуре."],
            ["04", "Эксплуатация", "On-premise, edge, закрытый контур, мониторинг, отказоустойчивость и импортозамещение."],
          ].map(([id, title, text]) => (
            <motion.article key={id} {...reveal}>
              <span>{id}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
        <div className="tech-showcase">
          <div className="tech-diagram" aria-label="Связь технологических направлений">
            <div className="diagram-screen">
              <span className="route-number">{activeTechItem.number}</span>
              <h3>{activeTechItem.title}</h3>
              <div className="route-flow">
                {activeTechItem.flow.map((step) => (
                  <span key={step}>{step}</span>
                ))}
              </div>
              <p>
                {activeTech === "vision"
                  ? "Поток с камер проходит обработку на edge-узлах и превращается в события безопасности."
                  : "Данные из систем заказчика собираются в контур аналитики, отчетности и автоматизации."}
              </p>
            </div>
          </div>
          <div className="tech-accordion" role="tablist" aria-label="Технологические направления">
            {techTabs.map((tab) => (
              <article className={`tech-detail ${activeTech === tab.id ? "is-open" : ""}`} key={tab.id}>
                <button type="button" className="tech-summary" onClick={() => setActiveTech(tab.id)} aria-expanded={activeTech === tab.id}>
                  <span>{tab.number}</span>
                  <strong>{tab.title}</strong>
                </button>
                {activeTech === tab.id && (
                  <motion.div className="tech-groups" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                    {tab.groups.map(([title, text]) => (
                      <section key={title}>
                        <h4>{title}</h4>
                        <p>{text}</p>
                      </section>
                    ))}
                  </motion.div>
                )}
              </article>
            ))}
            <article className="tech-detail accent-block" id="security">
              <h3>Все технологии разрабатываются с учетом требований импортозамещения, работы в закрытом контуре и высокой отказоустойчивости.</h3>
              <div className="tech-tags" aria-label="Ключевые требования">
                {["Astra Linux", "РЕД ОС", "Postgres Pro", "Эльбрус", "Байкал", "Yandex Cloud", "VK Cloud", "Alt Linux", "ФСТЭК/ФСБ"].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactsSection({ reveal }: { reveal: any }) {
  return (
    <section className="section contacts" id="contacts">
      <div className="container contact-layout">
        <motion.div className="contact-copy" {...reveal}>
          <p className="eyebrow">Как с нами связаться</p>
          <h2>Контакты</h2>
          <p>
            Если нужно обсудить проект, условия съемки, интеграции или пилотное внедрение, свяжитесь с нами по телефону
            или электронной почте.
          </p>
        </motion.div>
        <motion.address className="contact-board" {...reveal}>
          <div className="contact-address-card">
            <span>Адрес</span>
            <p>
              Московская обл.<br />
              Солнечногорский р-н<br />
              п. Менделеево<br />
              Льяловское ш., д. 1а
            </p>
          </div>
          <a className="contact-mini" href="tel:+74957778487">
            <span>Телефон</span>
            <strong>+7 (495) 777-84-87</strong>
          </a>
          <a className="contact-mini" href="mailto:info@tehcntr.ru">
            <span>E-mail</span>
            <strong>info@tehcntr.ru</strong>
          </a>
          <div className="contact-mini">
            <span>Почтовый индекс</span>
            <strong>141570</strong>
          </div>
        </motion.address>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, centered = false }: { eyebrow: string; title: string; centered?: boolean }) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const content = partner.logo ? (
    <>
      <img src={partner.logo} alt="" />
      <span>{partner.name}</span>
    </>
  ) : (
    partner.name
  );
  const className = `partner-logo ${partner.logo ? "image-logo has-caption" : "text-logo"} ${partner.className ?? ""}`;

  if (!partner.href) {
    return <span className={className}>{content}</span>;
  }

  return (
    <a className={className} href={partner.href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(COOKIE_STORAGE_KEY));
  }, []);

  const saveConsent = (value: "necessary" | "all") => {
    localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        value,
        createdAt: new Date().toISOString(),
      }),
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.aside
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookie"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32 }}
    >
      <div>
        <strong>Сайт использует cookie</strong>
        <p>
          Мы используем необходимые cookie для работы сайта. Аналитические cookie могут применяться только после вашего
          согласия, чтобы улучшать структуру и удобство страниц.
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="cookie-primary" onClick={() => saveConsent("all")}>
          Принять
        </button>
        <button type="button" onClick={() => saveConsent("necessary")}>
          Только необходимые
        </button>
      </div>
    </motion.aside>
  );
}

export default App;
