$(document).ready(function(){
   
    $("nav ul").addClass('navbar-nav');
    $("nav ul").addClass('mr-auto');
    $("nav ul li").addClass('nav-item');
    $("nav ul li a").addClass('nav-link');
    $("nav ul li a").addClass('pl-0');
    
    $(".call .text").prepend('<span class="fa fa-phone"></span>  ');
    $(".address .text").prepend('<span class="fa fa-map-marker"></span>  ');
    $(".email .text").prepend('<span class="fa fa-envelope-o"></span>  ');
});;
