// ============================================================================
// DG y SP Servicios — Interactividad del sitio web
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Año dinámico en footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Menú móvil (Drawer)
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = !mobileDrawer.hasAttribute('hidden');
      if (isOpen) {
        mobileDrawer.setAttribute('hidden', '');
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.removeAttribute('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.setAttribute('hidden', '');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Tabs de Obras (Albañilería Sanitaria y Electricidad vs Avances de Obra)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = {
    sanitaria: document.getElementById('panel-sanitaria'),
    techos: document.getElementById('panel-techos'),
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      Object.entries(panels).forEach(([key, panel]) => {
        if (!panel) return;
        if (key === target) {
          panel.removeAttribute('hidden');
          panel.classList.add('active');
        } else {
          panel.setAttribute('hidden', '');
          panel.classList.remove('active');
        }
      });
    });
  });

  // 4. Preselección del servicio al llegar desde una tarjeta (?servicio=slug)
  const serviceSelect = document.getElementById('serviceSelect');

  const serviceBySlug = {
    mantenimiento: 'Mantenimiento General',
    electricidad: 'Instalaciones Eléctricas',
    pintura: 'Pintura Interior y Exterior',
    plomeria: 'Plomería y Sanitaria',
    albanileria: 'Albañilería',
    remodelaciones: 'Remodelaciones y Acabados',
  };

  if (serviceSelect) {
    const slug = new URLSearchParams(window.location.search).get('servicio');
    const serviceName = serviceBySlug[slug];
    if (serviceName) {
      const option = Array.from(serviceSelect.options).find((o) => o.value === serviceName);
      if (option) serviceSelect.value = serviceName;
    }
  }

  // 5. Formulario de cotización -> abre WhatsApp con resumen estructurado
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const zone = document.getElementById('clientZone').value.trim();
      const service = document.getElementById('serviceSelect').value;
      const urgency = document.getElementById('urgencySelect').value;
      const targetLine = document.getElementById('targetLine').value;
      const details = document.getElementById('projectDetails').value.trim();

      const message = [
        `Hola *DG y SP Servicios*!`,
        `Quisiera solicitar un presupuesto:`,
        `• *Nombre:* ${name}`,
        `• *Zona (Montevideo):* ${zone}`,
        `• *Servicio:* ${service}`,
        `• *Plazo estimado:* ${urgency}`,
        `• *Detalle:* ${details}`,
      ].join('\n');

      const waUrl = `https://wa.me/${targetLine}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener');
    });
  }

  // 6. Lightbox para fotos de obras y láminas oficiales
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Imagen ampliada DG y SP Servicios';
    lightboxCaption.textContent = caption || '';
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach((el) => {
    el.addEventListener('click', () => {
      openLightbox(el.dataset.lightbox, el.dataset.caption);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hasAttribute('hidden')) {
      closeLightbox();
    }
  });

  // 7. Animación sutil Reveal-on-Scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
});
