// Menu Toggle para dispositivos móviles
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const telefono = contactForm.querySelector('input[type="tel"]').value;
        const plan = contactForm.querySelector('select').value;
        const mensaje = contactForm.querySelector('textarea').value;

        // Validar campos
        if (!nombre || !email || !telefono || !plan || !mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor ingresa un email válido');
            return;
        }

        // Mostrar mensaje de éxito
        showSuccessMessage();

        // Limpiar formulario
        contactForm.reset();
    });
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4a4a4a;
        color: white;
        padding: 20px 30px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideInRight 0.5s ease;
        border-left: 4px solid #808080;
    `;
    successDiv.textContent = '✓ Mensaje enviado correctamente. Nos contactaremos pronto.';
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => successDiv.remove(), 500);
    }, 4000);
}

// Agregar estilos para animaciones de mensaje
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Función para contactar con un plan específico
function contactarPlan(nombrePlan) {
    const contactoSection = document.getElementById('contacto');
    contactoSection.scrollIntoView({ behavior: 'smooth' });

    // Establecer el plan en el formulario
    setTimeout(() => {
        const selectElement = contactForm.querySelector('select');
        if (selectElement) {
            selectElement.value = nombrePlan.toLowerCase();
        }
    }, 500);
}

// Animación de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos de servicio
document.querySelectorAll('.servicio-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Copiar teléfono al portapapeles
document.querySelectorAll('.info-item a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (navigator.clipboard) {
            e.preventDefault();
            const phone = link.textContent;
            navigator.clipboard.writeText(phone).then(() => {
                const original = link.textContent;
                link.textContent = '✓ Copiado';
                setTimeout(() => {
                    link.textContent = original;
                }, 2000);
            });
        }
    });
});

// Efecto de scroll suave para navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
    }
});

// Validación en tiempo real del formulario
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('focus', () => {
            removeError(input);
        });
    });
}

function validateField(field) {
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showFieldError(field, 'Email inválido');
        }
    } else if (field.type === 'tel') {
        const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
        if (field.value && !phoneRegex.test(field.value)) {
            showFieldError(field, 'Teléfono inválido');
        }
    } else if (field.value.trim() === '') {
        showFieldError(field, 'Este campo es requerido');
    }
}

function showFieldError(field, message) {
    removeError(field);
    field.style.borderColor = '#999';
    const errorMsg = document.createElement('small');
    errorMsg.style.cssText = `
        color: #999;
        display: block;
        margin-top: 5px;
        font-size: 0.85rem;
    `;
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    field.parentNode.insertBefore(errorMsg, field.nextSibling);
}

function removeError(field) {
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
    field.style.borderColor = '#e0e0e0';
}

// Cargar animación al cargar la página
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Contador de scroll para navbar activado
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.padding = '1rem 0';
    }

    lastScroll = currentScroll;
});