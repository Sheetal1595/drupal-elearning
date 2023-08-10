// $(document).ready(function(){
   
    $("nav ul").addClass('navbar-nav');
    $("nav ul").addClass('mr-auto');
    $("nav ul li").addClass('nav-item');
    $("nav ul li a").addClass('nav-link');
    $("nav ul li a").addClass('pl-0');
    $(".user-login-form").addClass('container');
    $("article .contextual-region").addClass('container');

    $("#block-quicklink-3").addClass('ftco-footer-widget mb-5 ml-md-4');
    $("#block-quicklink-3 ul").addClass('list-unstyled');
    $("#block-quicklink-3 ul li a").prepend('<i class="fa fa-arrow-right mr-2"></i>  ');
    
    $(".call .text").prepend('<span class="fa fa-phone"></span>  ');
    $(".address .text").prepend('<span class="fa fa-map-marker"></span>  ');
    $(".email .text").prepend('<span class="fa fa-envelope-o"></span>  ');


    $('.pl-0').removeAttr("data-drupal-link-system-path");

    $( 'img[alt="banner"]' ).addClass('banner_cls');
    $('div[property="schema:text"]').addClass('container');

    $('.js-form-submit ').addClass('btn py-2 px-3 btn-primary d-flex align-items-center justify-content-center');

    $(".user-login-form").prepend('<div class="row justify-content-center mb-5 pb-2"><div class="col-md-8 text-center heading-section ftco-animate fadeInUp ftco-animated"><h2 class="mb-4"><span>Login into your</span> account</h2></div></div>');

    $("img").on("error", function () {
        $(this).attr("src", "/drupal-elearning/sites/default/files/styles/medium/public/pictures/2022-10/MicrosoftTeams-image%20%281%29.png?itok=6jxDf3mM");
    });

    $(".banner_cls").attr("src", "/drupal-elearning/sites/default/files/styles/wide/public/2022-10/xbg_1.jpg.pagespeed.ic_._C6ebyFa8h%20%281%29_2.jpg?itok=MHEYLV1u");


    // });;
