$(function () {
  if (typeof St === "undefined" || typeof St.PageFlip === "undefined") {
    console.error(
      "PageFlip library not found. Please check if page-flip.js is loaded."
    );
    $("#book").html(
      '<p style="text-align: center; padding: 20px; color: red;">PageFlip library not loaded. Please check the console for errors.</p>'
    );
    return;
  }

  const $bookContainer = $("#book");
  if ($bookContainer.length === 0) {
    console.log("Book container not found");
    return;
  }

  const pageFlip = new St.PageFlip($bookContainer[0], {
    width: 550,
    height: 733,
    size: "stretch",
    minWidth: 315,
    maxWidth: 1000,
    minHeight: 420,
    maxHeight: 1350,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false,
  });

  pageFlip.loadFromHTML($(".page"));

  const $navContainer = $(
    '<div class="book-nav" style="text-align: center; margin-bottom: 50px;"></div>'
  );

  $navContainer.html(`
        <button id="prevBtn" class="btn btn-primary dev-diary-btn" style="margin: 0 10px;">Previous</button>
        <span id="pageInfo" style="margin: 0 10px; font-weight: bold;">Page 1 of ${pageFlip.getPageCount()}</span>
        <button id="nextBtn" class="btn btn-primary dev-diary-btn" style="margin: 0 10px;">Next</button>
    `);

  $bookContainer.before($navContainer);

  $("#prevBtn").on("click", function () {
    pageFlip.flipPrev();
  });

  $("#nextBtn").on("click", function () {
    pageFlip.flipNext();
  });

  pageFlip.on("flip", function (e) {
    $("#pageInfo").text(`Page ${e.data + 1} of ${pageFlip.getPageCount()}`);
  });

  $bookContainer.css("display", "block");
});
