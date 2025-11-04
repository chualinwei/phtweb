/*
 * MERCHANDISE PAGE JAVASCRIPT
 * Dedicated JS for merchandise page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Category data
    const categories = [
        {
            id: 1,
            name: "Tiffin boxes",
            description: "Accesories",
            image: "https://pht.org.my/wp-content/uploads/2020/07/WhatsApp-Image-2018-12-21-at-14.23.51.jpeg",
            color: "bg-maroon/20",
            url: "1product.html"
        },
        {
            id: 2,
            name: "Batik coin purse",
            description: "Heritage",
            image: "https://pht.org.my/wp-content/uploads/2020/07/IMG_5172.jpg",
            color: "bg-beige/50",
            url: ""
        },
        {
            id: 3,
            name: "Cheongsam Vase",
            description: "Souvenir",
            image: "https://pht.org.my/wp-content/uploads/2020/07/souvenirs-08.jpg",
            color: "bg-maroon-light/30",
            url: ""
        },
        {
            id: 4,
            name: "Notebooks",
            description: "Cultural home items",
            image: "https://pht.org.my/wp-content/uploads/2020/07/batik-notebook-L-1.jpeg",
            color: "bg-beige-dark/40",
            url: ""
        },
        {
            id: 5,
            name: "Books",
            description: "English books",
            image: "https://pht.org.my/wp-content/uploads/2020/06/EnglishBooks-03-350x467.jpg",
            color: "bg-maroon/20",
            url: ""
        }
    ];
    
    // Product data
    const products = [
        {
            id: 1,
            name: "Heritage T-Shirt",
            price: "RM 45.00",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Apparel"
        },
        {
            id: 2,
            name: "George Town Guidebook",
            price: "RM 35.00",
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Books & Guides"
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
            name: "Penang Street Art Print",
            price: "RM 60.00",
            image: "https://images.unsplash.com/photo-1578321272177-44c1864f0d56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Art & Prints"
        },
        {
            id: 6,
            name: "Heritage Cap",
            price: "RM 40.00",
            image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "Apparel"
        }
    ];
    
    // Initialize category carousel
    let currentCategoryIndex = 0;
    const categoryTrack = document.getElementById('category-track');
    
    function renderCategories() {
        categoryTrack.innerHTML = '';
        
        categories.forEach((category, index) => {
            const categoryCard = document.createElement('div');
            categoryCard.className = `category-card morph-interact ${category.color}`;
            categoryCard.setAttribute('data-index', index);
            
            // Determine position class based on index relative to current
            let positionClass = 'hidden';
            const diff = index - currentCategoryIndex;
            
            if (diff === 0) {
                positionClass = 'active';
            } else if (diff === -2 || diff === 3) {
                positionClass = 'far-left';
            } else if (diff === -1 || diff === 4) {
                positionClass = 'left';
            } else if (diff === 1 || diff === -4) {
                positionClass = 'right';
            } else if (diff === 2 || diff === -3) {
                positionClass = 'far-right';
            }
            
            categoryCard.classList.add(positionClass);
            
            categoryCard.innerHTML = `
                <a href = "${category.url}">
                    <div class="category-image" style="background-image: url('${category.image}')"></div>
                    <div class="p-6">
                        <h3 class="text-2xl font-serif text-gray-800 mb-2">${category.name}</h3>
                        <p class="text-black">${category.description}</p>
                    </div>
                </a>
            `;
            
            categoryCard.addEventListener('click', (event) => {
                if (positionClass!== 'active') {
                    event.preventDefault();
                    currentCategoryIndex = index;
                    renderCategories();
                }
            });
            
            categoryTrack.appendChild(categoryCard);
        });
    }
    
    // Navigation for category carousel
    document.getElementById('next-category').addEventListener('click', () => {
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        renderCategories();
    });
    
    document.getElementById('prev-category').addEventListener('click', () => {
        currentCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
        renderCategories();
    });
    
    // Auto-rotate categories
    let autoRotateInterval = setInterval(() => {
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        renderCategories();
    }, 5000);
    
    // Pause auto-rotation on hover
    categoryTrack.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    categoryTrack.addEventListener('mouseleave', () => {
        autoRotateInterval = setInterval(() => {
            currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
            renderCategories();
        }, 5000);
    });
    
    // Render products
    function renderProducts() {
        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-white/80 backdrop-blur-sm border border-beige-dark/30';
            
            productCard.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="p-6">
                    <h3 class="text-xl font-serif text-gray-800 mb-2">${product.name}</h3>
                    <p class="text-maroon font-semibold text-lg mb-4">${product.price}</p>
                    <button class="morph-interact w-full py-3 bg-maroon text-white rounded-lg font-semibold hover:bg-maroon-light transition-colors duration-300">
                        Add to Cart
                    </button>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
    }
    
    // Initialize the page
    renderCategories();
    renderProducts();
});