// search bar funktion
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
  // Remove active from all chips, set on the clicked one
  const allChips = document.querySelectorAll('.filter-chip');
  allChips.forEach(function(chip) {
    chip.classList.remove('active');
  });
  clickedChip.classList.add('active');

  // Update the tracked category
  activeCategory = clickedChip.dataset.filter;

  // Re-apply filters using current search text too
  const currentQuery = document.getElementById('searchInput').value.toLowerCase().trim();
  applyFilters(currentQuery, activeCategory);
}

