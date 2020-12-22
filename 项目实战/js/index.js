/*
Double exposure is photographic technique that combines 2 different images into a single image. 
Then I use this technique with canvas blend modes.
*/

window.onload = function () {
  var loading = document.getElementById("loading");
  loading.classList.add("loading-done");

  var property = {
    element: "#images",
    parallax: .6,
    interval: 2200,
    animDuration: 1300,
    easing: easingInOutQuad };


  var slider = new DXslider(property);
  slider.init();
};

class DXslider {
  constructor(property) {
    this.images = document.querySelector(property.element);
    this.preButton = document.querySelector(property.element + " nav .pre");
    this.nextButton = document.querySelector(property.element + " nav .next");
    this.lightenImages = document.querySelectorAll(".lighten img");
    this.normalImages = document.querySelectorAll(".normal img");
    this.canvasBox = document.createElement("div");
    this.paraEffect = property.parallax; //have to clamp 0 ~ 1
    this.canvasArray = [];
    this.progress = 0;
    this.animating = false;
    this.interval = property.interval;
    this.left = true;
    this.duration = property.animDuration;
    this.easing = property.easing;

    this.images.appendChild(this.canvasBox);
    this.canvasBox.classList.add("canvas");
  }

  init() {
    this.settingStyle();
    this.settingCanvas();

    this.preButton.addEventListener("click", function (e) {
      if (!this.animating) {
        this.left = false;
        clearTimeout(this.timer);
        this.slide();
      }
    }.bind(this), false);

    this.preButton.addEventListener("touchend", function (e) {
      if (!this.animating) {
        this.left = false;
        clearTimeout(this.timer);
        this.slide();
      }
    }.bind(this), false);

    this.nextButton.addEventListener("click", function (e) {
      if (!this.animating) {
        this.left = true;
        clearTimeout(this.timer);
        this.slide();
      }
    }.bind(this), false);

    this.nextButton.addEventListener("touchend", function (e) {
      if (!this.animating) {
        this.left = true;
        clearTimeout(this.timer);
        this.slide();
      }
    }.bind(this), false);
  }

  settingStyle() {
    this.imagesWidth = this.images.offsetWidth;
    this.width = this.lightenImages[0].width;
    this.height = this.lightenImages[0].height;
    this.dpi = this.width / this.imagesWidth;

    this.images.style.height = this.canvasBox.style.height = this.imagesWidth * this.height / this.width + "px";

    this.preButton.classList.add("after-loading");
    this.nextButton.classList.add("after-loading");
  }

  settingCanvas() {
    var canvas, context, normal, lighten, n;
    for (var i = 0, len = this.normalImages.length * 2; i < len; i++) {
      canvas = document.createElement("canvas");
      this.canvasBox.appendChild(canvas);
      context = canvas.getContext("2d");

      canvas.width = this.width;
      canvas.height = this.height;
      canvas.style.width = this.imagesWidth + "px";
      canvas.style.height = this.imagesWidth * this.height / this.width + "px";

      //add images(lighten and normal) into canvasArray
      n = i % (len / 2);
      normal = this.normalImages[n];
      lighten = this.lightenImages[n];
      this.canvasArray.push({
        canvas: canvas, context: context, normal: normal, lighten: lighten });

    }

    this.render(this.progress, -this.imagesWidth);
    this.timer = setTimeout(this.slide.bind(this), this.interval);
  }

  slide() {
    this.left ?
    this.tween(-this.imagesWidth, this.duration, this.easing) :
    this.tween(this.imagesWidth, this.duration, this.easing);
  }

  tween(change, duration, easingFunc) {
    var startTime = new Date();
    this.progress = 0;
    this.animating = true;
    this.update(startTime, change, duration, easingFunc);
  }

  update(startTime, change, duration, easingFunc) {
    var time = new Date() - startTime;
    if (time < duration) {
      this.progress = easingFunc(time / duration);
      this.render(this.progress, change);
      requestAnimationFrame(this.update.bind(this, startTime, change, duration, easingFunc));
    } else {
      if (this.left) {
        var firstEle = this.canvasArray[0];
        this.canvasArray.shift();
        this.canvasArray.push(firstEle);
      } else {
        var lastEle = this.canvasArray[this.canvasArray.length - 1];
        this.canvasArray.pop();
        this.canvasArray.unshift(lastEle);
      }
      this.progress = 1;
      this.animating = false;
      time = duration;
      this.left = true;
      this.render(0, -this.imagesWidth);
      this.timer = setTimeout(this.slide.bind(this), this.interval);
    }
  }

  render(progress, position) {
    for (var i = 0, len = this.canvasArray.length; i < len; i++) {
      var canvas = this.canvasArray[i].canvas;
      canvas.style.setProperty("-webkit-transform", "translate(" + (progress * position - (len / 2 - i) * this.imagesWidth) + "px, 0)");
      canvas.style.transform = "translate(" + (progress * position - (len / 2 - i) * this.imagesWidth) + "px, 0)";

      var context = this.canvasArray[i].context;
      context.clearRect(0, 0, this.width, this.height);
      context.globalCompositeOperation = "source-over";
      context.drawImage(this.canvasArray[i].normal, 0, 0, this.width, this.height);
      context.globalCompositeOperation = "lighten";
      context.drawImage(this.canvasArray[i].lighten, ((len / 2 - i) * this.imagesWidth - progress * position) * this.dpi * this.paraEffect, 0, this.width, this.height);
    }
  }}


//easing
//prepare only easingInOutQuad
function easingInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}