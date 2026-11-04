// ==================== GLOBAL STATE & DATA ====================
let currentUser = {
    name: "Student User",
    initial: "S",
    isLoggedIn: false
};

// Trivia Data Array for Carousel
const triviaList = [
    {
        icon: "fa-lightbulb",
        category: "Did You Know?",
        title: "95% of Cyber Breaches Are Human Error",
        description: "Most security incidents happen not because of advanced hacker code, but because someone clicked a tricky link or used a weak password."
    },
    {
        icon: "fa-fish",
        category: "Phishing Alert",
        title: "Billions of Phishing Emails Sent Daily",
        description: "Over 3.4 billion fake emails circulate globally every day mimicking banks, schools, and popular streaming services."
    },
    {
        icon: "fa-key",
        category: "Password Safety",
        title: "Length Beats Complexity",
        description: "A 16-character passphrase like 'correct-horse-battery-staple' takes centuries to crack compared to a short complex one like 'P@ss1!'."
    },
    {
        icon: "fa-user-secret",
        category: "Digital Footprint",
        title: "Public Profiles Are Open Books",
        description: "Information you casually share online (birthdays, pets' names, location) can be used by scammers to guess security questions."
    },
    {
        icon: "fa-shield-heart",
        category: "Cyber Ethics",
        title: "Think Before You Share",
        description: "Cyber ethics means treating others online with the same respect, kindness, and legal mindfulness as you do in real life."
    }
];

let currentTriviaIndex = 0;
let autoPlayInterval = null;
let isAutoPlaying = false;

// Quiz Data
const quizQuestions = [
    {
        question: "You receive an urgent email from your 'school admin' claiming your account will be deleted unless you click a link and login immediately. What should you do?",
        options: [
            "Click it right away so you don't lose your account.",
            "Ignore the panic tone, check the sender address carefully, and verify through official school channels.",
            "Forward it to all your classmates.",
            "Reply with your password to confirm your identity."
        ],
        correct: 1,
        explanation: "Scammers use panic and urgency to rush you. Always verify independently!"
    },
    {
        question: "Which of the following is considered a strong, secure passphrase?",
        options: [
            "password123",
            "ilovecats",
            "Correct-Coffee-Mug-Sunburst-2026!",
            "12345678"
        ],
        correct: 2,
        explanation: "Long passphrases mixed with uppercase letters, numbers, and symbols are exceptionally secure."
    },
    {
        question: "What is 'Social Engineering' in cybersecurity?",
        options: [
            "Building social media apps for networking.",
            "Manipulating individuals psychologically into giving away confidential information.",
            "A friendly club for computer science students.",
            "Fixing broken Wi-Fi routers."
        ],
        correct: 1,
        explanation: "Social engineering targets human psychology rather than software vulnerabilities."
    },
    {
        question: "Why should you avoid using public, unsecured Wi-Fi for banking or private logins?",
        options: [
            "It drains your phone battery faster.",
            "Public Wi-Fi is slower than 5G.",
            "Attackers can easily intercept unencrypted data packets on open networks.",
            "It is illegal to use public Wi-Fi."
        ],
        correct: 2,
        explanation: "Open networks lack encryption, allowing malicious actors to sniff network traffic."
    }
];

let currentQuizIndex = 0;
let userScore = 0;

// ==================== NAVIGATION & TABS ====================
function switchTab(targetId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.add('hidden'));

    // Show target tab
    const activeTab = document.getElementById(`tab-${targetId}`);
    if (activeTab) {
        activeTab.classList.remove('hidden');
    }

    // Update active state on nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-target') === targetId) {
            btn.classList.add('bg-pink-100', 'text-pink-600');
        } else {
            btn.classList.remove('bg-pink-100', 'text-pink-600');
        }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('mobileMenuIcon');
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        icon.className = "fa-solid fa-bars";
    } else {
        icon.className = "fa-solid fa-xmark";
    }
}

// ==================== MODAL SYSTEM ====================
function showModal(title, message, icon = "✨") {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = message;
    document.getElementById('modalIcon').innerText = icon;

    const container = document.getElementById('modalContainer');
    const box = document.getElementById('modalBox');

    container.classList.remove('hidden');
    setTimeout(() => {
        box.classList.remove('scale-95', 'opacity-0');
        box.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    const container = document.getElementById('modalContainer');
    const box = document.getElementById('modalBox');

    box.classList.remove('scale-100', 'opacity-100');
    box.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        container.classList.add('hidden');
    }, 200);
}

// ==================== TRIVIA CAROUSEL ====================
function updateTriviaCard() {
    const trivia = triviaList[currentTriviaIndex];
    document.getElementById('triviaIcon').innerHTML = `<i class="fa-solid ${trivia.icon}"></i>`;
    document.getElementById('triviaCategory').innerText = trivia.category;
    document.getElementById('triviaTitle').innerText = trivia.title;
    document.getElementById('triviaDescription').innerText = trivia.description;
    document.getElementById('triviaIndicator').innerText = `${currentTriviaIndex + 1} / ${triviaList.length}`;
}

function nextTrivia() {
    currentTriviaIndex = (currentTriviaIndex + 1) % triviaList.length;
    updateTriviaCard();
}

function prevTrivia() {
    currentTriviaIndex = (currentTriviaIndex - 1 + triviaList.length) % triviaList.length;
    updateTriviaCard();
}

function toggleAutoPlay() {
    const btn = document.getElementById('autoPlayBtn');
    if (isAutoPlaying) {
        clearInterval(autoPlayInterval);
        isAutoPlaying = false;
        btn.innerHTML = '<i class="fa-solid fa-play mr-1"></i> Auto-Play';
        btn.classList.remove('bg-pink-200');
    } else {
        autoPlayInterval = setInterval(nextTrivia, 4000);
        isAutoPlaying = true;
        btn.innerHTML = '<i class="fa-solid fa-pause mr-1"></i> Pause';
        btn.classList.add('bg-pink-200');
    }
}

// ==================== MODULE DETAILS ====================
function openModuleDetail(moduleId) {
    if (moduleId === 'phishing') {
        showModal(
            "Module 01: Phishing Deep-Dive",
            "Phishing is when attackers disguise themselves as trusted entities (like your school, bank, or Netflix) to steal credentials. Always check: 1) Sender domain spelling, 2) Generic greetings like 'Dear User', 3) Urgency pushing you to panic-click.",
            "🎣"
        );
    } else {
        showModal("Learning Module", "Stay tuned! More aesthetic modules are unlocking soon.", "📚");
    }
}

// ==================== PASSWORD LAB / STRENGTH CHECKER ====================
function checkPasswordStrength() {
    const pwd = document.getElementById('passwordInput').value;
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    const hint = document.getElementById('passwordHint');

    if (!pwd) {
        bar.style.width = "0%";
        bar.className = "h-full transition-all duration-300 rounded-full bg-gray-200";
        text.innerText = "Enter a password above";
        text.className = "text-sm font-bold text-gray-400";
        hint.innerText = "Tip: Combine uppercase, lowercase, numbers, and symbols.";
        return;
    }

    let score = 0;
    let feedback = [];

    if (pwd.length >= 8) score++;
    else feedback.push("make it at least 8 characters");

    if (pwd.length >= 12) score++;

    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    else feedback.push("add upper & lowercase letters");

    if (/[0-9]/.test(pwd)) score++;
    else feedback.push("include numbers");

    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    else feedback.push("use special symbols (!@#$%)");

    let percentage = (score / 5) * 100;
    bar.style.width = `${percentage}%`;

    if (score <= 2) {
        bar.className = "h-full transition-all duration-300 rounded-full bg-pink-400";
        text.innerText = "Weak 💔";
        text.className = "text-sm font-bold text-pink-500";
        hint.innerText = `Recommendation: Try to ${feedback.join(", ")}.`;
    } else if (score <= 4) {
        bar.className = "h-full transition-all duration-300 rounded-full bg-purple-400";
        text.innerText = "Good ✨";
        text.className = "text-sm font-bold text-purple-600";
        hint.innerText = "Getting stronger! Add more length or symbols for maximum security.";
    } else {
        bar.className = "h-full transition-all duration-300 rounded-full bg-emerald-400";
        text.innerText = "Unbreakable Bestie! 💖";
        text.className = "text-sm font-bold text-emerald-600";
        hint.innerText = "Fantastic password! Highly secure against brute-force attacks.";
    }
}

function generateStrongPassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const input = document.getElementById('passwordInput');
    input.value = password;
    checkPasswordStrength();
    showModal("Password Generated!", "We generated a strong 16-character secure passphrase for you! Copy it safely.", "🔑");
}

// ==================== QUIZ ZONE ====================
function loadQuizQuestion() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    if (currentQuizIndex >= quizQuestions.length) {
        container.innerHTML = `
            <div class="text-center space-y-4 py-8">
                <div class="text-5xl">🎉</div>
                <h3 class="text-2xl font-bold font-cute text-darkPurple">Quiz Completed, Bestie!</h3>
                <p class="text-gray-600">Your Score: <span class="font-bold text-pink-600">${userScore} / ${quizQuestions.length}</span></p>
                <button onclick="resetQuiz()" class="girly-gradient text-white px-8 py-3 rounded-full font-bold shadow-md hover:opacity-90 transition">
                    Try Again 💕
                </button>
            </div>
        `;
        return;
    }

    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quizProgress').innerText = `Question ${currentQuizIndex + 1} of ${quizQuestions.length}`;

    let html = `
        <h3 class="text-lg md:text-xl font-bold font-cute text-darkPurple mb-6">${q.question}</h3>
        <div class="space-y-3 mb-6" id="quizOptionsList">
    `;

    q.options.forEach((opt, idx) => {
        html += `
            <button onclick="selectQuizOption(${idx})" class="quiz-opt-btn w-full text-left p-4 rounded-2xl border border-pink-200 bg-white/70 hover:bg-pink-50 transition font-medium text-gray-700 flex items-center justify-between">
                <span>${opt}</span>
                <span class="w-6 h-6 rounded-full border border-pink-300 flex items-center justify-center text-xs text-pink-500 font-bold">${String.fromCharCode(65 + idx)}</span>
            </button>
        `;
    });

    html += `</div><div id="quizFeedback" class="hidden p-4 rounded-2xl mb-4 text-sm"></div>`;
    container.innerHTML = html;
}

function selectQuizOption(selectedIndex) {
    const q = quizQuestions[currentQuizIndex];
    const optionButtons = document.querySelectorAll('.quiz-opt-btn');
    const feedbackDiv = document.getElementById('quizFeedback');

    // Disable all options after selection
    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correct) {
            btn.classList.add('bg-emerald-100', 'border-emerald-300', 'text-emerald-800');
        } else if (idx === selectedIndex) {
            btn.classList.add('bg-pink-100', 'border-pink-300', 'text-pink-800');
        }
    });

    if (selectedIndex === q.correct) {
        userScore++;
        feedbackDiv.className = "p-4 rounded-2xl mb-4 text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium";
        feedbackDiv.innerHTML = `<i class="fa-solid fa-circle-check mr-1.5 text-emerald-600"></i> Correct! ${q.explanation}`;
    } else {
        feedbackDiv.className = "p-4 rounded-2xl mb-4 text-sm bg-pink-50 border border-pink-200 text-pink-800 font-medium";
        feedbackDiv.innerHTML = `<i class="fa-solid fa-circle-xmark mr-1.5 text-pink-600"></i> Not quite! ${q.explanation}`;
    }

    feedbackDiv.classList.remove('hidden');

    // Add Next Button
    const container = document.getElementById('quizContainer');
    const nextBtnContainer = document.createElement('div');
    nextBtnContainer.className = "text-right";
    nextBtnContainer.innerHTML = `
        <button onclick="nextQuizQuestion()" class="girly-gradient text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:opacity-90 transition">
            Next Question <i class="fa-solid fa-arrow-right ml-1"></i>
        </button>
    `;
    container.appendChild(nextBtnContainer);
}

function nextQuizQuestion() {
    currentQuizIndex++;
    loadQuizQuestion();
}

function resetQuiz() {
    currentQuizIndex = 0;
    userScore = 0;
    loadQuizQuestion();
}

// ==================== AUTH / LOGIN MODAL ====================
function openLoginModal() {
    showModal(
        "Student Sign In",
        "CyberSafe Student Edition uses local browser sessions. Your name will appear on the navigation bar!",
        "🚀"
    );
    // Quick prompt simulation for user name
    setTimeout(() => {
        let name = prompt("Enter your name or student nickname:", currentUser.name);
        if (name && name.trim() !== "") {
            currentUser.name = name.trim();
            currentUser.initial = currentUser.name.charAt(0).toUpperCase();
            currentUser.isLoggedIn = true;

            document.getElementById('userNameDisplay').innerText = currentUser.name;
            document.getElementById('userInitial').innerText = currentUser.initial;
            document.getElementById('userBadge').classList.remove('hidden');
            showModal("Welcome, " + currentUser.name + "! 💕", "You're all signed in and ready to learn cyber safety.", "✨");
        }
    }, 500);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    updateTriviaCard();
    loadQuizQuestion();
});
