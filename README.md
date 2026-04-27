# At The In Gate Prototype

A standalone static prototype for a pony-only hunter/jumper front porch: part classifieds board, part show desk, part old-school pony magazine, part group-text replacement.

## Included Structure

- Home/front porch with the simplified nav: Ponies, Shows, Catch + Ship, The Rail, Kids, and Login
- Homepage flow: hero, quick paths, featured listings, Show Ring Central, Catch Rides & Shipping, The Ring Rail, Pony People, Kids Corner, and a final action section
- Membership/paywall concept: free preview, 7-day Barn Pass, and In Gate Plus upgrade
- Ponies hub: Ponies for Sale, Ponies for Lease, Just Ponies Board, pony profile, wanted help, and sold pony archive path
- Pony profile pages built to answer "is this my ride?" quickly: large photo, price, location, quick tags, fast facts, video slots, useful truth, rider match, and seller actions
- Show Ring Central: calendar, zone schedules, meetups, USEF quick links, rankings explained, Pony Finals watch, RSS feed, and clickable show detail modal
- Catch Rides & Shipping: Rider Available, Need a Rider, Shipping Routes, Need Shipping, Services, and a filterable helper board
- Reviews and Reputation with verified, structured, moderated interaction reviews
- The Ring Rail content hub: memoirs, pony legends, Heard at the In Gate, up-and-comers, trainer spotlights, parent corner, and show notes
- Pony People: Ask the Rail, Who Knows This Pony, Parent Rail, Junior Riders, Trainer Talk, Show Reports, and Tack Room Swap
- Kids Corner: junior rider spotlights, first show stories, pony art, brave moments, pony trivia, My Pony Taught Me, and Ribbon Board
- Kids safety model: free with an adult paid account, linked to a grown-up, moderated before posts go live, no direct private messaging
- Sold Pony tracker
- About
- Dedicated pages for Start Here, Show Ring Central, Catch Rides & Shipping, The Ring Rail, List a Pony, List a Service, Login, Dashboard, Membership, Rules, Privacy, and Contact
- Owner's Desk at `admin.html` with Review Rail, Listing Barn, Show Feed, Members, Reputation Desk, and House Rules previews
- Local React visual editor at `react-editor/index.html` with live preview, inspector editing, section add/move/delete, localStorage save/load, and JSON export
- RSS show feed at `feed.xml`, generated from the simple source file `data/shows.json`
- Build roadmap: useful MVP, sticky features, power tools

## Updating Show Feed

Edit `data/shows.json`, then run:

```bash
node scripts/build-feed.js
```

That rebuilds:

- `feed.xml` - the RSS feed where each show is its own `<item>`
- `shows-data.js` - the browser-friendly data used by the local Shows page and homepage RSS preview

Each show entry has simple fields: `title`, `zone`, `startDate`, `endDate`, `city`, `state`, `program`, `description`, `link`, and `sourceUrl`.

## Open Locally

Open `index.html` in a browser, or serve this folder with any static server.

## Files

- `index.html` - homepage/front porch
- `site-shell.js` - shared final navigation and footer
- `ponies.html`, `pony-profile.html` - the pony listing hub and sale profile pattern
- legacy old-path pages are kept as pony-only landing pages so former links do not break
- `show-ring-central.html`, `shows.js`, `shows-data.js`, `feed.xml` - show calendar, filter, modal detail behavior, and feed output
- `catch-rides-shipping.html`, `utility-board.js` - catch ride, shipping, services, and filterable helper board
- `the-ring-rail.html`, `pony-people.html`, `kids.html` - editorial, rail talk, and Kids Corner
- `browse.html`, `shows.html`, `connect.html`, `ring-rail.html`, `community.html`, `forum.html` - friendly old-path landing pages that route to the new structure
- `login.html`, `dashboard.html`, `admin.html` - account and owner/admin previews
- `react-editor/` - no-build React visual editor scaffold for JSON page content
- `styles.css` - visual system and responsive layout
- `pages.js` - owner desk preview interactions and prototype form handling
- `data/shows.json` - simple show source data
- `scripts/build-feed.js` - RSS/data generator
- `assets/` - local pony photography and supporting show imagery

## Image Credits

Prototype support photos are from Unsplash, plus local Jazz pony photos supplied for the homepage:

- Veronica Dudarev, stable image
- Patti Black, stable doorway image
- Barnabas Davoti, roan pasture image
- Pavan Naik, grazing field image
- Rachel, grey pasture image
