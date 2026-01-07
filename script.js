// ===== CV DOWNLOAD FIXÉ =====
function downloadCV() {
    window.open('CV.pdf', '_blank');
}

// ===== NAV MOBILE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ===== ANIMATIONS SCROLL + SKILLS =====
window.addEventListener('scroll', () => {
    document.querySelectorAll('.animate, .animate-delay, .animate-delay2, .animate-delay3').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('fade-in');
        }
    });
    
    document.querySelectorAll('.project-card').forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transitionDelay = `${i * 0.1}s`;
        }
    });
});

// ===== CHATBOT IA AVANCÉE =====
class AdvancedChatbot {
    constructor() {
        this.apiKey = 'YOUR_OPENAI_API_KEY'; // À remplacer
        this.conversationHistory = [];
        this.isTyping = false;
        
        this.init();
    }

    init() {
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotWindow = document.getElementById('chatbot-window');
        this.chatbotClose = document.getElementById('chatbot-close');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotMessages = document.getElementById('chatbot-messages');

        this.chatbotToggle.addEventListener('click', () => this.toggleChat());
        this.chatbotClose.addEventListener('click', () => this.closeChat());
        this.chatbotSend.addEventListener('click', () => this.sendMessage());
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick buttons
        this.quickButtons = [
            { text: '💻 Projets BTS', intent: 'projets' },
            { text: '⭐ Compétences', intent: 'competences' },
            { text: '📄 CV', intent: 'cv' },
            { text: '📞 Contact', intent: 'contact' },
            { text: '🎓 Parcours', intent: 'parcours' },
            { text: '🚀 IA Avancée', intent: 'ia' }
        ];
        this.renderQuickButtons();
    }

    toggleChat() {
        this.chatbotWindow.classList.toggle('open');
        if (this.chatbotWindow.classList.contains('open')) {
            this.addMessage('bot', 'Bonjour ! Je suis Grok, l\'IA du portfolio de Giovanni BINTOUL (BTS SIO SLAM). Posez-moi n\'importe quelle question technique ! 🚀');
        }
    }

    closeChat() {
        this.chatbotWindow.classList.remove('open');
    }

    renderQuickButtons() {
        const buttonsHtml = this.quickButtons.map(btn => 
            `<button class="quick-btn" onclick="chatbot.handleQuick('${btn.intent}')">${btn.text}</button>`
        ).join('');
        this.addMessage('bot', buttonsHtml, false);
    }

    handleQuick(intent) {
        const quickResponses = {
            projets: 'Mes projets BTS SIO : 1️⃣ **PHP/MySQL** - App gestion complète\n2️⃣ **React/Node.js** - Plateforme moderne\nCode sur GitHub : senvi27',
            competences: '⭐ **Frontend** : HTML/CSS 92% | JS 87%\n⭐ **Backend** : PHP 82% | MySQL 88%\n⭐ **DevOps** : Git 95% | Docker 78%',
            cv: '📄 Cliquez **Télécharger CV** (en haut à droite) ou visitez https://senvi27.github.io/CV.pdf',
            contact: '📧 giovannibintoul46@gmail.com\n💻 GitHub: senvi27\n📱 WhatsApp: +594694493899\n📸 @p1nk2s',
            parcours: '🎓 **BTS SIO SLAM** 2024-2026\n🏫 Lycée Melkior-Garré (Cayenne)\n💼 Stage Collège Auguste Déde (2025)',
            ia: '🤖 IA intégrée ! Demandez-moi du code PHP, React, SQL ou conseils BTS SIO !'
        };
        this.addMessage('user', this.quickButtons.find(b => b.intent === intent).text);
        this.addMessage('bot', quickResponses[intent]);
    }

    async sendMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message || this.isTyping) return;

        this.addMessage('user', message);
        this.chatbotInput.value = '';
        this.isTyping = true;

        // Quick responses pour portfolio
        const quickResponse = this.getQuickResponse(message.toLowerCase());
        if (quickResponse) {
            setTimeout(() => {
                this.addMessage('bot', quickResponse);
                this.isTyping = false;
            }, 800);
            return;
        }

        // IA Avancée (OpenAI/Grok)
        try {
            const aiResponse = await this.getAIResponse(message);
            this.addMessage('bot', `🤖 ${aiResponse}`);
        } catch (error) {
            this.addMessage('bot', '🚀 IA en maintenance. Essayez "projets", "cv", "compétences" ou "contact" !');
        } finally {
            this.isTyping = false;
        }
    }

    getQuickResponse(message) {
        const responses = {
            'bonjour': 'Salut ! Bienvenue sur le portfolio de Giovanni BINTOUL (BTS SIO SLAM) 🚀',
            'projet': '2 projets BTS : PHP/MySQL + React/Node.js. Code sur GitHub senvi27 !',
            'compétence': 'HTML/CSS 92%, JS 87%, PHP 82%, MySQL 88%, Git 95% !',
            'cv': '📄 Bouton en haut à droite ou https://senvi27.github.io/CV.pdf',
            'contact': 'giovannibintoul46@gmail.com | senvi27 (GitHub)',
            'bts': 'BTS SIO SLAM 2024-2026 • Lycée Melkior-Garré',
            'stage': 'Stage Collège Auguste Déde (2025) + Securidom (2024)',
            'php': 'Expert PHP 8/MySQL pour BTS SIO ! Demandez du code 🚀',
            'react': 'React/Node.js pour projet 2ème année BTS !',
            'code': 'Besoin de code ? Dites-moi PHP, SQL, JS ou React ! 💻'
        };

        for (let key in responses) {
            if (message.includes(key)) return responses[key];
        }
        return null;
    }

    async getAIResponse(message) {
        // Simulation IA avancée (remplace par vraie API)
        const portfolioContext = `Portfolio BTS SIO SLAM de Giovanni BINTOUL. Compétences: PHP 82%, MySQL 88%, JS 87%. Projets: PHP/MySQL + React/Node.js. Contact: giovannibintoul46@gmail.com`;
        
        const prompts = {
            code: `Génère du code ${message} pour BTS SIO (PHP/JS/SQL). Explique simplement.`,
            conseil: `Conseil ${message} pour étudiant BTS SIO SLAM`,
            projet: `Idée projet ${message} pour BTS SIO`
        };

        // IA contextuelle
        if (message.includes('code') || message.includes('php') || message.includes('sql')) {
            return `💻 **CODE BTS SIO**\n\`\`\`php\n// Exemple ${message}\n<?php echo "Bonjour BTS!"; ?>\n\`\`\`\nCopie-colle dans VSCode ! 🚀`;
        }

        return `Génial ! Pour "${message}" :\n\n${portfolioContext}\n\nBesoin de **code PHP/SQL** ou **conseils BTS** ? 💻`;
    }

    addMessage(sender, text, isHtml = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (isHtml) {
            messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        } else {
            messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        }
        
        this.chatbotMessages.appendChild(messageDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }
}

// ===== INITIALISATION =====
const chatbot = new AdvancedChatbot();

// ===== COOKIES =====
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
    });

    // Cookies
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => cookieBanner.classList.add('active'), 2000);
    }

    document.getElementById('accept-cookies')?.addEventListener('click', () => {
        document.getElementById('cookie-banner').classList.remove('active');
        localStorage.setItem('cookiesAccepted', 'true');
    });

    document.getElementById('refuse-cookies')?.addEventListener('click', () => {
        document.getElementById('cookie-banner').classList.remove('active');
    });
});
