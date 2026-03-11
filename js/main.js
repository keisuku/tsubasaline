/* ============================================
   キャプテン翼 -RIVALS- on LINE 攻略サイト
   メインJavaScript
   ============================================ */

// --- Navigation Data ---
const NAV_ITEMS = [
  {
    section: 'メイン',
    items: [
      { href: '/index.html', icon: 'fa-solid fa-house', label: 'ホーム' },
      { href: '/pages/current-season.html', icon: 'fa-solid fa-fire', label: '最新シーズン攻略', badge: 'HOT', badgeClass: 'badge-hot' },
    ]
  },
  {
    section: '対戦モード',
    items: [
      { href: '/pages/pve.html', icon: 'fa-solid fa-shield-halved', label: 'PvE（ライバルズ）' },
      { href: '/pages/pvp.html', icon: 'fa-solid fa-trophy', label: 'PvP' },
      { href: '/pages/arena.html', icon: 'fa-solid fa-crown', label: 'アリーナ', badge: 'NEW', badgeClass: 'badge-new' },
      { href: '/pages/gvg.html', icon: 'fa-solid fa-users', label: 'GvG', badge: 'SOON', badgeClass: 'badge-soon' },
    ]
  },
  {
    section: 'ガイド',
    items: [
      { href: '/pages/team-building.html', icon: 'fa-solid fa-layer-group', label: 'チーム編成・強化' },
      { href: '/pages/earning.html', icon: 'fa-solid fa-coins', label: '稼ぎ方ガイド' },
      { href: '/pages/beginners.html', icon: 'fa-solid fa-book-open', label: '初心者ガイド' },
    ]
  },
  {
    section: 'その他',
    items: [
      { href: '/pages/archive.html', icon: 'fa-solid fa-folder-open', label: '過去シーズン' },
    ]
  }
];

// --- Detect base path (works for both root and /pages/) ---
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    return '..';
  }
  return '.';
}

function resolveHref(href) {
  const base = getBasePath();
  return base + href;
}

function isCurrentPage(href) {
  const current = window.location.pathname;
  const normalizedCurrent = current.replace(/\/index\.html$/, '/');
  const normalizedHref = href.replace(/\/index\.html$/, '/');
  return normalizedCurrent.endsWith(normalizedHref) || current.endsWith(href);
}

// --- Generate Header ---
function generateHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <a href="${resolveHref('/index.html')}" class="logo">
      <i class="fa-solid fa-futbol"></i>
      <span>TSUBASA RIVALS</span> 攻略
    </a>
    <button class="menu-toggle" aria-label="メニューを開く">
      <i class="fa-solid fa-bars"></i>
    </button>
  `;
  document.body.prepend(header);
}

// --- Generate Sidebar ---
function generateSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';

  let navHTML = '<nav class="sidebar-nav">';

  NAV_ITEMS.forEach(section => {
    navHTML += `<div class="sidebar-section">`;
    navHTML += `<div class="sidebar-section-title">${section.section}</div>`;

    section.items.forEach(item => {
      const href = resolveHref(item.href);
      const activeClass = isCurrentPage(item.href) ? ' active' : '';
      const badgeHTML = item.badge
        ? `<span class="badge ${item.badgeClass}">${item.badge}</span>`
        : '';
      navHTML += `
        <a href="${href}" class="sidebar-link${activeClass}">
          <i class="${item.icon}"></i>
          ${item.label}
          ${badgeHTML}
        </a>
      `;
    });

    navHTML += `</div>`;
  });

  // Sidebar bottom info
  navHTML += `<div class="sidebar-info">非公式攻略サイト<br>v2.0</div>`;
  navHTML += '</nav>';
  sidebar.innerHTML = navHTML;

  // Overlay for mobile
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebar-overlay';

  document.body.insertBefore(sidebar, document.querySelector('.main-content'));
  document.body.insertBefore(overlay, document.querySelector('.main-content'));
}

// --- Sidebar Toggle ---
function initSidebarToggle() {
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!toggle || !sidebar || !overlay) return;

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    toggle.querySelector('i').className = 'fa-solid fa-xmark';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    toggle.querySelector('i').className = 'fa-solid fa-bars';
  }

  toggle.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener('click', closeSidebar);

  // Close on link click (mobile)
  sidebar.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });
}

// --- Generate Footer ---
function generateFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-section">
        <div class="footer-section-title">About</div>
        <p>キャプテン翼 -RIVALS- on LINE の非公式攻略サイト。最新シーズンの攻略情報を随時更新しています。</p>
      </div>
      <div class="footer-section">
        <div class="footer-section-title">ガイド</div>
        <nav class="footer-nav">
          <a href="${resolveHref('/pages/current-season.html')}">最新シーズン攻略</a>
          <a href="${resolveHref('/pages/team-building.html')}">チーム編成・強化</a>
          <a href="${resolveHref('/pages/earning.html')}">稼ぎ方ガイド</a>
          <a href="${resolveHref('/pages/beginners.html')}">初心者ガイド</a>
        </nav>
      </div>
      <div class="footer-section">
        <div class="footer-section-title">外部リンク</div>
        <nav class="footer-nav">
          <a href="https://tsubasa-rivals.com/" target="_blank" rel="noopener">公式サイト</a>
          <a href="https://x.com/taborivalsJP" target="_blank" rel="noopener">公式X (Twitter)</a>
        </nav>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2025 キャプテン翼 -RIVALS- on LINE 攻略ガイド（非公式）
    </div>
  `;
  document.body.appendChild(footer);
}

// --- Generate Breadcrumb ---
function generateBreadcrumb() {
  const container = document.querySelector('.breadcrumb');
  if (!container) return;

  const pageTitle = document.querySelector('.page-title')?.textContent || '';
  container.innerHTML = `
    <a href="${resolveHref('/index.html')}"><i class="fa-solid fa-house"></i> ホーム</a>
    <span class="sep"><i class="fa-solid fa-chevron-right"></i></span>
    <span>${pageTitle}</span>
  `;
}

// --- Header Scroll Effect ---
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// --- Scroll Reveal (Intersection Observer) ---
function initScrollReveal() {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll('.card, .content-section, .info-box, .season-banner, .section-heading, .placeholder-content');
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

// --- Button Ripple Effect ---
function initRipple() {
  const buttons = document.querySelectorAll('.hero-cta, .season-banner .btn');
  buttons.forEach(btn => {
    btn.classList.add('ripple-container');
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

// --- Hero SVG Decoration ---
function generateHeroSVG() {
  const container = document.getElementById('hero-svg');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <!-- Center circle (soccer field) -->
      <circle cx="900" cy="250" r="180" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="2">
        <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="12s" repeatCount="indefinite" additive="sum" />
      </circle>
      <circle cx="900" cy="250" r="8" fill="rgba(255,255,255,0.04)" />

      <!-- Hexagons -->
      <g opacity="0.03" transform="translate(1000, 80) rotate(15)">
        <polygon points="30,0 60,17 60,52 30,69 0,52 0,17" fill="none" stroke="white" stroke-width="1.5"/>
      </g>
      <g opacity="0.025" transform="translate(1080, 180) rotate(-10)">
        <polygon points="25,0 50,14 50,43 25,58 0,43 0,14" fill="none" stroke="white" stroke-width="1"/>
      </g>
      <g opacity="0.02" transform="translate(800, 400) rotate(30)">
        <polygon points="40,0 80,23 80,69 40,92 0,69 0,23" fill="none" stroke="white" stroke-width="1"/>
      </g>

      <!-- Speed lines -->
      <line x1="100" y1="450" x2="500" y2="350" stroke="rgba(212,168,67,0.06)" stroke-width="1">
        <animate attributeName="opacity" values="0;0.06;0" dur="5s" repeatCount="indefinite" />
      </line>
      <line x1="50" y1="400" x2="600" y2="250" stroke="rgba(255,255,255,0.03)" stroke-width="0.5">
        <animate attributeName="opacity" values="0;0.03;0" dur="7s" repeatCount="indefinite" />
      </line>
      <line x1="200" y1="480" x2="700" y2="300" stroke="rgba(212,168,67,0.04)" stroke-width="0.8">
        <animate attributeName="opacity" values="0;0.04;0" dur="6s" repeatCount="indefinite" begin="2s" />
      </line>

      <!-- Dotted arc -->
      <path d="M 850 50 A 300 300 0 0 1 1150 250" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="4 8" />
    </svg>
  `;
}

// --- Table of Contents (目次) Auto-generation ---
function generateTOC() {
  const headings = document.querySelectorAll('.content-section h2');
  if (headings.length < 2) return; // Only generate if 2+ sections

  // Assign IDs to headings
  headings.forEach((h2, i) => {
    if (!h2.id) {
      const text = h2.textContent.trim().replace(/\s+/g, '-');
      h2.id = 'section-' + (i + 1);
    }
  });

  const toc = document.createElement('div');
  toc.className = 'toc';
  toc.innerHTML = `
    <div class="toc-header">
      <i class="fa-solid fa-list-ol"></i>
      <h3>目次</h3>
      <i class="fa-solid fa-chevron-down toc-toggle"></i>
    </div>
    <ol class="toc-list">
      ${Array.from(headings).map(h2 => {
        const text = h2.textContent.trim();
        return `<li><a href="#${h2.id}">${text}</a></li>`;
      }).join('')}
    </ol>
  `;

  // Insert before first content-section
  const firstSection = document.querySelector('.content-section');
  if (firstSection) {
    firstSection.parentNode.insertBefore(toc, firstSection);
  }

  // Toggle collapse
  toc.querySelector('.toc-header').addEventListener('click', () => {
    toc.classList.toggle('collapsed');
  });
}

// --- Auto-load images from data-img attributes ---
function initAutoImages() {
  document.querySelectorAll('[data-img]').forEach(el => {
    const src = el.getAttribute('data-img');
    if (!src) return;

    // Resolve path (pages/ need ../ prefix)
    const base = getBasePath();
    const fullSrc = base + '/' + src;

    const img = new Image();
    img.loading = 'lazy';
    img.alt = el.textContent.trim().replace(/<!--.*?-->/g, '').trim() || '';
    img.src = fullSrc;

    img.onload = () => {
      el.appendChild(img);
    };
    // On error: silently keep the fallback icon/pattern
  });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  generateHeader();
  generateSidebar();
  generateFooter();
  generateBreadcrumb();
  initSidebarToggle();
  initHeaderScroll();
  generateHeroSVG();
  generateTOC();
  initAutoImages();

  // Delay scroll reveal slightly to let DOM settle
  requestAnimationFrame(() => {
    initScrollReveal();
    initRipple();
  });
});
