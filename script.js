// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Navbar Transparency on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form Submission with Validation and Loading State
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic Validation
        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const message = form.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! I’ll get back to you soon.');
            form.reset();
            submitButton.textContent = 'Send';
            submitButton.disabled = false;
        }, 1500);
    });

    // Scroll Animations for Sections
    const sections = document.querySelectorAll('.section-hidden');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Insight Card Modal
    const insightCards = document.querySelectorAll('.insight-card');
    insightCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent;
            const description = card.querySelector('p').textContent;

            // Create Modal
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">×</span>
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <p>This is a placeholder for the full blog post content. Add your detailed story or insights here!</p>
                </div>
            `;
            document.body.appendChild(modal);

            // Close Modal
            const closeButton = modal.querySelector('.modal-close');
            closeButton.addEventListener('click', () => {
                modal.remove();
            });

            // Close on Outside Click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
});