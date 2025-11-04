/*
 * JAVASCRIPT LOGIC
 * This is the dedicated JS file for separation of concerns.
 */

window.onload = function() {
    
    // --- 0. Tailwind Configuration Override (MUST be in JS for CDN usage) ---
    // This defines the custom colors and fonts using CSS variables defined in style.css
    if (typeof tailwind !== 'undefined') {
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'dark-primary': 'var(--color-dark-primary)',
                        'dark-secondary': 'var(--color-dark-secondary)',
                        'burgundy-dark': 'var(--color-red-dark)',
                        'burgundy': 'var(--color-red)',
                        'parchment': 'var(--color-beige)',
                        'parchment-light': 'var(--color-beige-light)',
                        'brass': 'var(--color-gold)',
                        'brass-light': 'var(--color-gold-light)',
                    },
                    fontFamily: {
                        'serif': ['Crimson Text', 'serif'],
                        'sans': ['Source Sans 3', 'sans-serif'],
                    },
                },
            },
        };
    }
    
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Global Elements
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Function to toggle mobile menu visibility and icon
    function toggleMenu() {
        // Toggle visibility state by manipulating classes
        mobileMenu.classList.toggle('translate-y-full');
        mobileMenu.classList.toggle('opacity-0');

        // Check if visible
        const isVisible = !mobileMenu.classList.contains('translate-y-full');

        // Toggle icon (Menu <-> X)
        const icon = menuButton.querySelector('i');
        icon.setAttribute('data-lucide', isVisible ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') {
             lucide.createIcons(); // Re-create icons to reflect the change
        }

        // Prevent body scroll when menu is open
        document.body.style.overflow = isVisible ? 'hidden' : '';
    }

    // 2. Mobile Menu Toggle Listener
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }
    
    // Close menu when a link is clicked (for single-page navigation)
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('translate-y-full') === false) {
                toggleMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && menuButton) {
            const isMenuClick = mobileMenu.contains(e.target) || menuButton.contains(e.target);
            if (!isMenuClick && !mobileMenu.classList.contains('translate-y-full')) {
                toggleMenu();
            }
        }
    });

    // Handle dropdown menus on mobile
    const dropdownButtons = document.querySelectorAll('.dropdown-button');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) { // Only on mobile
                e.preventDefault();
                const dropdown = button.nextElementSibling;
                dropdown.classList.toggle('hidden');
                dropdown.classList.toggle('block');
                
                // Toggle chevron icon
                const chevron = button.querySelector('i');
                if (dropdown.classList.contains('hidden')) {
                    chevron.setAttribute('data-lucide', 'chevron-down');
                } else {
                    chevron.setAttribute('data-lucide', 'chevron-up');
                }
                lucide.createIcons();
            }
        });
    });
    
    // 3. Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // 4. Horizontal Scroll Dragging for Testimonials
    const slider = document.getElementById('testimonial-container');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return; 
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            slider.scrollLeft = scrollLeft - walk;
        });

        // Add touch support for mobile
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('touchend', () => {
            isDown = false;
        });
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // 5. Scroll-triggered Morph Animations
    function initScrollMorph() {
        const morphElements = document.querySelectorAll('.morph-scroll, .morph-stagger');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        morphElements.forEach(element => {
            observer.observe(element);
        });
    }

    // 6. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    /*
    // 7. Navbar background on scroll
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-lg', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-white/95', 'backdrop-blur-lg', 'shadow-lg');
        }
        lastScrollY = window.scrollY;
    });
    */
    // Initialize scroll morph after page load
    initScrollMorph();

    // Re-initialize Lucide icons after dynamic content changes
    if (typeof lucide !== 'undefined') {
        setInterval(() => {
            lucide.createIcons();
        }, 1000);
    }

    // Horizontal Scroll for Events
    function initEventsScroll() {
        const eventsContainer = document.getElementById('events-container');
        if (!eventsContainer) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        eventsContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            eventsContainer.style.cursor = 'grabbing';
            startX = e.pageX - eventsContainer.offsetLeft;
            scrollLeft = eventsContainer.scrollLeft;
        });

        eventsContainer.addEventListener('mouseleave', () => {
            isDown = false;
            eventsContainer.style.cursor = 'grab';
        });

        eventsContainer.addEventListener('mouseup', () => {
            isDown = false;
            eventsContainer.style.cursor = 'grab';
        });

        eventsContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - eventsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            eventsContainer.scrollLeft = scrollLeft - walk;
        });

        // Touch support for mobile
        eventsContainer.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - eventsContainer.offsetLeft;
            scrollLeft = eventsContainer.scrollLeft;
        });

        eventsContainer.addEventListener('touchend', () => {
            isDown = false;
        });

        eventsContainer.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - eventsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            eventsContainer.scrollLeft = scrollLeft - walk;
        });

        // Set initial cursor
        eventsContainer.style.cursor = 'grab';
    }

    // Initialize events scroll when page loads
    initEventsScroll();

    // 8. Chatbot Functionality - Fixed Version
    function initChatbot() {
        const chatbotBubble = document.getElementById('chatbot-bubble');
        const chatbotContainer = document.getElementById('chatbot-container');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendMessage = document.getElementById('send-message');

        if (!chatbotBubble || !chatbotContainer) return;

        // Toggle chatbot with proper z-index handling
        chatbotBubble.addEventListener('click', () => {
            chatbotContainer.classList.toggle('hidden');
            // Force high z-index
            chatbotContainer.style.zIndex = '9999';
            document.getElementById('chatbot-bubble').style.zIndex = '9999';
            
            setTimeout(() => {
                chatbotContainer.classList.toggle('show');
                // Focus on input when opening
                setTimeout(() => {
                    chatInput.focus();
                }, 100);
            }, 10);
        });

        // Close chatbot
        closeChat.addEventListener('click', (e) => {
            e.stopPropagation();
            chatbotContainer.classList.remove('show');
            setTimeout(() => {
                chatbotContainer.classList.add('hidden');
            }, 300);
        });

        // Close chatbot when clicking outside
        document.addEventListener('click', (e) => {
            if (chatbotContainer && !chatbotContainer.contains(e.target) && 
                !chatbotBubble.contains(e.target) && 
                !chatbotContainer.classList.contains('hidden')) {
                chatbotContainer.classList.remove('show');
                setTimeout(() => {
                    chatbotContainer.classList.add('hidden');
                }, 300);
            }
        });

        // Send message function
        function sendUserMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                addMessage(message, 'user');
                chatInput.value = '';
                
                // Clear focus and blur to ensure visibility
                chatInput.blur();
                
                // Simulate bot response
                setTimeout(() => {
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse, 'bot');
                    // Refocus on input after bot response
                    setTimeout(() => {
                        chatInput.focus();
                    }, 100);
                }, 1000);
            }
        }

        sendMessage.addEventListener('click', sendUserMessage);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });

        // Quick replies functionality
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', () => {
                const question = button.getAttribute('data-question');
                chatInput.value = question;
                sendUserMessage();
            });
        });

        // Add message to chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `flex items-start space-x-2 mb-4 ${sender === 'user' ? 'justify-end' : ''}`;
            
            if (sender === 'user') {
                messageDiv.innerHTML = `
                    <div class="bg-gradient-to-br from-beige to-beige-dark text-maroon rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-xs border border-beige-dark/50">
                        <p class="text-sm font-medium">${text}</p>
                    </div>
                    <div class="w-6 h-6 bg-maroon rounded-full flex items-center justify-center flex-shrink-0 border border-white/20">
                        <i data-lucide="user" class="w-3 h-3 text-white"></i>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="w-6 h-6 bg-maroon/20 rounded-full flex items-center justify-center flex-shrink-0 border border-maroon/20">
                        <i data-lucide="bot" class="w-3 h-3 text-maroon"></i>
                    </div>
                    <div class="bg-white/90 backdrop-blur-sm text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs border border-beige-dark/30">
                        <p class="text-sm">${text}</p>
                    </div>
                `;
            }
            
            chatMessages.appendChild(messageDiv);
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        // Simple bot responses (keep your existing function)
        function getBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                return "Hello! I'm here to help you explore Penang's rich heritage. What would you like to know?";
            } else if (lowerMessage.includes('heritage') || lowerMessage.includes('unesco')) {
                return "George Town was designated a UNESCO World Heritage Site in 2008 for its unique architectural and cultural townscape.";
            } else if (lowerMessage.includes('tour') || lowerMessage.includes('visit')) {
                return "We offer guided heritage walks every weekend. You can check our Events section for the latest schedule!";
            } else if (lowerMessage.includes('membership') || lowerMessage.includes('join')) {
                return "You can become a member through our Support Us section. Membership helps fund our conservation efforts.";
            } else if (lowerMessage.includes('thank')) {
                return "You're welcome! Is there anything else about Penang's heritage you'd like to know?";
            } else {
                return "That's an interesting question about Penang heritage! For detailed information, please visit our website or contact us directly.";
            }
        }

        // Add pulse animation to bubble
        chatbotBubble.classList.add('chatbot-pulse');
    }

    // Initialize chatbot when page loads
    initChatbot();
};
