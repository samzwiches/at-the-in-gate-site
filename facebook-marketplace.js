const initialListings = [
  {
    id: crypto.randomUUID(),
    title: "2018 Honda Civic EX",
    category: "vehicles",
    condition: "good",
    price: 12800,
    location: "Austin, TX",
    distance: 8,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-04-24"
  },
  {
    id: crypto.randomUUID(),
    title: "iPhone 15 Pro 256GB",
    category: "electronics",
    condition: "like-new",
    price: 780,
    location: "Dallas, TX",
    distance: 12,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-04-23"
  },
  {
    id: crypto.randomUUID(),
    title: "Modern Sectional Sofa",
    category: "furniture",
    condition: "good",
    price: 450,
    location: "Houston, TX",
    distance: 20,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-04-22"
  },
  {
    id: crypto.randomUUID(),
    title: "Raised Garden Bed Kit",
    category: "home",
    condition: "new",
    price: 120,
    location: "Round Rock, TX",
    distance: 6,
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-04-19"
  },
  {
    id: crypto.randomUUID(),
    title: "Vintage Leather Jacket",
    category: "clothing",
    condition: "fair",
    price: 90,
    location: "San Antonio, TX",
    distance: 25,
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-04-18"
  },
  {
    id: crypto.randomUUID(),
    title: "MacBook Air M3",
    category: "electronics",
    condition: "new",
    price: 1850,
    location: "Georgetown, TX",
    distance: 14,
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-04-25"
  }
];

const listingState = {
  listings: [...initialListings]
};

const els = {
  keyword: document.getElementById("keywordInput"),
  category: document.getElementById("categoryFilter"),
  condition: document.getElementById("conditionFilter"),
  price: document.getElementById("priceFilter"),
  distance: document.getElementById("distanceFilter"),
  sort: document.getElementById("sortFilter"),
  grid: document.getElementById("listingGrid"),
  count: document.getElementById("resultCount"),
  empty: document.getElementById("emptyState"),
  clear: document.getElementById("clearButton"),
  search: document.getElementById("searchForm"),
  sell: document.getElementById("sellButton"),
  dialog: document.getElementById("createDialog"),
  createForm: document.getElementById("createForm"),
  titleInput: document.getElementById("titleInput"),
  categoryInput: document.getElementById("categoryInput"),
  priceInput: document.getElementById("priceInput"),
  conditionInput: document.getElementById("conditionInput"),
  locationInput: document.getElementById("locationInput"),
  distanceInput: document.getElementById("distanceInput"),
  imageInput: document.getElementById("imageInput")
};

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function matchesPrice(price, filter) {
  if (filter === "under100") return price < 100;
  if (filter === "100to500") return price >= 100 && price <= 500;
  if (filter === "500to2000") return price > 500 && price <= 2000;
  if (filter === "over2000") return price > 2000;
  return true;
}

function getFiltered() {
  const query = els.keyword.value.trim().toLowerCase();

  return listingState.listings
    .filter((item) => {
      const inText = `${item.title} ${item.location} ${item.category} ${item.condition}`.toLowerCase().includes(query);
      const inCategory = els.category.value === "all" || item.category === els.category.value;
      const inCondition = els.condition.value === "all" || item.condition === els.condition.value;
      const inPrice = matchesPrice(item.price, els.price.value);
      const inDistance = els.distance.value === "all" || item.distance <= Number(els.distance.value);

      return inText && inCategory && inCondition && inPrice && inDistance;
    })
    .sort((a, b) => {
      if (els.sort.value === "price-low") return a.price - b.price;
      if (els.sort.value === "price-high") return b.price - a.price;
      if (els.sort.value === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
}

function render() {
  const items = getFiltered();
  els.count.textContent = String(items.length);
  els.empty.hidden = items.length > 0;

  els.grid.innerHTML = items.map((item) => `
    <article class="card" aria-label="${item.title}">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="card-content">
        <div class="price">${money.format(item.price)}</div>
        <div class="title">${item.title}</div>
        <div class="meta">${item.location} · ${item.distance} mi</div>
        <span class="pill">${item.condition}</span>
      </div>
    </article>
  `).join("");
}

function clearFilters() {
  els.keyword.value = "";
  els.category.value = "all";
  els.condition.value = "all";
  els.price.value = "all";
  els.distance.value = "all";
  els.sort.value = "recommended";
  render();
}

function openCreateDialog() {
  els.dialog.showModal();
}

function createListing(event) {
  event.preventDefault();

  listingState.listings.unshift({
    id: crypto.randomUUID(),
    title: els.titleInput.value.trim(),
    category: els.categoryInput.value,
    condition: els.conditionInput.value,
    price: Number(els.priceInput.value),
    location: els.locationInput.value.trim(),
    distance: Number(els.distanceInput.value),
    image: els.imageInput.value.trim() || "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString().slice(0, 10)
  });

  els.createForm.reset();
  els.dialog.close();
  render();
}

els.search.addEventListener("submit", (event) => event.preventDefault());
[els.keyword, els.category, els.condition, els.price, els.distance, els.sort].forEach((el) => {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
});
els.clear.addEventListener("click", clearFilters);
els.sell.addEventListener("click", openCreateDialog);
els.createForm.addEventListener("submit", createListing);

render();
