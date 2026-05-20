const canvas = document.querySelector("#space-field");
const ctx = canvas.getContext("2d");
const boarding = document.querySelector("#boarding");
const boot = document.querySelector("#boot");
const siteShell = document.querySelector("#site-shell");
const enterButton = document.querySelector("#enter-button");
const previewButton = document.querySelector("#preview-button");
const bootLines = document.querySelector("#boot-lines");
const langButtons = document.querySelectorAll("[data-lang]");
const translatable = document.querySelectorAll("[data-i18n]");
const cockpit = document.querySelector(".cockpit");
const moduleButtons = document.querySelectorAll("[data-module]");
const capabilityCards = document.querySelectorAll(".capability-grid [data-module]");
const architectureMap = document.querySelector(".architecture-map");
const moduleStatus = document.querySelector("#module-status");
const moduleTitle = document.querySelector("#module-title");
const moduleCopy = document.querySelector("#module-copy");
const coreLabel = document.querySelector("#core-label");
const deckSections = document.querySelectorAll(".deck-section");
const trackedSections = document.querySelectorAll("#command-deck, .deck-section");
const deckNavLinks = document.querySelectorAll('.deck-nav a[href^="#"]');
const cursorCore = document.querySelector("#cursor-core");
const cursorRing = document.querySelector("#cursor-ring");
const companion = document.querySelector("#deck-companion");
const companionLine = document.querySelector("#companion-line");
const interactiveElements = document.querySelectorAll("a, button, .scan-grid article, .capability-grid article, .hangar-card, .arch-node, .scenario-list span");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const copy = {
  zh: {
    boarding: {
      kicker: "ENTERPRISE AI TRANSFORMATION ACCESS",
      title: "CLAWSO LABS COMMAND SYSTEM",
      detected: "检测到企业 AI 化请求",
      question: "是否进入 Clawso Labs 指挥舱？",
      enter: "登舰进入",
      later: "稍后查看",
      request: "REQUEST ID: CLS-AI-0520",
      status: "STATUS: AWAITING CONFIRMATION"
    },
    boot: {
      status: "身份确认中...",
      lines: [
        "ENTERPRISE ACCESS VERIFIED",
        "AI NATIVE ENGINE ONLINE",
        "WORKFLOW CORE ONLINE",
        "AGENT SYSTEM ONLINE",
        "KNOWLEDGE RADAR ONLINE",
        "RESULT DELIVERY SYSTEM ONLINE",
        "WELCOME TO CLAWSO LABS COMMAND DECK"
      ]
    },
    hero: {
      code: "COMMAND DECK / ENTERPRISE AI OPS",
      title: "企业 AI 指挥舱",
      body: "Clawso Labs 将分散的 AI 工具、流程、知识与 Agent 编队，重构为企业可执行、可管理、可交付的 AI 生产系统。",
      primary: "启动 AI 化评估",
      secondary: "查看系统架构"
    },
    mission: {
      title: "先扫描企业 AI 化断点，再进入系统重构。",
      card1: {
        title: "工具碎片化",
        body: "AI 能力散落在个人账号、插件和临时脚本里，无法形成企业级生产链路。"
      },
      card2: {
        title: "流程不可执行",
        body: "知识、审批、交付和复盘仍靠人工接力，AI 只能停留在辅助层。"
      },
      card3: {
        title: "结果难以交付",
        body: "企业需要的是稳定输出、权限治理、质量追踪和业务闭环，而不是一次性演示。"
      }
    },
    capability: {
      title: "五大能力模块，组成企业 AI 生产系统。",
      card1: "把业务场景转译成 AI 原生任务结构，让模型能力进入真实工作流。",
      card2: "重构跨部门流程，把人工接力变成可编排、可追踪、可复用的执行链。",
      card3: "设计企业级 Agent 编队，让角色、权限、上下文和结果责任清晰落位。",
      card4: "连接企业知识资产，建立能被 AI 调用、校验和更新的知识雷达。",
      card5: "把 AI 输出接入交付标准、质量门禁和业务指标，确保结果能被采用。"
    },
    modules: {
      ai: {
        status: "MODE: AI NATIVE ENGINE",
        title: "AI Native Engine",
        body: "把业务场景转译成 AI 原生任务结构，让模型能力进入真实工作流。",
        core: "AI CORE",
        companion: "AI 原生引擎已待命。"
      },
      workflow: {
        status: "MODE: WORKFLOW CORE",
        title: "Workflow Core",
        body: "把跨部门流程变成可编排航线，让任务、审批、工具和交付节点连续运行。",
        core: "FLOW",
        companion: "流程航线正在校准。"
      },
      agent: {
        status: "MODE: AGENT SYSTEM",
        title: "Agent System",
        body: "按角色、权限和上下文组织企业 Agent 编队，让 AI 从单点工具变成协同系统。",
        core: "AGENT",
        companion: "Agent 编队已进入同步。"
      },
      radar: {
        status: "MODE: KNOWLEDGE RADAR",
        title: "Knowledge Radar",
        body: "让知识资产进入可检索、可验证、可更新的雷达层，支撑每一次 AI 决策。",
        core: "RADAR",
        companion: "知识雷达正在扫描。"
      },
      delivery: {
        status: "MODE: RESULT DELIVERY",
        title: "Result Delivery",
        body: "用质量门禁、交付标准和业务指标，把 AI 输出变成可以被团队采用的结果。",
        core: "RESULT",
        companion: "结果交付系统上线。"
      }
    },
    architecture: {
      title: "从业务请求到 AI 交付的舰桥架构。"
    },
    products: {
      title: "Clawso 是产品，不是全部舰队。",
      card1: {
        title: "面向 AI 工作流落地的核心产品",
        body: "承载流程编排、Agent 协同、知识调用与结果交付，让企业 AI 系统从概念进入日常运行。"
      },
      card2: {
        title: "企业 AI 化咨询、架构与实施",
        body: "围绕具体业务场景完成诊断、方案设计、系统搭建、团队导入和持续优化。"
      }
    },
    scenario: {
      title: "适合从“试用 AI”走向“运行 AI”的企业。",
      item1: "销售与客户成功知识系统",
      item2: "研发与产品 Agent 协作链",
      item3: "运营流程自动化指挥台",
      item4: "企业知识库 AI 原生改造",
      item5: "管理层 AI 决策支持系统"
    },
    contact: {
      title: "准备启动企业 AI 指挥舱？",
      body: "发送一个业务场景，Clawso Labs 将从流程、知识、Agent 与交付结果四个层面完成初步扫描。",
      button: "联系 Clawso Labs"
    }
  },
  en: {
    boarding: {
      kicker: "ENTERPRISE AI TRANSFORMATION ACCESS",
      title: "CLAWSO LABS COMMAND SYSTEM",
      detected: "Enterprise AI transformation request detected",
      question: "Enter the Clawso Labs command deck?",
      enter: "Board Command Deck",
      later: "View Later",
      request: "REQUEST ID: CLS-AI-0520",
      status: "STATUS: AWAITING CONFIRMATION"
    },
    boot: {
      status: "Verifying identity...",
      lines: [
        "ENTERPRISE ACCESS VERIFIED",
        "AI NATIVE ENGINE ONLINE",
        "WORKFLOW CORE ONLINE",
        "AGENT SYSTEM ONLINE",
        "KNOWLEDGE RADAR ONLINE",
        "RESULT DELIVERY SYSTEM ONLINE",
        "WELCOME TO CLAWSO LABS COMMAND DECK"
      ]
    },
    hero: {
      code: "COMMAND DECK / ENTERPRISE AI OPS",
      title: "CLAWSO LABS COMMAND SYSTEM",
      body: "Clawso Labs turns scattered AI tools, workflows, knowledge, and agent fleets into an executable, governable, deliverable AI production system.",
      primary: "Start AI Readiness Scan",
      secondary: "View System Architecture"
    },
    mission: {
      title: "Scan the enterprise AI breakpoints before rebuilding the system.",
      card1: {
        title: "Fragmented Tools",
        body: "AI capabilities sit in personal accounts, plugins, and temporary scripts instead of becoming an enterprise production chain."
      },
      card2: {
        title: "Unexecutable Workflows",
        body: "Knowledge, approvals, delivery, and review still rely on manual handoffs, leaving AI stuck in an assistant role."
      },
      card3: {
        title: "Undeliverable Results",
        body: "Enterprises need stable output, permission governance, quality tracking, and business closure, not one-off demos."
      }
    },
    capability: {
      title: "Five capability modules form the enterprise AI production system.",
      card1: "Translate business scenarios into AI-native task structures and bring model capabilities into real workflows.",
      card2: "Rebuild cross-team workflows into executable, traceable, reusable chains.",
      card3: "Design enterprise agent fleets with clear roles, permissions, context, and delivery responsibility.",
      card4: "Connect enterprise knowledge assets into a radar that AI can call, verify, and update.",
      card5: "Attach AI output to delivery standards, quality gates, and business metrics so results are adopted."
    },
    modules: {
      ai: {
        status: "MODE: AI NATIVE ENGINE",
        title: "AI Native Engine",
        body: "Translate business scenarios into AI-native task structures and bring model capabilities into real workflows.",
        core: "AI CORE",
        companion: "AI native engine standing by."
      },
      workflow: {
        status: "MODE: WORKFLOW CORE",
        title: "Workflow Core",
        body: "Turn cross-team operations into orchestrated routes where tasks, approvals, tools, and delivery nodes keep moving.",
        core: "FLOW",
        companion: "Workflow route is calibrating."
      },
      agent: {
        status: "MODE: AGENT SYSTEM",
        title: "Agent System",
        body: "Organize enterprise agent fleets by role, permission, and context so AI becomes a collaborative system.",
        core: "AGENT",
        companion: "Agent fleet entering sync."
      },
      radar: {
        status: "MODE: KNOWLEDGE RADAR",
        title: "Knowledge Radar",
        body: "Make knowledge assets searchable, verifiable, and renewable for every AI decision.",
        core: "RADAR",
        companion: "Knowledge radar scanning."
      },
      delivery: {
        status: "MODE: RESULT DELIVERY",
        title: "Result Delivery",
        body: "Use quality gates, delivery standards, and business metrics to turn AI output into adopted results.",
        core: "RESULT",
        companion: "Delivery system online."
      }
    },
    architecture: {
      title: "A bridge architecture from business signal to AI delivery."
    },
    products: {
      title: "Clawso is a product, not the entire fleet.",
      card1: {
        title: "Core product for AI workflow deployment",
        body: "It carries workflow orchestration, agent collaboration, knowledge retrieval, and result delivery into daily operations."
      },
      card2: {
        title: "Enterprise AI consulting, architecture, and implementation",
        body: "Clawso Labs diagnoses scenarios, designs systems, builds the stack, onboards teams, and keeps optimizing."
      }
    },
    scenario: {
      title: "For companies moving from trying AI to operating AI.",
      item1: "Sales and customer success knowledge systems",
      item2: "R&D and product agent collaboration chains",
      item3: "Operations automation command consoles",
      item4: "AI-native enterprise knowledge bases",
      item5: "Executive AI decision support systems"
    },
    contact: {
      title: "Ready to launch the enterprise AI command deck?",
      body: "Send one business scenario. Clawso Labs will run an initial scan across workflow, knowledge, agents, and deliverable results.",
      button: "Contact Clawso Labs"
    }
  },
  ja: {
    boarding: {
      kicker: "ENTERPRISE AI TRANSFORMATION ACCESS",
      title: "CLAWSO LABS COMMAND SYSTEM",
      detected: "企業 AI 化リクエストを検出しました",
      question: "Clawso Labs 指揮デッキに入りますか？",
      enter: "搭乗して入る",
      later: "後で見る",
      request: "REQUEST ID: CLS-AI-0520",
      status: "STATUS: AWAITING CONFIRMATION"
    },
    boot: {
      status: "認証中...",
      lines: [
        "ENTERPRISE ACCESS VERIFIED",
        "AI NATIVE ENGINE ONLINE",
        "WORKFLOW CORE ONLINE",
        "AGENT SYSTEM ONLINE",
        "KNOWLEDGE RADAR ONLINE",
        "RESULT DELIVERY SYSTEM ONLINE",
        "WELCOME TO CLAWSO LABS COMMAND DECK"
      ]
    },
    hero: {
      code: "COMMAND DECK / ENTERPRISE AI OPS",
      title: "企業 AI 指揮デッキ",
      body: "Clawso Labs は分散した AI ツール、ワークフロー、ナレッジ、Agent 編隊を、実行・管理・納品できる AI 生産システムへ再構築します。",
      primary: "AI 化診断を開始",
      secondary: "システム構成を見る"
    },
    mission: {
      title: "企業 AI 化の断点をスキャンし、システム再構築へ進む。",
      card1: {
        title: "ツールの分散",
        body: "AI 機能が個人アカウント、プラグイン、一時的なスクリプトに散在し、企業の生産ラインになっていません。"
      },
      card2: {
        title: "実行できないプロセス",
        body: "ナレッジ、承認、納品、振り返りが手作業の受け渡しに依存し、AI は補助に留まっています。"
      },
      card3: {
        title: "納品につながらない結果",
        body: "企業に必要なのは安定した出力、権限管理、品質追跡、業務のクローズであり、一度きりのデモではありません。"
      }
    },
    capability: {
      title: "五つの能力モジュールが企業 AI 生産システムを構成します。",
      card1: "業務シナリオを AI ネイティブなタスク構造へ変換し、モデル能力を実際のワークフローへ接続します。",
      card2: "部門横断のプロセスを、編成・追跡・再利用できる実行チェーンへ再構築します。",
      card3: "役割、権限、文脈、結果責任が明確な企業 Agent 編隊を設計します。",
      card4: "企業ナレッジ資産を、AI が呼び出し、検証し、更新できるレーダーへ接続します。",
      card5: "AI 出力を納品基準、品質ゲート、業務指標へ接続し、採用される結果にします。"
    },
    modules: {
      ai: {
        status: "MODE: AI NATIVE ENGINE",
        title: "AI Native Engine",
        body: "業務シナリオを AI ネイティブなタスク構造へ変換し、モデル能力を実際のワークフローへ接続します。",
        core: "AI CORE",
        companion: "AI ネイティブエンジン待機中。"
      },
      workflow: {
        status: "MODE: WORKFLOW CORE",
        title: "Workflow Core",
        body: "部門横断の業務を、タスク、承認、ツール、納品ノードが連続する編成ルートへ変えます。",
        core: "FLOW",
        companion: "ワークフロールートを調整中。"
      },
      agent: {
        status: "MODE: AGENT SYSTEM",
        title: "Agent System",
        body: "役割、権限、文脈に基づいて企業 Agent 編隊を組み、AI を協働システムへ進化させます。",
        core: "AGENT",
        companion: "Agent 編隊が同期中。"
      },
      radar: {
        status: "MODE: KNOWLEDGE RADAR",
        title: "Knowledge Radar",
        body: "ナレッジ資産を検索、検証、更新できるレーダー層にし、AI 判断を支えます。",
        core: "RADAR",
        companion: "ナレッジレーダーをスキャン中。"
      },
      delivery: {
        status: "MODE: RESULT DELIVERY",
        title: "Result Delivery",
        body: "品質ゲート、納品基準、業務指標で AI 出力をチームに採用される結果へ変えます。",
        core: "RESULT",
        companion: "納品システムがオンライン。"
      }
    },
    architecture: {
      title: "業務リクエストから AI 納品までのブリッジ構成。"
    },
    products: {
      title: "Clawso はプロダクトであり、艦隊のすべてではありません。",
      card1: {
        title: "AI ワークフロー実装の中核プロダクト",
        body: "ワークフロー編成、Agent 協働、ナレッジ呼び出し、結果納品を担い、AI システムを日常運用へ移します。"
      },
      card2: {
        title: "企業 AI 化のコンサルティング、設計、実装",
        body: "具体的な業務シナリオを診断し、設計、構築、チーム導入、継続改善まで支援します。"
      }
    },
    scenario: {
      title: "AI を「試す」段階から「運用する」段階へ進む企業に。",
      item1: "営業・カスタマーサクセスのナレッジシステム",
      item2: "開発・プロダクトの Agent 協働チェーン",
      item3: "運用プロセス自動化コンソール",
      item4: "AI ネイティブな企業ナレッジベース",
      item5: "経営層向け AI 意思決定支援"
    },
    contact: {
      title: "企業 AI 指揮デッキを起動しますか？",
      body: "業務シナリオを一つ送ってください。Clawso Labs がプロセス、ナレッジ、Agent、納品結果の四つの視点で初期スキャンします。",
      button: "Clawso Labs に連絡"
    }
  }
};

const sectionComms = {
  zh: {
    "command-deck": "Command Deck 已锁定。",
    mission: "Mission Scan 正在读取企业断点。",
    capability: "能力控制台已展开。",
    architecture: "Architecture Bay 航线图上线。",
    products: "Product Hangar 已开放。",
    scenario: "Scenario Deck 正在匹配业务场景。",
    contact: "Launch Contact 已准备接入。"
  },
  en: {
    "command-deck": "Command Deck locked.",
    mission: "Mission Scan is reading enterprise breakpoints.",
    capability: "Capability Console deployed.",
    architecture: "Architecture Bay route map online.",
    products: "Product Hangar opened.",
    scenario: "Scenario Deck matching business cases.",
    contact: "Launch Contact ready for intake."
  },
  ja: {
    "command-deck": "Command Deck をロックしました。",
    mission: "Mission Scan が企業の断点を読み取り中。",
    capability: "能力コンソールを展開しました。",
    architecture: "Architecture Bay の航路図がオンライン。",
    products: "Product Hangar を開放しました。",
    scenario: "Scenario Deck が業務シナリオを照合中。",
    contact: "Launch Contact が接続待機中。"
  }
};

let currentLang = localStorage.getItem("clawso-lang") || "zh";
let activeModule = "ai";

let stars = [];
let animationFrame = 0;
let lastTrailAt = 0;
let cursorRaf = 0;
let activeSection = "command-deck";
const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  ringX: window.innerWidth / 2,
  ringY: window.innerHeight / 2,
  droidX: 0,
  droidY: 0,
  eyeX: 0,
  eyeY: 0
};
const finePointer = window.matchMedia("(pointer: fine)");
let coreLabelTimer = 0;

function getValue(path) {
  return path.split(".").reduce((value, key) => value?.[key], copy[currentLang]);
}

function setLanguage(lang) {
  currentLang = copy[lang] ? lang : "zh";
  localStorage.setItem("clawso-lang", currentLang);
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : currentLang === "ja" ? "ja" : "en";

  translatable.forEach((element) => {
    const value = getValue(element.dataset.i18n);
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLang);
  });

  setActiveModule(activeModule);
  setActiveSection(activeSection);
}

function pulseCompanion() {
  if (!companion) return;
  companion.classList.remove("is-pulsing");
  window.setTimeout(() => companion.classList.add("is-pulsing"), 20);
}

function setCompanionLine(message) {
  if (companionLine) companionLine.textContent = message;
  pulseCompanion();
}

function setActiveModule(moduleName) {
  activeModule = copy[currentLang].modules[moduleName] ? moduleName : "ai";
  const module = copy[currentLang].modules[activeModule];

  moduleButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.module === activeModule);
  });

  capabilityCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.module === activeModule);
  });

  document.body.dataset.module = activeModule;
  if (moduleStatus) moduleStatus.textContent = module.status;
  if (moduleTitle) moduleTitle.textContent = module.title;
  if (moduleCopy) moduleCopy.textContent = module.body;
  typeCoreLabel(module.core);
  if (companion) {
    companion.dataset.module = activeModule;
  }
  setCompanionLine(module.companion);
}

function typeCoreLabel(text) {
  if (!coreLabel) return;
  window.clearInterval(coreLabelTimer);
  coreLabel.textContent = "";
  const letters = text.split("");
  let index = 0;

  coreLabelTimer = window.setInterval(() => {
    coreLabel.textContent += letters[index] || "";
    index += 1;

    if (index >= letters.length) {
      window.clearInterval(coreLabelTimer);
    }
  }, 34);
}

function setActiveSection(sectionId) {
  activeSection = sectionComms[currentLang][sectionId] ? sectionId : "command-deck";
  document.body.dataset.section = activeSection;

  deckNavLinks.forEach((link) => {
    const target = link.getAttribute("href").slice(1);
    link.classList.toggle("is-active", target === activeSection);
  });

  if (activeSection !== "command-deck") {
    setCompanionLine(sectionComms[currentLang][activeSection]);
  }
}

function createCursorTrail(x, y) {
  const trail = document.createElement("span");
  trail.className = "cursor-trail";
  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;
  trail.style.setProperty("--trail-x", `${(Math.random() - 0.5) * 28}px`);
  trail.style.setProperty("--trail-y", `${(Math.random() - 0.5) * 28}px`);
  document.body.appendChild(trail);
  window.setTimeout(() => trail.remove(), 620);
}

function renderCursor() {
  pointer.ringX += (pointer.x - pointer.ringX) * 0.18;
  pointer.ringY += (pointer.y - pointer.ringY) * 0.18;

  if (cursorCore) {
    cursorCore.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
  }

  if (cursorRing) {
    cursorRing.style.transform = `translate3d(${pointer.ringX}px, ${pointer.ringY}px, 0) translate(-50%, -50%)`;
  }

  if (companion && finePointer.matches) {
    const targetX = ((pointer.x / window.innerWidth) - 0.5) * 30;
    const targetY = ((pointer.y / window.innerHeight) - 0.5) * 30;
    const targetEyeX = ((pointer.x / window.innerWidth) - 0.5) * 28;
    const targetEyeY = ((pointer.y / window.innerHeight) - 0.5) * 22;

    pointer.droidX += (targetX - pointer.droidX) * 0.08;
    pointer.droidY += (targetY - pointer.droidY) * 0.08;
    pointer.eyeX += (targetEyeX - pointer.eyeX) * 0.18;
    pointer.eyeY += (targetEyeY - pointer.eyeY) * 0.18;

    companion.style.setProperty("--droid-x", `${pointer.droidX.toFixed(2)}px`);
    companion.style.setProperty("--droid-y", `${pointer.droidY.toFixed(2)}px`);
    companion.style.setProperty("--eye-x", `${pointer.eyeX.toFixed(2)}px`);
    companion.style.setProperty("--eye-y", `${pointer.eyeY.toFixed(2)}px`);
  }

  cursorRaf = requestAnimationFrame(renderCursor);
}

function primeCursor() {
  if (!finePointer.matches || !cursorCore || !cursorRing || cursorRaf) return;
  document.body.classList.add("has-hud-cursor");
  renderCursor();
}

function updatePointer(event) {
  if (!finePointer.matches) return;

  primeCursor();
  pointer.x = event.clientX;
  pointer.y = event.clientY;

  if (event.timeStamp - lastTrailAt > 54) {
    createCursorTrail(event.clientX, event.clientY);
    lastTrailAt = event.timeStamp;
  }
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(150, Math.floor((window.innerWidth * window.innerHeight) / 9000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    z: Math.random() * 0.7 + 0.25,
    pulse: Math.random() * Math.PI * 2
  }));
}

function drawSpace() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "#03060a";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  stars.forEach((star) => {
    star.y += 0.05 + star.z * 0.12;
    star.pulse += 0.025;

    if (star.y > window.innerHeight + 8) {
      star.y = -8;
      star.x = Math.random() * window.innerWidth;
    }

    const alpha = 0.18 + Math.sin(star.pulse) * 0.14 + star.z * 0.18;
    ctx.fillStyle = `rgba(122, 232, 255, ${alpha})`;
    ctx.fillRect(star.x, star.y, star.z * 1.6, star.z * 1.6);
  });

  animationFrame = requestAnimationFrame(drawSpace);
}

function revealDeck() {
  boot.classList.remove("is-active");
  siteShell.classList.add("is-active");
  document.body.classList.add("deck-online");
  window.scrollTo(0, 0);
}

function runBootSequence() {
  boarding.classList.remove("is-active");
  boot.classList.add("is-active");
  boot.classList.remove("is-completing");
  bootLines.innerHTML = "";

  copy[currentLang].boot.lines.forEach((line, index) => {
    window.setTimeout(() => {
      const item = document.createElement("li");
      item.textContent = line;
      item.dataset.signal = line;
      item.className = "boot-line";
      bootLines.appendChild(item);
      window.setTimeout(() => item.classList.add("is-online"), 80);
    }, 360 + index * 520);
  });

  window.setTimeout(() => boot.classList.add("is-completing"), 4700);
  window.setTimeout(revealDeck, 5400);
}

enterButton.addEventListener("click", () => {
  enterButton.classList.add("is-pressed");
  document.body.classList.add("access-requested");
  window.setTimeout(runBootSequence, 360);
});

previewButton.addEventListener("click", revealDeck);

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

moduleButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveModule(button.dataset.module));
  button.addEventListener("mouseenter", () => setActiveModule(button.dataset.module));
});

capabilityCards.forEach((card) => {
  card.addEventListener("mouseenter", () => setActiveModule(card.dataset.module));
});

window.addEventListener("pointermove", (event) => {
  updatePointer(event);

  if (!cockpit || window.matchMedia("(max-width: 760px)").matches) return;

  const rect = cockpit.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
  cockpit.style.setProperty("--tilt-x", `${-y}deg`);
  cockpit.style.setProperty("--tilt-y", `${x}deg`);
});

interactiveElements.forEach((element) => {
  element.addEventListener("pointerenter", () => {
    if (!finePointer.matches) return;
    document.body.classList.add("cursor-locked");
  });

  element.addEventListener("pointerleave", () => {
    document.body.classList.remove("cursor-locked");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        if (entry.target.id === "architecture" && architectureMap) {
          architectureMap.classList.remove("is-energized");
          window.setTimeout(() => architectureMap.classList.add("is-energized"), 80);
        }
        setActiveSection(entry.target.id);
      }
    });
  },
  { rootMargin: "-32% 0px -42% 0px", threshold: 0.08 }
);

trackedSections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("resize", resizeCanvas);
setLanguage(currentLang);
resizeCanvas();
drawSpace();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(animationFrame);
  cancelAnimationFrame(cursorRaf);
});
