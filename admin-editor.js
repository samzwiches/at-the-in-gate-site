const editorSections = [
  {
    title: "Homepage Hero",
    helper: "This is the first thing pony people see. Keep it direct, big, and obvious.",
    fields: [
      ["Hero image", "home.hero.image", "image"],
      ["Image description", "home.hero.alt", "text"],
      ["Small line above headline", "home.hero.kicker", "text"],
      ["Main headline", "home.hero.title", "text"],
      ["Main helper copy", "home.hero.lead", "textarea"],
      ["Note under buttons", "home.hero.note", "textarea"]
    ]
  },
  {
    title: "Quick Path Cards",
    helper: "These cards should match the picture. If it says lease pony, show a pony doing lease-pony things.",
    fields: [
      ["Sale image", "home.quickPaths.sale.image", "image"],
      ["Sale title", "home.quickPaths.sale.title", "text"],
      ["Sale helper", "home.quickPaths.sale.text", "textarea"],
      ["Lease image", "home.quickPaths.lease.image", "image"],
      ["Lease title", "home.quickPaths.lease.title", "text"],
      ["Lease helper", "home.quickPaths.lease.text", "textarea"],
      ["Just Ponies image", "home.quickPaths.board.image", "image"],
      ["Just Ponies title", "home.quickPaths.board.title", "text"],
      ["Just Ponies helper", "home.quickPaths.board.text", "textarea"],
      ["Sold Archive image", "home.quickPaths.archive.image", "image"],
      ["Sold Archive title", "home.quickPaths.archive.title", "text"],
      ["Sold Archive helper", "home.quickPaths.archive.text", "textarea"],
      ["Catch Rides image", "home.quickPaths.catchRides.image", "image"],
      ["Catch Rides title", "home.quickPaths.catchRides.title", "text"],
      ["Catch Rides helper", "home.quickPaths.catchRides.text", "textarea"],
      ["Shipping image", "home.quickPaths.shipping.image", "image"],
      ["Shipping title", "home.quickPaths.shipping.title", "text"],
      ["Shipping helper", "home.quickPaths.shipping.text", "textarea"],
      ["Show Calendar image", "home.quickPaths.calendar.image", "image"],
      ["Show Calendar title", "home.quickPaths.calendar.title", "text"],
      ["Show Calendar helper", "home.quickPaths.calendar.text", "textarea"],
      ["Ask Pony image", "home.quickPaths.askPony.image", "image"],
      ["Ask Pony title", "home.quickPaths.askPony.title", "text"],
      ["Ask Pony helper", "home.quickPaths.askPony.text", "textarea"],
      ["Kids image", "home.quickPaths.kids.image", "image"],
      ["Kids title", "home.quickPaths.kids.title", "text"],
      ["Kids helper", "home.quickPaths.kids.text", "textarea"]
    ]
  },
  {
    title: "Featured Pony Listings",
    helper: "These are homepage teasers. The full listing pages can come next, but these need to look believable now.",
    fields: [
      ["Feature 1 image", "home.featured.mischief.image", "image"],
      ["Feature 1 badge", "home.featured.mischief.badge", "text"],
      ["Feature 1 name", "home.featured.mischief.title", "text"],
      ["Feature 1 summary", "home.featured.mischief.text", "textarea"],
      ["Feature 2 image", "home.featured.buttons.image", "image"],
      ["Feature 2 badge", "home.featured.buttons.badge", "text"],
      ["Feature 2 name", "home.featured.buttons.title", "text"],
      ["Feature 2 summary", "home.featured.buttons.text", "textarea"],
      ["Feature 3 image", "home.featured.moonPie.image", "image"],
      ["Feature 3 badge", "home.featured.moonPie.badge", "text"],
      ["Feature 3 name", "home.featured.moonPie.title", "text"],
      ["Feature 3 summary", "home.featured.moonPie.text", "textarea"]
    ]
  },
  {
    title: "Show Ring Cards",
    helper: "Use show-ground, lineup, and useful calendar-feeling images here. This is the practical traffic engine.",
    fields: [
      ["Calendar image", "home.showCards.calendar.image", "image"],
      ["Calendar title", "home.showCards.calendar.title", "text"],
      ["Calendar helper", "home.showCards.calendar.text", "textarea"],
      ["Zones image", "home.showCards.zones.image", "image"],
      ["Zones title", "home.showCards.zones.title", "text"],
      ["Zones helper", "home.showCards.zones.text", "textarea"],
      ["Meetups image", "home.showCards.meetups.image", "image"],
      ["Meetups title", "home.showCards.meetups.title", "text"],
      ["Meetups helper", "home.showCards.meetups.text", "textarea"],
      ["Finals image", "home.showCards.finals.image", "image"],
      ["Finals title", "home.showCards.finals.title", "text"],
      ["Finals helper", "home.showCards.finals.text", "textarea"],
      ["USEF image", "home.showCards.usef.image", "image"],
      ["USEF title", "home.showCards.usef.title", "text"],
      ["USEF helper", "home.showCards.usef.text", "textarea"],
      ["Rankings image", "home.showCards.rankings.image", "image"],
      ["Rankings title", "home.showCards.rankings.title", "text"],
      ["Rankings helper", "home.showCards.rankings.text", "textarea"]
    ]
  },
  {
    title: "Kids Corner Preview",
    helper: "Keep this safe, warm, and wholesome without making it babyish.",
    fields: [
      ["Spotlight image", "home.kids.spotlight.image", "image"],
      ["Spotlight badge", "home.kids.spotlight.badge", "text"],
      ["Spotlight title", "home.kids.spotlight.title", "text"],
      ["Spotlight helper", "home.kids.spotlight.text", "textarea"],
      ["First Show image", "home.kids.firstShow.image", "image"],
      ["First Show badge", "home.kids.firstShow.badge", "text"],
      ["First Show title", "home.kids.firstShow.title", "text"],
      ["First Show helper", "home.kids.firstShow.text", "textarea"],
      ["Art Wall image", "home.kids.artWall.image", "image"],
      ["Art Wall badge", "home.kids.artWall.badge", "text"],
      ["Art Wall title", "home.kids.artWall.title", "text"],
      ["Art Wall helper", "home.kids.artWall.text", "textarea"]
    ]
  }
];

function getEditorStatus() {
  return document.getElementById("siteEditorStatus") || document.getElementById("adminStatus");
}

function setEditorStatus(message) {
  const status = getEditorStatus();
  if (status) status.textContent = message;
}

function isDataImage(value) {
  return typeof value === "string" && value.startsWith("data:image/");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function fieldId(path) {
  return `editor-${path.replace(/[^a-z0-9]/gi, "-")}`;
}

function renderImageField(label, path, value) {
  const id = fieldId(path);
  const previewSource = value || "assets/atig-bay-pony-jump.jpg";

  return `
    <label class="editor-field editor-image-field" for="${id}">
      <span>${escapeHtml(label)}</span>
      <img class="editor-preview" src="${escapeAttribute(previewSource)}" alt="">
      <input id="${id}" type="text" data-editor-path="${escapeAttribute(path)}" data-editor-kind="image" value="${escapeAttribute(value || "")}" placeholder="Paste an image path, public URL, or upload below">
      <input type="file" accept="image/*" data-editor-file="${escapeAttribute(path)}" aria-label="Upload ${escapeAttribute(label)}">
      <small>Use an existing asset path, a public image URL, or upload a small/optimized picture for this prototype.</small>
    </label>
  `;
}

function renderTextField(label, path, type, value) {
  const id = fieldId(path);
  const safeValue = value || "";

  if (type === "textarea") {
    return `
      <label class="editor-field" for="${id}">
        <span>${escapeHtml(label)}</span>
        <textarea id="${id}" data-editor-path="${escapeAttribute(path)}" rows="4">${escapeHtml(safeValue)}</textarea>
      </label>
    `;
  }

  return `
    <label class="editor-field" for="${id}">
      <span>${escapeHtml(label)}</span>
      <input id="${id}" type="text" data-editor-path="${escapeAttribute(path)}" value="${escapeAttribute(safeValue)}">
    </label>
  `;
}

function renderSiteEditorFields() {
  const target = document.getElementById("siteEditorFields");
  if (!target || !window.ATIGContent) return;

  const content = window.ATIGContent.get();
  target.innerHTML = editorSections.map((section) => `
    <article class="editor-panel">
      <div>
        <h3>${escapeHtml(section.title)}</h3>
        <p>${escapeHtml(section.helper)}</p>
      </div>
      <div class="editor-field-grid">
        ${section.fields.map(([label, path, type]) => {
          const value = window.ATIGContent.getPath(content, path);
          return type === "image"
            ? renderImageField(label, path, value)
            : renderTextField(label, path, type, value);
        }).join("")}
      </div>
    </article>
  `).join("");
}

function renderImageShelf() {
  const target = document.getElementById("approvedImageShelf");
  if (!target || !window.ATIGContent) return;

  target.innerHTML = window.ATIGContent.approvedImages.map(([label, path]) => `
    <button type="button" class="asset-chip" data-image-path="${escapeAttribute(path)}">
      <img src="${escapeAttribute(path)}" alt="">
      <span>${escapeHtml(label)}</span>
      <code>${escapeHtml(path)}</code>
    </button>
  `).join("");
}

function collectEditorContent() {
  const content = window.ATIGContent.get();

  document.querySelectorAll("[data-editor-path]").forEach((field) => {
    window.ATIGContent.setPath(content, field.dataset.editorPath, field.value);
  });

  return content;
}

async function publishHomepageContent(content) {
  const response = await fetch("/api/site-content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content)
  });

  if (!response.ok) {
    throw new Error("Could not write site-content.json");
  }
}

function updateFieldPreview(field) {
  const wrapper = field.closest(".editor-image-field");
  const preview = wrapper?.querySelector(".editor-preview");
  if (preview && field.value.trim()) {
    preview.src = field.value.trim();
  }
}

function wireSiteEditor() {
  const form = document.getElementById("siteEditorForm");
  if (!form || !window.ATIGContent) return;

  renderSiteEditorFields();
  renderImageShelf();

  form.addEventListener("input", (event) => {
    if (event.target.matches("[data-editor-kind='image']")) {
      updateFieldPreview(event.target);
    }
  });

  form.addEventListener("change", (event) => {
    const fileInput = event.target.closest("[data-editor-file]");
    if (!fileInput || !fileInput.files?.length) return;

    const path = fileInput.dataset.editorFile;
    const textInput = document.querySelector(`[data-editor-path="${path}"]`);
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (textInput && isDataImage(reader.result)) {
        textInput.value = reader.result;
        updateFieldPreview(textInput);
        setEditorStatus("Picture loaded into the editor. Hit Save site edits to use it on the homepage.");
      }
    });

    reader.readAsDataURL(file);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const content = collectEditorContent();
      window.ATIGContent.save(content);
      window.ATIGContent.apply();
      await publishHomepageContent(content);
      setEditorStatus("Saved and published to site-content.json. Refresh the homepage to see your new words and pictures.");
    } catch (error) {
      console.error(error);
      setEditorStatus("Saved in this browser, but could not publish the file. Make sure you are using the local server, not file://.");
    }
  });

  document.getElementById("siteEditorReset")?.addEventListener("click", () => {
    window.ATIGContent.reset();
    renderSiteEditorFields();
    setEditorStatus("Reset to the built-in homepage content.");
  });

  document.getElementById("siteEditorExport")?.addEventListener("click", () => {
    const jsonBox = document.getElementById("siteEditorJson");
    if (jsonBox) {
      jsonBox.value = JSON.stringify(collectEditorContent(), null, 2);
      setEditorStatus("Export ready below. This is the content package for the current site edits.");
    }
  });

  document.getElementById("siteEditorImport")?.addEventListener("click", () => {
    const jsonBox = document.getElementById("siteEditorJson");
    if (!jsonBox?.value.trim()) {
      setEditorStatus("Paste exported JSON into the box before importing.");
      return;
    }

    try {
      const imported = JSON.parse(jsonBox.value);
      window.ATIGContent.save(imported);
      renderSiteEditorFields();
      window.ATIGContent.apply();
      setEditorStatus("Imported. Open or refresh the homepage to check it.");
    } catch (error) {
      console.error(error);
      setEditorStatus("That import did not work. The JSON is probably missing a bracket or quote.");
    }
  });

  document.getElementById("approvedImageShelf")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-image-path]");
    if (!button) return;
    navigator.clipboard?.writeText(button.dataset.imagePath).then(() => {
      setEditorStatus(`${button.dataset.imagePath} copied. Paste it into the image field you want.`);
    }).catch(() => {
      setEditorStatus(`Use this path: ${button.dataset.imagePath}`);
    });
  });
}

wireSiteEditor();
