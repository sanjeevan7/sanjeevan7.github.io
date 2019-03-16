window.dirRoot = 'http://localhost/SanjeevSite/';

var duration = 100;
var startMinute = 200;
var page = $('#container').attr('data-category');
var slug = $('#container').attr('data-slug');

Template(page,slug);

function Template(page,slug) {
    if(page != 'home') { $('#mobile-nav').html(' / '+page); }
    else { $('#mobile-nav').html(''); }

    var dataCheck = $('#mobile-menu').attr('data-check');

    if(dataCheck == 'false') {
        var startMinute = 1300;
        callEffect(page);
    }
    else {
        var startMinute = 200;
        closeEffect(page);
    }

    if(page == 'home') {
        $.get(dirRoot+'home.php', function(result){
            $('title').html('Ekkrit Foonngern');

            setTimeout(function(){ $('#container').html(result); navFormat(page) }, startMinute);
        })
    }
    else if(page == 'work') {
        if(slug==undefined || slug=='' || slug==null) {
            $.get(dirRoot+'work.php', {category: page}, function(result){
                $('title').html('Work / Ekkrit Foonngern');

                setTimeout(function(){ $('#container').html(result); }, startMinute);
            });
        } else {
            $.get(dirRoot+'workDetail.php', {category: page, slug: slug}, function(result){
                getTitle(page,slug);
                setTimeout(function(){ $('#container').html(result); }, startMinute);
            });
        }
    }
    else if(page == 'about') {
        $.get(dirRoot+'about.php', {category: page}, function(result){
            $('title').html('About / Ekkrit Foonngern');

            setTimeout(function(){ $('#container').html(result); }, startMinute);
        });
    }
    else if(page == 'contact') {
        $.get(dirRoot+'contact.php', {category: page}, function(result){
            $('title').html('Contact / Ekkrit Foonngern');

            setTimeout(function(){ $('#container').html(result); }, startMinute);
        });
    }
}

$(window).resize(function () { navFormat(page); });

function callEffect(page) {

    navFormat(page);
    setSessionNumber(1);

    $(window).scrollTop(0);

    $('#cursor').css('z-index','-1');



    $('.menu-mask').css('display','none');

    $('#menu .menu-link').removeAttr('style');
    $('#menu .menu-link').removeClass('disabled');

    setTimeout(function(){ $('.quote-mask').append('<li>Think</li>'); }, 3*duration);
    setTimeout(function(){ $('.quote-mask li:nth-child(1)').remove(); }, 4*duration);
    setTimeout(function(){ $('.quote-mask').append('<li>like</li>'); }, 5*(duration));
    setTimeout(function(){ $('.quote-mask li:nth-child(1)').remove(); }, 6*(duration));
    setTimeout(function(){ $('.quote-mask').append('<li>a scientist,</li>'); }, 7*(duration));
    setTimeout(function(){ $('.quote-mask li:nth-child(1)').remove(); }, 8*(duration));
    setTimeout(function(){ $('.quote-mask').append('<li>Act</li>'); }, 9*(duration));
    setTimeout(function(){ $('.quote-mask li:nth-child(1)').remove(); }, 10*(duration));
    setTimeout(function(){ $('.quote-mask').append('<li>like</li>'); }, 11*(duration));
    setTimeout(function(){ $('.quote-mask li:nth-child(1)').remove(); }, 12*(duration));
    setTimeout(function(){ $('.quote-mask').append('<li>an artist.</li>'); }, 13*(duration));
    setTimeout(function(){ $('.quote-mask li:nth-child(1)').remove(); }, 14*(duration));

    setTimeout(function(){ $('#effect').addClass('effect-fadeoff'); }, 17*(duration));
    setTimeout(function(){ $('#effect').css('display','none'); }, 19*(duration));
    setTimeout(function(){ $('#effect').removeClass('effect-fadeoff'); }, 20*(duration));


    $('#menu .menu-link[data-category='+page+']').css('color','#FF0400');

}

function closeEffect(page) {

    navFormat(page);

    $(window).scrollTop(0);

    $('#cursor').css('z-index','-1');

    $('#effect').removeAttr('style');

    $('#mobile-menu span.t').css({'transform':'rotate(45deg)','top':'20px','background':'#fff'});
    $('#mobile-menu span.b').css({'transform':'rotate(-45deg)','bottom':'20px','background':'#fff'});

    $('#menu .menu-link').removeAttr('style');
    $('#menu .menu-link').removeClass('disabled');

    setTimeout(function(){ $('#effect').addClass('effect-fadeoff'); }, 2*(duration));
    setTimeout(function(){ $('#logo').css('opacity','1'); }, 2*(duration));
    setTimeout(function(){ $('#mobile-menu span.t').removeAttr('style'); }, 2*(duration));
    setTimeout(function(){ $('#mobile-menu span.b').removeAttr('style'); }, 2*(duration));
    setTimeout(function(){ $('#effect').css('display','none'); }, 4*(duration));
    setTimeout(function(){ $('#effect').removeClass('effect-fadeoff'); }, 5*(duration));

    $('#mobile-menu').attr('data-check','false');
    $('#menu .menu-link[data-category='+page+']').css('color','#FF0400');
}

function setURL(page,slug,url) {
    if (typeof (history.pushState) != "undefined") {
        var obj = { Page: page, Url: url };
        history.pushState(obj, obj.Page, obj.Url);
    } else {
        alert("Browser does not support HTML5.");
    }

    Template(page,slug);
}

window.onpopstate = function(event) {
    var currentURL = window.location.href;
    var urlSplit = currentURL.split('/');
    var page = urlSplit[3];
    var slug = urlSplit[4];

    if(page=='') {
        var page = 'home';
    }

    Template(page,slug);
}

function Back() {
    window.history.back();
}

$('.menu-link').click(function () {
    var href = $(this).attr('href');
    var urlSplit = href.split('/');
    var page = urlSplit[1];
    var slug = urlSplit[2];

    if(page=='') { var page = 'home'; }

    var currentURL = window.location.href;
    var checkURL = window.location.origin+href;

    if(currentURL!=checkURL) { setURL(page,'',href); }

    return false;
});

$('.mobile-menu-link').click(function () {
    var href = $(this).attr('href');
    var urlSplit = href.split('/');
    var page = urlSplit[1];
    var slug = urlSplit[2];

    if(page=='') { var page = 'home'; }

    var currentURL = window.location.href;
    var checkURL = window.location.origin+href;

    if(currentURL!=checkURL) { setURL(page,'',href); }
    else { closeEffect(page) }

    return false;
});

$(window).scroll(function () {
    var width = $(window).width();
    var height = $(window).scrollTop();
    var dataCheck = $('#mobile-menu').attr('data-check');

    if(dataCheck == 'false') {
        if(width > 650) {
            if(height > 1) {
                $('#mobile-menu').addClass('mobile-menu-fadeIn');
                $('#menu').addClass('menu-fadeOut');
                $('#mobile-menu').removeClass('mobile-menu-fadeOut');
                $('#menu').removeClass('menu-fadeIn');
            } else {
                $('#mobile-menu').addClass('mobile-menu-fadeOut');
                $('#menu').addClass('menu-fadeIn');
                $('#mobile-menu').removeClass('mobile-menu-fadeIn');
                $('#menu').removeClass('menu-fadeOut');
            }
        }
    }
});


function navFormat(page) {

    var width = $(window).width();
    var bannerZoom = width/1270;
    var mobileBannerZoom = 0.9*width;
    var dataCheck = $('#mobile-menu').attr('data-check');

    if(width > 650) {

        if(dataCheck == 'true') {
            $('#mobile-menu').css('opacity','1');
        } else {
            $('#mobile-menu').css('opacity','0');
        }

        $('.text-emoji').hover(
            function() {
                var emoji = $(this).attr('data-value');
                $('.emoji').html(emoji);
                $('.emoji').addClass('emoji-zoomIn');
                $('.emoji').removeClass('emoji-zoomOut');
            },
            function() {
                $('.emoji').removeClass('emoji-zoomIn');
                $('.emoji').addClass('emoji-zoomOut');
            }
        );
    } else {
        $('#mobile-menu').css('opacity','1');
    }

    if(page == 'home') {

        if(width > 650) {
            $('body').css({'display':'flex','align-items':'center','justify-content':'center'});
            $('#nav').css({'width':'100%','position':'fixed','top':'0','left':'0'});
            $('#footer').css({'width':'100%','position':'fixed','bottom':'0','left':'0','display':'block'});
            $('#float').attr('onclick','nextImage();');
            $('#float').removeClass('back');

            $('.home').css('zoom', bannerZoom);
            $('.home-banner').css('zoom', bannerZoom);

            $('.home-banner li  a').addClass('flash-open');
            setTimeout(function(){ $('.home-banner li a').removeClass('flash-open'); }, 800);
        } else {
            $('body').removeAttr('style');
            $('#nav').removeAttr('style');
            $('#footer').removeAttr('style');

            $('.home').css('zoom', '1');
            $('.mobile-banner li').css('width', mobileBannerZoom);
            $('.mobile-banner li').css('height', mobileBannerZoom);
        }

    } else {
        $('body').removeAttr('style');
        $('#nav').removeAttr('style');
        $('#footer').removeAttr('style');
        $('#float').attr('onclick','Back();');
        $('#float').addClass('back');

        if(page == 'contact') {
            if(width > 650) {
                $('#footer').css('display', 'none');
            } else {
                $('#footer').css('display', 'block');
            }
        }
    }
}

function getTitle(page,slug) {
    $.get(dirRoot+'getTitle.php', {category: page, slug: slug}, function(result){
        $('title').html(result+' / Ekkrit Foonngern');
    });
}

$('#mobile-menu').click(function () {
    var dataCheck = $(this).attr('data-check');
    $(this).attr('data-check','true');

    $('#nav').css('z-index','999999');
    $('#effect').css({'display':'block','z-index':'999998'});
    $('.menu-mask').css('display','flex');
    $('#logo').css('opacity','0');
    $('#menu').css('opacity','0');

    $('#mobile-menu span.t').css({'transform':'rotate(45deg)','top':'20px','background':'#fff'});
    $('#mobile-menu span.b').css({'transform':'rotate(-45deg)','bottom':'20px','background':'#fff'});

    if(dataCheck == 'true') {
        $('#nav').css('z-index','999998');
        $('#effect').css({'display':'none','z-index':'999999'});
        $('.menu-mask').css('display','none');
        $('#logo').css('opacity','1');
        $('#menu').css('opacity','1');

        $('#mobile-menu span.t').removeAttr('style');
        $('#mobile-menu span.b').removeAttr('style');

        $(this).attr('data-check','false');
    }
});

window.processing = false;
$(window).on('mousewheel', function(event) {
    if (processing == false) {
        processing = true;

        if (event.originalEvent.wheelDelta >= 0) { nextImage(); }
        else { prevImage(); }

        setTimeout(function() { processing = false; }, 1300);
    }
});

function nextImage() {

    var homeBannerHtml = $('.home-banner li:first-child').html();
    var textTransitionHtml = $('.text-transition li:first-child').html();

    $('.home-banner').css('pointer-events','none');
    $('.home-banner li:first-child').remove();
    $('.home-banner').append('<li class="img-flash">'+homeBannerHtml+'</li>');

    $('.home-banner li:first-child').addClass('img-flash-next');
    setTimeout(function(){ $('.home-banner li').removeClass('img-flash-next'); }, 400);

    $('.home-banner li:nth-child(3) a').addClass('flash-open');
    setTimeout(function(){ $('.home-banner li:nth-child(3) a').removeClass('flash-open'); }, 800);

    $('.text-transition li:first-child').remove();
    $('.text-transition').append('<li>'+textTransitionHtml+'</li>');
    $('.text-transition').addClass('text-transition-next');
    setTimeout(function(){ $('.text-transition').removeClass('text-transition-next'); }, 550);

    setTimeout(function(){ $('.home-banner').css('pointer-events','auto'); }, 550);

    setSessionNumber(getSessionNumber()+1);
}

function prevImage() {

    var homeBannerHtml = $('.home-banner li:last-child').html();
    var textTransitionHtml = $('.text-transition li:last-child').html();

    $('.home-banner').css('pointer-events','none');
    $('.home-banner li:last-child').remove();
    $('.home-banner').prepend('<li class="img-flash">'+homeBannerHtml+'</li>');

    $('.home-banner li:first-child').addClass('img-flash-prev');
    setTimeout(function(){ $('.home-banner li').removeClass('img-flash-prev'); }, 400);

    $('.home-banner li:nth-child(3) a').addClass('flash-open');
    setTimeout(function(){ $('.home-banner li:nth-child(3) a').removeClass('flash-open'); }, 800);

    $('.text-transition li:last-child').remove();
    $('.text-transition').prepend('<li>'+textTransitionHtml+'</li>');
    $('.text-transition').addClass('text-transition-prev');
    setTimeout(function(){ $('.text-transition').removeClass('text-transition-prev'); }, 550);

    setTimeout(function(){ $('.home-banner').css('pointer-events','auto'); }, 550);

    setSessionNumber(getSessionNumber()-1);
}

function setSessionNumber(number) {
    var number = Number(number);

    if(number < 1) { number = 7; }
    if(number > 7) { number = 1; }

    if(number == 1) {
        $('.banner-progress').css('width','20%');
        $('.banner-current').html('1');
    }
    if(number == 2) {
        $('.banner-progress').css('width','40%');
        $('.banner-current').html('2');
    }
    if(number == 3) {
        $('.banner-progress').css('width','60%');
        $('.banner-current').html('3');
    }
    if(number == 4) {
        $('.banner-progress').css('width','70%');
        $('.banner-current').html('4');
    }
    if(number == 5) {
        $('.banner-progress').css('width','80%');
        $('.banner-current').html('5');
    }
    if(number == 6) {
        $('.banner-progress').css('width','90%');
        $('.banner-current').html('6');
    }
    if(number == 7) {
        $('.banner-progress').css('width','100%');
        $('.banner-current').html('7');
    }
    $.session.set('key', number);
}

function getSessionNumber() {
    return Number($.session.get('key'));
}

$(document).on('mousemove', function(e){
    var width = $(document).width();
    var height = $(document).height();

    if(width > 990) {
        $('#cursor').css({'display':'block','left': Number((e.pageX)-10),'top': Number((e.pageY)-10),'z-index': '9999999'});
        if(Number((e.pageX)+24) > width) { $('#cursor').css({'display': 'none'}); }
        if(Number((e.pageX)) < 10) { $('#cursor').css({'display': 'none'}); }
        if(Number((e.pageY)+24) > height) { $('#cursor').css({'display': 'none'}); }
        if(Number((e.pageY)) < 10) { $('#cursor').css({'display': 'none'}); }

        $('a, #float, button, #mobile-menu').hover(
            function() {
                $('#cursor').css({'transform':'scale(2.5)','border':'none','background':'rgba(0,0,0,0.2)'});
            },
            function() {
                $('#cursor').css({'transform':'scale(1)','border':'3px #333 solid','background':'none'});
            }
        );
    }
});