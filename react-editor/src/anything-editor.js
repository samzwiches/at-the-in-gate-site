(function () {
  const { useMemo, useState } = React;
  const { h, classNames, fileToDataUrl, makeId, sanitizeImageSrc } = window.AtigEditor.utils;
  const { Button, Field, Input, Select, Textarea } = window.AtigEditor.components.ui;

  const draftKey = "atig-anything-page-editor-draft";

  const blockTypes = [
    { value: "hero", label: "Hero" },
    { value: "text", label: "Text" },
    { value: "feature-grid", label: "Feature Grid" },
    { value: "gallery", label: "Gallery" },
    { value: "quote", label: "Quote" },
    { value: "cta", label: "Call To Action" }
  ];

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function safeSlug(value) {
    return (value || "created-page").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64) || "created-page";
  }

  function createItem(title, text) {
    return {
      id: makeId("item"),
      title: title || "New item",
      text: text || "Add a useful note here.",
      imageUrl: "",
      link: "#"
    };
  }

  function createBlock(type) {
    const id = makeId(type);

    if (type === "hero") {
      return {
        id,
        type,
        eyebrow: "New page",
        heading: "Build the page you need.",
        body: "Start with a clear promise, then add the sections that make the idea feel real.",
        buttonText: "Start here",
        buttonLink: "#",
        imageUrl: ""
      };
    }

    if (type === "text") {
      return {
        id,
        type,
        heading: "Tell the story plainly.",
        body: "Use this section for context, details, instructions, FAQs, policies, or anything that needs a little room."
      };
    }

    if (type === "feature-grid") {
      return {
        id,
        type,
        heading: "Useful details",
        items: [
          createItem("First thing", "A short explanation people can scan."),
          createItem("Second thing", "Make it practical, specific, and easy to compare."),
          createItem("Third thing", "Add a final reason this matters.")
        ]
      };
    }

    if (type === "gallery") {
      return {
        id,
        type,
        heading: "Gallery",
        items: [createItem("Image one", "A short caption."), createItem("Image two", "A short caption.")]
      };
    }

    if (type === "quote") {
      return {
        id,
        type,
        quote: "Put a sentence here that carries the feeling of the page.",
        byline: "Name or source"
      };
    }

    return {
      id,
      type: "cta",
      heading: "Ready for the next step?",
      body: "Give people one clear action.",
      buttonText: "Contact",
      buttonLink: "mailto:hello@example.com"
    };
  }

  const templates = {
    blank: {
      name: "Blank Page",
      project: () => ({
        title: "Untitled Page",
        slug: "created-page",
        accent: "#214c3f",
        background: "#f7f8f4",
        blocks: [createBlock("hero"), createBlock("text"), createBlock("feature-grid")]
      })
    },
    business: {
      name: "Small Business",
      project: () => ({
        title: "New Local Business",
        slug: "created-page",
        accent: "#214c3f",
        background: "#f7f8f4",
        blocks: [
          {
            ...createBlock("hero"),
            heading: "A useful local service, clearly explained.",
            body: "Say what you do, who it helps, and why someone should trust you.",
            buttonText: "Get in touch",
            buttonLink: "mailto:hello@example.com"
          },
          {
            ...createBlock("feature-grid"),
            heading: "What people can hire you for",
            items: [
              createItem("Service One", "Describe the outcome in one plain sentence."),
              createItem("Service Two", "Add the kind of detail that makes choosing easier."),
              createItem("Service Three", "Keep it specific enough that it feels real.")
            ]
          },
          createBlock("quote"),
          createBlock("cta")
        ]
      })
    },
    portfolio: {
      name: "Portfolio",
      project: () => ({
        title: "Portfolio",
        slug: "created-page",
        accent: "#395c8a",
        background: "#f4f6f8",
        blocks: [
          {
            ...createBlock("hero"),
            heading: "Work with a point of view.",
            body: "A short introduction to the person, practice, or studio.",
            buttonText: "View work",
            buttonLink: "#work"
          },
          { ...createBlock("gallery"), heading: "Selected work" },
          createBlock("text"),
          createBlock("cta")
        ]
      })
    },
    event: {
      name: "Event",
      project: () => ({
        title: "Upcoming Event",
        slug: "created-page",
        accent: "#8b4e3c",
        background: "#faf6ef",
        blocks: [
          {
            ...createBlock("hero"),
            eyebrow: "Save the date",
            heading: "A gathering worth showing up for.",
            body: "Add the date, location, and the reason people should come.",
            buttonText: "Register",
            buttonLink: "#register"
          },
          createBlock("text"),
          createBlock("feature-grid"),
          createBlock("cta")
        ]
      })
    }
  };

  function imageMarkup(src, alt, className) {
    return src ? `<img class="${className}" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">` : `<div class="${className} image-empty">Image</div>`;
  }

  function renderBlockHtml(block) {
    if (block.type === "hero") {
      return `
        <section class="page-block hero-block">
          <div class="hero-copy">
            <p class="eyebrow">${escapeHtml(block.eyebrow)}</p>
            <h1>${escapeHtml(block.heading)}</h1>
            <p>${escapeHtml(block.body)}</p>
            ${block.buttonText ? `<a class="action-link" href="${escapeHtml(block.buttonLink || "#")}">${escapeHtml(block.buttonText)}</a>` : ""}
          </div>
          ${imageMarkup(block.imageUrl, block.heading, "hero-media")}
        </section>`;
    }

    if (block.type === "text") {
      return `
        <section class="page-block text-block">
          <h2>${escapeHtml(block.heading)}</h2>
          <p>${escapeHtml(block.body)}</p>
        </section>`;
    }

    if (block.type === "feature-grid") {
      return `
        <section class="page-block">
          <h2>${escapeHtml(block.heading)}</h2>
          <div class="feature-grid">
            ${(block.items || []).map((item) => `
              <article class="feature-card">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
                ${item.link && item.link !== "#" ? `<a href="${escapeHtml(item.link)}">Open</a>` : ""}
              </article>`).join("")}
          </div>
        </section>`;
    }

    if (block.type === "gallery") {
      return `
        <section class="page-block" id="work">
          <h2>${escapeHtml(block.heading)}</h2>
          <div class="gallery-grid">
            ${(block.items || []).map((item) => `
              <figure>
                ${imageMarkup(item.imageUrl, item.title, "gallery-media")}
                <figcaption><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.text)}</span></figcaption>
              </figure>`).join("")}
          </div>
        </section>`;
    }

    if (block.type === "quote") {
      return `
        <section class="page-block quote-block">
          <blockquote>${escapeHtml(block.quote)}</blockquote>
          <p>${escapeHtml(block.byline)}</p>
        </section>`;
    }

    return `
      <section class="page-block cta-block" id="register">
        <h2>${escapeHtml(block.heading)}</h2>
        <p>${escapeHtml(block.body)}</p>
        ${block.buttonText ? `<a class="action-link" href="${escapeHtml(block.buttonLink || "#")}">${escapeHtml(block.buttonText)}</a>` : ""}
      </section>`;
  }

  function renderFullHtml(project) {
    const accent = project.accent || "#214c3f";
    const background = project.background || "#f7f8f4";

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(project.title)}</title>
    <style>
      :root { --accent: ${escapeHtml(accent)}; --bg: ${escapeHtml(background)}; --ink: #18241f; --muted: #60706a; --paper: #fffdfa; --line: #dfe6e1; }
      * { box-sizing: border-box; }
      body { margin: 0; background: var(--bg); color: var(--ink); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      main { width: min(1120px, calc(100% - 32px)); margin: 0 auto; padding: 28px 0 44px; }
      .page-block { margin: 0 0 18px; border: 1px solid var(--line); border-radius: 8px; background: var(--paper); padding: clamp(18px, 4vw, 40px); box-shadow: 0 10px 28px rgba(24, 36, 31, 0.08); }
      .hero-block { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(260px, 0.95fr); gap: 28px; align-items: center; min-height: 72vh; }
      .eyebrow { margin: 0 0 10px; color: var(--accent); font-size: 0.78rem; font-weight: 900; letter-spacing: 0.14em; text-transform: uppercase; }
      h1, h2, h3, p { margin-top: 0; }
      h1, h2 { font-family: Georgia, "Times New Roman", serif; line-height: 1; }
      h1 { font-size: clamp(2.4rem, 8vw, 5.8rem); }
      h2 { font-size: clamp(1.9rem, 5vw, 3.2rem); }
      p { color: var(--muted); font-size: 1.02rem; line-height: 1.65; }
      .action-link { display: inline-flex; align-items: center; justify-content: center; min-height: 42px; border-radius: 8px; background: var(--accent); color: #fff; padding: 10px 16px; font-weight: 850; text-decoration: none; }
      .hero-media, .gallery-media, .image-empty { width: 100%; border-radius: 8px; border: 1px solid var(--line); background: #edf2ee; object-fit: cover; }
      .hero-media, .image-empty.hero-media { aspect-ratio: 4 / 3; }
      .image-empty { display: grid; place-items: center; min-height: 180px; color: var(--muted); font-weight: 850; }
      .feature-grid, .gallery-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .feature-card, figure { margin: 0; border: 1px solid var(--line); border-radius: 8px; background: #ffffff; padding: 16px; }
      .feature-card a { color: var(--accent); font-weight: 850; }
      .gallery-media { aspect-ratio: 4 / 3; }
      figcaption { display: grid; gap: 5px; padding-top: 10px; }
      figcaption span { color: var(--muted); line-height: 1.45; }
      blockquote { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(1.8rem, 4vw, 3.6rem); line-height: 1.1; }
      .quote-block p { margin: 16px 0 0; color: var(--accent); font-weight: 850; }
      .cta-block { text-align: center; }
      @media (max-width: 780px) { .hero-block, .feature-grid, .gallery-grid { grid-template-columns: 1fr; } main { width: min(100% - 20px, 1120px); } }
    </style>
  </head>
  <body>
    <main>
      ${(project.blocks || []).map(renderBlockHtml).join("\n")}
    </main>
  </body>
</html>`;
  }

  function AnythingEditorApp() {
    const [project, setProject] = useState(() => templates.blank.project());
    const [selectedBlockId, setSelectedBlockId] = useState(project.blocks[0]?.id || "");
    const [blockTypeToAdd, setBlockTypeToAdd] = useState("text");
    const [status, setStatus] = useState("Start from a template, then edit the blocks into whatever you need.");

    const selectedBlock = useMemo(
      () => project.blocks.find((block) => block.id === selectedBlockId) || project.blocks[0] || null,
      [project, selectedBlockId]
    );
    const selectedIndex = project.blocks.findIndex((block) => block.id === selectedBlock?.id);
    const htmlOutput = useMemo(() => renderFullHtml(project), [project]);
    const outputFile = `${safeSlug(project.slug || project.title)}.html`;

    function updateProject(patch) {
      setProject((current) => ({ ...current, ...patch }));
    }

    function updateSelectedBlock(patch) {
      if (!selectedBlock) return;
      setProject((current) => ({
        ...current,
        blocks: current.blocks.map((block) => (block.id === selectedBlock.id ? { ...block, ...patch } : block))
      }));
    }

    function chooseTemplate(templateKey) {
      const nextProject = templates[templateKey].project();
      setProject(nextProject);
      setSelectedBlockId(nextProject.blocks[0]?.id || "");
      setStatus(`Loaded ${templates[templateKey].name}.`);
    }

    function addBlock() {
      const nextBlock = createBlock(blockTypeToAdd);
      setProject((current) => ({ ...current, blocks: [...current.blocks, nextBlock] }));
      setSelectedBlockId(nextBlock.id);
      setStatus(`Added ${blockTypes.find((type) => type.value === blockTypeToAdd)?.label || "block"}.`);
    }

    function removeBlock() {
      if (!selectedBlock || project.blocks.length <= 1) return;
      const nextBlocks = project.blocks.filter((block) => block.id !== selectedBlock.id);
      setProject((current) => ({ ...current, blocks: nextBlocks }));
      setSelectedBlockId(nextBlocks[Math.max(0, selectedIndex - 1)]?.id || "");
      setStatus("Block removed.");
    }

    function moveBlock(direction) {
      if (selectedIndex < 0) return;
      const targetIndex = selectedIndex + direction;
      if (targetIndex < 0 || targetIndex >= project.blocks.length) return;

      setProject((current) => {
        const blocks = current.blocks.slice();
        const currentBlock = blocks[selectedIndex];
        blocks[selectedIndex] = blocks[targetIndex];
        blocks[targetIndex] = currentBlock;
        return { ...current, blocks };
      });
    }

    function updateItem(itemId, patch) {
      if (!selectedBlock?.items) return;
      updateSelectedBlock({
        items: selectedBlock.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item))
      });
    }

    function addItem() {
      if (!selectedBlock?.items) return;
      updateSelectedBlock({ items: [...selectedBlock.items, createItem()] });
    }

    function removeItem(itemId) {
      if (!selectedBlock?.items || selectedBlock.items.length <= 1) return;
      updateSelectedBlock({ items: selectedBlock.items.filter((item) => item.id !== itemId) });
    }

    async function handleImageUpload(callback, event) {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file || !file.type.startsWith("image/")) return;

      try {
        callback(sanitizeImageSrc(await fileToDataUrl(file)));
      } catch (error) {
        console.error(error);
        setStatus("Could not read that image.");
      }
    }

    function saveDraft() {
      localStorage.setItem(draftKey, JSON.stringify(project));
      setStatus("Draft saved in this browser.");
    }

    function loadDraft() {
      const raw = localStorage.getItem(draftKey);
      if (!raw) {
        setStatus("No anything-page draft is saved in this browser yet.");
        return;
      }

      try {
        const parsed = JSON.parse(raw);
        setProject(parsed);
        setSelectedBlockId(parsed.blocks?.[0]?.id || "");
        setStatus("Draft loaded.");
      } catch (error) {
        console.error(error);
        setStatus("The saved draft could not be loaded.");
      }
    }

    function downloadHtml() {
      const blob = new Blob([htmlOutput], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${safeSlug(project.slug || project.title)}.html`;
      anchor.click();
      URL.revokeObjectURL(url);
      setStatus("HTML downloaded.");
    }

    async function publishLocalPage() {
      try {
        const response = await fetch("/api/created-page", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: htmlOutput, project, fileName: project.slug || project.title })
        });

        if (!response.ok) throw new Error("Publish failed");
        const result = await response.json();
        setStatus(`Published locally to ${result.file || outputFile}.`);
      } catch (error) {
        console.error(error);
        setStatus("Could not publish. Make sure the local server is running at 127.0.0.1:4173.");
      }
    }

    return h(
      "div",
      { className: "editor-app anything-app" },
      h(
        "header",
        { className: "editor-topbar" },
        h(
          "div",
          { className: "brand-block" },
          h("p", null, "Universal page creator"),
          h("h1", null, project.title || "Anything Page"),
          h("span", null, "Build a page from blocks, save the draft, then export or publish local HTML.")
        ),
        h(
          "div",
          { className: "topbar-actions" },
          h(Select, { value: "", onChange: (event) => event.target.value && chooseTemplate(event.target.value), "aria-label": "Choose template" },
            h("option", { value: "" }, "Choose template..."),
            Object.entries(templates).map(([key, template]) => h("option", { key, value: key }, template.name))
          ),
          h(Button, { type: "button", onClick: saveDraft }, "Save Draft"),
          h(Button, { type: "button", onClick: loadDraft }, "Load Draft"),
          h(Button, { type: "button", onClick: downloadHtml }, "Download HTML"),
          h(Button, { type: "button", variant: "primary", onClick: publishLocalPage }, "Publish Local Page"),
          h("a", { className: "editor-button editor-button-plain", href: `/${outputFile}`, target: "_blank", rel: "noreferrer" }, "Open Created Page")
        )
      ),
      h(
        "main",
        { className: "anything-workspace" },
        h(
          "aside",
          { className: "anything-sidebar", "aria-label": "Page settings and blocks" },
          h("section", { className: "anything-panel" },
            h("h2", null, "Page"),
            h(Field, { label: "Title" }, h(Input, { value: project.title || "", onChange: (event) => updateProject({ title: event.target.value }) })),
            h(Field, { label: "File name" }, h(Input, { value: project.slug || "", onChange: (event) => updateProject({ slug: safeSlug(event.target.value) }), placeholder: "created-page" })),
            h(Field, { label: "Accent color" }, h(Input, { type: "color", value: project.accent || "#214c3f", onChange: (event) => updateProject({ accent: event.target.value }) })),
            h(Field, { label: "Background color" }, h(Input, { type: "color", value: project.background || "#f7f8f4", onChange: (event) => updateProject({ background: event.target.value }) }))
          ),
          h("section", { className: "anything-panel" },
            h("h2", null, "Blocks"),
            h("div", { className: "block-add-row" },
              h(Select, { value: blockTypeToAdd, onChange: (event) => setBlockTypeToAdd(event.target.value) },
                blockTypes.map((type) => h("option", { key: type.value, value: type.value }, type.label))
              ),
              h(Button, { type: "button", variant: "primary", onClick: addBlock }, "Add")
            ),
            h("div", { className: "block-list" },
              project.blocks.map((block, index) =>
                h("button", {
                  key: block.id,
                  type: "button",
                  className: classNames("block-list-item", block.id === selectedBlock?.id && "is-active"),
                  onClick: () => setSelectedBlockId(block.id)
                }, h("span", null, `${index + 1}. ${blockTypes.find((type) => type.value === block.type)?.label || block.type}`), h("strong", null, block.heading || block.quote || "Untitled block"))
              )
            )
          )
        ),
        h(
          "section",
          { className: "anything-preview-shell", "aria-label": "Created page preview" },
          h("div", { className: "pane-heading" },
            h("div", null, h("p", null, "Preview"), h("h2", null, "Created Page")),
            h("span", null, status)
          ),
          h("iframe", { className: "anything-preview-frame", title: "Created page preview", srcDoc: htmlOutput })
        ),
        h(
          "aside",
          { className: "anything-inspector", "aria-label": "Block inspector" },
          h("section", { className: "anything-panel" },
            h("div", { className: "inspector-heading" },
              h("div", null, h("p", null, "Inspector"), h("h2", null, selectedBlock ? "Edit Block" : "No block"), h("span", null, selectedBlock?.type || "")),
              h(Button, { type: "button", variant: "danger", onClick: removeBlock, disabled: project.blocks.length <= 1 }, "Delete")
            ),
            h("div", { className: "section-controls" },
              h(Button, { type: "button", onClick: () => moveBlock(-1), disabled: selectedIndex <= 0 }, "Move Up"),
              h(Button, { type: "button", onClick: () => moveBlock(1), disabled: selectedIndex < 0 || selectedIndex >= project.blocks.length - 1 }, "Move Down")
            ),
            selectedBlock?.type === "hero"
              ? h(React.Fragment, null,
                  h(Field, { label: "Eyebrow" }, h(Input, { value: selectedBlock.eyebrow || "", onChange: (event) => updateSelectedBlock({ eyebrow: event.target.value }) })),
                  h(Field, { label: "Heading" }, h(Input, { value: selectedBlock.heading || "", onChange: (event) => updateSelectedBlock({ heading: event.target.value }) })),
                  h(Field, { label: "Body" }, h(Textarea, { value: selectedBlock.body || "", onChange: (event) => updateSelectedBlock({ body: event.target.value }) })),
                  h(Field, { label: "Button text" }, h(Input, { value: selectedBlock.buttonText || "", onChange: (event) => updateSelectedBlock({ buttonText: event.target.value }) })),
                  h(Field, { label: "Button link" }, h(Input, { value: selectedBlock.buttonLink || "", onChange: (event) => updateSelectedBlock({ buttonLink: event.target.value }) })),
                  h(Field, { label: "Image path or URL" }, h(Input, { value: selectedBlock.imageUrl || "", onChange: (event) => updateSelectedBlock({ imageUrl: sanitizeImageSrc(event.target.value) }) })),
                  h(Field, { label: "Upload image" }, h("input", { className: "field-control file-control", type: "file", accept: "image/*", onChange: (event) => handleImageUpload((imageUrl) => updateSelectedBlock({ imageUrl }), event) }))
                )
              : null,
            selectedBlock?.type === "text"
              ? h(React.Fragment, null,
                  h(Field, { label: "Heading" }, h(Input, { value: selectedBlock.heading || "", onChange: (event) => updateSelectedBlock({ heading: event.target.value }) })),
                  h(Field, { label: "Body" }, h(Textarea, { value: selectedBlock.body || "", onChange: (event) => updateSelectedBlock({ body: event.target.value }) }))
                )
              : null,
            selectedBlock?.type === "quote"
              ? h(React.Fragment, null,
                  h(Field, { label: "Quote" }, h(Textarea, { value: selectedBlock.quote || "", onChange: (event) => updateSelectedBlock({ quote: event.target.value }) })),
                  h(Field, { label: "Byline" }, h(Input, { value: selectedBlock.byline || "", onChange: (event) => updateSelectedBlock({ byline: event.target.value }) }))
                )
              : null,
            selectedBlock?.type === "cta"
              ? h(React.Fragment, null,
                  h(Field, { label: "Heading" }, h(Input, { value: selectedBlock.heading || "", onChange: (event) => updateSelectedBlock({ heading: event.target.value }) })),
                  h(Field, { label: "Body" }, h(Textarea, { value: selectedBlock.body || "", onChange: (event) => updateSelectedBlock({ body: event.target.value }) })),
                  h(Field, { label: "Button text" }, h(Input, { value: selectedBlock.buttonText || "", onChange: (event) => updateSelectedBlock({ buttonText: event.target.value }) })),
                  h(Field, { label: "Button link" }, h(Input, { value: selectedBlock.buttonLink || "", onChange: (event) => updateSelectedBlock({ buttonLink: event.target.value }) }))
                )
              : null,
            selectedBlock?.items
              ? h(React.Fragment, null,
                  h(Field, { label: "Section heading" }, h(Input, { value: selectedBlock.heading || "", onChange: (event) => updateSelectedBlock({ heading: event.target.value }) })),
                  h("div", { className: "card-editor-stack" },
                    selectedBlock.items.map((item, index) =>
                      h("article", { key: item.id, className: "card-editor" },
                        h("div", { className: "card-editor-heading" }, h("strong", null, `Item ${index + 1}`), h(Button, { type: "button", variant: "danger", onClick: () => removeItem(item.id), disabled: selectedBlock.items.length <= 1 }, "Remove")),
                        h(Field, { label: "Title" }, h(Input, { value: item.title || "", onChange: (event) => updateItem(item.id, { title: event.target.value }) })),
                        h(Field, { label: "Text" }, h(Textarea, { value: item.text || "", onChange: (event) => updateItem(item.id, { text: event.target.value }) })),
                        selectedBlock.type === "gallery"
                          ? h(React.Fragment, null,
                              h(Field, { label: "Image path or URL" }, h(Input, { value: item.imageUrl || "", onChange: (event) => updateItem(item.id, { imageUrl: sanitizeImageSrc(event.target.value) }) })),
                              h(Field, { label: "Upload image" }, h("input", { className: "field-control file-control", type: "file", accept: "image/*", onChange: (event) => handleImageUpload((imageUrl) => updateItem(item.id, { imageUrl }), event) }))
                            )
                          : h(Field, { label: "Link" }, h(Input, { value: item.link || "", onChange: (event) => updateItem(item.id, { link: event.target.value }) }))
                      )
                    ),
                    h(Button, { type: "button", variant: "primary", onClick: addItem }, "Add Item")
                  )
                )
              : null
          )
        )
      )
    );
  }

  window.AtigEditor.AnythingEditorApp = AnythingEditorApp;
})();
