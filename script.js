// ==== CONFIGURE THESE WITH YOUR REAL EMAILJS VALUES ====
const EMAILJS_PUBLIC_KEY = "WiZ9kfCMjXubU-hBb";
const EMAILJS_SERVICE_ID = "service_mhqbdiq"; // if that's your real one
const EMAILJS_TEMPLATE_ID = "template_3o5e5jh";

// Initialize EmailJS
if (typeof emailjs !== "undefined") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// PARALLAX BACKGROUND ---------------------------------------------
const bg = document.getElementById("parallax-bg");
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 16;
  const y = (e.clientY / window.innerHeight - 0.5) * 16;
  bg.style.transform = `translate(${x}px, ${y}px)`;
});

// THEME TOGGLE -----------------------------------------------------
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode")
    ? "☀️"
    : "🌙";
});

// SCROLL REVEAL ----------------------------------------------------
const revealEls = document.querySelectorAll(".reveal");
function handleReveal() {
  const trigger = window.innerHeight * 0.85;
  revealEls.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add("show");
      el.querySelectorAll(".fill").forEach((bar) => bar.classList.add("show"));
    }
  });
}
window.addEventListener("scroll", handleReveal);
handleReveal();

// DASHBOARD COUNTERS -----------------------------------------------
const metricValues = document.querySelectorAll(".metric-value");
metricValues.forEach((el) => {
  const target = Number(el.dataset.target || "0");
  let current = 0;
  const step = Math.max(1, Math.floor(target / 80));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current.toLocaleString();
  }, 30);
});

// DASHBOARD LIVE LOG SIMULATION ------------------------------------
const logList = document.getElementById("log-list");
const logMessages = [
  "[INFO] New recon task queued for 10.0.1.24",
  "[ALERT] Suspicious SSH login blocked from RU region",
  "[SCAN] Netherworld scan completed on 192.168.1.0/24",
  "[WARN] 14 weak passwords detected in test lab",
  "[INFO] Redstrike brute-force simulation finished",
  "[OK] Firewall rules synced for web segment",
];
let logIndex = 0;
setInterval(() => {
  if (!logList) return;
  const li = document.createElement("li");
  li.textContent = logMessages[logIndex % logMessages.length];
  logIndex++;
  logList.prepend(li);
  if (logList.children.length > 8) {
    logList.removeChild(logList.lastChild);
  }
}, 2000);

// TERMINAL SIMULATION ----------------------------------------------
const termForm = document.getElementById("terminal-form");
const termInput = document.getElementById("terminal-input");
const termOutput = document.getElementById("terminal-output");

const commands = {
  help: [
    "available commands:",
    "  about      - short bio",
    "  projects   - list main projects",
    "  skills     - quick tech stack",
    "  clear      - clear screen",
  ],
  about: [
    "Abhisar Ranger — cybersecurity enthusiast focused on automation & tooling.",
    "Java & Python dev, OSINT learner, and security labs explorer.",
  ],
  projects: [
    "- Netherworld : advanced port scanner with GEO + OS detection",
    "- Redstrike   : CLI toolkit for recon, scanning & brute-force simulations",
  ],
  skills: [
    "Languages: Java, Python",
    "Practices: Cyber Security, DSA, OSINT",
    "Tools: Git, GitHub, Linux, IoT, recon utilities",
  ],
};

function printLine(text) {
  const div = document.createElement("div");
  div.textContent = text;
  termOutput.appendChild(div);
  termOutput.scrollTop = termOutput.scrollHeight;
}

if (termForm) {
  termForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = termInput.value.trim();
    if (!value) return;
    printLine("> " + value);
    const cmd = value.toLowerCase();
    if (cmd === "clear") {
      termOutput.innerHTML = "";
    } else if (commands[cmd]) {
      commands[cmd].forEach((line) => printLine(line));
    } else {
      printLine("command not found. type 'help' for options.");
    }
    termInput.value = "";
  });
}

// BLOG POSTS (FRONTEND STATIC DATA) -------------------------------
const blogGrid = document.getElementById("blog-grid");
if (blogGrid) {
  const posts = [
    {
      title: "Building Netherworld: Designing a Port Scanner",
      excerpt:
        "Thought process behind creating Netherworld, handling GEO lookup, and OS detection in one tool.",
      tag: "Tooling",
    },
    {
      title: "Redstrike: Planning a Cyber Toolkit",
      excerpt:
        "Notes on structuring offensive & defensive modules in a CLI-based security framework.",
      tag: "Framework",
    },
    {
      title: "OSINT Basics: First Steps",
      excerpt:
        "Collecting open-source intelligence using public data, search operators, and basic tooling.",
      tag: "OSINT",
    },
  ];
  posts.forEach((p) => {
    const card = document.createElement("article");
    card.className = "blog-card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      <span class="tag">${p.tag}</span>
    `;
    blogGrid.appendChild(card);
  });
}

// Typing animation ---------------------------------------
const typingElement = document.getElementById("typing");
const typingText = [
  "Cybersecurity Enthusiast",
  "Python & Java Developer",
  "OSINT Learner",
  "Security Tool Builder"
];

let typingIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentText = typingText[typingIndex];

  if (!deleting) {
    typingElement.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      typingIndex = (typingIndex + 1) % typingText.length;
    }
  }
  setTimeout(typeEffect, deleting ? 70 : 90);
}

typeEffect();


// CONTACT FORM WITH EMAILJS ---------------------------------------
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameField = contactForm.querySelector("input[placeholder='Your Name']");
    const emailField = contactForm.querySelector("input[placeholder='Your Email']");
    const messageField = contactForm.querySelector("textarea");

    const params = {
      from_name: nameField.value,
      from_email: emailField.value,
      message: messageField.value,
    };

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      alert("EmailJS is not configured. Please add your IDs in script.js.");
      return;
    }

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(() => {
        alert("Your message has been sent!");
        contactForm.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        alert("Failed to send message. Please try again later.");
      });
  });
}

// RESUME MODAL -----------------------------------------------------
const resumeBtn = document.getElementById("resume-btn");
const resumeModal = document.getElementById("resume-modal");
const resumeClose = document.getElementById("resume-close");

if (resumeBtn && resumeModal && resumeClose) {
  resumeBtn.addEventListener("click", () => {
    resumeModal.classList.add("show");
  });
  resumeClose.addEventListener("click", () => {
    resumeModal.classList.remove("show");
  });
  resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) resumeModal.classList.remove("show");
  });
}

