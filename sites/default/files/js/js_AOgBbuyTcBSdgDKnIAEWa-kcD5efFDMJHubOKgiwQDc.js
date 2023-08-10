$(document).ready(function(){
   
    // $("#block-mainnavigation").adclass('navbar');
    // $("#block-mainnavigation").adclass('navbar-expand-lg');
    // $("#block-mainnavigation").adclass('navbar-dark');
    // $("#block-mainnavigation").adclass('ftco-navbar-light');
    // $("#block-mainnavigation").adclass('bg-dark');
    $("nav ul").addClass('navbar-nav');
    $("nav ul").addClass('mr-auto');
    $("nav ul li").addClass('nav-item');
    $("nav ul li a").addClass('nav-link');
    $("nav ul li a").addClass('pl-0');
    
    $(".call .text").prepend('<span class="fa fa-phone"></span>  ');
    $(".address .text").prepend('<span class="fa fa-map-marker"></span>  ');
    $(".email .text").prepend('<span class="fa fa-enevelop-o"></span>  ');
});;
