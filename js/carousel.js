export class Carousel {
  constructor(containerElement, items, config) {
    this.container = containerElement;
    this.items = items;
    this.config = config;
    
    this.currentIndex = 0;
    this.itemsPerView = this.getItemsPerView();
    
    this.isSwiping = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  getItemsPerView() {
    const width = window.innerWidth;
    if (width >= 1024) return this.config.desktop;
    if (width >= 768) return this.config.tablet;
    return this.config.mobile;
  }

  init() {
    this.render();
    this.attachEvents();
    this.updateControls();
  }

  render() {
    // Check if arrows should be shown
    const showArrows = this.config.showArrows;
    
    let html = `
      <div class="carousel-track-wrapper" id="carouselTrackWrapper">
        <div class="carousel-track" id="carouselTrack">
    `;
    
    this.items.forEach(item => {
      html += `
        <div class="carousel-item-wrapper" style="width: ${100 / this.itemsPerView}%">
          <div class="product-card">
            <div class="product-image-container">
              <img src="${item.image}" alt="${item.title}" class="product-image" />
            </div>
            <div class="product-content">
              <h3 class="product-title">${item.title}</h3>
              <p class="product-description">${item.description}</p>
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    if (showArrows) {
      html += `
        <div class="carousel-controls">
          <button class="carousel-arrow prev" id="carouselPrev" aria-label="Previous items">&larr;</button>
          <button class="carousel-arrow next" id="carouselNext" aria-label="Next items">&rarr;</button>
        </div>
      `;
    }

    this.container.innerHTML = html;
    
    this.track = this.container.querySelector('#carouselTrack');
    this.trackWrapper = this.container.querySelector('#carouselTrackWrapper');
    this.prevBtn = this.container.querySelector('#carouselPrev');
    this.nextBtn = this.container.querySelector('#carouselNext');
  }

  attachEvents() {
    window.addEventListener('resize', () => {
      this.itemsPerView = this.getItemsPerView();
      this.currentIndex = Math.min(this.currentIndex, Math.max(0, this.items.length - this.itemsPerView));
      // Re-render item widths
      const itemsWrappers = this.container.querySelectorAll('.carousel-item-wrapper');
      itemsWrappers.forEach(wrap => {
        wrap.style.width = `${100 / this.itemsPerView}%`;
      });

      this.updateTrackPosition();
      this.updateControls();
    });

    if (this.prevBtn && this.nextBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
    }

    if (this.trackWrapper) {
      this.trackWrapper.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
        this.track.style.transition = 'none'; // Disable transition for instant feedback
      }, {passive: true});

      this.trackWrapper.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, {passive: true});
    }
  }

  handleSwipe() {
    this.track.style.transition = 'transform 300ms ease-in-out';
    const threshold = 50;
    if (this.touchStartX - this.touchEndX > threshold) {
      this.next();
    } else if (this.touchEndX - this.touchStartX > threshold) {
      this.prev();
    } else {
      this.updateTrackPosition(); // Snap back
    }
  }

  next() {
    const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateTrackPosition();
      this.updateControls();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTrackPosition();
      this.updateControls();
    }
  }

  updateTrackPosition() {
    if(!this.track) return;
    const offset = this.currentIndex * (100 / this.itemsPerView);
    this.track.style.transform = `translateX(-${offset}%)`;
  }


  updateControls() {
    if (!this.prevBtn || !this.nextBtn) return;
    
    const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
    
    if (this.currentIndex === 0) {
      this.prevBtn.disabled = true;
    } else {
      this.prevBtn.disabled = false;
    }

    if (this.currentIndex >= maxIndex) {
      this.nextBtn.disabled = true;
    } else {
      this.nextBtn.disabled = false;
    }
  }
}
