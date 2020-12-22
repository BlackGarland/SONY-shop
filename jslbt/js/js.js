//获取id，tagName
function getIdName(id,tagName){
	
	if(tagName!=0){
		return document.getElementById(id).getElementsByTagName(tagName);
	}else{
		return document.getElementById(id);
	}
}
function hdp(json){
	var tiemr=null;
	var pd=0;
	var index=0;
	var that;
	var option={
		li:"li",	//默认值：默认用li包裹
		boxid:"",	//最外面div  id
		imgid:"",	//图片外面id
		optid:"",	//opt外面id	
		an:"",		//左右按钮id，用于移上显示和隐藏
		prev:"",	//左边箭头id
		next:"",	//右边箭头id
		ms:800		//多少毫秒切换一张,默认800毫秒
	}
	for(var i in option){
		if(json[i]!=undefined){
			option[i]=json[i];
		}
	}
	
	var div=getIdName(option.boxid,0);
	var imgs=getIdName(option.imgid,option.li);
	var lis=getIdName(option.optid,option.li);
	var an=getIdName(option.an,0);
	var prev=getIdName(option.prev,0);
	var next=getIdName(option.next,0);
	var ms=option.ms;
	
	function lbt(that){
		if(that>=0){
			index=that;
		}else{
			if(pd==0){
				index++;
			}else{
				index--;
				pd=0;
			}
		}
		if(index>=lis.length) index=0;
		if(index<0) index=lis.length-1;
		for(var j=0;j<lis.length;j++){
			lis[j].className="";
			imgs[j].className="";
		}
		lis[index].className="on";
		imgs[index].className="current";
	}
	imgs[index].className="current";
	lis[index].className="on";
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			that=this.index;
			lbt(that);
		}
	}
	timer=setInterval(lbt,ms);
	
	
	div.onmouseover=function(){
		clearInterval(timer);
		an.style.display="block";
	}
	div.onmouseout=function(){
		timer=setInterval(lbt,ms);
		an.style.display="none";
	}
	prev.onclick=function(){
		pd=1;
		lbt();
	}
	next.onclick=function(){
		pd=0;
		lbt();
	}
}
