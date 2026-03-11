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
  // Normalize: remove trailing index.html
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
    <div class="footer-links">
      <a href="https://tsubasa-rivals.com/" target="_blank" rel="noopener">公式サイト</a>
      <a href="https://x.com/taborivalsJP" target="_blank" rel="noopener">公式X (Twitter)</a>
    </div>
    <p>&copy; 2025 キャプテン翼 -RIVALS- on LINE 攻略ガイド（非公式）</p>
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

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  generateHeader();
  generateSidebar();
  generateFooter();
  generateBreadcrumb();
  initSidebarToggle();
});
