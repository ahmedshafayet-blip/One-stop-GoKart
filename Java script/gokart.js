// search bar funktion
function getCart() {
  const raw = localStorage.getItem('kp_cart');
  if (!raw) return [];
  return JSON.parse(raw);
}

function saveCart(cart) {
  localStorage.setItem('kp_cart', JSON.stringify(cart));
}

function addToCart(btn) {
  const item = {
    id:    parseInt(btn.dataset.id),
    name:  btn.dataset.name,
    price: parseInt(btn.dataset.price),
    cat:   btn.dataset.cat,
    emoji: btn.dataset.emoji,
    qty:   1
  };

  const cart     = getCart();
  const existing = cart.find(i => i.id === item.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  updateCartBadge();
}

function updateCartBadge() {
  const cart  = getCart();
  const total = cart.reduce(function(sum, item) { return sum + item.qty; }, 0);
  const badge = document.getElementById('cartBadge');

  badge.textContent = total;

  if (total > 0) {
    badge.classList.add('visible');
  } else {
    badge.classList.remove('visible');
  }
}

//Kollar på aktiva katigorier search bar function
let activeCategory = 'all';

function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  applyFilters(query, activeCategory);
}

// kalas av både search bar och framtida categori filter FIXA CATEGORI FILTER
function applyFilters(query, category) {
  const cards    = document.querySelectorAll('.product-card');
  const noResult = document.getElementById('noResults');
  let   visible  = 0;

  cards.forEach(function(card) {
    const cardText = card.dataset.name.toLowerCase();

    const matchesSearch   = cardText.includes(query);
    const matchesCategory = category === 'all' || cardText.includes(category);

    if (matchesSearch && matchesCategory) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  if (visible === 0) {
    noResult.classList.remove('hidden');
  } else {
    noResult.classList.add('hidden');
  }
}

//filter funktion
function handleChipClick(clickedChip) {
  const allChips = document.querySelectorAll('.filter-chip');
  allChips.forEach(function(chip) {
    chip.classList.remove('active');
  });
  clickedChip.classList.add('active');
  activeCategory = clickedChip.dataset.filter;
  const currentQuery = document.getElementById('searchInput').value.toLowerCase().trim();
  applyFilters(currentQuery, activeCategory);
}

function openMenu() {
  document.getElementById('menuOverlay').classList.add('open');
}

function closeMenu() {
  document.getElementById('menuOverlay').classList.remove('open');
}

function toggleMenu() {
  const overlay = document.getElementById('menuOverlay');
  if (overlay.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
}

function flashButton(btn) {
  const span = btn.querySelector('span');
  span.textContent = 'Added ✓';
  btn.classList.add('added');

  setTimeout(function() {
    span.textContent = 'Add to Cart';
    btn.classList.remove('added');
  }, 1200);
}

document.addEventListener('DOMContentLoaded', function() {

  // Search input
  document.getElementById('searchInput').addEventListener('input', handleSearch);

  // Hamburger knapp
  document.getElementById('burgerBtn').addEventListener('click', function(event) {
    event.stopPropagation();
    toggleMenu();
  });

  document.getElementById('menuBackdrop').addEventListener('click', closeMenu);

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeMenu();
  });

  document.getElementById('filterBar').addEventListener('click', function(event) {
    const chip = event.target.closest('.filter-chip');
    if (!chip) return;
    handleChipClick(chip);
  });

  // Add to cart
  document.getElementById('productsGrid').addEventListener('click', function(event) {
    const btn = event.target.closest('.add-to-cart');
    if (!btn) return;
    addToCart(btn);
    flashButton(btn);
  });

  updateCartBadge();

});