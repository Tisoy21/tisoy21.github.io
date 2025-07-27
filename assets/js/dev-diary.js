$(document).ready(function() {
    // Check if PageFlip library is available (it's St.PageFlip)
    if (typeof St === 'undefined' || typeof St.PageFlip === 'undefined') {
        console.error('PageFlip library not found. Please check if page-flip.js is loaded.');
        $('#book').html('<p style="text-align: center; padding: 20px; color: red;">PageFlip library not loaded. Please check the console for errors.</p>');
        return;
    }

    // Check if the book container exists
    const $bookContainer = $('#book');
    if ($bookContainer.length === 0) {
        console.log('Book container not found');
        return;
    }

    // Initialize PageFlip with your book container
    const pageFlip = new St.PageFlip($bookContainer[0], {
        width: 550, // base page width
        height: 733, // base page height
        size: "stretch",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: false,  // Change this to true
        mobileScrollSupport: false
    });

    // Load pages from HTML
    pageFlip.loadFromHTML($(".page"));

    // Create navigation controls
    const $navContainer = $('<div class="book-nav" style="text-align: center; margin-bottom: 50px;"></div>');
    
    $navContainer.html(`
        <button id="prevBtn" class="btn btn-primary dev-diary-btn" style="margin: 0 10px;">Previous</button>
        <span id="pageInfo" style="margin: 0 10px; font-weight: bold;">Page 1 of ${pageFlip.getPageCount()}</span>
        <button id="nextBtn" class="btn btn-primary dev-diary-btn" style="margin: 0 10px;">Next</button>
    `);

    // Insert navigation before the book container
    $bookContainer.before($navContainer);

    // Add event listeners using jQuery
    $('#prevBtn').on('click', function() {
        pageFlip.flipPrev();
    });

    $('#nextBtn').on('click', function() {
        pageFlip.flipNext();
    });

    // Update page info when page flips
    pageFlip.on('flip', function(e) {
        $('#pageInfo').text(`Page ${e.data + 1} of ${pageFlip.getPageCount()}`);
    });

    // Update state info
    pageFlip.on('changeState', function(e) {
        console.log('State changed to:', e.data);
    });

    // Update orientation info
    pageFlip.on('changeOrientation', function(e) {
        console.log('Orientation changed to:', e.data);
    });

    // Show the book (it was set to display: none in CSS)
    $bookContainer.css('display', 'block');
});