// ===== CV DOWNLOAD PDF CORRIGÉ =====
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'CV.pdf';
    link.download = 'CV_Giovanni_Bintoul_BTS_SIO.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== CHATBOT INTELLIGENT =====
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

let isTyping = false;

const responses = {
    'bonjour': 'Bonjour ! Bienvenue sur le portfolio de Giovanni BINTOUL, étudiant BTS SIO SLAM (Lycée Melkior-Garré). Comment puis-je vous aider ? 😊',
    'projet': '2 projets BTS SIO : Projet 1ère année (PHP/MySQL) + Projet 2ème année (JavaScript/React/Node.js). Faites défiler vers "Projets" 👇',
    'compétences': 'Compétences : HTML/CSS/JS (92%), PHP 8 (82%), MySQL (88%), Git/GitHub (95%), Docker (78%). Section "Compétences" ci-dessous !',
    'cv': '📄 Cliquez "Télécharger CV" (bouton en haut à droite) pour obtenir le CV PDF de Giovanni BINTOUL (BTS SIO SLAM) !',
    'contact': '📞 giovannibintoul46@gmail.com | GitHub: senvi27 | WhatsApp: +594 06 94 49 38 99 | Instagram: @p1nk2s',
    'bts': 'BTS SIO SLAM 2024-2026 au Lycée Melkior-Garré (Cayenne). Spécialité Solutions Logicielles et Applications Métiers.',
    'stage': 'Stage informatique Collège Auguste Déde (juin-juillet 2025) + Stage Securidom (janvier-février 2024). Détails dans le CV !',
    'default': 'Dites-moi "projets", "compétences", "cv", "contact", "bts" ou "stage" pour des infos précises ! 🚀'
};

function getBotResponse(message) {
    const msg = message.toLowerCase();
    for (let key in responses) {
        if (msg.includes(key)) return responses[key];
    }
    return responses['default'];
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message || isTyping) return;

    addMessage('user', message);
    chatbotInput.value = '';

    isTyping = true;
    const typingMsg = addMessage('bot', '⏳ Réponse en cours...');
    
    setTimeout(() => {
        typingMsg.remove();
        const response = getBotResponse(message);
        addMessage('bot', response);
        isTyping = false;
    }, 1200);
}

function addMessage(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return messageDiv;
}

chatbotToggle.addEventListener('click', () => chatbotWindow.classList.toggle('open'));
chatbotClose.addEventListener('click', () => chatbotWindow.classList.remove('open'));
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

// ===== COOKIES =====
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');
const refuseCookies = document.getElementById('refuse-cookies');

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    return document.cookie.split(';').find(row => row.startsWith(nameEQ))?.split('=')[1];
}

if (!getCookie('cookies_accepted')) {
    setTimeout(() => cookieBanner.classList.add('active'), 2500);
}

acceptCookies.addEventListener('click', () => {
    setCookie('cookies_accepted', 'true', 365);
    cookieBanner.style.display = 'none';
});
refuseCookies.addEventListener('click', () => {
    setCookie('cookies_accepted', 'false', 30);
    cookieBanner.style.display = 'none';
});

// ===== NAVIGATION + ANIMATIONS =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

window.addEventListener('load', () => {
    document.querySelector('.hero-title').classList.add('fade-in');
    document.querySelector('.hero-subtitle').classList.add('fade-in', 'animate-delay');
    document.querySelector('.hero-stats').classList.add('fade-in', 'animate-delay2');
    document.querySelector('.cta-button').classList.add('fade-in', 'animate-delay3');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card, .skill-category').forEach(el => observer.observe(el));

const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.style.width = entry.target.dataset.width;
    });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255,255,255,1)';
        navbar.style.boxShadow = '0 5px 25px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = 'none';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
