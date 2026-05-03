(function () {
  const { useMemo, useState } = React;
  const { h, createCardItem, fileToDataUrl, sanitizeImageSrc } = window.AtigEditor.utils;
  const { Button, Field, Input, Textarea } = window.AtigEditor.components.ui;

  function ImageInputField({ label, value, onChange, assetLibrary = [] }) {
    const [search, setSearch] = useState("");

    const filteredAssets = useMemo(() => {
      const query = search.trim().toLowerCase();
      if (!query) return assetLibrary;
      return assetLibrary.filter((asset) =>
        `${asset.label || ""} ${asset.path || ""}`.toLowerCase().includes(query)
      );
    }, [assetLibrary, search]);

    async function handleFile(event) {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        onChange(value || "");
        return;
      }

      try {
        const dataUrl = await fileToDataUrl(file);
        onChange(sanitizeImageSrc(dataUrl));
      } catch (error) {
        console.error(error);
      } finally {
        event.target.value = "";
      }
    }

    return h(
      Field,
      {
        label,
        hint: "Pick from the project assets folder. The preview updates right away."
      },
      h(
        "div",
        { className: "image-input-group" },
        value ? h("img", { className: "image-input-preview", src: value, alt: "" }) : null,
        h(
          "div",
          { className: "asset-picker-header" },
          h("div", null, h("span", { className: "field-mini-label" }, "Project pictures"), h("strong", null, `${assetLibrary.length} assets`)),
          h(Input, {
            className: "asset-search",
            value: search,
            onChange: (event) => setSearch(event.target.value),
            placeholder: "Search pictures"
          })
        ),
        h("div", { className: "image-input-stack" },
          h(
            "div",
            { className: "asset-picker-grid" },
            filteredAssets.length
              ? filteredAssets.map((asset) =>
              h(
                "button",
                {
                  key: asset.path,
                  type: "button",
                  className: asset.path === value ? "asset-picker-button is-active" : "asset-picker-button",
                  onClick: () => onChange(sanitizeImageSrc(asset.path))
                },
                h("img", { src: asset.path, alt: "" }),
                h("span", null, asset.label)
              )
            )
              : h("p", { className: "asset-picker-empty" }, "No pictures match that search.")
          )
        ),
        h("div", { className: "image-input-actions" },
          h("label", { className: "editor-button editor-button-plain upload-button" },
            "Upload Picture",
            h("input", {
              type: "file",
              accept: "image/*",
              onChange: handleFile
            })
          ),
          h(Button, {
            type: "button",
            onClick: () => onChange(""),
            disabled: !value
          }, "Clear Picture")
        ),
        h(
          "details",
          { className: "advanced-image-tools" },
          h("summary", null, "Advanced path"),
          h(Input, {
            value: value || "",
            onChange: (event) => onChange(sanitizeImageSrc(event.target.value)),
            placeholder: "../assets/your-picture.jpg or https://..."
          })
        )
      )
    );
  }

  function SectionEditor({
    section,
    assetLibrary,
    updateSection,
    moveSection,
    removeSection,
    canMoveDown,
    canMoveUp
  }) {
    if (!section) {
      return h(
        "div",
        { className: "empty-inspector" },
        h("h3", null, "Select a section"),
        h("p", null, "Click any section in the preview. Its fields will appear here.")
      );
    }

    function updateCardItem(itemId, patch) {
      const nextItems = section.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item));
      updateSection({ items: nextItems });
    }

    function addCard() {
      updateSection({ items: [...section.items, createCardItem()] });
    }

    function removeCard(itemId) {
      updateSection({ items: section.items.filter((item) => item.id !== itemId) });
    }

    return h(
      "div",
      { className: "inspector-content" },
      h(
        "div",
        { className: "inspector-heading" },
        h("div", null, h("p", null, "Inspector"), h("h2", null, "Edit Section"), h("span", null, section.type)),
        h(Button, { type: "button", variant: "danger", onClick: removeSection }, "Delete")
      ),
      h(
        "div",
        { className: "section-controls" },
        h(Button, { type: "button", onClick: () => moveSection(-1), disabled: !canMoveUp }, "Move Up"),
        h(Button, { type: "button", onClick: () => moveSection(1), disabled: !canMoveDown }, "Move Down")
      ),
      section.type === "hero"
        ? h(
            React.Fragment,
            null,
            h(Field, { label: "Heading" }, h(Input, { value: section.heading || "", onChange: (event) => updateSection({ heading: event.target.value }) })),
            h(Field, { label: "Subheading" }, h(Textarea, { value: section.subheading || "", onChange: (event) => updateSection({ subheading: event.target.value }) })),
            h(Field, { label: "Button label" }, h(Input, { value: section.buttonText || "", onChange: (event) => updateSection({ buttonText: event.target.value }) })),
            h(Field, { label: "Button link" }, h(Input, { value: section.buttonLink || "", onChange: (event) => updateSection({ buttonLink: event.target.value }) })),
            h(ImageInputField, { label: "Image", value: section.imageUrl || "", assetLibrary, onChange: (imageUrl) => updateSection({ imageUrl }) })
          )
        : null,
      section.type === "text"
        ? h(
            React.Fragment,
            null,
            h(Field, { label: "Title" }, h(Input, { value: section.title || "", onChange: (event) => updateSection({ title: event.target.value }) })),
            h(Field, { label: "Body" }, h(Textarea, { value: section.body || "", onChange: (event) => updateSection({ body: event.target.value }) }))
          )
        : null,
      section.type === "cards"
        ? h(
            React.Fragment,
            null,
            h(Field, { label: "Section title" }, h(Input, { value: section.title || "", onChange: (event) => updateSection({ title: event.target.value }) })),
            h(
              "div",
              { className: "card-editor-stack" },
              section.items.map((item, index) =>
                h(
                  "article",
                  { key: item.id, className: "card-editor" },
                  h(
                    "div",
                    { className: "card-editor-heading" },
                    h("strong", null, `Card ${index + 1}`),
                    h(Button, { type: "button", variant: "danger", onClick: () => removeCard(item.id), disabled: section.items.length <= 1 }, "Remove")
                  ),
                  h(ImageInputField, { label: "Image", value: item.imageUrl || "", assetLibrary, onChange: (imageUrl) => updateCardItem(item.id, { imageUrl }) }),
                  h(Field, { label: "Title" }, h(Input, { value: item.title || "", onChange: (event) => updateCardItem(item.id, { title: event.target.value }) })),
                  h(Field, { label: "Text" }, h(Textarea, { value: item.text || "", onChange: (event) => updateCardItem(item.id, { text: event.target.value }) })),
                  h(Field, { label: "Button label" }, h(Input, { value: item.buttonLabel || "", onChange: (event) => updateCardItem(item.id, { buttonLabel: event.target.value }) })),
                  h(Field, { label: "Link" }, h(Input, { value: item.link || "", onChange: (event) => updateCardItem(item.id, { link: event.target.value }) }))
                )
              ),
              h(Button, { type: "button", variant: "primary", onClick: addCard }, "Add Card")
            )
          )
        : null
    );
  }

  window.AtigEditor.components = window.AtigEditor.components || {};
  window.AtigEditor.components.inspector = {
    SectionEditor
  };
})();
