(function () {
  const { useEffect, useMemo, useRef, useState } = React;
  const { h } = window.AtigEditor.utils;
  const { Button, Field, Input, Select, Textarea } = window.AtigEditor.components.ui;

  const HTML_EXTENSIONS = /\.html?$/i;
  const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|svg|webp|avif)$/i;
  const SKIP_DIRECTORIES = new Set([".git", "node_modules", ".next", "dist", "build"]);
  const PREVIEW_MESSAGE_SOURCE = "atig-project-preview";
  const EDITABLE_SELECTOR = "h1, h2, h3, h4, h5, h6, p, li, a, button, img, span, small, strong, em, label";

  function fileName(path) {
    return path.split("/").pop() || path;
  }

  function dirName(path) {
    const parts = path.split("/");
    parts.pop();
    return parts.join("/");
  }

  function normalizePath(path) {
    const parts = [];

    path.split("/").forEach((part) => {
      if (!part || part === ".") return;
      if (part === "..") {
        parts.pop();
      } else {
        parts.push(part);
      }
    });

    return parts.join("/");
  }

  function resolvePath(fromFilePath, targetPath) {
    if (!targetPath) return "";
    if (targetPath.startsWith("/")) {
      return normalizePath(targetPath);
    }

    const baseDirectory = dirName(fromFilePath);
    return normalizePath(baseDirectory ? `${baseDirectory}/${targetPath}` : targetPath);
  }

  function makeRelativePath(fromFilePath, toFilePath) {
    const fromParts = dirName(fromFilePath).split("/").filter(Boolean);
    const toParts = toFilePath.split("/").filter(Boolean);
    let index = 0;

    while (index < fromParts.length && index < toParts.length && fromParts[index] === toParts[index]) {
      index += 1;
    }

    const ups = fromParts.slice(index).map(() => "..");
    const downs = toParts.slice(index);
    return [...ups, ...downs].join("/") || fileName(toFilePath);
  }

  function stripHash(value) {
    return (value || "").split("#")[0];
  }

  function isLocalPath(value) {
    if (!value) return false;
    return !/^(?:[a-z]+:|\/\/|#|javascript:|mailto:|tel:)/i.test(value);
  }

  function summarizeText(value) {
    return (value || "").replace(/\s+/g, " ").trim().slice(0, 90);
  }

  function safeFileName(name) {
    const parts = name.split(".");
    const ext = parts.length > 1 ? parts.pop().toLowerCase() : "png";
    const stem = parts.join(".").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "image";
    return `${stem}-${Date.now()}.${ext}`;
  }

  async function readFileText(handle) {
    return (await handle.getFile()).text();
  }

  async function scanDirectory(directoryHandle, prefix = "") {
    const files = {};

    for await (const [name, entry] of directoryHandle.entries()) {
      const relativePath = prefix ? `${prefix}/${name}` : name;

      if (entry.kind === "directory") {
        if (SKIP_DIRECTORIES.has(name)) continue;
        Object.assign(files, await scanDirectory(entry, relativePath));
      } else {
        files[relativePath] = entry;
      }
    }

    return files;
  }

  function parseDocument(html) {
    return new DOMParser().parseFromString(html, "text/html");
  }

  function serializeDocument(documentNode) {
    const doctype = documentNode.doctype ? `<!DOCTYPE ${documentNode.doctype.name}>\n` : "<!doctype html>\n";
    return doctype + documentNode.documentElement.outerHTML;
  }

  function stripEditorMarkers(documentNode) {
    documentNode.querySelectorAll("[data-editor-id]").forEach((element) => element.removeAttribute("data-editor-id"));
    documentNode.querySelectorAll("[data-editor-selected]").forEach((element) => element.removeAttribute("data-editor-selected"));
  }

  function makeElementDescriptor(element, id) {
    const tag = element.tagName.toLowerCase();
    const kind = tag === "img" ? "image" : tag === "a" ? "link" : tag === "button" ? "button" : "text";

    return {
      id,
      tag,
      kind,
      label:
        kind === "image"
          ? `${tag.toUpperCase()} - ${fileName(element.getAttribute("src") || "image")}`
          : `${tag.toUpperCase()} - ${summarizeText(element.textContent) || "(empty text)"}`,
      text: kind === "image" ? "" : element.textContent || "",
      src: element.getAttribute("src") || "",
      alt: element.getAttribute("alt") || "",
      href: element.getAttribute("href") || ""
    };
  }

  function collectEditableElements(documentNode, selectedId) {
    const candidates = Array.from(documentNode.body ? documentNode.body.querySelectorAll(EDITABLE_SELECTOR) : []);
    const items = [];
    let index = 0;

    candidates.forEach((element) => {
      const tag = element.tagName.toLowerCase();
      const hasText = summarizeText(element.textContent).length > 0;
      const hasImage = tag === "img" && !!element.getAttribute("src");
      const hasLink = tag === "a" || tag === "button";

      if (!hasText && !hasImage && !hasLink) return;

      const id = `editable-${index++}`;
      element.setAttribute("data-editor-id", id);
      if (id === selectedId) {
        element.setAttribute("data-editor-selected", "true");
      }
      items.push(makeElementDescriptor(element, id));
    });

    return items;
  }

  function updateHtmlAtSelection(html, selectedId, patch) {
    if (!selectedId) return html;

    const documentNode = parseDocument(html);
    collectEditableElements(documentNode, selectedId);
    const target = documentNode.querySelector(`[data-editor-id="${selectedId}"]`);
    if (!target) return html;

    if (Object.prototype.hasOwnProperty.call(patch, "text")) {
      target.textContent = patch.text;
    }

    if (Object.prototype.hasOwnProperty.call(patch, "src")) {
      if (patch.src) target.setAttribute("src", patch.src);
      else target.removeAttribute("src");
    }

    if (Object.prototype.hasOwnProperty.call(patch, "alt")) {
      if (patch.alt) target.setAttribute("alt", patch.alt);
      else target.removeAttribute("alt");
    }

    if (Object.prototype.hasOwnProperty.call(patch, "href")) {
      if (patch.href) target.setAttribute("href", patch.href);
      else target.removeAttribute("href");
    }

    stripEditorMarkers(documentNode);
    return serializeDocument(documentNode);
  }

  async function rewriteCssUrls(cssText, cssPath, loadAssetUrl) {
    const regex = /url\(([^)]+)\)/g;
    let output = "";
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(cssText))) {
      output += cssText.slice(lastIndex, match.index);
      const rawValue = match[1].trim().replace(/^['"]|['"]$/g, "");
      let replacement = rawValue;

      if (isLocalPath(rawValue)) {
        const resolved = resolvePath(cssPath, rawValue);
        const objectUrl = await loadAssetUrl(resolved);
        if (objectUrl) replacement = objectUrl;
      }

      output += `url("${replacement}")`;
      lastIndex = regex.lastIndex;
    }

    output += cssText.slice(lastIndex);
    return output;
  }

  async function buildPreviewHtml(html, pagePath, fileIndex, loadText, loadAssetUrl, selectedId) {
    const documentNode = parseDocument(html);
    documentNode.querySelectorAll("script").forEach((element) => element.remove());

    const editableItems = collectEditableElements(documentNode, selectedId);

    const stylesheetLinks = Array.from(documentNode.querySelectorAll('link[rel="stylesheet"][href]'));
    for (const link of stylesheetLinks) {
      const href = link.getAttribute("href");
      if (!isLocalPath(href)) continue;

      const resolved = resolvePath(pagePath, href);
      if (!fileIndex[resolved]) continue;

      const style = documentNode.createElement("style");
      style.textContent = await rewriteCssUrls(await loadText(resolved), resolved, loadAssetUrl);
      link.replaceWith(style);
    }

    const mediaElements = Array.from(documentNode.querySelectorAll("img[src], source[src], video[src], audio[src], link[rel='icon'][href], link[rel='shortcut icon'][href]"));
    for (const element of mediaElements) {
      const attribute = element.tagName.toLowerCase() === "link" ? "href" : "src";
      const value = element.getAttribute(attribute);
      if (!isLocalPath(value)) continue;

      const objectUrl = await loadAssetUrl(resolvePath(pagePath, value));
      if (objectUrl) {
        element.setAttribute(attribute, objectUrl);
      }
    }

    const previewStyle = documentNode.createElement("style");
    previewStyle.textContent = `
      [data-editor-id] {
        cursor: pointer;
        transition: outline-color 120ms ease, box-shadow 120ms ease;
      }

      [data-editor-id]:hover {
        outline: 2px solid rgba(32, 72, 59, 0.7);
        outline-offset: 2px;
      }

      [data-editor-selected="true"] {
        outline: 3px solid rgba(184, 148, 79, 0.95);
        outline-offset: 2px;
        box-shadow: 0 0 0 3px rgba(184, 148, 79, 0.2);
      }
    `;
    documentNode.head.appendChild(previewStyle);

    const previewScript = documentNode.createElement("script");
    previewScript.textContent = `
      (function () {
        document.addEventListener("click", function (event) {
          const link = event.target.closest && event.target.closest("a[href]");
          if (link) {
            event.preventDefault();
          }

          const target = event.target.closest && event.target.closest("[data-editor-id]");
          if (!target) return;

          event.preventDefault();
          event.stopPropagation();

          document.querySelectorAll("[data-editor-selected]").forEach(function (node) {
            node.removeAttribute("data-editor-selected");
          });

          target.setAttribute("data-editor-selected", "true");
          window.parent.postMessage({
            source: "${PREVIEW_MESSAGE_SOURCE}",
            type: "select",
            id: target.getAttribute("data-editor-id")
          }, "*");
        }, true);
      })();
    `;
    documentNode.body.appendChild(previewScript);

    return {
      html: serializeDocument(documentNode),
      editableItems
    };
  }

  async function writeProjectFile(rootHandle, relativePath, contents) {
    const parts = relativePath.split("/").filter(Boolean);
    const file = parts.pop();
    let directory = rootHandle;

    for (const segment of parts) {
      directory = await directory.getDirectoryHandle(segment, { create: true });
    }

    const fileHandle = await directory.getFileHandle(file, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(contents);
    await writable.close();
    return fileHandle;
  }

  function ProjectEditorApp() {
    const fileTextCacheRef = useRef({});
    const fileUrlCacheRef = useRef({});
    const pageHtmlRef = useRef({});
    const dirtyRef = useRef({});

    const [projectHandle, setProjectHandle] = useState(null);
    const [projectName, setProjectName] = useState("No project open yet");
    const [fileIndex, setFileIndex] = useState({});
    const [htmlPages, setHtmlPages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [pageHtmlByPath, setPageHtmlByPath] = useState({});
    const [dirtyPages, setDirtyPages] = useState({});
    const [activePagePath, setActivePagePath] = useState("");
    const [selectedNodeId, setSelectedNodeId] = useState("");
    const [editableItems, setEditableItems] = useState([]);
    const [previewHtml, setPreviewHtml] = useState("");
    const [status, setStatus] = useState("Open a local HTML project folder to begin.");
    const [busy, setBusy] = useState(false);
    const [previewBusy, setPreviewBusy] = useState(false);

    pageHtmlRef.current = pageHtmlByPath;
    dirtyRef.current = dirtyPages;

    useEffect(() => {
      return () => {
        Object.values(fileUrlCacheRef.current).forEach((url) => URL.revokeObjectURL(url));
      };
    }, []);

    useEffect(() => {
      function handleMessage(event) {
        if (event.data?.source === PREVIEW_MESSAGE_SOURCE && event.data?.type === "select") {
          setSelectedNodeId(event.data.id || "");
        }
      }

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, []);

    const selectedElement = useMemo(
      () => editableItems.find((item) => item.id === selectedNodeId) || null,
      [editableItems, selectedNodeId]
    );

    const selectedImagePreview = useMemo(() => {
      if (!selectedElement || selectedElement.kind !== "image" || !selectedElement.src) {
        return "";
      }

      if (!isLocalPath(selectedElement.src)) {
        return selectedElement.src;
      }

      return fileUrlCacheRef.current[resolvePath(activePagePath, selectedElement.src)] || "";
    }, [activePagePath, previewHtml, selectedElement]);

    const selectedImageProjectPath = useMemo(() => {
      if (!selectedElement || selectedElement.kind !== "image" || !selectedElement.src) {
        return "";
      }

      if (!isLocalPath(selectedElement.src)) return "";

      const resolved = resolvePath(activePagePath, selectedElement.src);
      return fileIndex[resolved] ? resolved : "";
    }, [activePagePath, fileIndex, selectedElement]);

    const currentLinkedPage = useMemo(() => {
      if (!selectedElement || (selectedElement.kind !== "link" && selectedElement.kind !== "button")) {
        return "";
      }

      const href = stripHash(selectedElement.href || "");
      if (!href || !isLocalPath(href)) return "";

      const resolved = resolvePath(activePagePath, href);
      return htmlPages.includes(resolved) ? resolved : "";
    }, [activePagePath, htmlPages, selectedElement]);

    const hasDirtyPages = useMemo(
      () => Object.values(dirtyPages).some(Boolean),
      [dirtyPages]
    );

    async function loadText(relativePath) {
      if (fileTextCacheRef.current[relativePath]) {
        return fileTextCacheRef.current[relativePath];
      }

      const handle = fileIndex[relativePath];
      if (!handle) return "";

      const text = await readFileText(handle);
      fileTextCacheRef.current[relativePath] = text;
      return text;
    }

    async function loadAssetUrl(relativePath) {
      if (fileUrlCacheRef.current[relativePath]) {
        return fileUrlCacheRef.current[relativePath];
      }

      const handle = fileIndex[relativePath];
      if (!handle) return "";

      const url = URL.createObjectURL(await handle.getFile());
      fileUrlCacheRef.current[relativePath] = url;
      return url;
    }

    async function openProjectFolder() {
      if (typeof window.showDirectoryPicker !== "function") {
        setStatus("This browser does not expose folder access. Use the desktop app browser or a Chromium-based browser.");
        return;
      }

      try {
        setBusy(true);
        const handle = await window.showDirectoryPicker();
        const nextIndex = await scanDirectory(handle);
        const nextHtmlPages = Object.keys(nextIndex).filter((path) => HTML_EXTENSIONS.test(path)).sort();
        const nextImageFiles = Object.keys(nextIndex).filter((path) => IMAGE_EXTENSIONS.test(path)).sort();
        const nextPageHtml = {};

        for (const path of nextHtmlPages) {
          nextPageHtml[path] = await readFileText(nextIndex[path]);
        }

        Object.values(fileUrlCacheRef.current).forEach((url) => URL.revokeObjectURL(url));
        fileUrlCacheRef.current = {};
        fileTextCacheRef.current = {};

        setProjectHandle(handle);
        setProjectName(handle.name || "Project");
        setFileIndex(nextIndex);
        setHtmlPages(nextHtmlPages);
        setImageFiles(nextImageFiles);
        setPageHtmlByPath(nextPageHtml);
        setDirtyPages({});
        setActivePagePath(nextHtmlPages[0] || "");
        setSelectedNodeId("");
        setStatus(`Opened ${handle.name}. Pick a page and click something in the preview to edit it.`);
      } catch (error) {
        if (error && error.name === "AbortError") {
          setStatus("Folder selection cancelled.");
        } else {
          console.error(error);
          setStatus("Could not open that project folder.");
        }
      } finally {
        setBusy(false);
      }
    }

    async function rescanProjectFolder() {
      if (!projectHandle) return;

      try {
        setBusy(true);
        const nextIndex = await scanDirectory(projectHandle);
        const nextHtmlPages = Object.keys(nextIndex).filter((path) => HTML_EXTENSIONS.test(path)).sort();
        const nextImageFiles = Object.keys(nextIndex).filter((path) => IMAGE_EXTENSIONS.test(path)).sort();
        const nextPageHtml = {};

        for (const path of nextHtmlPages) {
          nextPageHtml[path] = await readFileText(nextIndex[path]);
        }

        Object.values(fileUrlCacheRef.current).forEach((url) => URL.revokeObjectURL(url));
        fileUrlCacheRef.current = {};
        fileTextCacheRef.current = {};

        setFileIndex(nextIndex);
        setHtmlPages(nextHtmlPages);
        setImageFiles(nextImageFiles);
        setPageHtmlByPath(nextPageHtml);
        setDirtyPages({});
        setActivePagePath((current) => (nextHtmlPages.includes(current) ? current : nextHtmlPages[0] || ""));
        setSelectedNodeId("");
        setStatus(`Rescanned ${projectHandle.name}. File list refreshed.`);
      } catch (error) {
        console.error(error);
        setStatus("Could not rescan that folder.");
      } finally {
        setBusy(false);
      }
    }

    useEffect(() => {
      let cancelled = false;

      async function rebuildPreview() {
        if (!activePagePath || !pageHtmlByPath[activePagePath]) {
          setPreviewHtml("");
          setEditableItems([]);
          return;
        }

        try {
          setPreviewBusy(true);
          const preview = await buildPreviewHtml(
            pageHtmlByPath[activePagePath],
            activePagePath,
            fileIndex,
            loadText,
            loadAssetUrl,
            selectedNodeId
          );

          if (cancelled) return;
          setPreviewHtml(preview.html);
          setEditableItems(preview.editableItems);

          if (!selectedNodeId && preview.editableItems[0]) {
            setSelectedNodeId(preview.editableItems[0].id);
          } else if (selectedNodeId && !preview.editableItems.some((item) => item.id === selectedNodeId)) {
            setSelectedNodeId(preview.editableItems[0]?.id || "");
          }
        } catch (error) {
          console.error(error);
          if (!cancelled) setStatus("Preview build hit a snag. The file may include unsupported markup.");
        } finally {
          if (!cancelled) setPreviewBusy(false);
        }
      }

      rebuildPreview();
      return () => {
        cancelled = true;
      };
    }, [activePagePath, fileIndex, pageHtmlByPath, selectedNodeId]);

    function selectPage(path) {
      setActivePagePath(path);
      setSelectedNodeId("");
      setStatus(`Editing ${fileName(path)}.`);
    }

    function updateSelectedElement(patch) {
      if (!activePagePath || !selectedNodeId) return;

      setPageHtmlByPath((current) => ({
        ...current,
        [activePagePath]: updateHtmlAtSelection(current[activePagePath], selectedNodeId, patch)
      }));

      setDirtyPages((current) => ({ ...current, [activePagePath]: true }));
    }

    async function saveActivePage() {
      if (!projectHandle || !activePagePath) return;

      try {
        setBusy(true);
        await writeProjectFile(projectHandle, activePagePath, pageHtmlRef.current[activePagePath]);
        setDirtyPages((current) => ({ ...current, [activePagePath]: false }));
        setStatus(`Saved ${fileName(activePagePath)} back to the project folder.`);
      } catch (error) {
        console.error(error);
        setStatus("Could not save that page back to disk.");
      } finally {
        setBusy(false);
      }
    }

    async function saveAllPages() {
      if (!projectHandle) return;

      try {
        setBusy(true);
        const dirtyPaths = Object.keys(dirtyRef.current).filter((path) => dirtyRef.current[path]);

        for (const path of dirtyPaths) {
          await writeProjectFile(projectHandle, path, pageHtmlRef.current[path]);
        }

        setDirtyPages({});
        setStatus(dirtyPaths.length ? `Saved ${dirtyPaths.length} page${dirtyPaths.length === 1 ? "" : "s"} to disk.` : "Nothing was waiting to save.");
      } catch (error) {
        console.error(error);
        setStatus("Could not save all pages.");
      } finally {
        setBusy(false);
      }
    }

    async function reloadActivePage() {
      if (!activePagePath || !fileIndex[activePagePath]) return;

      try {
        setBusy(true);
        const nextHtml = await readFileText(fileIndex[activePagePath]);
        setPageHtmlByPath((current) => ({ ...current, [activePagePath]: nextHtml }));
        setDirtyPages((current) => ({ ...current, [activePagePath]: false }));
        setSelectedNodeId("");
        setStatus(`Reloaded ${fileName(activePagePath)} from disk.`);
      } catch (error) {
        console.error(error);
        setStatus("Could not reload that page.");
      } finally {
        setBusy(false);
      }
    }

    async function uploadProjectImage(event) {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file || !projectHandle || !activePagePath) return;

      try {
        const nextRelativePath = `assets/${safeFileName(file.name)}`;
        const handle = await writeProjectFile(projectHandle, nextRelativePath, await file.arrayBuffer());

        setFileIndex((current) => ({ ...current, [nextRelativePath]: handle }));
        setImageFiles((current) => Array.from(new Set([...current, nextRelativePath])).sort());

        updateSelectedElement({ src: makeRelativePath(activePagePath, nextRelativePath) });
        setStatus(`Added ${file.name} to the project assets and updated the picture.`);
      } catch (error) {
        console.error(error);
        setStatus("Could not add that picture to the project.");
      }
    }

    async function replaceSelectedImageFile(event) {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file || !projectHandle || !selectedImageProjectPath) return;

      try {
        const handle = await writeProjectFile(projectHandle, selectedImageProjectPath, await file.arrayBuffer());

        if (fileUrlCacheRef.current[selectedImageProjectPath]) {
          URL.revokeObjectURL(fileUrlCacheRef.current[selectedImageProjectPath]);
          delete fileUrlCacheRef.current[selectedImageProjectPath];
        }

        setFileIndex((current) => ({ ...current, [selectedImageProjectPath]: handle }));
        setStatus(`Replaced ${fileName(selectedImageProjectPath)} in the project.`);
      } catch (error) {
        console.error(error);
        setStatus("Could not replace that picture file.");
      }
    }

    function chooseProjectImage(projectImagePath) {
      updateSelectedElement({ src: makeRelativePath(activePagePath, projectImagePath) });
    }

    function chooseProjectPage(projectPagePath) {
      updateSelectedElement({ href: makeRelativePath(activePagePath, projectPagePath) });
    }

    const helperNote = projectHandle
      ? "Click text, links, buttons, or pictures in the preview. This generic editor writes back to the actual HTML file when you save."
      : "Open a folder with HTML pages, CSS, and assets. This works best for local static sites.";

    return h(
      "div",
      { className: "editor-app" },
      h(
        "header",
        { className: "editor-topbar" },
        h(
          "div",
          { className: "brand-block" },
          h("p", null, "Universal project editor"),
          h("h1", null, projectName),
          h("span", null, helperNote)
        ),
        h(
          "div",
          { className: "topbar-actions" },
          h(Button, { type: "button", variant: "primary", onClick: openProjectFolder, disabled: busy }, "Open Project Folder"),
          h(Button, { type: "button", onClick: rescanProjectFolder, disabled: !projectHandle || busy }, "Rescan Folder"),
          h(Button, { type: "button", onClick: saveActivePage, disabled: !activePagePath || !dirtyPages[activePagePath] || busy }, "Save Page"),
          h(Button, { type: "button", onClick: saveAllPages, disabled: !projectHandle || !hasDirtyPages || busy }, "Save All"),
          h(Button, { type: "button", onClick: reloadActivePage, disabled: !activePagePath || busy }, "Reload Page")
        )
      ),
      htmlPages.length
        ? h(
            "nav",
            { className: "page-tabs", "aria-label": "Project pages" },
            htmlPages.map((path) =>
              h(
                "button",
                {
                  key: path,
                  type: "button",
                  className: path === activePagePath ? "is-active" : "",
                  onClick: () => selectPage(path)
                },
                dirtyPages[path] ? `* ${path}` : path
              )
            )
          )
        : null,
      h(
        "main",
        { className: "editor-workspace" },
        h(
          "section",
          { className: "preview-pane", "aria-label": "Live page preview" },
          h(
            "div",
            { className: "pane-heading" },
            h("div", null, h("p", null, "Left pane"), h("h2", null, activePagePath ? fileName(activePagePath) : "Preview")),
            h("span", null, previewBusy ? "Refreshing preview..." : "Static HTML/CSS preview")
          ),
          h("p", { className: "project-helper-note" }, "JavaScript-built widgets may not appear here, but the page structure, text, pictures, and links are editable."),
          previewHtml
            ? h("iframe", {
                className: "project-preview-frame",
                sandbox: "allow-scripts allow-same-origin",
                srcDoc: previewHtml,
                title: "Project preview"
              })
            : h(
                "div",
                { className: "empty-preview" },
                h("h3", null, "Open a project folder"),
                h("p", null, "Once you pick a local site folder, the HTML pages will appear here so you can click and edit them.")
              )
        ),
        h(
          "aside",
          { className: "inspector-pane", "aria-label": "Inspector editor panel" },
          h(
            "div",
            { className: "pane-heading" },
            h("div", null, h("p", null, "Right pane"), h("h2", null, "Inspector")),
            h("span", null, projectHandle ? `${editableItems.length} editable spots` : "No project yet")
          ),
          h("p", { className: "editor-status" }, status),
          projectHandle
            ? h(
                "div",
                { className: "inspector-content" },
                h(
                  Field,
                  {
                    label: "Selected element",
                    hint: "Click in the preview or pick from this list."
                  },
                  h(
                    Select,
                    {
                      value: selectedNodeId,
                      onChange: (event) => setSelectedNodeId(event.target.value)
                    },
                    h("option", { value: "" }, "Choose an element..."),
                    editableItems.map((item) => h("option", { key: item.id, value: item.id }, item.label))
                  )
                ),
                selectedElement
                  ? h(
                      React.Fragment,
                      null,
                      h(
                        "div",
                        { className: "json-panel" },
                        h("h3", null, "Element details"),
                        h("p", null, `${selectedElement.tag.toUpperCase()} element in ${fileName(activePagePath)}.`),
                        h(
                          "div",
                          { className: "project-badge-row" },
                          h("span", { className: "project-badge" }, selectedElement.kind),
                          h("span", { className: "project-badge" }, activePagePath)
                        )
                      ),
                      selectedElement.kind !== "image"
                        ? h(
                            Field,
                            { label: "Text", hint: "Edits the visible text inside the selected element." },
                            h(Textarea, {
                              value: selectedElement.text || "",
                              onChange: (event) => updateSelectedElement({ text: event.target.value })
                            })
                          )
                        : null,
                      selectedElement.kind === "link" || selectedElement.kind === "button"
                        ? h(
                            React.Fragment,
                            null,
                            h(
                              Field,
                              { label: "Link target", hint: "Change where this button or link goes." },
                              h(Input, {
                                value: selectedElement.href || "",
                                onChange: (event) => updateSelectedElement({ href: event.target.value }),
                                placeholder: "page.html or https://..."
                              })
                            ),
                            h(
                              Field,
                              { label: "Choose a project page", hint: "Pick another page in this project without typing the path yourself." },
                              h(
                                Select,
                                {
                                  value: currentLinkedPage,
                                  onChange: (event) => event.target.value && chooseProjectPage(event.target.value)
                                },
                                h("option", { value: "" }, "Use a project page..."),
                                htmlPages.map((path) => h("option", { key: path, value: path }, path))
                              )
                            )
                          )
                        : null,
                      selectedElement.kind === "image"
                        ? h(
                            React.Fragment,
                            null,
                            selectedImagePreview
                              ? h("img", {
                                  className: "image-input-preview",
                                  src: selectedImagePreview,
                                  alt: selectedElement.alt || ""
                                })
                              : null,
                            h(
                              Field,
                              { label: "Image path", hint: "Paste a project-relative path or a full web URL." },
                              h(Input, {
                                value: selectedElement.src || "",
                                onChange: (event) => updateSelectedElement({ src: event.target.value }),
                                placeholder: "assets/pony.jpg"
                              })
                            ),
                            h(
                              Field,
                              { label: "Alt text", hint: "Describe the picture in plain language." },
                              h(Input, {
                                value: selectedElement.alt || "",
                                onChange: (event) => updateSelectedElement({ alt: event.target.value }),
                                placeholder: "Bay pony jumping in the ring"
                              })
                            ),
                            h(
                              Field,
                              { label: "Choose a project image", hint: "Switch to another image that already exists in this folder." },
                              h(
                                Select,
                                {
                                  value: "",
                                  onChange: (event) => event.target.value && chooseProjectImage(event.target.value)
                                },
                                h("option", { value: "" }, "Use a project image..."),
                                imageFiles.map((path) => h("option", { key: path, value: path }, path))
                              )
                            ),
                            selectedImageProjectPath
                              ? h(
                                  Field,
                                  {
                                    label: "Replace this image file",
                                    hint: "Keep the same file path, but swap in a new picture from your computer."
                                  },
                                  h("input", {
                                    className: "field-control file-control",
                                    type: "file",
                                    accept: "image/*",
                                    onChange: replaceSelectedImageFile
                                  })
                                )
                              : null,
                            h(
                              Field,
                              { label: "Upload a new project image", hint: "This writes a new image file into the project's assets folder." },
                              h("input", {
                                className: "field-control file-control",
                                type: "file",
                                accept: "image/*",
                                onChange: uploadProjectImage
                              })
                            )
                          )
                        : null
                    )
                  : h(
                      "div",
                      { className: "empty-inspector" },
                      h("h3", null, "Pick something to edit"),
                      h("p", null, "Click text, a picture, or a link in the preview and its fields will appear here.")
                    )
              )
            : h(
                "div",
                { className: "empty-inspector" },
                h("h3", null, "No project loaded"),
                h("p", null, "Open a local folder first. The editor will scan for HTML pages and images, then let you edit them and save the changes back to disk.")
              ),
          h(
            "section",
            { className: "json-panel" },
            h("h3", null, "What this editor is for"),
            h("p", null, "Use Project Editor for reusable click-and-edit work across local HTML projects. Use Section Builder when you want the original JSON-driven At The In Gate layout tool.")
          )
        )
      )
    );
  }

  window.AtigEditor.ProjectEditorApp = ProjectEditorApp;
})();
