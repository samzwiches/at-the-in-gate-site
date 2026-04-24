(function () {
  const h = React.createElement;
  const storageKey = "atig-react-visual-editor-site";

  function classNames() {
    return Array.from(arguments).filter(Boolean).join(" ");
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function sanitizeImageSrc(value) {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (/^(blob:|filesystem:)/i.test(trimmed)) return "";
    return trimmed;
  }

  function sanitizeSiteImages(value) {
    if (Array.isArray(value)) {
      return value.map((item) => sanitizeSiteImages(item));
    }

    if (value && typeof value === "object") {
      const output = {};
      Object.entries(value).forEach(([key, itemValue]) => {
        if (key === "imageUrl") {
          output[key] = sanitizeImageSrc(itemValue);
        } else {
          output[key] = sanitizeSiteImages(itemValue);
        }
      });
      return output;
    }

    return value;
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.addEventListener("error", () => reject(reader.error || new Error("Could not read file.")));
      reader.readAsDataURL(file);
    });
  }

  function makeId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }

  function createCardItem() {
    return {
      id: makeId("card"),
      title: "New card",
      text: "Write the useful note here.",
      imageUrl: "../assets/pony-possum-stall-cuddle.jpg",
      buttonLabel: "Open",
      link: "#"
    };
  }

  function createSection(type) {
    if (type === "hero") {
      return {
        id: makeId("hero"),
        type: "hero",
        heading: "New hero heading",
        subheading: "Say the simple thing people need to understand first.",
        buttonText: "Click Here",
        buttonLink: "#",
        imageUrl: "../assets/atig-bay-pony-jump.jpg"
      };
    }

    if (type === "text") {
      return {
        id: makeId("text"),
        type: "text",
        title: "New text section",
        body: "Write your content here."
      };
    }

    return {
      id: makeId("cards"),
      type: "cards",
      title: "New cards section",
      items: [createCardItem(), createCardItem(), createCardItem()]
    };
  }

  function getPage(site, pageId) {
    return site.pages.find((page) => page.id === pageId);
  }

  window.AtigEditor = window.AtigEditor || {};
  window.AtigEditor.utils = {
    classNames,
    createCardItem,
    createSection,
    deepClone,
    fileToDataUrl,
    getPage,
    h,
    makeId,
    sanitizeImageSrc,
    sanitizeSiteImages,
    storageKey
  };
})();
