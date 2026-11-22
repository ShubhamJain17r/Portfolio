/**
 * Shubham Jain — Portfolio Main Scripts
 * Handles dynamic data injection from config.js, project rendering, navigation, and contact.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  injectConfigData();
  initFeaturedProjects();
  initProjectsList();
  initContactActions();
});

function initNavigation() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');
  if (menuBtn && navLinksContainer) {
    menuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      const isOpen = navLinksContainer.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });
  }
}

/**
 * Injects all links and text values from PORTFOLIO_CONFIG.
 * Zero hardcoded personal URLs in HTML files.
 */
function injectConfigData() {
  if (typeof PORTFOLIO_CONFIG === 'undefined') return;
  const { profile } = PORTFOLIO_CONFIG;
  const { links } = profile;

  // Set hrefs dynamically
  document.querySelectorAll('[data-link="github"]').forEach(el => {
    el.href = links.github || '#';
  });
  document.querySelectorAll('[data-link="linkedin"]').forEach(el => {
    el.href = links.linkedin || '#';
  });
  document.querySelectorAll('[data-link="leetcode"]').forEach(el => {
    el.href = links.leetcode || '#';
  });
  document.querySelectorAll('[data-link="email"]').forEach(el => {
    el.href = links.email ? `mailto:${links.email}` : '#';
  });

  // Set text labels dynamically
  document.querySelectorAll('[data-config="email-val"]').forEach(el => {
    el.textContent = links.email || '';
  });
  document.querySelectorAll('[data-config="github-val"]').forEach(el => {
    el.textContent = links.github ? links.github.replace(/^https?:\/\//, '') : '';
  });
  document.querySelectorAll('[data-config="linkedin-val"]').forEach(el => {
    el.textContent = links.linkedin ? links.linkedin.replace(/^https?:\/\//, '') : '';
  });
  document.querySelectorAll('[data-config="leetcode-val"]').forEach(el => {
    el.textContent = links.leetcode ? links.leetcode.replace(/^https?:\/\//, '') : '';
  });
}

/**
 * Renders the top 3 featured projects on index.html dynamically from config.js
 */
function initFeaturedProjects() {
  const container = document.getElementById('featuredProjectsContainer');
  if (!container || typeof PORTFOLIO_CONFIG === 'undefined') return;

  const projects = (PORTFOLIO_CONFIG.projects || []).slice(0, 3);
  renderProjectCards(projects, container);
}

/**
 * Renders all projects on projects.html with domain filtering
 */
function initProjectsList() {
  const container = document.getElementById('projectsContainer');
  if (!container || typeof PORTFOLIO_CONFIG === 'undefined') return;

  const projects = PORTFOLIO_CONFIG.projects || [];
  renderProjectCards(projects, container);

  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const domain = tab.getAttribute('data-domain');
      if (domain === 'all') {
        renderProjectCards(projects, container);
      } else {
        const filtered = projects.filter(p => p.domain === domain);
        renderProjectCards(filtered, container);
      }
    });
  });
}

/**
 * Helper to render an array of projects as clean HTML cards
 */
function renderProjectCards(projects, container) {
  if (!projects.length) {
    container.innerHTML = `<p style="color: var(--text-muted); font-family: var(--font-mono); padding: 2rem 0;">No projects found in this domain.</p>`;
    return;
  }

  container.innerHTML = projects.map(project => {
    const tagsHtml = project.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
    
    let actionHtml = '';
    if (project.isPrivate) {
      actionHtml = `<span class="confidential-notice">Private repository (Confidential startup hardware)</span>`;
    } else if (project.repoUrl) {
      actionHtml = `
        <a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer">
          GitHub Repository ↗
        </a>
      `;
    }

    return `
      <article class="project-item">
        <div class="project-header">
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <span class="project-meta-label">${escapeHtml(project.domainLabel)}</span>
        </div>
        <p class="project-description">${escapeHtml(project.description)}</p>
        <div class="project-tags">${tagsHtml}</div>
        <div class="project-actions">
          ${actionHtml}
        </div>
      </article>
    `;
  }).join('');
}

function initContactActions() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = (typeof PORTFOLIO_CONFIG !== 'undefined' && PORTFOLIO_CONFIG.profile.links.email)
        ? PORTFOLIO_CONFIG.profile.links.email
        : 'shubhamjain00050@gmail.com';

      navigator.clipboard.writeText(email).then(() => {
        const prev = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.color = 'var(--copper-hover)';
        setTimeout(() => {
          copyBtn.textContent = prev;
          copyBtn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }

  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName')?.value.trim();
      const email = document.getElementById('formEmail')?.value.trim();
      const message = document.getElementById('formMessage')?.value.trim();
      
      const recipient = (typeof PORTFOLIO_CONFIG !== 'undefined' && PORTFOLIO_CONFIG.profile.links.email)
        ? PORTFOLIO_CONFIG.profile.links.email
        : 'shubhamjain00050@gmail.com';

      const subject = encodeURIComponent(`Message from ${name}`);
      const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.style.color = 'var(--copper-hover)';
        statusEl.textContent = 'Opening your email client... You can also copy my email directly above.';
      }
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
