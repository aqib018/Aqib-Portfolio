(function ($) {
    "use strict";

    // Lightweight imagesLoaded shim when plugin is absent
    if (typeof $.fn.imagesLoaded !== 'function') {
        $.fn.imagesLoaded = function (cb) {
            var $root = this;
            var $imgs = $root.find('img');
            var total = $imgs.length;
            if (!total) { cb && cb.call($root); return $root; }
            var done = 0;
            var tick = function () {
                done += 1;
                if (done >= total) cb && cb.call($root);
            };
            $imgs.each(function () {
                if (this.complete) tick();
                else $(this).one('load error', tick);
            });
            return $root;
        };
    }

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // WOW reveal animations
    new WOW().init();

    // Glass navbar — always visible, deeper blur after scroll
    var $nav = $('.navbar');
    var onScrollNav = function () {
        if ($(window).scrollTop() > 40) {
            $nav.addClass('scrolled');
        } else {
            $nav.removeClass('scrolled');
        }
    };
    onScrollNav();
    $(window).on('scroll', onScrollNav);

    // Smooth scrolling on navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 88
            }, 900, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }

            var $collapse = $('.navbar-collapse');
            if ($collapse.hasClass('show')) {
                $collapse.collapse('hide');
            }
        }
    });

    // Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 900, 'easeInOutExpo');
        return false;
    });

    // Typed roles
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 70,
            backSpeed: 28,
            smartBackspace: false,
            loop: true
        });
    }

    // Facts counter
    if ($('[data-toggle="counter-up"]').length) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 1600
        });
    }

    // Skills bars
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });

    // Portfolio isotope
    var $portfolio = $('.portfolio-container');
    var portfolioIsotope = $portfolio.isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.45s'
    });

    // Recalc after images load so glass cards don't overlap
    $portfolio.imagesLoaded(function () {
        portfolioIsotope.isotope('layout');
    });

    // Fallback if imagesLoaded plugin missing
    $(window).on('load', function () {
        portfolioIsotope.isotope('layout');
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');
        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

})(jQuery);
