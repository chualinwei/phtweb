/*
 * PRODUCT PAGE JAVASCRIPT
 * Dedicated JS for single product page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Similar products data
    const similarProducts = [
        {
            id: 2,
            name: "Heritage Cap",
            price: "RM 40.00",
            image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Apparel"
        },
        {
            id: 3,
            name: "Heritage Tote Bag",
            price: "RM 25.00",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Accessories"
        },
        {
            id: 4,
            name: "Ceramic Heritage Mug",
            price: "RM 30.00",
            image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Home Decor"
        },
        {
            id: 5,
            name: "George Town Guidebook",
            price: "RM 35.00",
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Books & Guides"
        }
    ];
    
    // Thumbnail image click handler
    function initializeThumbnails() {
        document.querySelectorAll('.thumbnail-image').forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                document.querySelectorAll('.thumbnail-image').forEach(t => {
                    t.classList.remove('active');
                    const img = t.querySelector('img');
                    img.classList.remove('border-maroon');
                    img.classList.add('border-gray-300');
                });
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                const clickedImg = this.querySelector('img');
                clickedImg.classList.remove('border-gray-300');
                clickedImg.classList.add('border-maroon');
                
                // Update main image
                const mainImage = document.getElementById('main-image');
                const newImageSrc = this.getAttribute('data-image');
                mainImage.src = newImageSrc;
                mainImage.alt = clickedImg.alt;
            });
        });
    }
    
    // Color selection handler
    function initializeColorSelection() {
        document.querySelectorAll('.color-option').forEach(colorOption => {
            colorOption.addEventListener('click', function() {
                // Remove active class from all color options
                document.querySelectorAll('.color-option').forEach(option => {
                    option.classList.remove('active');
                    option.classList.remove('border-maroon');
                    option.classList.add('border-gray-300');
                });
                
                // Add active class to clicked color option
                this.classList.add('active');
                this.classList.remove('border-gray-300');
                this.classList.add('border-maroon');
                
                // Update selected color text
                const selectedColorName = this.getAttribute('data-color-name');
                document.getElementById('selected-color').textContent = selectedColorName;
                
                console.log('Selected color:', selectedColorName);
            });
        });
    }
    
    // Add to cart functionality
    function initializeCartButtons() {
        document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            const product = {
                name: document.querySelector('h1').textContent,
                price: document.querySelector('.text-2xl').textContent,
                color: document.querySelector('.color-option.active').getAttribute('data-color-name'),
                image: document.getElementById('main-image').src
            };
            
            // Add to cart logic
            console.log('Added to cart:', product);
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> Added to Cart!';
            this.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
                lucide.createIcons();
            }, 2000);
        });
        
        // Buy now functionality
        document.querySelector('.buy-now-btn').addEventListener('click', function() {
            const product = {
                name: document.querySelector('h1').textContent,
                price: document.querySelector('.text-2xl').textContent,
                color: document.querySelector('.color-option.active').getAttribute('data-color-name')
            };
            
            // Redirect to checkout or implement checkout logic
            console.log('Buy now:', product);
            alert('Proceeding to checkout with: ' + product.name + ' in ' + product.color);
        });
    }
    
    // Render similar products
    function renderSimilarProducts() {
        const similarProductsGrid = document.getElementById('similar-products');
        similarProductsGrid.innerHTML = '';
        
        similarProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'similar-product-card bg-white/80 backdrop-blur-sm';
            
            productCard.innerHTML = `
                <a href="product.html" class="block">
                    <div class="similar-product-image" style="background-image: url('${product.image}')"></div>
                    <div class="p-4">
                        <h3 class="text-lg font-serif text-gray-800 mb-2">${product.name}</h3>
                        <p class="text-maroon font-semibold text-lg mb-3">${product.price}</p>
                        <button class="morph-interact w-full py-2 bg-maroon text-white rounded-lg font-semibold hover:bg-maroon-light transition-colors duration-300 text-sm">
                            View Details
                        </button>
                    </div>
                </a>
            `;
            
            similarProductsGrid.appendChild(productCard);
        });
    }
    
    // Initialize all functionality
    function initializePage() {
        initializeThumbnails();
        initializeColorSelection();
        initializeCartButtons();
        renderSimilarProducts();
    }
    
    // Initialize the page
    initializePage();
});