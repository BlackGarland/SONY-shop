/*
作者：李志
ps:本案例可用于商业用途，望添加作者信息

*/
$(function(){
	/*======右按钮======*/
	$(".you").click(function(){
		nextscroll();
	});
	function nextscroll(){
		var vcon = $(".v_cont");
		var offset = ($(".v_cont li").width())*-1;
		vcon.stop().animate({marginLeft:offset},"slow",function(){
			var firstItem = $(".v_cont ul li").first();
			vcon.find(".flder").append(firstItem);
			$(this).css("margin-left","0px");
		});
	};
	/*========左按钮=========*/
	$(".zuo").click(function(){
		var vcon = $(".v_cont");
		var offset = ($(".v_cont li").width()*-1);
		var lastItem = $(".v_cont ul li").last();
		vcon.find(".flder").prepend(lastItem);
		vcon.css("margin-left",offset);
		vcon.animate({marginLeft:"0px"},"slow")
	});
});

/*  
	jquery用到的属性

	find 搜索所有与指定表达式匹配的元素。这个函数是找出正在处理的元素的后代元素的好方法。
	stop 停止所有在指定元素上正在运行的动画。如果队列中有等待执行的动画(并且clearQueue没有设为true)，他们将被马上执行

	animate(params,[speed],[easing],[fn])  用于创建自定义动画的函数
		params:一组包含作为动画属性和终值的样式属性和及其值的集合
		speed:三种预定速度之一的字符串("slow","normal", or "fast")或表示动画时长的毫秒数值(如：1000)
		easing:要使用的擦除效果的名称(需要插件支持).默认jQuery提供"linear" 和 "swing".
		fn:在动画完成时执行的函数，每个元素执行一次。

	offset   获取匹配元素在当前视口的相对偏移。
	first    获取第一个元素
	append   向每个匹配的元素内部追加内容。


	last      获取最后个元素
	prepend   向每个匹配的元素内部前置内容。这是向所有匹配元素内部的开始处插入内容的最佳方式。




*/