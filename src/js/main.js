// Animate On Scroll Options
// https://github.com/michalsnik/aos
AOS.init({
    duration: 800,
});

// Medium Zoom Options (Zoom image effect on blog images)
// https://github.com/francoischalifour/medium-zoom
const zoomBackground = mediumZoom('.zoom', {
    background: '#fff' ,
    margin: 15,
    scrollOffset: 0,
});

// Owl Carousel Options
// https://github.com/OwlCarousel2/OwlCarousel2
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });
});

// Header
$(document).ready(function () {
    // Header Open Full Screen on mobile view
    $('.menu-icon').on('click', function () {
        $('.navigation > ul').toggleClass('open');
        $('.menu-icon').toggleClass('menu-icon--open');
    });
    // Remove navigation on list item click
    $('li').on('click', function () {
        $('.navigation > ul').removeClass('open');
        $('.menu-icon').removeClass('menu-icon--open');
    });
});



// Add Smooth Scrolling between all # elements.
// To disable smooth scrolling for items such as tab, use the prefix _ before the name.
// Ex.) #_profile
// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    // Ignore link for tab elements
    .not('[href^="#_"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                });
            }
        }
    });


// Social Media Sharing Window
var socialShares = document.querySelectorAll('.social-share a');
if (socialShares) {
    [].forEach.call(socialShares, function (anchor) {
        anchor.addEventListener('click', function (e) {

            var url = this.href,
                width = 500,
                height = 300,
                left = (screen.width / 2) - (width / 2),
                top = (screen.height / 2) - (height / 2);

            if (/^(f|ht)tps?:\/\//i.test(url) || /^mailto/i.test(url)) {
                e.preventDefault();
                window.open(
                    url,
                    '',
                    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left
                );
            }

        });
    });
}
