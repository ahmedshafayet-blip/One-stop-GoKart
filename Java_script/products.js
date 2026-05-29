// Produkter array med all data
const products = [
  {
    id: 1,
    name: "OTK Tony Kart Steering Wheel",
    price: "$89",
    category: "Steering",
    image: "../Bilder/gokart_steering_wheel.webp",
    alt: "OTK Tony Kart Steering Wheel",
    dataName: "otk tony kart steering wheel steering",
    dataPrice: "89",
    emoji: "🎯"
  },
  {
    id: 2,
    name: "IAME X30 Engine 125cc Full Kit",
    price: "$1,499",
    category: "Engine",
    image: "../Bilder/125cc_engine.jpg",
    alt: "IAME X30 Engine 125cc",
    dataName: "iame x30 engine 125cc engine Full Kit",
    dataPrice: "1499",
    emoji: "⚙️"
  },
  {
    id: 3,
    name: "MG Tyres Medium Compound Set",
    price: "$219",
    category: "Tyres",
    image: "../Bilder/tyre.webp",
    alt: "MG Tyres Medium Compound set",
    dataName: "mg tyres medium compound set tyres",
    dataPrice: "219",
    emoji: "⭕"
  },
  {
    id: 4,
    name: "Adjustable Rear Axle 50mm",
    price: "$134",
    category: "Axle",
    image: "../Bilder/rear_axle_2.webp",
    alt: "Adjustable Rear Axle 50mm",
    dataName: "adjustable rear axle 50mm axle",
    dataPrice: "134",
    emoji: "🔩"
  },
  {
    id: 5,
    name: "OMP Racing Suit — Red/Black",
    price: "$279",
    category: "apparel",
    image: "../Bilder/racesuit.webp",
    alt: "OMP Racing Suit Black and Red",
    dataName: "omp racing suit red black apparel",
    dataPrice: "279",
    emoji: "🏎️"
  },
  {
    id: 6,
    name: "Adjustable Front Axle 25mm",
    price: "$119",
    category: "Axle",
    image: "../Bilder/front_axle_2.webp",
    alt: "Adjustable Front Axle 25mm",
    dataName: "adjustable front axle 25mm axle",
    dataPrice: "134",
    emoji: "🔩"
  },
  {
    id: 10,
    name: "MG Tyres Hard Compound Set",
    price: "$235",
    category: "Tyres",
    image: "../Bilder/tyre.webp",
    alt: "MG Tyres Hard Compound set",
    dataName: "mg tyres hard compound set tyres",
    dataPrice: "235",
    emoji: "⭕"
  },
  {
    id: 7,
    name: "Brake Caliper Kit (wire, disc, caliper)",
    price: "$112",
    category: "Brakes",
    image: "../Bilder/brake_caliper_2.jpg",
    alt: "Brake Caliper Kit",
    dataName: "brake caliper kit brakes",
    dataPrice: "112",
    emoji: "🛑"
  },
  {
    id: 8,
    name: "Carbon Fibre Front Fairing",
    price: "$195",
    category: "Bodywork",
    image: "../Bilder/front_fairing_carbon.webp",
    alt: "Carbon Fiber Front Fairing",
    dataName: "carbon fibre front fairing bodywork",
    dataPrice: "195",
    emoji: "🪄"
  },
  {
    id: 9,
    name: "Digital Lap Timer",
    price: "$64",
    category: "Electronics",
    image: "../Bilder/digital_lap_timer_2.png",
    alt: "Digital Lap Timer",
    dataName: "digital lap timer electronics",
    dataPrice: "64",
    emoji: "⏱️"
  },
  {
    id: 11,
    name: "MG Tyres Soft Compound Set",
    price: "$249",
    category: "Tyres",
    image: "../Bilder/tyre.webp",
    alt: "MG Tyres Medium Compound set",
    dataName: "mg tyres soft compound set tyres",
    dataPrice: "249",
    emoji: "⭕"
  },
  {
    id: 12,
    name: "IAME X50 Engine 250cc Full Kit",
    price: "$2,149",
    category: "Engine",
    image: "../Bilder/250cc_engine.jpg",
    alt: "IAME X50 Engine 250cc",
    dataName: "iame x50 engine 250cc engine Full Kit",
    dataPrice: "2149",
    emoji: "⚙️"
  },
  {
    id: 13,
    name:"Racing Gloves",
    price: "$39",
    category: "apparel",
    image: "../Bilder/racing_gloves.png",
    alt: "Racing Gloves",
    dataName: "Racing Gloves Apparel",
    dataPrice: "39",
    emoji: "🏎️"
  },
  {
    id: 14,
    name:"Analog Speedometer Kit",
    price: "$50",
    category: "Electronics",
    image: "../Bilder/analog_speedometer.jpg",
    alt: "Analog Speedometer",
    dataName: "Analog Speedometer Kit Electronics",
    dataPrice: "50",
    emoji: "⏱️"
  },
  {
    id: 15,
    name:"Motul 2T Motor Oil 1L",
    price: "$29",
    category: "Engine",
    image: "../Bilder/Motul_oil.jpg",
    alt: "Motul 2T Motor Oil 1L",
    dataName: "Motul 2T Motor Oil 1L Engine",
    dataPrice: "29",
    emoji: "⚙️"
  }
];

// Funktion för att generera produktboxarna
function generateProducts() {
  const productsGrid = document.getElementById('productsGrid');
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-name', product.dataName);
    
    // Special case för Apparel produkten (badge före img)
    if (product.category === 'Apparel') {
      productCard.innerHTML = `
        <span class="product-cat-badge">${product.category}</span>
        <div class="product-img">
          <img src="${product.image}" alt="${product.alt}"/>
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price}</div>
          <button class="add-to-cart"
            data-id="${product.id}" data-name="${product.name}"
            data-price="${product.dataPrice}" data-cat="${product.category}" data-emoji="${product.emoji}">
            <span>Add to Cart</span>
          </button>
        </div>
      `;
    } else {
      productCard.innerHTML = `
        <div class="product-img">
          <img src="${product.image}" alt="${product.alt}"/>
          <span class="product-cat-badge">${product.category}</span>
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price}</div>
          <button class="add-to-cart"
            data-id="${product.id}" data-name="${product.name}"
            data-price="${product.dataPrice}" data-cat="${product.category}" data-emoji="${product.emoji}">
            <span>Add to Cart</span>
          </button>
        </div>
      `;
    }
    
    productsGrid.appendChild(productCard);
  });
}

// Kör funktionen när DOM är laddat
document.addEventListener('DOMContentLoaded', generateProducts);
