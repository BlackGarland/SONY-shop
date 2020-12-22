// JavaScript Document
function PC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
$(function(){
	if($('div').hasClass('page_pc')){
	if(PC()){
		$('.page_pc').show();
		$('.page_mobile').remove();		
		var index=-1;
		var mouseIndex=-1;
		var scrollT;
		var setT;

		var top=$('.page_pc .map').eq(0).offset().top-$('.page_pc').offset().top;
		$('.page_pc .navBox').removeClass('active').css({top:$('.page_pc .map').eq(0).offset().top-$('.page_pc').offset().top-$('.page_pc .navBox').height()})
		$('.navUl>li').click(function(){
			var i=$(this).index();
			$('html,body').animate({scrollTop:$('.map').eq(i).offset().top-$('.navBox').height()-61})
		})
		$('.navUl>li').hover(
			function(){
				clearTimeout(setT);
				mouseIndex=$(this).index();
				if(mouseIndex!=index){
					$('.navUl>li').eq(index).removeClass('active');
					$('.navUl>li').eq(index).find('.xian1').stop().animate({left:'100%'},500,'swing');
					$('.navUl>li').eq(index).find('.xian2').stop().animate({left:'100%'},600,'swing');
					$(this).find('.xian1').stop().css({left:'-100%'}).animate({left:0},500,'swing');
					$(this).find('.xian2').stop().css({left:'-100%'}).animate({left:0},600,'swing');
				}
				else{
					$('.navUl>li').eq(index).find('.xian1').stop().css({left:'-100%'}).animate({left:0},500,'swing');
					$('.navUl>li').eq(index).find('.xian2').stop().css({left:'-100%'}).animate({left:0},600,'swing');
				}
			},
			function(){
				if(mouseIndex!=index){
					setT=setTimeout(function(){
						$('.navUl>li').eq(index).addClass('active');
						$('.navUl>li').eq(index).find('.xian1').stop().css({left:'-100%'}).animate({left:0},150,'swing');
						$('.navUl>li').eq(index).find('.xian2').stop().css({left:'-100%'}).animate({left:0},250,'swing');
					},50)
					$(this).find('.xian1').stop().animate({left:'100%'},150,'swing');
					$(this).find('.xian2').stop().animate({left:'100%'},250,'swing');
				}
				mouseIndex=-1;
			}
		)
		$('.navUl').mouseleave(
			function(){
				mouseIndex=-1;
				if(index<0){ $('.navUl>li').removeClass('active'); }
				else{ $('.navUl>li').eq(index).addClass('active').siblings().removeClass('active'); }
			}
		)
		var winScrollFun=function(){
			top=$('.page_pc .map').eq(0).offset().top-$('.page_pc').offset().top-$('.page_pc .navBox').height();
			if($(window).scrollTop()<=$('.page_pc .map').eq(0).offset().top-$('.page_pc .navBox').height()-62){ $('.page_pc .navBox').removeClass('active').css({top:top}) }
			else{ $('.page_pc .navBox').addClass('active').css({top:62}) }
			clearTimeout(scrollT)
			scrollT=setTimeout(function(){
				var k;
				for(var i=0; i<$('.navUl>li').size(); i++){
					if($(window).scrollTop()>=$('.map').eq(i).offset().top-$('.navBox').height()-62){ k=i; }
				}
				if(k!=index){
					if(mouseIndex<0){
						$('.navUl>li').eq(index).removeClass('active');
						$('.navUl>li').eq(index).find('.xian1').stop().animate({left:'100%'},150,'swing');
						$('.navUl>li').eq(index).find('.xian2').stop().animate({left:'100%'},250,'swing');
						
						$('.navUl>li').eq(k).addClass('active');
						$('.navUl>li').eq(k).find('.xian1').stop().css({left:'-100%'}).animate({left:0},150,'swing');
						$('.navUl>li').eq(k).find('.xian2').stop().css({left:'-100%'}).animate({left:0},250,'swing');
					}
					index=k;
				}
				
				if($(window).scrollTop()<$('.map').eq(0).offset().top-$('.navBox').height()-62){
					index=-1;
					$('.navUl>li').removeClass('active');
				}
			},50)
			

		}
		// winScrollFun();
		$(window).scroll(function(){
			winScrollFun();
			// $('.map h2,.icon,.icon1').each(function(){
			// 	if($(window).scrollTop()+$(window).height()>$(this).offset().top&&$(window).scrollTop()<$(this).offset().top+$(this).height()){
			// 		$(this).addClass("sf")
			// 	}
			// 	else if($(window).scrollTop()+$(window).height()<$(this).offset().top||$(window).scrollTop()>$(this).offset().top+$(this).height()){
			// 		$(this).removeClass("sf");
			// 	}
			// })
			$('.map').each(function(){
				if($(window).scrollTop()>=$(this).offset().top-$('.page_pc .navBox').height()-62&&$(window).scrollTop()<$(this).offset().top+10){
						$(this).find('h2,.icon,.icon1').addClass("sf")
				}
				else if($(window).scrollTop()+$(window).height()<$(this).offset().top||$(window).scrollTop()>$(this).offset().top+$(this).height()){
					$(this).find('h2,.icon,.icon1').removeClass("sf");
			 	}
			})
		})




	}
	 else{
		$('.page_pc').remove();
		$('.page_mobile').show();
		
		setTimeout(function(){
			var phoneScale = 1;
     		$('[name=viewport]').attr('content','width=device-width, initial-scale='+phoneScale+', minimum-scale='+phoneScale+', maximum-scale='+phoneScale+', user-scalable=no');
			},100)
	 }

		}
})