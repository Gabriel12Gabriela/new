/* Step 3: Navigation Menu Interactivity */

// Toggle navigation menu visibility
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Attach event listener to hamburger icon
document.getElementById('hamburger').addEventListener('click', toggleMenu);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Optionally close menu on mobile
            document.getElementById('nav-menu').classList.remove('active');
        }
    });
});

/* Step 4: Portfolio Section Interactivity */

// Filter projects by category
function filterProjects(category) {
    document.querySelectorAll('.project').forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Attach event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        filterProjects(this.dataset.category);
    });
});

// Lightbox effect for project images
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Attach event listeners to project images
document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('click', function() {
        openLightbox(this.src);
    });
});

// Close lightbox when clicking outside image or on close button
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this || e.target.classList.contains('close-btn')) {
        closeLightbox();
    }
});

/* Step 5: Contact Form Validation */

// Real-time validation feedback
function validateField(field, validator) {
    const errorSpan = field.nextElementSibling;
    if (validator(field.value)) {
        errorSpan.textContent = '';
        field.classList.remove('invalid');
    } else {
        errorSpan.textContent = field.dataset.error;
        field.classList.add('invalid');
    }
}

// Validators
const validators = {
    name: val => val.trim().length > 0,
    email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    message: val => val.trim().length > 0
};

// Attach input event listeners for real-time feedback
['name', 'email', 'message'].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('input', () => validateField(field, validators[id]));
});

// Form submission validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    let valid = true;
    ['name', 'email', 'message'].forEach(id => {
        const field = document.getElementById(id);
        validateField(field, validators[id]);
        if (field.classList.contains('invalid')) valid = false;
    });
    if (!valid) {
        e.preventDefault();
        document.getElementById('form-error').textContent = 'Please correct the errors above.';
    } else {
        document.getElementById('form-error').textContent = '';
    }
});