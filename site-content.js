const ATIG_STORAGE_KEY = "atigSiteContent";
const ATIG_PUBLISHED_CONTENT_URL = "site-content.json";
let atigPublishedContent = {};

const ATIG_DEFAULT_CONTENT = {
  home: {
    hero: {
      image: "assets/atig-bay-pony-jump.jpg",
      alt: "Junior rider jumping a bay pony in the show ring",
      kicker: "Just ponies. Sale, lease, show life.",
      title: "All ponies. Start here.",
      lead: "This is the pony board, show desk, rail talk, catch-ride note, shipping lead, and old-school pony magazine in one place. Big photos first. Plain directions. No tech maze.",
      note: "New here? Pick one lane: shop ponies, plan shows, or ask the rail. That is the whole barn map."
    },
    quickPaths: {
      sale: {
        image: "assets/pony-vintage-white-wide.jpg",
        alt: "Child rider on a white pony",
        title: "Ponies for Sale",
        text: "Small, medium, large, green, made, fancy, saintly, and worth asking about."
      },
      lease: {
        image: "assets/atig-bay-pony-jump.jpg",
        alt: "Bay pony jumping in the show ring",
        title: "Ponies for Lease",
        text: "Annual, seasonal, local, show lease, and trainer-approved situations."
      },
      board: {
        image: "assets/pony-possum-stall-cuddle.jpg",
        alt: "Child sitting with a chestnut pony in a stall",
        title: "Just Ponies Board",
        text: "All ponies, all the time: sale notes, lease leads, memories, and tiny tack."
      },
      archive: {
        image: "assets/pony-vintage-white-wide.jpg",
        alt: "Vintage photo of a child on a white pony",
        title: "Sold Pony Archive",
        text: "Where old names, old photos, and happy update trails can live."
      },
      catchRides: {
        image: "assets/atig-catchride-cutout.png",
        alt: "Catch ride pony and rider cutout",
        title: "Catch Rides",
        text: "Rider available, rider needed, trainer permission, dates, and useful details."
      },
      shipping: {
        image: "assets/pony-handler-trailer.jpg",
        alt: "Pony beside a trailer with a handler",
        title: "Shipping",
        text: "Trailer seats, routes, hauler notes, layovers, and who is already going that way."
      },
      calendar: {
        image: "assets/atig-showgrounds-deeprun.jpeg",
        alt: "Show grounds with rings and fences",
        title: "Show Calendar",
        text: "Shows, meetups, zone schedules, Pony Finals watch, and practical Monday links."
      },
      askPony: {
        image: "assets/atig-pony-show-lineup.jpg",
        alt: "Ponies lined up at a show",
        title: "Ask About a Pony",
        text: "Who knows this pony, where did she land, and does anyone have old video?"
      },
      kids: {
        image: "assets/pony-tiny-rider-bw.jpg",
        alt: "Tiny rider sitting on a pony",
        title: "Kids Corner",
        text: "Junior spotlights, first-show stories, pony art, brave moments, and ribbons."
      }
    },
    featured: {
      mischief: {
        image: "assets/atig-dark-pony-portrait.png",
        alt: "Placeholder pony listing image",
        badge: "Placeholder listing",
        title: "Featured Pony Listing",
        text: "Add pony name, size, location, rider fit, and sale or lease terms here."
      },
      buttons: {
        image: "assets/pony-black-background.jpg",
        alt: "Placeholder pony sale image",
        badge: "Sale placeholder",
        title: "Second Pony Listing",
        text: "Use this card for another pony listing, archive feature, or promoted ad."
      },
      moonPie: {
        image: "assets/barn-silhouette.jpg",
        alt: "Placeholder listing or story image",
        badge: "Lease placeholder",
        title: "Third Pony Listing",
        text: "Add a third pony, featured story, or sponsor spot when you are ready."
      }
    },
    showCards: {
      calendar: {
        image: "assets/atig-showgrounds-deeprun.jpeg",
        alt: "Show grounds with rings and footing",
        title: "Show Calendar",
        text: "Upcoming dates, locations, and what is worth saving."
      },
      zones: {
        image: "assets/atig-showgrounds-pbiec.jpg",
        alt: "Palm Beach International Equestrian Center entrance",
        title: "Zone Schedules",
        text: "USHJA zone events pulled from the show feed."
      },
      meetups: {
        image: "assets/atig-pony-show-lineup.jpg",
        alt: "Pony riders lined up by the ring",
        title: "Meetups",
        text: "Coffee, braiding swaps, parent rail help, and show-day planning."
      },
      finals: {
        image: "assets/atig-pony-finals-dukes.jpg",
        alt: "Pony Finals riders and ponies on the show grounds",
        title: "Pony Finals Watch",
        text: "Qualifying panic, videos, names to watch, and useful reminders."
      },
      usef: {
        image: "assets/atig-showgrounds-pbiec.jpg",
        alt: "Large rated show venue entrance",
        title: "USEF Quick Links",
        text: "Search records, rankings, results, and competition info."
      },
      rankings: {
        image: "assets/atig-pony-finals-lineup.png",
        alt: "Pony Finals lineup in the show ring",
        title: "Rankings Explained",
        text: "Plain-English points help for normal humans."
      }
    },
    kids: {
      spotlight: {
        image: "assets/pony-tiny-rider-bw-2.jpg",
        alt: "Tiny rider sitting on a pony in a black and white photo",
        badge: "Spotlight",
        title: "Junior Rider Spotlight",
        text: "A kid, a pony, one thing learned, and one thing they want to try next."
      },
      firstShow: {
        image: "assets/pony-vintage-with-mom.jpg",
        alt: "First show pony memory",
        badge: "First show",
        title: "My First Show",
        text: "Number pins, nerves, tiny ribbons, and the person who helped."
      },
      artWall: {
        image: "assets/pony-possum-stall-cuddle.jpg",
        alt: "Child sitting with a pony in a stall",
        badge: "Art wall",
        title: "Pony Art Wall",
        text: "Stall-door masterpieces, drawings, ribbons, and pony love."
      }
    }
  }
};

const ATIG_APPROVED_IMAGES = [
  ["Hero jumping pony", "assets/atig-bay-pony-jump.jpg"],
  ["Sale or archive pony", "assets/pony-vintage-white-wide.jpg"],
  ["Lease or green pony", "assets/pony-possum-brick-jump.png"],
  ["Just Ponies Board", "assets/pony-possum-stall-cuddle.jpg"],
  ["Catch ride cutout", "assets/atig-catchride-cutout.png"],
  ["Shipping", "assets/pony-handler-trailer.jpg"],
  ["Show calendar", "assets/atig-showgrounds-deeprun.jpeg"],
  ["Zone schedule venue", "assets/atig-showgrounds-pbiec.jpg"],
  ["Show lineup", "assets/atig-pony-show-lineup.jpg"],
  ["Pony Finals", "assets/atig-pony-finals-dukes.jpg"],
  ["Kids corner", "assets/pony-tiny-rider-bw.jpg"],
  ["Magazine story", "assets/pony-vintage-with-mom.jpg"],
  ["Barn aisle", "assets/atig-show-barn-aisle.jpg"],
  ["Dark pony portrait", "assets/atig-dark-pony-portrait.png"]
];

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(base, override) {
  const output = { ...base };
  if (!isPlainObject(override)) return output;

  Object.entries(override).forEach(([key, value]) => {
    if (isPlainObject(value) && isPlainObject(output[key])) {
      output[key] = deepMerge(output[key], value);
    } else {
      output[key] = value;
    }
  });

  return output;
}

function getPathValue(source, path) {
  return path.split(".").reduce((current, key) => {
    if (current && Object.prototype.hasOwnProperty.call(current, key)) {
      return current[key];
    }
    return undefined;
  }, source);
}

function setPathValue(source, path, value) {
  const keys = path.split(".");
  let current = source;

  keys.slice(0, -1).forEach((key) => {
    if (!isPlainObject(current[key])) {
      current[key] = {};
    }
    current = current[key];
  });

  current[keys[keys.length - 1]] = value;
}

function readSavedContent() {
  try {
    return JSON.parse(localStorage.getItem(ATIG_STORAGE_KEY) || "{}");
  } catch (error) {
    console.warn("Could not read saved At The In Gate content.", error);
    return {};
  }
}

function getSiteContent() {
  return deepMerge(deepMerge(ATIG_DEFAULT_CONTENT, atigPublishedContent), readSavedContent());
}

function saveSiteContent(content) {
  localStorage.setItem(ATIG_STORAGE_KEY, JSON.stringify(content));
}

function resetSiteContent() {
  localStorage.removeItem(ATIG_STORAGE_KEY);
}

function applySiteContent(root = document) {
  const content = getSiteContent();

  root.querySelectorAll("[data-edit-text]").forEach((element) => {
    const value = getPathValue(content, element.dataset.editText);
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  root.querySelectorAll("[data-edit-src]").forEach((element) => {
    const value = getPathValue(content, element.dataset.editSrc);
    if (typeof value === "string" && value.trim()) {
      element.setAttribute("src", value);
    }
  });

  root.querySelectorAll("[data-edit-alt]").forEach((element) => {
    const value = getPathValue(content, element.dataset.editAlt);
    if (typeof value === "string") {
      element.setAttribute("alt", value);
    }
  });
}

async function loadPublishedContent() {
  try {
    const response = await fetch(ATIG_PUBLISHED_CONTENT_URL, { cache: "no-store" });
    if (!response.ok) return {};
    const content = await response.json();
    atigPublishedContent = isPlainObject(content) ? content : {};
    return atigPublishedContent;
  } catch (error) {
    console.warn("Could not load published At The In Gate content.", error);
    return {};
  }
}

window.ATIGContent = {
  approvedImages: ATIG_APPROVED_IMAGES,
  apply: applySiteContent,
  defaults: ATIG_DEFAULT_CONTENT,
  get: getSiteContent,
  getPath: getPathValue,
  loadPublished: loadPublishedContent,
  readSaved: readSavedContent,
  reset: resetSiteContent,
  save: saveSiteContent,
  setPath: setPathValue,
  storageKey: ATIG_STORAGE_KEY
};

document.addEventListener("DOMContentLoaded", () => {
  applySiteContent();
  loadPublishedContent().then(() => applySiteContent());
});
