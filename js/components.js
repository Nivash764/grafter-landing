export const components = {
  renderNavigation: (data, container) => {
    container.innerHTML = `
      <div class="logo-container">
        <img src="${data.logo.src}" alt="${data.logo.alt}" class="logo" />
      </div>
      <nav class="nav-links">
        ${data.links.map(link => `<a href="#${link.toLowerCase()}">${link}</a>`).join('')}
      </nav>
      <button class="nav-cta">${data.CTA_button}</button>
    `;
  },
  
  renderHero: (data, container) => {
    container.innerHTML = `
      <div class="hero-content">
        <h1 class="hero-headline">
          ${data.headlinePrefix}
          <span class="gradient-text">${data.headlineGradient}</span>
        </h1>
        <p class="hero-subheadline">${data.subheadline}</p>
        <div class="hero-cta-wrapper">
          <a href="#products" class="gradient-button" style="text-decoration: none;">${data.CTA}</a>
        </div>
      </div>
      ${data.decorative_shapes.circle ? '<div class="floating-shape shape-circle hero-shape-1" aria-hidden="true"></div>' : ''}
      ${data.decorative_shapes.rectangle ? '<div class="floating-shape shape-rectangle hero-shape-2" aria-hidden="true"></div>' : ''}
    `;
  },

  renderFeaturesHeader: (data, container) => {
    container.innerHTML = `
      <h2 class="features-title">
        ${data.title}
        <span class="gradient-text">${data.titleAccent}</span>
      </h2>
      <button id="openModalBtn" style="margin-bottom: 24px; padding: 8px 16px; border-radius: 20px; background: #e5e7eb; color: var(--color-primary); font-weight: 600; font-size: 0.875rem;">➕ Add Product</button>
      <div class="features-divider"></div>
      <p class="features-subtitle">${data.subtitle}</p>
    `;
  },

  renderSolutions: (data, container) => {
    container.innerHTML = `
      <div class="features-header">
        <h2 class="features-title">
          ${data.title}
          <span class="gradient-text">${data.titleAccent}</span>
        </h2>
        <div class="features-divider"></div>
        <p class="features-subtitle">${data.subtitle}</p>
      </div>
      <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin-top: 40px;">
        ${data.cards.map(card => `
          <div class="product-card" style="width: 300px; text-align: center; padding: 40px 24px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">${card.icon}</div>
            <h3 class="product-title">${card.title}</h3>
            <p class="product-description">${card.description}</p>
          </div>
        `).join('')}
      </div>
    `;
  },

  showError: (container, message, retryCallback) => {
    container.innerHTML = `
      <div style="padding: 60px 20px; text-align: center;">
        <h2 style="margin-bottom: 16px;">Something went wrong.</h2>
        <p style="margin-bottom: 24px; color: var(--color-text-muted);">${message}</p>
        <button id="retryBtn" class="gradient-button">Retry</button>
      </div>
    `;
    const btn = container.querySelector('#retryBtn');
    if (btn && retryCallback) {
      btn.addEventListener('click', retryCallback);
    }
  }
};
