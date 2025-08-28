// Dark Translucent Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavbar();
    initializeScrollAnimations();
    initializeProjectCards();
    initializeSmoothScrolling();
});

// Navbar functionality with translucent effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const rightPanel = document.getElementById('right-panel') || window;

    // Set education as default active nav link on page load
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#education') {
            link.classList.add('active');
        }
    });

    // Function to determine scroll container based on screen size
    function getScrollContainer() {
        return window.innerWidth <= 768 ? window : rightPanel;
    }

    // Add scrolled class for backdrop effect based on right panel scroll
    function handleScroll() {
        const scrollContainer = getScrollContainer();
        const scrollTop = (scrollContainer === window) ? window.scrollY : scrollContainer.scrollTop;

        if (scrollTop > 50) {
            navbar && navbar.classList.add('scrolled');
        } else {
            navbar && navbar.classList.remove('scrolled');
        }

        // Active nav link highlighting
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const threshold = window.innerWidth <= 768 ? 100 : 200;

            if (scrollContainer === window) {
                if (rect.top <= threshold) {
                    current = section.getAttribute('id');
                }
            } else {
                const containerTop = scrollContainer.getBoundingClientRect().top;
                const sectionTop = rect.top - containerTop + scrollContainer.scrollTop;

                if (sectionTop <= scrollContainer.scrollTop + threshold) {
                    current = section.getAttribute('id');
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Attach scroll listeners
    rightPanel.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);

    // Handle window resize
    window.addEventListener('resize', () => {
        handleScroll(); // Re-evaluate on resize
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const rightPanel = document.getElementById('right-panel');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                // Determine scroll container based on screen size
                const isMobile = window.innerWidth <= 768;

                if (isMobile) {
                    // On mobile, scroll the window
                    const offsetTop = target.getBoundingClientRect().top + window.scrollY - 20;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                } else if (rightPanel) {
                    // On desktop, scroll the right panel
                    const containerTop = rightPanel.getBoundingClientRect().top;
                    const targetTop = target.getBoundingClientRect().top - containerTop + rightPanel.scrollTop - 20;
                    rightPanel.scrollTo({ top: targetTop, behavior: 'smooth' });
                } else {
                    // Fallback
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });
}

// Scroll animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate counters for stats
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }

                // Stagger timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const items = entry.target.parentNode.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced project cards with glass morphism effects
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const image = card.querySelector('.project-image img');

        card.addEventListener('mouseenter', function() {
            // Add glass morphism glow effect
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.4)';

            if (overlay) {
                overlay.style.opacity = '1';
            }

            if (image) {
                image.style.transform = 'scale(1.1) rotate(2deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)';

            if (overlay) {
                overlay.style.opacity = '0';
            }

            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(102, 126, 234, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x - 10}px;
                top: ${y - 10}px;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(10);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}


// Add floating animation CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(floatingStyle);


window.addEventListener('scroll', debouncedScrollHandler);
