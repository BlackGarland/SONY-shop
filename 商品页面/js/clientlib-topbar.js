
$(document).ready(function(){
  $(window).resize();

    /*if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { 
      DD_belatedPNG.fix('.png');
    }*/
  var product_nav_slide = function(_wrap,_du){
    var self = this;
    this.wrap = _wrap;
    this.du = _du ? _du : 7;
    this.init();
  }
  product_nav_slide.prototype = {
    contentStatus : false,
    atc : function(_item){
      if(this.contentStatus){
        $(_item).siblings('.products_nav_wrap').slideUp();
        $(_item).find('.trigger_dis').slideDown();
        $(_item).find('del').removeClass('up');
        this.contentStatus = false;
      }else{
        $(_item).siblings('.products_nav_wrap').slideDown();
        $(_item).find('.trigger_dis').slideUp();
        $(_item).find('del').addClass('up');
        this.contentStatus = true;
      }
    },
    setTrigger : function(){
      var sf = this;
      this.contentStatus = this.wrap.css('display')=='block' ? true : false;
      if(this.contentStatus){
        this.wrap.next('.trigger').find('del').addClass('up');
        this.wrap.next('.trigger').find('.trigger_dis').hide();
      }
      this.wrap.next('.trigger').click(function(){
        sf.atc(this);
      });
    },
    setSlide : function(){
      var sf = this;
          this.nav = this.wrap.find('ul.product_navs'),
          this.arr_left = this.wrap.find('.arr_left'),
          this.arr_right = this.wrap.find('.arr_right')
          this.li_num = this.nav.find('li').length,
          this.li_width = this.nav.find('li').outerWidth(),
          this.active_p = 0;
        this.nav.find('li').attr('dw',this.li_width)
      var animate = function(move_culm){
        sf.nav.animate({
          marginLeft: -move_culm*sf.li_width
        });
      }
      this.arr_left.addClass('disable');
      if(this.du>this.li_num){
        this.arr_right.addClass('disable');
      };
      this.arr_left.click(function(){
        sf.active_p -= sf.du;
        if(sf.active_p<=0){
          sf.active_p = 0;
          $(this).addClass('disable');
        }
        if(sf.active_p <= sf.li_num-sf.du){
          $(sf.arr_right).removeClass('disable');
        }
        animate(sf.active_p);
      });
      this.arr_right.click(function(){
        sf.active_p += sf.du;
        if(sf.li_num-sf.active_p<=sf.du){
          sf.active_p = sf.li_num-sf.du;
          $(this).addClass('disable');
        }
        if(sf.active_p<=0){
          sf.active_p = 0;
        }
        if(sf.active_p != 0){
          $(sf.arr_left).removeClass('disable');
        }
        animate(sf.active_p);
      });
      this.nav.width(this.li_num*this.li_width);
    },
    init : function(){
      this.setTrigger();
      this.setSlide();
      //$(".trigger").trigger("click");
    }
  }
 
 $('.products_nav_wrap').each(function(index,item){
    var sl = new product_nav_slide($(item));
     $(window).resize(function(){
       /*if (_sony.contentSize != "b") {
        $(".product_nav_banner").hide();
      }else{*/
        sl.li_width = sl.nav.find('li').outerWidth();
        sl.nav.width(sl.li_num*sl.li_width);
        $(".product_nav_banner").show();
      //}
    })
 /*
    setTimeout(function(){
      $(item).next('.trigger').click();
    },1500);
*/
  });
  /*cover bar*/
  $(".pro_info_icon_list>li").hover(function(){
    if($(this).hasClass("on")||$(this).hasClass("navnow")){return;}
    $(this).children(".normal").hide();
    $(this).children(".on").show();
  },function(){
    if($(this).hasClass("on")||$(this).hasClass("navnow")){return;}
    $(this).children(".normal").show();
    $(this).children(".on").hide();
  })   
  $(".navnow .on").show();
  $(".navnow .normal").hide();
  /*index mobile li sort*/
  $(".mainBlock .mainBlockContent ul").each(function(index, item){
     $(item).find('li').each(function(ind,itm){
       //alert(_sony.contentSize)
       /*if(_sony.contentSize == "s"){
           if($(itm).hasClass('change')){
               $(itm).insertAfter($(item).find('li').eq(0));
           }
           if($(itm).hasClass('changeLast')){
               $(itm).insertAfter($(item).find('li:last-child'));
           }
         }*/
     })
   })
})
 
