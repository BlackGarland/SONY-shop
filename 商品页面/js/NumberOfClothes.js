	    var x=1;
		var divnum=document.getElementById("div_box-right-7-div-1");
		var divadd=document.getElementById("div_box-right-7-div-2-onck1");
		var divdelete=document.getElementById("div_box-right-7-div-2-onck2");
		
		divadd.onclick=function(){
			x++;
			divnum.innerText=x;
		}
		divdelete.onclick=function(){
			x--;
			if(x<2){
				x=1;
			}
			divnum.innerText=x;
		}