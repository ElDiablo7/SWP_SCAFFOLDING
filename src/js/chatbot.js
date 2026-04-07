/**
 * GRACE-X AI™ Chatbot Widget 
 * Powered by SWP Scaffolding Intelligence
 */

const KNOWLEDGE = {
    company: "SWP Scaffolding",
    phone: "07904 693259",
    email: "info@swpscaffolding.co.uk",
    experience: "15+ years of experience in London and Surrey.",
    projects: "Over 3,000 successful projects completed.",
    safety: "100% safety record. All staff are CITB/CISRS trained. TG20:21 compliant.",
    insurance: "£10,000,000 Public Liability Insurance.",
    areas: "We cover London and all major Surrey towns: Croydon, Mitcham, Sutton, Carshalton, Epsom, Kingston, Guildford, Woking, Reigate, Redhill, Balham, Banstead, Bromley, Cheam, Cobham, Leatherhead, Purley, Richmond, Wallington, Wandsworth, Weybridge, Wimbledon.",
    services: "Domestic, Commercial, Industrial, Chimney, Extension, Loft, and Temporary Roof Scaffolding.",
    quoteTime: "Free detailed quotes provided within 24 hours.",
    hours: "Monday to Saturday, 07:00 - 18:00."
};

const PROMPTS = [
    "What areas do you cover?",
    "How much does scaffolding cost?",
    "Do you provide domestic scaffolding?",
    "Are you fully insured?",
    "How quickly can you start?",
    "Do I need a scaffolding permit?"
];

class GraceXChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.voice = null;
        this.init();
    }

    init() {
        // Inject Chatbot styles
        const style = document.createElement('style');
        style.textContent = `
            #grace-x-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: 'Inter', sans-serif;
            }
            #grace-x-btn {
                background: linear-gradient(135deg, var(--electric-blue) 0%, var(--primary-blue) 100%);
                color: #fff;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: var(--button-shadow);
                transition: transform 0.3s ease;
                border: 2px solid rgba(255,255,255,0.2);
            }
            #grace-x-btn:hover {
                transform: scale(1.1);
            }
            #grace-x-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                height: 550px;
                background: var(--bg-card);
                backdrop-filter: blur(20px);
                border: 1px solid var(--electric-blue);
                border-radius: 16px;
                box-shadow: var(--neon-shadow);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                transform-origin: bottom right;
                transform: scale(0);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                pointer-events: none;
            }
            #grace-x-window.open {
                transform: scale(1);
                opacity: 1;
                pointer-events: all;
            }
            .grace-x-header {
                background: linear-gradient(135deg, var(--primary-blue) 0%, var(--bg-dark) 100%);
                padding: 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid var(--glass-border);
            }
            .grace-x-header h4 {
                margin: 0;
                font-family: 'Outfit';
                color: #fff;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .grace-x-status {
                width: 8px;
                height: 8px;
                background: #00ff00;
                border-radius: 50%;
                box-shadow: 0 0 8px #00ff00;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            #grace-x-chat {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 12px;
                scrollbar-width: thin;
                scrollbar-color: var(--electric-blue) transparent;
            }
            .chat-msg {
                max-width: 85%;
                padding: 12px 16px;
                border-radius: 14px;
                font-size: 0.95rem;
                line-height: 1.5;
            }
            .chat-msg.bot {
                background: rgba(0, 174, 239, 0.1);
                border: 1px solid rgba(0, 174, 239, 0.3);
                color: #fff;
                align-self: flex-start;
                border-bottom-left-radius: 2px;
            }
            .chat-msg.user {
                background: var(--electric-blue);
                color: #fff;
                align-self: flex-end;
                border-bottom-right-radius: 2px;
            }
            .grace-x-prompts {
                padding: 10px 15px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                border-top: 1px solid var(--glass-border);
            }
            .prompt-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid var(--glass-border);
                color: var(--text-muted);
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: 0.3s;
            }
            .prompt-btn:hover {
                background: var(--electric-blue);
                color: #fff;
                border-color: var(--electric-blue);
            }
            .grace-x-input {
                padding: 15px;
                border-top: 1px solid var(--glass-border);
                display: flex;
                gap: 10px;
                background: rgba(10, 10, 15, 0.9);
            }
            .grace-x-input input {
                flex: 1;
                padding: 12px 18px;
                border-radius: 25px;
                border: 1px solid var(--glass-border);
                background: rgba(255,255,255,0.05);
                color: #fff;
                outline: none;
                font-size: 0.95rem;
            }
            .grace-x-input input:focus {
                border-color: var(--electric-blue);
                background: rgba(255,255,255,0.08);
            }
            .grace-x-input button {
                background: var(--electric-blue);
                border: none;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 15px rgba(0, 174, 239, 0.3);
            }
            .grace-x-input button:hover {
                transform: scale(1.1) rotate(5deg);
            }
            
            @media (max-width: 480px) {
                #grace-x-window {
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Inject DOM
        const widget = document.createElement('div');
        widget.id = 'grace-x-widget';
        widget.innerHTML = `
            <div id="grace-x-window">
                <div class="grace-x-header">
                    <h4><div class="grace-x-status"></div> GRACE-X AI™</h4>
                    <button id="grace-x-close" style="background:none; border:none; color:#fff; cursor:pointer; font-size:1.5rem;">&times;</button>
                </div>
                <div id="grace-x-chat"></div>
                <div class="grace-x-prompts" id="grace-x-prompts"></div>
                <form class="grace-x-input" id="grace-x-form">
                    <input type="text" id="grace-x-msg" placeholder="Ask Grace X..." autocomplete="off">
                    <button type="submit">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>
            <div id="grace-x-btn">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M12 2C6.48 2 2 5.58 2 10c0 2.5 1.45 4.73 3.73 6.13-.35 1.55-1.38 3.23-1.42 3.3-.1.17-.06.39.1.51.15.11.35.12.51.03 2.5-1.4 4.38-1.55 5.58-1.53.5.04.98.06 1.5.06 5.52 0 10-3.58 10-8s-4.48-8-10-8M12 16.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m-4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m8 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"/></svg>
            </div>
        `;
        document.body.appendChild(widget);

        // Render Prompts
        const promptContainer = document.getElementById('grace-x-prompts');
        PROMPTS.forEach(q => {
            const btn = document.createElement('button');
            btn.className = 'prompt-btn';
            btn.innerText = q;
            btn.onclick = () => this.handlePromptClick(q);
            promptContainer.appendChild(btn);
        });

        // Initialize Voice Search
        this.loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }

        // Bind events
        document.getElementById('grace-x-btn').addEventListener('click', () => this.toggleWindow());
        document.getElementById('grace-x-close').addEventListener('click', () => this.toggleWindow(false));
        document.getElementById('grace-x-form').addEventListener('submit', (e) => this.handleSubmit(e));

        // Greeting
        this.addMessage("Hello! I am **GRACE-X**, your expert assistant at **SWP Scaffolding**. How can I help you dominate your project today?", 'bot');
    }

    loadVoices() {
        const voices = speechSynthesis.getVoices();
        // Look for Google UK English Female
        this.voice = voices.find(v => v.name === 'Google UK English Female') || 
                     voices.find(v => v.lang === 'en-GB' && v.name.includes('Female')) ||
                     voices.find(v => v.lang === 'en-GB') ||
                     voices[0];
    }

    speak(text) {
        if (!window.speechSynthesis) return;
        
        // Remove HTML tags for speaking
        const plainText = text.replace(/<[^>]*>?/gm, '');
        
        const utterance = new SpeechSynthesisUtterance(plainText);
        if (this.voice) utterance.voice = this.voice;
        
        // Exact settings requested by user
        utterance.rate = 1.12; 
        utterance.pitch = 1.19;
        utterance.volume = 1.0; 
        
        speechSynthesis.speak(utterance);
    }

    toggleWindow(forceState) {
        const win = document.getElementById('grace-x-window');
        this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
        if (this.isOpen) {
            win.classList.add('open');
            document.getElementById('grace-x-msg').focus();
        } else {
            win.classList.remove('open');
            speechSynthesis.cancel(); // Stop speaking on close
        }
    }

    addMessage(text, sender) {
        const chat = document.getElementById('grace-x-chat');
        const msg = document.createElement('div');
        msg.className = `chat-msg ${sender}`;
        msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;

        if (sender === 'bot') {
            this.speak(text);
        }
    }

    handlePromptClick(text) {
        this.addMessage(text, 'user');
        this.simulateLLMResponse(text);
    }

    handleSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('grace-x-msg');
        const text = input.value.trim();
        if (!text) return;
        this.addMessage(text, 'user');
        input.value = '';
        this.simulateLLMResponse(text);
    }

    simulateLLMResponse(userText) {
        const chat = document.getElementById('grace-x-chat');
        const typing = document.createElement('div');
        typing.className = 'chat-msg bot';
        typing.innerHTML = '<i>Processing...</i>';
        chat.appendChild(typing);
        chat.scrollTop = chat.scrollHeight;

        setTimeout(() => {
            chat.removeChild(typing);
            const low = userText.toLowerCase();
            let r = "I can definitely help with that. **SWP Scaffolding** provides safe and precise access solutions. ";

            if (low.includes('area') || low.includes('cover') || low.includes('location')) {
                r = `We cover **London** and all major **Surrey** towns including ${KNOWLEDGE.areas}. We have local depots for fast deployment.`;
            } else if (low.includes('cost') || low.includes('price') || low.includes('quote')) {
                r = `Scaffolding costs depend on height and duration. At **SWP**, we offer fixed-price transparency. ${KNOWLEDGE.quoteTime} <a href='/get-quote' style='color:var(--safety-yellow)'>Get a quote here</a>.`;
            } else if (low.includes('domestic') || low.includes('house') || low.includes('home')) {
                r = `We are specialists in **Domestic Scaffolding**. From roof repairs to extensions, we ensure your home project is safe and secure.`;
            } else if (low.includes('insur') || low.includes('safe')) {
                r = `Safety is our priority: ${KNOWLEDGE.safety} We are fully protected with **${KNOWLEDGE.insurance}** Public Liability Insurance.`;
            } else if (low.includes('start') || low.includes('fast') || low.includes('quick')) {
                r = `We move fast! We provide quotes within 24 hours and can often begin work shortly after approval. Call us at **${KNOWLEDGE.phone}** for urgent needs.`;
            } else if (low.includes('permit') || low.includes('license')) {
                r = `If the scaffold is on public land, a council permit is required. **SWP Scaffolding handles the entire permit application process for you.**`;
            } else if (low.includes('commercial') || low.includes('industrial')) {
                r = `We handle large-scale **Commercial and Industrial** projects with heavy-duty requirements and TG20:21 compliance.`;
            } else {
                r += "For a specific technical inquiry or a fixed-price estimate, would you like to speak with our planning team? <a href='/get-quote' style='color:var(--safety-yellow)'>Request a callback</a>.";
            }

            this.addMessage(r, 'bot');
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GraceXChatbot();
});
