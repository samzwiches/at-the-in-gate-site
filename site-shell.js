const mainNav = [
  ["Ponies", "ponies.html"],
  ["Shows", "show-ring-central.html"],
  ["Catch + Ship", "catch-rides-shipping.html"],
  ["The Rail", "pony-people.html"],
  ["Kids", "kids.html"],
  ["Login", "login.html"]
];

const footerLinks = [
  ["About", "about.html"],
  ["Contact", "contact.html"],
  ["List a Pony", "list-pony.html"],
  ["List a Service", "list-service.html"],
  ["Show Ring Central", "show-ring-central.html"],
  ["Pony People", "pony-people.html"],
  ["Kids Corner", "kids.html"],
  ["Rules & Moderation", "rules.html"],
  ["Privacy", "privacy.html"],
  ["Membership", "membership.html"],
  ["Owner's Desk", "admin.html"]
];

function currentFileName() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function renderHeader() {
  const target = document.getElementById("siteHeader");
  if (!target) return;

  const current = currentFileName();
  const isLocal = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
  const links = mainNav.map(([label, href]) => {
    const active = href === current ? " is-active" : "";
    return `<a class="${active}" href="${href}">${label}</a>`;
  }).join("");

  target.innerHTML = `
    <header class="site-header horse-header">
      <a class="brand" href="index.html" aria-label="At The In Gate home">
        <img class="brand-logo" src="assets/atig-logo-dark.png" alt="">
        <span>
          <strong>At The In Gate</strong>
          <small>Where pony people connect.</small>
        </span>
      </a>
      <nav class="main-nav" aria-label="Primary navigation">${links}</nav>
      ${isLocal ? `<a class="local-edit-button" href="/react-editor/?mode=site">Edit Site</a>` : ""}
    </header>
  `;
}

function renderFooter() {
  const target = document.getElementById("siteFooter");
  if (!target) return;

  const links = footerLinks.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");

  target.innerHTML = `
    <footer class="site-footer horse-footer">
      <div>
        <strong>At The In Gate</strong>
        <p>Where pony people connect: sale ponies, lease ponies, show life, catch rides, shipping, stories, and the useful truth.</p>
      </div>
      <nav aria-label="Footer navigation">${links}</nav>
    </footer>
  `;
}

renderHeader();
renderFooter();
