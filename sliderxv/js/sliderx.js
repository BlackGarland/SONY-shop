$(document).ready(function() {
  var length = $(".content_1").children(".box").length;//盒子个数
  var boxWidth = $(".bigbox").width() / 4;//视窗宽度除以4获得移动宽度
  var virtual = length * boxWidth;	//切换的临界点
  var speed = 500;	//移动速度，速度建议要小于间隔时间的一半。
  var time =4000;	//间隔时间
  $(".box").width(boxWidth-3);

  var Item = $('#switcher'); //要移动的元素
  Item.css({ position: 'relative' }); //设置position
  var move = boxWidth + 'px'; //移动的范围，是一个box的宽度。
  var leftCriticalPoint = "-" + virtual + "px"; //有n个盒子，就以n个盒子的长度作为跳跃点

  var flag = true;//点击允许

  scrollContentStructure(length);

  function scrollContentStructure(length) {
    if(length < 4) {
      $('#switcher').width(boxWidth * (length + 4)); //视窗宽度 条状体l+4，补体6-l；假设l=3，条状体7.补体3
      if(length != 0) {
        var content_1 = $(".content_1").html();
        for(var i = 0; i < 6 - length; i++) {
          $(".content_1").append(content_1); //最少6个盒子，补够
        }
      }
    } else {
      $('#switcher').width(virtual * 2);
      $(".content_2").html($(".content_1").html()); //复制
    }
  }

  if(length != 0) {
    var callback = setInterval(moving, time);
  }

  function moving() {
    flag = false;
    if(Item[0].style.left == leftCriticalPoint) {
      Item[0].style.left = "0px";
    }
    Item.animate({ left: '-=' + move }, speed, function() {
      if(Item[0].style.left == leftCriticalPoint) {
        Item[0].style.left = "0px";
      }
    });
    flag = true;
  }

  $("li").click(function() {
    //当前处于动画状态及可点击状态判断
    //标志位防止事件栈积累，
    if(!Item.is(":animated") && flag) {
      var left = Item[0].style.left;
      clearInterval(callback);

      if($(this).index() == 1) {
        if(left == leftCriticalPoint) {
          Item[0].style.left = "0px";
        }
        Item.animate({ left: '-=' + move }, speed, function() {
          if(Item[0].style.left == leftCriticalPoint) {
            Item[0].style.left = "0px";
          }
          callback = setInterval(moving, time);
        });
        // console.log("右");
      } else if($(this).index() == 0) {
        if(isNaN(parseInt(left)) || left == "0px") {
          Item[0].style.left = leftCriticalPoint;
        }
        Item.animate({ left: '+=' + move }, speed, function() {
          if(Item[0].style.left == "0px") {
            Item[0].style.left = leftCriticalPoint;
          }
          callback = setInterval(moving, time);
        });
        // console.log("左");
      }
    }
  });

})
