const posts = [
  {
    id: "mischief",
    title: "Blue Ribbon Mischief",
    category: "pony_lease",
    categoryLabel: "Pony for lease",
    division: "large",
    divisionLabel: "Large pony",
    fit: "division",
    fitLabel: "Division kid",
    height: "large",
    heightLabel: "14.1 7/8h",
    price: 32000,
    priceLabel: "Mid-five lease",
    state: "KY",
    location: "Lexington, KY",
    barn: "Bluegrass Hill",
    image: "assets/atig-bay-pony-jump.jpg",
    date: "2026-04-15",
    experience: "finals",
    video: true,
    tags: ["USEF name included", "Video ready", "Pony Finals type"],
    description: "Big step, brave eye, and just enough opinion to make the kid learn. Available after Devon with trainer references and current video.",
    insight: "For a child who can ride forward without making it dramatic.",
    truth: "Has a lead change, but prefers not to be surprised about it.",
    usef: "Search USEF/USHJA records before scheduling a trial."
  },
  {
    id: "buttons",
    title: "Buttons and Bows",
    category: "pony_sale",
    categoryLabel: "Pony for sale",
    division: "small",
    divisionLabel: "Small pony",
    fit: "walktrot",
    fitLabel: "Walk-trot to short stirrup",
    height: "small",
    heightLabel: "12.2h",
    price: 14500,
    priceLabel: "$14,500",
    state: "NJ",
    location: "Princeton, NJ",
    barn: "Fox Lane Ponies",
    image: "assets/pony-vintage-white-wide.jpg",
    date: "2026-04-13",
    experience: "local",
    video: true,
    tags: ["Child-safe", "Local show miles", "Snack motivated"],
    description: "Tiny saint with a fan club. Packs walk-trot, crossrails, and nervous parents through the first big pony chapter.",
    insight: "Best for the kid who needs to believe the ring is a safe place.",
    truth: "Will stop at the gate if the adult forgets a peppermint.",
    usef: "Not chasing points. Chasing confidence."
  },
  {
    id: "maple",
    title: "Maple Sunday",
    category: "pony_sale",
    categoryLabel: "Pony for sale",
    division: "medium",
    divisionLabel: "Medium pony",
    fit: "catch",
    fitLabel: "Catch ride friendly",
    height: "medium",
    heightLabel: "13.1h",
    price: 38000,
    priceLabel: "$38,000",
    state: "FL",
    location: "Ocala, FL",
    barn: "Live Oak Pony Co.",
    image: "assets/atig-bay-pony-jump.jpg",
    date: "2026-04-11",
    experience: "rated",
    video: true,
    tags: ["Catch ride friendly", "Cute mover", "Current show video"],
    description: "Fancy enough for the good company, sensible enough to be useful. Needs a kid who likes a forward pony and tidy turns.",
    insight: "The sort of pony that makes trainers quietly text each other.",
    truth: "Forward, not naughty. Parents should understand the difference.",
    usef: "USEF/USHJA details available from seller."
  },
  {
    id: "clover",
    title: "Clover Street",
    category: "pony_sale",
    categoryLabel: "Pony for sale",
    division: "large",
    divisionLabel: "Large pony",
    fit: "division",
    fitLabel: "Division kid",
    height: "large",
    heightLabel: "14.1h",
    price: 54000,
    priceLabel: "$54,000",
    state: "VA",
    location: "Upperville, VA",
    barn: "Clover Street Ponies",
    image: "assets/atig-bay-pony-jump.jpg",
    date: "2026-04-10",
    experience: "rated",
    video: true,
    tags: ["Large pony", "Good change", "Junior miles"],
    description: "A kind large pony for the kid who wants division miles without chaos.",
    insight: "For the family trying to make the next pony chapter feel sane.",
    truth: "Lovely when ridden forward and politely. Does not enjoy surprise decisions.",
    usef: "Record link requested from seller."
  },
  {
    id: "larkspur",
    title: "Larkspur Lane tack trunk",
    category: "equipment",
    categoryLabel: "Pony equipment",
    division: "medium",
    divisionLabel: "Medium pony",
    fit: "all",
    fitLabel: "Pony kids",
    height: "medium",
    heightLabel: "Medium pony",
    price: 650,
    priceLabel: "$650 bundle",
    state: "VA",
    location: "Middleburg, VA",
    barn: "Private seller",
    image: "assets/pony-bridle-close.jpg",
    date: "2026-04-09",
    experience: "local",
    video: false,
    tags: ["Girths", "Show pads", "Tiny boots"],
    description: "A trunk cleanout from a child who outgrew the medium pony era before the adults emotionally recovered.",
    insight: "For the next barn family trying not to buy everything twice.",
    truth: "White pads are show-clean, not museum-clean.",
    usef: "No points, just practical magic."
  },
  {
    id: "equinox",
    title: "Equinox",
    category: "pony_lease",
    categoryLabel: "Pony for lease",
    division: "large",
    divisionLabel: "Large pony",
    fit: "division",
    fitLabel: "Division lease",
    height: "large",
    heightLabel: "14.1 1/2h",
    price: 30000,
    priceLabel: "Annual lease",
    state: "KY",
    location: "Lexington, KY",
    barn: "Stone Gate",
    image: "assets/atig-bay-pony-jump.jpg",
    date: "2026-04-08",
    experience: "rated",
    video: true,
    tags: ["Eq miles", "Lease only", "Show record"],
    description: "A straightforward large pony lease for a rider who wants mileage, manners, and a real show plan.",
    insight: "For the kid who is ready for more responsibility but still belongs in the pony ring.",
    truth: "Not a kick ride. Honest, but expects a rider with a plan.",
    usef: "USEF name and report available from trainer."
  },
  {
    id: "moonpie",
    title: "Moon Pie",
    category: "pony_lease",
    categoryLabel: "Pony for lease",
    division: "green",
    divisionLabel: "Green pony",
    fit: "catch",
    fitLabel: "Catch ride friendly",
    height: "large",
    heightLabel: "14.0h",
    price: 22000,
    priceLabel: "Annual lease",
    state: "OH",
    location: "Columbus, OH",
    barn: "Northline Farm",
    image: "assets/pony-possum-brick-jump.png",
    date: "2026-04-07",
    experience: "green",
    video: true,
    tags: ["Needs miles", "Lovely jump", "Trainer required"],
    description: "Green large with the look and the jump. Needs a kid with tact and a trainer who does not expect miracles in one weekend.",
    insight: "High upside if the adults stay realistic.",
    truth: "Still learning ring atmosphere and needs consistent prep.",
    usef: "Competition history is light. That is the point."
  },
  {
    id: "wanted-saint",
    title: "Wanted: small saint with a sense of humor",
    category: "wanted",
    categoryLabel: "Wanted ad",
    division: "small",
    divisionLabel: "Small pony",
    fit: "walktrot",
    fitLabel: "Walk-trot to short stirrup",
    height: "small",
    heightLabel: "12.2h and under",
    price: 20000,
    priceLabel: "Lease or buy",
    state: "FL",
    location: "Wellington, FL",
    barn: "Parent request",
    image: "assets/pony-vintage-white-wide.jpg",
    date: "2026-04-05",
    experience: "local",
    video: false,
    tags: ["Wanted", "Beginner kid", "Trainer references"],
    description: "Family seeking a true first pony for a careful kid with a trainer. Cute is welcome. Kind is required.",
    insight: "This is where the site can save people from buying adorable and wrong.",
    truth: "No project ponies. The adults are tired already.",
    usef: "USEF record helpful but not required."
  },
  {
    id: "catch-kentucky",
    title: "Catch rider available for large ponies",
    category: "catch",
    categoryLabel: "Catch ride",
    division: "large",
    divisionLabel: "Large pony",
    fit: "catch",
    fitLabel: "Catch ride friendly",
    height: "large",
    heightLabel: "Large pony",
    price: 0,
    priceLabel: "Ask for rate",
    state: "KY",
    location: "Lexington, KY",
    barn: "Junior rider",
    image: "assets/atig-catchride-cutout.png",
    date: "2026-04-04",
    experience: "rated",
    video: true,
    tags: ["Handy", "Quiet ride", "References"],
    description: "Experienced junior available for large pony miles, warm-ups, and local show catch rides.",
    insight: "A good match when the pony needs mileage and the kid needs to be tactful.",
    truth: "Not available during medal classes. Priorities are priorities.",
    usef: "Rider report available from parent/trainer."
  }
];

const elements = {
  keyword: document.getElementById("keywordInput"),
  category: document.getElementById("categoryFilter"),
  division: document.getElementById("divisionFilter"),
  price: document.getElementById("priceFilter"),
  state: document.getElementById("stateFilter"),
  level: document.getElementById("levelFilter"),
  height: document.getElementById("heightFilter"),
  experience: document.getElementById("experienceFilter"),
  video: document.getElementById("videoFilter"),
  sort: document.getElementById("sortControl"),
  grid: document.getElementById("listingGrid"),
  count: document.getElementById("resultCount"),
  empty: document.getElementById("emptyState"),
  form: document.getElementById("searchForm"),
  clear: document.getElementById("clearFilters"),
  drawer: document.getElementById("detailDrawer"),
  drawerImage: document.getElementById("drawerImage"),
  drawerTitle: document.getElementById("drawerTitle"),
  drawerMeta: document.getElementById("drawerMeta"),
  drawerDescription: document.getElementById("drawerDescription"),
  drawerInsight: document.getElementById("drawerInsight"),
  drawerStats: document.getElementById("drawerStats"),
  drawerClose: document.getElementById("drawerClose"),
  drawerBackdrop: document.getElementById("drawerBackdrop"),
  rssForm: document.getElementById("rssForm"),
  rssUrlInput: document.getElementById("rssUrlInput"),
  rssXmlInput: document.getElementById("rssXmlInput"),
  rssStatus: document.getElementById("rssStatus"),
  rssShowList: document.getElementById("rssShowList"),
  authStatus: document.getElementById("authStatus")
};

const saved = new Set();

const feedShows = window.atTheInGateShows || [
  {
    title: "Devon Pony Prep Day",
    startDate: "2026-04-26",
    city: "Devon",
    state: "PA",
    zone: "preview"
  },
  {
    title: "Bluegrass Spring Classic",
    startDate: "2026-05-03",
    city: "Lexington",
    state: "KY",
    zone: "preview"
  },
  {
    title: "Pony Finals Watch Night",
    startDate: "2026-05-18",
    city: "Online + barn meetups",
    state: "",
    zone: "member event"
  }
];

const sampleShows = feedShows.slice(0, 6).map((show) => ({
  title: show.title,
  date: new Date(`${show.startDate}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }),
  location: [show.city, show.state].filter(Boolean).join(", "),
  source: `Zone ${show.zone}`
}));

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function matchesPrice(post, filter) {
  if (post.category === "equipment" || post.category === "catch") {
    return filter === "all" || filter === "under15000";
  }

  if (filter === "under15000") return post.price < 15000;
  if (filter === "15000to35000") return post.price >= 15000 && post.price <= 35000;
  if (filter === "over35000") return post.price > 35000;
  return true;
}

function getFilteredPosts() {
  const keyword = elements.keyword.value.trim().toLowerCase();

  return posts
    .filter((post) => {
      const searchable = [
        post.title,
        post.categoryLabel,
        post.divisionLabel,
        post.location,
        post.barn,
        post.description,
        post.tags.join(" ")
      ].join(" ").toLowerCase();

      return (
        (!keyword || searchable.includes(keyword)) &&
        (elements.category.value === "all" || post.category === elements.category.value) &&
        (elements.division.value === "all" || post.division === elements.division.value) &&
        (elements.state.value === "all" || post.state === elements.state.value) &&
        (elements.level.value === "all" || post.fit === elements.level.value || post.fit === "all") &&
        (elements.height.value === "all" || post.height === elements.height.value) &&
        (elements.experience.value === "all" || post.experience === elements.experience.value) &&
        (elements.video.value === "all" || (elements.video.value === "yes" ? post.video : !post.video)) &&
        matchesPrice(post, elements.price.value)
      );
    })
    .sort((a, b) => {
      if (elements.sort.value === "priceLow") return a.price - b.price;
      if (elements.sort.value === "priceHigh") return b.price - a.price;
      if (elements.sort.value === "newest") return new Date(b.date) - new Date(a.date);
      return posts.indexOf(a) - posts.indexOf(b);
    });
}

function renderListings() {
  const results = getFilteredPosts();
  elements.count.textContent = results.length;
  elements.empty.classList.toggle("is-visible", results.length === 0);

  elements.grid.innerHTML = results.map((post) => {
    const imageClass = post.image.includes("catchride") ? ' class="fit-contain"' : "";
    return `
    <article class="listing-card">
      <div class="listing-image-wrap">
        <img${imageClass} src="${post.image}" alt="${post.title}">
        <div class="badge-row">
          ${post.tags.map((tag) => `<span class="badge">${tag}</span>`).join("")}
        </div>
      </div>
      <div class="listing-content">
        <div class="listing-topline">
          <h3>${post.title}</h3>
          <span class="price">${post.category === "equipment" || post.category === "catch" || post.category === "wanted" ? post.priceLabel : money.format(post.price)}</span>
        </div>
        <p class="listing-meta">${post.categoryLabel} / ${post.divisionLabel}<br>${post.location} / ${post.barn}</p>
        <div class="stats-list" aria-label="${post.title} quick facts">
          <span>${post.heightLabel}</span>
          <span>${post.fitLabel}</span>
          <span>${post.priceLabel}</span>
        </div>
        <div class="card-actions">
          <button class="secondary-button" type="button" data-details="${post.id}">Open Details</button>
          <button class="save-button ${saved.has(post.id) ? "is-saved" : ""}" type="button" data-save="${post.id}" aria-label="Save ${post.title}">${saved.has(post.id) ? "Saved" : "+"}</button>
        </div>
      </div>
    </article>
  `;
  }).join("");
}

function openDetails(postId) {
  const post = posts.find((item) => item.id === postId);
  if (!post) return;

  elements.drawerImage.src = post.image;
  elements.drawerImage.alt = post.title;
  elements.drawerTitle.textContent = `${post.title} - ${post.priceLabel}`;
  elements.drawerMeta.textContent = `${post.categoryLabel} / ${post.divisionLabel} / ${post.location}`;
  elements.drawerDescription.textContent = post.description;
  elements.drawerInsight.innerHTML = `
    <strong>The useful truth</strong>
    <p>${post.insight}</p>
  `;
  elements.drawerStats.innerHTML = [
    ["Post type", post.categoryLabel],
    ["Division", post.divisionLabel],
    ["Height", post.heightLabel],
    ["Rider fit", post.fitLabel],
    ["Show experience", post.experience],
    ["Video", post.video ? "Included" : "Needs video"],
    ["Barn or seller", post.barn],
    ["Honest note", post.truth],
    ["USEF / points", post.usef],
    ["Location", post.location]
  ].map(([label, value]) => `
    <div class="drawer-stat">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");

  elements.drawer.classList.add("is-open");
  elements.drawer.setAttribute("aria-hidden", "false");
}

function closeDetails() {
  elements.drawer.classList.remove("is-open");
  elements.drawer.setAttribute("aria-hidden", "true");
}

function resetFilters() {
  elements.keyword.value = "";
  elements.category.value = "all";
  elements.division.value = "all";
  elements.price.value = "all";
  elements.state.value = "all";
  elements.level.value = "all";
  elements.height.value = "all";
  elements.experience.value = "all";
  elements.video.value = "all";
  elements.sort.value = "recommended";
  renderListings();
}

function renderShows(shows = sampleShows, status = "Sample upcoming shows loaded. Add a feed URL or paste RSS XML to preview an import.") {
  if (!elements.rssShowList) return;

  elements.rssStatus.textContent = status;
  elements.rssShowList.innerHTML = shows.map((show) => `
    <article>
      <time>${show.date || "Upcoming"}</time>
      <h3>${show.title}</h3>
      <p>${show.location || "Location pending"}</p>
      <span>${show.source || "RSS"}</span>
    </article>
  `).join("");
}

function parseRssXml(xmlText) {
  const parsed = new DOMParser().parseFromString(xmlText, "application/xml");
  const items = Array.from(parsed.querySelectorAll("item, entry"));

  if (!items.length) {
    return [];
  }

  return items.slice(0, 6).map((item) => {
    const title = item.querySelector("title")?.textContent?.trim() || "Untitled show";
    const startDate = item.getElementsByTagName("attheingate:startDate")[0]?.textContent?.trim();
    const dateText = startDate || item.querySelector("pubDate, updated, published")?.textContent?.trim() || "Upcoming";
    const location = item.getElementsByTagName("attheingate:location")[0]?.textContent?.trim();
    const zone = item.querySelector("category")?.textContent?.trim();
    const description = item.querySelector("description, summary")?.textContent?.replace(/<[^>]*>/g, "").trim() || "Imported from RSS feed";
    const dateValue = startDate ? `${startDate}T12:00:00Z` : dateText;
    const date = dateText === "Upcoming" ? dateText : new Date(dateValue).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

    return {
      title,
      date,
      location: location || description.slice(0, 80),
      source: zone || "RSS preview"
    };
  });
}

async function previewRssImport(event) {
  event.preventDefault();

  const xmlText = elements.rssXmlInput.value.trim();
  const url = elements.rssUrlInput.value.trim();

  if (xmlText) {
    const parsedShows = parseRssXml(xmlText);
    renderShows(
      parsedShows.length ? parsedShows : sampleShows,
      parsedShows.length ? `${parsedShows.length} RSS items previewed from pasted XML.` : "No RSS items found in pasted XML. Showing staged sample shows."
    );
    return;
  }

  if (url) {
    renderShows(sampleShows, "Feed URL saved for scheduled import. Static prototype cannot guarantee cross-site RSS fetches, so staged shows are previewed here.");
    return;
  }

  renderShows(sampleShows, "No feed added yet. Showing staged sample shows.");
}

function showAuthPanel(panelName) {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.authTab === panelName);
  });

  document.querySelectorAll("[data-auth-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.authPanel === panelName);
  });
}

function previewLoggedIn(event) {
  event.preventDefault();
  elements.authStatus.textContent = "You are previewing a logged-in Barn Pass account. Dashboard unlocked below.";
  document.body.classList.add("is-member-preview");
  document.getElementById("member-dashboard")?.scrollIntoView({ behavior: "smooth" });
}

[
  elements.keyword,
  elements.category,
  elements.division,
  elements.price,
  elements.state,
  elements.level,
  elements.height,
  elements.experience,
  elements.video,
  elements.sort
].forEach((control) => {
  control.addEventListener("input", renderListings);
  control.addEventListener("change", renderListings);
});

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderListings();
});

elements.clear.addEventListener("click", resetFilters);

elements.grid.addEventListener("click", (event) => {
  const detailsButton = event.target.closest("[data-details]");
  const saveButton = event.target.closest("[data-save]");

  if (detailsButton) {
    openDetails(detailsButton.dataset.details);
  }

  if (saveButton) {
    const postId = saveButton.dataset.save;
    if (saved.has(postId)) {
      saved.delete(postId);
    } else {
      saved.add(postId);
    }
    renderListings();
  }
});

elements.drawerClose.addEventListener("click", closeDetails);
elements.drawerBackdrop.addEventListener("click", closeDetails);
elements.rssForm?.addEventListener("submit", previewRssImport);

document.querySelectorAll("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => showAuthPanel(button.dataset.authTab));
});

document.querySelectorAll("[data-auth-panel]").forEach((form) => {
  form.addEventListener("submit", previewLoggedIn);
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", () => {
    elements.category.value = link.dataset.filterLink;
    renderListings();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDetails();
});

renderListings();
renderShows();
