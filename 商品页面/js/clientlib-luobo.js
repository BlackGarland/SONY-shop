// JavaScript Document
var sliceVideo=[
	{tag:"风光",timeStart:"00:00",timeEnd:"00:10"},
	{tag:"人像",timeStart:"00:11",timeEnd:"00:20"},
	{tag:"环境",timeStart:"00:21",timeEnd:"00:30"}
];
function gotoCur(num){
	var transitionX = num * 69.5;
	$(".v_cur").css("transform","translate("+transitionX+"px,0px)"); 
}
function convertM(s){
	var s = s.split(":");
	var ftm = parseInt(s[0])*60;
	var mm = parseInt(s[1]);
	var total = ftm+mm;
	return total;
}
function justyVideo(time,$th){
	var start = convertM($th.data("timestart"));
	//var end = convertM($th.data("timeend"));
	if(time >= start){
		if(!$th.hasClass("von")){
			var index = $th.index();
			$th.siblings().removeClass("von");
			$th.addClass("von")
			gotoCur(index,$th);			
		}		
	}
}
(function($){
    $.fn.lunbo = function(opt){
        var options = $.extend({},$.fn.lunbo.defaults,opt);
        return this.each(function(){
            var current=0;
            var maxlen=0;
            var splinum=6;
            var $mwrap = $(this).find(".M_pro");
			var icon = $(this).find(".M_pro").attr("icon") !== undefined ? $(this).find(".M_pro").attr("icon") : null;
            var $left =$(this).find(".scroll_leftsliders");
            var $right =$(this).find(".scroll_rightsliders");
            var $ul = $(this).find(".S_productlists ul");
            var maxlen = $ul.find("li").size();
            var itemw = $ul.find("li").eq(0).outerWidth(true);
            var supportV = !!(document.createElement('video').canPlayType);
            var vReg = /\w*\.m|M\w+$/i;
            function setVideo(th){
                var bigImage =th.data("img");
                var mp4 = th.data("mp4");
				var back = th.data("back");
                var links = th.data("url");
                var target = th.data("target");
				var index = $ul.find("li").index(th);
                if(typeof mp4 != "undefined"){
					$(".skin").bind("click",function(e){
						e.preventDefault();
						$(".vplay").trigger("click");
					})
                    if(supportV){
                    var wv = "<video style='display:none;' class='"+back+"' src='"+mp4+"' id='tvideo' loop='loop' preload controls ></video><a href='javascript:void(0)' class='vplay'>鎾斁</a><div class='b_imgs'><img src='"+bigImage+"'>"+ (index == 0 && icon != null ? '<img class="icon" src="'+ icon +'">' : "") + "</div>";
                    var closehtml = "<img class='video-close' src='/etc/designs/sonystyle/images/video-close.png'>";
					$mwrap.html(wv);
					/*var vnav ="";
					if(sliceVideo.length > 0){
						vnav +="<div class='vnav'><div class='vnam'>";
						for(var i in sliceVideo){
							if(i == 0 ){
								vnav += "<a href='javascript:void(0)' data-timestart='"+sliceVideo[i].timeStart+"'  data-timeend='"+sliceVideo[i].timeEnd+"' class='von' >"+sliceVideo[i].tag+"</a>"
							}else{						
								vnav += "<a href='javascript:void(0)' data-timestart='"+sliceVideo[i].timeStart+"'  data-timeend='"+sliceVideo[i].timeEnd+"' >"+sliceVideo[i].tag+"</a>"
							}							
						}
						vnav +="<div class='v_cur'></div></div></div>";
					}
					$mwrap.html(wv+vnav);*/
					
					var vnavhtml = $(".vnam a").length > 0 ? $(".vnav").prop("outerHTML") : "";
					$(".vnav").remove();
					$mwrap.html(wv+vnavhtml);
					$(".vnav").show();
                    var vdio = document.getElementById("tvideo");
					$mwrap.append(closehtml);
					$("video").bind("mouseenter",function(){
						if($(this).hasClass("fixed")){
							$(".video-close").show();
							$(".video-close").bind("click",function(){
								vdio.pause();
								$(".vplay,.b_imgs").show();
								vdio.style.display = "none"
								$(".video-close").hide();
							})
						}
					})
                    $(".vplay").unbind("click").click(function(){
						/*var s=s_gi('sonycnstyle');
						s.linkTrackVars='eVar11';
						s.eVar11='product:video:'+$(".bread_banner").attr("sku");
						s.tl(this,'o','product:video:click:'+$(".bread_banner").attr("sku"));*/
                        $(".vplay,.b_imgs").hide();
                        $("#tvideo").show();
                        vdio.play();
                         
                        })
					vdio.addEventListener("timeupdate",function(){
						var time = Math.floor(vdio.currentTime);
						if(sliceVideo.length > 0){
						$(".vnav a").each(function(index, element) {
                            justyVideo(time,$(this));
                        });
						}
						})	
                    vdio.addEventListener("ended",function(){
                        $(".vplay,.b_imgs").show();
                        $("#tvideo").hide();
                        //vdio.currentTime = 0;
                        })
					$(".vnav a").click(function(){
						var time = convertM($(this).data("timestart"));
						vdio.currentTime = time;
						$(".vplay,.b_imgs").hide();
						$("#tvideo").show();
						vdio.play();
						var s=s_gi('sonycnstyle');
						s.linkTrackVars='eVar11';
						s.eVar11='product:video_switch:'+$(".bread_banner").attr("sku");
						s.tl(this,'o','product:video:switch:'+$(".bread_banner").attr("sku")+":"+$(this).text());		
						
						})	
                    }else{
                        $mwrap.html("<img src=\""+bigImage+"\">" + (index == 0 && icon != null ? '<img class="icon" src="'+ icon +'">' : ""));    
                         
                        }
                         
                     
                     
                    }else{
						$(".skin").unbind("click");
                        if(typeof links !='undefined' && links != '#'){
							$mwrap.html("<img src=\""+bigImage+"\">" + (index == 0 && icon != null  ? '<img class="icon" src="'+ icon +'">' : ""));
							$(".skin").attr("href",links);
							$(".skin").attr("target",target);
						}
						else{
							console.log("<img src=\""+bigImage+"\">" + (index == 0 && icon != null  ? '<img class="icon" src="'+ icon +'">' : ""));
							$mwrap.html("<img src=\""+bigImage+"\">" + (index == 0 && icon != null  ? '<img class="icon" src="'+ icon +'">' : ""));
						}
                         
                        }
                 
                 
                 
                 
                 
                 
                }
             
             
             
             
            function setLu(){
                $ul.width(itemw*maxlen);
                $ul.find("li").eq(0).addClass("actives");
                /*var url =  $(".M_pro img").eq(0).attr("link");
                var target =  $(".M_pro img").eq(0).attr("target");
				$(".M_products .skin").attr("href",url);
				$(".M_products .skin").attr("target",target);*/
                setVideo($ul.find("li").eq(0))
                //var bigImage =     $ul.find("li").eq(0).data("img");
                //$mwrap.html("<img src=\""+bigImage+"\">");      
				if($(".M_products .skin img").length > 0){
						$(".M_pro .icon").addClass("hasSkin");
					}
                }
            function goto(num){
                 
					$ul.find("li").removeClass("actives");
					$ul.find("li").eq(num).addClass("actives");
					current = num;
					if(num >= splinum ){
						$ul.animate({"marginLeft":-1*(num+1-splinum)*itemw+"px"})
					}else{
						$ul.animate({"marginLeft":"0px"})   
					}
					setVideo($ul.find("li").eq(num));   
		 
                         
                }   
            function showSkin(index){
				if(index == 0){
					$(".M_products .skin img").show();
					$(".M_products .skin p").show();
					if($(".M_pro .icon").length > 0){
						$(".M_pro .icon").addClass("hasSkin");
					}
				}
				else{
					$(".M_products .skin img").hide();
					$(".M_products .skin p").hide();
				}
			}     
            function initEvents(){
                $right.unbind("click").click(function(){
                    current ++;
                    if(current > (maxlen-1)){
                        current = maxlen-1;
                        return false;
                         
                        }
                     
                    goto(current);
                     showSkin(current);
                    })
                $left.unbind("click").click(function(){
                    current --;
                    if(current < 0){
                        current = 0;
                        return false;
                        }
                    goto(current);
                     showSkin(current);
                    })  
                     
                $ul.find("li").click(function(){
                    var index = $(this).index();
                    goto(index);
					showSkin(current);
                    })  
                     
                 
                 
                 
                }       
            function init(){
                 
                setLu();
                initEvents();
                 
                }
             
             
             
             
             
             
             
             
            init();
             
             
             
            })  
         
         
         
         
         
        }
     
    $.fn.lunbo.defaults = {
         
         
         
         
        }
     
     
     
    })(jQuery)
     
     
function rcmd (id){
    this.current = 3;
    this.limit = 4;
    this.wrap = $("#"+id);
    this.animz = this.wrap.find("ul");
    this.anili = this.animz.find("li");
    this.size = this.animz.find("li").size();
    this.prev = this.wrap.find(".tleft");
    this.next = this.wrap.find(".tright"); 
    this.lw = this.animz.find("li").outerWidth(true);
     
    }   
rcmd.prototype.gotoA = function(num){
      if(num > (this.limit -1)){
          var ww = -1*(num-this.limit+1)*this.lw;
          this.animz.animate({"marginLeft":ww+"px"});
           
          }else{
          this.animz.animate({"marginLeft":"0px"});
           
          } 
    }
rcmd.prototype.gotoLeft =function(){
    this.current --;
    if(this.current < 3 ){
        this.current = 3;
        }
    this.gotoA(this.current);
     
    }
rcmd.prototype.gotoRight =function(){
    this.current ++;
    if(this.current >  (this.size-1) ){
        this.current = this.size-1;
        }
    this.gotoA(this.current);
     
    }   
     
         
rcmd.prototype.init = function(){
    var th = this;
    if(th.size > th.limit){
        th.prev.css("display",'block');
        th.next.css("display",'block');
        th.prev.click(function(){
            th.gotoLeft();
            })
        th.next.click(function(){
            th.gotoRight();
            })  
         
        }
     
     
     
    }
     
     
function spec(id) {
    this.current = 0;
    this.limit = 3;
    this.wrap = $("#" + id);
    this.animz = this.wrap.find("ul");
    this.anili = this.animz.find("li");
    this.size = this.animz.find("li").size();
    this.prev = this.wrap.find(".tv_prev");
    this.next = this.wrap.find(".tv_next");
 
}
spec.prototype.gotoA = function(num) {
    this.animz.animate({
        "marginLeft": (-1 * num) * 285 + "px"
    });
    $(".items ul").animate({
        "marginLeft": (-1 * num) * 290 + "px"
    });
}
spec.prototype.gotoLeft = function() {
    this.current--;
    if (this.current < 0) {
        this.current = 0;
    }
    this.gotoA(this.current);
 
}
spec.prototype.gotoRight = function() {
    this.current++;
    if (this.current > (this.size - this.limit)) {
        this.current = this.size - this.limit;
    }
    this.gotoA(this.current);
 
}
spec.prototype.init = function() {
    var th = this;
    if (th.size > th.limit) {
        th.prev.click(function() {
            th.gotoLeft();
        })
        th.next.click(function() {
            th.gotoRight();
        })
 
    }
 
 
 
}  
