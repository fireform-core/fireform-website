// FireForm Website Interactive Behaviors
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Shadow on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Interactive Feature Tabs in Workspace Showcase
  const tabPills = document.querySelectorAll('.filter-pill');
  const tabPanels = document.querySelectorAll('.tab-content-panel');
  const workspaceTitle = document.getElementById('workspace-title');
  const workspaceDesc = document.getElementById('workspace-desc');

  const tabContentMap = {
    'tab-voice': {
      title: 'Dictate in real-time or drop field voice recordings',
      desc: 'First responders speak naturally about the incident. FireForm transcribes scene audio with zero cloud latency, preserving every detail while responders focus on safety.'
    },
    'tab-extract': {
      title: 'Local LLM extracts key incident parameters',
      desc: 'On-device quantized Mistral models parse the transcript into structured schema fields: apparatus dispatched, incident type, times, incident command, and casualties.'
    },
    'tab-forms': {
      title: 'Autofill NFIRS, CalFire, and County forms at once',
      desc: 'With a single click, FireForm maps the structured data into exact government PDF templates. No retyping, zero clerical errors, and complete schema validation.'
    },
    'tab-storage': {
      title: '100% offline database ensures total data privacy',
      desc: 'All incident records are stored in a local encrypted database. No telemetry, no third-party cloud servers, and full HIPAA/CJIS compliance by default.'
    }
  };

  tabPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-tab');

      // Update active pill
      tabPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Update active panel
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetId) {
          panel.classList.add('active');
        }
      });

      // Update description text dynamically
      if (tabContentMap[targetId]) {
        if (workspaceTitle) workspaceTitle.textContent = tabContentMap[targetId].title;
        if (workspaceDesc) workspaceDesc.textContent = tabContentMap[targetId].desc;
      }
    });
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '72px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#ffffff';
        navMenu.style.padding = '24px';
        navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        navMenu.style.borderBottom = '1px solid #e2e8f0';
      }
    });
  }

  // 4. Hero Section Real PDF Carousel & X-Ray Switcher
  const pdfCarouselData = [
    {
      name: 'ICS 209 Wildfire Summary',
      time: 'Filled by FireForm in 8 sec',
      img: 'assets/ics-209-filled-retina.png',
      alt: 'Official ICS 209 Incident Status Summary PDF auto-filled by FireForm'
    },
    {
      name: 'ICS 201 Incident Briefing',
      time: 'Filled by FireForm in 6 sec',
      img: 'assets/ics-201-filled-retina.png',
      alt: 'Official ICS 201 Incident Briefing PDF auto-filled by FireForm'
    }
  ];

  let currentPdfSlide = 0;
  const pdfCarouselTitle = document.getElementById('pdfCarouselTitle');
  const pdfPageImg = document.getElementById('pdfPageImg');
  const pdfPrevBtn = document.getElementById('pdfPrevBtn');
  const pdfNextBtn = document.getElementById('pdfNextBtn');
  const pdfDots = document.querySelectorAll('.pdf-dot');
  const overlay0 = document.getElementById('xrayOverlaySlide0');
  const overlay1 = document.getElementById('xrayOverlaySlide1');

  function updatePdfSlide(index) {
    currentPdfSlide = (index + pdfCarouselData.length) % pdfCarouselData.length;
    const data = pdfCarouselData[currentPdfSlide];

    if (pdfCarouselTitle) {
      pdfCarouselTitle.innerHTML = `<span class="pdf-carousel-name">${data.name}</span> &nbsp;·&nbsp; <span class="pdf-carousel-time">${data.time}</span>`;
    }
    if (pdfPageImg) {
      pdfPageImg.src = data.img;
      pdfPageImg.alt = data.alt;
    }
    pdfDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPdfSlide);
    });

    if (overlay0 && overlay1) {
      if (currentPdfSlide === 0) {
        overlay0.style.display = 'block';
        overlay1.style.display = 'none';
      } else {
        overlay0.style.display = 'none';
        overlay1.style.display = 'block';
      }
    }
  }

  pdfPrevBtn?.addEventListener('click', () => updatePdfSlide(currentPdfSlide - 1));
  pdfNextBtn?.addEventListener('click', () => updatePdfSlide(currentPdfSlide + 1));
  pdfDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updatePdfSlide(idx));
  });
});
