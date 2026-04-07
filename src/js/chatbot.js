/**
 * GRACE-X AI™ Chatbot Widget
 * Acts as a scaffolding expert to qualify leads and push to the quote form.
 */

const SYSTEM_PROMPT = `
You are GRACE-X AI™, operating as a scaffolding expert for SWP Scaffolding.
You understand: Domestic scaffolding, Commercial scaffolding, Safety regulations, UK permits.
Your goal: Qualify leads, Provide accurate answers, Push user to GET A QUOTE.
Always: Be professional, Be clear, Be helpful, Convert the user.
`;

class GraceXChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
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
            #grace-x-btn svg {
                width: 30px;
                height: 30px;
                fill: currentColor;
            }
            #grace-x-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: var(--bg-card);
                border: 1px solid var(--electric-blue);
                border-radius: 12px;
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
            }
            #grace-x-chat {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .chat-msg {
                max-width: 85%;
                padding: 10px 14px;
                border-radius: 12px;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            .chat-msg.bot {
                background: rgba(0, 174, 239, 0.1);
                border: 1px solid rgba(0, 174, 239, 0.3);
                color: #fff;
                align-self: flex-start;
                border-bottom-left-radius: 2px;
            }
            .chat-msg.user {
                background: var(--text-muted);
                color: #000;
                align-self: flex-end;
                border-bottom-right-radius: 2px;
            }
            .chat-msg a {
                color: var(--safety-yellow);
                text-decoration: underline;
                font-weight: bold;
            }
            .grace-x-input {
                padding: 15px;
                border-top: 1px solid var(--glass-border);
                display: flex;
                gap: 10px;
                background: var(--bg-dark);
            }
            .grace-x-input input {
                flex: 1;
                padding: 10px 15px;
                border-radius: 20px;
                border: 1px solid var(--glass-border);
                background: rgba(255,255,255,0.05);
                color: #fff;
                outline: none;
            }
            .grace-x-input input:focus {
                border-color: var(--electric-blue);
            }
            .grace-x-input button {
                background: var(--electric-blue);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 0.2s;
            }
            .grace-x-input button:hover {
                transform: scale(1.1);
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
                    z-index: 10000;
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
                    <button id="grace-x-close" style="background:none; border:none; color:#fff; cursor:pointer; font-size:1.5rem; line-height:1;">&times;</button>
                </div>
                <div id="grace-x-chat"></div>
                <form class="grace-x-input" id="grace-x-form">
                    <input type="text" id="grace-x-msg" placeholder="Ask about scaffolding..." autocomplete="off">
                    <button type="submit">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>
            <div id="grace-x-btn">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 5.58 2 10c0 2.5 1.45 4.73 3.73 6.13-.35 1.55-1.38 3.23-1.42 3.3-.1.17-.06.39.1.51.15.11.35.12.51.03 2.5-1.4 4.38-1.55 5.58-1.53.5.04.98.06 1.5.06 5.52 0 10-3.58 10-8s-4.48-8-10-8M12 16.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m-4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m8 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"/></svg>
            </div>
        `;
        document.body.appendChild(widget);

        // Bind events
        document.getElementById('grace-x-btn').addEventListener('click', () => this.toggleWindow());
        document.getElementById('grace-x-close').addEventListener('click', () => this.toggleWindow(false));
        document.getElementById('grace-x-form').addEventListener('submit', (e) => this.handleSubmit(e));

        // Initial Greeting
        this.addMessage("Hello! I am GRACE-X, the SWP Scaffolding expert assistant. How can I help you with your project today? Need a <a href='/get-quote'>fast quote</a>?", 'bot');
    }

    toggleWindow(forceState) {
        const win = document.getElementById('grace-x-window');
        this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
        
        if (this.isOpen) {
            win.classList.add('open');
            document.getElementById('grace-x-msg').focus();
        } else {
            win.classList.remove('open');
        }
    }

    addMessage(text, sender) {
        const chat = document.getElementById('grace-x-chat');
        const msg = document.createElement('div');
        msg.className = \`chat-msg \${sender}\`;
        msg.innerHTML = text;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
    }

    handleSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('grace-x-msg');
        const text = input.value.trim();
        
        if (!text) return;

        this.addMessage(text, 'user');
        input.value = '';

        // Simulate AI thinking and response
        this.simulateLLMResponse(text);
    }

    simulateLLMResponse(userText) {
        // Create typing indicator
        const chat = document.getElementById('grace-x-chat');
        const typing = document.createElement('div');
        typing.className = 'chat-msg bot typing-indicator';
        typing.innerHTML = '<i>Analyzing...</i>';
        chat.appendChild(typing);
        chat.scrollTop = chat.scrollHeight;

        // Simulated AI logic prioritizing quote generation
        setTimeout(() => {
            chat.removeChild(typing);
            const lowerText = userText.toLowerCase();
            let reply = "I can definitely help with that. To give you the most accurate advice and timeline, we should arrange a formal estimate. ";
            
            if (lowerText.includes('cost') || lowerText.includes('price') || lowerText.includes('how much')) {
                reply = "Scaffolding costs vary based on height, duration, and structure type. To get an exact, fixed-price from SWP, please <a href='/get-quote'>fill out our quick quote form</a> and we'll reply within 24 hours.";
            } else if (lowerText.includes('permit') || lowerText.includes('license') || lowerText.includes('council')) {
                reply = "If the scaffold sits on a public pavement/road, a council permit is required. Don't worry—we handle the entire application process for you! Shall we <a href='/get-quote'>get a quote started</a> to see if you need one?";
            } else if (lowerText.includes('safe') || lowerText.includes('tg20')) {
                reply = "Safety is non-negotiable. All our builds are TG20:21 compliant and our staff are CISRS trained. Would you like to <a href='/get-quote'>get a quote</a> for your project knowing you are in safe hands?";
            } else if (lowerText.includes('domestic') || lowerText.includes('house') || lowerText.includes('extension')) {
                reply = "We are specialists in domestic scaffolding! Whether it's a roof repair or a double-storey extension, we provide safe access. You can <a href='/get-quote'>request a quote here</a>.";
            } else {
                reply += "Why don't you <a href='/get-quote'>head over to our quote page</a> so we can capture your project details?";
            }

            this.addMessage(reply, 'bot');
        }, 800);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new GraceXChatbot();
});
