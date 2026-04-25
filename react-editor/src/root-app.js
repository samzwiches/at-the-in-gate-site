(function () {
  const { useState } = React;
  const { h, classNames } = window.AtigEditor.utils;

  function getInitialMode() {
    const mode = new URLSearchParams(window.location.search).get("mode");
    if (mode === "site" || mode === "sections") return "sections";
    if (mode === "project") return "project";
    return "anything";
  }

  function RootEditorApp() {
    const [mode, setMode] = useState(getInitialMode);
    const AnythingEditorApp = window.AtigEditor.AnythingEditorApp;
    const ProjectEditorApp = window.AtigEditor.ProjectEditorApp;
    const SectionBuilderApp = window.AtigEditor.SectionBuilderApp;

    function chooseMode(nextMode) {
      setMode(nextMode);
      const queryMode = nextMode === "sections" ? "site" : nextMode;
      const nextUrl = `${window.location.pathname}?mode=${queryMode}`;
      window.history.replaceState(null, "", nextUrl);
    }

    return h(
      "div",
      { className: "editor-root" },
      h(
        "div",
        { className: "editor-mode-tabs", role: "tablist", "aria-label": "Editor modes" },
        h(
          "button",
          {
            type: "button",
            className: classNames(mode === "anything" && "is-active"),
            onClick: () => chooseMode("anything")
          },
          "Create Anything"
        ),
        h(
          "button",
          {
            type: "button",
            className: classNames(mode === "project" && "is-active"),
            onClick: () => chooseMode("project")
          },
          "Open Any Project"
        ),
        h(
          "button",
          {
            type: "button",
            className: classNames(mode === "sections" && "is-active"),
            onClick: () => chooseMode("sections")
          },
          "Edit This Site"
        )
      ),
      mode === "anything" && AnythingEditorApp ? h(AnythingEditorApp) : null,
      mode === "project" && ProjectEditorApp ? h(ProjectEditorApp) : null,
      mode === "sections" && SectionBuilderApp ? h(SectionBuilderApp) : null
    );
  }

  window.AtigEditor.App = RootEditorApp;
})();
