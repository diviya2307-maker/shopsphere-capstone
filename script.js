const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$79",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description:
      "Experience immersive sound with premium wireless headphones designed for music, calls, and all-day comfort."
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: "$129",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    description:
      "Track fitness, receive notifications, and elevate your daily productivity with this sleek smartwatch."
  },
  {
    id: 3,
    name: "Classic Sneakers",
    category: "Fashion",
    price: "$59",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Stylish everyday sneakers that blend comfort, durability, and modern streetwear appeal."
  },
  {
    id: 4,
    name: "Minimal Table Lamp",
    category: "Home Decor",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    description:
      "A warm and elegant table lamp that enhances your workspace or bedroom with soft ambient lighting."
  },
  {
    id: 5,
    name: "Yoga Mat Pro",
    category: "Fitness",
    price: "$35",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    description:
      "High-grip yoga mat suitable for home workouts, stretching sessions, and daily exercise routines."
  },
  {
    id: 6,
    name: "Leather Backpack",
    category: "Fashion",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Carry your essentials in style with a spacious and premium backpack built for both work and travel."
  }
];

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll("[data-route]");
const productsGrid = document.getElementById("productsGrid");
const featuredProducts = document.getElementById("featuredProducts");
const productDetails = document.getElementById("productDetails");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const backToProducts = document.getElementById("backToProducts");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-links");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const shopNowBtn = document.getElementById("shopNowBtn");
const learnMoreBtn = document.getElementById("learnMoreBtn");

function showPage(pageId) {
  pages.forEach((page) => page.classList.remove("active-page"));
  document.getElementById(pageId).classList.add("active-page");
  window.scrollTo({ top: 0, behavior: "smooth" });
  navMenu.classList.remove("show");
}

function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${product.price}</p>
        <p class="product-description">${product.description}</p>
        <div class="card-buttons">
          <button class="small-btn" onclick="viewDetails(${product.id})">View Details</button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(filteredProducts = products) {
  productsGrid.innerHTML = filteredProducts
    .map((product) => createProductCard(product))
    .join("");
}

function renderFeaturedProducts() {
  const featured = products.slice(0, 3);
  featuredProducts.innerHTML = featured
    .map((product) => createProductCard(product))
    .join("");
}

function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

function viewDetails(productId) {
  const product = products.find((item) => item.id === productId);

  productDetails.innerHTML = `
    <div class="details-layout">
      <div class="details-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="details-info">
        <span class="product-category">${product.category}</span>
        <h2>${product.name}</h2>
        <p class="product-price">${product.price}</p>
        <p>${product.description}</p>
        <p>
          This product is part of the ShopSphere product catalog capstone project.
          It is displayed using dynamically rendered JavaScript content with a
          responsive layout and modular component structure.
        </p>
        <button class="btn primary" onclick="showPage('products')">Back to Products</button>
      </div>
    </div>
  `;

  showPage("details");
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetPage = link.dataset.route;
    showPage(targetPage);
  });
});

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

backToProducts.addEventListener("click", () => {
  showPage("products");
});

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formMessage.textContent = "Your message has been submitted successfully!";
  contactForm.reset();
});

shopNowBtn.addEventListener("click", () => {
  showPage("products");
});

learnMoreBtn.addEventListener("click", () => {
  showPage("about");
});

renderProducts();
renderFeaturedProducts();

window.viewDetails = viewDetails;
window.showPage = showPage;