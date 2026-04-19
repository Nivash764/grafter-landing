import { api } from './api.js';
import { components } from './components.js';
import { Carousel } from './carousel.js';

const DOM = {
  nav: document.getElementById('navContainer'),
  hero: document.getElementById('heroContainer'),
  featuresHeader: document.getElementById('featuresHeader'),
  carousel: document.getElementById('carouselContainer'),
  solutions: document.getElementById('solutionsContainer'),
  
  // Skeletons
  navSkeleton: document.getElementById('navSkeleton'),
  heroSkeleton: document.getElementById('heroSkeleton'),
  featuresSkeleton: document.getElementById('featuresSkeleton'),
  solutionsSkeleton: document.getElementById('solutionsSkeleton'),
};

const app = {
  async init() {
    this.renderSkeletons();
    
    try {
      // We can fetch concurrently
      const [navData, heroData, featuresData, solutionsData] = await Promise.all([
        api.getNavigation(),
        api.getHeroContent(),
        api.getFeaturesContent(),
        api.getSolutionsContent()
      ]);
      
      this.hideSkeletons();
      this.renderNav(navData);
      this.renderHero(heroData);
      this.renderFeatures(featuresData);
      this.renderSolutions(solutionsData);
      
    } catch (error) {
      console.error(error);
      this.hideSkeletons();
      
      const appContainer = document.getElementById('appMain');
      components.showError(appContainer, error.message, () => {
        appContainer.innerHTML = `
          <header class="header container" id="navContainer"></header>
          <section id="hero" class="hero-section"><div class="container hero-container" id="heroContainer"></div></section>
          <section id="products" class="features-section">
            <div class="container">
              <div class="features-header" id="featuresHeader"></div>
              <div class="features-carousel-container" id="carouselContainer"></div>
            </div>
          </section>
          <section id="solutions" class="features-section" style="background-color: var(--color-bg-main);">
            <div class="container" id="solutionsContainer"></div>
          </section>
        `;
        // Rebind DOM
        DOM.nav = document.getElementById('navContainer');
        DOM.hero = document.getElementById('heroContainer');
        DOM.featuresHeader = document.getElementById('featuresHeader');
        DOM.carousel = document.getElementById('carouselContainer');
        DOM.solutions = document.getElementById('solutionsContainer');
        this.init();
      });
    }
  },

  renderSkeletons() {
    DOM.nav.classList.add('hidden');
    DOM.hero.classList.add('hidden');
    DOM.featuresHeader.classList.add('hidden');
    DOM.carousel.classList.add('hidden');
    if(DOM.solutions) DOM.solutions.classList.add('hidden');
    
    DOM.navSkeleton.classList.remove('hidden');
    DOM.heroSkeleton.classList.remove('hidden');
    DOM.featuresSkeleton.classList.remove('hidden');
    if(DOM.solutionsSkeleton) DOM.solutionsSkeleton.classList.remove('hidden');
  },

  hideSkeletons() {
    DOM.navSkeleton.classList.add('hidden');
    DOM.heroSkeleton.classList.add('hidden');
    DOM.featuresSkeleton.classList.add('hidden');
    if(DOM.solutionsSkeleton) DOM.solutionsSkeleton.classList.add('hidden');
    
    DOM.nav.classList.remove('hidden');
    DOM.hero.classList.remove('hidden');
    DOM.featuresHeader.classList.remove('hidden');
    DOM.carousel.classList.remove('hidden');
    if(DOM.solutions) DOM.solutions.classList.remove('hidden');
    
    DOM.nav.classList.add('fade-in');
    DOM.hero.classList.add('fade-in');
    DOM.featuresHeader.classList.add('fade-in');
    DOM.carousel.classList.add('fade-in');
    if(DOM.solutions) DOM.solutions.classList.add('fade-in');
  },

  renderNav(data) {
    components.renderNavigation(data, DOM.nav);
  },

  renderHero(data) {
    components.renderHero(data, DOM.hero);
  },

  renderFeatures(data) {
    components.renderFeaturesHeader(data, DOM.featuresHeader);
    let carouselInstance = new Carousel(DOM.carousel, data.products, data.carousel);

    // Modal Binding Logic
    const openBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('addDataModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('addDataForm');

    if (openBtn && modal && closeBtn && form) {
      openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
      closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
      
      // Submit logic creates data dynamically!
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('productTitle').value;
        const desc = document.getElementById('productDesc').value;
        const imgUrl = document.getElementById('productImage').value;

        // Push new data into runtime JSON object array
        data.products.push({
          id: String(data.products.length + 1),
          title: title,
          description: desc,
          image: imgUrl ? imgUrl : `https://placehold.co/400x250/E5E7EB/A1A1AA?text=${encodeURIComponent(title)}`
        });

        // Close Modal & Reset Form
        modal.classList.add('hidden');
        form.reset();

        // Re-render carousel with new updated Data!
        carouselInstance = new Carousel(DOM.carousel, data.products, data.carousel);
      });
    }
  },

  renderSolutions(data) {
    if(DOM.solutions) components.renderSolutions(data, DOM.solutions);
  }
};


document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
