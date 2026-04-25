const utilityPosts = Array.from(document.querySelectorAll(".utility-post"));
const typeFilter = document.getElementById("utilityTypeFilter");
const regionFilter = document.getElementById("utilityRegionFilter");
const sizeFilter = document.getElementById("utilitySizeFilter");
const utilityStatus = document.getElementById("utilityFilterStatus");

function matchesFilter(post, filter, key) {
  return !filter || filter.value === "all" || post.dataset[key] === filter.value;
}

function updateUtilityBoard() {
  let visibleCount = 0;

  utilityPosts.forEach((post) => {
    const isVisible = matchesFilter(post, typeFilter, "type")
      && matchesFilter(post, regionFilter, "region")
      && matchesFilter(post, sizeFilter, "size");

    post.classList.toggle("is-hidden", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  if (utilityStatus) {
    utilityStatus.textContent = visibleCount === 1
      ? "Showing 1 helper board post."
      : `Showing ${visibleCount} helper board posts.`;
  }
}

[typeFilter, regionFilter, sizeFilter].forEach((filter) => {
  filter?.addEventListener("change", updateUtilityBoard);
});

updateUtilityBoard();
