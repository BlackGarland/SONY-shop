$(function(){
	$(".qrcodea").hover(function(){
		$(".qrcode_z").show();
		
		},function(){
		$(".qrcode_z").hide();
		})


       /* $(".zhankai").click(function () {
            $(".cs_zk").css("display","block");
            $(".zhankai").css("display","none");
        });*/
		// $(".Prolist_pros").lunbo();

		$(".pl_txt2").click(function () {
			$(".pingluna").hide();
			$(".fbpl").show();
		})
		$(".tjpl").click(function () {
			$(".fuceng_bg").show()
		})
		$(".t_close").click(function () {
			$(".fuceng_bg").hide()
		})
		if($("#pro_fix").length == 1){
			$(window).scroll(function(){
				var toTopHeight = $("#pro_fix").offset().top;
				//var toBottomHeight = $(".pro_cuxiao").offset().top; /*20131025j*/
				//if ($(window).scrollTop() >= toTopHeight && $(window).scrollTop() <= toBottomHeight-toHeight) {/*20131025j*/
				if ($(window).scrollTop() >= toTopHeight ) { /*20131025j*/
				  $(".scrollBar").addClass("nav_fixed");
				  $(".M_pro video").addClass("fixed");
				  if($(".M_pro video").css("display") != "none"){
					 $(".video-close").show(); 
				  } 
				} else{
				  $(".scrollBar").removeClass("nav_fixed");
				  $(".video-close").hide();
				  $(".M_pro video").removeClass("fixed");
				};
			});
		}

		
		if($(".top_bar .product_navs li").length == 0){
			$(".top_bar").hide();
		}
		
		if($(".gotocaschmodel").length > 0){
			var modelname = $("input[name='category']").val() == 'BRAVIA' ? $("input[name='eVar37']").val() : $("input[name='eVar42']").val()
			/*$.get(_api.caschAPI.getModelPath(modelname), function (data) {
				if (data.result && data.code == '00') {
					for(var i =0;i<data.returnData.Data.length;i++){
						if(data.returnData.Data[i].enName == modelname){
							var modelpath = data.returnData.Data[i].path;
							$.get(_api.caschAPI.getModelURL(modelpath), function (rtn) {
								if (rtn.result && rtn.code == '00') {
									var path = rtn.returnData.path;
									$(".gotocaschmodel").attr("href",path);
								}
							})
						}
					}
				}
			})*/
			if($(".gallery-service").length > 0){
				var path = $(".gallery-service").attr("href");
				$(".gotocaschmodel").attr("href",path);
				$(".gotocaschmodel").bind("click",function(){
					var s=s_gi('sonycnstyle');	
					s.tl(this,'o',modelname + "|" + path);		
				})
				
				$(".gallery-service").bind("click",function(){
					var s=s_gi('sonycnstyle');	
					s.tl(this,'o',modelname + "|" + path);		
				})
			}

		}
})
