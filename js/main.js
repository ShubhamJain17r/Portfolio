/**
 * Shubham Jain — Portfolio Main Scripts
 * Handles navigation, active link highlighting, project filtering, and contact actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  injectProfileData();
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

function injectProfileData() {
  if (typeof PORTFOLIO_CONFIG === 'undefined') return;
  const { profile } = PORTFOLIO_CONFIG;

  document.querySelectorAll('[data-link="github"]').forEach(el => el.href = profile.links.github);
  document.querySelectorAll('[data-link="linkedin"]').forEach(el => el.href = profile.links.linkedin);
  document.querySelectorAll('[data-link="leetcode"]').forEach(el => el.href = profile.links.leetcode);
  document.querySelectorAll('[data-link="email"]').forEach(el => {
    el.href = `mailto:${profile.links.email}`;
  });

  document.querySelectorAll('[data-config="email-val"]').forEach(el => el.textContent = profile.links.email);
}

function initProjectsList() {
  const container = document.getElementById('projectsContainer');
  if (!container || typeof PORTFOLIO_CONFIG === 'undefined') return;

  const projects = PORTFOLIO_CONFIG.projects || [];
  renderProjects(projects, container);

  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const domain = tab.getAttribute('data-domain');
      if (domain === 'all') {
        renderProjects(projects, container);
      } else {
        const filtered = projects.filter(p => p.domain === domain);
        renderProjects(filtered, container);
      }
    });
  });
}

function renderProjects(projects, container) {
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
        : 'shubham.jain@example.com';

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
        : 'shubham.jain@example.com';

      // Open mail client
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
