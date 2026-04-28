(function () {
  const { useMemo, useState } = React;
  const { h, createSection, deepClone, getPage, sanitizeImageSrc, sanitizeSiteImages, storageKey } = window.AtigEditor.utils;
  const { Button, LinkButton, Select } = window.AtigEditor.components.ui;
  const { PreviewSection } = window.AtigEditor.components.previews;
  const { SectionEditor } = window.AtigEditor.components.inspector;

  function VisualEditorApp() {
    const [site, setSite] = useState(window.AtigEditor.initialSite);
    const [activePageId, setActivePageId] = useState("home");
    const [selectedSectionId, setSelectedSectionId] = useState("hero");
    const [sectionTypeToAdd, setSectionTypeToAdd] = useState("hero");
    const [status, setStatus] = useState("Local editor ready. Click a preview section to edit it.");
    const [jsonOutput, setJsonOutput] = useState("");

    const activePage = useMemo(() => getPage(site, activePageId) || site.pages[0], [site, activePageId]);
    const selectedSection = useMemo(
      () => activePage?.sections.find((section) => section.id === selectedSectionId),
      [activePage, selectedSectionId]
    );
    const selectedIndex = activePage?.sections.findIndex((section) => section.id === selectedSectionId) ?? -1;

    function updateSite(updater) {
      setSite((current) => {
        const draft = deepClone(current);
        updater(draft);
        return draft;
      });
    }

    function selectPage(pageId) {
      const nextPage = getPage(site, pageId);
      setActivePageId(pageId);
      setSelectedSectionId(nextPage?.sections?.[0]?.id || "");
      setStatus(`Editing ${nextPage?.name || "page"}.`);
    }

    function openPage(pageId) {
      selectPage(pageId);
      setTimeout(() => {
        document.querySelector(".editor-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }

    function updateSelectedSection(patch) {
      const nextPatch = { ...patch };

      if (Object.prototype.hasOwnProperty.call(nextPatch, "imageUrl")) {
        nextPatch.imageUrl = sanitizeImageSrc(nextPatch.imageUrl);
      }

      if (Array.isArray(nextPatch.items)) {
        nextPatch.items = nextPatch.items.map((item) => ({
          ...item,
          imageUrl: sanitizeImageSrc(item.imageUrl)
        }));
      }

      updateSite((draft) => {
        const page = getPage(draft, activePageId);
        if (!page) return;
        const index = page.sections.findIndex((section) => section.id === selectedSectionId);
        if (index === -1) return;
        page.sections[index] = { ...page.sections[index], ...nextPatch };
      });
    }

    function moveSection(direction) {
      updateSite((draft) => {
        const page = getPage(draft, activePageId);
        if (!page) return;
        const index = page.sections.findIndex((section) => section.id === selectedSectionId);
        const target = index + direction;
        if (index === -1 || target < 0 || target >= page.sections.length) return;
        const section = page.sections[index];
        page.sections[index] = page.sections[target];
        page.sections[target] = section;
      });
    }

    function removeSection() {
      if (!activePage || !selectedSection) return;

      const nextSelection =
        activePage.sections[selectedIndex + 1]?.id ||
        activePage.sections[selectedIndex - 1]?.id ||
        "";

      updateSite((draft) => {
        const page = getPage(draft, activePageId);
        if (!page) return;
        page.sections = page.sections.filter((section) => section.id !== selectedSectionId);
      });

      setSelectedSectionId(nextSelection);
      setStatus("Section deleted.");
    }

    function addSection() {
      const newSection = createSection(sectionTypeToAdd);

      updateSite((draft) => {
        const page = getPage(draft, activePageId);
        if (!page) return;
        page.sections.push(newSection);
      });

      setSelectedSectionId(newSection.id);
      setStatus(`Added a ${newSection.type} section.`);
    }

    function saveToBrowser() {
      try {
        const sanitizedSite = sanitizeSiteImages(site);
        setSite(sanitizedSite);
        localStorage.setItem(storageKey, JSON.stringify(sanitizedSite));
        setStatus("Saved to this browser. Refresh the public page, or leave it open and it should update on its own.");
      } catch (error) {
        console.error(error);
        setStatus("Save failed. A pasted image may be too large for browser storage.");
      }
    }

    async function publishToFile() {
      try {
        const sanitizedSite = sanitizeSiteImages(site);
        setSite(sanitizedSite);
        localStorage.setItem(storageKey, JSON.stringify(sanitizedSite));

        const response = await fetch("/api/editor-site", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedSite)
        });

        if (!response.ok) {
          throw new Error("Could not write editor-site.json");
        }

        setStatus("Published to editor-site.json. This is the file your public pages can read on the domain.");
      } catch (error) {
        console.error(error);
        setStatus("Saved in this browser, but could not publish the file. Use the local server at 127.0.0.1:4173.");
      }
    }

    function loadFromBrowser() {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        setStatus("No saved editor content found in this browser yet.");
        return;
      }

      try {
        const parsed = sanitizeSiteImages(JSON.parse(raw));
        const firstPage = parsed.pages?.[0];
        const firstSection = firstPage?.sections?.[0];
        setSite(parsed);
        setActivePageId(firstPage?.id || "home");
        setSelectedSectionId(firstSection?.id || "");
        setStatus("Loaded saved editor content from this browser.");
      } catch (error) {
        console.error(error);
        setStatus("Could not load saved content. The stored JSON may be damaged.");
      }
    }

    function exportJson() {
      const sanitizedSite = sanitizeSiteImages(site);
      setSite(sanitizedSite);
      const json = JSON.stringify(sanitizedSite, null, 2);
      setJsonOutput(json);

      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "atig-site-content.json";
      anchor.click();
      URL.revokeObjectURL(url);
      setStatus("JSON exported.");
    }

    function loadDemoContent() {
      setSite(deepClone(window.AtigEditor.initialSite));
      setActivePageId("home");
      setSelectedSectionId("hero");
      setStatus("Starter content restored.");
    }

    return h(
      "div",
      { className: "editor-app" },
      h(
        "header",
        { className: "editor-topbar" },
        h(
          "div",
          { className: "brand-block" },
          h("p", null, "React visual editor"),
          h("h1", null, site.siteName),
          h("span", null, "Live preview on the left. Inspector on the right.")
        ),
        h(
          "div",
          { className: "topbar-actions" },
          h(Select, { value: activePageId, onChange: (event) => selectPage(event.target.value) }, site.pages.map((page) => h("option", { key: page.id, value: page.id }, page.name))),
          h(Select, { value: sectionTypeToAdd, onChange: (event) => setSectionTypeToAdd(event.target.value) }, h("option", { value: "hero" }, "Hero"), h("option", { value: "text" }, "Text"), h("option", { value: "cards" }, "Cards")),
          h(Button, { type: "button", variant: "primary", onClick: addSection }, "Add Section"),
          h(Button, { type: "button", onClick: saveToBrowser }, "Save"),
          h(Button, { type: "button", variant: "primary", onClick: publishToFile }, "Publish File"),
          h(Button, { type: "button", onClick: loadFromBrowser }, "Load"),
          h(Button, { type: "button", onClick: exportJson }, "Export JSON"),
          h(Button, { type: "button", onClick: loadDemoContent }, "Reset Demo"),
          h(LinkButton, { href: activePage?.href || "../index.html" }, "Open Public Page")
        )
      ),
      h(
        "nav",
        { className: "page-tabs", "aria-label": "Pages to edit" },
        site.pages.map((page) =>
          h(
            "button",
            {
              key: page.id,
              type: "button",
              className: page.id === activePageId ? "is-active" : "",
              onClick: () => selectPage(page.id)
            },
            page.name
          )
        )
      ),
      h(
        "section",
        { className: "owner-page-chooser", "aria-label": "Choose a page to edit" },
        h(
          "div",
          { className: "owner-page-chooser-copy" },
          h("p", null, "Owner shortcut"),
          h("h2", null, "Pick the page you want to change."),
          h("span", null, "Use Save for a browser draft. Use Publish File when it needs to survive on the domain.")
        ),
        h(
          "div",
          { className: "owner-page-card-grid" },
          site.pages.map((page) =>
            h(
              "button",
              {
                key: page.id,
                type: "button",
                className: page.id === activePageId ? "owner-page-card is-active" : "owner-page-card",
                onClick: () => openPage(page.id)
              },
              h("span", null, page.name),
              h("strong", null, page.id === "home" ? "Edit the front door" : `Edit ${page.name}`),
              h("small", null, page.href ? page.href.replace("../", "/") : "Page content")
            )
          )
        )
      ),
      h(
        "main",
        { className: "editor-workspace" },
        h(
          "section",
          { className: "preview-pane", "aria-label": "Live page preview" },
          h(
            "div",
            { className: "pane-heading" },
            h("div", null, h("p", null, "Left pane"), h("h2", null, `${activePage?.name || "Page"} Preview`)),
            h("span", null, "Click any section")
          ),
          h(
            "div",
            { className: "preview-page" },
            activePage?.sections.length
              ? activePage.sections.map((section) =>
                  h(PreviewSection, {
                    key: section.id,
                    section,
                    selected: section.id === selectedSectionId,
                    onSelect: setSelectedSectionId
                  })
                )
              : h("div", { className: "empty-preview" }, h("h3", null, "No sections yet"), h("p", null, "Add a hero, text, or cards section to begin."))
          )
        ),
        h(
          "aside",
          { className: "inspector-pane", "aria-label": "Inspector editor panel" },
          h(
            "div",
            { className: "pane-heading" },
            h("div", null, h("p", null, "Right pane"), h("h2", null, "Inspector")),
            h("span", null, `${activePage?.sections.length || 0} sections`)
          ),
          h("p", { className: "editor-status" }, status),
          h(SectionEditor, {
            section: selectedSection,
            updateSection: updateSelectedSection,
            moveSection,
            removeSection,
            canMoveUp: selectedIndex > 0,
            canMoveDown: selectedIndex > -1 && selectedIndex < activePage.sections.length - 1
          }),
          h(
            "section",
            { className: "json-panel" },
            h("h3", null, "Exported JSON"),
            h("p", null, "The page content is stored as JSON so this can later plug into uploads, templates, auth, billing, or a real database."),
            h("textarea", { value: jsonOutput, readOnly: true, placeholder: "Use Export JSON to generate the current content here." })
          )
        )
      )
    );
  }

  window.AtigEditor.SectionBuilderApp = VisualEditorApp;
})();
