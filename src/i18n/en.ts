/**
 * All English copy for the site. `bn.ts` mirrors this shape exactly
 * (TypeScript will complain if a key is missing).
 * Placeholders in {curly braces} are filled in at render time.
 */
export const en = {
  common: {
    skipToContent: "Skip to content",
    menu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "বাংলা",
    switchLanguageLabel: "Switch to Bangla",
    toggleTheme: "Toggle dark mode",
    backHome: "Back to home",
  },
  nav: {
    features: "Features",
    pricing: "Pricing",
    faq: "FAQ",
    download: "Download",
  },
  download: {
    forWindows: "Download for Windows",
    forMac: "Download for macOS",
    macSoon: "macOS — coming soon",
    version: "Version {version}",
    released: "Released {date}",
    size: "{size}",
    reqWindows: "Windows 10/11 (64-bit)",
    reqMac: "macOS 12+ (Apple Silicon & Intel)",
    trial: "Free {days}-day trial — no payment details needed",
    notifyLabel: "Email me when the Mac version is ready",
    notifyPlaceholder: "you@clinic.com",
    notifyButton: "Notify me",
    notifySending: "Sending…",
    notifySuccess: "Thanks! We'll email you when MediDesk for macOS is ready.",
    notifyMailto: "Your email app should open — just press send.",
    notifyError: "Something went wrong. Please email us instead.",
    notifyInvalid: "Please enter a valid email address.",
    mobileNote:
      "MediDesk is a desktop app. Open this page on your Windows PC or Mac to install it.",
    allOptions: "All download options",
  },
  hero: {
    eyebrow: "Practice management for doctors in Bangladesh",
    titleA: "Run your chamber,",
    titleB: "not paperwork.",
    subtitle:
      "Patients, appointments, prescriptions and billing in one calm desktop app — built for doctors and small clinics, in English and Bangla.",
    mockupLabel:
      "Illustration of the MediDesk dashboard showing today's patient queue, stat cards and a revenue chart.",
  },
  mock: {
    appTitle: "MediDesk — Dashboard",
    nav: ["Dashboard", "Patients", "Appointments", "Prescriptions", "Billing", "Reports"],
    greeting: "Good morning, Dr. Rahman",
    date: "Saturday, 10 October",
    newPatient: "New patient",
    stats: [
      { label: "Patients today", value: "24" },
      { label: "In queue", value: "6" },
      { label: "Collected", value: "৳18,400" },
    ],
    queueTitle: "Today's queue",
    queue: [
      { name: "Rahima Begum", time: "10:30", status: "consult" },
      { name: "Md. Karim Uddin", time: "10:45", status: "waiting" },
      { name: "Nusrat Jahan", time: "11:00", status: "waiting" },
      { name: "Abdul Hakim", time: "09:50", status: "done" },
    ],
    status: { waiting: "Waiting", consult: "In consultation", done: "Completed" },
    chartTitle: "Revenue · last 7 days",
    days: ["S", "M", "T", "W", "T", "F", "S"],
    floatRx: "Prescription printed",
    floatRxSub: "Rahima Begum · Bangla",
    floatPay: "Payment received",
    floatPaySub: "৳600 · bKash",
  },
  trust: [
    "Your data is encrypted and isolated per clinic",
    "Works in English & বাংলা",
    "Prints prescriptions on your letterhead",
    "Windows & macOS",
  ],
  features: {
    eyebrow: "Features",
    title: "Everything your chamber runs on",
    subtitle:
      "From the first patient of the morning to the last receipt at night — one app, no paper registers, no spreadsheets.",
    items: [
      {
        title: "Patients",
        body: "Full visit history, allergies and chronic conditions on one screen. Find anyone in seconds by name, phone or ID.",
      },
      {
        title: "Appointments",
        body: "A live daily queue with Waiting, In consultation and Completed — and assign each patient to the right doctor.",
      },
      {
        title: "Consultations",
        body: "Record vitals — BP, pulse, SpO₂, temperature, weight and BMI — along with complaints and examination findings.",
      },
      {
        title: "Prescriptions",
        body: "Medicine database, morning/afternoon/evening/night dosage picker, duration and quantity in tab, ml or g. Diagnoses, investigations and advice templates — then print in English or Bangla with one click.",
      },
      {
        title: "Billing",
        body: "Invoices, partial payments and receipts. Accept cash, card, bKash, Nagad or bank transfer.",
      },
      {
        title: "Reports",
        body: "See revenue over time, the split across payment methods and how each doctor is performing.",
      },
      {
        title: "Fully in Bangla",
        body: "Use the whole app — and print every prescription and receipt — in Bangla, with Bangla digits.",
      },
      {
        title: "Multi-user",
        body: "Separate roles for owner, doctor and receptionist, so everyone sees exactly what they need.",
      },
    ],
  },
  rx: {
    eyebrow: "Prescriptions",
    title: "A prescription in 30 seconds",
    subtitle:
      "Clean, legible prescriptions on your own letterhead — no more handwriting the same medicines forty times a day.",
    steps: [
      {
        title: "Pick the patient from the queue",
        body: "Vitals, history and allergies are already on screen when they walk in.",
      },
      {
        title: "Add medicines and advice",
        body: "Search the medicine database, tap the dosage pattern and duration, and reuse your advice templates.",
      },
      {
        title: "Print in English or Bangla",
        body: "One click prints a tidy prescription on your pad or letterhead.",
      },
    ],
    paper: {
      label: "Sample prescription printed from MediDesk",
      doctor: "Dr. Farhana Rahman",
      degrees: "MBBS, FCPS (Medicine)",
      specialty: "Medicine Specialist",
      chamber: "Green Life Chamber, Dhanmondi, Dhaka",
      hours: "Sat–Thu · 5 pm – 9 pm",
      patientLabel: "Name",
      patient: "Rahima Begum",
      ageLabel: "Age",
      age: "42 y",
      sexLabel: "Sex",
      sex: "F",
      dateLabel: "Date",
      date: "10/10/2026",
      ccTitle: "C/C",
      cc: ["Fever for 3 days", "Headache", "Body ache"],
      oeTitle: "O/E",
      oe: ["BP 130/85 mmHg", "Pulse 88/min", "Temp 101°F", "SpO₂ 98%"],
      dxTitle: "Dx",
      dx: ["Viral fever"],
      invTitle: "Inv",
      inv: ["CBC", "Dengue NS1"],
      meds: [
        { name: "Tab. Paracetamol 500 mg", dose: "1 + 1 + 1", note: "After meal · 5 days" },
        { name: "Tab. Fexofenadine 120 mg", dose: "0 + 0 + 1", note: "After meal · 7 days" },
        { name: "Cap. Omeprazole 20 mg", dose: "1 + 0 + 1", note: "Before meal · 7 days" },
        { name: "ORS sachet", dose: "As needed", note: "1 sachet in 500 ml water" },
      ],
      adviceTitle: "Advice",
      advice: ["Drink plenty of fluids", "Take complete rest", "Return if fever persists beyond 3 days"],
      followUp: "Follow-up after 7 days",
      signature: "Signature",
    },
  },
  security: {
    eyebrow: "Security & privacy",
    title: "Medical data, treated as sensitive",
    subtitle:
      "Patient records are some of the most personal data there is. MediDesk is designed around that from the start.",
    items: [
      {
        title: "Cloud sync, isolated per clinic",
        body: "Your records sync securely to the cloud and are kept separate from every other clinic's data.",
      },
      {
        title: "Encrypted in transit and at rest",
        body: "Data is encrypted on its way to our servers and while it is stored.",
      },
      {
        title: "Role-based access",
        body: "Receptionists, doctors and owners each see only what their role needs.",
      },
      {
        title: "Secure sign-in",
        body: "Every user has their own account, so you always know who did what.",
      },
    ],
    note: "We never sell or share patient data. Read our privacy policy for the details.",
    privacyLink: "Privacy policy",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "One simple plan",
    subtitle: "Everything included. Try it free for {days} days — no payment details needed.",
    monthly: "Monthly",
    yearly: "Yearly",
    billingLabel: "Billing period",
    perMonth: "/month",
    perYear: "/year",
    save: "Save {amount}",
    planName: "Basic",
    planDesc: "For a doctor running their own chamber.",
    includesTitle: "What's included",
    includes: [
      "1 doctor",
      "1 device",
      "Unlimited patients",
      "All features",
      "Bangla printouts",
    ],
    trialNote: "{days}-day free trial, then pay by bKash or Nagad.",
    moreNeeded: "Need more doctors or devices? Contact us.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered",
    subtitle: "Can't find what you're looking for? Get in touch — a real person will reply.",
    macAvailable: "It also runs on macOS 12 or later, on both Apple Silicon and Intel Macs.",
    macSoon: "A macOS version (macOS 12 or later, Apple Silicon and Intel) is coming soon.",
    items: [
      {
        q: "Is there a free trial?",
        a: "Yes. Every new account gets a free 7-day trial with all features. You don't need to enter any payment details to start.",
      },
      {
        q: "Does it work offline?",
        a: "Not yet. MediDesk currently needs an internet connection to sync your data. Offline mode is coming soon.",
      },
      {
        q: "Which payment methods can I use?",
        a: "You can pay for your subscription with bKash or Nagad. Inside the app, you can record patient payments made by cash, card, bKash, Nagad or bank transfer.",
      },
      {
        q: "Can I print on my own pad or letterhead?",
        a: "Yes. You can print on plain paper with your own header, or set the margins so prescriptions line up with your existing pre-printed pad.",
      },
      {
        q: "Is my patient data safe?",
        a: "Your data is encrypted in transit and at rest, and kept isolated from every other clinic. Only the people you add to your clinic can access it, and each person only sees what their role allows.",
      },
      {
        q: "Does it run on Mac or Windows?",
        a: "MediDesk runs on Windows 10 and 11 (64-bit). {macStatus}",
      },
      {
        q: "Can I use it in Bangla?",
        a: "Yes. You can switch the whole app — and your printed prescriptions and receipts — to Bangla, including Bangla digits.",
      },
      {
        q: "How do I get support?",
        a: "Email us at {email} or message us on WhatsApp at {whatsapp}. We usually reply within one working day.",
      },
    ],
  },
  cta: {
    title: "Give your chamber a calmer day.",
    subtitle: "Download MediDesk and try every feature free for {days} days.",
  },
  footer: {
    description:
      "Desktop practice-management for doctors and small clinics in Bangladesh.",
    product: "Product",
    legal: "Legal",
    contact: "Contact",
    links: {
      download: "Download",
      pricing: "Pricing",
      faq: "FAQ",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact us",
    },
    email: "Email",
    whatsapp: "WhatsApp",
    rights: "© {year} {company}. All rights reserved.",
    madeFor: "Made for doctors in Bangladesh.",
  },
  downloadPage: {
    title: "Download MediDesk",
    subtitle: "Install MediDesk on your computer and start your free {days}-day trial.",
    latest: "Latest version {version} · released {date}",
    releaseNotes: "Release notes",
    file: "File",
    checksum: "SHA-256",
    copy: "Copy checksum",
    copied: "Copied",
    verifyTitle: "Verify your download (optional)",
    verifyBody:
      "You can compare the file's SHA-256 checksum with the value above to make sure it hasn't been altered.",
    verifyWindows: "Windows (PowerShell):",
    verifyMac: "macOS (Terminal):",
    requirements: "Requirements",
    winReqs: ["Windows 10 or 11, 64-bit", "4 GB RAM (8 GB recommended)", "500 MB free disk space", "Internet connection"],
    macReqs: ["macOS 12 Monterey or later", "Apple Silicon (M1 or newer) or Intel", "500 MB free disk space", "Internet connection"],
    installTitle: "How to install",
    winSteps: [
      "Download the installer and open it from your Downloads folder.",
      "If Windows shows “Windows protected your PC”, click More info, then Run anyway.",
      "Follow the installer. MediDesk opens when it's done.",
      "Create your clinic account to start the free trial.",
    ],
    winNote:
      "Windows SmartScreen warns about apps it hasn't seen many times before. That's expected for a new release — the installer is safe to run.",
    macSteps: [
      "Download the .dmg file and open it.",
      "Drag MediDesk into your Applications folder.",
      "The first time, right-click (or Control-click) MediDesk in Applications and choose Open.",
      "Click Open again in the dialog, then create your clinic account.",
    ],
    macNote:
      "If macOS says the app “can't be opened”, go to System Settings → Privacy & Security and click Open Anyway.",
    help: "Stuck? Email {email} or WhatsApp {whatsapp} and we'll help you get set up.",
  },
  legal: {
    placeholderTitle: "Placeholder text — replace before launch",
    placeholderBody:
      "This page is a template. Have it reviewed and replaced with your real policy (ideally by a lawyer) before publishing the site.",
    lastUpdated: "Last updated: {date}",
    privacy: {
      title: "Privacy Policy",
      intro:
        "[REPLACE THIS TEXT] This policy explains what information MediDesk collects, why we collect it and how we protect it.",
      sections: [
        {
          h: "Information we collect",
          p: "[REPLACE THIS TEXT] Describe the account details (name, email, phone, clinic name) and the clinical data your users store in the app.",
        },
        {
          h: "How we use information",
          p: "[REPLACE THIS TEXT] Explain that data is used only to provide the service, sync between devices, process payments and provide support.",
        },
        {
          h: "How we protect patient data",
          p: "[REPLACE THIS TEXT] Describe encryption, per-clinic isolation, role-based access and where data is hosted.",
        },
        {
          h: "Sharing and disclosure",
          p: "[REPLACE THIS TEXT] State that you never sell patient data, and list any service providers (hosting, payments) that process data on your behalf.",
        },
        {
          h: "Data retention and deletion",
          p: "[REPLACE THIS TEXT] Explain how long data is kept and how a clinic can export or delete its data.",
        },
        {
          h: "Contact",
          p: "[REPLACE THIS TEXT] Questions about privacy? Email {email}.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      intro:
        "[REPLACE THIS TEXT] These terms govern your use of the MediDesk desktop application and related services.",
      sections: [
        {
          h: "Your account",
          p: "[REPLACE THIS TEXT] Describe who may create an account and the account holder's responsibilities.",
        },
        {
          h: "Free trial and subscription",
          p: "[REPLACE THIS TEXT] Describe the free trial, billing periods, payment by bKash/Nagad, renewals and refunds.",
        },
        {
          h: "Acceptable use",
          p: "[REPLACE THIS TEXT] List what users may not do with the software.",
        },
        {
          h: "Clinical responsibility",
          p: "[REPLACE THIS TEXT] Clarify that MediDesk is a record-keeping tool and clinical decisions remain the responsibility of the practitioner.",
        },
        {
          h: "Limitation of liability",
          p: "[REPLACE THIS TEXT] Add your limitation of liability and governing law (e.g. the laws of Bangladesh).",
        },
        {
          h: "Contact",
          p: "[REPLACE THIS TEXT] Questions about these terms? Email {email}.",
        },
      ],
    },
  },
  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof en>;
