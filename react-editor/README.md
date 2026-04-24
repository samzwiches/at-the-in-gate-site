# At The In Gate React Visual Editor

This folder now has two local editors:

- `Project Editor`: a generic click-and-edit tool for static HTML projects
- `Section Builder`: the original JSON-driven At The In Gate content editor

## Best way to open it

Use the local server so folder access behaves better:

```bash
cd equine-marketplace/react-editor
node server.js
```

Then open:

```text
http://127.0.0.1:4173/react-editor/
```

That server now serves the whole `equine-marketplace` folder, with the public site at `/` and the editor at `/react-editor/`, so the editor and public pages share the same local origin. That matters because the JSON editor uses `localStorage`, and the public pages need to read the same saved content.

## What Project Editor can do

- open a local project folder
- scan HTML pages and project images
- let you click text, links, buttons, and images in a live preview
- edit text, links, image paths, and alt text
- switch an image to another project image
- replace the current image file with a new upload
- upload a brand new image into the project's `assets` folder
- save the changed HTML back to disk

It works best on static HTML/CSS sites. JavaScript-built widgets may not render in the preview, but the actual page markup is still editable when present in the HTML.

## Why Section Builder is still here

The older Section Builder is still useful when you want to shape At The In Gate content as structured JSON and sync that content into the existing pages.

Use `Save` for a browser draft. Use `Publish File` when the content needs to become `editor-site.json`, which is what the public pages can read after deployment.

For the detailed homepage fields in the Owner's Desk, `Save site edits` writes `site-content.json` when the local server is running.
