var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,d){a!=Array.prototype&&a!=Object.prototype&&(a[b]=d.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.arrayFromIterator=function(a){for(var b,d=[];!(b=a.next()).done;)d.push(b.value);return d};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};
$jscomp.polyfill=function(a,b,d,c){if(b){d=$jscomp.global;a=a.split(".");for(c=0;c<a.length-1;c++){var e=a[c];e in d||(d[e]={});d=d[e]}a=a[a.length-1];c=d[a];b=b(c);b!=c&&null!=b&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:b})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function d(a){return a instanceof e?a:new e(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};b.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var c=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){c(a,
0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];delete a[b];try{c()}catch(l){this.asyncThrow_(l)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(k){b.reject(k)}};e.prototype.createResolveAndReject_=
function(){function a(a){return function(e){c||(c=!0,a.call(b,e))}}var b=this,c=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var b=
void 0;try{b=a.then}catch(k){this.reject_(k);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.onSettledCallbacks_=null}};var f=new b;e.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};e.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(l){c.reject(l)}};e.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{d(a(b))}catch(m){f(m)}}:b}var d,f,g=new e(function(a,
b){d=a;f=b});this.callWhenSettled_(c(a,d),c(b,f));return g};e.prototype.catch=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function c(){switch(e.state_){case 1:a(e.result_);break;case 2:b(e.result_);break;default:throw Error("Unexpected state: "+e.state_);}}var e=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(function(){f.asyncExecute(c)})};e.resolve=d;e.reject=function(a){return new e(function(b,c){c(a)})};e.race=function(a){return new e(function(b,
c){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())d(f.value).callWhenSettled_(b,c)})};e.all=function(a){var b=$jscomp.makeIterator(a),c=b.next();return c.done?d([]):new e(function(a,e){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,d(c.value).callWhenSettled_(f(g.length-1),e),c=b.next();while(!c.done)})};return e},"es6","es3");
Vue.mixin({data:function(){return{loginID:localStorage.loginID,password:localStorage.password,access_token:localStorage.access_token,mainIsOutStock:["\u4e3b\u4ea7\u54c1\u6ca1\u8d27","\u8bf7\u8fd4\u56de\u8d2d\u7269\u8f66\u5220\u9664\u6ca1\u8d27\u7684\u5546\u54c1\u7ee7\u7eed"],FOCIsOutStock:["\u8d60\u54c1\u4e2d\u6709\u7f3a\u8d27\u5546\u54c1","\u9009\u62e9\u7ee7\u7eed\u7ed3\u7b97\uff0c\u8d60\u54c1\u5c06\u4e0d\u4f1a\u8865\u53d1"],IsOutStockInfo:[],btnIsShow:!0,CartPromotions:{},miniCartDisplay:{},cartHref:"cart.html",
orderHref:"confirmOrder.html",writeOrderHref:"getOrderInfo.html",login_page:"/content/sonyclub/index.html",test:"test"}},filters:{thousand:function(a){a=parseFloat(a).toFixed(2).toString();return"NaN"!=a?a.replace(/(?=\B(?:\d{3})+\b)(\d{3}(\.\d+$)?)/g,",$1"):""},thousandNoFloat:function(a){return"NaN"!=a&&""!=a&&void 0!==a?a.toString().replace(/(?=\B(?:\d{3})+\b)(\d{3}(\.\d+$)?)/g,",$1"):""},date:function(a){return 14<=a.length?a.substring(0,4)+"/"+a.substring(4,6)+"/"+a.substring(6,8)+" "+a.substring(8,
10)+":"+a.substring(10,12)+":"+a.substring(12,14):a},countDown:function(a){var b=parseInt(a/864E5),d=parseInt(a%864E5/36E5),c=parseInt(a%36E5/6E4);return b+" \u5929 "+d+" \u5c0f\u65f6 "+c+" \u5206\u949f "+a%6E4/1E3+" \u79d2 "},millisecondToDate:function(a){return(new Date(a)).getFullYear()+"."+((new Date(a)).getMonth()+1)+"."+(new Date(a)).getDate()}},created:function(){},methods:{_miniCartDisplay:function(){var a=this;return(new Promise(function(b,d){cartPromise(_api.HybrisAPI.miniCartDisplay(localStorage.access_token),
{}).then(function(c){a.__checkLocalStorage(c.resultMsg[0].code)&&("00"===c.resultMsg[0].code&&(a.miniCartDisplay=c.resultData),b(c))})})).catch(function(b){401===b.status&&a.__checkLocalStorage(b.responseJSON.resultMsg[0].code)})},_readCard:function(){var a=this;return new Promise(function(b,d){cartPromise(_api.HybrisAPI.readCart(localStorage.access_token),{cartId:""}).then(function(c){a.__checkLocalStorage(c.resultMsg[0].code)&&b(c)}).catch(function(b){401===b.status&&a.__checkLocalStorage(b.responseJSON.resultMsg[0].code)})})},
_changeCart:function(a,b,d,c){var e=this;if(null!=a)return new Promise(function(c,g){cartPromise(_api.HybrisAPI.changeCart(localStorage.access_token),{cartId:"",entryNumber:String(a),quantity:String(d),actionType:b}).then(function(a){e.__checkLocalStorage(a.resultMsg[0].code)&&(console.log(a.resultMsg[0].code),"99"===a.resultMsg[0].code&&($(".errorbox .gmg p").eq(0).text("\u8be5\u4ea7\u54c1\u7f3a\u8d27"),$(".errorbox").bPopup()),"01"===a.resultMsg[0].code&&($(".errorbox .gmg p").eq(0).text("\u90e8\u5206\u4ea7\u54c1\u672a\u6210\u529f\u52a0\u5165\u8d2d\u7269\u8f66\uff0c\u8bf7\u81f3\u8d2d\u7269\u8f66\u67e5\u770b"),
$(".errorbox").bPopup()),c(a))}).catch(function(a){401===a.status&&e.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})})},_getCartPromotions:function(a){var b=this;return(new Promise(function(d,c){cartPromise(_api.HybrisAPI.getCartPromotions(localStorage.access_token),{cartId:a}).then(function(a){b.__checkLocalStorage(a.resultMsg[0].code)&&("00"===a.resultMsg[0].code&&(b.CartPromotions=a.resultData),d(a))})})).catch(function(a){401===a.status&&b.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})},
_login:function(a){var b=this;return new Promise(function(d,c){cartPromise(_api.HybrisAPI.login(),a).then(function(a){a.resultData&&(localStorage.setItem("access_token",a.resultData.access_token),localStorage.setItem("customerGroup",a.resultData.customerGroup),localStorage.setItem("customerID",a.resultData.customerID));d(a)}).catch(function(a){c(a);401===a.status&&b.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})})},_logout:function(){var a=this;return new Promise(function(b,d){cartPromise(_api.HybrisAPI.logout(localStorage.access_token),
{}).then(function(c){a.__checkLocalStorage(c.resultMsg[0].code)&&b(c)})})},__checkLocalStorage:function(a){return"98"===a?(localStorage.setItem("access_token",""),localStorage.setItem("customerGroup",""),!1):!0},__allFOC:function(a){return null==a?null:null==this.__FOCOutStock(a)?[].concat($jscomp.arrayFromIterable(a.filter(function(a){return"FOC"===a.relationType}))):[].concat($jscomp.arrayFromIterable(this.__FOCOutStock(a)),$jscomp.arrayFromIterable(a.filter(function(a){return"FOC"===a.relationType})))},
__FOCOutStock:function(a){if(null==a)return null;var b=[],d=[],c=[];a.reduce(function(a,b){console.log(b.message);b.message&&void 0!==b.message&&"FOC"!==b.relationType&&(console.log(b.message),0<=b.message.indexOf("FOC")&&(a+=","+b.message));return a},"").split(",").forEach(function(a){""!=a&&(b.push(a.split("_")[2]),d.push(a.split("_")[0]),c.push(a.split("_")[3]))});return 0==b.length?null:b.map(function(a,b){return{product8D:a,quantity:"0",parent8D:d[b],name:c[b]}})},__getFOCList:function(a){return a.filter(function(a){return"FOC"===
a.relationType})},__cartItemArr:function(a,b){var d=this.__allFOC(b);return b.filter(function(a){return""===a.relationType}).map(function(c){var e=b.filter(function(a){return""===a.relationType&&a.product8D===c.product8D})[0];return{eightD:c.product8D,pim:a.filter(function(a){return a.sku8D===c.product8D})[0],cart:{parent:{parentData:b.filter(function(a){return""===a.relationType&&a.product8D===c.product8D})[0],isOUTOFSTOCK:null!=e.message&&"OUTOFSTOCK"===e.message.toUpperCase()},children:d.filter(function(a){return a.parent8D===
c.product8D}).map(function(b){return{FOC:b,quantity:b.quantity,pim:a.filter(function(a){return a.sku8D===b.product8D})[0]}}).sort(function(a,b){return a.FOC.product8D.slice(1)-b.FOC.product8D.slice(1)})}}})},__cartFOCItemArr:function(a,b){return b.map(function(d){var c=b.filter(function(a){return a.product8D===d.product8D})[0];return{eightD:d.product8D,pim:a.filter(function(a){return a.sku8D===d.product8D})[0],cart:{parent:{parentData:b.filter(function(a){return a.product8D===d.product8D})[0],isOUTOFSTOCK:null!=
c.message&&"OUTOFSTOCK"===c.message.toUpperCase()}}}})},__getChange:function(a,b){var d="",c="";a.forEach(function(a,f){var e=b[f].cart.parent.isOUTOFSTOCK,h=b[f].eightD;a.cart.parent.isOUTOFSTOCK!==e&&(d+="\u4e3b\u4ea7\u54c1"+h+"\u73b0\u5728"+(e?"\u6ca1\u6709":"\u6709")+"\u8d27\u4e86\uff0c");a.cart.children.forEach(function(a,d){var e=b[f].cart.children[d].quantity;d=b[f].cart.children[d].pim.sku8D;a.quantity!==e&&(c+="\u8d60\u54c1"+d+"\u73b0\u5728"+("0"===e?"\u6ca1\u6709":"\u6709")+"\u8d27\u4e86\uff0c")})});
return{parentStr:d,childrenStr:c}},__updatePimData:function(a){return new Promise(function(b,d){Promise.all(a.map(function(a){return cartGetPromise(_api.productInformation.getInformation()+"\x26eightD\x3d"+a)})).then(function(a){a=a.map(function(a){return a.returnData.OutMasterData});b(a)})})},__updateCouponData:function(a){return new Promise(function(b,d){Promise.all(a.map(function(a){return cartPromise(_api.HybrisAPI.getProductCoupon(localStorage.access_token),{productCode:a})})).then(function(a){a=
a.map(function(a){return a.itemCoupons});b(a)})})},__getMemberInfo:function(){var a=this;return new Promise(function(b,d){cartPromise(_api.HybrisAPI.getMemberInfo(localStorage.access_token),{}).then(function(c){a.__checkLocalStorage(c.resultMsg[0].code)&&b(c)}).catch(function(b){401===b.status&&a.__checkLocalStorage(b.responseJSON.resultMsg[0].code)})})},__getOrderList:function(){var a=this;return new Promise(function(b,d){cartPromise(_api.HybrisAPI.getOrderList(localStorage.access_token),{pageNumber:"0",
pageSize:"10"}).then(function(c){a.__checkLocalStorage(c.resultMsg[0].code)&&b(c)}).catch(function(b){401===b.status&&a.__checkLocalStorage(b.responseJSON.resultMsg[0].code)})})},__getRegProductList:function(){var a=this;return new Promise(function(b,d){cartPromise(_api.HybrisAPI.getRegProductList(localStorage.access_token),{}).then(function(c){a.__checkLocalStorage(c.resultMsg[0].code)&&b(c)}).catch(function(b){401===b.status&&a.__checkLocalStorage(b.responseJSON.resultMsg[0].code)})})},__switchMemberType:function(a){var b=
"";switch(a){case "silvercustomergroup":b="\u94f6\u724c\u4f1a\u5458";break;case "registercustomergroup":b="\u6ce8\u518c\u4f1a\u5458";break;case "bronzecustomergroup":b="\u94dc\u724c\u4f1a\u5458";break;case "goldcustomergroup":b="\u91d1\u724c\u4f1a\u5458";break;case "diomondcustomergroup":b="\u94bb\u77f3\u4f1a\u5458";break;case "servicestationcustomergroup":b="\u7ef4\u4fee\u7ad9";break;case "employeecustomergroup":b="\u4f01\u4e1a\u91d1\u724c\u4f1a\u5458"}return b},__addToWishList:function(a){var b=
this;return new Promise(function(d,c){cartPromise(_api.HybrisAPI.addWishlistEntry(localStorage.access_token),{product8D:a},!0).then(function(a){b.__checkLocalStorage(a.resultMsg[0].code)&&d(a)}).catch(function(a){401===a.status&&b.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})})},__readWishList:function(){var a=this;return new Promise(function(b,d){cartPromise(_api.HybrisAPI.readWishlist(localStorage.access_token),{}).then(function(c){a.__checkLocalStorage(c.resultMsg[0].code)&&b(c)}).catch(function(b){401===
b.status&&a.__checkLocalStorage(b.responseJSON.resultMsg[0].code)})})},__addToBasket:function(a,b){var d=this;return new Promise(function(c,e){cartPromise(_api.HybrisAPI.addToBasket(localStorage.access_token),{products:[{product8D:a,quantity:b,mainProduct:"Y",relationType:"",parent8D:""}]}).then(function(a){d.__checkLocalStorage(a.resultMsg[0].code)&&("00"==a.resultMsg[0].code&&($(".popbox.addSuccess").bPopup(),$("#minicart").trigger("click")),"01"==a.resultMsg[0].code&&(0<=a.resultMsg[0].message.indexOf("FOC")?
$(".errorbox .gmg p").eq(0).text("\u90e8\u5206\u4ea7\u54c1\u672a\u6210\u529f\u52a0\u5165\u8d2d\u7269\u8f66\uff0c\u8bf7\u81f3\u8d2d\u7269\u8f66\u67e5\u770b"):$(".errorbox .gmg p").eq(0).text("\u8be5\u4ea7\u54c1\u7f3a\u8d27\uff01"),$(".errorbox").bPopup()),c(a))}).catch(function(a){401===a.status&&$("#login").bPopup()})})},__multiAddToBasket:function(a,b){var d=this;return new Promise(function(c,e){var f=[];a.forEach(function(a){var c={};c.product8D=a;c.quantity=b;f.push(c)});cartPromise(_api.HybrisAPI.addToBasket(localStorage.access_token),
{products:f},!0).then(function(a){d.__checkLocalStorage(a.resultMsg[0].code)&&("00"==a.resultMsg[0].code&&($(".popbox.addSuccess").bPopup(),$("#minicart").trigger("click")),c(a))}).catch(function(a){401===a.status&&d.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})})},__flashBuyAddToBasket:function(a){var b=this;return new Promise(function(d,c){cartPromise(_api.HybrisAPI.flashBuyAddtoBasket(localStorage.access_token),{products:[{product8D:a,quantity:"1",mainProduct:"",relationType:"",parent8D:""}]},
!0).then(function(a){b.__checkLocalStorage(a.resultMsg[0].code)&&("00"==a.resultMsg[0].code&&(window.location.href="/content/sonystyle/common/getOrderInfo.html?cartId\x3d"+a.resultData.cartId),d(a))}).catch(function(a){401===a.status&&b.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})})},__instalmentAddToBasket:function(a,b,d){var c=this;return new Promise(function(e,f){cartPromise(_api.HybrisAPI.addToInstallmentBasket(localStorage.access_token,b),{products:[{product8D:a,quantity:d}]},!0).then(function(a){c.__checkLocalStorage(a.resultMsg[0].code)&&
("00"==a.resultMsg[0].code&&(window.location.href="/content/sonystyle/common/getOrderInfo.html?cartId\x3d"+a.resultData.cartId),e(a))}).catch(function(a){401===a.status&&c.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})})},__summaryArray:function(a,b){b=b.reduce(function(a,b){return parseFloat(a)+parseFloat(b)},0);b=parseFloat(b)+parseFloat(a.resultData.header.totalHeadDiscount);return b.toFixed(2)},gotoPDP:function(a){var b="";a&&""!=a&&$.ajax({url:"/services/sonystyle/pdp/search?sku\x3d"+
a,contentType:"application/json; charset\x3dUTF-8",type:"get",async:!1,success:function(a){0<a.length&&(b=a[0].result+".html")}});return b},__getProductCoupon:function(a){var b=this;return new Promise(function(d,c){cartPromise(_api.HybrisAPI.getProductCoupon(localStorage.access_token),{productCode:a}).then(function(a){b.__checkLocalStorage(a.resultMsg[0].code)&&d(a)}).catch(function(a){401===a.status&&b.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})})},__getCountDownTime:function(){return new Promise(function(a,
b){cartPromise(_api.HybrisAPI.getCountDownTime()).then(function(b){a(b)}).catch(function(a){})})},__releaseCoupon:function(a,b){var d=this;return new Promise(function(c,e){cartPromise(_api.HybrisAPI.releaseCoupon(localStorage.access_token),{cartID:a,couponCode:b},!0).then(function(a){d.__checkLocalStorage(a.code)&&c(a)}).catch(function(a){401===a.status&&d.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})})},__applyCoupon:function(a,b){var d=this;return new Promise(function(c,e){cartPromise(_api.HybrisAPI.applyCoupon(localStorage.access_token),
{cartID:a,couponCode:b},!0).then(function(a){d.__checkLocalStorage(a.code)&&c(a)}).catch(function(a){401===a.status&&d.__checkLocalStorage(a.responseJSON.resultMsg[0].code)})})},__validateAccessToken:function(){var a=this;return new Promise(function(b,d){cartPromise(_api.HybrisAPI.validateAccessToken(localStorage.access_token)).then(function(c){a.__checkLocalStorage(c.code)&&b(c)}).catch(function(b){401===b.status&&a.__checkLocalStorage(b.responseJSON.resultMsg[0].code)})})},__getArea:function(a){return new Promise(function(b,
d){cartGetPromise(_api.search.getArea(a)).then(function(a){b(a)}).catch(function(a){})})},__isInstallProduct:function(a,b){return new Promise(function(d,c){cartPromise(_api.search.getIsInstallmentProduct(),{channel:"WEB",productIds:a,pval:b}).then(function(a){d(a)}).catch(function(a){})})},__getInstallmentPayInfo:function(a){return new Promise(function(b,d){cartPromise(_api.HybrisAPI.getInstallmentPayInfo(localStorage.access_token),{orderId:a}).then(function(a){b(a)}).catch(function(a){d(a)})})}}});
