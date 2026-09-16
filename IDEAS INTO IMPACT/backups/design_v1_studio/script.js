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
