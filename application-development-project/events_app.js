// Events Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Gallery Carousel Functionality
    const galleryCarousel = document.querySelector('.gallery-carousel');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');

    if (galleryCarousel && carouselPrev && carouselNext) {
        carouselPrev.addEventListener('click', () => {
            galleryCarousel.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        });
        
        carouselNext.addEventListener('click', () => {
            galleryCarousel.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        });
    }

    // Register button functionality for portrait cards
    document.querySelectorAll('.register-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                alert('Registration functionality would open here');
            }, 150);
        });
    });

    // Past events gallery click functionality
    document.querySelectorAll('.past-event-gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                // In a real implementation, this would open a lightbox or modal
                alert('Past event details would open here');
            }, 150);
        });
    });
    
    // Mobile Menu Functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');
    
    function toggleMenu() {
        mobileMenu.classList.toggle('translate-y-full');
        mobileMenu.classList.toggle('opacity-0');
        
        const isVisible = !mobileMenu.classList.contains('translate-y-full');
        const icon = menuButton.querySelector('i');
        icon.setAttribute('data-lucide', isVisible ? 'x' : 'menu');
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        document.body.style.overflow = isVisible ? 'hidden' : '';
    }
    
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && menuButton) {
            const isMenuClick = mobileMenu.contains(e.target) || menuButton.contains(e.target);
            if (!isMenuClick && !mobileMenu.classList.contains('translate-y-full')) {
                toggleMenu();
            }
        }
    });
    
    // Add event button functionality
    const addEventBtn = document.getElementById('add-event-btn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => {
            // Add click animation
            addEventBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                addEventBtn.style.transform = '';
                alert('Add Event functionality would open a modal here');
            }, 150);
        });
    }
    
    // Initialize poster popup functionality
    initPosterPopup();
    
    // Add scroll-triggered animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all animated elements
        document.querySelectorAll('.slide-up, .slide-in-left').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Re-initialize Lucide icons periodically
    if (typeof lucide !== 'undefined') {
        setInterval(() => {
            lucide.createIcons();
        }, 1000);
    }
});

// Poster Popup Functionality
function initPosterPopup() {
    const popup = document.getElementById('poster-popup');
    const popupImage = document.getElementById('popup-image');
    const popupTitle = document.getElementById('popup-title');
    const popupDate = document.getElementById('popup-date');
    const closeBtn = document.getElementById('close-popup');
    const prevBtn = document.getElementById('prev-poster');
    const nextBtn = document.getElementById('next-poster');
    
    let currentPosters = [];
    let currentIndex = 0;
    
    // Get all poster elements
    const posterElements = document.querySelectorAll('.poster-clickable');
    
    // Click handler for posters
    posterElements.forEach((element, index) => {
        element.addEventListener('click', function(e) {
            // Prevent event bubbling to parent elements
            e.stopPropagation();
            
            // Get all posters in current view
            currentPosters = Array.from(posterElements);
            currentIndex = index;
            
            // Show the clicked poster
            showPoster(currentIndex);
            
            // Show popup
            popup.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Reinitialize icons for popup
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
    
    // Show specific poster
    function showPoster(index) {
        const poster = currentPosters[index];
        popupImage.src = poster.dataset.poster;
        popupImage.alt = poster.dataset.title || 'Event Poster';
        popupTitle.textContent = poster.dataset.title || 'Event';
        popupDate.textContent = poster.dataset.date || '';
        
        // Update navigation buttons state
        prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
        nextBtn.style.visibility = index < currentPosters.length - 1 ? 'visible' : 'hidden';
    }
    
    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            showPoster(currentIndex);
        }
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex < currentPosters.length - 1) {
            currentIndex++;
            showPoster(currentIndex);
        }
    });
    
    // Close popup
    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!popup.classList.contains('hidden')) {
            if (e.key === 'Escape') closePopup();
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                showPoster(currentIndex);
            }
            if (e.key === 'ArrowRight' && currentIndex < currentPosters.length - 1) {
                currentIndex++;
                showPoster(currentIndex);
            }
        }
    });
    
    function closePopup() {
        popup.classList.add('hidden');
        document.body.style.overflow = '';
    }
}