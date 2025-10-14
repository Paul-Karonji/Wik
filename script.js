// =================================================================
// WIK Technologies - JavaScript
// =================================================================

// Initialize EmailJS with your public key
(function() {
    emailjs.init('zbHVK85AviQi2jxKn');
})();

// Page Navigation System
function showPage(pageName) {
    console.log('Navigating to:', pageName);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Showing page:', pageName);
    } else {
        console.error('Page not found:', pageName);
    }
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Make function globally available
window.showPage = showPage;

// Contact Form Submission Handler with EmailJS
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const message = document.getElementById('contact-message').value;
    const submitButton = document.querySelector('.submit-button');
    
    // Validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields (Name, Email, and Message).');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.style.opacity = '0.7';
    submitButton.style.cursor = 'not-allowed';
    
    // EmailJS configuration
    const serviceID = 'service_mryibz6';
    const templateID = 'template_4rgnz7d';
    
    // Prepare template parameters to match your EmailJS template exactly
    // Time is automatically generated when the form is submitted
    const templateParams = {
        name: name,
        email: email,
        phone: phone || 'Not provided',
        message: message,
        title: 'New Contact Form Submission',
        time: new Date().toLocaleString('en-US', { 
            dateStyle: 'full', 
            timeStyle: 'short',
            timeZone: 'Africa/Nairobi'
        })
    };
    
    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            alert(`Thank you ${name}! Your message has been sent successfully. We'll contact you at ${email} soon.`);
            
            // Clear form
            document.getElementById('contact-name').value = '';
            document.getElementById('contact-email').value = '';
            document.getElementById('contact-phone').value = '';
            document.getElementById('contact-message').value = '';
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            
            // Show error message
            alert('Oops! Something went wrong while sending your message. Please try again or email us directly at wik.techsolutions@gmail.com');
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        });
    
    return false;
}

// Make function globally available
window.handleSubmit = handleSubmit;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('WIK Technologies website loaded successfully');
    console.log('EmailJS initialized and ready');
    
    // Make sure home page is active on load
    showPage('home');
    
    // Check if logo image exists and show it
    const logoImg = document.querySelector('.logo-img');
    const logoText = document.querySelector('.logo-text');
    
    if (logoImg) {
        logoImg.onerror = function() {
            // If logo image fails to load, hide it and show text logo
            this.style.display = 'none';
            if (logoText) logoText.style.display = 'flex';
        };
        
        logoImg.onload = function() {
            // If logo image loads successfully, hide text logo
            this.style.display = 'block';
            if (logoText) logoText.style.display = 'none';
        };
        
        // Check if image source is valid
        if (!logoImg.src || logoImg.src.includes('logo.png')) {
            // Default to text logo until real logo is added
            logoImg.style.display = 'none';
            if (logoText) logoText.style.display = 'flex';
        }
    }
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
});

// Add scroll effect to navigation
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

// Add animation to service cards on scroll
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.service-card, .project-card, .value-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

console.log('WIK Technologies - All scripts loaded successfully');
console.log('EmailJS Service ID:', 'service_mryibz6');
console.log('EmailJS Template ID:', 'template_4rgnz7d');