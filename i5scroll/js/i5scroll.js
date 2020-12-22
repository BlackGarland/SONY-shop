~(function ($, window, document, undefined) {
    class Scroll {
        constructor(eles, opts) {
            this.$eles = eles;
            opts = opts || {};
            this.defaults = {
                mode: 'CSS',
                cssSpeed: 5,
                jsSpeed: 'normal',
            };
            this.options = $.extend(true, {}, this.defaults, opts);
            this.options.jsSpeed = this.handleJsSpeed(this.options.jsSpeed);
            this.init();
        }
        init() {
            this.handleEve();
        }
        handleJsSpeed(sp) {
            switch (sp) {
                case 'slow':
                    return 50;
                case 'normal':
                    return 30;
                case 'fast':
                    return 15;
            }
        }
        handleEve() {
            const _this = this;
            this.$eles.each(function (i, domEle) {
                _this.cloneNode(domEle);
                _this.initValue(domEle);
                _this.wrapDiv(domEle);
                _this.createKeyframes();
                if (_this.options.mode === 'CSS') {
                    _this.moveByCss(domEle);
                    _this.handleHoverByCss(domEle);
                } else {
                    _this.moveByJs(domEle);
                    _this.handleHoverByJs(domEle);
                }
            });
        }
        cloneNode(ele) {
            $(ele).children().clone().appendTo($(ele));
        }
        initValue(ele) {
            $(ele).css({
                margin: 0,
                padding: 0
            });
            ele.num = 0;
            const o = $(ele).parents(":hidden").eq($(ele).parents(":hidden").length - 1);
            o.css({
                display: 'block'
            });
            // ele.h = parseInt($(ele).outerHeight(true) / 2);
            // To prevent the father setting display: flex; from affecting the height of the child element
            let sum = 0;
            $(ele).children().each(function (i, item) {
                sum += $(item).outerHeight(true);
            });
            ele.h = parseInt(sum / 2);
            o.css({
                display: 'none'
            });
        }
        wrapDiv(ele) {
            $(ele).wrap($(`<div style="height: ${ele.h}px; overflow: hidden; padding: 0">`));
        }
        createKeyframes() {
            const runkeyframes = `@keyframes IFER_MOVE {
                100%{
                    transform: translateY(-50%);
                }
            }`;
            const style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = runkeyframes;
            document.querySelector('head').appendChild(style);
        }
        moveByCss(ele) {
            $(ele).css({
                animation: `IFER_MOVE ${this.options.cssSpeed}s linear infinite`
            });
        }
        handleHoverByCss(ele) {
            $(ele).hover(function () {
                $(this).css('animation-play-state', 'paused');
            }, function () {
                $(this).css('animation-play-state', 'running');
            });
        }
        moveByJs(ele) {
            clearInterval(ele.timer);
            ele.timer = setInterval(() => {
                if (Math.abs(ele.num) === ele.h) {
                    ele.num = 0;
                } else {
                    $(ele).css('transform', 'translateY(' + ele.num + 'px)');
                }
                ele.num--;
            }, this.options.jsSpeed);
        }
        handleHoverByJs(ele) {
            const _this = this;
            $(ele).hover(function () {
                clearInterval(ele.timer);
            }, function () {
                _this.moveByJs(ele);
            });
        }
    }
    $.fn.i5Scroll = function (options) {
        new Scroll(this, options);
    };
})(jQuery, window, document);