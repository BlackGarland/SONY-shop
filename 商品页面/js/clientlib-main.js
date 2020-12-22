eval(function (p, a, c, k, e, r) {
	e = function (c) {
		return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
	};
	if (!''.replace(/^/, String)) {
		while (c--) r[e(c)] = k[c] || e(c);
		k = [function (e) {
			return r[e]
		}];
		e = function () {
			return '\\w+'
		};
		c = 1
	};
	while (c--)
		if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
	return p
}('$.17.15=6(a){7.1e(6(){R.1c(7,a)});9 7};6 R(f){4 g=$(7),8=z,r=[],t=z,u=z,5=$.1n({X:"> 1a",Q:"*",D:"1j",L:1o,S:$.w,V:$.w,W:$.w,J:$.w,Z:$.w},f);4 h=3,P=19;4 i=6(e){r.1d({x:e.1f,y:e.1k});2(r.N>h){r.1p()}};4 j=6(){2(u){T(u)}2(5.Z(7)){2(8){5.J(8)}8=z}};4 k=6(){2(u){T(u)}5.S(7);n(7);4 a=$(7).C(".1b").G(Y),M=$(7).C(".M").G(Y),10=a+M;2(10>1g){$(7).C(".1h").1i()}},O=6(){5.V(7)};4 l=6(){m(7)};4 m=6(a){2(a==8){9}2(8){5.J(8)}5.W(a);8=a};4 n=6(a){4 b=o();2(b){u=1q(6(){n(a)},b)}K{m(a)}};4 o=6(){2(!8||!$(8).16(5.Q)){9 0}4 c=g.18(),F={x:c.s,y:c.H-5.L},I={x:c.s+g.U(),y:F.y},E={x:c.s,y:c.H+g.G()+5.L},B={x:c.s+g.U(),y:E.y},q=r[r.N-1],p=r[0];2(!q){9 0}2(!p){p=q}2(p.x<c.s||p.x>B.x||p.y<c.H||p.y>B.y){9 0}2(t&&q.x==t.x&&q.y==t.y){9 0}6 A(a,b){9(b.y-a.y)/(b.x-a.x)};4 d=I,v=B;2(5.D=="s"){d=E;v=F}K 2(5.D=="1l"){d=B;v=E}K 2(5.D=="1m"){d=F;v=I}4 e=A(q,d),11=A(q,v),12=A(p,d),13=A(p,v);2(e<12&&11>13){t=q;9 P}t=z;9 0};g.14(j).C(5.X).1r(k).14(O).1s(l);$(1t).1u(i)};', 62, 93, '||if||var|options|function|this|activeRow|return||||||||||||||||prevLoc|loc|mouseLocs|left|lastDelayLoc|timeoutId|increasingCorner|noop|||null|slope|lowerRight|find|submenuDirection|lowerLeft|upperLeft|outerHeight|top|upperRight|deactivate|else|tolerance|subLinkList|length|mouseleaveRow|DELAY|submenuSelector|init|enter|clearTimeout|outerWidth|exit|activate|rowSelector|true|exitMenu|subHeight|increasingSlope|prevDecreasingSlope|prevIncreasingSlope|mouseleave|menuAim|is|fn|offset|300|li|subContentList|call|push|each|pageX|310|subBanner|hide|right|pageY|below|above|extend|75|shift|setTimeout|mouseenter|click|document|mousemove'.split('|'), 0, {}))
$(function () {

	var Wwidth = $(window).width()
	Wheight = $(window).height(),
		Swidth = screen.width,
		Sheight = screen.height,
		Wrfn = $('#RightFixNav').width(),
		Hrfn = $('#RightFixNav').height(),
		qsn = (Wwidth - 1200) / 2 - Wrfn - 20,
		sTop = $(window).scrollTop(),
		rfan = $("#RightFixNav ul li a");

	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

	//mobile
	if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		//mobilestyle

		$('body,html').addClass('mobile');
		$('#ViceNav,#RightFixNav').remove();
		$('#kvArea .swiper-container').css({
			'width': '100%',
			'height': '950px'
		})
		$('.swiper-container .swiper-slide').css({
			'width': '100%',
			'height': '950px',

		})
		$('.BottomBar ul li:last').addClass('rboder')
		$('.BottomBar ul li').eq(2).addClass('tlboder')
		$('.BottomBar ul li').eq(3).addClass('tlboder')
		
		
		
		$(".status-bar .status-button").each(function(){
			$(this).attr("href",$(this).attr("mlink"));
		})
		
		$(".BlockBottom").each(function(){
			if($(this).find("ul li").length == 0){
				$(this).hide();
			}
		})
		
		$(".status-bar .status-link").each(function(){
			$(this).attr("href",$(this).attr("mlink"));
		})
		

		
	} else {
		//PC&ipad 
		if($("body").hasClass('homepage')){
			//$('#ViceNav').show();
					/*$(".block-item>div").bind("mouseenter",function(){
			$(this).addClass("active");
		})
		
		$(".block-item>div").bind("mouseout",function(){
			$(this).removeClass("active");
		})*/
		}

		$('#headerNavMain').show();
		//righthav
		rfan.each(function () {
			var el = $(this);
			el.bind('click', function () {
				var elclass = el.attr('class');
				var tOt = $('#' + elclass).offset().top;
				$('body,html').animate({
					scrollTop: tOt - 50
				}, 700);

			})
		})

		function checkttp() {
			var sTop = $(window).scrollTop();
			for (var i = 0; i < $('.ProductBlock').length; i++) {
				var pbt = $('.ProductBlock').eq(i).offset().top;
				var block = $('.ProductBlock').eq(i).attr("id");
				if (sTop >= pbt - 400) {
					$("#RightFixNav ul li").find('.Rtitle').removeClass('actived');
					$("#RightFixNav ul li").eq(i).find('.Rtitle').addClass('actived');
				}
			}
		}


		window.onscroll= function () {
			var sTop = document.documentElement.scrollTop||document.body.scrollTop;

			checkttp()


			if ($(window).scrollTop() > 1500) {
				$("#RightFixNav").stop(true).show();
			} else {
				$("#RightFixNav").stop(true).hide();
			}
			$(".autosuggestion-search").hide()
			$(".recommend").hide()
			if($("body").hasClass('homepage')){
				if ($(window).scrollTop() > 400) {
					$("#ViceNav").stop().show();
	//				 if(index > -1){
	//					 	var temp =  $("#headerNavMain .autosuggestion-search li").clone()
	//					 	$("#ViceNav .autosuggestion-search").html(temp)
	//					 	$("#headerNavMain .autosuggestion-search").hide()
	//					 	$("#ViceNav .autosuggestion-search").show()
	//		                $("#ViceNav .autosuggestion-search li").removeClass("select_on")
	//		                $("#ViceNav .autosuggestion-search li").eq(index).removeClass("select_off").addClass("select_on")
	//		                
	//		            }else  if(recommendHeaderIndex>-1){
	//						$("#ViceNav .recommend li").removeClass("select_on")
	//						$("#ViceNav .recommend li").eq(recommendHeaderIndex).removeClass("select_off").addClass("select_on")
	//		            }
				} else {
					$("#ViceNav").stop().hide();
	//				if(index > -1){
	//					var temp =  $("#ViceNav .autosuggestion-search li").clone()
	//				 	$("#headerNavMain .autosuggestion-search").html(temp)
	//				 	$("#ViceNav .autosuggestion-search").hide()
	//					$("#headerNavMain .autosuggestion-search").show()
	//		            $("#headerNavMain .autosuggestion-search li").removeClass("select_on")
	//	                $("#headerNavMain .autosuggestion-search li").eq(index).removeClass("select_off").addClass("select_on")
	//		        }else if(recommendHeaderIndex>-1){
	//		            $("#headerNavMain .recommend li").removeClass("select_on")
	//					$("#headerNavMain .recommend li").eq(recommendHeaderIndex).removeClass("select_off").addClass("select_on");
	//		        } 
				}
			}
			$(".autosuggestion-search li").removeClass("select_on")
			$(".recommend li").removeClass("select_on")
			$(".textInput").blur()
			headerIndex = -1
			recommendHeaderIndex=-1
		}
		if ($(window).scrollTop() > 969) {
			$("#RightFixNav").stop(true).show();
		} else {
			$("#RightFixNav").stop(true).hide();
		}
		
		var newsArray = $(".BottomNews li");
		for(var i =0;i<newsArray.length;i++){
			var date= newsArray.eq(i).find("span").text();
			var title = newsArray.eq(i).find("div").text();
			var linkurl = newsArray.eq(i).find("a").attr("href");
			$(".new-menu .news-scroll1").append('<a href="'+linkurl+'" class="news-item" title="'+title+'"><div class="news-date">'+date+'</div><div class="news-topic">'+title+'</div></a>')
			$(".new-menu .news-scroll2").append('<a href="'+linkurl+'" class="news-item" title="'+title+'"><div class="news-date">'+date+'</div><div class="news-topic">'+title+'</div></a>')
		}
		if($("body").hasClass("homepage")){
			var box = document.getElementById("news-item-con");
			var l1 = document.getElementById("news-scroll1");
			var l2 = document.getElementById("news-scroll2");
			autoScroll();
			
			function autoScroll() {
				if (l1.offsetHeight > box.offsetHeight) {
					scrollMove = setInterval(scrollup, 150);//数值越大，滚动速度越慢
					box.onmouseover = function () {
						clearInterval(scrollMove)
					}
				}
			}
			function scrollup() {
				//滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
				if (box.scrollTop >= l1.offsetHeight) {
					box.scrollTop = 0;
				} else {
					box.scrollTop++;
				}
			}
			//鼠标离开时，滚动继续
			box.onmouseout = function () {
				scrollMove = setInterval(scrollup, 150);
			}
		}
		


	}
	
	$(".news-title").bind("click",function(){
		$('html,body').animate({ scrollTop: $(".BottomNews").offset().top - 100 }, 500)
	})
	
	$('.ProductBlock .BlockBottom').each(function () {
		var ulr = $(this).find('ul');
		//console.log(ulr.length)
		if (ulr.length == 0) {
			$(this).html('').css({
				"background": 'none',
				"border": "none",
				'margin': 0,
				"padding-top": '10px'
			})
		}
	})

	if (Swidth < 1366) {
		$('#RightFixNav').css({
			'margin-top': -Hrfn / 2,
			'right': 0
		})
	} else {
		$('#RightFixNav').css({
			'margin-top': -Hrfn / 2,
			'right': qsn
		})
	}


	if (Swidth < 1200 && Swidth > 767 || bIsIpad || bIsMidp) {
		$('#RightFixNav').remove();
		$('body').addClass('w1024');
		$('.product_img0 img').addClass('w100');

		$('#kvArea .swiper-container').css({
			'width': '100%',
			'height': '700px'
		})
		$('.swiper-container .swiper-slide').css({
			'width': '100%',
			'height': '700px'
		})

	}





	$('.bigblock').hover(function () {
		var el = $(this);
		if (el.hasClass('myself')) {

		} else {
			var wpH = el.height();
			var txt3 = el.find('.txt h3').html();
			el.find('.wordlayer p').html(txt3)
			el.find('.wordlayer p').css({
				'paddingTop': wpH / 2
			})
		}
	})

	var $menu = $("#NavMainList");
	$menu.menuAim({
		activate: activateSubmenu,
		deactivate: deactivateSubmenu
	});

	function activateSubmenu(row) {
		var $row = $(row),
			$submenu = $row.children("div"),
			height = $menu.outerHeight(),
			width = $menu.outerWidth();
		$submenu.css({
			display: "block",
			top: 0,
			left: width,
			height: height
		});

	}

	function deactivateSubmenu(row) {
		var $row = $(row),
			$submenu = $row.children("div");
		$submenu.css("display", "none");

	}



	$('.BottomBar ul li').each(function () {
		$(this).hover(function () {
			$(this).find('img.normal').hide();
			$(this).find('img.on').show();
		}, function () {
			$(this).find('img.normal').show();
			$(this).find('img.on').hide();
		})
	})


	//不同分辨率的KV尺寸	 
	if (Swidth >= 1440 && Swidth <= 1600) {
		$('#kvArea .swiper-container').css({
			'width': '100%',
			'height': '720px'
		})
		$('.swiper-container .swiper-slide').css({
			'width': '100%',
			'height': '720px'
		})
	} else if (Swidth > 1600) {
		$('#kvArea .swiper-container').css({
			'width': '100%',
			'height': '720px'
		})
		$('.swiper-container .swiper-slide').css({
			'width': '100%',
			'height': '720px'
		})
	} else if (Swidth > 1024 && Swidth < 1280) {
		$('#kvArea .swiper-container').css({
			'width': '100%',
			'height': '600px'
		})
		$('.swiper-container .swiper-slide').css({
			'width': '100%',
			'height': '600px'
		})
	} else if (Swidth > 1280 && Swidth < 1440) {

		$('#kvArea .swiper-container').css({
			'width': '100%',
			'height': '600px'
		})
		$('.swiper-container .swiper-slide').css({
			'width': '100%',
			'height': '600px'
		})
	} else if (Swidth <= 1024 && Swidth >= 1000) {
		$('#kvArea .swiper-container').css({
			'width': '100%',
			'height': '750px'
		})
		$('.swiper-container .swiper-slide').css({
			'width': '100%',
			'height': '750px'
		})
	}
	
	$(".backtohead").bind("click",function(){
			$('html,body').animate({scrollTop:0},300); 
		}
	)
});
