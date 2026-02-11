// YESFIRE MOVIMENT - SCRIPT

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Header Effect ---
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(17, 17, 17, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(17, 17, 17, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // --- 3. Enhanced Navigation Handling ---
    const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Always close mobile menu
            nav.classList.remove('active');
            burger.classList.remove('toggle');

            const href = this.getAttribute('href');

            // If it's a hash link on the CURRENT page
            if (href.startsWith('#') || (href.includes(window.location.pathname.split('/').pop()) && href.includes('#'))) {
                // Extract hash part
                const hashIndex = href.indexOf('#');
                const targetId = href.substring(hashIndex);
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // Otherwise, let valid default navigation happen (to other pages)
        });
    });

    // --- 4. Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .pillar-card, .vision-text, .info-box');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- 5. Dynamic Year/Counter Effect ---
    const yearSpan = document.getElementById('year-counter');
    if (yearSpan) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                yearSpan.style.textShadow = '2px 2px 0px #ff4937, -2px -2px 0px #4d8ca6';
                setTimeout(() => {
                    yearSpan.style.textShadow = 'none';
                }, 100);
            }
        }, 1000);
    }

    // --- 6. Typewriter Effect (Hero Logic) ---
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const words = ["GRAÇA", "AMOR", "REI", "AMIGO", "FIRE", "CAMINHO", "VIDA", "VERDADE", "SALVADOR", "TUDO"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Deleting speed
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; // Typing speed
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Word complete, wait before deleting
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                // Deletion complete, move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Start Typewriter
        type();
    }

    console.log("YESFIRE LOADED. JESUS É TUDO.");
});
