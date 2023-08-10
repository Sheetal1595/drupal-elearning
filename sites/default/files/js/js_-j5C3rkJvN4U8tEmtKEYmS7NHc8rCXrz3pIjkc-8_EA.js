// $(document).ready(function(){
   
    $("nav ul").addClass('navbar-nav');
    $("nav ul").addClass('mr-auto');
    $("nav ul li").addClass('nav-item');
    $("nav ul li a").addClass('nav-link');
    $("nav ul li a").addClass('pl-0');
    $(".user-login-form").addClass('container');
    $(".layout--twocol-section--50-50").addClass('container');
    $(".layout--threecol-section--25-50-25").addClass('container');
    $(".layout__region--second p ").addClass('para');
    $(".layout__region--third a").addClass('test_btn');


    $("#block-quicklink-3").addClass('ftco-footer-widget mb-5 ml-md-4');
    $("#block-quicklink-3 ul").addClass('list-unstyled');
    $("#block-quicklink-3 ul li a").prepend('<i class="fa fa-arrow-right mr-2"></i>  ');
    
    $(".call .text").prepend('<span class="fa fa-phone"></span>  ');
    $(".address .text").prepend('<span class="fa fa-map-marker"></span>  ');
    $(".email .text").prepend('<span class="fa fa-envelope-o"></span>  ');


    $('.pl-0').removeAttr("data-drupal-link-system-path");

    $( 'img[alt="banner"]' ).addClass('banner_cls');
    $('div[property="schema:text"]').addClass('container');
    $('table').addClass('container');
    $('table').addClass('table');
    $('table').addClass('table-striped');
     
    $('.js-form-item').addClass('form-group');
    $('input[type=text]').addClass('form-control');
    $('input[type=email]').addClass('form-control');
    $('input[type=tel]').addClass('form-control');
    $('input[type=password]').addClass('form-control');
    $(".node-form ").addClass('container');
    

    $('.js-form-submit ').addClass('btn py-2 px-3 btn-primary d-flex align-items-center justify-content-center');

    $(".user-login-form").prepend('<div class="row justify-content-center mb-5 pb-2"><div class="col-md-8 text-center heading-section ftco-animate fadeInUp ftco-animated"><h2 class="mb-4"><span>Login into your</span> account</h2></div></div>');

    $("img").on("error", function () {
        $(this).attr("src", "/drupal-elearning/sites/default/files/styles/medium/public/pictures/2022-10/MicrosoftTeams-image%20%281%29.png?itok=6jxDf3mM");
    });

    $(".banner_cls").attr("src", "/drupal-elearning/sites/default/files/styles/wide/public/2022-10/xbg_1.jpg.pagespeed.ic_._C6ebyFa8h%20%281%29_2.jpg?itok=MHEYLV1u");

    $(".contact-form").before('<a href="/drupal-elearning/about-us" hreflang="en"><img loading="lazy" src="/drupal-elearning/sites/default/files/styles/wide/public/2022-10/xbg_1.jpg.pagespeed.ic_._C6ebyFa8h%20%281%29_2.jpg?itok=MHEYLV1u" width="1090" height="728" alt="banner" typeof="foaf:Image" class="banner_cls"></a><div class="col-md-8 text-center heading-section ftco-animate fadeInUp ftco-animated"><h2 class="mb-4" style="margin-top: 35px;margin-left: 375px">Get in Touch</h2></div><section  class="ftco-section contact-section"><div class="container"><div class="row d-flex contact-info"><div class="col-md-3 d-flex"><div class="bg-light align-self-stretch box p-4 text-center"><h3 class="mb-4">Address</h3><p>MIDC Sez, Rajiv Gandhi Infotech Park, Village Man, Hinjawadi MIDC-411057.</p></div></div><div class="col-md-3 d-flex"><div class="bg-light align-self-stretch box p-4 text-center"><h3 class="mb-4">Contact Number</h3><p><a href="tel:+91 908 0908 011">+91 908 0908 011</a></p></div></div><div class="col-md-3 d-flex"><div class="bg-light align-self-stretch box p-4 text-center"><h3 class="mb-4">Email Address</h3><p><a href="mailto:info@elearn.com">info@elearn.com</a></p></div></div><div class="col-md-3 d-flex"><div class="bg-light align-self-stretch box p-4 text-center"><h3 class="mb-4">Website</h3><p><a href="#">elearn.com</a></p></div></div></div></div></section><div class="container" style="margin-top: -90px;"><div class="col-md-6 p-4 p-md-5 order-md-last bg-light map"><iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.6911351227054!2d73.73506721411587!3d18.58795847196292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbdd59d0a185%3A0x733983a6a335268a!2sHinjewadi%20Phase%201%20Rd%2C%20Phase%201%2C%20Hinjewadi%20Rajiv%20Gandhi%20Infotech%20Park%2C%20Hinjawadi%2C%20Pune%2C%20Maharashtra%20411057!5e0!3m2!1sen!2sin!4v1666100191718!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><div class="col-md-6 p-4 p-md-5 order-md-last bg-light form"><form class="contact-form" data-drupal-selector="contact-form" action="/drupal-elearning/contact-form" method="post" id="contact-form1" accept-charset="UTF-8"></form></div></div>');
    $("table").before('<a href="/drupal-elearning/about-us" hreflang="en"><img loading="lazy" src="/drupal-elearning/sites/default/files/styles/wide/public/2022-10/xbg_1.jpg.pagespeed.ic_._C6ebyFa8h%20%281%29_2.jpg?itok=MHEYLV1u" width="1090" height="728" alt="banner" typeof="foaf:Image" class="banner_cls"></a>');
    
   
    $('#contact-form').contents().appendTo('#contact-form1');
    // var form=$(".contact-form").html();
    // console.log(form);
    // $(".contact-form").append('<div class="container"><div class="col-lg-6 map"></div><div class="col-lg-6 form">'+form+'</div></div>');

    
    // });

    if ( $( "#toolbar-administration" ).length ) {
        // if ( "#myDiv" ) is exist this will perform
        $( "#block-login-link" ).html("<p><a href='user/logout'><span>Login</span> </a></p>");
    
    }

    if ( $( ".node-form" ).length ) {
        // if ( "#myDiv" ) is exist this will perform
        $(" img").css("display","none");
    
    }

   ;
