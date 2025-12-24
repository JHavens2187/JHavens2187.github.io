// #region BOOT SEQUENCE
async function typeLine(elementId, text, speed = 30) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.textContent = "";
  element.parentElement.style.opacity = "1";

  for (let i = 0; i < text.length; i++) {
    element.textContent += text.charAt(i);
    await new Promise((r) => setTimeout(r, speed));
  }
}

async function runBootSequence() {
  const bootScreen = document.getElementById("boot-screen");
  // Only run if the boot screen exists on this page (about.html)
  if (!bootScreen) return;

  const cursor = document.getElementById("cursor");
  if (cursor) cursor.remove();

  // Line 1
  const line1 = document.getElementById("line-1");
  if (line1) line1.appendChild(cursor);
  await typeLine("text-1", "> INITIALIZING BIOMETRICS...", 25);

  // Line 2
  await new Promise((r) => setTimeout(r, 200));
  if (line1 && cursor) cursor.remove();
  const line2 = document.getElementById("line-2");
  if (line2) line2.appendChild(cursor);
  await typeLine("text-2", "> LOADING ARCHIVES: 2022-2025...", 25);

  // Line 3
  await new Promise((r) => setTimeout(r, 200));
  if (line2 && cursor) cursor.remove();
  const line3 = document.getElementById("line-3");
  if (line3) {
    line3.appendChild(cursor);
    line3.style.color = "#5aad45";
  }
  // Updated to match your specific boot message
  await typeLine("text-3", "> PROFILE LOADED: Maireannacht.", 25);

  // Fade Out
  await new Promise((r) => setTimeout(r, 600));
  if (bootScreen) {
    bootScreen.style.opacity = "0";
    setTimeout(() => {
      bootScreen.style.display = "none";
    }, 800);
  }
}
// #endregion

// #region MAIN INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  // 1. Run Boot Sequence (if applicable)
  runBootSequence();

  // 2. Initialize Secret Terminal
  initSecretTerminal();

  // 3. Initialize Navigation (NEW)
  initNavigation();

  // 4. Identity Glitch Toggle
  const header = document.querySelector(".glitch-wrapper");
  if (header) {
    header.addEventListener("mouseenter", () => {
      header.classList.toggle("identity-revealed");
    });
  }

  // 5. Setup Universal Scroll Observer (Fade In/Out on scroll)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // 6. Dashboard Card Generation (Only runs if link-container exists)
  try {
    const container = document.getElementById("link-container");
    if (container && typeof config !== "undefined" && config.links) {
      container.innerHTML = "";

      // Map specific images and descriptions to card titles
      const cardData = {
        "My Research Projects": {
          desc: "Analyzing AGN dust attenuation using JWST spectra.",
          img: "assets/img/spectral_plot.png",
          cls: "research-card",
        },
        "Class Projects & Papers": {
          desc: "Computer vision pipelines & Arduino hardware.",
          img: "assets/img/Theoretical_Lagrangian.png",
          cls: "projects-card",
        },
        "View My CV": {
          desc: "Full academic record & skills.",
          img: "assets/img/KU_phys_astro_logo.png",
          cls: "cv-card",
        },
        "About Me": {
          desc: "The Scientist, The Architect, and The Origin Story.",
          img: "assets/img/profile_pic.png",
          cls: "about-card",
        },
        "Talks & Outreach": {
          desc: "Teaching & volunteering.",
          img: "assets/img/outreach_pic.png",
          cls: "outreach-card",
        },
      };

      // Filter out social links (LinkedIn, Bluesky) from the main grid
      const mainLinks = config.links.filter(
        (link) => !["LinkedIn", "Bluesky"].includes(link.Title)
      );

      mainLinks.forEach((link, i) => {
        const col = document.createElement("div");
        const isBig =
          link.Title.includes("Research") || link.Title.includes("Projects");
        col.className = isBig
          ? "col-12 col-md-6 mb-4 fade-in-up"
          : "col-12 col-md-6 col-lg-4 mb-4 fade-in-up";
        col.style.animationDelay = `${(i + 1) * 0.15}s`;

        const data = cardData[link.Title] || {
          desc: "View module.",
          img: "assets/img/profile_pic.png",
          cls: "default-card",
        };

        col.innerHTML = `
            <a href="${
              link.URL
            }" class="card h-100 bento-tile border-0 text-decoration-none ${
          data.cls
        }">
                <div class="tile-bg" style="background-image: url('${
                  data.img
                }');"></div>
                <div class="tile-overlay"></div>
                <div class="card-body d-flex flex-column align-items-center text-center p-4">
                    <div class="mt-auto"> 
                        <div class="icon-box"><i class="${
                          link.icon_classes
                        }"></i></div>
                        <h5 class="card-title text-white font-weight-bold" style="font-family: 'Dosis', sans-serif; font-size: 1.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
                            ${link.Title}
                        </h5>
                        <div class="reveal-text">
                            <p class="small text-white-50 mb-2" style="font-family: 'Abel', sans-serif; font-size: 1rem;">${
                              data.desc
                            }</p>
                            <div class="module-code" style="font-family: 'Roboto Mono', monospace; font-size: 0.7rem; color: var(--accent-glow);">
                                DATA_STREAM // 0${i + 1}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(col);
      });

      // Spotlight Effect
      const cards = document.querySelectorAll(".bento-tile");
      cards.forEach((card) => {
        card.onmousemove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        };
      });
    }
  } catch (e) {
    // Silent catch
  }
});
// #endregion

// #region NAVIGATION SYSTEM (SMART HISTORY)
function initNavigation() {
  // 1. Prevent Duplicate Injection
  if (document.querySelector(".menu-container")) return;

  // --- A. DEFINE THE MAP (URL -> Icon/Title) ---
  // This acts as a database to convert file paths into UI elements
  const pageMap = {
    "index.html": { icon: "fa-home", title: "Dashboard" },
    "/": { icon: "fa-home", title: "Dashboard" },
    "about.html": { icon: "fa-user-astronaut", title: "Identity & R&D" },
    "projects.html": { icon: "fa-layer-group", title: "Class Projects" },
    "nfl-predictor.html": { icon: "fa-football-ball", title: "NFL Engine" },
    "project-lazarus.html": { icon: "fa-desktop", title: "Project Lazarus" },
    "research-agn.html": { icon: "fa-satellite-dish", title: "AGN Research" },
  };

  // Helper to get clean filename from path
  const getCurrentPage = () => {
    const path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  };

  // --- B. MANAGE HISTORY (SESSION STORAGE) ---
  const currentPath = getCurrentPage();

  // Get existing history or initialize empty array
  let navHistory = JSON.parse(
    sessionStorage.getItem("maireannacht_nav_history") || "[]"
  );

  // Logic: Only push if it's different from the last entry (prevent refresh duplicates)
  if (
    navHistory.length === 0 ||
    navHistory[navHistory.length - 1] !== currentPath
  ) {
    navHistory.push(currentPath);
    // Keep history manageable (last 10 pages max)
    if (navHistory.length > 10) navHistory.shift();
    sessionStorage.setItem(
      "maireannacht_nav_history",
      JSON.stringify(navHistory)
    );
  }

  // --- C. DETERMINE MENU SLOTS ---
  // Slot 1: ALWAYS DASHBOARD (The Anchor)
  const slot1 = { path: "index.html", ...pageMap["index.html"] };

  // Slot 2: Previous Page (History - 2) OR Default to 'About'
  // (History length - 1 is current page, so -2 is previous)
  let slot2Path =
    navHistory.length >= 2 ? navHistory[navHistory.length - 2] : "about.html";
  // If we are currently ON about.html, fallback to Projects
  if (slot2Path === currentPath) slot2Path = "projects.html";
  const slot2 = {
    path: slot2Path,
    ...(pageMap[slot2Path] || { icon: "fa-link", title: "Back" }),
  };

  // Slot 3: Two Pages Back (History - 3) OR Default to 'Projects'
  let slot3Path =
    navHistory.length >= 3
      ? navHistory[navHistory.length - 3]
      : "projects.html";
  // If Slot 3 duplicates Slot 2 or Current, fallback to About
  if (slot3Path === currentPath || slot3Path === slot2Path)
    slot3Path = "about.html";
  // Final check to ensure Slot 3 isn't current page
  if (slot3Path === currentPath) slot3Path = "research-agn.html";

  const slot3 = {
    path: slot3Path,
    ...(pageMap[slot3Path] || { icon: "fa-link", title: "Back" }),
  };

  // --- D. INJECT HTML ---
  const navHTML = `
        <div class="menu-container">
            <input type="checkbox" id="toggle">
            <label class="btn-main" for="toggle">
                <i class="fas fa-bars" id="menu-icon"></i>
                <i class="fas fa-times" id="close-icon"></i>
            </label>
            <div class="menu-items">
                <a href="${slot1.path}" style="--x:-1; --y:0;" title="${slot1.title}">
                    <i class="fas ${slot1.icon}"></i>
                </a>
                
                <a href="${slot2.path}" style="--x:-1; --y:1;" title="Return to: ${slot2.title}">
                    <i class="fas ${slot2.icon}"></i>
                </a>
                
                <a href="${slot3.path}" style="--x:0; --y:1;" title="${slot3.title}">
                    <i class="fas ${slot3.icon}"></i>
                </a>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("afterbegin", navHTML);
}
// #endregion

// #region SECRET TERMINAL
function initSecretTerminal() {
  // 1. Inject HTML
  const terminalHTML = `
        <div id="secret-terminal">
            <div class="terminal-header">
                <span>MAIREANNACHT_OS // V.1.0</span>
                <span id="term-close-btn" style="cursor: pointer;">[X] CLOSE CONNECTION</span>
            </div>
            <div class="terminal-body" id="term-body">
                <div class="term-msg system">System overlay initialized...</div>
                <div class="term-msg">Type 'help' for available commands.</div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">visitor@maireannacht:~$</span>
                    <input type="text" id="term-input" autocomplete="off" spellcheck="false">
                </div>
            </div>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", terminalHTML);

  // 2. Variables
  const terminal = document.getElementById("secret-terminal");
  const body = document.getElementById("term-body");
  const closeBtn = document.getElementById("term-close-btn");
  const defaultBodyHTML = body.innerHTML;
  let isOpen = false;

  // 3. Helper to Attach Input Listener
  function attachInputListener() {
    const inputField = document.getElementById("term-input");
    if (!inputField) return;

    inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = inputField.value.trim().toLowerCase();
        printLine(`visitor@maireannacht:~$ ${command}`, "system");
        processCommand(command);
        inputField.value = "";
        body.scrollTop = body.scrollHeight;
      }
    });
    return inputField;
  }

  let currentInput = attachInputListener();

  // 4. Toggle Function
  function toggleTerminal(forceState) {
    isOpen = forceState !== undefined ? forceState : !isOpen;

    if (isOpen) {
      terminal.classList.add("active");
      setTimeout(() => {
        const input = document.getElementById("term-input");
        if (input) input.focus();
      }, 50);
    } else {
      terminal.classList.remove("active");
      if (currentInput) currentInput.blur();

      setTimeout(() => {
        body.innerHTML = defaultBodyHTML;
        currentInput = attachInputListener();
      }, 500);
    }
  }

  // 5. Output Helper
  function printLine(text, type = "") {
    const div = document.createElement("div");
    div.className = `term-msg ${type}`;
    div.textContent = text;
    const inputLine = document.querySelector(".terminal-input-line");
    if (inputLine && body) body.insertBefore(div, inputLine);
  }

  // 6. Global Listeners
  document.addEventListener("keydown", (e) => {
    if (e.key === "`" || e.key === "~") {
      e.preventDefault();
      toggleTerminal();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => toggleTerminal(false));
  }

  // 7. Command Processor
  function processCommand(cmd) {
    switch (cmd) {
      case "help":
        printLine("AVAILABLE COMMANDS:", "system");
        printLine("  > projects   : List system archives");
        printLine("  > whoami     : Identify user");
        printLine("  > clear      : Clear terminal");
        printLine("  > exit       : Close connection");
        break;
      case "whoami":
        printLine("User: Guest (Unauthenticated)", "warning");
        break;
      case "projects":
        printLine("Loading archives...", "system");
        setTimeout(() => {
          printLine("1. NFL_PREDICTOR [STATUS: COMPLETED]");
          printLine("2. LAZARUS_IMAC  [STATUS: IN PROGRESS]");
          printLine("3. JWST_AGN      [STATUS: ONGOING]");
        }, 400);
        break;
      case "clear":
        body.innerHTML = defaultBodyHTML;
        currentInput = attachInputListener();
        if (currentInput) currentInput.focus();
        break;
      case "exit":
      case "quit":
        printLine("Terminating session...", "system");
        setTimeout(() => toggleTerminal(false), 600);
        break;
      case "login":
        printLine("ERROR: Biometric scanner not found.", "error");
        printLine(
          'HINT: "Maireannacht" protocol requires manual override.',
          "system"
        );
        break;
      case "maireannacht":
        printLine(">> ACCESS GRANTED.", "success");
        printLine("Welcome back, Joseph.", "success");
        break;
      case "":
        break;
      default:
        printLine(`Command not found: ${cmd}`, "error");
    }
  }
}
// #endregion
