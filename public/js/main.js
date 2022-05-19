$(document).ready(function () {

    /* Browser fullscreen experience on double click */
    // if (self == top) {
    //     $('body').on('dblclick', function (e) {

    //         if (!document.fullscreenElement && // alternative standard method
    //             !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
    //             if (document.documentElement.requestFullscreen) {
    //                 document.documentElement.requestFullscreen();
    //             } else if (document.documentElement.msRequestFullscreen) {
    //                 document.documentElement.msRequestFullscreen();
    //             } else if (document.documentElement.mozRequestFullScreen) {
    //                 document.documentElement.mozRequestFullScreen();
    //             } else if (document.documentElement.webkitRequestFullscreen) {
    //                 document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    //             }
    //         } else {
    //             if (document.exitFullscreen) {
    //                 document.exitFullscreen();
    //             } else if (document.msExitFullscreen) {
    //                 document.msExitFullscreen();
    //             } else if (document.mozCancelFullScreen) {
    //                 document.mozCancelFullScreen();
    //             } else if (document.webkitExitFullscreen) {
    //                 document.webkitExitFullscreen();
    //             }
    //         }

    //     });
    // } else {

    // }


    /* float label checking input is not empty */
    // $('.float-label .form-control').on('blur', function () {
    //     if ($(this).val() || $(this).val().length != 0) {
    //         $(this).closest('.float-label').addClass('active');
    //     } else {
    //         $(this).closest('.float-label').removeClass('active');
    //     }
    // })

    /* menu open close wrapper screen click close menu */
    $('.menu-btn').on('click', function (e) {
        e.stopPropagation();
        if ($('body').hasClass('sidemenu-open') == true) {
            $('body, html').removeClass('sidemenu-open');
            setTimeout(function () {
                $('body, html').removeClass('menuactive');
            }, 500);
        } else {
            $('body, html').addClass('sidemenu-open menuactive');
        }
    });
    $('.wrapper').on('click', function () {

        if ($('body').hasClass('sidemenu-open') == true) {

            $('body, html').removeClass('sidemenu-open');
            setTimeout(function () {
                $('body, html').removeClass('menuactive');
            }, 500);
        }
    });

    /* filter click open filter */
    // if ($('body').hasClass('filtermenu-open') == true) {
    //     $('.filter-btn').find('i').html('close');
    // }
    // $('.filter-btn').on('click', function () {
    //     if ($('body').hasClass('filtermenu-open') == true) {
    //         $('body').removeClass('filtermenu-open');
    //         $(this).find('i').html('filter_list')

    //     } else {
    //         $('body').addClass('filtermenu-open');
    //         $(this).find('i').html('close')
    //     }
    // });


    /* background image to cover */
    // $('.background').each(function () {
    //     var imagewrap = $(this);
    //     var imagecurrent = $(this).find('img').attr('src');
    //     imagewrap.css('background-image', 'url("' + imagecurrent + '")');
    //     $(this).find('img').remove();
    // });


    /* drag and scroll like mobile remove while creating mobile app */
    (function ($) {
        $.dragScroll = function (options) {
            var settings = $.extend({
                scrollVertical: true,
                scrollHorizontal: true,
                cursor: null
            }, options);

            var clicked = false,
                clickY, clickX;

            var getCursor = function () {
                if (settings.cursor) return settings.cursor;
                if (settings.scrollVertical && settings.scrollHorizontal) return 'url(img/touch.webp), move';
                if (settings.scrollVertical) return 'row-resize';
                if (settings.scrollHorizontal) return 'col-resize';
            }

            var updateScrollPos = function (e, el) {
                $('html').css('cursor', getCursor());
                var $el = $(el);
                settings.scrollVertical && $el.scrollTop($el.scrollTop() + (clickY - e.pageY));
                settings.scrollHorizontal && $el.scrollLeft($el.scrollLeft() + (clickX - e.pageX));
            }

            $(document).on({
                'mousemove': function (e) {
                    clicked && updateScrollPos(e, this);
                },
                'mousedown': function (e) {
                    clicked = true;
                    clickY = e.pageY;
                    clickX = e.pageX;
                },
                'mouseup': function () {
                    clicked = false;
                    $('html').css('cursor', 'url(img/logo-cursor.webp), auto');
                }
            });
        }
    }(jQuery))


    // GOOGLE ANALYTICS
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-179635883-1');

    // MICROSOFT CLARITY
    (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "bkenv6u3cf");

    // INSPECT LET
    (function () {
        window.__insp = window.__insp || [];
        __insp.push(['wid', 1573662467]);
        var ldinsp = function () {
            if (typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1573662467&r=' + Math.floor(new Date().getTime() / 3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x);
        };
        setTimeout(ldinsp, 0);
    })();

    // GOOGLE ADS
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'AW-610455455');
    gtag('event', 'conversion', { 'send_to': 'AW-610455455/j0KKCODVyIwDEJ-fi6MC' });

    // FACEBOOK FIXEL
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '495640675103737');
    fbq('track', 'PageView');


    // TAWKTO
    // var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    // (function () {
    //     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    //     s1.async = true;
    //     s1.src = 'https://embed.tawk.to/628501cf7b967b11799006a4/1g3bou4pj';
    //     s1.charset = 'UTF-8';
    //     s1.setAttribute('crossorigin', '*');
    //     s0.parentNode.insertBefore(s1, s0);
    // })();



    // $.dragScroll();
    /* End of drag and scroll like mobile remove while creating mobile app */




    /* theme color cookie */
    // if ($.type($.cookie("theme-color")) != 'undefined' && $.cookie("theme-color") != '') {
    //     $('html').removeClass('grey-theme');
    //     $('html').addClass($.cookie("theme-color"));
    // }

    // $('.theme-color .btn').on('click', function () {
    //     $('html').removeClass('grey-theme');
    //     $('html').removeClass($.cookie("theme-color"));
    //     var themecolor = $(this).attr('data-theme');
    //     $.cookie("theme-color", themecolor, {
    //         expires: 1
    //     });
    //     $('html').addClass($.cookie("theme-color"));
    // });

    // /* theme layout cookie */    
    // if ($.type($.cookie("theme-color-layout")) !== 'dark-layout' && $.cookie("theme-color-layout") !== 'dark-layout') {
    //     $('#theme-dark').prop('checked', false);
    //     $('html').addClass($.cookie("theme-color-layout"));
    //     $('html').removeClass('dark-layout');
    // } else {
    //     $('#theme-dark').prop('checked', true);
    //     $('html').addClass($.cookie("theme-color-layout"));
    // }
    // $('#theme-dark').on('change', function () {
    //     if ($(this).is(':checked') === true) {
    //         $('html').removeClass('light-layout');
    //         $('html').removeClass($.cookie("theme-color-layout"));
    //         $.cookie("theme-color-layout", 'dark-layout', {
    //             expires: 1
    //         });
    //         $('html').addClass($.cookie("theme-color-layout"));
    //     } else {
    //         $('html').removeClass('dark-layout');
    //         $('html').removeClass($.cookie("theme-color-layout"));
    //         $.cookie("theme-color-layout", 'light-layout', {
    //             expires: 1
    //         });
    //         $('html').addClass($.cookie("theme-color-layout"));
    //     }


    // });



    // CHANGE TITLE ON TAB SWITCH
    (function () {
        var hidden = "hidden";
        var oldtitle = document.title;
        var currenttitle;

        // Standards based on browsers:
        if (hidden in document)
            document.addEventListener("visibilitychange", onchange);
        else if ((hidden = "mozHidden") in document)
            document.addEventListener("mozvisibilitychange", onchange);
        else if ((hidden = "webkitHidden") in document)
            document.addEventListener("webkitvisibilitychange", onchange);
        else if ((hidden = "msHidden") in document)
            document.addEventListener("msvisibilitychange", onchange);
        // IE 9 and lower:
        else if ("onfocusin" in document)
            document.onfocusin = document.onfocusout = onchange;
        // All others:
        else
            window.onpageshow = window.onpagehide
                = window.onfocus = window.onblur = onchange;

        //if tab change happens set status to either hidden or visible
        function onchange(evt) {
            var v = "visible", h = "hidden",
                evtMap = {   //check events and set status based on event type
                    focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
                };

            evt = evt || window.event;
            if (evt.type in evtMap) {  // check the title
                currenttitle = oldtitle;
                $(document).attr('title', currenttitle);
            }
            else { // We are in hidden state so create unique title
                currenttitle = this[hidden] ? "🐶 Missing you already..." : oldtitle; //update to whatever you want
                $(document).attr('title', currenttitle);
            }

        }

        // set the initial state (but only if browser supports the Page Visibility API)
        if (document[hidden] !== undefined)
            onchange({ type: document[hidden] ? "blur" : "focus" });
    })();

});


// $(window).on('load', function () {
//     $('.loader-screen').fadeOut('slow');

//     /* header active on scroll more than 50 px*/
//     if ($(this).scrollTop() >= 30) {
//         $('.header').addClass('active')
//     } else {
//         $('.header').removeClass('active')
//     }

//     $(window).on('scroll', function () {
//         /* header active on scroll more than 50 px*/
//         if ($(this).scrollTop() >= 30) {
//             $('.header').addClass('active')
//         } else {
//             $('.header').removeClass('active')
//         }
//     });


// });
