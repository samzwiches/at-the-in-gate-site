# at-the-in-gate-site

ponies for ponies sake!

## Upload everything from local preview server

Use the helper script below to mirror the full site from a locally running server (default: `http://127.0.0.1:4173`) into the repository under `uploaded-site/`.

```bash
./scripts/upload_local_site.sh
```

You can also override the source URL and destination directory:

```bash
./scripts/upload_local_site.sh http://127.0.0.1:4173 uploaded-site
```

To support single-page app routes opened directly in the browser (for example
`/react-editor` in the address bar), pass a comma-separated route list as an
optional third argument:

```bash
./scripts/upload_local_site.sh http://127.0.0.1:4173 uploaded-site react-editor,admin
```

The script uses `wget --mirror` with page requisites and link conversion so the downloaded site can be hosted or committed as static files.
