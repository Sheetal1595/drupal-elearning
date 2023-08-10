/*!
 * jQuery Once v2.2.3 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e){"use strict";if(typeof exports==="object"&&typeof exports.nodeName!=="string"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(t){"use strict";var r=function(e){e=e||"once";if(typeof e!=="string"){throw new TypeError("The jQuery Once id parameter must be a string")}return e};t.fn.once=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)!==true}).data(n,true)};t.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+r(e))};t.fn.findOnce=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)===true})}});

;
(function ($, drupalSettings) {
  Drupal.behaviors.drupalSlider = {
    attach: function (context, settings) {
      var values = settings.drupalSlider;
      var autoplay = values.autoplay ? true : false;
      var autoplayDelay = values.autoplayDelay ? values.autoplayDelay : 5000;
      var arrows = values.arrows ? true : false;
      var buttons = values.buttons ? true : false;
      var shuffle = values.shuffle ? true : false;
      var full_screen = values.full_screen ? true : false;
      var fade = values.fade ? true : false;
      var loop = values.loop ? true : false;
      var orientation = values.orientation ? 'vertical' : 'horizontal';
      var thumbnails_position = values.thumbnails_position;
      if (values.carousel) {
        $('#'+values.id, context).once('drupalSliderBehavior').sliderPro({     
          arrows: arrows,
          buttons: buttons,
          loop: loop,
          fullScreen: full_screen,
          shuffle: shuffle,
          autoplay: autoplay,
          autoplayDelay: autoplayDelay,
          smallSize: 500,
          mediumSize: 1000,
          largeSize: 3000,   
          waitForLayers: true,
          autoScaleLayers: true,  
          visibleSize: '100%',    
        });
      } else {
        $('#'+values.id, context).once('drupalSliderBehavior').sliderPro({
          width: values.width,
          height: values.height,       
          orientation: orientation,
          thumbnailsPosition: thumbnails_position, 
          loop: loop,
          fade: fade,
          arrows: arrows,
          buttons: buttons,
          fullScreen: full_screen,
          shuffle: shuffle,
          autoplay: autoplay,
          autoplayDelay: autoplayDelay,
          smallSize: 500,
          mediumSize: 1000,
          largeSize: 3000,   
          waitForLayers: false,
          autoScaleLayers: false,           
        });  
      }
    }
  };

})(jQuery, drupalSettings);;
