// ===== EmailJS stuff (put your keys here) =====
var EMAILJS_PUBLIC_KEY = "WiZ9kfCMjXubU-hBb";   // e.g. "cF3p9x..."
var EMAILJS_SERVICE_ID = "service_mhqbdiq";      // you said this in chat
var EMAILJS_TEMPLATE_ID = "template_3o5e5jh"; // from EmailJS template

if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ===== parallax background =====
var bg = document.getElementById("parallax-bg");
document.addEventListener("mousemove", function (e) {
    var x = (e.clientX / window.innerWidth - 0.5) * 16;
    var y = (e.clientY / window.innerHeight - 0.5) * 16;
    bg.style.transform = "translate(" + x + "px," + y + "px)";
});

// ===== theme toggle =====
var themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});

// ===== scroll reveal =====
var revealEls = document.querySelectorAll(".reveal");
function doReveal() {
    var trigger = window.innerHeight * 0.85;
    revealEls.forEach(function (el) {
        var top = el.getBoundingClientRect().top;
        if (top < trigger) {
            el.classList.add("show");
            // also animate skill bars here
            var bars = el.querySelectorAll(".fill");
            bars.forEach(function (b) {
                b.classList.add("show");
            });
        }
    });
}
window.addEventListener("scroll", doReveal);
doReveal();

// ===== dashboard numbers =====
var metricEls = document.querySelectorAll(".metric-value");
metricEls.forEach(function (el) {
    var target = Number(el.getAttribute("data-target") || "0");
    var current = 0;
    var step = Math.max(1, Math.floor(target / 80));
    var timer = setInterval(function () {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current.toLocaleString();
    }, 30);
});

// ===== fake logs for dashboard =====
var logBox = document.getElementById("log-list");
var logLines = [
    "[INFO] new recon task queued for 10.0.1.24",
    "[ALERT] ssh login blocked from suspicious region",
    "[SCAN] netherworld finished scan of 192.168.1.0/24",
    "[WARN] 14 weak passwords found (lab only)",
    "[INFO] redstrike brute-force test completed",
    "[OK] firewall rules synced for web segment"
];
var logIdx = 0;

setInterval(function () {
    if (!logBox) return;
    var li = document.createElement("li");
    li.textContent = logLines[logIdx % logLines.length];
    logIdx++;
    logBox.prepend(li);
    if (logBox.children.length > 8) {
        logBox.removeChild(logBox.lastChild);
    }
}, 2000);

// ===== typing animation in hero =====
var typingEl = document.getElementById("typing");
var typingLines = [
    "Cybersecurity Enthusiast",
    "Python & Java Developer",
    "OSINT Learner",
    "Security Tool Builder"
];
var lineIndex = 0;
var charIndex = 0;
var deleting = false;

// simple typing loop
function typeLoop() {
    if (!typingEl) return; // just in case

    var txt = typingLines[lineIndex];

    if (!deleting) {
        charIndex++;
        typingEl.textContent = txt.slice(0, charIndex);
        if (charIndex >= txt.length) {
            deleting = true;
            setTimeout(typeLoop, 1200); // pause at end
            return;
        }
    } else {
        charIndex--;
        typingEl.textContent = txt.slice(0, charIndex);
        if (charIndex <= 0) {
            deleting = false;
            lineIndex = (lineIndex + 1) % typingLines.length;
        }
    }

    var speed = deleting ? 70 : 90;
    setTimeout(typeLoop, speed);
}
typeLoop();

// ===== fake terminal =====
var termForm = document.getElementById("terminal-form");
var termInput = document.getElementById("terminal-input");
var termOutput = document.getElementById("terminal-output");

// simple commands map
var cmdMap = {
    help: [
        "available commands:",
        "  about      - short bio",
        "  projects   - show main projects",
        "  skills     - tech stack summary",
        "  clear      - clear the screen"
    ],
    about: [
        "Abhisar Ranger - cyber security enthusiast from India.",
        "I like building recon tools, learning OSINT and writing small scripts."
    ],
    projects: [
        "- Netherworld : advanced port scanner with GEO + OS info",
        "- Redstrike   : CLI toolkit for recon & brute-force (still in progress)"
    ],
    skills: [
        "Languages: Java, Python",
        "Practices: Cyber Security, DSA, OSINT",
        "Tools: Git, GitHub, Linux, IoT, etc."
    ]
};

function printTermLine(text) {
    var div = document.createElement("div");
    div.textContent = text;
    termOutput.appendChild(div);
    termOutput.scrollTop = termOutput.scrollHeight;
}

if (termForm) {
    termForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var val = termInput.value.trim();
        if (!val) return;

        printTermLine("> " + val);
        var cmd = val.toLowerCase();

        if (cmd === "clear") {
            termOutput.innerHTML = "";
        } else if (cmdMap[cmd]) {
            cmdMap[cmd].forEach(function (line) {
                printTermLine(line);
            });
        } else {
            printTermLine("command not found. type 'help' for options.");
        }

        termInput.value = "";
    });
}

// ===== static blog cards (no backend) =====
var blogContainer = document.getElementById("blog-grid");
if (blogContainer) {
    var blogPosts = [
        {
            title: "Building Netherworld (Port Scanner Idea)",
            text: "How I thought about combining GEO lookup, OS detection and ports into one recon tool.",
            tag: "Tooling"
        },
        {
            title: "Redstrike - Notes on Design",
            text: "Planning a simple CLI that has both offensive and defensive modules for learning.",
            tag: "Framework"
        },
        {
            title: "OSINT Basics for Beginners",
            text: "Small notes on using search operators, public data and some tools for OSINT.",
            tag: "OSINT"
        }
    ];

    blogPosts.forEach(function (p) {
        var card = document.createElement("article");
        card.className = "blog-card";
        card.innerHTML = "<h3>" + p.title + "</h3>" +
            "<p>" + p.text + "</p>" +
            "<span class='tag'>" + p.tag + "</span>";
        blogContainer.appendChild(card);
    });
}

// ===== contact form with EmailJS =====
var contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var nameInput = contactForm.querySelector("input[placeholder='Your Name']");
        var emailInput = contactForm.querySelector("input[placeholder='Your Email']");
        var msgInput = contactForm.querySelector("textarea");

        var params = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            message: msgInput.value
        };

        if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY_HERE" ||
            EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID_HERE") {
            alert("EmailJS keys not set yet. Open script.js and put your keys at the top.");
            return;
        }

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
            .then(function () {
                alert("Message sent! Thanks :)");
                contactForm.reset();
            })
            .catch(function (err) {
                console.log("EmailJS error:", err);
                alert("Something went wrong, please try again later.");
            });
    });
}

// ===== resume modal =====
var resumeBtn = document.getElementById("resume-btn");
var resumeModal = document.getElementById("resume-modal");
var resumeClose = document.getElementById("resume-close");

if (resumeBtn && resumeModal && resumeClose) {
    resumeBtn.addEventListener("click", function () {
        resumeModal.classList.add("show");
    });
    resumeClose.addEventListener("click", function () {
        resumeModal.classList.remove("show");
    });
    resumeModal.addEventListener("click", function (e) {
        if (e.target === resumeModal) {
            resumeModal.classList.remove("show");
        }
    });
}
