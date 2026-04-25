(function () {
  const { h, classNames } = window.AtigEditor.utils;

  function stopPreviewLink(event) {
    event.preventDefault();
  }

  function PreviewFrame({ section, selected, onSelect, label, children }) {
    return h(
      "section",
      {
        className: classNames("preview-section", selected && "is-selected"),
        onClick: () => onSelect(section.id),
        tabIndex: 0,
        role: "button",
        "aria-label": `Select ${label} section`
      },
      h("div", { className: "section-tag" }, label),
      children
    );
  }

  function HeroPreview({ section, selected, onSelect }) {
    return h(
      PreviewFrame,
      { section, selected, onSelect, label: "Hero" },
      h(
        "div",
        { className: "hero-preview" },
        h(
          "div",
          { className: "hero-copy" },
          h("h1", null, section.heading),
          h("p", null, section.subheading),
          h(
            "a",
            { href: section.buttonLink || "#", onClick: stopPreviewLink, className: "preview-action" },
            section.buttonText || "Button"
          )
        ),
        h(
          "div",
          { className: "hero-image-wrap" },
          h("img", { src: section.imageUrl, alt: "" })
        )
      )
    );
  }

  function TextPreview({ section, selected, onSelect }) {
    return h(
      PreviewFrame,
      { section, selected, onSelect, label: "Text" },
      h(
        "div",
        { className: "text-preview" },
        h("h2", null, section.title),
        h("p", null, section.body)
      )
    );
  }

  function CardsPreview({ section, selected, onSelect }) {
    return h(
      PreviewFrame,
      { section, selected, onSelect, label: "Cards" },
      h(
        "div",
        { className: "cards-preview" },
        h("h2", null, section.title),
        h(
          "div",
          { className: "card-grid" },
          section.items.map((item) =>
            h(
              "article",
              { key: item.id, className: "preview-card" },
              item.imageUrl ? h("img", { src: item.imageUrl, alt: "" }) : h("div", { className: "image-placeholder" }, "Image"),
              h("div", { className: "preview-card-body" }, h("h3", null, item.title), h("p", null, item.text), h("a", { href: item.link || "#", onClick: stopPreviewLink }, item.buttonLabel || "Visit"))
            )
          )
        )
      )
    );
  }

  function PreviewSection({ section, selected, onSelect }) {
    if (section.type === "hero") return h(HeroPreview, { section, selected, onSelect });
    if (section.type === "text") return h(TextPreview, { section, selected, onSelect });
    if (section.type === "cards") return h(CardsPreview, { section, selected, onSelect });
    return null;
  }

  window.AtigEditor.components = window.AtigEditor.components || {};
  window.AtigEditor.components.previews = {
    CardsPreview,
    HeroPreview,
    PreviewSection,
    TextPreview
  };
})();
