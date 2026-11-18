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

  // 2. Interactive Product Demo with 4 Separate Tabs (Issues #19, #17, #16, #15, #13)
  const demoTabBtns = document.querySelectorAll('.demo-tab-btn');
  const demoPanels = document.querySelectorAll('.demo-tab-panel');
  const demoAppAddress = document.getElementById('demoAppAddress');
  const demoEngineStatus = document.getElementById('demoEngineStatus');

  const tabAddressMap = {
    'tab-fill': {
      address: 'FireForm Desktop · Station 14 · Incident Studio',
      status: 'Ollama Local (0ms cloud latency)'
    },
    'tab-templates': {
      address: 'FireForm Desktop · Template Builder & Smart OCR',
      status: 'Field Detection Engine Active'
    },
    'tab-context': {
      address: 'FireForm Desktop · Context APIs & Geocoding',
      status: 'Open-Meteo & US Census Connected'
    },
    'tab-providers': {
      address: 'FireForm Desktop · Settings · Multi-Provider Orchestration',
      status: 'Hybrid Model Gateway Active'
    }
  };

  // Switch between the 4 main tool tabs
  demoTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      demoTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      demoPanels.forEach(p => {
        p.classList.remove('active');
        if (p.id === targetTab) {
          p.classList.add('active');
        }
      });

      if (tabAddressMap[targetTab]) {
        if (demoAppAddress) demoAppAddress.textContent = tabAddressMap[targetTab].address;
        if (demoEngineStatus) demoEngineStatus.textContent = tabAddressMap[targetTab].status;
      }
    });
  });

  // --- TAB 1: Voice Dictation & Real-Time Streaming Simulator ---
  const demoMicBtn = document.getElementById('demoMicBtn');
  const demoMicText = document.getElementById('demoMicText');
  const demoInputText = document.getElementById('demoInputText');
  const demoFillBtn = document.getElementById('demoFillBtn');
  const demoFillStatus = document.getElementById('demoFillStatus');
  const demoModelSelect = document.getElementById('demoModelSelect');
  const demoSchemaTitle = document.getElementById('demoSchemaTitle');
  const demoSchemaCode = document.getElementById('demoSchemaCode');

  let isSimulatingVoice = false;
  let voiceInterval = null;

  if (demoMicBtn && demoInputText) {
    demoMicBtn.addEventListener('click', () => {
      if (!isSimulatingVoice) {
        isSimulatingVoice = true;
        demoMicBtn.classList.add('recording-active');
        if (demoMicText) demoMicText.textContent = '⏹️ Stop Recording (Streaming...)';
        
        const originalText = demoInputText.value;
        const speechChunks = [
          " Engine 14 updating command.",
          " Heavy fire knock-down complete in sector B.",
          " Ventilating roof now.",
          " No extension into attic.",
          " Overhaul in progress.",
          " Incident fully stabilized."
        ];
        let chunkIndex = 0;

        voiceInterval = setInterval(() => {
          if (chunkIndex < speechChunks.length) {
            demoInputText.value += speechChunks[chunkIndex];
            demoInputText.scrollTop = demoInputText.scrollHeight;
            chunkIndex++;
          } else {
            clearInterval(voiceInterval);
            isSimulatingVoice = false;
            demoMicBtn.classList.remove('recording-active');
            if (demoMicText) demoMicText.textContent = '🎙️ Stream Voice Memo';
          }
        }, 650);
      } else {
        clearInterval(voiceInterval);
        isSimulatingVoice = false;
        demoMicBtn.classList.remove('recording-active');
        if (demoMicText) demoMicText.textContent = '🎙️ Stream Voice Memo';
      }
    });
  }

  // Model Selector updates schema title
  if (demoModelSelect && demoSchemaTitle) {
    demoModelSelect.addEventListener('change', (e) => {
      const modelName = e.target.options[e.target.selectedIndex].text.split('(')[0].trim();
      demoSchemaTitle.textContent = `Extracted Schema (${modelName})`;
    });
  }

  // Autofill button action
  if (demoFillBtn && demoFillStatus) {
    demoFillBtn.addEventListener('click', () => {
      demoFillStatus.textContent = '⏳ Processing with Local LLM...';
      demoFillStatus.style.background = '#fef3c7';
      demoFillStatus.style.color = '#b45309';

      setTimeout(() => {
        demoFillStatus.textContent = '✓ 3 Forms Ready (100%)';
        demoFillStatus.style.background = '#ecfdf5';
        demoFillStatus.style.color = '#059669';
      }, 700);
    });
  }

  // --- TAB 2: Template Builder Field Detection Simulator ---
  const demoDetectBtn = document.getElementById('demoDetectBtn');
  const demoDetectText = document.getElementById('demoDetectText');
  const demoTemplateSelect = document.getElementById('demoTemplateSelect');

  if (demoDetectBtn && demoDetectText) {
    demoDetectBtn.addEventListener('click', () => {
      demoDetectText.textContent = 'Scanning PDF Boundaries...';
      demoDetectBtn.disabled = true;

      setTimeout(() => {
        demoDetectText.textContent = '✓ 24 Fields Detected (100%)';
        demoDetectBtn.disabled = false;
        setTimeout(() => {
          demoDetectText.textContent = '🔍 Run Field Detection OCR';
        }, 2200);
      }, 800);
    });
  }

  // --- TAB 3: ZIP Code & Weather APIs Simulator (Issue #16) ---
  const demoZipInput = document.getElementById('demoZipInput');
  const demoZipBtn = document.getElementById('demoZipBtn');
  const zipFpd = document.getElementById('zipFpd');
  const zipStation = document.getElementById('zipStation');
  const zipSra = document.getElementById('zipSra');
  const zipFreq = document.getElementById('zipFreq');
  const zipEms = document.getElementById('zipEms');

  const zipDatabase = {
    '95062': {
      fpd: 'Central Fire District of Santa Cruz',
      station: 'Station 14 (Live Oak / Soquel)',
      sra: 'CAL FIRE San Mateo-Santa Cruz Unit (CZU)',
      freq: 'VFIRE21 (154.280 MHz) / Command 151.445',
      ems: 'Santa Cruz County EMS Zone 1'
    },
    '94103': {
      fpd: 'San Francisco Fire Department (SFFD)',
      station: 'Station 1 (Howard St / SoMa)',
      sra: 'Local Responsibility Area (LRA)',
      freq: 'SFFD Command 1 (800 MHz Trunked)',
      ems: 'SF EMS Agency Sector Central'
    },
    '90210': {
      fpd: 'Beverly Hills Fire Department (BHFD)',
      station: 'Station 1 (Rexford Dr)',
      sra: 'Mutual Aid with LA County Fire Battalion 1',
      freq: 'TAC 3 (470.525 MHz)',
      ems: 'LA County EMS Provider #12'
    }
  };

  if (demoZipBtn && demoZipInput) {
    demoZipBtn.addEventListener('click', () => {
      const zip = demoZipInput.value.trim();
      const match = zipDatabase[zip] || {
        fpd: `Regional Fire Protection District (${zip})`,
        station: `Engine Company 1 · Primary Battalion`,
        sra: `State Fire Marshal Mutual Aid Zone`,
        freq: `VFIRE22 (154.265 MHz)`,
        ems: `County Emergency Medical Services Zone`
      };

      if (zipFpd) zipFpd.textContent = match.fpd;
      if (zipStation) zipStation.textContent = match.station;
      if (zipSra) zipSra.textContent = match.sra;
      if (zipFreq) zipFreq.textContent = match.freq;
      if (zipEms) zipEms.textContent = match.ems;
    });
  }

  // Weather telemetry refresh button
  const demoWeatherBtn = document.getElementById('demoWeatherBtn');
  const weatherTemp = document.getElementById('weatherTemp');
  const weatherRh = document.getElementById('weatherRh');
  const weatherWind = document.getElementById('weatherWind');

  if (demoWeatherBtn) {
    demoWeatherBtn.addEventListener('click', () => {
      demoWeatherBtn.textContent = 'Updating...';
      setTimeout(() => {
        if (weatherTemp) weatherTemp.textContent = (76 + Math.floor(Math.random() * 5)) + '°F';
        if (weatherRh) weatherRh.textContent = (12 + Math.floor(Math.random() * 4)) + '%';
        if (weatherWind) weatherWind.textContent = (16 + Math.floor(Math.random() * 6)) + ' mph';
        demoWeatherBtn.textContent = '✓ Synced';
        setTimeout(() => {
          demoWeatherBtn.textContent = '↻ Refresh';
        }, 1500);
      }, 500);
    });
  }

  // --- TAB 4: Multi-Provider Simulator (Issue #17) ---
  const providerPills = document.querySelectorAll('.provider-pill');
  const provDisplayName = document.getElementById('provDisplayName');
  const provDesc = document.getElementById('provDesc');
  const provStatusBadge = document.getElementById('provStatusBadge');
  const provUrl = document.getElementById('provUrl');
  const provKey = document.getElementById('provKey');
  const provModel = document.getElementById('provModel');
  const provLatency = document.getElementById('provLatency');
  const demoTestConnBtn = document.getElementById('demoTestConnBtn');
  const demoTestConnText = document.getElementById('demoTestConnText');

  const providerConfigs = {
    'ollama': {
      name: 'Ollama Local Engine',
      desc: 'Runs locally on apparatus laptop — zero internet required',
      status: '● Connected & Serving',
      statusBg: '#ecfdf5',
      statusColor: '#059669',
      url: 'http://127.0.0.1:11434',
      key: 'No API Key Required (Localhost)',
      model: 'qwen2.5:latest (4-bit quantized)',
      latency: '<span class="latency-val">0.24s</span> · 0.0ms external cloud latency'
    },
    'anthropic': {
      name: 'Anthropic Claude Engine',
      desc: 'High-reasoning cloud fallback for complex multi-page reports',
      status: '● Ready (API Connected)',
      statusBg: '#eff6ff',
      statusColor: '#2563eb',
      url: 'https://api.anthropic.com/v1',
      key: 'sk-ant-api03-••••••••••••••••',
      model: 'claude-3-5-sonnet-latest',
      latency: '<span class="latency-val">1.12s</span> · Secure TLS 1.3 Encryption'
    },
    'openai': {
      name: 'OpenAI Enterprise Gateway',
      desc: 'Multi-modal document and aerial damage extraction',
      status: '● Ready (API Connected)',
      statusBg: '#eff6ff',
      statusColor: '#2563eb',
      url: 'https://api.openai.com/v1',
      key: 'sk-proj-••••••••••••••••',
      model: 'gpt-4o (Omni Document Parser)',
      latency: '<span class="latency-val">0.95s</span> · Zero Data Retention Policy'
    },
    'groq': {
      name: 'Groq LPU Inference Cloud',
      desc: 'Ultra-low latency open-weights inference at 500+ tokens/sec',
      status: '● Ready (Ultra-Fast LPU)',
      statusBg: '#fef3c7',
      statusColor: '#b45309',
      url: 'https://api.groq.com/openai/v1',
      key: 'gsk_••••••••••••••••••••',
      model: 'llama-3.3-70b-versatile',
      latency: '<span class="latency-val">0.18s</span> · 520 tokens/sec throughput'
    }
  };

  providerPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const prov = pill.getAttribute('data-prov');
      providerPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const config = providerConfigs[prov];
      if (config) {
        if (provDisplayName) provDisplayName.textContent = config.name;
        if (provDesc) provDesc.textContent = config.desc;
        if (provStatusBadge) {
          provStatusBadge.textContent = config.status;
          provStatusBadge.style.background = config.statusBg;
          provStatusBadge.style.color = config.statusColor;
        }
        if (provUrl) provUrl.value = config.url;
        if (provKey) provKey.value = config.key;
        if (provModel) provModel.value = config.model;
        if (provLatency) provLatency.innerHTML = config.latency;
      }
    });
  });

  if (demoTestConnBtn && demoTestConnText) {
    demoTestConnBtn.addEventListener('click', () => {
      demoTestConnText.textContent = 'Pinging Endpoint...';
      demoTestConnBtn.disabled = true;

      setTimeout(() => {
        demoTestConnText.textContent = '✓ Connection Verified (HTTP 200 OK)';
        demoTestConnBtn.disabled = false;
        setTimeout(() => {
          demoTestConnText.textContent = '✓ Test Provider Connection';
        }, 2200);
      }, 450);
    });
  }

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
