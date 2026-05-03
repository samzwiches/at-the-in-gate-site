(function () {
  const assetLibrary = [
    { label: "Hero jumping pony", path: "../assets/atig-bay-pony-jump.jpg" },
    { label: "Catch ride cutout", path: "../assets/atig-catchride-cutout.png" },
    { label: "Dark pony portrait", path: "../assets/atig-dark-pony-portrait.png" },
    { label: "Pony lineup", path: "../assets/atig-pony-show-lineup.jpg" },
    { label: "Barn aisle", path: "../assets/atig-show-barn-aisle.jpg" },
    { label: "Deep Run showgrounds", path: "../assets/atig-showgrounds-deeprun.jpeg" },
    { label: "PBIEC entrance", path: "../assets/atig-showgrounds-pbiec.jpg" },
    { label: "Pony Finals ring", path: "../assets/atig-pony-finals-ring.jpg" },
    { label: "Pony Finals field", path: "../assets/atig-pony-finals-dukes.jpg" },
    { label: "Pony Finals lineup", path: "../assets/atig-pony-finals-lineup.png" },
    { label: "First show memory", path: "../assets/bm-first-show.jpg" },
    { label: "Rail group", path: "../assets/bm-rail-group.png" },
    { label: "White pony jump", path: "../assets/bm-white-pony-jump.jpg" },
    { label: "Beach pony", path: "../assets/pony-beach-vintage.jpg" },
    { label: "Large bay ride", path: "../assets/pony-big-bay-ride.jpeg" },
    { label: "Green hunter jump", path: "../assets/pony-green-hunter-jump.jpg" },
    { label: "Shipping trailer", path: "../assets/pony-handler-trailer.jpg" },
    { label: "Hoty jump", path: "../assets/pony-hoty-jump.jpg" },
    { label: "Pony hug field", path: "../assets/pony-hug-field.jpg" },
    { label: "Jazz conformation", path: "../assets/pony-jazz-conformation.jpg" },
    { label: "Jazz jump close", path: "../assets/pony-jazz-jump-close.jpg" },
    { label: "Jazz flat", path: "../assets/pony-jazz-ring-flat.jpg" },
    { label: "Brick jump", path: "../assets/pony-possum-brick-jump.png" },
    { label: "Rail small", path: "../assets/pony-rail-small.jpg" },
    { label: "Show number", path: "../assets/pony-show-number.jpg" },
    { label: "Smiling equitation", path: "../assets/pony-smiling-equitation.jpg" },
    { label: "Stall girl", path: "../assets/pony-stall-girl.jpg" },
    { label: "Tiny rider", path: "../assets/pony-tiny-rider-bw-2.jpg" },
    { label: "Trainer walk-in", path: "../assets/pony-trainer-walk-in.png" },
    { label: "Vintage two ponies", path: "../assets/pony-two-ponies-child-vintage.jpg" },
    { label: "Upperville in hand", path: "../assets/pony-upperville-inhand.jpg" },
    { label: "Vintage rail jump", path: "../assets/pony-vintage-rail-jump.jpg" },
    { label: "Vintage white pony", path: "../assets/pony-vintage-white.jpg" },
    { label: "Vintage yellow jump", path: "../assets/pony-vintage-yellow-jump.jpg" },
    { label: "Wide pony hug", path: "../assets/pony-wide-hug.jpg" },
    { label: "Warm-up pony", path: "../assets/ponywarmup.jpg" },
    { label: "Qualens jump", path: "../assets/qualens-mystical-med-green-champ_large.jpg" },
    { label: "Ready for trailer", path: "../assets/readytogetontrailer.jpg" },
    { label: "Ready to school", path: "../assets/readytoschoolpony.jpg" },
    { label: "Ready to ship", path: "../assets/readytoship.jpg" },
    { label: "Bay hunter round", path: "../assets/sam-bay-hunter-round.jpg" },
    { label: "Bay pony in hand", path: "../assets/sam-bay-pony-inhand.JPG" },
    { label: "Deep Run ring", path: "../assets/sam-deep-run-show-ring.jpeg" },
    { label: "Jazz over fences", path: "../assets/sam-jazz-pony-finals-over-fences.jpg" },
    { label: "Kid grazing pony", path: "../assets/sam-kid-grazing-pony.jpg" },
    { label: "Parent and child walk", path: "../assets/sam-parent-child-pony-walk.jpeg" },
    { label: "Barre Dukes", path: "../assets/sam-pony-finals-barre-dukes.jpg" },
    { label: "Pony Finals trophy", path: "../assets/sam-pony-finals-trophy.JPG" },
    { label: "Scoreboard", path: "../assets/sam-scoreboard-thumb.jpeg" },
    { label: "Virginia showgrounds", path: "../assets/sam-showgrounds-virginia-wide.jpeg" },
    { label: "Smiling kid ride", path: "../assets/sam-smiling-kid-pony-ride.jpg" },
    { label: "Tryon winner board", path: "../assets/sam-tryon-fall-pony.jpg" },
    { label: "Walking pony people", path: "../assets/walkingponyandpeople.jpg" }
  ];

  const initialSite = {
    siteName: "At The In Gate",
    pages: [
      {
        id: "home",
        name: "Home",
        slug: "/",
        href: "../index.html",
        sections: [
          {
            id: "hero",
            type: "hero",
            heading: "All ponies. Start here.",
            subheading: "Sale ponies, lease ponies, show dates, catch rides, shipping leads, rail talk, and pony stories in one place.",
            buttonText: "Browse Ponies",
            buttonLink: "../ponies.html",
            imageUrl: "../assets/atig-bay-pony-jump.jpg"
          },
          {
            id: "text-1",
            type: "text",
            title: "Where pony people connect",
            body: "This editor stores the page as JSON. Click a section in the live preview, then change the copy, images, buttons, and links on the right."
          },
          {
            id: "cards-1",
            type: "cards",
            title: "Start with the aisle you need",
            items: [
              {
                id: "c1",
                title: "Ponies for Sale",
                text: "Small, medium, large, green, made, fancy, saintly, and worth asking about.",
                imageUrl: "../assets/pony-vintage-white-wide.jpg",
                buttonLabel: "Browse sale ponies",
                link: "../ponies.html#sale"
              },
              {
                id: "c2",
                title: "Ponies for Lease",
                text: "Annual, seasonal, local, show lease, and trainer-approved situations.",
                imageUrl: "../assets/atig-bay-pony-jump.jpg",
                buttonLabel: "Browse lease ponies",
                link: "../ponies.html#lease"
              },
              {
                id: "c3",
                title: "Show Ring Central",
                text: "Shows, zone schedules, Pony Finals watch, and USEF links.",
                imageUrl: "../assets/atig-showgrounds-deeprun.jpeg",
                buttonLabel: "Plan shows",
                link: "../show-ring-central.html"
              }
            ]
          }
        ]
      },
      {
        id: "ponies",
        name: "Ponies",
        slug: "/ponies",
        href: "../ponies.html",
        sections: [
          {
            id: "ponies-hero",
            type: "hero",
            heading: "Ponies for sale, lease, and remembering.",
            subheading: "Start with sale, lease, the Just Ponies Board, or the archive of names people still ask about.",
            buttonText: "Browse Ponies",
            buttonLink: "../ponies.html#sale",
            imageUrl: "../assets/pony-vintage-white-wide.jpg"
          },
          {
            id: "ponies-text",
            type: "text",
            title: "Listings with enough truth to save everyone a phone call.",
            body: "Every pony page should answer size, division, rider fit, video, location, price or terms, and the useful truth."
          },
          {
            id: "ponies-cards",
            type: "cards",
            title: "Choose the pony aisle",
            items: [
              { id: "ponies-sale", title: "Ponies for Sale", text: "Made, green, fancy, saintly, and worth asking about.", imageUrl: "../assets/pony-vintage-white-wide.jpg", buttonLabel: "Sale ponies", link: "../ponies.html#sale" },
              { id: "ponies-lease", title: "Ponies for Lease", text: "Annual, seasonal, local, and show lease situations.", imageUrl: "../assets/atig-bay-pony-jump.jpg", buttonLabel: "Lease ponies", link: "../ponies.html#lease" },
              { id: "ponies-archive", title: "Sold Pony Archive", text: "Old names, update trails, photos, and where they landed.", imageUrl: "../assets/pony-vintage-with-mom.jpg", buttonLabel: "Open archive", link: "../ponies.html#sold-pony-archive" }
            ]
          }
        ]
      },
      {
        id: "shows",
        name: "Show Ring Central",
        slug: "/shows",
        href: "../show-ring-central.html",
        sections: [
          {
            id: "shows-hero",
            type: "hero",
            heading: "Show dates, zones, points, and Pony Finals panic.",
            subheading: "The links people ask for every Monday morning, organized so nobody has to dig through six tabs.",
            buttonText: "Open Calendar",
            buttonLink: "../show-ring-central.html#calendar",
            imageUrl: "../assets/atig-showgrounds-deeprun.jpeg"
          },
          {
            id: "shows-cards",
            type: "cards",
            title: "Show Ring Central",
            items: [
              { id: "shows-calendar", title: "Show Calendar", text: "Upcoming dates, locations, and what is worth saving.", imageUrl: "../assets/atig-showgrounds-deeprun.jpeg", buttonLabel: "Calendar", link: "../show-ring-central.html#calendar" },
              { id: "shows-zones", title: "Zone Schedules", text: "USHJA zone events and practical notes.", imageUrl: "../assets/atig-showgrounds-pbiec.jpg", buttonLabel: "Zones", link: "../show-ring-central.html#zones" },
              { id: "shows-finals", title: "Pony Finals Watch", text: "Qualifying, names to watch, reminders, and useful hype.", imageUrl: "../assets/atig-pony-finals-dukes.jpg", buttonLabel: "Finals watch", link: "../show-ring-central.html#pony-finals" }
            ]
          }
        ]
      },
      {
        id: "catch-ship",
        name: "Catch + Ship",
        slug: "/catch-rides-shipping",
        href: "../catch-rides-shipping.html",
        sections: [
          {
            id: "catch-hero",
            type: "hero",
            heading: "When the pony needs a kid, or the trailer is already going.",
            subheading: "Catch rides, rider needs, shipping routes, braiders, grooms, and service leads in one useful place.",
            buttonText: "Find Help",
            buttonLink: "../catch-rides-shipping.html",
            imageUrl: "../assets/atig-catchride-cutout.png"
          },
          {
            id: "catch-cards",
            type: "cards",
            title: "Find the right help",
            items: [
              { id: "rider-available", title: "Rider Available", text: "Capable kids, trainer references, and clear dates.", imageUrl: "../assets/atig-catchride-cutout.png", buttonLabel: "Find rider", link: "../catch-rides-shipping.html#rider-available" },
              { id: "need-shipping", title: "Shipping Routes", text: "Trailer seats, layovers, routes, and who is already headed that way.", imageUrl: "../assets/pony-handler-trailer.jpg", buttonLabel: "Find shipping", link: "../catch-rides-shipping.html#shipping" },
              { id: "services", title: "Services", text: "Braiders, grooms, photographers, and useful show-day people.", imageUrl: "../assets/atig-show-barn-aisle.jpg", buttonLabel: "Services", link: "../catch-rides-shipping.html#services" }
            ]
          }
        ]
      },
      {
        id: "rail",
        name: "The Rail",
        slug: "/the-rail",
        href: "../pony-people.html",
        sections: [
          {
            id: "rail-hero",
            type: "hero",
            heading: "Ask the rail. Read the stories. Keep the pony lore alive.",
            subheading: "The group text, but findable: pony questions, parent rail talk, show reports, tack swap, and who knows this pony.",
            buttonText: "Ask the Rail",
            buttonLink: "../pony-people.html#ask-the-rail",
            imageUrl: "../assets/atig-pony-show-lineup.jpg"
          },
          {
            id: "rail-cards",
            type: "cards",
            title: "Where pony people gather",
            items: [
              { id: "ask-rail", title: "Ask the Rail", text: "Need a practical answer from people who get it?", imageUrl: "../assets/atig-pony-show-lineup.jpg", buttonLabel: "Ask", link: "../pony-people.html#ask-the-rail" },
              { id: "parent-rail", title: "Parent Rail", text: "Snacks, nerves, budgets, and first-show questions.", imageUrl: "../assets/pony-vintage-with-mom.jpg", buttonLabel: "Parent Rail", link: "../pony-people.html#parent-rail" },
              { id: "who-knows", title: "Who Knows This Pony", text: "Old photos, names, homes, and where they landed.", imageUrl: "../assets/pony-vintage-white-wide.jpg", buttonLabel: "Find history", link: "../pony-people.html#who-knows-this-pony" }
            ]
          }
        ]
      },
      {
        id: "ring-rail",
        name: "The Ring Rail",
        slug: "/ring-rail",
        href: "../the-ring-rail.html",
        sections: [
          {
            id: "ring-rail-hero",
            type: "hero",
            heading: "A pony magazine for the sport we cannot quit.",
            subheading: "Memoirs, pony legends, up-and-comers, trainer spotlights, parent corner, and kind whispers with receipts.",
            buttonText: "Read The Ring Rail",
            buttonLink: "../the-ring-rail.html",
            imageUrl: "../assets/pony-vintage-yellow-jump.jpg"
          },
          {
            id: "ring-rail-text",
            type: "text",
            title: "The old-school paper feeling matters.",
            body: "This section should feel like a program, a magazine, a tack room corkboard, and a memory box."
          }
        ]
      },
      {
        id: "kids",
        name: "Kids Corner",
        slug: "/kids",
        href: "../kids.html",
        sections: [
          {
            id: "kids-hero",
            type: "hero",
            heading: "Safe, cheerful, pony-kid magic.",
            subheading: "Free with an adult account, moderated before posts go live, no direct private messaging.",
            buttonText: "Open Kids Corner",
            buttonLink: "../kids.html",
            imageUrl: "../assets/pony-tiny-rider-bw.jpg"
          },
          {
            id: "kids-cards",
            type: "cards",
            title: "The precious part, without making it corny",
            items: [
              { id: "junior-spotlight", title: "Junior Rider Spotlight", text: "One kid, one pony, one brave thing.", imageUrl: "../assets/pony-tiny-rider-bw-2.jpg", buttonLabel: "Spotlight", link: "../kids.html#junior-rider-spotlight" },
              { id: "first-show", title: "My First Show", text: "Number pins, nerves, ribbons, and who helped.", imageUrl: "../assets/pony-vintage-with-mom.jpg", buttonLabel: "First shows", link: "../kids.html#my-first-show" },
              { id: "art-wall", title: "Pony Art Wall", text: "Drawings, stall-door masterpieces, and pony love.", imageUrl: "../assets/pony-possum-stall-cuddle.jpg", buttonLabel: "Art wall", link: "../kids.html#pony-art-wall" }
            ]
          }
        ]
      },
      {
        id: "about",
        name: "About",
        slug: "/about",
        href: "../about.html",
        sections: [
          {
            id: "about-hero",
            type: "hero",
            heading: "Built from pony people, not platform people.",
            subheading: "At The In Gate comes from sale groups, show mornings, old pony stories, and the need for a kinder, clearer place to connect.",
            buttonText: "Contact",
            buttonLink: "../contact.html",
            imageUrl: "../assets/pony-wide-hug.jpg"
          },
          {
            id: "about-text",
            type: "text",
            title: "People trust people, not platforms.",
            body: "The site should always feel human, visual, easy, and pony-first."
          }
        ]
      }
    ]
  };

  window.AtigEditor = window.AtigEditor || {};
  window.AtigEditor.assetLibrary = assetLibrary;
  window.AtigEditor.initialSite = initialSite;
})();
