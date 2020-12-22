$(document).ready(function(){
	$("a").each(function(){
		var h = $(this).attr("href");
		if(h!==undefined){
			var ds = h.split("?");
			var _this = $(this);
			if(ds.length>0){
				if(h.indexOf("common/redirect")>=0){
					var d = h.split("redirect.html?")[1].replace("url=","");
					_this.attr("href","javascript:void(0)");
					var t = _this.attr("target");
					_this.attr("target","");
					var oc = _this.attr("onclick");
					if(oc != null){
						_this.attr("onclick",oc + ';popupredirect("'+ d +'","'+t+'");return false;')
					}else{
						_this.attr("onclick",'popupredirect("'+ d +'","'+t+'");return false;')
					}
					
				}
			}
		}
	})
})
var popupredirect = function(url,target){
	$(".redirectpop").bPopup({
		autoClose: 3000,
		onOpen:function(){
			setTimeout(function(){
				var $a = $('<a href="'+ url +'" target="'+ target +'"></a>').appendTo('body');
				$a[0].click();
				$a.remove();
			},3000)
		}
	})
}
function startRequest(url, divs) {
	var xmlHttp;
	var isie = false;
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		isie = true;
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
	try {
		if (isie == false) {
			xmlHttp.open("GET", url, false);
			xmlHttp.overrideMimeType("text/html;charset=utf-8");
			xmlHttp.send(null);
			var xchange = xmlHttp.responseText
			document.getElementById(divs).innerHTML = xchange;

		} else {
			xmlHttp.open("GET", url, false);
			var uuu = url;
			xmlHttp.send(null);
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200 || xmlHttp.status == 0) {
					//  document.getElementById(divs).innerHTML=replace( Recenspace(xmlHttp.responseBody).toString() ,"img","jpg");
					var html = $.ajax({
						url: uuu,
						async: false
					}).responseText;
					var xchange = html;
					document.getElementById(divs).innerHTML = xchange;
				}
			}
		}
	} catch (exception) {
		document.write('exception:' + exception.message);
	}
}
var setChatCallBack = function(){
    xn("setCallback", [{
        type: "loadUIScript",
        func: function() {
            NT_UI.addTabData([
                {
                    name: '重新选择咨询类型', 
                    id: -1, 
                    url:'/content/dam/sonystyle-wechat/index.html#/PreChat?eightD=' + ($("input[name=sku]").val() !== undefined && $("input[name=sku]").val() != '' ? $("input[name=sku]").val() : "") + "&fromPc=true", 
                    onoff: 1, 
                    type: "url"
                }
            ]);
        }
    }]);
	}
var setRecommend = function(){
	//推荐产品
//获取cookie，将cookie中的所有品类和相对应的分数放入cookieCat中
	var cookieCat =[];
	var maxScore =0;
	var sameMax = 0;
	var scoreCookie = $.cookie("score");
	if(scoreCookie !== undefined){
		if(scoreCookie.split(",").length >1){
			for(var i =0;i<scoreCookie.split(",").length;i++){
				if(i != 0){     //第一个是时间戳
					var oneCat ={}
					oneCat.cat = scoreCookie.split(",")[i].split(":")[0];
					oneCat.score = scoreCookie.split(",")[i].split(":")[1];
					cookieCat.push(oneCat);
				}
			}
			
			//循环new-hidden
			$(".recommon-product-hidden .new-hidden").each(function(){
				var kScore =0;
				
				//循环cateList，获取每个catList中所有对应的category分数加起来
				$(this).find(".catList").each(function(i,e){
					var cat = $(e)[0].innerHTML;
					for(var k=0;k<cookieCat.length;k++){
						if(cat == cookieCat[k].cat){
							kScore+= parseInt(cookieCat[k].score);
						}
					}
				})
				
				//判断如果大于最大分数，将之前元素的swiper-container2 class去除，重新赋值给当前最大分的元素
				if(kScore>maxScore){
					$(".recommon-product-hidden .new-hidden").removeClass("usedMenu");
					$(this).addClass("usedMenu");
					maxScore = kScore;
					kScore = 0;
				}else if(kScore == maxScore){
					$(".recommon-product-hidden .new-hidden").removeClass("usedMenu");
					sameMax = maxScore;
					kScore = 0;
				}else{
					kScore = 0;
				}
			})
			if(maxScore>0 && maxScore!=sameMax){
				getData();
			}else{
				$(".recommon-product-hidden .new-hidden").each(function(){
					//循环cateList
					$(this).find(".catList").each(function(i,e){
						var cat = $(e)[0].innerHTML;
						if(cat == "common"){
							$(e).parent().parent().addClass("usedMenu");
							getData();
						}
					})
				})
			}
		}
		
	}else{
		$(".recommon-product-hidden .new-hidden").each(function(){
			//循环cateList
			$(this).find(".catList").each(function(i,e){
				var cat = $(e)[0].innerHTML;
				if(cat == "common"){
					$(e).parent().parent().addClass("usedMenu");
					getData();
				}
			})
		})
	}
	function getData(){
		var data={};
		var eightds=[];
		var titles=[];
		var images=[];
		var links=[];
		var alts=[];
		var subtitles=[];
		$(".recommon-product-hidden .usedMenu").find(".product-item").each(function(){
			
			var eightd = $(this)[0].getAttribute("eightd");
			var title = $(this)[0].getAttribute("title");
			var subtitle = $(this)[0].getAttribute("subtitle");
			var image = $(this)[0].getAttribute("image");
			var alt = $(this)[0].getAttribute("alt");
			var link = $(this)[0].getAttribute("link");
			$(".recommon-product .category-content-wrap").append("<div class='imgBox'>"+
					"<a class='' href='"+ link+"'>"+
						"<div class='img'>"+
							"<img src='https://www.sonystyle.com.cn"+ image+"' title='"+alt+"' alt='"+alt+"'>"+
						"</div>"+
						"<div class='text'>"+
							"<span class='title' title='"+title+"'>"+title+"</span>"+
							"<span class='subtitle' title='"+subtitle+"'>"+subtitle+"</span>"+
						"</div>"+
					"</a>"+
			"</div>")

		})

	}


}
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}	
var includeJS = function (jsPath,id,callback) {
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", jsPath);
	script.setAttribute("id", id !== undefined ? id : '');
	document.getElementsByTagName("head")[0].appendChild(script);
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            if(callback !== undefined){
				callback();
            }

        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState == 'loaded') {
                if(callback !== undefined){
					callback();
            	}
            }
        });
    }
}

if (document.getElementById("header_con") != null) {
	startRequest('/content/sonystyle/common/header.html', 'header_con');
    includeJS("/etc/designs/sonystyle/clientlib-jquery-cookie.js",null,function(){setRecommend();});
	includeJS("/etc/designs/sonystyle/clientlib-popup.js",null,function(){
		if(getUrlParam('chat') == 'true'){
	        if (localStorage.access_token !== undefined && localStorage.access_token != "") {
				$(".chat-landing").bPopup();
			}
		}
	});
	includeJS("/etc/designs/sonystyle/clientlib-api.js");
	includeJS("/etc/designs/sonystyle/clientlib-mixin.js");
    includeJS("//sh-v1-n2-visitor.ntalker.com/visitor/js/xiaoneng.js?siteid=kf_20100",'xiaonengjs',function(){xn('stopAutoInit');setChatCallBack();});


    setTimeout(function(){
		includeJS("/etc/designs/sonystyle/clientlib-minicart.js");
		includeJS("/etc/designs/sonystyle/clientlib-member.js");
    },500)
}
$(function(){
    if (document.getElementById("header_con") == null) {
        xn('stopAutoInit');
        setChatCallBack();
        setRecommend();
    }
})




if (document.getElementById("footer_con") != null) {
	startRequest('/content/sonystyle/common/footer.html', 'footer_con');
	includeJS("/etc/designs/sonystyle/clientlib-category-footer.js");
}

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
		$('body,html').addClass('mobile');
		$('#headerNavMain').remove();
		//mobileNav
		var self = this;
		self.menu = $(".menu-btn a").eq(0);
		self.menuBlock = $("#menu-block");
		self.backLink = self.menuBlock.find(".backNav");
		self.subList = self.menuBlock.find(".subList");

		self.resizeNav = function () {
			self.menuBlock.find("ul").css("width", Wwidth);
		}

		self.key = false;
		self.navNum = 0;

		self.linkBind = function () {
			var a = self.menuBlock.find("a");
			a.each(function (index, el) {
				var b = $(el).next("ul");
				if (b.length) {
					$(el).bind("click", function () {
						self.navNum++;
						$(this).next().css("left", Wwidth).show();
						$("#menu-block").css("left", self.navNum * Wwidth * -1);
					})
				}
			})
		}
		self.backLink.each(function (index, el) {
			$(el).bind("click", function () {
				self.navNum--;
				$("#menu-block").css("left", self.navNum * Wwidth * -1);
				$(self.subList[index]).hide();
				return false;
			})
		})
		self.menu.bind("click", function () {
			if (self.key) {
				self.menuBlock.css("left", 0).hide();
				self.menuBlock.find("ul").hide();
				self.navNum = 0;
			} else {
				self.menuBlock.show();
				self.menuBlock.children("ul").show();
			}
			self.key = !self.key;
			return false;
		})
		self.linkBind();
	} else {

	}

	


	//商品搜索框
	$(".recommend").hide();

	if (Wwidth > 1000) {
		$(window).resize(function () {
			var Wwidth = $(window).width();
			if (Wwidth < 1230) {
				$('#topRightNav').css({
					'margin-right': '120px'
				})
				$('.shoppingCartBlock').css({
					'margin-right': '145px'
				})
			} else {
				$('#topRightNav,.shoppingCartBlock').css({
					'margin-right': '0'
				})
			}
		})
	}

	if($("#header-index").length > 0){
		$("#myLoginWrap").hide();
	}
	
	

	
}
)

/******For Login Popup******/
$(function () {
	/*third party login*/
	$.urlParam=function(name){     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);     if (results == null){        return null;     }     else {        return decodeURI(results[1]) || 0;     } }

	var xdr= $.urlParam('code');
	//var xdr= new URLSearchParams(window.location.search).get("code");
	if(xdr){
		var dataInput = {
			"thirdParty":localStorage.getItem('thirdParty'),
			"authCode":xdr,
			"channel":"WEB"
		}
		$.ajax({
			url: "/eSolverOmniChannel/account/thirdPartyLogin.do",
			type:"POST",
			data: JSON.stringify(dataInput),
			/*data:dataInput,*/
			dataType:'json',
			contentType:'application/json; charset=UTF-8',
			async: false,
			/*crossDomain: true,*/
			success:function(response){
				if (localStorage.getItem('thirdParty')) {
					localStorage.removeItem('thirdParty');
				}
				if(response.resultMsg[0].code=='00'){

					localStorage.setItem('access_token',response.resultData.access_token);
					console.log("Successful login");
					var redirectUrlD=formatingRUrl();
					console.log("redirect url"+redirectUrlD);
					window.location.href = redirectUrlD;
                    //location.href = location.origin + location.pathname;
				}else{
					if(response.resultMsg[0].code=='99'){
						console.log(response.resultMsg[0].message);
                        if($('#myLoginWrap').is(":visible")){
                            $(".login_success").bPopup(function () {
                                $(".denglu").trigger("click");
                            })
                            $('.thirdPartylogErr').addClass("error_tip");
                            $('div.thirdPartylogErr').text(response.resultMsg[0].message);
                        }else{
                            $('.thirdPartyErr').addClass("error_tip");
                            $('div.thirdPartyErr').text(response.resultMsg[0].message);
                        }
						//alert(response.resultMsg[0].message);

					}else if(response.resultMsg[0].code=='97'){
						//$('.second_one').parent('.overlays').show();
						//capture response data and set its value,
						localStorage.setItem("thirdParty",response.resultData.thirdParty);
						localStorage.setItem("thirdPartyData",response.resultData.thirdPartyData);
						$('.valiz_noe').parent('.overlays').show();
					}
				}
			},error :function(err){
                if($('#myLoginWrap').is(":visible")){
                    $(".login_success").bPopup(function () {
                        $(".denglu").trigger("click");
                    })
                    $('.thirdPartylogErr').addClass("error_tip");
                    $('div.thirdPartylogErr').text("第三方平台暂无响应，请稍后再试");
                }else{
                    $('.thirdPartyErr').addClass("error_tip");
                    $('div.thirdPartyErr').text("第三方平台暂无响应，请稍后再试");
                }
				//console.log("somthing went wrong");


			}
		});
	}else{

	}
	$("#viceMinicart").bind("mouseenter", function () {
		$(this).addClass("hover");
		$("#viceMinicart .shoppingCartArea").show();
	})
	$("#viceMinicart").bind("mouseleave", function () {
		$(this).removeClass("hover");
		$("#viceMinicart .shoppingCartArea").hide();
	})
	
	
})
function formatingRUrl(){
	var params = {};
	var parts = location.search.substring(1).split('&');

	for (var i = 0; i < parts.length; i++) {
		var nv = parts[i].split('=');
		if (!nv[0]) continue;
		params[nv[0]] = nv[1] || true;
	}

	var awe=params.code;
	var aeet=params.state;
	var remavabledata="code="+awe+"&state="+aeet;
	var aplj=window.location.href;
	var ret = "";
	if(aplj.indexOf("code")-aplj.indexOf("?") == 1){
		ret="?"+remavabledata;
		ret = aplj.replace(ret,'');
	}else{
		ret="&"+remavabledata;
		ret = aplj.replace(ret,'');
	}
	return ret;
}
function showRecommend(_this) {
	$(_this).prop("placeholder","")
	var div = "#headerNavMain "
	if(window.location.href.indexOf("search.html") != -1){
		div = "#search_page "
	}
    var searchLength=$("#headerNavMain .autosuggestion-search").find("li").length;
	var searchLengthTwo=$("#ViceNav .autosuggestion-search").find("li").length;
	var val = $("#headerNavMain .search-input").val();
    var valTwo = $("#ViceNav .search-input").val();
	if ($(window).scrollTop() < 400){
		if ($(_this).parent().find(".recommend li").length && ($(div+" .autosuggestion-search li").length == 0 || ($(div+" .autosuggestion-search li").length != 0 &&  $(div+" .autosuggestion-search").css("display") == "none"))) {

            if(val.trim() != "" && searchLength > 0){
                  $("#headerNavMain .autosuggestion-search").show();
                }else{
                  $("#headerNavMain .recommend").show();
                }
		}
	}else{
		if ($(_this).parent().find(".recommend li").length && ($("#ViceNav .autosuggestion-search li").length == 0 || ($("#ViceNav .autosuggestion-search li").length != 0 &&  $("#ViceNav .autosuggestion-search").css("display") == "none"))) {

            if(valTwo.trim() != "" && searchLengthTwo > 0 ){
                  $("#ViceNav .autosuggestion-search").show();
                }else{
                  $("#ViceNav .recommend").show();
                }
		}

	} 
	/*else {
		$("#headerNavMain .recommend").hide()
	}*/
}

function showPlaceholder(_this){
	$(_this).prop("placeholder",$(_this).attr("kw"));
}

function selectRecommend(_this) {
	if(window.location.href.indexOf("search.html") == "-1"){
		window.location.href = $("#search_url").attr("href")+"?q="+$(_this).text();
	}
}

$(document).bind('click', function (e) {
	var e = e || window.event; //浏览器兼容性 
	var elem = e.target || e.srcElement;
	if (!elem.classList.contains("textInput") && elem.className != 'recommend') {
		$('.recommend').hide(); //点击的不是div或其子元素 
	}
	if (!elem.classList.contains("textInput") && elem.className != 'autosuggestion-search') {
		$('.autosuggestion-search').hide(); //点击的不是div或其子元素 
	}

});



var dochat = false;
var initXN = false;



var popupChat = function(channel){
	if (localStorage.access_token !== undefined && localStorage.access_token != "") {
		$.ajax({
			url: _api.HybrisAPI.readCart(localStorage.access_token),
			contentType: 'application/json; charset=UTF-8',
			type: 'post',
			async: false,
			dataType: 'json',
			success: function (data) {
				if($("input[name=sku]").length > 0){
					var jsonObj = {"uid":localStorage.customerID, "itemid":$("input[name=sku]").val() !== undefined && $("input[name=sku]").val() != '' ? $("input[name=sku]").val() : ""  }; 
				}
				else{
					var jsonObj = {"uid":localStorage.customerID}; 
				}
				if(!initXN){
					xn('init');
					initXN = true;
				}
				xn('setCustomerInfo',jsonObj)
				xn('setStaffserviceConfig',{custom:false})
				setChatCallBack();
				xn('openChat', channel !== undefined ? channel : 'kf_20100_template_9999')
				$(".chat-landing .b-close").trigger("click");
			},
			error:function(data){
				dochat = true;
				$(".logined").trigger("click")
			}
		})
											 
	}
	else{
		dochat = true;
		$(".logined").trigger("click")
	}
}

var popupLanding = function(type){
	if (localStorage.access_token !== undefined && localStorage.access_token != "") {
		$(".chat-landing").bPopup();
	}
	else{
		dochat = true;
		$(".logined").trigger("click")
	}
    var s=s_gi('sonycnstyle');
    s.linkTrackVars='eVar11';
    s.eVar11='product:webchat';
    s.tl(this,'o','product:webchat:'+type);
}

/* 转至内容js */
function setfixA(e){
	$(function(){
		document.onkeydown = function (e) {
			if (!e) e = window.event;
			if ((e.keyCode || e.which) == 13) {
				if(!$("#login").is(":visible") && $('#fixA').is(':visible')){
					$('#fixA').animate({
						'opacity':'0'
					})
				}
			}

		}
	})

}
$(function(){
	$('body').click(function(){
		$('#fixA').animate({
			'opacity':'0'
		})
	})
})
var tabFlag=false
function getFirstTab(e){
	document.onkeydown = function (e) {
		if (!e) e = window.event;
		if ((e.keyCode || e.which) == 9 && !$("#login").is(":visible")) {
			$(function(){
				$('#fixA').animate({
					'opacity':'1',
				})
			})
		}
	}
}
function blurFix() {
	$('#fixA').animate({
		'opacity':'0',
	})
}
getFirstTab();





