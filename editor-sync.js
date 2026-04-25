(function () {
  const STORAGE_KEY = "atig-react-visual-editor-site";
  const PUBLISHED_EDITOR_URL = "editor-site.json";
  let publishedEditorSite = {};
  const pageIdByFile = {
    "index.html": "home",
    "ponies.html": "ponies",
    "show-ring-central.html": "shows",
    "catch-rides-shipping.html": "catch-ship",
    "pony-people.html": "rail",
    "the-ring-rail.html": "ring-rail",
    "kids.html": "kids",
    "about.html": "about"
  };

  function currentFileName() {
    const path = window.location.pathname.split("/").pop();
    return path || "index.html";
  }

  function readEditorSite() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (error) {
      console.warn("Could not read visual editor content.", error);
      return {};
    }
  }

  function hasEditorPages(site) {
    return site && Array.isArray(site.pages) && site.pages.length > 0;
  }

  async function loadPublishedEditorSite() {
    try {
      const response = await fetch(PUBLISHED_EDITOR_URL, { cache: "no-store" });
      if (!response.ok) return {};
      const site = await response.json();
      publishedEditorSite = hasEditorPages(site) ? site : {};
      return publishedEditorSite;
    } catch (error) {
      console.warn("Could not load published visual editor content.", error);
      return {};
    }
  }

  function normalizePublicValue(value) {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    if (!trimmed || /^blob:/i.test(trimmed)) return "";
    if (/^data:image\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("../assets/")) return trimmed.replace("../assets/", "assets/");
    if (trimmed.startsWith("../")) return trimmed.slice(3);
    return trimmed;
  }

  function getEditorPage() {
    const pageId = pageIdByFile[currentFileName()];
    if (!pageId) return null;

    const localSite = readEditorSite();
    const site = hasEditorPages(localSite) ? localSite : publishedEditorSite;
    if (!hasEditorPages(site)) return null;
    return site.pages.find((page) => page.id === pageId) || null;
  }

  function removeManagedSections(root) {
    root.querySelectorAll(".editor-managed-section").forEach((section) => section.remove());
  }

  function firstSectionByType(page, type) {
    return page.sections.find((section) => section.type === type) || null;
  }

  function applyHeroSection(page, section, root) {
    const hero = root.querySelector(".page-cover") || root.querySelector(".mag-hero");
    if (!hero || !section) return;

    const copy = hero.querySelector(".mag-hero-copy") || hero.querySelector(":scope > div");
    const heroImage = hero.querySelector("img");
    const kicker = copy?.querySelector(".kicker");
    const title = copy?.querySelector("h1");
    const paragraphs = copy
      ? Array.from(copy.querySelectorAll("p")).filter((item) => !item.classList.contains("kicker") && !item.classList.contains("notice-note"))
      : [];
    const mainCopy = paragraphs[0] || null;
    const primaryAction = copy?.querySelector(".hero-actions a");

    if (kicker && page?.name) kicker.textContent = page.name;
    if (title && section.heading) title.textContent = section.heading;
    if (mainCopy && section.subheading) mainCopy.textContent = section.subheading;
    if (heroImage && section.imageUrl) {
      const normalizedImage = normalizePublicValue(section.imageUrl);
      if (normalizedImage) heroImage.setAttribute("src", normalizedImage);
    }
    if (primaryAction && section.buttonText) {
      primaryAction.textContent = section.buttonText;
      if (section.buttonLink) {
        primaryAction.setAttribute("href", normalizePublicValue(section.buttonLink));
      }
    }
  }

  function makeTextSection(page, section) {
    const wrapper = document.createElement("section");
    wrapper.className = "horse-section white editor-managed-section";
    wrapper.innerHTML = `
      <div class="section-lede">
        <p class="kicker">${page.name}</p>
        <h2>${section.title || ""}</h2>
        <p>${section.body || ""}</p>
      </div>
    `;
    return wrapper;
  }

  function makeCardsSection(page, section) {
    const wrapper = document.createElement("section");
    wrapper.className = "horse-section tint editor-managed-section";
    const items = Array.isArray(section.items) ? section.items : [];

    wrapper.innerHTML = `
      <div class="section-lede">
        <p class="kicker">${page.name}</p>
        <h2>${section.title || ""}</h2>
      </div>
      <div class="image-card-grid">
        ${items
          .map((item) => {
            const normalizedImage = normalizePublicValue(item.imageUrl || "");
            const image = normalizedImage
              ? `<img src="${normalizedImage}" alt="">`
              : `<div class="program-preview" aria-hidden="true"><span>${page.name}</span><strong>${item.title || ""}</strong><p>${item.buttonLabel || ""}</p></div>`;
            const link = normalizePublicValue(item.link || "#");
            return `
              <a class="image-card" href="${link}">
                ${image}
                <div>
                  <strong>${item.title || ""}</strong>
                  <p>${item.text || ""}</p>
                </div>
              </a>
            `;
          })
          .join("")}
      </div>
    `;

    return wrapper;
  }

  function insertManagedSections(root, page) {
    const main = root.querySelector("main");
    if (!main || !page) return;

    removeManagedSections(root);

    const textSection = firstSectionByType(page, "text");
    const cardsSection = firstSectionByType(page, "cards");
    if (!textSection && !cardsSection) return;

    let anchor = main.querySelector(".subnav-ribbon") || main.querySelector(".page-cover") || main.querySelector(".mag-hero");
    if (!anchor) return;

    if (textSection) {
      const textNode = makeTextSection(page, textSection);
      anchor.insertAdjacentElement("afterend", textNode);
      anchor = textNode;
    }

    if (cardsSection) {
      const cardsNode = makeCardsSection(page, cardsSection);
      anchor.insertAdjacentElement("afterend", cardsNode);
    }
  }

  function applyEditorPage(root = document) {
    const page = getEditorPage();
    if (!page) return;

    applyHeroSection(page, firstSectionByType(page, "hero"), root);
    insertManagedSections(root, page);
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyEditorPage(document);
    loadPublishedEditorSite().then(() => applyEditorPage(document));
  });

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      applyEditorPage(document);
    }
  });
})();
