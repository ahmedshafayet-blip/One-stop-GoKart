function getCart() {
  const raw = localStorage.getItem('kp_cart');
  if (!raw) return [];        
  return JSON.parse(raw);     
}

function saveCart(cart) {
  localStorage.setItem('kp_cart', JSON.stringify(cart));
}

function increaseQty(id) {
  const cart = getCart();

  cart.forEach(function(item) {
    if (item.id === id) {
      item.qty = item.qty + 1;
    }
  });

  saveCart(cart);
  renderCart();
}

function decreaseQty(id) {
  let cart = getCart();

  cart.forEach(function(item) {
    if (item.id === id) {
      item.qty = item.qty - 1;
    }
  });

  // tar bort saker till noll
  cart = cart.filter(function(item) {
    return item.qty > 0;
  });

  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  let cart = getCart();

  cart = cart.filter(function(item) {
    return item.id !== id;
  });

  saveCart(cart);
  renderCart();
}

function clearCart() {
  const confirmed = confirm('Clear your entire cart?');
  if (!confirmed) return;

  saveCart([]);
  renderCart();
}

function calculateTotals(cart) {
  const subtotal = cart.reduce(function(sum, item) {
    return sum + (item.price * item.qty);
  }, 0);

  const shipping = subtotal >= 500 ? 0 : 99;
  const total    = subtotal + shipping;

  return { subtotal, shipping, total };
}

function buildItemHTML(item) {
  const lineTotal = item.price * item.qty;

  return `
    <div class="cart-item">

      <div class="item-emoji">${item.emoji}</div>

      <div class="item-info">
        <div class="item-cat">${item.cat}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-unit-price">$${item.price.toLocaleString()} each</div>
      </div>

      <div class="item-controls">
        <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
        <span class="qty-display">${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
      </div>

      <div class="item-total">$${lineTotal.toLocaleString()}</div>

      <button class="remove-btn" data-action="remove" data-id="${item.id}" title="Remove">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>

    </div>
  `;
}

function renderCart() {
  const cart = getCart();

  // update item count in the title 
  const totalQty = cart.reduce(function(sum, item) {
    return sum + item.qty;
  }, 0);
  document.getElementById('itemCount').textContent = totalQty;

  const emptyState  = document.getElementById('emptyState');
  const itemList    = document.getElementById('itemList');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearBtn    = document.getElementById('clearBtn');

  // Tom cart 
  if (cart.length === 0) {
    emptyState.classList.remove('hidden');
    itemList.classList.add('hidden');
    checkoutBtn.classList.add('hidden');
    clearBtn.classList.add('hidden');
    updateSummary(0, 99, 99);
    document.getElementById('freeShippingNote').classList.remove('hidden');
    return;
  }

  // När cart har saker
  emptyState.classList.add('hidden');
  itemList.classList.remove('hidden');
  checkoutBtn.classList.remove('hidden');
  clearBtn.classList.remove('hidden');

  itemList.innerHTML = cart.map(buildItemHTML).join('');

  // uppdatera pris totalet
  const { subtotal, shipping, total } = calculateTotals(cart);
  updateSummary(subtotal, shipping, total);

  // show/hide the free shipping note
  const note = document.getElementById('freeShippingNote');
  if (shipping === 0) {
    note.textContent = '🎉 You have free shipping!';
    note.classList.remove('hidden');
  } else {
    const remaining = 1000 - subtotal;
    note.textContent = `Spend $${remaining} more for free shipping!`;
    note.classList.remove('hidden');
  }

  // BORTTAGET: attachItemListeners() anropas INTE här längre
  // Förut kördes den varje gång renderCart() kördes vilket
  // skapade dubbla lyssnare → dubblerade klick
}

function updateSummary(subtotal, shipping, total) {
  document.getElementById('subtotalVal').textContent = '$' + subtotal.toLocaleString();

  const shippingEl = document.getElementById('shippingVal');
  if (shipping === 0) {
    shippingEl.textContent = 'Free';
    shippingEl.style.color = '#f5a623';
  } else {
    shippingEl.textContent = '$' + shipping;
    shippingEl.style.color = '#b0acaa';
  }

  document.getElementById('totalVal').textContent = '$' + total.toLocaleString();
}

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('itemList').addEventListener('click', function(event) {
    const btn = event.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id     = parseInt(btn.dataset.id);

    if (action === 'inc')    increaseQty(id);
    if (action === 'dec')    decreaseQty(id);
    if (action === 'remove') removeItem(id);
  });

  // Clear cart knapp
  document.getElementById('clearBtn').addEventListener('click', clearCart);

  // Checkout knappen 
  document.getElementById('checkoutBtn').addEventListener('click', function() {
    alert('Checkout coming soon!');
  });

  renderCart();

});