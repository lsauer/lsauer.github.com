/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function (n) {
    n.viewportSize = {}, n.viewportSize.getHeight = function () {
        return t("Height")
    }, n.viewportSize.getWidth = function () {
        return t("Width")
    };
    var t = function (t) {
        var f, o = t.toLowerCase(), e = n.document, i = e.documentElement, r, u;
        return n["inner" + t] === undefined ? f = i["client" + t] : n["inner" + t] != i["client" + t] ? (r = e.createElement("body"), r.id = "vpw-test-b", r.style.cssText = "overflow:scroll", u = e.createElement("div"), u.id = "vpw-test-d", u.style.cssText = "position:absolute;top:-1000px", u.innerHTML = "<style>@media(" + o + ":" + i["client" + t] + "px){body#vpw-test-b div#vpw-test-d{" + o + ":7px!important}}<\/style>", r.appendChild(u), i.insertBefore(r, e.head), f = u["offset" + t] == 7 ? i["client" + t] : n["inner" + t], i.removeChild(r)) : f = n["inner" + t], f
    }
})(this);


jQuery(document).ready(
    function ($) {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    //execute page specific functions
    if( $('#page-curriculum').length ) {
        var loc = document.location.search;
        var splt;
        var pglang;
        if(loc){
            splt = loc.split('=');
            indx = splt.indexOf('?lang');
            if(indx != -1){
                pglang = splt[indx + 1];
                switchLanguage.call($('#btn-language-switcher'), pglang);
            }
        }
    }
    
    $('#dropdown-toggle-split-left').on('click', function(e){
        $('#dropdown-toggle-split-right').trigger('click');
        e.stopPropagation();
    });    

    // initialize the language switcher
    var isLangAttrInitialized = false;

        function switchLanguage(lang) {
            $('#btn-language-switcher ul > li').removeClass('disabled');
            $(this).addClass('disabled');
            //replace all texts with the ones retrieved in the elements
            try {
                var els = $('[data-lang-' + lang + ']');
                els.each(function (i, elText) {

                    $(elText).contents().filter(function () {
                        return this.nodeType == 3
                    }).each(function () {

                        if (isLangAttrInitialized == false) {
                            $(elText).attr('data-lang-us', this.textContent);
                        }
                        if (this.textContent && this.textContent.trim() != "") {
                            this.textContent = $(elText).data('lang-' + lang);
                        }
                    });

                });
                isLangAttrInitialized = true;

                var elFlag = $('#btn-language-flag');
                var curLang = $('#btn-language-switcher').attr('data-lang-type-current');
                elFlag.removeClass(curLang).addClass(lang);

                $('#btn-language-switcher').attr('data-lang-type-current', lang);

            } catch (err) {
                console.log("error: ", err)
            }
        }

        $("#lang-switcher > li").each(function (i, el) {
        $(el).on('click', function () {
            var lang = $(this).data('lang-type');
            var objurl = $('#href-curriculum');
            if( objurl.length ){
                var url_curr = objurl.attr('href').replace( /[?]lang=(.*)/, '?lang=') + lang;
                objurl.attr('href', url_curr);
            }
            switchLanguage.call(this, lang);
        });
    });

    function adjustWindow() {

        // Init Skrollr
        var s = skrollr.init({
            render: function (data) {

                //Debugging - Log the current scroll position.
                //console.log(data.curTop);
            }
        });

        // Get window size
        winH = viewportSize.getHeight();
        winW = viewportSize.getWidth();

        // Keep minimum height 550
        if (winH <= 550) {
            winH = 550;
        }

        $('.homeSlideTall').height(winH);

        // Resize our slides
        $('.homeSlide').height(winH);

        if (winW >= 760 && winH <= 1000) {
            $('#slide-3').css('height', '180px');
            $('#slide-4').css('height', '180rem');
            $('#slide-5').css('height', '100rem');
        }
        if (winW <= 760 && winH >= 1000) {
            $('#slide-1').css('height', '100rem');
            $('#slide-2').css('height', '170rem');
            $('#slide-3').css('height', '270rem');
            $('#slide-4').css('height', '270rem');
            $('#slide-5').css('height', '100rem');
        } else if (winW <= 500) {
            $('#slide-1').css('height', '100rem');
            $('#slide-2').css('height', '290rem');
            $('#slide-3').css('height', '250rem');
            $('#slide-4').css('height', '250rem');
            $('#slide-5').css('height', '100rem');
        } else if (winW <= 760) {
            // Small screens
            $('#slide-1').css('height', '90rem');
            $('#slide-2').css('height', '170rem');
            $('#slide-3').css('height', '270rem');
            $('#slide-4').css('height', '270rem');
            $('#slide-5').css('height', '100rem');
        } else if (winW <= 1150) {
            $('#slide-1').css('height', '130rem');
            $('#slide-3').css('height', '180rem');
            $('#slide-4').css('height', '180rem');
            $('#slide-5').css('height', '100rem');
        } else {
            // Big screens
            $('#slide-3').css('height', '160rem');
            $('#slide-4').css('height', '160rem');
            $('#slide-5').css('height', '100rem');

        }

        // Refresh Skrollr after resizing our sections
        s.refresh($('.homeSlide'));

    }

    if (document.images && jQuery.fn.imagesLoaded) {

        var loadImages = {
            mobile: "src/images/screenshots/unit_converter_ui.png",
            desktop: "src/images/screenshots/dotnet_msdb_sync.jpg",
            web: "src/images/screenshots/cloud_content_ui.jpg",

        };

        window.img1 = new Image();
        window.img2 = new Image();
        window.img3 = new Image();

        img1.src = window.location.origin + '/' + loadImages.mobile;
        img2.src = window.location.origin + '/' + loadImages.desktop;
        img3.src = window.location.origin + '/' + loadImages.web;

        $body = $('body');

        //FadeIn all sections
        $body.imagesLoaded(function () {
            setTimeout(function () {
                // Resize sections
                adjustWindow();

                //remove loader
                $('body .loading-container').hide();

                // Fade in sections
                $body.removeClass('loading').addClass('loaded');
            }, 800);
        });

        //Check and adjust to the end of a resize event
        var chkResize;
        window.onresize = function () {
            clearTimeout(chkResize);
            chkResize = setTimeout(adjustWindow, 200);
        };
    }

    var bgProfile = $('#slide-1-container');

    $('.profile-list li').each(function (i, el) {
        $(el)
            .hover(function () {
                $(this).addClass('.profile-list-hover');
                $('.profile-avatar').fadeTo("fast", 0.0, "linear");
                var hoverType = $(this).data('type');

                bgProfile.removeClass('background-slide')
                    .addClass('profile-' + hoverType);
            }, function () {
                $(this).removeClass('.profile-list-hover');
                $('.profile-avatar').stop().fadeTo("fast", 1, "linear");
                var hoverType = $(this).data('type');
                bgProfile.addClass('background-slide')
                    .removeClass('profile-' + hoverType);
            });
        $(el).on('click tap', function () {
            $('#slide-1 ul.profile-list > li').removeClass('.profile-list-hover');

            $(this).trigger('mouseover');
            var elInner = $(this);
            window.setTimeout(function () {
                elInner.trigger('mouseleave');
            }, 2000);
        });
    });


}(jQuery));