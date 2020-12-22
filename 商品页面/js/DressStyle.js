		var div1=document.getElementById("div_box-bottom-left-div-1");
		var div2=document.getElementById("div_box-bottom-left-div-2");
		var div3=document.getElementById("div_box-bottom-left-div-3");
		var div4=document.getElementById("div_box-bottom-left-div-4");
		var div5=document.getElementById("div_box-bottom-left-div-5");
		var wrap    = document.getElementsByClassName("wrap")[0];
        var smallImgBox = wrap.getElementsByClassName("imgBox")[0];//div1
        var smallImg = smallImgBox.getElementsByTagName("img")[0];//图片1
        var bigImgBox = wrap.getElementsByClassName("imgBox")[1];//div2
        var bigImg = bigImgBox.getElementsByTagName("img")[0];//图片2
        
		div1.onmouseover=function(){
			div1.style.border="1px solid #0a83d7";
			div2.style.border="1px solid #fff";
			div3.style.border="1px solid #fff";
			div4.style.border="1px solid #fff";
			div5.style.border="1px solid #fff";
			smallImg.src="images/img-adv1.png";
        	bigImg.src="images/img-adv1.png";
		}
		div2.onmouseover=function(){
			div2.style.border="1px solid #0a83d7";
			div1.style.border="1px solid #fff";
			div3.style.border="1px solid #fff";
			div4.style.border="1px solid #fff";
			div5.style.border="1px solid #fff";
			smallImg.src="images/img_zv_1_w_vpt2bt_1.jpg.thumb.537.537.png.thumb.64.64.png";
        	bigImg.src="images/img_zv_1_w_vpt2bt_1.jpg.thumb.537.537.png.thumb.64.64.png";
		}
		div3.onmouseover=function(){
			div3.style.border="1px solid #0a83d7";
			div1.style.border="1px solid #fff";
			div2.style.border="1px solid #fff";
			div4.style.border="1px solid #fff";
			div5.style.border="1px solid #fff";
			smallImg.src="images/img_zv_1_w_vpt2bt_2.jpg.thumb.537.537.png.thumb.64.64.png";
        	bigImg.src="images/img_zv_1_w_vpt2bt_2.jpg.thumb.537.537.png.thumb.64.64.png";
		}
		div4.onmouseover=function(){
			div4.style.border="1px solid #0a83d7";
			div1.style.border="1px solid #fff";
			div2.style.border="1px solid #fff";
			div3.style.border="1px solid #fff";
			div5.style.border="1px solid #fff";
			smallImg.src="images/imaging_edge_webcam_800_800_1023_3.jpg.thumb.537.537.png.thumb.64.64.png";
        	bigImg.src="images/imaging_edge_webcam_800_800_1023_3.jpg.thumb.537.537.png.thumb.64.64.png";
		}
		div5.onmouseover=function(){
			div5.style.border="1px solid #0a83d7";
			div1.style.border="1px solid #fff";
			div2.style.border="1px solid #fff";
			div3.style.border="1px solid #fff";
			div4.style.border="1px solid #fff";
			smallImg.src="images/img_baoj1111_800.jpg.thumb.537.537.png.thumb.64.64.png";
        	bigImg.src="images/img_baoj1111_800.jpg.thumb.537.537.png.thumb.64.64.png";
		}