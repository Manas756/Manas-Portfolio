/**
 * Project content. Facts come from Manas's résumé, his public GitHub repositories
 * and the live sites. Anything unknown is left as `null` and rendered as a
 * clearly marked placeholder — fill these in rather than guessing.
 */
import chaitanyaHero from '../assets/projects/chaitanya.webp'
import chaitanyaEvents from '../assets/projects/chaitanya-2.webp'
import edgecaseShot from '../assets/projects/edgecase.webp'
import shatranjShot from '../assets/projects/shatranjx.webp'
import campusShot from '../assets/projects/campus.webp'

export const projects = [
  {
    id: 'chaitanya',
    index: '01',
    name: 'Chaitanya 2K26',
    title: 'The Digital Experience of a College Tech Fest',
    bgWord: 'CHAITANYA',
    category: 'Official festival website',
    year: '2026',
    status: 'Live',
    statusDetail: 'Fest held 30 Oct – 1 Nov 2026',
    role: 'Technical Team Lead · Website Developer',
    short:
      "The official website of Chaitanya 2K26, HPTU Hamirpur's technical and cultural festival. It's where every participant came to find events, form a team and register.",
    problem:
      'A three-day fest with 21 events and 2 workshops needed a single place where students from colleges across Himachal could discover events and sign up. It also had to stay fast when everyone showed up at once.',
    contribution: [
      'Built and shipped the official site as the fest’s website developer',
      'Led the technical team as Technical Team Lead',
      'Handled deployment, hosting and frontend-to-backend integrations',
      'Kept the experience smooth under real festival traffic and load',
    ],
    facts: [
      { value: '21', label: 'Events' },
      { value: '2', label: 'Workshops' },
      { value: '3', label: 'Days' },
    ],
    // Detected from the production bundle header — confirm before publishing.
    stack: ['Nuxt 3', 'Vue 3', 'Three.js', 'GSAP'],
    links: { github: null, live: 'https://www.chaitanyahptu.dev/' },
    shots: { primary: chaitanyaHero, secondary: chaitanyaEvents },
    url: 'chaitanyahptu.dev',
    theme: {
      nav: 'light',
      bg: '#e3e2ea',
      fg: '#0b0b0d',
      muted: 'rgba(11,11,13,0.6)',
      line: 'rgba(11,11,13,0.14)',
      accent: '#d24fa0',
      wordColor: 'rgba(11,11,13,0.06)',
    },
    mockup: 'chaitanya',
  },
  {
    id: 'edgecase',
    index: '02',
    name: 'EdgeCase',
    title: 'Competitive Programming Platform',
    bgWord: '<EDGE/>',
    category: 'ICPC-inspired contest platform',
    year: '2026',
    status: 'In development',
    statusDetail: 'Open source · demo deployed on Vercel',
    role: 'Developer',
    short:
      'An ICPC-inspired contest platform. Participants join with a code, solve problems in a browser editor against their own timer, and climb a live leaderboard.',
    problem:
      'A fair contest has to isolate untrusted code, apply timers and penalties the same way for everyone, and keep the leaderboard live while submissions pour in.',
    contribution: [
      'Contest engine with ICPC cumulative and time-based penalty scoring',
      'Pluggable judge adapter: participant code never runs in the web process, Judge0 sandboxes it',
      'Every rule enforced server-side with HMAC-signed sessions; hidden tests never reach participants',
      'Organizer console for problems, tests, sessions, code review and CSV export',
    ],
    facts: [
      { value: '5', label: 'Languages' },
      { value: '~10k', label: 'Concurrent users (design goal)' },
      { value: 'ICPC', label: 'Penalty model' },
    ],
    note: 'The ~10,000 concurrent local users figure is an architecture goal, not a benchmarked result.',
    stack: ['Next.js 15', 'TypeScript', 'React 19', 'CodeMirror', 'Judge0'],
    links: {
      github: 'https://github.com/Manas756/Edge-Case-Competitive-Programming-website',
      live: 'https://edge-case-competitive-programming-w-sage.vercel.app/',
    },
    shots: { primary: edgecaseShot },
    url: 'edge-case.vercel.app',
    theme: {
      nav: 'dark',
      bg: '#0a0a0a',
      fg: '#f2f1ed',
      muted: 'rgba(242,241,237,0.58)',
      line: 'rgba(242,241,237,0.12)',
      accent: '#f2f1ed',
      wordColor: 'rgba(242,241,237,0.045)',
    },
    mockup: 'edgecase',
  },
  {
    id: 'rog',
    index: '03',
    name: 'ROG',
    title: 'A Desktop AI Assistant',
    bgWord: 'ROG',
    category: 'Voice-first desktop AI assistant',
    year: '2026',
    status: 'Open source',
    statusDetail: 'Windows · Electron',
    role: 'Designer & developer',
    short:
      'A small golden orb that floats at the top of your Windows desktop, listens for “ROG”, and does what you ask: opens apps, sites and projects, searches, and runs workflows you teach it.',
    problem:
      "Most assistants stop at the edge of a chat window. ROG works on the computer itself, and because it can launch things it has to be safe by design: what you say should never become an arbitrary shell command.",
    contribution: [
      'Offline speech: OpenAI Whisper runs locally on the GPU, so no audio leaves the PC',
      'Speech and AI output map to a typed catalog of actions; nothing ever reaches a shell',
      'Fuzzy intent matching, with “Did you mean…?” confirmation and a re-listen fallback',
      'User-taught multi-step commands, multilingual support, and 100 unit/integration tests',
    ],
    facts: [
      { value: '~0.3s', label: 'Local transcription' },
      { value: '100', label: 'Tests' },
      { value: '0', label: 'Shell access' },
    ],
    stack: ['Electron', 'TypeScript', 'Whisper (local)', 'Transformers.js', 'Zod', 'Vitest'],
    links: { github: 'https://github.com/Manas756/Rog-The-Ai-Assistant', live: null },
    theme: {
      nav: 'dark',
      bg: '#0a0907',
      fg: '#f1ede4',
      muted: 'rgba(241,237,228,0.56)',
      line: 'rgba(241,237,228,0.1)',
      accent: '#e2b04a',
      wordColor: 'rgba(226,176,74,0.05)',
    },
    mockup: 'rog',
  },
  {
    id: 'shatranjx',
    index: '04',
    name: 'ShatranjX',
    title: 'A Local Chess Experience',
    bgWord: 'SHATRANJ',
    category: 'Real-time web chess',
    year: '2026',
    status: 'Live',
    statusDetail: 'Deployed on Render',
    role: 'Full stack developer',
    short:
      'Chess in the browser. Play a friend in a private room or across the board, get matched online, or take on Stockfish.',
    problem:
      'Multiplayer chess only works if both players trust the board. The server has to be the referee, validating every move and keeping every clock honest.',
    contribution: [
      'Server-authoritative game logic validated with Chess.js',
      'Real-time play over Socket.io with matchmaking and private rooms',
      'Stockfish AI opponents running in a Web Worker',
      'Layered architecture: game, room and socket layers kept separate',
    ],
    facts: [
      { value: 'Live', label: 'Multiplayer' },
      { value: 'AI', label: 'Stockfish' },
    ],
    stack: ['Node.js', 'Express', 'Socket.io', 'Chess.js', 'Stockfish'],
    links: {
      github: 'https://github.com/Manas756/ShatranjX.com-Master-The-Game',
      live: 'https://shatranjx-com-master-the-game.onrender.com/',
    },
    shots: { primary: shatranjShot },
    url: 'shatranjx.onrender.com',
    theme: {
      nav: 'light',
      bg: '#efeee9',
      fg: '#0c0c0c',
      muted: 'rgba(12,12,12,0.58)',
      line: 'rgba(12,12,12,0.13)',
      accent: '#b8901f',
      wordColor: 'rgba(12,12,12,0.05)',
    },
    mockup: 'shatranjx',
  },
  {
    id: 'campuspulse',
    index: '05',
    name: 'CampusPulse',
    title: 'AI-Powered Campus Complaint Management',
    bgWord: 'PULSE',
    category: 'AI · Hackathon build',
    year: '2026',
    status: 'Live',
    statusDetail: 'Hackathon project · deployed on Vercel',
    role: 'Hackathon team',
    short:
      'Students report a campus issue in about two minutes, anonymously and with a photo. AI scores the risk, and the complaint escalates on its own if nobody acts.',
    problem:
      'Campus complaints get lost in group chats and paper registers. Nobody knows who owns an issue, urgent hazards wait in the same queue as routine requests, and students hesitate to put their name on a complaint.',
    contribution: [
      'Anonymous complaint submission with photos; staff only ever see a ticket number',
      'AI analysis of the complaint and image scores every report 0–100, so hazards rise to the top',
      'Three-tier, 72-hour escalation chain: Teacher → Faculty → Administration',
      'Complaint tracking by unique ID, plus Admin and Super Admin dashboards',
    ],
    facts: [
      { value: '0–100', label: 'AI risk score' },
      { value: '72h', label: 'Per tier' },
      { value: '3', label: 'Escalation tiers' },
    ],
    note: 'Built during a hackathon. A working prototype, not a university-wide deployment.',
    stack: ['Next.js'], // TODO: add the rest of CampusPulse's stack (database, AI model)
    links: { github: null, live: 'https://campus-speed-run.vercel.app/' },
    shots: { primary: campusShot },
    url: 'campus-speed-run.vercel.app',
    theme: {
      nav: 'dark',
      bg: '#0d0a16',
      fg: '#efeaf8',
      muted: 'rgba(239,234,248,0.56)',
      line: 'rgba(239,234,248,0.1)',
      accent: '#a78bfa',
      wordColor: 'rgba(167,139,250,0.05)',
    },
    mockup: 'campuspulse',
  },
]

/** Smaller builds and explorations, shown after the main showcase. */
export const labItems = [
  {
    title: 'Video-editor internals',
    kind: 'Research',
    text: 'Studied how consumer video editors structure timelines, effects pipelines and project files, to understand how large desktop software is put together.',
    link: null,
  },
  {
    title: 'Be Creative',
    kind: 'In progress',
    text: 'An animated, interactive 3D frontend experience built with React Three Fiber.',
    link: null,
  },
  {
    title: 'Amazon UI Replica',
    kind: 'Frontend',
    text: 'A responsive recreation of key e-commerce interface patterns in HTML and CSS.',
    link: 'https://github.com/Manas756/Amazon-Replica',
  },
  {
    title: 'DSA Journal',
    kind: 'C++',
    text: 'My data structures and algorithms practice and LeetCode solutions, kept in the open.',
    link: 'https://github.com/Manas756/DSA',
  },
]
