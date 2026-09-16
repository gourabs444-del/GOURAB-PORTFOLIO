// Interactive UI Enhancements for Creative Developer Landing Page

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Card Spotlight / Glow Effect
  const cards = document.querySelectorAll('.service-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 2. Dynamic 3D Volumetric Particle Canvas Engine
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    let mouse = { x: -1000, y: -1000, radius: 160 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    const particles = [];
    const numParticles = Math.min(Math.floor((width * height) / 18000), 75);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.6 + 0.8;
        this.baseAlpha = Math.random() * 0.4 + 0.2;
        this.alpha = this.baseAlpha;
        this.color = Math.random() > 0.4 ? '167, 139, 250' : '124, 58, 237';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Subtle mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          this.x -= (dx / dist) * force;
          this.y -= (dy / dist) * force;
          this.alpha = Math.min(this.baseAlpha + 0.35, 0.9);
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.05;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

  // 3. Navigation Active Item Switching
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      navItems.forEach(nav => {
        nav.classList.remove('active');
        const dot = nav.querySelector('.active-dot');
        if (dot) dot.remove();
      });
      
      this.classList.add('active');
      const dot = document.createElement('span');
      dot.className = 'active-dot';
      this.appendChild(dot);
    });
  });

  // 4. Smooth Scroll for "Scroll to Explore"
  const scrollIndicator = document.querySelector('.scroll-mouse-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const servicesSection = document.querySelector('.services-cards-grid');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
