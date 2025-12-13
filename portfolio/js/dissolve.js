// Particle Dissolve Effect for Experience Cards and About Section

document.addEventListener('DOMContentLoaded', () => {
    // Retry initialization until targets are found
    const checkInterval = setInterval(() => {
        const targets = document.querySelectorAll('.experience-timeline .glass-card, .about-text');
        if (targets.length > 0) {
            clearInterval(checkInterval);
            initDissolveEffect(targets);
        }
    }, 100);

    // Safety timeout to stop checking
    setTimeout(() => clearInterval(checkInterval), 5000);
});

function initDissolveEffect(targets) {
    // Create a canvas overlay for particles
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-overlay';
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '9999'
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle Class
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = Math.random() * 3 + 1; // Smaller particles
            this.speedX = (Math.random() - 0.5) * 6; // Faster spread
            this.speedY = (Math.random() - 1) * 5 - 3; // Stronger upward float
            this.life = 1;
            this.decay = Math.random() * 0.015 + 0.005; // Slower fade
            this.active = true;
        }

        update() {
            if (!this.active) return;
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.96;

            if (this.life <= 0 || this.size < 0.1) {
                this.active = false;
            }
        }

        draw(ctx) {
            if (!this.active) return;
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(ctx);
        }

        particles = particles.filter(p => p.active);
        requestAnimationFrame(animate);
    }
    animate();

    // Track state
    const targetStates = new Map();

    window.addEventListener('scroll', () => {
        targets.forEach(target => {
            const rect = target.getBoundingClientRect();

            // Trigger dissolve when bottom of target is near top of viewport (scrolling down)
            if (rect.bottom < 250 && !targetStates.get(target)?.dissolved) {
                dissolveTarget(target);
                targetStates.set(target, { dissolved: true });
            }

            // Trigger reform when top of target enters viewport (scrolling up)
            if (rect.top > 50 && targetStates.get(target)?.dissolved) {
                reformTarget(target);
                targetStates.set(target, { dissolved: false });
            }
        });
    });

    function dissolveTarget(target) {
        target.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        target.style.opacity = '0';
        target.style.transform = 'scale(0.8) translateY(-20px)';

        const rect = target.getBoundingClientRect();
        // More particles for larger elements like the About section
        const particleCount = rect.height > 200 ? 80 : 50;

        for (let i = 0; i < particleCount; i++) {
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            const colors = ['#38bdf8', '#818cf8', '#ffffff', '#60a5fa'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particles.push(new Particle(x, y, color));
        }
    }

    function reformTarget(target) {
        target.style.opacity = '1';
        target.style.transform = ''; // Clear inline transform to allow CSS hover effect
    }
}
