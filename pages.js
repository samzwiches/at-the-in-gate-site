const railRooms = {
  "pony-people": {
    label: "Pony People",
    summary: "All ponies, all the time. Sale memories, lease questions, pony kid logistics, and the tiny legends people still remember.",
    stats: "42 threads this week",
    tone: "Warm, specific, pony-first.",
    threads: [
      ["Does anybody know Clover Hill Dandelion?", "Looking for old photos, Pony Finals years, and whether she still makes that face at flower boxes.", "12 replies", "History help"],
      ["Small pony lease sanity check", "First pony family, trainer approved, parent nerves fully present.", "18 replies", "Buying & leasing"],
      ["Best tiny boots that survive pony camp?", "Not precious. Need useful.", "7 replies", "Gear"]
    ]
  },
  "hunter-jumper-talk": {
    label: "Hunter Jumper Talk",
    summary: "The broader rail: divisions, courses, results, prize lists, ring questions, and the sport we apparently cannot quit.",
    stats: "31 threads this week",
    tone: "Useful first, gossip second.",
    threads: [
      ["Which spring series is worth the haul?", "Trying to balance points, miles, school, and not making the family broke by June.", "22 replies", "Shows"],
      ["Help me understand this handy score", "Round looked smooth, score did not. Be kind but honest.", "15 replies", "Learning"],
      ["Prize list watch thread", "Drop upcoming dates, stabling deadlines, and the forms people forget.", "10 replies", "Planning"]
    ]
  },
  "trainer-talk": {
    label: "Trainer Talk",
    summary: "A professional room for barn owners, trainers, assistants, lesson programs, and the grown-up decisions behind the rail.",
    stats: "19 threads this week",
    tone: "Professional, factual, moderated.",
    threads: [
      ["Lease trial terms that prevent drama", "What should be in writing before anyone ships a pony out?", "14 replies", "Business"],
      ["Assistant trainer burnout check", "What systems actually help during show season?", "9 replies", "Barn life"],
      ["How much video is enough for a green pony ad?", "Flat, course, lead change, hack, and child handling notes.", "16 replies", "Listings"]
    ]
  },
  "parents-at-the-rail": {
    label: "Parents at the Rail",
    summary: "For the adults holding snacks, bills, schedules, nerves, and sometimes a lead rope they did not ask for.",
    stats: "28 threads this week",
    tone: "Plain English. No shame.",
    threads: [
      ["First rated show checklist", "What do we pack besides the pony, child, and emotional support coffee?", "24 replies", "New families"],
      ["How to ask about budget without sounding clueless", "I need the real total, not just the polite number.", "17 replies", "Money"],
      ["When your kid outgrows the pony emotionally", "The sale conversation nobody warns you about.", "13 replies", "Support"]
    ]
  },
  "junior-riders": {
    label: "Junior Riders",
    summary: "A safer kid-friendly corner for questions, goals, pony art, first-show stories, and brave little wins.",
    stats: "16 threads this week",
    tone: "Kind, moderated, no dragging kids.",
    threads: [
      ["Tell us one thing your pony taught you", "Mine taught me to keep my leg on even when I panic.", "19 replies", "Milestones"],
      ["Favorite show bows right now?", "Pictures welcome. Glitter allowed.", "11 replies", "Fun"],
      ["How do you stop getting nervous at the in gate?", "I know my course until the buzzer exists.", "21 replies", "Advice"]
    ]
  },
  "catch-ride-help": {
    label: "Catch Ride Help",
    summary: "Find a capable kid, offer a pony a good round, post last-minute needs, and keep the details easy to compare.",
    stats: "23 threads this week",
    tone: "Fast, clear, safety-aware.",
    threads: [
      ["Large pony needs catch rider Saturday", "Lexington. Quiet ride needed. Current video included.", "8 replies", "Need rider"],
      ["Junior available for mediums in Zone 2", "Handy, tidy, trainer references, no medal conflicts.", "6 replies", "Rider available"],
      ["Catch ride checklist for parents", "Payment, trainer permission, release forms, video, expectations.", "12 replies", "How it works"]
    ]
  },
  "show-reports": {
    label: "Show Reports",
    summary: "What happened, what ran late, what was lovely, where to park, and what people should know before they haul in.",
    stats: "21 threads this week",
    tone: "Specific, helpful, not mean.",
    threads: [
      ["Bluegrass Spring Classic notes", "Ring footing was great, coffee line was not, pony ring moved quickly.", "17 replies", "Kentucky"],
      ["Devon prep questions", "Jog timing, pony schooling windows, and where people actually meet up.", "20 replies", "Pennsylvania"],
      ["Zone points Monday thread", "Drop questions before everyone spirals.", "9 replies", "Points"]
    ]
  },
  "tack-room-swap": {
    label: "Tack Room Swap",
    summary: "The trunk-cleanout corner: tiny boots, show pads, pony bridles, bows, girths, trunks, and things people outgrow overnight.",
    stats: "34 threads this week",
    tone: "Practical, transparent, photos required.",
    threads: [
      ["Medium pony bundle in Virginia", "Girths, pads, boots, and a trunk that has seen some things.", "5 replies", "For sale"],
      ["ISO small pony bridle", "Not fancy. Safe, clean, child-proof.", "8 replies", "Wanted"],
      ["Show bows swap thread", "Post colors, condition, and price shipped.", "12 replies", "Swap"]
    ]
  },
  "greenie-questions": {
    label: "Greenie Questions",
    summary: "For green ponies, green kids, green parents, and the questions people are sometimes afraid to ask out loud.",
    stats: "14 threads this week",
    tone: "Helpful, realistic, no ego.",
    threads: [
      ["How green is too green for short stirrup?", "Everyone says quiet, but I need a translation.", "18 replies", "Suitability"],
      ["First lead change expectations", "What is normal, what is a problem, and what needs time?", "11 replies", "Training"],
      ["When to go local instead of rated", "Miles before pressure, maybe?", "15 replies", "Planning"]
    ]
  },
  "nostalgia-corner": {
    label: "Nostalgia Corner",
    summary: "Old pony photos, legendary names, paper ads, show programs, and the stories that keep getting retold at the rail.",
    stats: "25 threads this week",
    tone: "Sentimental, accurate, generous.",
    threads: [
      ["Scan your favorite old pony ad", "Bonus points for dramatic 1990s copy.", "16 replies", "Archives"],
      ["Ponies who made five different kids", "The schoolmasters deserve their own little hall of fame.", "22 replies", "Legends"],
      ["Old Pony Finals program thread", "Who has programs from before everything lived online?", "10 replies", "History"]
    ]
  }
};

const adminQueues = {
  moderation: [
    ["Review flagged trainer thread", "Trainer Talk", "Needs tone check", "High"],
    ["Approve junior rider art post", "Junior Riders", "Parent permission included", "Low"],
    ["Verify shipper review", "Reputation Desk", "Transaction date attached", "Medium"]
  ],
  listings: [
    ["Blue Ribbon Mischief", "Pony lease", "Video and USEF name present", "Ready"],
    ["Wanted small saint", "Wanted ad", "Budget and trainer contact present", "Ready"],
    ["Medium tack trunk bundle", "Equipment", "Needs photo check", "Hold"]
  ],
  shows: [
    ["Bluegrass Spring Classic", "Show feed import", "May 3 / Lexington, KY", "Review"],
    ["Devon prep meet-up", "Manual event", "Apr 26 / Devon, PA", "Live"],
    ["Pony Finals watch night", "Member event", "May 18 / Online", "Draft"]
  ],
  members: [
    ["Sam at the rail", "Owner/admin", "Full access", "Active"],
    ["Fox Lane Ponies", "Seller", "Trial day 4", "Active"],
    ["Parent account", "Buyer", "Trial day 6", "Upgrade soon"]
  ]
};

function getRoomSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("room") || "pony-people";
}

function roomUrl(slug) {
  return `forum.html?room=${encodeURIComponent(slug)}`;
}

function renderPonyPeopleDirectory() {
  const roomGrid = document.getElementById("roomGrid");
  if (!roomGrid) return;

  roomGrid.innerHTML = Object.entries(railRooms).map(([slug, room]) => `
    <a class="room-card" href="${roomUrl(slug)}">
      <span>${room.stats}</span>
      <h3>${room.label}</h3>
      <p>${room.summary}</p>
      <strong>Open room</strong>
    </a>
  `).join("");
}

function renderRailRoomPage() {
  const roomTitle = document.getElementById("roomTitle");
  const threadList = document.getElementById("threadList");
  if (!roomTitle || !threadList) return;

  const slug = getRoomSlug();
  const room = railRooms[slug] || railRooms["pony-people"];

  document.title = `${room.label} | At The In Gate`;
  roomTitle.textContent = room.label;
  document.getElementById("roomSummary").textContent = room.summary;
  document.getElementById("roomStats").textContent = room.stats;
  document.getElementById("roomTone").textContent = room.tone;
  document.getElementById("roomCrumb").textContent = room.label;
  document.getElementById("threadType").value = room.label;

  const roomNav = document.getElementById("roomNav");
  roomNav.innerHTML = Object.entries(railRooms).map(([navSlug, navRoom]) => `
    <a href="${roomUrl(navSlug)}">${navRoom.label}</a>
  `).join("");

  threadList.innerHTML = room.threads.map(([title, body, replies, tag]) => `
    <article class="thread-card">
      <div>
        <span>${tag}</span>
        <h3>${title}</h3>
        <p>${body}</p>
        <div class="thread-meta">
          <strong>Last active today</strong>
          <span>Member room</span>
          <span>Moderated</span>
        </div>
      </div>
      <div class="thread-count">
        <div>${replies}<small>in thread</small></div>
      </div>
    </article>
  `).join("");
}

function wirePrototypeForms() {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const panelName = button.dataset.authTab;

      document.querySelectorAll("[data-auth-tab]").forEach((tab) => {
        tab.classList.toggle("is-active", tab.dataset.authTab === panelName);
      });

      document.querySelectorAll("[data-auth-panel]").forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.authPanel === panelName);
      });
    });
  });

  document.querySelectorAll("[data-prototype-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const target = document.querySelector(form.dataset.prototypeForm);
      if (target) {
        target.textContent = form.dataset.success || "Saved in prototype mode.";
      }
    });
  });
}

function renderAdminRows(sectionName) {
  const target = document.getElementById(`${sectionName}Rows`);
  if (!target) return;

  target.innerHTML = adminQueues[sectionName].map(([title, type, note, status]) => `
    <div class="admin-row">
      <div>
        <strong>${title}</strong>
        <span>${note}</span>
      </div>
      <div>
        <strong>${type}</strong>
        <span>Source</span>
      </div>
      <div>
        <strong>${status}</strong>
        <span>Status</span>
      </div>
      <div class="admin-actions">
        <button class="mini-button primary" type="button" data-admin-action="approved">Approve</button>
        <button class="mini-button" type="button" data-admin-action="edited">Edit</button>
        <button class="mini-button danger" type="button" data-admin-action="held">Hold</button>
      </div>
    </div>
  `).join("");
}

function wireAdmin() {
  const adminStatus = document.getElementById("adminStatus");
  if (!adminStatus) return;

  Object.keys(adminQueues).forEach(renderAdminRows);

  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-admin-tab]").forEach((tab) => {
        tab.classList.toggle("is-active", tab === button);
      });
      document.querySelectorAll("[data-admin-section]").forEach((section) => {
        section.classList.toggle("is-active", section.dataset.adminSection === button.dataset.adminTab);
      });
    });
  });

  document.querySelector(".admin-page").addEventListener("click", (event) => {
    const button = event.target.closest("[data-admin-action]");
    if (!button) return;
    const item = button.closest(".admin-row") || button.closest(".admin-card");
    const title = item.querySelector("strong, h3").textContent;
    adminStatus.textContent = `${title} marked ${button.dataset.adminAction} in prototype mode.`;
  });
}

renderPonyPeopleDirectory();
renderRailRoomPage();
wirePrototypeForms();
wireAdmin();
