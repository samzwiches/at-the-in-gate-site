const showGrid = document.getElementById("showFeedGrid");
const zoneFilter = document.getElementById("zoneShowFilter");
const showCount = document.getElementById("showFeedCount");
let activeShows = [];

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[character]);
}

function formatShowDate(show) {
  const start = new Date(`${show.startDate}T12:00:00Z`);
  const end = new Date(`${show.endDate}T12:00:00Z`);
  const startText = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  });
  const endText = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });

  return show.startDate === show.endDate ? endText : `${startText} - ${endText}`;
}

function ensureShowModal() {
  let modal = document.getElementById("showDetailModal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "show-detail-modal";
  modal.id = "showDetailModal";
  modal.innerHTML = `
    <button class="show-modal-backdrop" type="button" data-close-show aria-label="Close show details"></button>
    <article class="show-modal-card" role="dialog" aria-modal="true" aria-labelledby="showModalTitle">
      <p class="kicker" id="showModalZone"></p>
      <h2 id="showModalTitle"></h2>
      <dl>
        <dt>Dates</dt><dd id="showModalDates"></dd>
        <dt>Location</dt><dd id="showModalLocation"></dd>
        <dt>Program</dt><dd id="showModalProgram"></dd>
        <dt>Who's going</dt><dd>Member RSVP board planned. For now, ask in Show Reports.</dd>
        <dt>Notes</dt><dd id="showModalNotes"></dd>
      </dl>
      <div class="modal-actions">
        <a id="showModalSource" href="show-ring-central.html#calendar" target="_blank" rel="noreferrer">Open Source</a>
        <a href="pony-people.html#show-reports">Ask Who's Going</a>
        <a href="login.html">Save Date</a>
        <button type="button" data-close-show>Close</button>
      </div>
    </article>
  `;
  document.body.appendChild(modal);

  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-show]")) {
      modal.classList.remove("is-open");
    }
  });

  return modal;
}

function openShowDetail(showId) {
  const show = activeShows.find((item) => item.id === showId);
  if (!show) return;

  const modal = ensureShowModal();
  document.getElementById("showModalZone").textContent = `Zone ${show.zone}`;
  document.getElementById("showModalTitle").textContent = show.title;
  document.getElementById("showModalDates").textContent = formatShowDate(show);
  document.getElementById("showModalLocation").textContent = `${show.city}, ${show.state}`;
  document.getElementById("showModalProgram").textContent = show.program;
  document.getElementById("showModalNotes").textContent = show.description;
  document.getElementById("showModalSource").href = show.sourceUrl;
  modal.classList.add("is-open");
}

function renderShowFeed() {
  if (!showGrid) return;

  const shows = window.atTheInGateShows || [];
  const selectedZone = zoneFilter?.value || "all";
  const filtered = shows.filter((show) => selectedZone === "all" || String(show.zone) === selectedZone);
  activeShows = filtered;

  if (showCount) {
    showCount.textContent = `${filtered.length} show${filtered.length === 1 ? "" : "s"}`;
  }

  showGrid.innerHTML = filtered.map((show) => `
    <article class="notice-card">
      <span>Zone ${escapeHtml(show.zone)}</span>
      <h3>${escapeHtml(show.title)}</h3>
      <p><strong>${escapeHtml(formatShowDate(show))}</strong><br>${escapeHtml(show.city)}, ${escapeHtml(show.state)}</p>
      <p>${escapeHtml(show.program)}</p>
      <button class="show-open-button" type="button" data-show-id="${escapeHtml(show.id)}">Open Show Details</button>
    </article>
  `).join("");
}

zoneFilter?.addEventListener("change", renderShowFeed);
showGrid?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-show-id]");
  if (!button) return;
  openShowDetail(button.dataset.showId);
});
renderShowFeed();
