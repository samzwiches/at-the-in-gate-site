const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "data", "shows.json");
const feedPath = path.join(root, "feed.xml");
const browserDataPath = path.join(root, "shows-data.js");

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRssDate(dateValue) {
  return new Date(`${dateValue}T12:00:00Z`).toUTCString();
}

function formatDisplayDate(show) {
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

function buildDescription(show) {
  return `${show.description} Dates: ${formatDisplayDate(show)}. Location: ${show.city}, ${show.state}. Source: ${show.sourceUrl}`;
}

function buildFeed(data) {
  const shows = [...data.shows].sort((a, b) => {
    const dateSort = new Date(a.startDate) - new Date(b.startDate);
    return dateSort || a.zone - b.zone || a.title.localeCompare(b.title);
  });

  const items = shows.map((show) => `    <item>
      <title>${escapeXml(`Zone ${show.zone}: ${show.title}`)}</title>
      <link>${escapeXml(show.link)}</link>
      <description>${escapeXml(buildDescription(show))}</description>
      <pubDate>${formatRssDate(show.startDate)}</pubDate>
      <category>${escapeXml(show.category)}</category>
      <guid isPermaLink="false">${escapeXml(show.id)}</guid>
      <attheingate:zone>${escapeXml(show.zone)}</attheingate:zone>
      <attheingate:startDate>${escapeXml(show.startDate)}</attheingate:startDate>
      <attheingate:endDate>${escapeXml(show.endDate)}</attheingate:endDate>
      <attheingate:location>${escapeXml(`${show.city}, ${show.state}`)}</attheingate:location>
      <attheingate:program>${escapeXml(show.program)}</attheingate:program>
      <attheingate:status>${escapeXml(show.status)}</attheingate:status>
      <attheingate:source>${escapeXml(show.sourceUrl)}</attheingate:source>
    </item>`).join("\n\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:attheingate="https://attheingate.com/rss/namespace">
  <channel>
    <title>${escapeXml(data.site.title)}</title>
    <link>${escapeXml(data.site.link)}</link>
    <description>${escapeXml(data.site.description)}</description>
    <language>${escapeXml(data.site.language)}</language>
    <lastBuildDate>${new Date(data.site.lastBuildDate).toUTCString()}</lastBuildDate>

${items}
  </channel>
</rss>
`;
}

function buildBrowserData(data) {
  const shows = [...data.shows].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  return `window.atTheInGateShows = ${JSON.stringify(shows, null, 2)};\n`;
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
fs.writeFileSync(feedPath, buildFeed(data));
fs.writeFileSync(browserDataPath, buildBrowserData(data));

console.log(`Built ${path.relative(root, feedPath)} and ${path.relative(root, browserDataPath)} from data/shows.json`);
