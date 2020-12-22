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
    if(PC()){
        $('.page_pc').append(
            '<style>'+
            '.vidBg img,.vidBg video{ display:block; max-width:100%; }'+
            '.page_pc .vidBg{ position:fixed; width:100%; height:100%; left:0; top:0; background:rgba(0,0,0,0.7); z-index:100;}'+
            '.page_pc .vidBg .vidBox{ position:absolute; width:960px; height:540px; left:50%; top:50%; margin:-270px 0 0 -480px; background:#000; font-size:20px; color:#fff; text-align:center; }'+
            '.page_pc .vidBg .vidClose{ position:absolute; left:50%; top:50%; margin:-270px 0 0 480px; font-family:Arial, Helvetica, sans-serif; font-size:40px; line-height:40px; color:#fff; text-align:center; cursor:pointer; width:40px; height:40px; }'+
            '</style>')
    }
    else{
        $('.page_mobile').append(
            '<style>'+
            '.vidBg img,.vidBg video{ display:block; width:100%; }'+
            '.page_mobile .vidBg{ position:fixed; width:100%; height:100%; left:0; top:0; background:rgba(0,0,0,0.7); z-index:100;}'+
            '.page_mobile .vidBg .vidBox{ position:absolute; width:100%; height:56.25vw; left:0; top:50%; margin-top:-28vw; background:#000; font-size:5vw; color:#fff; text-align:center; }'+
            '.page_mobile .vidBg .vidClose{ position:absolute; right:0; top:50%; margin-top:-36vw; font-size:8vw; line-height:8vw; color:#fff; text-align:center; cursor:pointer; width:8vw; height:8vw; }'+
            '</style>')
    }
    var txVideo=function(video){
        if(PC()) return '<embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid='+video+'&auto=1" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>'
        else return '<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid='+video+'&autoplay=true" allowFullScreen="true" quality="high" width="100%" height="100%" ></iframe>';
    }

    $('.vidBtn:not(.unPop)').click(function(){
        $('.page_pc,.page_mobile').append('<div class="vidBg"><div class="vidBox"></div><div class="vidClose">×</div></div>');
        var vidHtml="";
        var type=$(this).data('vidType');
        var img=$(this).data('img');
        var video=$(this).data('video');
        if(!!type){
            if(type.indexOf('tencent')>0){
                var video=$(this).data('tx');
                vidHtml=txVideo(video);
            }
            else{
                vidHtml='<video autoplay controls preload="auto" poster="'+img+'">';
                type=type.indexOf('-')>0?type.split('-'):type;
                for(var i=0; i<type.length; i++){
                    var video=$(this).data(type[i]);
                    if(!video){ vidHtml+='<source src="'+video+'" type="video/'+type[i]+'">'; }
                }
                vidHtml+='<img src="'+img+'"></video>';
            }
        }
        else if(video){
            var vtype=['mp4','ogg','webm'];
            var video=$(this).data('video');
            for(var i=0; i<vtype.length; i++){
                if(video.indexOf(vtype[i])>0) vidHtml='<video autoplay controls preload="auto" poster="'+img+'"><source src="'+video+'" type="video/'+vtype[i]+'"><img src="'+img+'"></video>';
            }
            if(!vidHtml) vidHtml=txVideo(video);
        }
        else{ vidHtml='无视频源'; }
        $('.vidBg .vidBox').append(vidHtml);
        $('.vidBg,.vidBg .vidClose').click(function(){ $('.vidBg').remove(); });
        $('.vidBg .vidBox').click(function(event){ var e = window.event || event; if ( e.stopPropagation ){ e.stopPropagation(); } else{ window.event.cancelBubble = true; } });
    })

})