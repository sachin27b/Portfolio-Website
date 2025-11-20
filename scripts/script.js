// Custom cursor
const cursorDot = document.querySelector("#cursor-dot");
const cursorOutline = document.querySelector("#cursor-dot-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });

    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";
});

window.addEventListener("mouseout", () => {
    cursorDot.style.opacity = "0";
    cursorOutline.style.opacity = "0";
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseover', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
    });
    el.addEventListener('mouseout', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
    });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.from('.subtitle', { opacity: 0, y: 20, duration: 1, delay: 0.5 });
gsap.from('h1', { opacity: 0, y: 20, duration: 1, delay: 0.7 });
gsap.from('.typewriter', { opacity: 0, duration: 1, delay: 0.9 });
gsap.from('.social-links', { opacity: 0, y: 20, duration: 1, delay: 1.1 });
gsap.from('.profile-picture', { opacity: 0, scale: 0.8, duration: 1, delay: 0.5 });

// Scroll animations
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });
});

gsap.utils.toArray('.skill-category').forEach(category => {
    gsap.from(category, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
            trigger: category,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typewriter effect
const typewriter = document.querySelector('.typewriter');
const text = typewriter.textContent;
typewriter.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

setTimeout(typeWriter, 1000);

// Parallax effect on profile picture
document.addEventListener('mousemove', (e) => {
    const profilePicture = document.querySelector('.profile-picture');
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    profilePicture.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// Interactive project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            y: -15,
            duration: 0.4,
            ease: "power3.out",
            boxShadow: "0 30px 50px rgba(0,0,0,0.3)"
        });
        gsap.to(card.querySelector('h3'), {
            y: -5,
            duration: 0.3,
            ease: "power2.out"
        });
        gsap.to([card.querySelector('p'), card.querySelector('.tags')], {
            y: 5,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.1
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.75)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        });
        gsap.to([card.querySelector('h3'), card.querySelector('p'), card.querySelector('.tags')], {
            y: 0,
            duration: 0.3,
            ease: "power2.inOut"
        });
    });
});

// Tilt effect on project cards
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        const dx = x - xc;
        const dy = y - yc;
        
        gsap.to(card, {
            rotationY: dx * 0.03,
            rotationX: -dy * 0.03,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    });
});

// Neural network background
const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 100;
const connectionDistance = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
                ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / connectionDistance})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});